/**
 * Tab-key SQL autocompletion.
 *
 * Pure functions (no React) so they can be unit-tested. Completes the
 * identifier token ending at a given cursor against SQL keywords plus the
 * live table/column names of the current level database.
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

/** Identifier characters accepted as a completable token. */
const IDENT = /[A-Za-z0-9_]/;

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
