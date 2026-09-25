/**
 * Aggregation sequence.
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const groupBy: Level = {
  id: 'groups-count',
  name: 'COUNT and GROUP BY',
  hint: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
  schema: shopSchema,
  seed: shopSeed,
  solution: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['category', 'COUNT(*)'],
    rows: [
      ['Books', 2],
      ['Hardware', 3],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Aggregates',
        'COUNT, SUM, AVG, MIN, MAX collapse many rows into one value.',
        'GROUP BY tells SQL which bucket each row belongs to:',
        '`SELECT category, COUNT(*) FROM products GROUP BY category`',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return each product category and how many products it has.',
      ],
    },
  ],
};

export const havingSum: Level = {
  id: 'groups-having',
  name: 'HAVING',
  hint: `SELECT customer_id, SUM(quantity)
FROM orders
GROUP BY customer_id
HAVING SUM(quantity) > 2;`,
  schema: shopSchema,
  seed: shopSeed,
  solution: `SELECT customer_id, SUM(quantity)
FROM orders
GROUP BY customer_id
HAVING SUM(quantity) > 2;`,
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['customer_id', 'SUM(quantity)'],
    rows: [
      [1, 4],
      [2, 3],
      [3, 4],
      [4, 3],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## WHERE vs HAVING',
        'WHERE filters rows before grouping. HAVING filters groups after aggregation.',
        'To keep only groups whose SUM is greater than 2, use HAVING.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return customer_id and total quantity for customers who ordered more than 2 items in total.',
      ],
    },
  ],
};

export const groupsLevels: Level[] = [groupBy, havingSum];
