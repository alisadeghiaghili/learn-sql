/**
 * Window Functions — ranking, running totals, and partitioned aggregates.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */
import { shopSchema, shopSeed } from './shopSchema';
import { peopleSchema, peopleSeed } from './customSchemas';
import type { Level } from './types';

export const ranking: Level = {
  id: 'win-rank',
  name: {
    fa: 'توابع رتبه‌بندی (RANK و DENSE_RANK)',
    en: 'Ranking Functions',
    de: 'Rangfunktionen (RANK & DENSE_RANK)',
  },
  hint: {
    fa: 'SELECT id, quantity, RANK() OVER (ORDER BY quantity DESC) AS rnk, DENSE_RANK() OVER (ORDER BY quantity DESC) AS drnk FROM orders ORDER BY id;',
    en: 'SELECT id, quantity, RANK() OVER (ORDER BY quantity DESC) AS rnk, DENSE_RANK() OVER (ORDER BY quantity DESC) AS drnk FROM orders ORDER BY id;',
    de: 'SELECT id, quantity, RANK() OVER (ORDER BY quantity DESC) AS rnk, DENSE_RANK() OVER (ORDER BY quantity DESC) AS drnk FROM orders ORDER BY id;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT id, quantity, RANK() OVER (ORDER BY quantity DESC) AS rnk, DENSE_RANK() OVER (ORDER BY quantity DESC) AS drnk FROM orders ORDER BY id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'quantity', 'rnk', 'drnk'],
    rows: [
      [1, 1, 5, 3],
      [2, 2, 2, 2],
      [3, 1, 5, 3],
      [4, 3, 1, 1],
      [5, 1, 5, 3],
      [6, 2, 2, 2],
      [7, 1, 5, 3],
      [8, 2, 2, 2],
      [9, 1, 5, 3],
      [10, 1, 5, 3],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## تفاوت کلیدی توابع پنجره‌ای با GROUP BY',
          'برخلاف `GROUP BY` که ردیف‌ها را در هم فشرده و جمع می‌کند، **Window Functions (توابع پنجره‌ای)** ردیف‌های ورودی را دست‌نخورده حفظ کرده و برای هر ردیف یک محاسبه تحلیلی اضافه می‌کنند.',
          '### تفاوت انواع رتبه‌بندی:',
          '- `ROW_NUMBER()`: یک شماره ترتیبی یکتا (1, 2, 3, 4) حتی در مقادیر برابر.',
          '- `RANK()`: مقادیر مساوی رتبه یکسان می‌گیرند و رتبه بعدی جهش می‌کند (1, 2, 2, 4).',
          '- `DENSE_RANK()`: مقادیر مساوی رتبه یکسان می‌گیرند ولی هیچ فاصله‌ای ایجاد نمی‌شود (1, 2, 2, 3).',
        ],
        en: [
          '## Window Functions vs GROUP BY',
          'Unlike `GROUP BY` which collapses rows into summary groups, **Window Functions** compute aggregate or positional calculations across related rows *without* collapsing them.',
          '### Ranking Behaviors:',
          '- `ROW_NUMBER()`: Unique consecutive integer (1, 2, 3, 4) regardless of ties.',
          '- `RANK()`: Ties receive identical ranks, skipping the next number (1, 2, 2, 4).',
          '- `DENSE_RANK()`: Ties receive identical ranks with no gaps (1, 2, 2, 3).',
        ],
        de: [
          '## Fensterfunktionen vs. GROUP BY',
          'Im Gegensatz zu `GROUP BY`, das Zeilen verdichtet, berechnen **Fensterfunktionen** Werte über Zeilengruppen hinweg, *ohne* die Zeilenstruktur zu verändern.',
          '### Arten von Rangfolgen:',
          '- `ROW_NUMBER()`: Eindeutige fortlaufende Nummerierung (1, 2, 3, 4).',
          '- `RANK()`: Gleiche Werte erhalten den gleichen Rang, danach wird übersprungen (1, 2, 2, 4).',
          '- `DENSE_RANK()`: Gleiche Werte erhalten den gleichen Rang ohne Lücken (1, 2, 2, 3).',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'برای تمام سفارش‌ها در جدول `orders`، ستون‌های `id` و `quantity` را به همراه `RANK()` و `DENSE_RANK()` بر اساس تعداد به صورت نزولی محاسبه کرده و به ترتیب `id` مرتب کنید.',
        ],
        en: [
          '## Challenge Objective',
          'For each order, return `id`, `quantity`, its `RANK()`, and `DENSE_RANK()` ordered by quantity descending, sorted by `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie für jede Bestellung `id`, `quantity`, `RANK()` und `DENSE_RANK()` absteigend nach Menge aus, sortiert nach `id`.',
        ],
      },
    },
  ],
};

export const runningTotal: Level = {
  id: 'win-running',
  name: {
    fa: 'مجموع تجمعی (Running Total)',
    en: 'Running Total (SUM OVER)',
    de: 'Laufende Summe (SUM OVER)',
  },
  hint: {
    fa: 'SELECT id, quantity, SUM(quantity) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running FROM orders ORDER BY id;',
    en: 'SELECT id, quantity, SUM(quantity) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running FROM orders ORDER BY id;',
    de: 'SELECT id, quantity, SUM(quantity) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running FROM orders ORDER BY id;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT id, quantity, SUM(quantity) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running FROM orders ORDER BY id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'quantity', 'running'],
    rows: [
      [1, 1, 1],
      [2, 2, 3],
      [3, 1, 4],
      [4, 3, 7],
      [5, 1, 8],
      [6, 2, 10],
      [7, 1, 11],
      [8, 2, 13],
      [9, 1, 14],
      [10, 1, 15],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## محاسبه مجموع تجمعی (Cumulative Sum)',
          'با ترکیب توابع جمع مثل `SUM()` با بند `OVER (ORDER BY ...)`، مقادیر ردیف به ردیف با یکدیگر جمع می‌شوند.',
          'تعیین فریم پنجره (Window Frame):',
          '```sql',
          'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW',
          '```',
          'این عبارت صریحاً تعیین می‌کند که محاسبه از اولین ردیف جدول آغاز شده و تا ردیف جاری ادامه یابد.',
        ],
        en: [
          '## Calculating Running Totals',
          'By pairing `SUM()` with `OVER (ORDER BY ...)`, values accumulate continuously row by row.',
          'Explicit Window Frame definition:',
          '```sql',
          'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW',
          '```',
          'This explicitly defines that aggregation starts at the first row and accumulates up to the current row.',
        ],
        de: [
          '## Laufende Summen berechnen',
          'Durch die Kombination von `SUM()` mit `OVER (ORDER BY ...)` werden Werte Zeile für Zeile akkumuliert.',
          'Definition des Fensterrahmens (Window Frame):',
          '```sql',
          'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW',
          '```',
          'Dies legt fest, dass die Summe von der ersten Zeile bis zur aktuellen Zeile gebildet wird.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'برای هر سفارش به ترتیب `id`، ستون‌های `id` و `quantity` را همراه با مجموع تجمعی تعداد سفارش‌ها در ستون `running` نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Show each order with a running total of `quantity` ordered by `id` as `running`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie jede Bestellung mit einer fortlaufenden Summe der Menge als `running` aus, sortiert nach `id`.',
        ],
      },
    },
  ],
};

export const partitionBy: Level = {
  id: 'win-partition',
  name: {
    fa: 'افراز پنجره (PARTITION BY)',
    en: 'Window Partitioning (PARTITION BY)',
    de: 'Fenster-Partitionierung (PARTITION BY)',
  },
  hint: {
    fa: "SELECT name, city, RANK() OVER (PARTITION BY city ORDER BY age DESC) AS city_rank FROM people WHERE city IS NOT NULL ORDER BY city, city_rank;",
    en: "SELECT name, city, RANK() OVER (PARTITION BY city ORDER BY age DESC) AS city_rank FROM people WHERE city IS NOT NULL ORDER BY city, city_rank;",
    de: "SELECT name, city, RANK() OVER (PARTITION BY city ORDER BY age DESC) AS city_rank FROM people WHERE city IS NOT NULL ORDER BY city, city_rank;",
  },
  schema: peopleSchema,
  seed: peopleSeed,
  solution:
    "SELECT name, city, RANK() OVER (PARTITION BY city ORDER BY age DESC) AS city_rank FROM people WHERE city IS NOT NULL ORDER BY city, city_rank;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city', 'city_rank'],
    rows: [
      ['Eve', 'Berlin', 1],
      ['Ann', 'London', 1],
      ['Cid', 'Paris', 1],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## افراز داده‌ها با PARTITION BY',
          'بند `PARTITION BY` پنجره محاسبات را به بخش‌های مجزا بر اساس مقادیر یک ستون تقسیم می‌کند و در ابتدای هر بخش، شمارش یا تجمیع را از نو آغاز می‌کند.',
          '```sql',
          'RANK() OVER (PARTITION BY city ORDER BY age DESC)',
          '```',
          'در این مثال، رتبه‌بندی سن افراد به صورت مستقل درون هر شهر محاسبه می‌شود.',
        ],
        en: [
          '## Partitioning Windows with PARTITION BY',
          '`PARTITION BY` subdivides rows into distinct buckets based on column values. Calculations reset at the boundary of each partition.',
          '```sql',
          'RANK() OVER (PARTITION BY city ORDER BY age DESC)',
          '```',
          'In this example, age ranking is calculated independently within each city.',
        ],
        de: [
          '## Partitionierung mit PARTITION BY',
          '`PARTITION BY` unterteilt die Zeilen anhand von Spaltenwerten in Gruppen. Berechnungen beginnen für jede Partition neu.',
          '```sql',
          'RANK() OVER (PARTITION BY city ORDER BY age DESC)',
          '```',
          'In diesem Beispiel wird der Altersrang unabhängig innerhalb jeder Stadt ermittelt.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'افراد را بر اساس سن به صورت نزولی درون هر شهر رتبه‌بندی کنید (کسانی که شهر مشخص دارند). ستون‌های `name`، `city` و `city_rank` را استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Rank each person by age descending within their city (for non-null cities). Return `name`, `city`, and `city_rank`.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie ein Ranking nach Alter innerhalb jeder Stadt. Geben Sie `name`, `city` und `city_rank` aus.',
        ],
      },
    },
  ],
};

export const lagLead: Level = {
  id: 'win-laglead',
  name: {
    fa: 'دسترسی به ردیف‌های مجاور (LAG و LEAD)',
    en: 'Positional Navigation (LAG / LEAD)',
    de: 'Positionsfunktionen (LAG & LEAD)',
  },
  hint: {
    fa: 'SELECT id, price, LAG(price) OVER (ORDER BY id) AS prev_price, LEAD(price) OVER (ORDER BY id) AS next_price FROM products ORDER BY id;',
    en: 'SELECT id, price, LAG(price) OVER (ORDER BY id) AS prev_price, LEAD(price) OVER (ORDER BY id) AS next_price FROM products ORDER BY id;',
    de: 'SELECT id, price, LAG(price) OVER (ORDER BY id) AS prev_price, LEAD(price) OVER (ORDER BY id) AS next_price FROM products ORDER BY id;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT id, price, LAG(price) OVER (ORDER BY id) AS prev_price, LEAD(price) OVER (ORDER BY id) AS next_price FROM products ORDER BY id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'price', 'prev_price', 'next_price'],
    rows: [
      [1, 89.5, null, 24],
      [2, 24, 89.5, 39.9],
      [3, 39.9, 24, 249],
      [4, 249, 39.9, 45],
      [5, 45, 249, null],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## پیمایش ردیف‌های قبلی و بعدی با LAG و LEAD',
          'برای مقایسه یک ردیف با ردیف قبلی یا بعدی (مثلاً محاسبه رشد فروش ماه جاری نسبت به ماه قبل)، نیازی به سلف‌جوین‌های سنگین ندارید:',
          '- `LAG(col)`: مقدار ستون را در ردیف **قبلی** بازمی‌گرداند.',
          '- `LEAD(col)`: مقدار ستون را در ردیف **بعدی** بازمی‌گرداند.',
          'ردیف‌های مرزی که همسایه قبلی یا بعدی ندارند مقدار `NULL` دریافت می‌کنند.',
        ],
        en: [
          '## Navigating Adjacent Rows with LAG and LEAD',
          'Comparing a row with its predecessor or successor (e.g. month-over-month growth) is simple with positional window functions:',
          '- `LAG(col)`: Looks back to the **previous** row.',
          '- `LEAD(col)`: Looks ahead to the **next** row.',
          'Boundary edges without an adjacent neighbor yield `NULL`.',
        ],
        de: [
          '## Benachbarte Zeilen mit LAG und LEAD abrufen',
          'Der Vergleich einer Zeile mit der vorherigen oder nächsten Zeile gelingt elegant über Positionsfunktionen:',
          '- `LAG(col)`: Liest den Wert der **vorherigen** Zeile.',
          '- `LEAD(col)`: Liest den Wert der **nächsten** Zeile.',
          'Grenzzeilen ohne Nachbarn erhalten automatisch `NULL`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'برای هر کالا به ترتیب `id`، ستون‌های `id` و `price` را همراه با قیمت کالای قبلی (`prev_price`) و قیمت کالای بعدی (`next_price`) نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'For each product ordered by `id`, display its `price`, previous price as `prev_price`, and next price as `next_price`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie für jedes Produkt sortiert nach `id` den aktuellen Preis, den vorherigen Preis als `prev_price` und den nächsten Preis als `next_price` aus.',
        ],
      },
    },
  ],
};

export const windowLevels: Level[] = [ranking, runningTotal, partitionBy, lagLead];
