/**
 * Indexes & performance — CREATE INDEX, EXPLAIN QUERY PLAN, and query tuning.
 * Goals verify index existence via sqlite_master (deterministic); the
 * EXPLAIN output is shown to the learner in the dialog/sandbox.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */
import { shopSchema, shopSeed } from './shopSchema';
import type { Level } from './types';

export const indexCreate: Level = {
  id: 'perf-index',
  name: {
    fa: 'ساخت ایندکس (CREATE INDEX)',
    en: 'CREATE INDEX',
    de: 'Index erstellen (CREATE INDEX)',
  },
  hint: {
    fa: "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
    en: "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
    de: "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['idx_city']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## بهینه‌سازی سرعت جستجو با ایندکس',
          'ایندکس (Index) یک ساختار درختی مرتب‌شده (B-Tree) روی یک ستون است؛ درست مانند فهرست راهنمای انتهای یک کتاب قطور.',
          '- بدون ایندکس: موتور پایگاه‌داده باید تک‌تک ردیف‌های جدول را پویش کند (**Full Table Scan**).',
          '- با ایندکس: پایگاه‌داده در زمان لگاریتمی $O(\\log N)$ مستقیماً به ردیف مورد نظر پرش می‌کند.',
          'دستور ساخت: `CREATE INDEX idx_name ON table(col);`',
        ],
        en: [
          '## Query Acceleration with B-Tree Indexes',
          'An **Index** is an auxiliary sorted search tree (typically B-Tree) maintained alongside table data.',
          '- Without an index: The engine must sequentially inspect every single record (**Full Table Scan**).',
          '- With an index: Lookups jump directly to matching pointer keys in $O(\\log N)$ time.',
          'Syntax: `CREATE INDEX idx_name ON table(col);`',
        ],
        de: [
          '## Abfragebeschleunigung mit B-Tree-Indizes',
          'Ein **Index** ist eine sortierte Baumstruktur (B-Tree) zur schnellen Suche wie das Stichwortverzeichnis eines Buches.',
          '- Ohne Index: Die Datenbank muss alle Zeilen durchsuchen (**Full Table Scan**).',
          '- Mit Index: Gezielter Direktzugriff in logarithmischer Zeit $O(\\log N)$.',
          'Syntax: `CREATE INDEX idx_name ON table(col);`',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'یک ایندکس به نام `idx_city` روی ستون `city` در جدول `customers` بسازید و نام آن را از جدول فراداده `sqlite_master` استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Create an index on `customers(city)` named `idx_city` and confirm its catalog presence via `sqlite_master`.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie den Index `idx_city` auf `customers(city)` und bestätigen Sie ihn über `sqlite_master`.',
        ],
      },
    },
  ],
};

export const indexExplain: Level = {
  id: 'perf-explain',
  name: {
    fa: 'تحلیل پلن اجرا (EXPLAIN QUERY PLAN)',
    en: 'EXPLAIN QUERY PLAN',
    de: 'Ausführungsplan analysieren (EXPLAIN)',
  },
  hint: {
    fa: "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
    en: "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
    de: "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "CREATE INDEX idx_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_city';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['idx_city']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'demo',
      markdowns: {
        fa: [
          '## کالبدشکافی اجرای کوئری با EXPLAIN',
          'دستور `EXPLAIN QUERY PLAN` نقشه راه موتور پایگاه‌داده را برای اجرای کوئری آشکار می‌کند:',
          '- پیام `SCAN customers`: پویش کامل و پرهزینه کل جدول.',
          '- پیام `SEARCH customers USING INDEX idx_city`: جستجوی هدفمند با بهره‌گیری از درخت ایندکس.',
        ],
        en: [
          '## Dissecting Execution Plans with EXPLAIN',
          '`EXPLAIN QUERY PLAN` displays the exact strategy chosen by the cost-based query optimizer:',
          '- `SCAN customers`: Costly linear full table scan.',
          '- `SEARCH customers USING INDEX idx_city`: Highly optimized indexed seek.',
        ],
        de: [
          '## Ausführungspläne mit EXPLAIN verstehen',
          '`EXPLAIN QUERY PLAN` zeigt die Strategie des Abfrageoptimierers:',
          '- `SCAN customers`: Aufwendiger sequenzieller Tabellenscan.',
          '- `SEARCH customers USING INDEX idx_city`: Effizienter Indexzugriff.',
        ],
      },
      command: "EXPLAIN QUERY PLAN SELECT * FROM customers WHERE city = 'London';",
      beforeMarkdowns: {
        fa: ['پلن اجرای کوئری قبل از وجود ایندکس (SCAN کامل):'],
        en: ['Execution plan before index creation (full SCAN):'],
        de: ['Ausführungsplan vor Indexerstellung (vollständiger SCAN):'],
      },
      afterMarkdowns: {
        fa: ['حالا ایندکس `idx_city` را بسازید و تفاوت را با اجرای مجدد EXPLAIN ببینید.'],
        en: ['Now create index `idx_city` on `customers(city)` and observe the optimized plan.'],
        de: ['Erstellen Sie nun den Index `idx_city` auf `customers(city)` und prüfen Sie die Änderung.'],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'ایندکس `idx_city` را روی `customers(city)` بسازید و وجود آن را در کاتالوگ پایگاه‌داده تأیید کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Create index `idx_city` on `customers(city)` and confirm its registration in the catalog.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie den Index `idx_city` auf `customers(city)` und bestätigen Sie dessen Existenz im Katalog.',
        ],
      },
    },
  ],
};

export const compositeIndex: Level = {
  id: 'perf-composite',
  name: {
    fa: 'ایندکس مرکب (Composite Index)',
    en: 'Composite Multi-column Index',
    de: 'Zusammengesetzter Index (Composite)',
  },
  hint: {
    fa: "CREATE INDEX idx_cat_price ON products(category, price); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_cat_price';",
    en: "CREATE INDEX idx_cat_price ON products(category, price); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_cat_price';",
    de: "CREATE INDEX idx_cat_price ON products(category, price); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_cat_price';",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "CREATE INDEX idx_cat_price ON products(category, price); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_cat_price';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['idx_cat_price']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## قانون پیشوند چپ در ایندکس‌های مرکب',
          'ایندکس مرکب چندستونه `(a, b)` ابتدا بر اساس `a` و سپس درون آن بر اساس `b` مرتب می‌شود.',
          '### قانون حیاتی پیشوند چپ (Left-Prefix Rule):',
          '- این ایندکس کوئری‌هایی که روی `WHERE a = ...` فیلتر می‌کنند را تسریع می‌بخشد.',
          '- کوئری‌هایی که روی `WHERE a = ... AND b = ...` فیلتر می‌کنند را تسریع می‌بخشد.',
          '- اما برای فیلتر مستقل روی `WHERE b = ...` (بدون ستون اول) کاربردی ندارد!',
        ],
        en: [
          '## Leftmost-Prefix Rule for Composite Indexes',
          'A composite multi-column index on `(a, b)` sorts primarily by `a`, and sub-sorts ties by `b`.',
          '### The Leftmost Prefix Rule:',
          '- Accelerates filters on `WHERE a = ...`.',
          '- Accelerates filters on `WHERE a = ... AND b = ...`.',
          '- Does **NOT** accelerate isolated filters on `WHERE b = ...` without column `a`.',
        ],
        de: [
          '## Leftmost-Prefix-Regel für zusammengesetzte Indizes',
          'Ein zusammengesetzter Index auf `(a, b)` sortiert primär nach `a` und sekundär nach `b`.',
          '### Die Leftmost-Prefix-Regel:',
          '- Beschleunigt Filter auf `WHERE a = ...`.',
          '- Beschleunigt Filter auf `WHERE a = ... AND b = ...`.',
          '- Beschleunigt **keine** alleinigen Filter auf `WHERE b = ...` ohne Spalte `a`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'یک ایندکس مرکب به نام `idx_cat_price` روی دو ستون `(category, price)` از جدول محصولات ایجاد کرده و آن را تأیید کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Create a composite index named `idx_cat_price` on `products(category, price)` and confirm it.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie den zusammengesetzten Index `idx_cat_price` auf `products(category, price)` und bestätigen Sie ihn.',
        ],
      },
    },
  ],
};

export const noSelectStar: Level = {
  id: 'perf-nostar',
  name: {
    fa: 'پرهیز از SELECT * و ایندکس پوششی',
    en: 'Avoid SELECT * (Covering Indexes)',
    de: 'SELECT * vermeiden (Covering Index)',
  },
  hint: {
    fa: "SELECT name FROM products WHERE category = 'Books' ORDER BY name;",
    en: "SELECT name FROM products WHERE category = 'Books' ORDER BY name;",
    de: "SELECT name FROM products WHERE category = 'Books' ORDER BY name;",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name FROM products WHERE category = 'Books' ORDER BY name;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Query Tuning'],
      ['SQL Handbook'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## اصول تیونینگ و ایندکس‌های پوششی (Covering Index)',
          'درخواست تمام ستون‌ها با `SELECT *` دو آسیب جدی به عملکرد وارد می‌کند:',
          '1. مصرف پهنای باند و حافظه اضافه برای داده‌هایی که لازم ندارید.',
          '2. جلوگیری از استفاده از **Covering Index**؛ اگر تمام ستون‌های درخواستی کوئری درون خودِ ایندکس موجود باشند، موتور حتی نیازی به خواندن جدول اصلی از دیسک ندارد.',
        ],
        en: [
          '## Query Tuning Habits & Covering Indexes',
          'Using `SELECT *` creates substantial architectural bottlenecks:',
          '1. Transmits redundant columns across memory buffers and networks.',
          '2. Prevents the optimizer from leveraging a **Covering Index** (index-only scan), where queries are fulfilled directly out of index memory without table row lookups.',
        ],
        de: [
          '## Optimierungsgewohnheiten & Covering Indexes',
          'Die Verwendung von `SELECT *` beeinträchtigt die Abfrageleistung:',
          '1. Überträgt ungenutzte Spalten über das Netzwerk und belastet den Speicher.',
          '2. Verhindert die Nutzung von **Covering Indexes** (Index-Only Scans), bei denen die Abfrage komplett aus dem Index ohne Tabellenzugriff beantwortet wird.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'فقط نام کتاب‌ها (`category = \'Books\'`) را از جدول محصولات استخراج کرده و به ترتیب الفبای `name` مرتب کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Query strictly the `name` column for books (`category = \'Books\'`), ordered alphabetically.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie ausschließlich die Spalte `name` für Bücher (`category = \'Books\'`) alphabetisch sortiert aus.',
        ],
      },
    },
  ],
};

export const performanceLevels: Level[] = [
  indexCreate,
  indexExplain,
  compositeIndex,
  noSelectStar,
];
