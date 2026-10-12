/**
 * Aggregation sequence — GROUP BY and HAVING.
 * Rigorous pedagogical scaffolding, visual mental models,
 * common pitfalls, and fluent trilingual support (fa, en, de).
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const groupBy: Level = {
  id: 'groups-count',
  name: {
    fa: 'تجمیع داده‌ها و دسته‌بندی (GROUP BY)',
    en: 'Aggregation & GROUP BY',
    de: 'Aggregation & GROUP BY',
  },
  hint: {
    fa: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
    en: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
    de: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['category', 'COUNT(*)'],
    rows: [
      ['Books', 2],
      ['Hardware', 3],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'group-by',
      markdowns: {
        fa: [
          '## مدل ذهنی سطل‌های دسته‌بندی (Bucketing) 🪣',
          'تصور کنید یک جعبه پر از میوه‌های درهم (سیب، پرتقال، موز) دارید و می‌خواهید بدانید از هر میوه چند عدد وجود دارد.',
          'شما دو کار انجام می‌دهید:',
          '1. **دسته‌بندی (GROUP BY):** چند سطل جداگانه برمی‌دارید و میوه‌های هم‌نوع را در سطل مشترک می‌اندازید.',
          '2. **فشرده‌سازی و آمارگیری (Aggregation):** تعداد میوه‌های هر سطل را می‌شمارید (`COUNT`) یا وزن آن‌ها را جمع می‌زنید (`SUM`).',
          'در دیاگرام بالا مشاهده می‌کنید که ۵ محصول پراکنده، به ۲ سطل دسته‌بندی شده و هر سطل با یک عدد آماری خلاصه شده است.',
        ],
        en: [
          '## The Sorting Buckets Analogy 🪣',
          'Imagine sorting a mixed crate of fruit (apples, oranges, bananas) to take an inventory audit.',
          'You execute two distinct logical operations:',
          '1. **Bucketing (GROUP BY):** Place each item into its respective label bin.',
          '2. **Summarization (Aggregation):** Collapse each bin into a single summary scalar like `COUNT(*)` or `SUM(weight)`.',
          'In the schematic above, 5 distinct product rows collapse into 2 category buckets, each holding an aggregated count.',
        ],
        de: [
          '## Das Sortiereimer-Modell 🪣',
          'Stellen Sie sich vor, Sie sortieren eine gemischte Kiste Obst, um den Bestand zu zählen.',
          'Sie führen zwei Schritte aus:',
          '1. **Gruppieren (GROUP BY):** Gleiche Früchte landen im selben Eimer.',
          '2. **Zusammenfassen (Aggregation):** Jeder Eimer wird zu einer Kennzahl verdichtet (`COUNT` oder `SUM`).',
          'Im Schaubild oben werden 5 Zeilen in 2 Eimer zusammengefasst und mit einer Kennzahl ausgegeben.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## قانون طلایی ستون‌های مجاز در SELECT ⚡',
          '```sql',
          'SELECT category, COUNT(*) FROM products GROUP BY category;',
          '```',
          '### مهم‌ترین قانون پایگاه‌های داده رابطه‌ای:',
          '> اگر از `GROUP BY` استفاده می‌کنید، **هر ستونی** که در قسمت `SELECT` می‌آورید باید یا داخل یک تابع تجمیعی (مانند `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) باشد، یا دقیقاً در عبارت `GROUP BY` ذکر شده باشد!',
          'اگر ستونی بنویسید که در هیچ‌کدام نیست (مثلاً `SELECT category, name, COUNT(*)` بدون ذکر name در گروپ‌بای)، سیستم گیج می‌شود، زیرا در هر سطل چندین نام مختلف وجود دارد و دیتابیس نمی‌داند کدام‌یک را باید نشان دهد!',
        ],
        en: [
          '## The Golden Relational Grouping Rule ⚡',
          '```sql',
          'SELECT category, COUNT(*) FROM products GROUP BY category;',
          '```',
          '### The Strict Standard SQL Invariant:',
          '> Whenever a query contains a `GROUP BY` clause, **every single column** projected in `SELECT` must either appear directly inside an aggregate function (`COUNT`, `SUM`, `AVG`, etc.), or be explicitly enumerated in the `GROUP BY` clause!',
          'Selecting a raw column like `SELECT category, name, COUNT(*)` without grouping by `name` is undefined, because a bucket contains multiple distinct names and SQL refuses to guess which name to pick.',
        ],
        de: [
          '## Die goldene Regel für GROUP BY ⚡',
          '```sql',
          'SELECT category, COUNT(*) FROM products GROUP BY category;',
          '```',
          '### Die fundamentale SQL-Regel:',
          '> Bei Abfragen mit `GROUP BY` muss **jede Spalte** im `SELECT` entweder Teil einer Aggregatfunktion (`COUNT`, `SUM`, etc.) sein oder selbst in der `GROUP BY`-Klausel stehen!',
          'Wird eine Spalte ohne Gruppierung abgefragt, meldet SQL einen Fehler, da nicht klar ist, welcher Einzelwert für die gesamte Gruppe stehen soll.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'محصولات جدول `products` را بر اساس ستون دسته‌بندی (`category`) گروه‌بندی کرده و تعداد کل محصولات هر دسته را با `COUNT(*)` نمایش دهید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Group products by their `category` and return the total item count per category using `COUNT(*)`.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Gruppieren Sie die Tabelle `products` nach `category` und ermitteln Sie die Anzahl der Produkte je Kategorie mit `COUNT(*)`.',
        ],
      },
    },
  ],
};

export const havingSum: Level = {
  id: 'groups-having',
  name: {
    fa: 'فیلتر نتایج دسته‌بندی (HAVING)',
    en: 'Post-Aggregation Filtering (HAVING)',
    de: 'Gruppen filtern mit HAVING',
  },
  hint: {
    fa: `SELECT customer_id, SUM(quantity)
FROM orders
GROUP BY customer_id
HAVING SUM(quantity) > 2;`,
    en: `SELECT customer_id, SUM(quantity)
FROM orders
GROUP BY customer_id
HAVING SUM(quantity) > 2;`,
    de: `SELECT customer_id, SUM(quantity)
FROM orders
GROUP BY customer_id
HAVING SUM(quantity) > 2;`,
  },
  schema: shopSchema,
  seed: shopSeed,
  solution: `SELECT customer_id, SUM(quantity)
FROM orders
GROUP BY customer_id
HAVING SUM(quantity) > 2;`,
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['customer_id', 'SUM(quantity)'],
    rows: [
      [1, 4],
      [2, 3],
      [3, 4],
      [4, 3],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## چرا WHERE نمی‌تواند همه جا فیلتر کند؟ ⏱️',
          'یک تفاوت کلیدی که همه متخصصان SQL باید بدانند، **ترتیب چرخه حیات اجرای کوئری** است:',
          '1. ابتدا دستور `FROM` جدول را باز می‌کند.',
          '2. سپس `WHERE` ردیف‌های نامربوط را حذف می‌کند.',
          '3. سپس `GROUP BY` ردیف‌ها را در سطل‌ها جمع می‌کند.',
          '4. در انتها توابع جمعی (`SUM`, `COUNT`) محاسبه می‌شوند.',
          '> بنابراین، دستور `WHERE` قبل از تشکیل سطل‌ها اجرا می‌شود و اصلاً از مقدار `SUM` یا `COUNT` خبر ندارد! اگر بنویسید `WHERE SUM(quantity) > 2`، بلافاصله خطای `misuse of aggregate` دریافت خواهید کرد.',
        ],
        en: [
          '## The Execution Lifecycle (WHERE vs HAVING) ⏱️',
          'A fundamental reality every data professional masters is the **logical query processing lifecycle**:',
          '1. `FROM` identifies source relations.',
          '2. `WHERE` filters raw individual rows.',
          '3. `GROUP BY` bins rows into buckets.',
          '4. Aggregate metrics (`SUM`, `COUNT`) compute on bucket contents.',
          '> Because `WHERE` finishes executing *before* buckets even exist, it cannot filter by aggregate calculations! Attempting `WHERE SUM(x) > 2` triggers an immediate `misuse of aggregate` syntax error.',
        ],
        de: [
          '## Der Ausführungszyklus (WHERE vs HAVING) ⏱️',
          'Der entscheidende Unterschied liegt in der **logischen Ausführungsreihenfolge** von SQL:',
          '1. `FROM` lädt die Quelltabelle.',
          '2. `WHERE` filtert einzelne Rohzeilen.',
          '3. `GROUP BY` bildet die Gruppen.',
          '4. Aggregatfunktionen (`SUM`, `COUNT`) werden berechnet.',
          '> Weil `WHERE` *vor* der Gruppenbildung ausgeführt wird, kennt es das Aggregatergebnis noch nicht! `WHERE SUM(x) > 2` erzeugt daher einen Syntaxfehler.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## ورود نگهبان دسته‌ها: بند HAVING 🛡️',
          'بند `HAVING` دقیقاً بعد از محاسبه آمار دسته‌ها اجرا می‌شود و سطل‌های نامطلوب را فیلتر می‌کند.',
          '```sql',
          'SELECT customer_id, SUM(quantity)',
          'FROM orders',
          'GROUP BY customer_id',
          'HAVING SUM(quantity) > 2;',
          '```',
          '### فرمول طلایی برای یادآوری:',
          '- اگر می‌خواهید ردیف‌های خام تکی را فیلتر کنید ➔ از **`WHERE`** استفاده کنید.',
          '- اگر می‌خواهید سطل‌ها را بر اساس حاصل توابع آماری فیلتر کنید ➔ از **`HAVING`** استفاده کنید.',
        ],
        en: [
          '## Enter HAVING — The Post-Aggregation Gatekeeper 🛡️',
          'The `HAVING` clause runs strictly *after* grouping and aggregation have occurred, filtering the summarized buckets.',
          '```sql',
          'SELECT customer_id, SUM(quantity)',
          'FROM orders',
          'GROUP BY customer_id',
          'HAVING SUM(quantity) > 2;',
          '```',
          '### The Mental Rule of Thumb:',
          '- Filtering individual atomic rows ➔ Use **`WHERE`**.',
          '- Filtering collapsed summary buckets based on an aggregate result ➔ Use **`HAVING`**.',
        ],
        de: [
          '## HAVING — Der Filter für Gruppen 🛡️',
          'Die `HAVING`-Klausel greift erst *nach* der Gruppenbildung und prüft das berechnete Aggregat.',
          '```sql',
          'SELECT customer_id, SUM(quantity)',
          'FROM orders',
          'GROUP BY customer_id',
          'HAVING SUM(quantity) > 2;',
          '```',
          '### Die Faustregel:',
          '- Einzelne Datensätze vor der Gruppierung filtern ➔ **`WHERE`** nutzen.',
          '- Berechnete Gruppenergebnisse filtern ➔ **`HAVING`** nutzen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'سفارش‌ها را بر اساس شناسه مشتری (`customer_id`) گروه‌بندی کرده و فقط مشتریانی را نمایش دهید که مجموع تعداد کالاهای سفارش‌داده‌شده آن‌ها بیش از ۲ عدد است (`HAVING SUM(quantity) > 2`).',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Group orders by `customer_id` and retain only customers whose total quantity of ordered items strictly exceeds 2 (`HAVING SUM(quantity) > 2`).',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Gruppieren Sie Bestellungen nach `customer_id` und zeigen Sie nur Kunden an, deren Gesamtmenge größer als 2 ist (`HAVING SUM(quantity) > 2`).',
        ],
      },
    },
  ],
};

export const groupsLevels: Level[] = [groupBy, havingSum];
