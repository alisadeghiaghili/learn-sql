/**
 * Subqueries & CTEs — scalar subqueries, IN/EXISTS, derived tables,
 * WITH (common table expressions), and recursive CTEs.
 */
import { shopSchema, shopSeed } from './shopSchema';
import { employeesSchema, employeesSeed } from './customSchemas';
import type { Level } from './types';

export const scalarSubquery: Level = {
  id: 'subq-scalar',
  name: 'Scalar Subquery',
  hint: 'SELECT name, price, (SELECT MAX(price) FROM products) FROM products;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price FROM products;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'price', 'max_price'],
    rows: [
      ['Keyboard', 89.5, 249],
      ['Mouse', 24, 249],
      ['SQL Handbook', 39.9, 249],
      ['Monitor', 249, 249],
      ['Query Tuning', 45, 249],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Scalar Subquery',
        'A subquery in the SELECT list returns ONE value that is repeated on',
        'every row. `(SELECT MAX(price) FROM products)` is the catalog max.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Return every product with the catalog-wide max price next to it.'],
    },
  ],
};

export const inSubquery: Level = {
  id: 'subq-in',
  name: 'Subquery with IN',
  hint: 'SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders);',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE product_id IN (SELECT id FROM products WHERE category = \'Books\'));',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Ada Lovelace'],
      ['Alan Turing'],
      ['Grace Hopper'],
      ['Barbara Liskov'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## IN with a subquery',
        '`x IN (SELECT ...)` keeps rows where x matches ANY value from the subquery.',
        'Here we nest two: orders whose product is a Book, then customers who',
        'placed such an order.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['List the names of customers who ordered at least one Book.'],
    },
  ],
};

export const existsSubquery: Level = {
  id: 'subq-exists',
  name: 'EXISTS',
  hint: 'SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Ada Lovelace'],
      ['Alan Turing'],
      ['Grace Hopper'],
      ['Edsger Dijkstra'],
      ['Barbara Liskov'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## EXISTS',
        '`EXISTS (correlated subquery)` tests whether ANY row satisfies a',
        'condition that references the OUTER row. It short-circuits on first match.',
        'Here: a customer exists a matching order for.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['List customers who have placed at least one order, using EXISTS.'],
    },
  ],
};

export const derivedTable: Level = {
  id: 'subq-derived',
  name: 'Derived Table',
  hint: 'SELECT * FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT category, n FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t ORDER BY n DESC;',
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
        '## Derived Table',
        'A subquery in the FROM clause is a *derived table* — a temporary',
        'result you then query, alias, and sort. `( ... ) t` gives it a name.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Build a derived table of category counts and show it, biggest first.'],
    },
  ],
};

export const cteBasic: Level = {
  id: 'subq-cte',
  name: 'CTE (WITH)',
  hint: 'WITH expensive AS (SELECT * FROM products WHERE price > 50) SELECT ... FROM expensive;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'WITH expensive AS (SELECT id, name, price FROM products WHERE price > 50) SELECT name, price FROM expensive ORDER BY price DESC;',
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
        '## CTEs',
        '`WITH name AS (SELECT ...) SELECT ...` names a reusable result for the',
        'statement. CTEs read top-to-bottom and make complex queries clearer.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Create a CTE of products priced above 50, then list them, priciest first.'],
    },
  ],
};

export const recursiveCte: Level = {
  id: 'subq-recursive',
  name: 'Recursive CTE',
  hint: "WITH RECURSIVE r AS (SELECT ... WHERE manager_id IS NULL UNION ALL SELECT ...) SELECT ...",
  schema: employeesSchema,
  seed: employeesSeed,
  solution:
    "WITH RECURSIVE r AS (\n  SELECT id, name, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id, r.depth + 1 FROM employees e JOIN r ON e.manager_id = r.id\n)\nSELECT id, name, depth FROM r ORDER BY depth, id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'name', 'depth'],
    rows: [
      [1, 'CEO', 0],
      [2, 'CTO', 1],
      [6, 'Finance', 1],
      [3, 'VP Eng', 2],
      [4, 'Dev A', 3],
      [5, 'Dev B', 3],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Recursive CTE',
        '`WITH RECURSIVE` walks a hierarchy. Start from roots (the CEO, whose',
        'manager is NULL), then repeatedly join children to their parent, adding',
        'a depth. This flattens a tree into rows.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Flatten the org chart: every employee with their depth from the CEO, ordered by depth then id.'],
    },
  ],
};

export const subqueryLevels: Level[] = [
  scalarSubquery,
  inSubquery,
  existsSubquery,
  derivedTable,
  cteBasic,
  recursiveCte,
];
