/**
 * Tab-key and IntelliSense SSMS-style SQL autocompletion and auto-casing.
 *
 * Provides:
 * 1. Rich completion items with icons/categories (table, column, keyword, function).
 * 2. Dot-navigation completion (e.g. `c.` -> shows only `customers` columns).
 * 3. Auto-casing for SQL keywords on word boundaries (e.g. `select` -> `SELECT`).
 * 4. Classic Tab-completion for backwards-compatibility.
 */

import type { TableInfo } from './engine/types';

/**
 * Static set of common SQL/SQLite keywords, clauses, and the scalar functions
 * the curriculum teaches. Matched case-insensitively; the completed form is
 * uppercased.
 */
export const SQL_KEYWORDS: string[] = [
  // SELECT core
  'SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'HAVING', 'ORDER', 'LIMIT', 'ASC', 'DESC',
  'DISTINCT', 'AS', 'ALL',
  // joins
  'JOIN', 'INNER', 'LEFT', 'RIGHT', 'CROSS', 'OUTER', 'ON',
  // operators / predicates
  'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'GLOB', 'IS', 'NULL',
  // set ops / CTE
  'UNION', 'INTERSECT', 'EXCEPT', 'WITH', 'RECURSIVE',
  // CASE / subqueries
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'EXISTS',
  // DML / DDL
  'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'VIEW',
  'INDEX', 'ALTER', 'DROP', 'PRIMARY', 'KEY', 'DEFAULT', 'UNIQUE', 'CHECK',
  // transactions / explain
  'BEGIN', 'COMMIT', 'ROLLBACK', 'EXPLAIN',
  // window
  'OVER', 'PARTITION', 'ROWS', 'RANK', 'DENSE_RANK', 'ROW_NUMBER', 'LAG', 'LEAD',
  'CURRENT', 'ROW',
  // aggregates
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
  // scalar functions
  'COALESCE', 'NULLIF', 'IIF', 'CAST', 'TYPEOF', 'UPPER', 'LOWER', 'TRIM', 'LENGTH',
  'SUBSTR', 'REPLACE', 'SUBSTRING', 'ROUND', 'ABS', 'POWER', 'SQRT', 'DATE', 'TIME',
  'DATETIME', 'JULIANDAY', 'STRFTIME',
];

export const KEYWORD_MAP: Map<string, string> = new Map(
  SQL_KEYWORDS.map((k) => [k.toLowerCase(), k]),
);

/** Identifier characters accepted as a completable token. */
const IDENT = /[A-Za-z0-9_]/;

export interface SuggestionItem {
  label: string;
  kind: 'table' | 'column' | 'keyword' | 'function';
  detail?: string;
}

/**
 * Build the candidate list for completion: SQL keywords plus every table and
 * column name in the live schema. Deduped case-insensitively (first-seen casing
 * wins, so a column named `sum` does not duplicate the keyword `SUM`).
 */
export function buildCandidates(tables: TableInfo[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (name: string) => {
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(name);
    }
  };
  for (const kw of SQL_KEYWORDS) push(kw);
  for (const table of tables) {
    push(table.name);
    for (const col of table.columns) push(col.name);
  }
  return out;
}

/**
 * Extract table aliases from a SQL string (e.g. `FROM customers c` or `FROM customers AS c`).
 */
export function extractAliases(sql: string, tables: TableInfo[]): Map<string, string> {
  const map = new Map<string, string>(); // alias/name -> real table name
  for (const t of tables) {
    map.set(t.name.toLowerCase(), t.name);
  }
  const regex = /\b(?:FROM|JOIN)\s+([A-Za-z0-9_]+)(?:\s+(?:AS\s+)?([A-Za-z0-9_]+))?/gi;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(sql)) !== null) {
    const tableName = m[1];
    const alias = m[2];
    const real = tables.find((t) => t.name.toLowerCase() === tableName.toLowerCase());
    if (real) {
      if (alias) {
        map.set(alias.toLowerCase(), real.name);
      }
    }
  }
  return map;
}

/**
 * Get suggestions for the SSMS IntelliSense completion popup at the cursor position.
 */
export function getSuggestions(
  sql: string,
  cursor: number,
  tables: TableInfo[],
): { items: SuggestionItem[]; token: string; tokenStart: number; isDot: boolean } | null {
  // Check if character before cursor is a dot or part of an identifier
  let i = cursor;
  while (i > 0 && IDENT.test(sql[i - 1])) i -= 1;
  const tokenStart = i;
  const token = sql.slice(tokenStart, cursor);

  // Check if preceded by a dot: e.g. `alias.token` or `table.`
  let isDot = false;
  let targetQualifier: string | null = null;
  if (tokenStart > 0 && sql[tokenStart - 1] === '.') {
    isDot = true;
    let qEnd = tokenStart - 1;
    let qStart = qEnd;
    while (qStart > 0 && IDENT.test(sql[qStart - 1])) qStart -= 1;
    targetQualifier = sql.slice(qStart, qEnd).toLowerCase();
  }

  // If after a dot (e.g. `c.` or `customers.`), show columns of that specific table or alias
  if (isDot && targetQualifier) {
    const aliases = extractAliases(sql, tables);
    const resolvedTableName = aliases.get(targetQualifier);
    const matchedTable = tables.find(
      (t) => t.name.toLowerCase() === (resolvedTableName ?? targetQualifier),
    );
    if (matchedTable) {
      const items: SuggestionItem[] = matchedTable.columns
        .filter((c) => !token || c.name.toLowerCase().startsWith(token.toLowerCase()))
        .map((c) => ({
          label: c.name,
          kind: 'column',
          detail: `${c.type || 'ANY'}${c.pk ? ' (PK)' : ''}`,
        }));
      return { items, token, tokenStart, isDot: true };
    }
  }

  // If token is empty and not after a dot, do not show popup spontaneously
  if (!token && !isDot) return null;

  // Otherwise, match against all candidates
  const lowerToken = token.toLowerCase();
  const items: SuggestionItem[] = [];

  // 1. Tables
  for (const table of tables) {
    if (!token || table.name.toLowerCase().startsWith(lowerToken)) {
      items.push({
        label: table.name,
        kind: 'table',
        detail: `Table (${table.rowCount} rows)`,
      });
    }
  }

  // 2. Columns across all tables
  for (const table of tables) {
    for (const col of table.columns) {
      if (!token || col.name.toLowerCase().startsWith(lowerToken)) {
        if (!items.some((it) => it.label === col.name && it.kind === 'column')) {
          items.push({
            label: col.name,
            kind: 'column',
            detail: `${table.name}.${col.name} (${col.type || 'ANY'})`,
          });
        }
      }
    }
  }

  // 3. Keywords & Functions
  for (const kw of SQL_KEYWORDS) {
    if (!token || kw.toLowerCase().startsWith(lowerToken)) {
      const isFunc = [
        'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NULLIF', 'IIF', 'UPPER', 'LOWER', 'ROUND',
      ].includes(kw);
      items.push({
        label: kw,
        kind: isFunc ? 'function' : 'keyword',
        detail: isFunc ? 'Built-in Function' : 'Keyword',
      });
    }
  }

  if (items.length === 0) return null;

  // Sort items: prefix matches first, tables and columns slightly prioritized
  items.sort((a, b) => {
    const aExact = a.label.toLowerCase() === lowerToken;
    const bExact = b.label.toLowerCase() === lowerToken;
    if (aExact !== bExact) return aExact ? -1 : 1;
    return a.label.localeCompare(b.label);
  });

  return { items, token, tokenStart, isDot };
}

/**
 * Automatically uppercase SQL keywords upon completion of a word (e.g. typing space, newline, semicolon).
 */
export function autoFormatSqlCasing(
  text: string,
  cursor: number,
): { text: string; cursor: number } {
  // Check the word just before the cursor (e.g. if user just pressed space)
  let end = cursor - 1;
  while (end >= 0 && /\s|[(),;]/.test(text[end])) end -= 1;
  if (end < 0) return { text, cursor };

  let start = end + 1;
  while (start > 0 && IDENT.test(text[start - 1])) start -= 1;

  const word = text.slice(start, end + 1);
  const canonical = KEYWORD_MAP.get(word.toLowerCase());

  if (canonical && canonical !== word) {
    const before = text.slice(0, start);
    const after = text.slice(end + 1);
    return {
      text: before + canonical + after,
      cursor,
    };
  }

  return { text, cursor };
}

/**
 * Attempt to complete the token ending at `start` in `value`.
 *
 * The token is replaced by the *shortest* candidate that strictly extends it
 * case-insensitively (longest-token-first is disallowed; among extending
 * matches the shortest wins, first-seen on a tie).
 *
 * @returns the new editor `value` with the token replaced and the `cursor`
 *   positioned just after the inserted text — or `null` when the token is empty,
 *   has no extending candidate, or is already fully complete.
 */
export function completeToken(
  value: string,
  start: number,
  candidates: string[],
): { value: string; cursor: number } | null {
  const tokenEnd = start;
  let tokenStart = start;
  while (tokenStart > 0 && IDENT.test(value[tokenStart - 1])) tokenStart -= 1;

  const token = value.slice(tokenStart, tokenEnd);
  if (token.length === 0) return null;
  const tokenLower = token.toLowerCase();

  // Shortest candidate that strictly extends the token; first-seen wins ties.
  let best: string | null = null;
  for (const cand of candidates) {
    if (cand.length <= token.length) continue;
    if (!cand.toLowerCase().startsWith(tokenLower)) continue;
    if (best === null || cand.length < best.length) best = cand;
  }
  if (best === null) return null;

  return {
    value: value.slice(0, tokenStart) + best + value.slice(tokenEnd),
    cursor: tokenStart + best.length,
  };
}
