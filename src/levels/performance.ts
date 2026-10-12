/**
 * Indexes & performance — CREATE INDEX, EXPLAIN QUERY PLAN, and query tuning.
 * Goals verify index existence via sqlite_master (deterministic); the
 * EXPLAIN output is shown to the learner in the dialog/sandbox.
 */
import { shopSchema, shopSeed } from './shopSchema';
import type { Level } from './types';

export const indexCreate: Level = {
  id: 'perf-index',
  name: 'CREATE INDEX',
  hint: 'CREATE INDEX idx_city ON customers(city);',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['idx_city']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Indexes',
        'An index is a sorted lookup structure over a column, like a book index.',
        'It makes `WHERE city = ...` fast by avoiding a full table scan.',
        '`CREATE INDEX idx ON table(col)`. Verify it via the `sqlite_master` catalog.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Create an index on customers(city) and confirm it appears in the catalog.'],
    },
  ],
};

export const indexExplain: Level = {
  id: 'perf-explain',
  name: 'EXPLAIN QUERY PLAN',
  hint: "EXPLAIN QUERY PLAN SELECT * FROM customers WHERE city = 'London';",
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['idx_city']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'demo',
      markdowns: [
        '## EXPLAIN QUERY PLAN',
        '`EXPLAIN QUERY PLAN SELECT ...` shows HOW SQLite runs the query.',
        'Without an index you see "SCAN customers". Create one and you see',
        '`SEARCH customers USING INDEX idx_city` — a targeted lookup, not a scan.',
      ],
      command: "EXPLAIN QUERY PLAN SELECT * FROM customers WHERE city = 'London';",
      beforeMarkdowns: ['Before the index, the plan reads:'],
      afterMarkdowns: ['Now add `CREATE INDEX idx_city ON customers(city);`, then run the EXPLAIN again.'],
    },
    {
      type: 'modal',
      markdowns: ['Create the index on customers(city), then confirm it exists in the catalog.'],
    },
  ],
};

export const compositeIndex: Level = {
  id: 'perf-composite',
  name: 'Composite Index',
  hint: 'CREATE INDEX idx_cat_price ON products(category, price);',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "CREATE INDEX idx_cat_price ON products(category, price); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_cat_price';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['idx_cat_price']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Composite Indexes',
        'A composite (multi-column) index `(a, b)` is sorted by a, then b.',
        'It serves filters on `a`, and on `a AND b`. Column order matters for',
        'which queries benefit.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Create a composite index on products(category, price) and confirm it.'],
    },
  ],
};

export const noSelectStar: Level = {
  id: 'perf-nostar',
  name: 'Avoid SELECT *',
  hint: 'SELECT name FROM products WHERE category = \'Books\';',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name FROM products WHERE category = 'Books' ORDER BY name;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Query Tuning'],
      ['SQL Handbook'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Tuning habits',
        'Selecting `*` pulls every column and blocks some index-only (covering)',
        'query plans. Ask for exactly the columns you need. Combined with a',
        'matching index, the engine can answer without touching the full row.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Return just the names of the books, sorted. Only fetch what you need.'],
    },
  ],
};

export const performanceLevels: Level[] = [
  indexCreate,
  indexExplain,
  compositeIndex,
  noSelectStar,
];
