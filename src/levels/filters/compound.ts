/**
 * Filters sequence — compound predicates and pattern matching.
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const andOr: Level = {
  id: 'filters-and-or',
  name: 'AND / OR',
  hint: "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['Ada Lovelace'], ['Grace Hopper']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Combining Conditions',
        'AND requires both sides. OR accepts either.',
        "`WHERE city = 'London' OR city = 'New York'`",
        'You can also use `IN (...)` for the same idea more cleanly.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return names of customers in London or New York.',
      ],
    },
  ],
};

export const inBetween: Level = {
  id: 'filters-in-between',
  name: 'IN and BETWEEN',
  hint: 'SELECT name FROM products WHERE category = \'Books\' AND price BETWEEN 30 AND 50;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['SQL Handbook'], ['Query Tuning']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## IN and BETWEEN',
        "`IN ('Books', 'Hardware')` matches a set. `BETWEEN 30 AND 50` is inclusive on both ends.",
        'Combine them with AND / OR as needed.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return book names priced between 30 and 50 inclusive.',
      ],
    },
  ],
};

export const likeNull: Level = {
  id: 'filters-like-null',
  name: 'LIKE and NULL',
  hint: "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city'],
    rows: [
      ['Ada Lovelace', 'London'],
      ['Alan Turing', 'Manchester'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## LIKE and NULL',
        "`LIKE 'A%'` matches strings starting with A. `%` is a wildcard; `_` is one character.",
        'NULL is unknown — never use `= NULL`. Write `IS NULL` or `IS NOT NULL`.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return names (and cities) of customers whose name starts with A, or whose city is NULL.',
      ],
    },
  ],
};

export const filtersLevels: Level[] = [andOr, inBetween, likeNull];
