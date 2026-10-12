/**
 * Filters sequence — compound predicates and pattern matching.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const andOr: Level = {
  id: 'filters-and-or',
  name: {
    fa: 'ترکیب شرط‌ها (AND و OR)',
    en: 'AND / OR',
    de: 'AND / OR (Logische Operatoren)',
  },
  hint: {
    fa: "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
    en: "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
    de: "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['Ada Lovelace'], ['Grace Hopper']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## ترکیب شرط‌های منطقی (AND و OR)',
          '- `AND`: هر دو شرط باید هم‌زمان برقرار باشند.',
          '- `OR`: کافی است حداقل یکی از دو شرط برقرار باشد.',
          '> ⚠️ **تقدم عملگرها:** در SQL تقدم `AND` بالاتر از `OR` است؛ از پرانتز `( )` برای مشخص کردن تقدم استفاده کنید.',
        ],
        en: [
          '## Combining Predicates (AND & OR)',
          '- `AND` requires both conditions to evaluate to TRUE.',
          '- `OR` accepts rows where at least one condition holds.',
          '> ⚠️ **Operator Precedence:** `AND` binds tighter than `OR`. Always use parentheses `( )` for unambiguous logic.',
        ],
        de: [
          '## Logische Operatoren (AND & OR)',
          '- `AND` erfordert, dass beide Bedingungen WAHR sind.',
          '- `OR` akzeptiert Zeilen, wenn mindestens eine Bedingung erfüllt ist.',
          '> ⚠️ **Operatorrangfolge:** `AND` bindet stärker als `OR`. Nutzen Sie Klammern `( )` zur eindeutigen Gruppierung.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام مشتریانی را بیابید که در لندن یا نیویورک زندگی می‌کنند.',
        ],
        en: [
          '## Challenge Objective',
          'Return names of customers located in London or New York.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie die Namen der Kunden aus London oder New York zurück.',
        ],
      },
    },
  ],
};

export const inBetween: Level = {
  id: 'filters-in-between',
  name: {
    fa: 'فیلتر تمیز با IN و بازه‌ای با BETWEEN',
    en: 'IN and BETWEEN',
    de: 'IN und BETWEEN',
  },
  hint: {
    fa: "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
    en: "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
    de: "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['SQL Handbook'], ['Query Tuning']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## تمیزنویسی با IN و بازه‌ها با BETWEEN',
          '- دستور `IN (\'a\', \'b\')`: جایگزین خوانا و مختصر برای چندین `OR`.',
          '- دستور `BETWEEN 30 AND 50`: فیلتر بازه‌ای شامل هر دو عدد ابتدا و انتها.',
        ],
        en: [
          '## Cleaner Queries with IN & BETWEEN',
          '- `IN (\'a\', \'b\')`: Clean shorthand replacing chains of `OR`.',
          '- `BETWEEN 30 AND 50`: Inclusive range comparison on both boundaries.',
        ],
        de: [
          '## Prägnante Filter mit IN & BETWEEN',
          '- `IN (\'a\', \'b\')`: Kompakte Alternative zu mehreren `OR`-Bedingungen.',
          '- `BETWEEN 30 AND 50`: Wertebereich inklusive der Grenzwerte.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام کتاب‌هایی را بیابید که قیمت آن‌ها بین ۳۰ تا ۵۰ دلار است.',
        ],
        en: [
          '## Challenge Objective',
          'Return book names priced between 30 and 50 inclusive.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie Buchtitel mit Preisen zwischen 30 und 50 aus.',
        ],
      },
    },
  ],
};

export const likeNull: Level = {
  id: 'filters-like-null',
  name: {
    fa: 'جستجوی الگو (LIKE) و مقادیر تهی (NULL)',
    en: 'LIKE and NULL',
    de: 'LIKE und NULL',
  },
  hint: {
    fa: "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
    en: "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
    de: "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city'],
    rows: [
      ['Ada Lovelace', 'London'],
      ['Alan Turing', 'Manchester'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## جستجوی الگو با LIKE و منطق NULL',
          '- در `LIKE`: علامت `%` به معنای هر تعداد کاراکتر است.',
          '- مقدار `NULL` نشان‌دهنده «نبود داده» است، نه صفر یا متن خالی.',
          '> ⚠️ **قانون:** هرگز ننویسید `= NULL`. همیشه از `IS NULL` یا `IS NOT NULL` استفاده کنید.',
        ],
        en: [
          '## Pattern Matching with LIKE & NULL Logic',
          '- In `LIKE`: `%` matches zero or more characters.',
          '- `NULL` represents unknown or missing data.',
          '> ⚠️ **Cardinal Rule:** Never write `= NULL`. Always use `IS NULL` or `IS NOT NULL`.',
        ],
        de: [
          '## Mustersuche mit LIKE & Umgang mit NULL',
          '- Bei `LIKE` fungiert `%` als Platzhalter für beliebige Zeichenketten.',
          '- `NULL` bedeutet fehlende oder unbekannte Daten.',
          '> ⚠️ **Grundregel:** Niemals `= NULL` schreiben. Verwenden Sie immer `IS NULL` oder `IS NOT NULL`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام و شهر مشتریانی را بیابید که نام آن‌ها با A شروع می‌شود یا شهر آن‌ها خالی است.',
        ],
        en: [
          '## Challenge Objective',
          'Return name and city of customers whose name begins with A or whose city is NULL.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie Name und Stadt von Kunden aus, deren Name mit A beginnt oder deren Stadt NULL ist.',
        ],
      },
    },
  ],
};

export const filtersLevels: Level[] = [andOr, inBetween, likeNull];
