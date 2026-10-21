/**
 * Hint solvability guard: following a hint must clear its level.
 *
 * Two levels (fn-string, fn-concat) once shipped with hints that could not be
 * solved because only `solution` was tested. This runs every SQL-looking hint,
 * in every locale variant, through the same win check the app uses.
 */
import { describe, expect, it } from 'vitest';
import { createDatabase } from '../engine/db';
import { compareResults } from '../engine/compare';
import { LOCALES } from '../i18n';
import { allLevels } from './index';
import { localize } from './types';

const SQL_START =
  /^\s*(select|with|insert|update|delete|create|drop|alter|begin|pragma|explain|replace)\b/i;

/** Level ids whose hint is known to be broken and tracked elsewhere. Keep empty if possible. */
const KNOWN_BROKEN = new Set<string>([]);

const cases = allLevels.flatMap((level) => {
  const seen = new Set<string>();
  return LOCALES.flatMap(({ code }) => {
    const sql = localize(level.hint, code).trim();
    if (!SQL_START.test(sql) || seen.has(sql)) return [];
    seen.add(sql);
    return [{ level, code, sql }];
  });
});

describe('level hints are solvable', () => {
  it('finds SQL hints to check', () => {
    expect(cases.length).toBeGreaterThan(0);
  });

  for (const { level, code, sql } of cases) {
    const run = KNOWN_BROKEN.has(level.id) ? it.skip : it;
    run(`${level.id} (${code})`, async () => {
      const db = await createDatabase(level.schema, level.seed);
      try {
        const res = db.run(sql);
        const goal = level.goal;
        if (goal.type === 'result') {
          const check = compareResults(res, goal);
          expect(check.solved, `${level.id} [${code}]: ${check.reason}`).toBe(true);
        } else if (goal.type === 'table') {
          const check = compareResults(db.dumpTable(goal.table), goal);
          expect(check.solved, `${level.id} [${code}]: ${check.reason}`).toBe(true);
        } else if (goal.type === 'schema') {
          const missing = goal.tables.filter((name) => !db.hasTable(name));
          expect(missing, `${level.id} [${code}]: missing tables`).toEqual([]);
        }
      } finally {
        db.close();
      }
    });
  }
});
