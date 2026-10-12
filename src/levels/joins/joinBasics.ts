/**
 * Joins sequence — combining tables.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const innerJoin: Level = {
  id: 'joins-inner',
  name: {
    fa: 'اتصال درونی (INNER JOIN)',
    en: 'INNER JOIN',
    de: 'INNER JOIN',
  },
  hint: {
    fa: `SELECT customers.name, products.name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;`,
    en: `SELECT customers.name, products.name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;`,
    de: `SELECT customers.name, products.name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;`,
  },
  schema: shopSchema,
  seed: shopSeed,
  solution: `SELECT customers.name, products.name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;`,
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'name'],
    rows: [
      ['Ada Lovelace', 'Keyboard'],
      ['Ada Lovelace', 'SQL Handbook'],
      ['Alan Turing', 'Monitor'],
      ['Grace Hopper', 'Mouse'],
      ['Grace Hopper', 'Query Tuning'],
      ['Edsger Dijkstra', 'Keyboard'],
      ['Barbara Liskov', 'SQL Handbook'],
      ['Alan Turing', 'Query Tuning'],
      ['Ada Lovelace', 'Monitor'],
      ['Edsger Dijkstra', 'Mouse'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'inner-join',
      markdowns: {
        fa: [
          '## مفهوم بنیادین: چرا به JOIN نیاز داریم؟',
          'در پایگاه‌های داده رابطه‌ای، داده‌ها عمداً در جدول‌های جداگانه نگهداری می‌شوند تا از تکرار بیهوده (Redundancy) جلوگیری شود.',
          'جدول `orders` نام مشتری را ذخیره نمی‌کند؛ بلکه فقط یک شناسه به نام **کلید خارجی** (`customer_id`) نگه می‌دارد.',
          'دستور `JOIN` ردیف‌های جدول‌ها را بر اساس شرط مشترک (`ON`) به هم متصل می‌کند.',
          '> 💡 **نکته کلیدی:** در `INNER JOIN`، فقط ردیف‌هایی حفظ می‌شوند که کلید آن‌ها در **هر دو جدول** وجود داشته باشد.',
        ],
        en: [
          '## Core Concept: Why do we need JOIN?',
          'In relational databases, data is split across normalized tables to prevent redundancy and update anomalies.',
          'The `orders` table does not store customer names directly; it stores a **foreign key** (`customer_id`) referencing the customers table.',
          'The `JOIN` clause stitches tables together using an explicit match condition (`ON`).',
          '> 💡 **Key Takeaway:** An `INNER JOIN` keeps **only matching rows** present in both tables. Unmatched rows are silently discarded.',
        ],
        de: [
          '## Grundkonzept: Warum brauchen wir JOIN?',
          'In relationalen Datenbanken werden Daten auf mehrere normalisierte Tabellen aufgeteilt, um Redundanz zu vermeiden.',
          'Die Tabelle `orders` speichert keine Kundennamen, sondern einen **Fremdschlüssel** (`customer_id`), der auf Kunden verweist.',
          'Die `JOIN`-Klausel verknüpft Datensätze anhand einer Übereinstimmungsbedingung (`ON`).',
          '> 💡 **Hauptregel:** Ein `INNER JOIN` behält **nur übereinstimmende Zeilen** bei, die in beiden Tabellen existieren.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## ساختار دستور و اتصال هم‌زمان ۳ جدول',
          '```sql',
          'FROM orders',
          'JOIN customers ON orders.customer_id = customers.id',
          'JOIN products ON orders.product_id = products.id',
          '```',
          '> ⚠️ **دام ستون‌های مبهم (Ambiguous Columns):** چون هر دو جدول `customers` و `products` ستونی با نام `name` دارند، باید نام جدول را قبل از نام ستون بنویسید: `customers.name` و `products.name`.',
        ],
        en: [
          '## Syntax Structure & Chaining 3 Tables',
          '```sql',
          'FROM orders',
          'JOIN customers ON orders.customer_id = customers.id',
          'JOIN products ON orders.product_id = products.id',
          '```',
          '> ⚠️ **Ambiguous Column Trap:** Because both `customers` and `products` have a column named `name`, you must qualify them: `customers.name` and `products.name`.',
        ],
        de: [
          '## Syntaxaufbau & Verknüpfung von 3 Tabellen',
          '```sql',
          'FROM orders',
          'JOIN customers ON orders.customer_id = customers.id',
          'JOIN products ON orders.product_id = products.id',
          '```',
          '> ⚠️ **Falle mehrdeutiger Spalten:** Da sowohl `customers` als auch `products` eine Spalte `name` besitzen, müssen diese qualifiziert werden: `customers.name` und `products.name`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'هر سفارش را به همراه نام مشتری (`customers.name`) و نام کالای خریداری‌شده (`products.name`) نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'List every order showing customer name (`customers.name`) and product name (`products.name`).',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie für jede Bestellung den Kundennamen (`customers.name`) und den Produktnamen (`products.name`) aus.',
        ],
      },
    },
  ],
};

export const leftJoin: Level = {
  id: 'joins-left',
  name: {
    fa: 'اتصال بیرونی چپ (LEFT JOIN)',
    en: 'LEFT JOIN',
    de: 'LEFT JOIN',
  },
  hint: {
    fa: `SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
    en: `SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
    de: `SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
  },
  schema: shopSchema,
  seed: shopSeed,
  solution: `SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'id'],
    rows: [
      ['Ada Lovelace', 1],
      ['Ada Lovelace', 2],
      ['Ada Lovelace', 9],
      ['Alan Turing', 3],
      ['Alan Turing', 8],
      ['Grace Hopper', 4],
      ['Grace Hopper', 5],
      ['Edsger Dijkstra', 6],
      ['Edsger Dijkstra', 10],
      ['Barbara Liskov', 7],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'left-join',
      markdowns: {
        fa: [
          '## مفهوم بنیادین LEFT JOIN',
          'در `INNER JOIN` مشتریانی که خریدی ثبت نکرده‌اند کلاً از خروجی حذف می‌شوند.',
          'در `LEFT JOIN` جدول سمت چپ (جدول پس از `FROM`) حفظ می‌شود و تمام ردیف‌های آن حتی بدون سفارش در گزارش ظاهر می‌گردند.',
          '- اگر مشتری سفارشی نداشته باشد، ستون‌های مربوط به سفارش با `NULL` پر می‌شوند.',
        ],
        en: [
          '## Core Concept of LEFT JOIN',
          'While `INNER JOIN` drops customers who never placed an order, `LEFT JOIN` guarantees that **every row from the left table is preserved**.',
          '- When the right table has no matching record, right columns are populated with `NULL`.',
        ],
        de: [
          '## Grundkonzept des LEFT JOIN',
          'Während `INNER JOIN` Kunden ohne Bestellungen verwirft, stellt `LEFT JOIN` sicher, dass **jede Zeile der linken Tabelle erhalten bleibt**.',
          '- Wenn in der rechten Tabelle kein passender Eintrag existiert, werden die rechten Spalten mit `NULL` aufgefüllt.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## دام بزرگ فیلتر در WHERE',
          '> ⚠️ **هشدار:** اگر در اتصال چپ شرط جدول سمت راست را در `WHERE` بگذارید، ردیف‌های `NULL` فیلتر می‌شوند و اتصال شما عملاً به `INNER JOIN` تبدیل می‌شود! شرط‌های جدول راست را همیشه در عبارت `ON` بنویسید.',
        ],
        en: [
          '## The WHERE Clause Trap in LEFT JOIN',
          '> ⚠️ **Warning:** Filtering right-table columns in the `WHERE` clause strips out `NULL` rows and silently degrades your `LEFT JOIN` into an `INNER JOIN`! Place right-side criteria inside `ON`.',
        ],
        de: [
          '## Die WHERE-Klausel-Falle bei LEFT JOIN',
          '> ⚠️ **Warnung:** Filtert man Spalten der rechten Tabelle in `WHERE`, werden `NULL`-Zeilen herausgefiltert und der `LEFT JOIN` wird unbemerkt zum `INNER JOIN`! Bedingungen für die rechte Tabelle gehören in `ON`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'فهرستی از همه مشتریان (`customers`) با شناسه سفارش‌های آن‌ها (`orders.id`) تهیه کنید تا مشتریان بدون سفارش نیز حفظ شوند.',
        ],
        en: [
          '## Challenge Objective',
          'List all customers with their order ids so that customers without orders still appear in the output.',
        ],
        de: [
          '## Ziel der Übung',
          'Listen Sie alle Kunden mit ihren Bestell-IDs auf, sodass auch Kunden ohne Bestellungen im Ergebnis erscheinen.',
        ],
      },
    },
  ],
};

export const joinsLevels: Level[] = [innerJoin, leftJoin];
