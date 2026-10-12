/**
 * Advanced joins — CROSS, SELF, RIGHT, and FULL OUTER JOIN.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import { shopSchema, shopSeed } from './shopSchema';
import { employeesSchema, employeesSeed } from './customSchemas';
import type { Level } from './types';

export const crossJoin: Level = {
  id: 'aj-cross',
  name: {
    fa: 'ضرب دکارتی (CROSS JOIN)',
    en: 'CROSS JOIN',
    de: 'CROSS JOIN (Kartesisches Produkt)',
  },
  hint: {
    fa: 'SELECT COUNT(*) AS pairs FROM customers c CROSS JOIN products p;',
    en: 'SELECT COUNT(*) AS pairs FROM customers c CROSS JOIN products p;',
    de: 'SELECT COUNT(*) AS pairs FROM customers c CROSS JOIN products p;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT COUNT(*) AS pairs FROM customers c CROSS JOIN products p;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['pairs'],
    rows: [[25]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'cross-join',
      markdowns: {
        fa: [
          '## مفهوم ضرب دکارتی (CROSS JOIN)',
          'دستور `CROSS JOIN` تک‌تک ردیف‌های جدول اول را با تک‌تک ردیف‌های جدول دوم جفت می‌کند (Cartesian Product).',
          '- ۵ مشتری × ۵ کالا = ۲۵ جفت خروجی.',
          '- کاربرد: ساخت ماتریس تمام ترکیب‌های ممکن.',
          '> ⚠️ **هشدار عملکرد:** نبود شرط `ON` در جدول‌های بزرگ می‌تواند میلیون‌ها ردیف ناخواسته تولید کند!',
        ],
        en: [
          '## Cartesian Product (CROSS JOIN)',
          'A `CROSS JOIN` pairs every row of the left table with every row of the right table.',
          '- 5 customers × 5 products = 25 output pairs.',
          '- Use cases: Generating matrices of all possible combinations (e.g. sizes × colors).',
          '> ⚠️ **Performance Warning:** Accidental CROSS JOINs on large tables create millions of unexpected rows!',
        ],
        de: [
          '## Kartesisches Produkt (CROSS JOIN)',
          'Ein `CROSS JOIN` kombiniert jede Zeile der linken Tabelle mit jeder Zeile der rechten Tabelle.',
          '- 5 Kunden × 5 Produkte = 25 Ergebnispaare.',
          '- Anwendungsfälle: Erzeugung von Matrizen aller möglichen Kombinationen (z. B. Größen × Farben).',
          '> ⚠️ **Performance-Warnung:** Ein versehentlicher CROSS JOIN auf großen Tabellen erzeugt Millionen Zeilen!',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'با استفاده از `COUNT(*)` و نام مستعار `pairs`، تعداد کل جفت‌های حاصل از ضرب دکارتی مشتریان و کالاها را محاسبه کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Count the total rows produced by a `CROSS JOIN` of customers and products with alias `pairs`.',
        ],
        de: [
          '## Ziel der Übung',
          'Zählen Sie die Gesamtanzahl der Zeilen eines `CROSS JOIN` von Kunden und Produkten unter dem Alias `pairs`.',
        ],
      },
    },
  ],
};

export const selfJoin: Level = {
  id: 'aj-self',
  name: {
    fa: 'اتصال جدول به خودش (SELF JOIN)',
    en: 'SELF JOIN',
    de: 'SELF JOIN',
  },
  hint: {
    fa: 'SELECT e.name AS employee, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id ORDER BY e.id;',
    en: 'SELECT e.name AS employee, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id ORDER BY e.id;',
    de: 'SELECT e.name AS employee, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id ORDER BY e.id;',
  },
  schema: employeesSchema,
  seed: employeesSeed,
  solution:
    'SELECT e.name AS employee, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id ORDER BY e.id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['employee', 'manager'],
    rows: [
      ['CTO', 'CEO'],
      ['VP Eng', 'CTO'],
      ['Dev A', 'VP Eng'],
      ['Dev B', 'VP Eng'],
      ['Finance', 'CEO'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'self-join',
      markdowns: {
        fa: [
          '## مفهوم SELF JOIN: اتصال جدول به خودش',
          'گاهی روابط داده‌ای درون همان جدول وجود دارند؛ مثلاً در چارت سازمانی، ستون `manager_id` به شناسه کارمند دیگری در همین جدول ارجاع دارد.',
          'برای این کار جدول را با دو نام مستعار (`e` کارمند و `m` مدیر) با خودش متصل می‌کنیم.',
        ],
        en: [
          '## Core Concept: Joining a Table to Itself',
          'Hierarchical data often lives within the same table (e.g. `manager_id` referencing another employee in the same table).',
          'We join `employees` to itself by giving it two distinct aliases: `e` (worker) and `m` (manager).',
        ],
        de: [
          '## Grundkonzept: Verknüpfung einer Tabelle mit sich selbst',
          'Hierarchische Daten befinden sich oft in derselben Tabelle (z. B. verweist `manager_id` auf einen anderen Mitarbeiter).',
          'Wir verknüpfen `employees` mit sich selbst unter zwei Aliasen: `e` (Mitarbeiter) und `m` (Vorgesetzter).',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام هر کارمند (`employee`) و نام مدیر او (`manager`) را استخراج کرده و بر اساس شناسه کارمند مرتب کنید (`ORDER BY e.id`).',
        ],
        en: [
          '## Challenge Objective',
          'List each employee (`employee`) and their manager (`manager`), ordered by employee id (`ORDER BY e.id`).',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie jeden Mitarbeiter (`employee`) und seinen Vorgesetzten (`manager`) aus, sortiert nach der Mitarbeiter-ID (`ORDER BY e.id`).',
        ],
      },
    },
  ],
};

export const rightJoin: Level = {
  id: 'aj-right',
  name: {
    fa: 'اتصال بیرونی راست (RIGHT JOIN)',
    en: 'RIGHT JOIN',
    de: 'RIGHT JOIN',
  },
  hint: {
    fa: 'SELECT customers.id AS customer_id, orders.id AS order_id FROM customers LEFT JOIN orders ON orders.customer_id = customers.id ORDER BY customers.id;',
    en: 'SELECT customers.id AS customer_id, orders.id AS order_id FROM customers LEFT JOIN orders ON orders.customer_id = customers.id ORDER BY customers.id;',
    de: 'SELECT customers.id AS customer_id, orders.id AS order_id FROM customers LEFT JOIN orders ON orders.customer_id = customers.id ORDER BY customers.id;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT customers.id AS customer_id, orders.id AS order_id FROM customers LEFT JOIN orders ON orders.customer_id = customers.id ORDER BY customers.id;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['customer_id', 'order_id'],
    rows: [
      [1, 1], [1, 2], [1, 9],
      [2, 3], [2, 8],
      [3, 4], [3, 5],
      [4, 6], [4, 10],
      [5, 7],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'right-join',
      markdowns: {
        fa: [
          '## مفهوم RIGHT JOIN و راهکار SQLite',
          '`RIGHT JOIN` تمام ردیف‌های جدول سمت راست را نگه می‌دارد.',
          '> ⚠️ **نکته دیالکت:** SQLite دستور RIGHT JOIN را ندارد. اما هر کوئری `A RIGHT JOIN B` معادل با `B LEFT JOIN A` است!',
        ],
        en: [
          '## RIGHT JOIN & The SQLite Workaround',
          '`RIGHT JOIN` preserves every row of the right table.',
          '> ⚠️ **Dialect Nuance:** SQLite lacks native RIGHT JOIN. Express it seamlessly by reversing table order: `B LEFT JOIN A`!',
        ],
        de: [
          '## RIGHT JOIN & die SQLite-Alternative',
          '`RIGHT JOIN` behält jede Zeile der rechten Tabelle bei.',
          '> ⚠️ **Dialekt-Hinweis:** SQLite unterstützt kein direktes RIGHT JOIN. Man vertauscht die Tabellen: `B LEFT JOIN A`!',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'تمام مشتریان را به همراه شناسه سفارش‌ها استخراج کرده و بر اساس شناسه مشتری مرتب کنید.',
        ],
        en: [
          '## Challenge Objective',
          'List every customer with their order ids using LEFT JOIN, ordered by customer id.',
        ],
        de: [
          '## Ziel der Übung',
          'Listen Sie jeden Kunden mit seinen Bestell-IDs per LEFT JOIN auf, sortiert nach der Kunden-ID.',
        ],
      },
    },
  ],
};

export const fullJoin: Level = {
  id: 'aj-full',
  name: {
    fa: 'اتصال کامل دوطرفه (FULL OUTER JOIN)',
    en: 'FULL OUTER JOIN',
    de: 'FULL OUTER JOIN',
  },
  hint: {
    fa: 'LEFT JOIN ... UNION ... LEFT JOIN (با تعویض جای جدول‌ها)',
    en: 'LEFT JOIN ... UNION ... LEFT JOIN (with tables swapped)',
    de: 'LEFT JOIN ... UNION ... LEFT JOIN (mit vertauschten Tabellen)',
  },
  schema: employeesSchema,
  seed: employeesSeed,
  solution:
    'SELECT e.id AS id, e.name, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id UNION SELECT e.id, e.name, m.name FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;',
  golfPar: 2,
  goal: {
    type: 'result',
    columns: ['id', 'name', 'manager'],
    rows: [
      [1, 'CEO', null],
      [2, 'CTO', 'CEO'],
      [3, 'VP Eng', 'CTO'],
      [4, 'Dev A', 'VP Eng'],
      [5, 'Dev B', 'VP Eng'],
      [6, 'Finance', 'CEO'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'full-join',
      markdowns: {
        fa: [
          '## مفهوم FULL OUTER JOIN',
          '`FULL OUTER JOIN` تمام ردیف‌ها از هر دو جدول را حفظ می‌کند و هر جا جفتی نباشد، مقدار با `NULL` پر می‌شود.',
          '> 💡 در پایگاه‌هایی که FULL JOIN ندارند، آن را با اجتماع دو اتصال چپ می‌سازند: `(A LEFT JOIN B) UNION (B LEFT JOIN A)`.',
        ],
        en: [
          '## FULL OUTER JOIN Concept',
          '`FULL OUTER JOIN` retains ALL rows from both sides, padding non-matching sides with `NULL`.',
          '> 💡 In databases without FULL JOIN support, construct it via: `(A LEFT JOIN B) UNION (B LEFT JOIN A)`.',
        ],
        de: [
          '## Konzept des FULL OUTER JOIN',
          '`FULL OUTER JOIN` behält ALLE Zeilen beider Seiten bei und füllt nicht übereinstimmende Werte mit `NULL` auf.',
          '> 💡 In Datenbanken ohne direkten FULL JOIN wird dies simuliert durch: `(A LEFT JOIN B) UNION (B LEFT JOIN A)`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'تمام کارمندان را به همراه مدیرشان استخراج کنید تا مطمئن شوید حتی مدیرعامل با مدیر `NULL` نمایش داده می‌شود.',
        ],
        en: [
          '## Challenge Objective',
          'Produce a full join of employees to their manager: every employee, showing their manager or NULL.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie eine vollständige Verknüpfung aller Mitarbeiter mit ihren Managern (Mitarbeiter ohne Manager zeigen NULL).',
        ],
      },
    },
  ],
};

export const advancedJoinLevels: Level[] = [crossJoin, selfJoin, rightJoin, fullJoin];
