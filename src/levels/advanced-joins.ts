/**
 * Advanced joins — CROSS, SELF, and (for dialects that lack RIGHT/FULL)
 * how to express them. SQLite has no RIGHT/FULL OUTER JOIN, so those are
 * taught via the LEFT-JOIN workarounds.
 */
import { shopSchema, shopSeed } from './shopSchema';
import { employeesSchema, employeesSeed } from './customSchemas';
import type { Level } from './types';

export const crossJoin: Level = {
  id: 'aj-cross',
  name: 'CROSS JOIN',
  hint: 'SELECT c.name, p.name FROM customers c CROSS JOIN products p;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT COUNT(*) AS pairs FROM customers c CROSS JOIN products p;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['pairs'],
    rows: [[25]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## CROSS JOIN',
        'A `CROSS JOIN` pairs EVERY row of the left table with EVERY row of the',
        'right table — a cartesian product. 5 customers × 5 products = 25 pairs.',
        'Useful for generating combinations (e.g. every customer × every plan).',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Count how many rows a `CROSS JOIN` of customers and products produces.'],
    },
  ],
};

export const selfJoin: Level = {
  id: 'aj-self',
  name: 'SELF JOIN',
  hint: 'SELECT e.name, m.name FROM employees e JOIN employees m ON e.manager_id = m.id;',
  schema: employeesSchema,
  seed: employeesSeed,
  solution:
    "SELECT e.name AS employee, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id ORDER BY e.id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['employee', 'manager'],
    rows: [
      ['CTO', 'CEO'],
      ['VP Eng', 'CTO'],
      ['Dev A', 'VP Eng'],
      ['Dev B', 'VP Eng'],
      ['Finance', 'CEO'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## SELF JOIN',
        'A table can be joined to ITSELF. Alias it twice: `employees e` (the',
        'worker) and `employees m` (the manager), then match on the foreign key.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['List each employee and their manager, ordered by employee id.'],
    },
  ],
};

export const rightJoin: Level = {
  id: 'aj-right',
  name: 'RIGHT JOIN (via LEFT)',
  hint: "SELECT o.id, c.name FROM orders o RIGHT JOIN customers c ON ...;",
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT customers.id AS customer_id, orders.id AS order_id FROM customers LEFT JOIN orders ON orders.customer_id = customers.id ORDER BY customers.id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['customer_id', 'order_id'],
    rows: [
      [1, 1], [1, 2], [1, 9],
      [2, 3], [2, 8],
      [3, 4], [3, 5],
      [4, 6], [4, 10],
      [5, 7],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## RIGHT JOIN',
        '`RIGHT JOIN` keeps every row of the RIGHT table, filling the left with',
        'NULL. **SQLite has no RIGHT JOIN** — express it by swapping the tables',
        'and using `LEFT JOIN`. (Here every customer has an order, so the result',
        'looks full; the *form* is what matters.)',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Using a LEFT JOIN, list every customer with their order ids, ordered by customer id.'],
    },
  ],
};

export const fullJoin: Level = {
  id: 'aj-full',
  name: 'FULL OUTER JOIN (via UNION)',
  hint: 'LEFT JOIN ... UNION ... LEFT JOIN (with tables swapped).',
  schema: employeesSchema,
  seed: employeesSeed,
  solution:
    "SELECT e.id AS id, e.name, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id UNION SELECT e.id, e.name, m.name FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;",
  golfPar: 2,
  goal: {
    type: 'result',
    columns: ['id', 'name', 'manager'],
    rows: [
      [1, 'CEO', null],
      [2, 'CTO', 'CEO'],
      [3, 'VP Eng', 'CTO'],
      [4, 'Dev A', 'VP Eng'],
      [5, 'Dev B', 'VP Eng'],
      [6, 'Finance', 'CEO'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## FULL OUTER JOIN',
        '`FULL OUTER JOIN` keeps ALL rows from both sides. **SQLite has none.**',
        'Build it as `LEFT JOIN a b ... UNION LEFT JOIN b a ...` — the union of',
        'both directions captures every row, NULL-filled where there is no match.',
        'The CEO has no manager, so their manager column is NULL.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Produce a full-outer-join of employees to their manager: every employee, manager or NULL.'],
    },
  ],
};

export const advancedJoinLevels: Level[] = [crossJoin, selfJoin, rightJoin, fullJoin];
