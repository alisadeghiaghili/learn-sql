/**
 * End-to-end engine tests against the shop schema and level solutions.
 */

import { describe, expect, it } from 'vitest';
import { createDatabase } from './db';
import { compareResults } from './compare';
import { allLevels, shopSchema, shopSeed } from '../levels';

describe('LearnSqlDb', () => {
  it('seeds the shop schema and runs SELECT', async () => {
    const db = await createDatabase(shopSchema, shopSeed);
    const res = db.run('SELECT COUNT(*) AS n FROM customers');
    expect(res.rows[0][0]).toBe(5);
    const tables = db.listTables().map((t) => t.name).sort();
    expect(tables).toEqual(['customers', 'orders', 'products']);
    db.close();
  });

  it('throws SqlError on bad SQL', async () => {
    const db = await createDatabase(shopSchema, shopSeed);
    expect(() => db.run('SELEC * FROM nope')).toThrow();
    db.close();
  });
});

describe('level solutions satisfy goals', () => {
  for (const level of allLevels) {
    it(level.id, async () => {
      const db = await createDatabase(level.schema, level.seed);
      const res = db.run(level.solution);
      expect(res.columns.length).toBeGreaterThan(0);

      if (level.goal.type === 'result') {
        const check = compareResults(res, level.goal);
        expect(check.solved, `${level.id}: ${check.reason}`).toBe(true);
      } else if (level.goal.type === 'table') {
        const dump = db.dumpTable(level.goal.table);
        const check = compareResults(dump, level.goal);
        expect(check.solved, `${level.id}: ${check.reason}`).toBe(true);
      }
      db.close();
    });
  }
});
