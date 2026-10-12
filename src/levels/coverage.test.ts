/**
 * Coverage guard: asserts the tutorial now spans the full SQL syllabus.
 *
 * Each topic from the coverage table maps to at least one level. If a topic
 * loses its levels (deleted or unregistered), this fails so coverage cannot
 * silently regress below full-topic coverage.
 */
import { describe, expect, it } from 'vitest';
import { allLevels, sequences } from './index';

/** topic → level ids that teach it. */
const TOPICS: Record<string, string[]> = {
  'SELECT / projection': ['intro-select-all', 'intro-select-columns'],
  'WHERE / comparison': ['intro-where'],
  'Logical operators (AND/OR/NOT)': ['filters-and-or'],
  'IN / BETWEEN / LIKE / IS NULL': ['filters-in-between', 'filters-like-null'],
  'ORDER BY / LIMIT': ['intro-order-limit'],
  'Aggregate functions': ['groups-count'],
  'GROUP BY': ['groups-count'],
  'HAVING': ['groups-having'],
  'JOINs (INNER/LEFT) + CROSS/SELF/RIGHT/FULL': [
    'joins-inner',
    'joins-left',
    'aj-cross',
    'aj-self',
    'aj-right',
    'aj-full',
  ],
  'Subqueries (scalar/IN/EXISTS/derived)': [
    'subq-scalar',
    'subq-in',
    'subq-exists',
    'subq-derived',
  ],
  'CTEs (incl. recursive)': ['subq-cte', 'subq-recursive'],
  'Window functions': ['win-rank', 'win-running', 'win-partition', 'win-laglead'],
  'DDL (CREATE/ALTER/DROP)': ['ddl-create', 'ddl-alter', 'ddl-drop'],
  'Data types & casting': ['ddl-types', 'fn-cast'],
  'Constraints': ['ddl-constraints'],
  'DML (INSERT/UPDATE/DELETE)': ['dml-insert', 'dml-insert-many', 'dml-update', 'dml-delete', 'dml-upsert'],
  'Set operations': ['set-union', 'set-union-all', 'set-intersect', 'set-except'],
  'Views': ['view-basic', 'view-join', 'view-materialized'],
  'Indexes & performance': ['perf-index', 'perf-explain', 'perf-composite', 'perf-nostar'],
  'Transactions & ACID': ['tx-commit', 'tx-atomic', 'tx-rollback', 'tx-acid'],
  'Functions & CASE': [
    'fn-string',
    'fn-concat',
    'fn-math',
    'fn-date',
    'fn-case',
    'fn-nullfns',
    'fn-cast',
  ],
};

describe('syllabus coverage', () => {
  it('has no duplicate level ids', () => {
    const ids = allLevels.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every registered sequence appears in the registry', () => {
    const seqIds = sequences.map((s) => s.id);
    expect(new Set(seqIds).size).toBe(seqIds.length);
  });

  it('every topic is covered by at least one real, registered level', () => {
    const ids = new Set(allLevels.map((l) => l.id));
    const missing: string[] = [];
    for (const [topic, levelIds] of Object.entries(TOPICS)) {
      for (const id of levelIds) {
        if (!ids.has(id)) missing.push(`${topic} → ${id}`);
      }
      if (levelIds.length === 0) missing.push(`${topic} → (no levels)`);
    }
    expect(missing, `Uncovered/unknown: ${missing.join(', ')}`).toEqual([]);
  });

  it('teaches at least 50 levels across the full syllabus', () => {
    expect(allLevels.length).toBeGreaterThanOrEqual(50);
  });
});
