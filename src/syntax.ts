/**
 * Lightweight, robust SQL tokenizer and syntax highlighter.
 * Produces clean HTML spans for keywords, functions, table/column identifiers,
 * strings, numbers, operators, and comments.
 */

import { SQL_KEYWORDS } from './autocomplete';

const KEYWORD_SET = new Set(SQL_KEYWORDS.map((k) => k.toUpperCase()));

export interface SqlToken {
  type: 'keyword' | 'function' | 'table' | 'column' | 'string' | 'number' | 'comment' | 'operator' | 'punctuation' | 'whitespace' | 'identifier';
  text: string;
}

const AGG_OR_SCALAR_FUNCS = new Set([
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
  'COALESCE', 'NULLIF', 'IIF', 'CAST', 'TYPEOF', 'UPPER', 'LOWER', 'TRIM', 'LENGTH',
  'SUBSTR', 'REPLACE', 'SUBSTRING', 'ROUND', 'ABS', 'POWER', 'SQRT', 'DATE', 'TIME',
  'DATETIME', 'JULIANDAY', 'STRFTIME', 'RANK', 'DENSE_RANK', 'ROW_NUMBER', 'LAG', 'LEAD',
]);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Tokenize a SQL string with context of known tables and columns.
 */
export function tokenizeSql(
  sql: string,
  tableNames: Set<string> = new Set(),
  columnNames: Set<string> = new Set(),
): SqlToken[] {
  const tokens: SqlToken[] = [];
  let i = 0;
  const len = sql.length;

  while (i < len) {
    const ch = sql[i];

    // 1. Whitespace
    if (/\s/.test(ch)) {
      let start = i;
      while (i < len && /\s/.test(sql[i])) i += 1;
      tokens.push({ type: 'whitespace', text: sql.slice(start, i) });
      continue;
    }

    // 2. Line comment (-- ...)
    if (ch === '-' && sql[i + 1] === '-') {
      let start = i;
      while (i < len && sql[i] !== '\n') i += 1;
      tokens.push({ type: 'comment', text: sql.slice(start, i) });
      continue;
    }

    // 3. Block comment (/* ... */)
    if (ch === '/' && sql[i + 1] === '*') {
      let start = i;
      i += 2;
      while (i < len && !(sql[i] === '*' && sql[i + 1] === '/')) i += 1;
      if (i < len) i += 2;
      tokens.push({ type: 'comment', text: sql.slice(start, i) });
      continue;
    }

    // 4. String literal ('...')
    if (ch === "'") {
      let start = i;
      i += 1;
      while (i < len) {
        if (sql[i] === "'") {
          if (sql[i + 1] === "'") {
            i += 2; // escaped quote
          } else {
            i += 1;
            break;
          }
        } else {
          i += 1;
        }
      }
      tokens.push({ type: 'string', text: sql.slice(start, i) });
      continue;
    }

    // 5. Quoted identifier ("..." or `...` or [...])
    if (ch === '"' || ch === '`' || ch === '[') {
      const closeChar = ch === '[' ? ']' : ch;
      let start = i;
      i += 1;
      while (i < len && sql[i] !== closeChar) i += 1;
      if (i < len) i += 1;
      const text = sql.slice(start, i);
      const raw = text.slice(1, -1).toLowerCase();
      if (tableNames.has(raw)) {
        tokens.push({ type: 'table', text });
      } else if (columnNames.has(raw)) {
        tokens.push({ type: 'column', text });
      } else {
        tokens.push({ type: 'identifier', text });
      }
      continue;
    }

    // 6. Numbers
    if (/[0-9]/.test(ch)) {
      let start = i;
      while (i < len && /[0-9.]/.test(sql[i])) i += 1;
      tokens.push({ type: 'number', text: sql.slice(start, i) });
      continue;
    }

    // 7. Identifiers / Keywords
    if (/[A-Za-z_]/.test(ch)) {
      let start = i;
      while (i < len && /[A-Za-z0-9_]/.test(sql[i])) i += 1;
      const word = sql.slice(start, i);
      const upper = word.toUpperCase();
      const lower = word.toLowerCase();

      if (AGG_OR_SCALAR_FUNCS.has(upper)) {
        tokens.push({ type: 'function', text: word });
      } else if (KEYWORD_SET.has(upper)) {
        tokens.push({ type: 'keyword', text: word });
      } else if (tableNames.has(lower)) {
        tokens.push({ type: 'table', text: word });
      } else if (columnNames.has(lower)) {
        tokens.push({ type: 'column', text: word });
      } else {
        tokens.push({ type: 'identifier', text: word });
      }
      continue;
    }

    // 8. Operators and Punctuation
    if (/[=<>!+*/%&|^~]/.test(ch)) {
      let start = i;
      while (i < len && /[=<>!+*/%&|^~]/.test(sql[i])) i += 1;
      tokens.push({ type: 'operator', text: sql.slice(start, i) });
      continue;
    }

    // 9. Everything else (semicolon, commas, parentheses)
    tokens.push({ type: 'punctuation', text: ch });
    i += 1;
  }

  return tokens;
}

/**
 * Format tokens into highlighted HTML for overlay rendering.
 */
export function highlightSqlToHtml(
  sql: string,
  tableNames: Set<string> = new Set(),
  columnNames: Set<string> = new Set(),
): string {
  const tokens = tokenizeSql(sql, tableNames, columnNames);
  return tokens
    .map((t) => {
      const esc = escapeHtml(t.text);
      if (t.type === 'whitespace') return esc;
      return `<span class="sql-tok-${t.type}">${esc}</span>`;
    })
    .join('');
}
