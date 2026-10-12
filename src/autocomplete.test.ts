/**
 * Tests for Tab-key SQL autocompletion.
 */

import { describe, expect, it } from 'vitest';
import type { TableInfo } from './engine/types';
import { buildCandidates, completeToken } from './autocomplete';

const tables: TableInfo[] = [
  {
    name: 'products',
    columns: [
      { name: 'id', type: 'INTEGER', pk: true, notnull: true },
      { name: 'name', type: 'TEXT', pk: false, notnull: false },
    ],
    rowCount: 5,
  },
];

const candidates = buildCandidates(tables);

describe('buildCandidates', () => {
  it('includes keywords, table names, and column names', () => {
    expect(candidates).toContain('SELECT');
    expect(candidates).toContain('products');
    expect(candidates).toContain('name');
  });

  it('dedupes case-insensitively, keeping first-seen casing', () => {
    const cased = buildCandidates([
      { name: 'Sum', columns: [], rowCount: 0 } as TableInfo,
    ]);
    // The keyword SUM comes first; the table "Sum" must not duplicate it.
    expect(cased.filter((c) => c.toLowerCase() === 'sum')).toEqual(['SUM']);
  });
});

describe('completeToken', () => {
  it('completes a partial keyword to its canonical form', () => {
    // "sel" with cursor at end.
    const res = completeToken('sel', 3, candidates);
    expect(res).toEqual({ value: 'SELECT', cursor: 6 });
  });

  it('completes a partial table name from the live schema', () => {
    const res = completeToken('prod', 4, candidates);
    expect(res).toEqual({ value: 'products', cursor: 8 });
  });

  it('replaces only the token, preserving surrounding text', () => {
    // Cursor at the end (length 9) so the token "prod" is complete; only that
    // token is replaced and the "FROM " prefix is preserved.
    const res = completeToken('FROM prod', 9, candidates);
    expect(res).toEqual({ value: 'FROM products', cursor: 13 });
  });

  it('returns null when the token is empty', () => {
    expect(completeToken('SELECT ', 7, candidates)).toBeNull();
  });

  it('returns null when the token is already fully complete', () => {
    // "SELECT" is a full keyword — no longer candidate matches.
    expect(completeToken('SELECT', 6, candidates)).toBeNull();
  });

  it('returns null when there is no matching candidate', () => {
    expect(completeToken('zzz', 3, candidates)).toBeNull();
  });

  it('takes the shortest extending candidate, not the first', () => {
    // SELECT appears first but is 6 chars; SUM (3) is the shortest extension.
    const res = completeToken('s', 1, ['SELECT', 'SUM', 'SUBSTR']);
    expect(res?.value).toBe('SUM');
  });

  it('breaks a length tie with first-seen ordering', () => {
    // "se" extends SET (3, seen before SUM) and SUM (3) as well as longer
    // SELECT/SUBSTR/…. Both 3-char matches tie on length, so first-seen wins.
    const res = completeToken('se', 2, candidates);
    expect(res?.value).toBe('SET');
  });
});
