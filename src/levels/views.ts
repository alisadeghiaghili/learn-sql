/**
 * Views — named saved queries. SQLite has no materialized views, so the
 * "materialized" pattern is taught as a table kept in sync by a view.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */
import { shopSchema, shopSeed } from './shopSchema';
import type { Level } from './types';

export const createView: Level = {
  id: 'view-basic',
  name: {
    fa: 'ساخت نمای مجازی (CREATE VIEW)',
    en: 'CREATE VIEW',
    de: 'View erstellen (CREATE VIEW)',
  },
  hint: {
    fa: "CREATE VIEW hw AS SELECT name, price FROM products WHERE category = 'Hardware'; SELECT name, price FROM hw ORDER BY price DESC;",
    en: "CREATE VIEW hw AS SELECT name, price FROM products WHERE category = 'Hardware'; SELECT name, price FROM hw ORDER BY price DESC;",
    de: "CREATE VIEW hw AS SELECT name, price FROM products WHERE category = 'Hardware'; SELECT name, price FROM hw ORDER BY price DESC;",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "CREATE VIEW hw AS SELECT name, price FROM products WHERE category = 'Hardware'; SELECT name, price FROM hw ORDER BY price DESC;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'price'],
    rows: [
      ['Monitor', 249],
      ['Keyboard', 89.5],
      ['Mouse', 24],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## نماهای ذخیره‌شده (Views)',
          'یک **VIEW** یک کوئری ذخیره‌شده با یک نام مشخص است که می‌توان دقیقاً مثل یک جدول واقعی از آن کوئری گرفت.',
          'ویژگی‌های کلیدی نما:',
          '- نمای استاندارد هیچ داده‌ای روی دیسک ذخیره نمی‌کند؛ در هر بار فراخوانی مجدداً محاسبه می‌شود.',
          '- امنیت و ساده‌سازی: پنهان کردن ستون‌های حساس یا جوین‌های پیچیده از دید کاربر نهایی.',
        ],
        en: [
          '## Saved Queries as Views (CREATE VIEW)',
          'A **VIEW** is a persistent named query in your schema that behaves identically to a table for read operations.',
          'Key characteristics:',
          '- Standard views store zero physical data on disk; the query re-executes on each read.',
          '- Abstraction & Security: Encapsulates joins and hides sensitive raw columns from users.',
        ],
        de: [
          '## Gespeicherte Abfragen als Views (CREATE VIEW)',
          'Ein **VIEW** ist eine benannte Abfrage, die wie eine normale Tabelle abgefragt werden kann.',
          'Hauptmerkmale:',
          '- Standard-Views belegen keinen physischen Speicherplatz; sie werden bei jedem Aufruf ausgeführt.',
          '- Abstraktion & Sicherheit: Kapselt komplexe Joins und verbirgt sensible Spalten.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نمایی به نام `hw` از محصولات دسته‌بندی سخت‌افزار (`Hardware`) بسازید و سپس کالاهای آن را به ترتیب نزولی قیمت استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Create a view named `hw` filtering Hardware products, then select from it ordered by price descending.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie einen View namens `hw` für Hardware-Produkte und fragen Sie ihn absteigend nach Preis ab.',
        ],
      },
    },
  ],
};

export const viewJoinAgg: Level = {
  id: 'view-join',
  name: {
    fa: 'نما با اتصال و تجمیع (Join + Aggregate)',
    en: 'Complex View with Joins & Aggregates',
    de: 'Komplexer View mit Joins & Aggregation',
  },
  hint: {
    fa: 'CREATE VIEW customer_revenue AS SELECT c.name, SUM(o.quantity) AS units FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id; SELECT name, units FROM customer_revenue ORDER BY units DESC, name;',
    en: 'CREATE VIEW customer_revenue AS SELECT c.name, SUM(o.quantity) AS units FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id; SELECT name, units FROM customer_revenue ORDER BY units DESC, name;',
    de: 'CREATE VIEW customer_revenue AS SELECT c.name, SUM(o.quantity) AS units FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id; SELECT name, units FROM customer_revenue ORDER BY units DESC, name;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'CREATE VIEW customer_revenue AS SELECT c.name, SUM(o.quantity) AS units FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id; SELECT name, units FROM customer_revenue ORDER BY units DESC, name;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'units'],
    rows: [
      ['Ada Lovelace', 4],
      ['Grace Hopper', 4],
      ['Alan Turing', 3],
      ['Edsger Dijkstra', 3],
      ['Barbara Liskov', 1],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## کپسوله‌سازی منطق‌های تجاری پیچیده',
          'نماها می‌توانند شامل چندین `JOIN`، توابع تجمیعی (`SUM`, `COUNT`) و بند `GROUP BY` باشند.',
          'با این کار، محاسبات پرتکرار سیستم تنها یک بار در قالب یک نما تعریف می‌شوند و تیم‌های تحلیلی بدون نوشتن مجدد جوین‌ها از آن استفاده می‌کنند.',
        ],
        en: [
          '## Encapsulating Business Logic in Views',
          'Views can encapsulate complex multi-table joins, aggregations, and grouping logic.',
          'Downstream consumers query the clean view without having to re-author intricate join relationships.',
        ],
        de: [
          '## Geschäftslogik in Views kapseln',
          'Views können komplexe Tabellenverknüpfungen, Aggregationen und Gruppierungen kapseln.',
          'Anwender können den View einfach abfragen, ohne komplexe Joins wiederholen zu müssen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نمایی به نام `customer_revenue` بسازید که مجموع تعداد سفارش‌های هر مشتری را در ستون `units` محاسبه کند؛ سپس نتایج را به ترتیب نزولی `units` و سپس نام نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Create view `customer_revenue` calculating total ordered units per customer as `units`, then query ordered by `units DESC, name`.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie den View `customer_revenue` mit der Gesamtzahl der Einheiten je Kunde als `units` und sortieren Sie nach `units DESC, name`.',
        ],
      },
    },
  ],
};

export const materializedPattern: Level = {
  id: 'view-materialized',
  name: {
    fa: 'الگوی نمای مادی (Materialized View Pattern)',
    en: 'Materialized View Pattern',
    de: 'Materialized View Entwurfsmuster',
  },
  hint: {
    fa: 'CREATE TABLE category_totals AS SELECT category, COUNT(*) AS n FROM products GROUP BY category; CREATE VIEW totals AS SELECT category, n FROM category_totals; SELECT category, n FROM totals ORDER BY n DESC, category;',
    en: 'CREATE TABLE category_totals AS SELECT category, COUNT(*) AS n FROM products GROUP BY category; CREATE VIEW totals AS SELECT category, n FROM category_totals; SELECT category, n FROM totals ORDER BY n DESC, category;',
    de: 'CREATE TABLE category_totals AS SELECT category, COUNT(*) AS n FROM products GROUP BY category; CREATE VIEW totals AS SELECT category, n FROM category_totals; SELECT category, n FROM totals ORDER BY n DESC, category;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'CREATE TABLE category_totals AS SELECT category, COUNT(*) AS n FROM products GROUP BY category; CREATE VIEW totals AS SELECT category, n FROM category_totals; SELECT category, n FROM totals ORDER BY n DESC, category;',
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
      markdowns: {
        fa: [
          '## کش کردن نتایج با الگوی Materialized View',
          'در سیستم‌هایی که نمای مادی داخلی ندارند، این الگو برای کش کردن نتایج محاسبات سنگین استفاده می‌شود:',
          '1. یک جدول فیزیکی واقعی با استفاده از `CREATE TABLE ... AS SELECT` نتایج را ذخیره (کش) می‌کند.',
          '2. یک `VIEW` روی آن جدول برای خواندن آسان قرار می‌گیرد.',
          '3. در صورت نیاز، جدول کش بازسازی یا با تریگر به‌روزرسانی می‌شود.',
        ],
        en: [
          '## Materialized View Caching Pattern',
          'For databases without native materialized views, emulate caching with this resilient architectural pattern:',
          '1. A physical table stores precomputed snapshot results (`CREATE TABLE ... AS SELECT`).',
          '2. A clean `VIEW` interfaces queries over the cached table.',
          '3. Periodic refresh jobs or triggers sync the cached table.',
        ],
        de: [
          '## Materialized-View Caching-Muster',
          'In Datenbanken ohne native Materialized Views lässt sich dieses Caching-Muster anwenden:',
          '1. Eine physische Tabelle speichert vorberechnete Daten (`CREATE TABLE ... AS SELECT`).',
          '2. Ein `VIEW` kapselt den Zugriff auf die gecachte Tabelle.',
          '3. Die Cache-Tabelle wird periodisch aktualisiert.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'جدول فیزیکی `category_totals` را برای ذخیره تعداد کالاهای هر دسته ایجاد کنید؛ سپس نمای `totals` را روی آن تعریف کرده و نتایج را به ترتیب نزولی `n` و سپس `category` فراخوانی کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Create physical table `category_totals` of category product counts, define view `totals` over it, and select sorted by `n DESC, category`.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie die Tabelle `category_totals` mit der Anzahl Produkte je Kategorie, definieren Sie den View `totals` darüber und sortieren Sie nach `n DESC, category`.',
        ],
      },
    },
  ],
};

export const viewLevels: Level[] = [createView, viewJoinAgg, materializedPattern];
