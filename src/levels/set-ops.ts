/**
 * Set operations — UNION, UNION ALL, INTERSECT, EXCEPT.
 */
import { shopSchema, shopSeed } from './shopSchema';
import type { Level } from './types';

export const union: Level = {
  id: 'set-union',
  name: 'UNION',
  hint: "SELECT city FROM customers UNION SELECT category FROM products;",
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT city FROM customers UNION SELECT category FROM products ORDER BY 1;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['city'],
    rows: [
      ['Books'],
      ['Hardware'],
      ['London'],
      ['Los Angeles'],
      ['Manchester'],
      ['New York'],
      ['Rotterdam'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## UNION',
        '`UNION` stacks the rows of two queries and removes DUPLICATES.',
        'Both queries must return the same number of compatible columns.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Combine all customer cities and all product categories (distinct), sorted.'],
    },
  ],
};

export const unionAll: Level = {
  id: 'set-union-all',
  name: 'UNION ALL',
  hint: 'SELECT city FROM customers UNION ALL SELECT category FROM products;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT COUNT(*) AS total FROM (SELECT city FROM customers UNION ALL SELECT category FROM products);',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['total'],
    rows: [[10]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## UNION ALL',
        '`UNION ALL` is like UNION but KEEPS duplicates (and is faster).',
        '5 cities + 5 categories = 10 rows, even if some values repeat.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Count the total rows from UNION ALL of cities and categories.'],
    },
  ],
};

export const intersect: Level = {
  id: 'set-intersect',
  name: 'INTERSECT',
  hint: 'SELECT DISTINCT customer_id FROM orders INTERSECT SELECT DISTINCT customer_id FROM ...',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT customer_id FROM orders WHERE product_id = 1 INTERSECT SELECT customer_id FROM orders WHERE product_id = 2 ORDER BY 1;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['customer_id'],
    rows: [[4]],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## INTERSECT',
        '`INTERSECT` keeps only values present in BOTH queries (set intersection).',
        'Who ordered the Keyboard (product 1) AND the Mouse (product 2)?',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Find customers who ordered both the Keyboard and the Mouse.'],
    },
  ],
};

export const except: Level = {
  id: 'set-except',
  name: 'EXCEPT',
  hint: 'SELECT DISTINCT customer_id FROM orders EXCEPT SELECT ...',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name FROM customers EXCEPT SELECT customers.name FROM customers JOIN orders ON orders.customer_id = customers.id WHERE orders.product_id = 1 ORDER BY 1;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Alan Turing'],
      ['Barbara Liskov'],
      ['Grace Hopper'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## EXCEPT',
        '`A EXCEPT B` is everything in A but not in B (set difference).',
        'Which customers never ordered the Keyboard?',
      ],
    },
    {
      type: 'modal',
      markdowns: ['List customers who have NOT ordered the Keyboard.'],
    },
  ],
};

export const setOpsLevels: Level[] = [union, unionAll, intersect, except];
