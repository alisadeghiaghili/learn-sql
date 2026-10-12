/**
 * DDL & schema design — CREATE / ALTER / DROP and constraints.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */
import type { Level } from './types';

export const createTable: Level = {
  id: 'ddl-create',
  name: {
    fa: 'ساخت جدول (CREATE TABLE)',
    en: 'CREATE TABLE',
    de: 'Tabelle erstellen (CREATE TABLE)',
  },
  hint: {
    fa: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL); INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
    en: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL); INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
    de: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL); INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
  },
  schema: '',
  seed: '',
  solution:
    "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL); INSERT INTO users (id, name) VALUES (1, 'Ada'); SELECT id, name FROM users;",
  golfPar: 1,
  goal: { type: 'schema', tables: ['users'] },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## تعریف ساختار پایگاه‌داده با DDL',
          'دستورات **DDL (Data Definition Language)** اسکلت و معماری پایگاه‌داده را تعریف می‌کنند.',
          'دستور `CREATE TABLE` نام ستون‌ها و نوع داده مجاز هر ستون را مشخص می‌کند:',
          '```sql',
          'CREATE TABLE users (',
          '  id INTEGER PRIMARY KEY,',
          '  name TEXT NOT NULL',
          ');',
          '```',
          'در این مرحله از یک دیتابیس کاملاً خالی شروع می‌کنید.',
        ],
        en: [
          '## Data Definition Language (CREATE TABLE)',
          '**DDL (Data Definition Language)** defines schemas and database structure.',
          '`CREATE TABLE` declares column identifiers and constraints:',
          '```sql',
          'CREATE TABLE users (',
          '  id INTEGER PRIMARY KEY,',
          '  name TEXT NOT NULL',
          ');',
          '```',
          'You start with an empty database canvas in this challenge.',
        ],
        de: [
          '## Datendefinitionssprache (CREATE TABLE)',
          '**DDL (Data Definition Language)** definiert Schemas und Datenbankstrukturen.',
          '`CREATE TABLE` deklariert Spalten und Integritätsregeln:',
          '```sql',
          'CREATE TABLE users (',
          '  id INTEGER PRIMARY KEY,',
          '  name TEXT NOT NULL',
          ');',
          '```',
          'In dieser Übung starten Sie mit einer leeren Datenbank.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'جدولی به نام `users` با کلید اصلی `id INTEGER PRIMARY KEY` و ستون اجباری `name TEXT NOT NULL` ایجاد کرده و حداقل یک ردیف در آن درج کنید تا در پنل شمای جدول‌ها نمایان شود.',
        ],
        en: [
          '## Challenge Objective',
          'Create a `users` table with `id INTEGER PRIMARY KEY` and `name TEXT NOT NULL`, insert a row, and select it.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie eine Tabelle `users` mit `id INTEGER PRIMARY KEY` und `name TEXT NOT NULL`, fügen Sie eine Zeile ein und fragen Sie sie ab.',
        ],
      },
    },
  ],
};

export const dataTypes: Level = {
  id: 'ddl-types',
  name: {
    fa: 'انواع داده در پایگاه‌داده',
    en: 'Data Types & Storage Classes',
    de: 'Datentypen & Speicherklassen',
  },
  hint: {
    fa: "CREATE TABLE mixed (a INTEGER, b TEXT, c REAL); INSERT INTO mixed VALUES (1, 'hello', 3.14); SELECT typeof(a) AS a_t, typeof(b) AS b_t, typeof(c) AS c_t FROM mixed;",
    en: "CREATE TABLE mixed (a INTEGER, b TEXT, c REAL); INSERT INTO mixed VALUES (1, 'hello', 3.14); SELECT typeof(a) AS a_t, typeof(b) AS b_t, typeof(c) AS c_t FROM mixed;",
    de: "CREATE TABLE mixed (a INTEGER, b TEXT, c REAL); INSERT INTO mixed VALUES (1, 'hello', 3.14); SELECT typeof(a) AS a_t, typeof(b) AS b_t, typeof(c) AS c_t FROM mixed;",
  },
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
      markdowns: {
        fa: [
          '## انواع داده‌های اصلی در SQL',
          'انواع داده بنیادی عبارتند از:',
          '- `INTEGER`: اعداد صحیح مثبت یا منفی.',
          '- `REAL`: اعداد اعشاری با دقت شناور.',
          '- `TEXT`: رشته‌های متنی و کاراکتری.',
          '- `BLOB`: داده‌های باینری خام (مثل تصویر و فایل).',
          'تابع `typeof(x)` کلاس ذخیره‌سازی واقعی را گزارش می‌کند.',
        ],
        en: [
          '## Fundamental SQL Data Types',
          'Standard primary storage classes:',
          '- `INTEGER`: Whole signed numbers.',
          '- `REAL`: Floating-point numeric values.',
          '- `TEXT`: String sequences.',
          '- `BLOB`: Raw binary byte payloads.',
          'The `typeof(x)` introspection function returns the underlying storage class.',
        ],
        de: [
          '## Grundlegende SQL-Datentypen',
          'Wichtigste primäre Datentypen:',
          '- `INTEGER`: Ganzzahlen.',
          '- `REAL`: Fließkommazahlen.',
          '- `TEXT`: Zeichenketten.',
          '- `BLOB`: Binärdaten.',
          'Die Introspektionsfunktion `typeof(x)` liefert den tatsächlichen Speichertyp.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'جدولی به نام `mixed` با ستون‌های `a INTEGER, b TEXT, c REAL` بسازید؛ ردیف `(1, \'hello\', 3.14)` را در آن درج کرده و با نام‌های `a_t`، `b_t` و `c_t` خروجی `typeof` هر کدام را برگردانید.',
        ],
        en: [
          '## Challenge Objective',
          'Create table `mixed (a INTEGER, b TEXT, c REAL)`, insert `(1, \'hello\', 3.14)`, and return `typeof()` of each column as `a_t`, `b_t`, `c_t`.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie Tabelle `mixed (a INTEGER, b TEXT, c REAL)`, fügen Sie `(1, \'hello\', 3.14)` ein und geben Sie `typeof()` jeder Spalte als `a_t`, `b_t`, `c_t` aus.',
        ],
      },
    },
  ],
};

export const alterTable: Level = {
  id: 'ddl-alter',
  name: {
    fa: 'تغییر ساختار جدول (ALTER TABLE)',
    en: 'ALTER TABLE',
    de: 'Tabellenstruktur ändern (ALTER TABLE)',
  },
  hint: {
    fa: 'ALTER TABLE books ADD COLUMN pages INTEGER; SELECT title, pages FROM books ORDER BY id;',
    en: 'ALTER TABLE books ADD COLUMN pages INTEGER; SELECT title, pages FROM books ORDER BY id;',
    de: 'ALTER TABLE books ADD COLUMN pages INTEGER; SELECT title, pages FROM books ORDER BY id;',
  },
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
      markdowns: {
        fa: [
          '## افزودن ستون با ALTER TABLE',
          'برای گسترش ساختار یک جدول موجود بدون از دست رفتن داده‌های قبلی:',
          '```sql',
          'ALTER TABLE books ADD COLUMN pages INTEGER;',
          '```',
          'ردیف‌های از پیش موجود برای ستون جدید به طور خودکار مقدار `NULL` دریافت می‌کنند.',
        ],
        en: [
          '## Schema Migration with ALTER TABLE',
          'To alter an existing schema without dropping data:',
          '```sql',
          'ALTER TABLE books ADD COLUMN pages INTEGER;',
          '```',
          'Pre-existing records automatically receive `NULL` for newly appended columns.',
        ],
        de: [
          '## Tabellenerweiterung mit ALTER TABLE',
          'So erweitern Sie eine bestehende Tabelle ohne Datenverlust:',
          '```sql',
          'ALTER TABLE books ADD COLUMN pages INTEGER;',
          '```',
          'Bereits vorhandene Zeilen erhalten in der neuen Spalte automatisch `NULL`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'یک ستون عدد صحیح به نام `pages` به جدول `books` اضافه کرده و ستون‌های `title` و `pages` را به ترتیب `id` استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Add an integer column `pages` to `books`, then select `title` and `pages` ordered by `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Fügen Sie der Tabelle `books` die Integer-Spalte `pages` hinzu und fragen Sie `title` und `pages` sortiert nach `id` ab.',
        ],
      },
    },
  ],
};

export const dropTable: Level = {
  id: 'ddl-drop',
  name: {
    fa: 'حذف کامل جدول (DROP TABLE)',
    en: 'DROP TABLE',
    de: 'Tabelle löschen (DROP TABLE)',
  },
  hint: {
    fa: "DROP TABLE temp; SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name;",
    en: "DROP TABLE temp; SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name;",
    de: "DROP TABLE temp; SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name;",
  },
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
      markdowns: {
        fa: [
          '## حذف جدول و کاتالوگ داده‌ها',
          'دستور `DROP TABLE` جدول و تمام داده‌ها، ایندکس‌ها و تریگرهای مرتبط با آن را به طور غیرقابل بازگشت پاک می‌کند.',
          'جدول سیستمی `sqlite_master` کاتالوگ فراداده‌های پایگاه‌داده است که لیست جداول زنده را در خود نگه می‌دارد.',
        ],
        en: [
          '## Dropping Tables and Meta-catalogs',
          '`DROP TABLE` irreversibly removes a table along with all stored data and dependent structures.',
          '`sqlite_master` serves as the system catalog holding live table and object metadata.',
        ],
        de: [
          '## Tabellen löschen und Metadaten-Kataloge',
          '`DROP TABLE` löscht eine Tabelle samt allen Daten und abhängigen Strukturen unwiderruflich.',
          '`sqlite_master` ist der interne Systemkatalog für alle Datenbankobjekte.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'جدول موقت `temp` را با `DROP TABLE` حذف کرده و جدول‌های باقی‌مانده را از `sqlite_master` نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Drop the temporary table `temp` and list the remaining user tables from `sqlite_master`.',
        ],
        de: [
          '## Ziel der Übung',
          'Löschen Sie die temporäre Tabelle `temp` und listen Sie die verbleibenden Tabellen aus `sqlite_master` auf.',
        ],
      },
    },
  ],
};

export const constraints: Level = {
  id: 'ddl-constraints',
  name: {
    fa: 'قیود جامعیت داده‌ها (Constraints)',
    en: 'Integrity Constraints',
    de: 'Integritätsbedingungen (Constraints)',
  },
  hint: {
    fa: "CREATE TABLE accounts (id INTEGER PRIMARY KEY, balance REAL NOT NULL DEFAULT 0, code TEXT UNIQUE, note TEXT CHECK(length(note) < 10)); INSERT INTO accounts (id, code, note) VALUES (1, 'A', 'ok'); SELECT id, balance, code, note FROM accounts;",
    en: "CREATE TABLE accounts (id INTEGER PRIMARY KEY, balance REAL NOT NULL DEFAULT 0, code TEXT UNIQUE, note TEXT CHECK(length(note) < 10)); INSERT INTO accounts (id, code, note) VALUES (1, 'A', 'ok'); SELECT id, balance, code, note FROM accounts;",
    de: "CREATE TABLE accounts (id INTEGER PRIMARY KEY, balance REAL NOT NULL DEFAULT 0, code TEXT UNIQUE, note TEXT CHECK(length(note) < 10)); INSERT INTO accounts (id, code, note) VALUES (1, 'A', 'ok'); SELECT id, balance, code, note FROM accounts;",
  },
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
      markdowns: {
        fa: [
          '## اعتبارسنجی خودکار با قیود (Constraints)',
          'قیود از ورود داده‌های نامعتبر جلوگیری می‌کنند:',
          '- `PRIMARY KEY`: شناسه یکتا برای هر ردیف.',
          '- `NOT NULL`: جلوگیری از خالی ماندن فیلد.',
          '- `UNIQUE`: یکتا بودن مقادیر در کل ستون.',
          '- `DEFAULT val`: قرار دادن خودکار مقدار پیش‌فرض در صورت وارد نشدن.',
          '- `CHECK(condition)`: شرط سفارشی اعتبارسنجی مقدار.',
        ],
        en: [
          '## Enforcing Integrity with Table Constraints',
          'Constraints protect your data layer against invalid inputs:',
          '- `PRIMARY KEY`: Unique identifier.',
          '- `NOT NULL`: Rejects missing/blank entries.',
          '- `UNIQUE`: Ensures values are never duplicated.',
          '- `DEFAULT val`: Auto-fills fallback values.',
          '- `CHECK(condition)`: Custom validation predicates.',
        ],
        de: [
          '## Datenintegrität mit Constraints sichern',
          'Constraints verhindern ungültige Dateneingaben:',
          '- `PRIMARY KEY`: Eindeutiger Primärschlüssel.',
          '- `NOT NULL`: Verhindert leere Werte.',
          '- `UNIQUE`: Erzwingt Eindeutigkeit.',
          '- `DEFAULT val`: Setzt Standardwerte.',
          '- `CHECK(condition)`: Benutzerdefinierte Prüfregeln.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'جدول `accounts` را با ستون‌های `id INTEGER PRIMARY KEY`, `balance REAL NOT NULL DEFAULT 0`, `code TEXT UNIQUE`, `note TEXT CHECK(length(note) < 10)` بسازید؛ رکوردی با `(1, \'A\', \'ok\')` درج کنید تا مقدار پیش‌فرض `balance` خودکار صفر ثبت شود.',
        ],
        en: [
          '## Challenge Objective',
          'Create `accounts` with primary key, default balance of 0, unique code, and length check on note. Insert `(1, \'A\', \'ok\')` and select all columns.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie `accounts` mit Primärschlüssel, Standard-Guthaben 0, eindeutigem Code und Längenprüfung der Notiz. Fügen Sie `(1, \'A\', \'ok\')` ein und fragen Sie alle Spalten ab.',
        ],
      },
    },
  ],
};

export const ddlLevels: Level[] = [createTable, dataTypes, alterTable, dropTable, constraints];
