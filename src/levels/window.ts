/**
 * Window Functions — ranking, running totals, and partitioned aggregates.
 * SQLite (via sql.js) supports the full window-function syntax.
 */
import { shopSchema, shopSeed } from './shopSchema';
import { peopleSchema, peopleSeed } from './customSchemas';
import type { Level } from './types';

export const ranking: Level = {
  id: 'win-rank',
  name: 'Ranking Functions',
  hint: 'SELECT id, quantity, RANK() OVER (ORDER BY quantity DESC) FROM orders;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT id, quantity, RANK() OVER (ORDER BY quantity DESC) AS rnk, DENSE_RANK() OVER (ORDER BY quantity DESC) AS drnk FROM orders ORDER BY id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'quantity', 'rnk', 'drnk'],
    rows: [
      [1, 1, 5, 3],
      [2, 2, 2, 2],
      [3, 1, 5, 3],
      [4, 3, 1, 1],
      [5, 1, 5, 3],
      [6, 2, 2, 2],
      [7, 1, 5, 3],
      [8, 2, 2, 2],
      [9, 1, 5, 3],
      [10, 1, 5, 3],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Ranking Functions',
        '`RANK() OVER (ORDER BY ...)` assigns ranks to rows *without* collapsing',
        'them. Ties share a rank and the next rank is skipped (RANK), while',
        'DENSE_RANK has no gaps. `ROW_NUMBER` never ties.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Show each order id, its quantity, its RANK and DENSE_RANK by quantity (desc), ordered by id.'],
    },
  ],
};

export const runningTotal: Level = {
  id: 'win-running',
  name: 'Running Total (SUM OVER)',
  hint: 'SELECT id, quantity, SUM(quantity) OVER (ORDER BY id) FROM orders;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT id, quantity, SUM(quantity) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running FROM orders ORDER BY id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'quantity', 'running'],
    rows: [
      [1, 1, 1],
      [2, 2, 3],
      [3, 1, 4],
      [4, 3, 7],
      [5, 1, 8],
      [6, 2, 10],
      [7, 1, 11],
      [8, 2, 13],
      [9, 1, 14],
      [10, 1, 15],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Running Totals',
        '`SUM(x) OVER (ORDER BY id ROWS ... CURRENT ROW)` accumulates x as you',
        'scan. The frame controls how many preceding rows are included. Unlike',
        'GROUP BY, the original rows are preserved — one row in, one row out.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Show each order with a running total of quantity ordered by id.'],
    },
  ],
};

export const partitionBy: Level = {
  id: 'win-partition',
  name: 'PARTITION BY',
  hint: 'SELECT name, city, RANK() OVER (PARTITION BY city ORDER BY age DESC) FROM people;',
  schema: peopleSchema,
  seed: peopleSeed,
  solution:
    "SELECT name, city, RANK() OVER (PARTITION BY city ORDER BY age DESC) AS city_rank FROM people WHERE city IS NOT NULL ORDER BY city, city_rank;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city', 'city_rank'],
    rows: [
      ['Eve', 'Berlin', 1],
      ['Ann', 'London', 1],
      ['Cid', 'Paris', 1],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## PARTITION BY',
        '`PARTITION BY` restarts the window per group — like GROUP BY, but it does',
        'NOT collapse rows. `OVER (PARTITION BY city ORDER BY age)` ranks each',
        'person within their own city.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Rank each person by age within their city (newest first). Show name, city, and rank.'],
    },
  ],
};

export const lagLead: Level = {
  id: 'win-laglead',
  name: 'LAG / LEAD',
  hint: 'SELECT id, price, LAG(price) OVER (ORDER BY id) FROM products;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT id, price, LAG(price) OVER (ORDER BY id) AS prev_price, LEAD(price) OVER (ORDER BY id) AS next_price FROM products ORDER BY id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'price', 'prev_price', 'next_price'],
    rows: [
      [1, 89.5, null, 24],
      [2, 24, 89.5, 39.9],
      [3, 39.9, 24, 249],
      [4, 249, 39.9, 45],
      [5, 45, 249, null],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## LAG / LEAD',
        '`LAG(x)` / `LEAD(x)` read the previous / next row within the window.',
        'Great for period-over-period deltas: `price - LAG(price)`. Edge rows',
        'return NULL (no neighbour exists).',
      ],
    },
    {
      type: 'modal',
      markdowns: ['For each product (ordered by id), show its price, the previous price, and the next price.'],
    },
  ],
};

export const windowLevels: Level[] = [ranking, runningTotal, partitionBy, lagLead];
