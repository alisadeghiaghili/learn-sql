/**
 * Views — named saved queries. SQLite has no materialized views, so the
 * "materialized" pattern is taught as a table kept in sync by a view.
 */
import { shopSchema, shopSeed } from './shopSchema';
import type { Level } from './types';

export const createView: Level = {
  id: 'view-basic',
  name: 'CREATE VIEW',
  hint: 'CREATE VIEW hw AS SELECT * FROM products WHERE category = \'Hardware\';',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "CREATE VIEW hw AS SELECT name, price FROM products WHERE category = 'Hardware'; SELECT name, price FROM hw ORDER BY price DESC;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'price'],
    rows: [
      ['Monitor', 249],
      ['Keyboard', 89.5],
      ['Mouse', 24],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Views',
        'A VIEW is a saved query you can select from like a table. It is',
        'recomputed on every read (it stores no data of its own).',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Create a view `hw` of hardware products, then select from it, priciest first.'],
    },
  ],
};

export const viewJoinAgg: Level = {
  id: 'view-join',
  name: 'View with Join + Aggregate',
  hint: 'CREATE VIEW revenue AS SELECT c.name, SUM(o.quantity) ... GROUP BY ...;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'CREATE VIEW customer_revenue AS SELECT c.name, SUM(o.quantity) AS units FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id; SELECT name, units FROM customer_revenue ORDER BY units DESC, name;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'units'],
    rows: [
      ['Ada Lovelace', 4],
      ['Grace Hopper', 4],
      ['Alan Turing', 3],
      ['Edsger Dijkstra', 3],
      ['Barbara Liskov', 1],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Views can be complex',
        'A view can contain joins, aggregates, and filters — anything a',
        '`SELECT` can. It just becomes a reusable "virtual table".',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Build a view of total units ordered per customer, then show it, most first.'],
    },
  ],
};

export const materializedPattern: Level = {
  id: 'view-materialized',
  name: 'Materialized-view pattern',
  hint: 'CREATE TABLE cache AS SELECT ...; CREATE VIEW v AS SELECT ... FROM cache;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'CREATE TABLE category_totals AS SELECT category, COUNT(*) AS n FROM products GROUP BY category; CREATE VIEW totals AS SELECT category, n FROM category_totals; SELECT category, n FROM totals ORDER BY n DESC, category;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['category', 'n'],
    rows: [
      ['Hardware', 3],
      ['Books', 2],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## "Materialized" views',
        'SQLite has no materialized views (which cache results). Emulate one:',
        'a real TABLE holding the computed result, plus a VIEW over it. Refresh',
        'the table (DROP + recreate, or triggers) to keep it current.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Create a table of per-category product counts, then a view over it, and select the view.',
      ],
    },
  ],
};

export const viewLevels: Level[] = [createView, viewJoinAgg, materializedPattern];
