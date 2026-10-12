/**
 * Transactions & ACID — BEGIN/COMMIT/ROLLBACK and atomicity.
 * Note: db.exec runs the whole solution in one call, so ROLLBACK is
 * demonstrated as a teaching dialog + a committed atomic transfer.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */
import type { Level } from './types';

export const beginCommit: Level = {
  id: 'tx-commit',
  name: {
    fa: 'تراکنش‌ها (BEGIN و COMMIT)',
    en: 'Transactions (BEGIN & COMMIT)',
    de: 'Transaktionen (BEGIN & COMMIT)',
  },
  hint: {
    fa: "BEGIN; INSERT INTO users (id, name) VALUES (1, 'Ada'), (2, 'Alan'); COMMIT; SELECT id, name FROM users ORDER BY id;",
    en: "BEGIN; INSERT INTO users (id, name) VALUES (1, 'Ada'), (2, 'Alan'); COMMIT; SELECT id, name FROM users ORDER BY id;",
    de: "BEGIN; INSERT INTO users (id, name) VALUES (1, 'Ada'), (2, 'Alan'); COMMIT; SELECT id, name FROM users ORDER BY id;",
  },
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
      markdowns: {
        fa: [
          '## ماهیت تراکنش (Transaction)',
          'یک **تراکنش (Transaction)** واحد انجام کار در پایگاه‌داده است و اصل «یا همه یا هیچ‌چیز» (All-or-Nothing) را تضمین می‌کند.',
          '- دستور `BEGIN`: شروع مرز تراکنش.',
          '- دستور `COMMIT`: ثبت قطعی و دائمی تمام تغییرات ایجادشده روی دیسک.',
          'هر گروه از تغییرات وابسته به هم باید درون یک بلوک تراکنش قرار گیرند.',
        ],
        en: [
          '## The Essence of Database Transactions',
          'A **Transaction** represents an indivisible logical unit of work upholding the all-or-nothing guarantee.',
          '- `BEGIN`: Delimits the start of an isolated transaction block.',
          '- `COMMIT`: Flushes and permanently finalizes mutations to disk storage.',
          'Interdependent multi-statement mutations should always be wrapped in a transaction.',
        ],
        de: [
          '## Grundlagen von Datenbanktransaktionen',
          'Eine **Transaktion** ist eine unteilbare Arbeitseinheit, die das Alles-oder-Nichts-Prinzip garantiert.',
          '- `BEGIN`: Startet einen isolierten Transaktionsblock.',
          '- `COMMIT`: Schreibt alle Änderungen dauerhaft auf den Speicher.',
          'Zusammenhängende Operationen sollten stets in einer Transaktion gebündelt werden.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'با شروع یک تراکنش (`BEGIN`) هر دو کاربر Ada و Alan را درج کرده، تراکنش را ذخیره (`COMMIT`) کنید و سپس کاربران را به ترتیب `id` نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Start a transaction, insert both Ada and Alan, commit the changes, and return users ordered by `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Starten Sie eine Transaktion, fügen Sie Ada und Alan ein, führen Sie ein COMMIT aus und fragen Sie die Tabelle sortiert nach `id` ab.',
        ],
      },
    },
  ],
};

export const atomicTransfer: Level = {
  id: 'tx-atomic',
  name: {
    fa: 'انتقال اتمیک موجودی (Atomic Transfer)',
    en: 'Atomic Fund Transfer',
    de: 'Atomare Überweisung (Atomizität)',
  },
  hint: {
    fa: "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE owner = 'Ada'; UPDATE accounts SET balance = balance + 100 WHERE owner = 'Alan'; COMMIT; SELECT owner, balance FROM accounts ORDER BY id;",
    en: "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE owner = 'Ada'; UPDATE accounts SET balance = balance + 100 WHERE owner = 'Alan'; COMMIT; SELECT owner, balance FROM accounts ORDER BY id;",
    de: "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE owner = 'Ada'; UPDATE accounts SET balance = balance + 100 WHERE owner = 'Alan'; COMMIT; SELECT owner, balance FROM accounts ORDER BY id;",
  },
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
      markdowns: {
        fa: [
          '## چرا تراکنش‌ها برای حفظ پول حیاتی هستند؟',
          'انتقال وجه بانکی نیازمند دو عملیات مستقل است:',
          '1. کسر مبلغ از حساب فرستنده (`balance - 100`).',
          '2. واریز مبلغ به حساب گیرنده (`balance + 100`).',
          'اگر سیستم پس از مرحله ۱ و قبل از مرحله ۲ قطع شود، بدون تراکنش پول در هوا ناپدید می‌شود! با قرار دادن هر دو در یک تراکنش، پایداری و یکپارچگی پول تضمین می‌شود.',
        ],
        en: [
          '## Preserving Integrity in Financial Transfers',
          'A financial fund transfer requires two mutually dependent actions:',
          '1. Deducting balance from source sender (`balance - 100`).',
          '2. Crediting balance to recipient (`balance + 100`).',
          'Without atomicity, an unexpected crash mid-flight destroys money! Transactions guarantee that both succeed together, or neither takes effect.',
        ],
        de: [
          '## Integrität bei Finanztransaktionen',
          'Eine Banküberweisung erfordert zwei voneinander abhängige Operationen:',
          '1. Abbuchung beim Absender (`balance - 100`).',
          '2. Gutschrift beim Empfänger (`balance + 100`).',
          'Ohne Atomizität würde ein Systemabsturz zwischen den Schritten Geld vernichten. Transaktionen garantieren, dass entweder beide Schritte gelingen oder keiner.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'مبلغ ۱۰۰ واحد را در قالب یک تراکنش اتمیک از حساب Ada کسر و به حساب Alan اضافه کنید؛ سپس مانده‌حساب‌ها را به ترتیب `id` نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Transfer 100 from Ada to Alan within an atomic transaction, returning owners and balances ordered by `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Überweisen Sie 100 Einheiten von Ada zu Alan in einer atomaren Transaktion und geben Sie die Kontostände sortiert nach `id` aus.',
        ],
      },
    },
  ],
};

export const rollback: Level = {
  id: 'tx-rollback',
  name: {
    fa: 'بازگردانی تغییرات (ROLLBACK)',
    en: 'ROLLBACK Operations',
    de: 'Transaktions-Rollback (ROLLBACK)',
  },
  hint: {
    fa: "BEGIN; UPDATE users SET city = 'Paris' WHERE name = 'Ada'; ROLLBACK; SELECT name, city FROM users;",
    en: "BEGIN; UPDATE users SET city = 'Paris' WHERE name = 'Ada'; ROLLBACK; SELECT name, city FROM users;",
    de: "BEGIN; UPDATE users SET city = 'Paris' WHERE name = 'Ada'; ROLLBACK; SELECT name, city FROM users;",
  },
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
      markdowns: {
        fa: [
          '## لغو تغییرات با دستور ROLLBACK',
          'دستور `ROLLBACK` تمام تغییرات اعمال‌شده پس از `BEGIN` را لغو کرده و دیتابیس را به وضعیت دقیق قبل از شروع تراکنش بازمی‌گرداند.',
          'در صورت بروز هرگونه خطای منطقی، نقض قید یا قطعی برنامه، دستور رول‌بک دیتابیس را دست‌نخورده نگه می‌دارد.',
        ],
        en: [
          '## Discarding Mutations with ROLLBACK',
          '`ROLLBACK` discards all pending uncommitted changes since `BEGIN`, returning tables to their exact pre-transaction state.',
          'Whenever an error, constraint violation, or exception occurs, ROLLBACK leaves the database cleanly untouched.',
        ],
        de: [
          '## Änderungen verwerfen mit ROLLBACK',
          '`ROLLBACK` macht alle unbestätigten Änderungen seit `BEGIN` rückgängig und stellt den Ausgangszustand wieder her.',
          'Bei Fehlern oder Integritätsverletzungen sorgt ROLLBACK für einen sauberen Zustand.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'درون یک تراکنش شهر Ada را به Paris تغییر داده و بلافاصله دستور `ROLLBACK` را اجرا کنید؛ مشاهده خواهید کرد که شهر او همچنان London باقی مانده است.',
        ],
        en: [
          '## Challenge Objective',
          'Change Ada\'s city to Paris inside a transaction and execute ROLLBACK. Confirm her city remains London.',
        ],
        de: [
          '## Ziel der Übung',
          'Ändern Sie Adas Stadt in einer Transaktion auf Paris und führen Sie ein ROLLBACK aus. Bestätigen Sie, dass ihre Stadt London bleibt.',
        ],
      },
    },
  ],
};

export const acidConcepts: Level = {
  id: 'tx-acid',
  name: {
    fa: 'اصول چهارگانه ACID',
    en: 'ACID Principles & Isolation',
    de: 'ACID-Prinzipien & Isolation',
  },
  hint: {
    fa: 'SELECT SUM(balance) AS total, COUNT(*) AS n FROM accounts;',
    en: 'SELECT SUM(balance) AS total, COUNT(*) AS n FROM accounts;',
    de: 'SELECT SUM(balance) AS total, COUNT(*) AS n FROM accounts;',
  },
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
      markdowns: {
        fa: [
          '## ۴ رکن طلایی تراکنش‌ها (ACID)',
          '- **A - Atomicity (اتمیک بودن):** تمام عملیات‌ها یا با هم ثبت می‌شوند یا هیچ‌کدام اعمال نمی‌شوند.',
          '- **C - Consistency (سازگاری):** داده‌ها قبل و بعد از تراکنش تمام قوانین و قیود سیستم را حفظ می‌کنند.',
          '- **I - Isolation (انزوا):** تراکنش‌های همزمان نباید در کار یکدیگر تداخل ایجاد کنند.',
          '- **D - Durability (ماندگاری):** پس از کامیت، داده‌ها حتی با قطعی برق یا خرابی سرور از بین نمی‌روند.',
        ],
        en: [
          '## The Four Pillars of ACID',
          '- **Atomicity:** All operations complete successfully or none take effect.',
          '- **Consistency:** Transitions database state strictly preserving schema invariants.',
          '- **Isolation:** Concurrent parallel transactions execute without stepping on each other.',
          '- **Durability:** Committed transactions permanently survive server crashes and power loss.',
        ],
        de: [
          '## Die vier Säulen von ACID',
          '- **Atomizität (Atomicity):** Alles-oder-Nichts-Prinzip für alle Anweisungen.',
          '- **Konsistenz (Consistency):** Erhält alle Regeln und Integritätsbedingungen.',
          '- **Isolation:** Parallele Transaktionen beeinflussen sich nicht gegenseitig.',
          '- **Dauerhaftigkeit (Durability):** Bestätigte Daten überstehen Serverausfälle dauerhaft.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'اصل پایستگی و انطباق را با محاسبه مجموع کل موجودی‌ها در ستون `total` و تعداد حساب‌ها در ستون `n` بررسی و استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Verify the state invariant: calculate total combined balance as `total` and account count as `n`.',
        ],
        de: [
          '## Ziel der Übung',
          'Überprüfen Sie die Zustandsinvariante: Berechnen Sie das Gesamtguthaben als `total` und die Anzahl der Konten als `n`.',
        ],
      },
    },
  ],
};

export const transactionLevels: Level[] = [
  beginCommit,
  atomicTransfer,
  rollback,
  acidConcepts,
];
