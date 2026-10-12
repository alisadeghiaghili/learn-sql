/**
 * DML — modifying data: INSERT, UPDATE, DELETE, and UPSERT.
 * Each solution performs the mutation then SELECTs to show the new state.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */
import type { Level } from './types';

export const insertOne: Level = {
  id: 'dml-insert',
  name: {
    fa: 'درج یک ردیف (INSERT)',
    en: 'INSERT Single Row',
    de: 'Einzelne Zeile einfügen (INSERT)',
  },
  hint: {
    fa: "INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
    en: "INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
    de: "INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
  },
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
      markdowns: {
        fa: [
          '## دستکاری داده‌ها با دستورات DML',
          'دستورات **DML (Data Manipulation Language)** محتوای ردیف‌ها را تغییر می‌دهند.',
          'دستور `INSERT INTO` ردیف‌های جدید به جدول اضافه می‌کند:',
          '```sql',
          "INSERT INTO users (id, name) VALUES (1, 'Ada');",
          '```',
          'همواره نام ستون‌های هدف را مشخص کنید تا در صورت تغییر ساختار جدول، کدهای شما دچار خطا نشوند.',
        ],
        en: [
          '## Data Manipulation Language (INSERT)',
          '**DML (Data Manipulation Language)** modifies the record dataset inside tables.',
          '`INSERT INTO` appends new records:',
          '```sql',
          "INSERT INTO users (id, name) VALUES (1, 'Ada');",
          '```',
          'Explicitly specifying destination column names protects your queries against future schema changes.',
        ],
        de: [
          '## Datenmanipulationssprache (INSERT)',
          '**DML (Data Manipulation Language)** modifiziert den Inhalt von Tabellenzeilen.',
          '`INSERT INTO` fügt neue Datensätze hinzu:',
          '```sql',
          "INSERT INTO users (id, name) VALUES (1, 'Ada');",
          '```',
          'Die explizite Angabe der Zielspalten schützt vor Fehlern bei zukünftigen Schemaänderungen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'کاربری با شناسه ۱ و نام "Ada" در جدول `users` درج کرده و سپس ردیف‌های جدول را با `SELECT` برگردانید.',
        ],
        en: [
          '## Challenge Objective',
          'Insert Ada (id 1) into `users`, then return the updated table rows.',
        ],
        de: [
          '## Ziel der Übung',
          'Fügen Sie Ada (ID 1) in `users` ein und fragen Sie die Tabelle anschließend ab.',
        ],
      },
    },
  ],
};

export const insertMany: Level = {
  id: 'dml-insert-many',
  name: {
    fa: 'درج گروهی (Bulk INSERT)',
    en: 'Bulk Multi-row INSERT',
    de: 'Mehrere Zeilen einfügen (Bulk INSERT)',
  },
  hint: {
    fa: "INSERT INTO users (id, name) VALUES (1, 'Ada'), (2, 'Alan'), (3, 'Grace'); SELECT id, name FROM users ORDER BY id;",
    en: "INSERT INTO users (id, name) VALUES (1, 'Ada'), (2, 'Alan'), (3, 'Grace'); SELECT id, name FROM users ORDER BY id;",
    de: "INSERT INTO users (id, name) VALUES (1, 'Ada'), (2, 'Alan'), (3, 'Grace'); SELECT id, name FROM users ORDER BY id;",
  },
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
      markdowns: {
        fa: [
          '## بهینه‌سازی سرعت با درج گروهی',
          'به جای ارسال چند دستور `INSERT` جداگانه، می‌توانید چند ردیف را با کاما از هم جدا کرده و در قالب یک تراکنش واحد درج کنید:',
          '```sql',
          "INSERT INTO users (id, name) VALUES",
          "  (1, 'Ada'),",
          "  (2, 'Alan'),",
          "  (3, 'Grace');",
          '```',
          '> ⚡ **نکته عملکرد:** این روش به شدت سریع‌تر از اجرای تک‌تک دستورات است زیرا هزینه لاگ تراکنش را به حداقل می‌رساند.',
        ],
        en: [
          '## Optimizing Ingestion with Multi-row INSERT',
          'Rather than issuing separate sequential INSERT statements, comma-separate value tuples into a single command:',
          '```sql',
          "INSERT INTO users (id, name) VALUES",
          "  (1, 'Ada'),",
          "  (2, 'Alan'),",
          "  (3, 'Grace');",
          '```',
          '> ⚡ **Performance Note:** Bulk batching significantly minimizes transaction log overhead and disk sync latency.',
        ],
        de: [
          '## Performance-Optimierung durch Bulk-INSERT',
          'Statt einzelne INSERTs auszuführen, können Wertepaare kommagetrennt in einem einzigen Befehl übergeben werden:',
          '```sql',
          "INSERT INTO users (id, name) VALUES",
          "  (1, 'Ada'),",
          "  (2, 'Alan'),",
          "  (3, 'Grace');",
          '```',
          '> ⚡ **Performance-Tipp:** Dies ist drastisch schneller, da Transaktions- und Dateisystem-Overhead minimiert werden.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'هر سه کاربر (Ada, Alan, Grace) را در یک دستور `INSERT` واحد اضافه کرده و جدول را به ترتیب `id` نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Insert Ada, Alan, and Grace within a single statement, returning all users ordered by `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Fügen Sie Ada, Alan und Grace in einer einzigen Anweisung ein und geben Sie die Tabelle sortiert nach `id` aus.',
        ],
      },
    },
  ],
};

export const update: Level = {
  id: 'dml-update',
  name: {
    fa: 'ویرایش داده‌ها (UPDATE)',
    en: 'UPDATE Records',
    de: 'Datensätze aktualisieren (UPDATE)',
  },
  hint: {
    fa: "UPDATE users SET city = 'Paris' WHERE name = 'Ada'; SELECT name, city FROM users ORDER BY id;",
    en: "UPDATE users SET city = 'Paris' WHERE name = 'Ada'; SELECT name, city FROM users ORDER BY id;",
    de: "UPDATE users SET city = 'Paris' WHERE name = 'Ada'; SELECT name, city FROM users ORDER BY id;",
  },
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
      markdowns: {
        fa: [
          '## ویرایش ردیف‌ها با UPDATE',
          'دستور `UPDATE` مقادیر فیلدهای موجود را اصلاح می‌کند:',
          '```sql',
          "UPDATE users SET city = 'Paris' WHERE name = 'Ada';",
          '```',
          '> ⚠️ **خطر فاجعه‌بار:** هرگز شرط `WHERE` را فراموش نکنید! نبود `WHERE` باعث می‌شود تمام ردیف‌های جدول ویرایش شوند.',
        ],
        en: [
          '## Modifying Records with UPDATE',
          '`UPDATE` mutates existing column values in place:',
          '```sql',
          "UPDATE users SET city = 'Paris' WHERE name = 'Ada';",
          '```',
          '> ⚠️ **Critical Safety Rule:** Always double-check your `WHERE` predicate. Omitting it will blindly overwrite every row in the table.',
        ],
        de: [
          '## Datensätze ändern mit UPDATE',
          '`UPDATE` modifiziert bestehende Spaltenwerte:',
          '```sql',
          "UPDATE users SET city = 'Paris' WHERE name = 'Ada';",
          '```',
          '> ⚠️ **Wichtiger Sicherheitshinweis:** Vergessen Sie niemals die `WHERE`-Klausel, sonst werden ausnahmslos alle Zeilen überschrieben.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'شهر کاربری به نام Ada را به Paris تغییر داده و سپس نام و شهر تمام کاربران را به ترتیب `id` نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Change Ada\'s city to Paris, then return `name` and `city` for all users ordered by `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Ändern Sie Adas Stadt auf Paris und geben Sie anschließend `name` und `city` aller Benutzer sortiert nach `id` aus.',
        ],
      },
    },
  ],
};

export const deleteRows: Level = {
  id: 'dml-delete',
  name: {
    fa: 'حذف ردیف‌ها (DELETE)',
    en: 'DELETE Records',
    de: 'Zeilen löschen (DELETE)',
  },
  hint: {
    fa: "DELETE FROM users WHERE name = 'Alan'; SELECT name FROM users ORDER BY id;",
    en: "DELETE FROM users WHERE name = 'Alan'; SELECT name FROM users ORDER BY id;",
    de: "DELETE FROM users WHERE name = 'Alan'; SELECT name FROM users ORDER BY id;",
  },
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
      markdowns: {
        fa: [
          '## حذف گزینشی ردیف‌ها با DELETE',
          'دستور `DELETE FROM` ردیف‌هایی که با شرط مطابقت دارند را از جدول حذف می‌کند:',
          '```sql',
          "DELETE FROM users WHERE name = 'Alan';",
          '```',
          'درست مانند UPDATE، حذف بدون شرط کل جدول را پاک خواهد کرد.',
        ],
        en: [
          '## Removing Records with DELETE',
          '`DELETE FROM` removes records matching specific criteria:',
          '```sql',
          "DELETE FROM users WHERE name = 'Alan';",
          '```',
          'Like UPDATE, omitting the `WHERE` condition completely wipes the table.',
        ],
        de: [
          '## Zeilen löschen mit DELETE',
          '`DELETE FROM` entfernt Datensätze anhand einer Bedingung:',
          '```sql',
          "DELETE FROM users WHERE name = 'Alan';",
          '```',
          'Wie bei UPDATE leert das Weglassen der `WHERE`-Klausel die gesamte Tabelle.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'کاربری با نام Alan را از جدول حذف کرده و لیست کاربران باقی‌مانده را به ترتیب `id` نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Delete Alan from `users`, then return the names of remaining users ordered by `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Löschen Sie Alan aus `users` und geben Sie die verbleibenden Namen sortiert nach `id` aus.',
        ],
      },
    },
  ],
};

export const upsert: Level = {
  id: 'dml-upsert',
  name: {
    fa: 'درج یا ویرایش هوشمند (UPSERT)',
    en: 'UPSERT (INSERT ... ON CONFLICT)',
    de: 'UPSERT (INSERT ... ON CONFLICT)',
  },
  hint: {
    fa: "INSERT INTO users (id, name, visits) VALUES (1, 'Ada', 2) ON CONFLICT(id) DO UPDATE SET visits = visits + excluded.visits; SELECT name, visits FROM users;",
    en: "INSERT INTO users (id, name, visits) VALUES (1, 'Ada', 2) ON CONFLICT(id) DO UPDATE SET visits = visits + excluded.visits; SELECT name, visits FROM users;",
    de: "INSERT INTO users (id, name, visits) VALUES (1, 'Ada', 2) ON CONFLICT(id) DO UPDATE SET visits = visits + excluded.visits; SELECT name, visits FROM users;",
  },
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
      markdowns: {
        fa: [
          '## الگوی مدرن UPSERT در پایگاه‌داده',
          'یک عملیات **UPSERT (Insert or Update)** در صورت عدم وجود رکورد آن را درج می‌کند و در صورت تداخل کلید، آن را به‌روزرسانی می‌نماید:',
          '```sql',
          'INSERT INTO users (id, name, visits) VALUES (1, \'Ada\', 2)',
          'ON CONFLICT(id) DO UPDATE SET visits = visits + excluded.visits;',
          '```',
          'کلمه کلیدی `excluded` به مقادیری اشاره دارد که قصد درج آن‌ها را داشتید اما با تداخل مواجه شدند.',
        ],
        en: [
          '## Modern UPSERT Logic (INSERT ON CONFLICT)',
          'An **UPSERT** atomically inserts new rows or updates conflicting keys without race conditions:',
          '```sql',
          'INSERT INTO users (id, name, visits) VALUES (1, \'Ada\', 2)',
          'ON CONFLICT(id) DO UPDATE SET visits = visits + excluded.visits;',
          '```',
          'The `excluded` pseudo-table represents the proposed values that triggered the conflict.',
        ],
        de: [
          '## Moderne UPSERT-Logik (INSERT ON CONFLICT)',
          'Ein **UPSERT** fügt Zeilen atomar ein oder aktualisiert bestehende Schlüssel im Konfliktfall ohne Race Conditions:',
          '```sql',
          'INSERT INTO users (id, name, visits) VALUES (1, \'Ada\', 2)',
          'ON CONFLICT(id) DO UPDATE SET visits = visits + excluded.visits;',
          '```',
          'Die Pseudotabelle `excluded` enthält die Werte, deren Einfügen den Konflikt ausgelöst hat.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'تعداد بازدیدهای Ada را با UPSERT و با افزودن ۲ به تعداد قبلی افزایش دهید تا مجموع آن ۳ شود؛ سپس `name` و `visits` را نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Upsert Ada with 2 additional visits so her total becomes 3; return `name` and `visits`.',
        ],
        de: [
          '## Ziel der Übung',
          'Erhöhen Sie Adas Besuche per UPSERT um 2 auf insgesamt 3 und geben Sie `name` und `visits` aus.',
        ],
      },
    },
  ],
};

export const dmlLevels: Level[] = [insertOne, insertMany, update, deleteRows, upsert];
