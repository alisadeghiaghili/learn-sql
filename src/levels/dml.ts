/**
 * DML — modifying data: INSERT, UPDATE, DELETE, and UPSERT.
 * Each solution performs the mutation then SELECTs to show the new state.
 */
import type { Level } from './types';

export const insertOne: Level = {
  id: 'dml-insert',
  name: 'INSERT one row',
  hint: "INSERT INTO users (id, name) VALUES (1, 'Ada');",
  schema: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);',
  seed: '',
  solution: "INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'name'],
    rows: [[1, 'Ada']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## INSERT',
        'DML (Data Manipulation Language) changes row data. `INSERT` adds a row.',
        'List the columns you are providing and the matching `VALUES`.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Insert Ada (id 1) into `users`, then return the table.'],
    },
  ],
};

export const insertMany: Level = {
  id: 'dml-insert-many',
  name: 'INSERT many rows',
  hint: "INSERT INTO users (id, name) VALUES (1,'Ada'), (2,'Alan'), (3,'Grace');",
  schema: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);',
  seed: '',
  solution:
    "INSERT INTO users (id, name) VALUES (1, 'Ada'), (2, 'Alan'), (3, 'Grace'); SELECT id, name FROM users ORDER BY id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'name'],
    rows: [
      [1, 'Ada'],
      [2, 'Alan'],
      [3, 'Grace'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Bulk INSERT',
        'One `INSERT` can add many rows: separate each `VALUES` group with a',
        'comma. This is far more efficient than one statement per row.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Insert Ada, Alan, and Grace in a single INSERT; return all, ordered by id.'],
    },
  ],
};

export const update: Level = {
  id: 'dml-update',
  name: 'UPDATE',
  hint: "UPDATE users SET city = 'Paris' WHERE name = 'Ada';",
  schema: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, city TEXT);',
  seed: "INSERT INTO users VALUES (1, 'Ada', 'London'), (2, 'Alan', 'Manchester');",
  solution:
    "UPDATE users SET city = 'Paris' WHERE name = 'Ada'; SELECT name, city FROM users ORDER BY id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city'],
    rows: [
      ['Ada', 'Paris'],
      ['Alan', 'Manchester'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## UPDATE',
        '`UPDATE t SET col = val WHERE ...` changes existing rows. The `WHERE`',
        'is essential — without it you update EVERY row.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Move Ada to Paris, then show name and city for everyone.'],
    },
  ],
};

export const deleteRows: Level = {
  id: 'dml-delete',
  name: 'DELETE',
  hint: "DELETE FROM users WHERE name = 'Alan';",
  schema: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);',
  seed: "INSERT INTO users VALUES (1, 'Ada'), (2, 'Alan'), (3, 'Grace');",
  solution:
    "DELETE FROM users WHERE name = 'Alan'; SELECT name FROM users ORDER BY id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Ada'],
      ['Grace'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## DELETE',
        '`DELETE FROM t WHERE ...` removes rows. As with UPDATE, always give a',
        '`WHERE` clause unless you truly mean to clear the whole table.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Delete Alan, then list the remaining users.'],
    },
  ],
};

export const upsert: Level = {
  id: 'dml-upsert',
  name: 'UPSERT (INSERT OR ...)',
  hint: 'INSERT ... ON CONFLICT(id) DO UPDATE SET visits = visits + excluded.visits;',
  schema: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, visits INTEGER);',
  seed: "INSERT INTO users VALUES (1, 'Ada', 1);",
  solution:
    "INSERT INTO users (id, name, visits) VALUES (1, 'Ada', 2) ON CONFLICT(id) DO UPDATE SET visits = visits + excluded.visits; SELECT name, visits FROM users;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'visits'],
    rows: [['Ada', 3]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## UPSERT',
        'An *upsert* inserts OR updates in one step. SQLite: `INSERT ... ON',
        'CONFLICT(col) DO UPDATE SET ...`. `excluded.visits` refers to the row',
        'that was just attempted. Ada already has 1 visit; adding 2 → 3.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Upsert Ada with 2 more visits so her total becomes 3, then show name and visits.'],
    },
  ],
};

export const dmlLevels: Level[] = [insertOne, insertMany, update, deleteRows, upsert];
