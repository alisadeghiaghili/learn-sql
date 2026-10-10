/**
 * DDL & schema design — CREATE / ALTER / DROP and constraints.
 * Each level's solution ends in a SELECT so the win-check sees a result.
 */
import type { Level } from './types';

export const createTable: Level = {
  id: 'ddl-create',
  name: 'CREATE TABLE',
  hint: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL); INSERT ...;',
  schema: '',
  seed: '',
  solution:
    "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL); INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
  golfPar: 1,
  goal: { type: 'schema', tables: ['users'] },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## CREATE TABLE',
        'DDL (Data Definition Language) shapes the database. `CREATE TABLE`',
        'declares columns and their types. Start from an empty database here.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Create a `users` table with an integer `id` primary key and a non-null `name`.',
        'A "users" table appearing in the schema panel completes the level.',
      ],
    },
  ],
};

export const dataTypes: Level = {
  id: 'ddl-types',
  name: 'Data Types',
  hint: "CREATE TABLE mixed (a INTEGER, b TEXT, c REAL); ... typeof(a) ...",
  schema: '',
  seed: '',
  solution:
    "CREATE TABLE mixed (a INTEGER, b TEXT, c REAL); INSERT INTO mixed VALUES (1, 'hello', 3.14); SELECT typeof(a) AS a_t, typeof(b) AS b_t, typeof(c) AS c_t FROM mixed;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['a_t', 'b_t', 'c_t'],
    rows: [['integer', 'text', 'real']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Data Types',
        'SQLite affinity types: INTEGER, REAL, TEXT, BLOB, NUMERIC.',
        "`typeof(x)` reveals the storage class a value actually used.",
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Create a table with one INTEGER, one TEXT, one REAL column; insert one row;',
        'return the `typeof` of each.',
      ],
    },
  ],
};

export const alterTable: Level = {
  id: 'ddl-alter',
  name: 'ALTER TABLE',
  hint: 'ALTER TABLE books ADD COLUMN pages INTEGER;',
  schema: 'CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT);',
  seed: "INSERT INTO books VALUES (1, 'SQL'), (2, 'Git');",
  solution:
    'ALTER TABLE books ADD COLUMN pages INTEGER; SELECT title, pages FROM books ORDER BY id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['title', 'pages'],
    rows: [
      ['SQL', null],
      ['Git', null],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## ALTER TABLE',
        '`ALTER TABLE t ADD COLUMN c TYPE` changes an existing table\'s shape.',
        'SQLite supports adding a column (existing rows get NULL).',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Add an integer `pages` column to `books`, then show title and pages.'],
    },
  ],
};

export const dropTable: Level = {
  id: 'ddl-drop',
  name: 'DROP TABLE',
  hint: "DROP TABLE temp; SELECT name FROM sqlite_master WHERE type = 'table';",
  schema: 'CREATE TABLE keep (id INTEGER PRIMARY KEY); CREATE TABLE temp (id INTEGER PRIMARY KEY);',
  seed: "INSERT INTO keep VALUES (1); INSERT INTO temp VALUES (1);",
  solution:
    "DROP TABLE temp; SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['keep']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## DROP TABLE',
        '`DROP TABLE` removes a table AND its data. `sqlite_master` is the',
        'catalog that lists every object in the database.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Drop the `temp` table, then list the remaining tables from `sqlite_master`.'],
    },
  ],
};

export const constraints: Level = {
  id: 'ddl-constraints',
  name: 'Constraints (PK / NOT NULL / UNIQUE / DEFAULT / CHECK)',
  hint: 'CREATE TABLE accounts (... DEFAULT 0 ... UNIQUE ... CHECK(...));',
  schema: '',
  seed: '',
  solution:
    "CREATE TABLE accounts (id INTEGER PRIMARY KEY, balance REAL NOT NULL DEFAULT 0, code TEXT UNIQUE, note TEXT CHECK(length(note) < 10)); INSERT INTO accounts (id, code, note) VALUES (1, 'A', 'ok'); SELECT id, balance, code, note FROM accounts;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'balance', 'code', 'note'],
    rows: [[1, 0, 'A', 'ok']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Constraints',
        'Constraints enforce rules: `PRIMARY KEY` (unique id), `NOT NULL`',
        '(no blanks), `UNIQUE` (no duplicates), `DEFAULT` (fill a value),',
        '`CHECK(expr)` (custom rule). Insert a row that satisfies them all.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Create `accounts` with those constraints (balance defaults to 0) and',
        'insert one row; return it. Notice balance fills in as 0 without you setting it.',
      ],
    },
  ],
};

export const ddlLevels: Level[] = [createTable, dataTypes, alterTable, dropTable, constraints];
