/**
 * Intro sequence — SELECT fundamentals.
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const selectAll: Level = {
  id: 'intro-select-all',
  name: 'Select Everything',
  hint: 'Use SELECT * FROM customers;',
  schema: shopSchema,
  seed: shopSeed,
  solution: 'SELECT * FROM customers;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'name', 'city', 'signup_year'],
    rows: [
      [1, 'Ada Lovelace', 'London', 2019],
      [2, 'Alan Turing', 'Manchester', 2020],
      [3, 'Grace Hopper', 'New York', 2018],
      [4, 'Edsger Dijkstra', 'Rotterdam', 2021],
      [5, 'Barbara Liskov', 'Los Angeles', 2022],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## SELECT *',
        'A table is a set of rows and columns. To read rows, you write a query.',
        'The simplest query asks for every column of one table: `SELECT * FROM table_name`.',
        'The schema panel on the left shows the shop database — customers, products, and orders.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return every row from `customers` to clear this level.',
        'The goal panel shows the exact result we expect.',
      ],
    },
  ],
};

export const selectColumns: Level = {
  id: 'intro-select-columns',
  name: 'Pick Columns',
  hint: 'SELECT name, city FROM customers;',
  schema: shopSchema,
  seed: shopSeed,
  solution: 'SELECT name, city FROM customers;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city'],
    rows: [
      ['Ada Lovelace', 'London'],
      ['Alan Turing', 'Manchester'],
      ['Grace Hopper', 'New York'],
      ['Edsger Dijkstra', 'Rotterdam'],
      ['Barbara Liskov', 'Los Angeles'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Project Columns',
        'You rarely want every column. List only what you need after SELECT:',
        '`SELECT name, city FROM customers`',
        'Column order in your SELECT list becomes the result order.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return only `name` and `city` from `customers`.',
      ],
    },
  ],
};

export const whereBasic: Level = {
  id: 'intro-where',
  name: 'Filter Rows',
  hint: "SELECT name FROM customers WHERE city = 'London';",
  schema: shopSchema,
  seed: shopSeed,
  solution: "SELECT name FROM customers WHERE city = 'London';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['Ada Lovelace']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## WHERE',
        'WHERE keeps only the rows that match a condition:',
        "`SELECT name FROM customers WHERE city = 'London'`",
        'Use `=` for equality. Text values go in single quotes.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return the `name` of customers whose city is London.',
      ],
    },
  ],
};

export const orderLimit: Level = {
  id: 'intro-order-limit',
  name: 'Order and Limit',
  hint: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'price'],
    rows: [
      ['Monitor', 249],
      ['Keyboard', 89.5],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## ORDER BY and LIMIT',
        '`ORDER BY price DESC` sorts from highest to lowest. Use `ASC` (default) for the reverse.',
        '`LIMIT n` keeps only the first n rows after sorting.',
        'When a level shows a numbered goal list, order matters.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Return `name` and `price` of the two most expensive products.',
      ],
    },
  ],
};

export const introLevels: Level[] = [
  selectAll,
  selectColumns,
  whereBasic,
  orderLimit,
];
