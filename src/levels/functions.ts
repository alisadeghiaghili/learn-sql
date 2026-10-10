/**
 * Functions & CASE sequence — scalar functions, string/math/date helpers,
 * conditional logic, and NULL-forgiving wrappers.
 */
import { shopSchema, shopSeed } from './shopSchema';
import { peopleSchema, peopleSeed } from './customSchemas';
import type { Level } from './types';

export const stringFns: Level = {
  id: 'fn-string',
  name: 'String Functions',
  hint: "SELECT name, UPPER(name), LENGTH(name) FROM products WHERE name = 'Keyboard';",
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name, UPPER(name) AS upper_name, LENGTH(name) AS len FROM products WHERE name = 'Keyboard';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'upper_name', 'len'],
    rows: [['Keyboard', 'KEYBOARD', 8]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## String Functions',
        'Functions transform a value. `UPPER(x)` uppercases, `LOWER(x)` lowercases,',
        '`LENGTH(x)` counts characters, `SUBSTR(x, n, m)` slices a substring.',
        'Give a result an output label with `AS`.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Return `name`, its uppercase form, and its length for the Keyboard.'],
    },
  ],
};

export const concat: Level = {
  id: 'fn-concat',
  name: 'Concatenation',
  hint: "SELECT name, 'costs ' || price FROM products WHERE id = 1;",
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name, 'costs ' || price || ' dollars' AS price_text FROM products WHERE id = 1;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'price_text'],
    rows: [['Keyboard', 'costs 89.5 dollars']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Concatenation',
        'In SQLite, `||` glues strings together. Numbers are coerced to text first.',
        '`\'costs \' || price || \' dollars\'` builds a sentence from a value.',
        '(`CONCAT(a, b)` is the standard-SQL spelling; SQLite also supports it.)',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Build a `price_text` like "costs 89.5 dollars" for the Keyboard.'],
    },
  ],
};

export const mathFns: Level = {
  id: 'fn-math',
  name: 'Math Functions',
  hint: 'SELECT price, ROUND(price * 1.1), ABS(price - 249) FROM products WHERE id = 2;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT price, ROUND(price * 1.1) AS with_tax, ABS(price - 249) AS diff FROM products WHERE id = 2;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['price', 'with_tax', 'diff'],
    rows: [[24, 26, 225]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Math Functions',
        'You can do arithmetic directly (`price * 1.1`). Helpers:',
        '`ROUND(x)` rounds to a whole number, `ABS(x)` returns the magnitude.',
        'Also: `MIN(x)` / `MAX(x)` as scalar functions, `POWER`, `SQRT`.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'For the Mouse: show `with_tax` (price * 1.1, rounded) and `diff` (distance from 249).',
      ],
    },
  ],
};

export const dateFns: Level = {
  id: 'fn-date',
  name: 'Date & Time Functions',
  hint: "SELECT order_date, strftime('%Y-%m', order_date) FROM orders WHERE id = 1;",
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT order_date, strftime('%Y-%m', order_date) AS month, date(order_date, '+1 day') AS next_day FROM orders WHERE id = 1;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['order_date', 'month', 'next_day'],
    rows: [['2024-01-12', '2024-01', '2024-01-13']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Dates',
        'Dates are stored as ISO text. SQLite treats them as strings you can format:',
        "`strftime('%Y-%m', d)` → \"YYYY-MM\", `date(d, '+1 day')` shifts a date.",
        '`julianday(d)` gives a fractional day count, handy for `d1 - d2` durations.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'For order 1: show its date, its month (`YYYY-MM`), and the next day.',
      ],
    },
  ],
};

export const caseWhen: Level = {
  id: 'fn-case',
  name: 'CASE / WHEN',
  hint: 'SELECT name, CASE WHEN price >= 200 THEN \'expensive\' ... FROM products;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name, CASE WHEN price >= 200 THEN 'expensive' WHEN price >= 50 THEN 'mid' ELSE 'cheap' END AS tier FROM products ORDER BY id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'tier'],
    rows: [
      ['Keyboard', 'mid'],
      ['Mouse', 'cheap'],
      ['SQL Handbook', 'cheap'],
      ['Monitor', 'expensive'],
      ['Query Tuning', 'cheap'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## CASE',
        '`CASE WHEN ... THEN ... WHEN ... THEN ... ELSE ... END` is if/elif/else for a column.',
        'It turns raw values into labels or buckets.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Label every product: `expensive` (>=200), `mid` (>=50), else `cheap`. Order by id.',
      ],
    },
  ],
};

export const nullFns: Level = {
  id: 'fn-nullfns',
  name: 'NULL Handling Functions',
  hint: 'SELECT name, COALESCE(city, \'unknown\'), COALESCE(age, 0) FROM people;',
  schema: peopleSchema,
  seed: peopleSeed,
  solution:
    "SELECT name, COALESCE(city, 'unknown') AS city, COALESCE(age, 0) AS age FROM people;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city', 'age'],
    rows: [
      ['Ann', 'London', 30],
      ['Bob', 'unknown', 25],
      ['Cid', 'Paris', 0],
      ['Dot', 'unknown', 0],
      ['Eve', 'Berlin', 41],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## NULL-Friendly Functions',
        'NULL means "unknown". `COALESCE(a, b)` returns a if it is not NULL, else b.',
        '`NULLIF(a, b)` returns NULL when a equals b. `IIF(cond, a, b)` is a one-line CASE.',
        'Never rely on `=` with NULL — use these helpers or `IS NULL`.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Show each person with `city` (or "unknown") and `age` (or 0) filled in.'],
    },
  ],
};

export const castType: Level = {
  id: 'fn-cast',
  name: 'CAST & Types',
  hint: 'SELECT name, CAST(price AS INTEGER), typeof(price) FROM products WHERE id = 1;',
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name, CAST(price AS INTEGER) AS int_price, typeof(price) AS t FROM products WHERE id = 1;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'int_price', 't'],
    rows: [['Keyboard', 89, 'real']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Types & CAST',
        'SQLite has dynamic typing: `typeof(x)` reports integer / real / text / blob / numeric.',
        '`CAST(x AS INTEGER)` converts (truncating a fractional real to a whole number).',
      ],
    },
    {
      type: 'modal',
      markdowns: ['For the Keyboard: show its price as an INTEGER and its `typeof`.'],
    },
  ],
};

export const functionLevels: Level[] = [
  stringFns,
  concat,
  mathFns,
  dateFns,
  caseWhen,
  nullFns,
  castType,
];
