/**
 * Joins sequence — combining tables.
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const innerJoin: Level = {
  id: 'joins-inner',
  name: 'INNER JOIN',
  hint: `SELECT customers.name, products.name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;`,
  schema: shopSchema,
  seed: shopSeed,
  solution: `SELECT customers.name, products.name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;`,
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'name'],
    rows: [
      ['Ada Lovelace', 'Keyboard'],
      ['Ada Lovelace', 'SQL Handbook'],
      ['Alan Turing', 'Monitor'],
      ['Grace Hopper', 'Mouse'],
      ['Grace Hopper', 'Query Tuning'],
      ['Edsger Dijkstra', 'Keyboard'],
      ['Barbara Liskov', 'SQL Handbook'],
      ['Alan Turing', 'Query Tuning'],
      ['Ada Lovelace', 'Monitor'],
      ['Edsger Dijkstra', 'Mouse'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## JOIN',
        'Orders store foreign keys, not names. JOIN stitches tables on a key:',
        '`FROM orders JOIN customers ON orders.customer_id = customers.id`',
        'INNER JOIN keeps only matching rows (JOIN is INNER by default).',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'List every order as customer name and product name (two columns both called `name`).',
      ],
    },
  ],
};

export const leftJoin: Level = {
  id: 'joins-left',
  name: 'LEFT JOIN',
  hint: `SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
  schema: shopSchema,
  seed: shopSeed,
  solution: `SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'id'],
    rows: [
      ['Ada Lovelace', 1],
      ['Ada Lovelace', 2],
      ['Ada Lovelace', 9],
      ['Alan Turing', 3],
      ['Alan Turing', 8],
      ['Grace Hopper', 4],
      ['Grace Hopper', 5],
      ['Edsger Dijkstra', 6],
      ['Edsger Dijkstra', 10],
      ['Barbara Liskov', 7],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## LEFT JOIN',
        'LEFT JOIN keeps every left row, filling right-side columns with NULL when nothing matches.',
        'Start from `customers` so customers without orders still appear.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'List all customers with their order ids. Customers without orders must still appear.',
        '(In this dataset everyone has at least one order — the form of the query still matters.)',
      ],
    },
  ],
};

export const joinsLevels: Level[] = [innerJoin, leftJoin];
