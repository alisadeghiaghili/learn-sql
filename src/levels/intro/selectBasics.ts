/**
 * Intro sequence — SELECT fundamentals.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const selectAll: Level = {
  id: 'intro-select-all',
  name: {
    fa: 'انتخاب همه چیز (*)',
    en: 'Select Everything',
    de: 'Alles Auswählen (*)',
  },
  hint: {
    fa: 'از دستور SELECT * FROM customers; استفاده کنید.',
    en: 'Use SELECT * FROM customers;',
    de: 'Verwenden Sie SELECT * FROM customers;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution: 'SELECT * FROM customers;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'name', 'city', 'signup_year'],
    rows: [
      [1, 'Ada Lovelace', 'London', 2019],
      [2, 'Alan Turing', 'Manchester', 2020],
      [3, 'Grace Hopper', 'New York', 2018],
      [4, 'Edsger Dijkstra', 'Rotterdam', 2021],
      [5, 'Barbara Liskov', 'Los Angeles', 2022],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## پایگاه داده چیست و زبان SQL چگونه فکر می‌کند؟',
          'در پایگاه‌های داده رابطه‌ای داده‌ها در جدول‌ها شامل ردیف‌ها و ستون‌ها نگهداری می‌شوند.',
          'زبان SQL زبانی **توصیفی** است: به سیستم می‌گویید «چه داده‌ای می‌خواهید»، نه چگونگی جستجوی آن را.',
          'دستور `SELECT * FROM table_name` تمام ستون‌های جدول را استخراج می‌کند.',
        ],
        en: [
          '## How Relational Databases and SQL Work',
          'In relational databases, information is organized into tables consisting of rows and columns.',
          'SQL is **declarative**: you specify *what* data you need, leaving execution details to the engine.',
          'The query `SELECT * FROM table_name` retrieves every column from that table.',
        ],
        de: [
          '## Funktionsweise relationaler Datenbanken und SQL',
          'In relationalen Datenbanken werden Daten in Tabellen mit Zeilen und Spalten strukturiert.',
          'SQL ist **deklarativ**: Sie beschreiben, *welche* Daten Sie benötigen, nicht den genauen Suchalgorithmus.',
          'Die Abfrage `SELECT * FROM table_name` liest alle Spalten der Tabelle aus.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'تمام ردیف‌ها و ستون‌های جدول مشتریان (`customers`) را با دستور `SELECT *` استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Retrieve every row and column from the `customers` table using `SELECT *`.',
        ],
        de: [
          '## Ziel der Übung',
          'Rufen Sie mit `SELECT *` alle Zeilen und Spalten aus der Tabelle `customers` ab.',
        ],
      },
    },
  ],
};

export const selectColumns: Level = {
  id: 'intro-select-columns',
  name: {
    fa: 'انتخاب ستون‌های مشخص',
    en: 'Pick Columns',
    de: 'Spalten Auswählen',
  },
  hint: {
    fa: 'SELECT name, city FROM customers;',
    en: 'SELECT name, city FROM customers;',
    de: 'SELECT name, city FROM customers;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution: 'SELECT name, city FROM customers;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city'],
    rows: [
      ['Ada Lovelace', 'London'],
      ['Alan Turing', 'Manchester'],
      ['Grace Hopper', 'New York'],
      ['Edsger Dijkstra', 'Rotterdam'],
      ['Barbara Liskov', 'Los Angeles'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## تصویربرداری ستون‌ها (Projection)',
          'به جای `*`، نام ستون‌های مورد نیاز را با ویرگول جدا کنید: `SELECT name, city FROM customers;`.',
          'ترتیب ستون‌ها در بخش `SELECT`، ترتیب خروجی نهایی را تعیین می‌کند.',
        ],
        en: [
          '## Column Projection',
          'Instead of `*`, specify only the columns you require: `SELECT name, city FROM customers;`.',
          'The order in which columns are listed dictates their appearance in the result set.',
        ],
        de: [
          '## Spaltenprojektion',
          'Geben Sie anstelle von `*` nur die benötigten Spalten an: `SELECT name, city FROM customers;`.',
          'Die Reihenfolge der Spalten im SELECT-Teil bestimmt die Ausgabereihenfolge.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'فقط دو ستون `name` و `city` را از جدول `customers` برگردانید.',
        ],
        en: [
          '## Challenge Objective',
          'Return only the `name` and `city` columns from `customers`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie nur die Spalten `name` und `city` aus der Tabelle `customers` zurück.',
        ],
      },
    },
  ],
};

export const whereBasic: Level = {
  id: 'intro-where',
  name: {
    fa: 'فیلتر ردیف‌ها با WHERE',
    en: 'Filter Rows',
    de: 'Zeilen Filtern mit WHERE',
  },
  hint: {
    fa: "SELECT name FROM customers WHERE city = 'London';",
    en: "SELECT name FROM customers WHERE city = 'London';",
    de: "SELECT name FROM customers WHERE city = 'London';",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution: "SELECT name FROM customers WHERE city = 'London';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['Ada Lovelace']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## فیلتر کردن ردیف‌ها با شرط WHERE',
          'عبارت `WHERE` به موتور پایگاه داده می‌گوید ردیف‌ها را بر اساس یک شرط منطقی بسنجد:',
          '```sql',
          "SELECT name FROM customers WHERE city = 'London';",
          '```',
          '> ⚠️ **نکته:** مقادیر متنی (رشته‌ها) همیشه داخل کوتیشن تکی (`\'London\'`) قرار می‌گیرند.',
        ],
        en: [
          '## Filtering Rows with WHERE',
          'The `WHERE` clause filters rows against Boolean predicates:',
          '```sql',
          "SELECT name FROM customers WHERE city = 'London';",
          '```',
          "> ⚠️ **String Literal Rule:** Text values in SQL must be enclosed in single quotes (`'London'`).",
        ],
        de: [
          '## Zeilen filtern mit WHERE',
          'Die `WHERE`-Klausel filtert Zeilen anhand logischer Bedingungen:',
          '```sql',
          "SELECT name FROM customers WHERE city = 'London';",
          '```',
          "> ⚠️ **Textwerte:** Zeichenketten in SQL müssen in einfachen Anführungszeichen stehen (`'London'`).",
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام مشتریانی را برگردانید که شهر آن‌ها لندن (`city = \'London\'`) است.',
        ],
        en: [
          '## Challenge Objective',
          'Return the name of customers whose city is London.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie den Namen aller Kunden aus, deren Stadt London ist.',
        ],
      },
    },
  ],
};

export const orderLimit: Level = {
  id: 'intro-order-limit',
  name: {
    fa: 'مرتب‌سازی و برش (ORDER BY و LIMIT)',
    en: 'Order and Limit',
    de: 'Sortieren und Begrenzen',
  },
  hint: {
    fa: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
    en: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
    de: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'price'],
    rows: [
      ['Monitor', 249],
      ['Keyboard', 89.5],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مرتب‌سازی با ORDER BY و برش با LIMIT',
          'جدول‌ها در SQL فاقد ترتیب درونی هستند. برای مرتب‌سازی:',
          '- `ORDER BY column ASC`: صعودی (پیش‌فرض)',
          '- `ORDER BY column DESC`: نزولی (از زیاد به کم)',
          '- دستور `LIMIT n`: نگه‌داشتن فقط `n` ردیف اول خروجی.',
        ],
        en: [
          '## ORDER BY and LIMIT',
          'Relational tables have no inherent order. To sort rows deterministically:',
          '- `ORDER BY column ASC`: Ascending (default)',
          '- `ORDER BY column DESC`: Descending',
          '- `LIMIT n`: Keeps only the top `n` rows after sorting.',
        ],
        de: [
          '## ORDER BY und LIMIT',
          'Relationale Tabellen besitzen keine feste Reihenfolge. Zum Sortieren:',
          '- `ORDER BY column ASC`: Aufsteigend (Standard)',
          '- `ORDER BY column DESC`: Absteigend',
          '- `LIMIT n`: Begrenzt das Ergebnis auf die ersten `n` Zeilen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام و قیمت ۲ محصول گران‌قیمت فروشگاه را بیابید (`ORDER BY price DESC LIMIT 2`).',
        ],
        en: [
          '## Challenge Objective',
          'Return the name and price of the two most expensive products.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie Name und Preis der beiden teuersten Produkte aus.',
        ],
      },
    },
  ],
};

export const introLevels: Level[] = [
  selectAll,
  selectColumns,
  whereBasic,
  orderLimit,
];
