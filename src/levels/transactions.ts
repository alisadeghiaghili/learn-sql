/**
 * Transactions & ACID — BEGIN/COMMIT/ROLLBACK and atomicity.
 * Note: db.exec runs the whole solution in one call, so ROLLBACK is
 * demonstrated as a teaching dialog + a committed atomic transfer.
 */
import type { Level } from './types';

export const beginCommit: Level = {
  id: 'tx-commit',
  name: 'BEGIN / COMMIT',
  hint: "BEGIN; INSERT INTO users (id, name) VALUES (1, 'Ada'); COMMIT; SELECT ...;",
  schema: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);',
  seed: '',
  solution:
    "BEGIN; INSERT INTO users (id, name) VALUES (1, 'Ada'), (2, 'Alan'); COMMIT; SELECT id, name FROM users ORDER BY id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'name'],
    rows: [
      [1, 'Ada'],
      [2, 'Alan'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Transactions',
        '`BEGIN` starts a transaction; `COMMIT` makes every change inside it',
        'permanent. A transaction is the unit of ACID: All-or-Nothing (Atomic).',
        'Wrap a group of related changes so they succeed or fail together.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Use a transaction to add both Ada and Alan, commit it, then show the table.'],
    },
  ],
};

export const atomicTransfer: Level = {
  id: 'tx-atomic',
  name: 'Atomic Transfer',
  hint: 'BEGIN; UPDATE ... SET balance = balance - 100 ...; UPDATE ... + 100 ...; COMMIT;',
  schema: 'CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT, balance REAL);',
  seed: "INSERT INTO accounts VALUES (1, 'Ada', 200), (2, 'Alan', 100);",
  solution:
    "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE owner = 'Ada'; UPDATE accounts SET balance = balance + 100 WHERE owner = 'Alan'; COMMIT; SELECT owner, balance FROM accounts ORDER BY id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['owner', 'balance'],
    rows: [
      ['Ada', 100],
      ['Alan', 200],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## Why transactions matter',
        'A money transfer needs two updates to stay consistent: the total must',
        'never change. Do both inside one transaction — if the second fails,',
        'the whole thing rolls back, so no money is created or destroyed.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Move 100 from Ada to Alan in a single transaction, then show both balances.'],
    },
  ],
};

export const rollback: Level = {
  id: 'tx-rollback',
  name: 'ROLLBACK',
  hint: 'BEGIN; UPDATE ...; ROLLBACK; SELECT ...',
  schema: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, city TEXT);',
  seed: "INSERT INTO users VALUES (1, 'Ada', 'London');",
  solution:
    "BEGIN; UPDATE users SET city = 'Paris' WHERE name = 'Ada'; ROLLBACK; SELECT name, city FROM users;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city'],
    rows: [['Ada', 'London']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## ROLLBACK',
        '`ROLLBACK` undoes everything since `BEGIN`, restoring the previous state.',
        'Here we change Ada to Paris and then roll back — her city stays London.',
        'This is how a failed or cancelled operation leaves the database pristine.',
      ],
    },
    {
      type: 'modal',
      markdowns: ['Change Ada to Paris inside a transaction, then ROLLBACK. Her city should still be London.'],
    },
  ],
};

export const acidConcepts: Level = {
  id: 'tx-acid',
  name: 'ACID & Isolation',
  hint: 'Think: Atomic, Consistent, Isolated, Durable. Verify balances are unchanged by a committed tx.',
  schema: 'CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT, balance REAL);',
  seed: "INSERT INTO accounts VALUES (1, 'Ada', 200), (2, 'Alan', 100);",
  solution:
    'SELECT SUM(balance) AS total, COUNT(*) AS n FROM accounts;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['total', 'n'],
    rows: [[300, 2]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: [
        '## ACID',
        '**Atomic** — a transaction is all-or-nothing.',
        '**Consistent** — it moves the DB from one valid state to another (rules hold).',
        '**Isolated** — concurrent transactions do not interfere (isolation levels: READ',
        'COMMITTED, REPEATABLE READ, SERIALIZABLE, ...).',
        '**Durable** — once committed, changes survive a crash.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        'Show the invariant a correct transfer preserves: total balance (300) and row count (2).',
      ],
    },
  ],
};

export const transactionLevels: Level[] = [
  beginCommit,
  atomicTransfer,
  rollback,
  acidConcepts,
];
