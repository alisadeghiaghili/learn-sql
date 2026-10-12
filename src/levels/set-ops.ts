/**
 * Set operations — UNION, UNION ALL, INTERSECT, EXCEPT.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import { shopSchema, shopSeed } from './shopSchema';
import type { Level } from './types';

export const union: Level = {
  id: 'set-union',
  name: {
    fa: 'اجتماع یکتا (UNION)',
    en: 'UNION',
    de: 'UNION (Vereinigung)',
  },
  hint: {
    fa: 'SELECT city FROM customers UNION SELECT category FROM products ORDER BY 1;',
    en: 'SELECT city FROM customers UNION SELECT category FROM products ORDER BY 1;',
    de: 'SELECT city FROM customers UNION SELECT category FROM products ORDER BY 1;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT city FROM customers UNION SELECT category FROM products ORDER BY 1;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['city'],
    rows: [
      ['Books'],
      ['Hardware'],
      ['London'],
      ['Los Angeles'],
      ['Manchester'],
      ['New York'],
      ['Rotterdam'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'union',
      markdowns: {
        fa: [
          '## مفهوم عملیات مجموعه‌ای: دستور UNION',
          '`UNION` ردیف‌های دو کوئری را به صورت عمودی زیر هم قرار داده و تکراری‌ها را حذف می‌کند.',
          '> 💡 **قانون:** هر دو کوئری باید تعداد ستون‌ها و نوع داده‌های سازگار داشته باشند.',
        ],
        en: [
          '## Set Operations: UNION',
          '`UNION` stacks rows from two queries vertically and strips out duplicate records.',
          '> 💡 **Rule:** Both queries must have matching column counts and compatible data types.',
        ],
        de: [
          '## Mengenoperationen: UNION',
          '`UNION` fasst Zeilen zweier Abfragen zusammen und entfernt Duplikate.',
          '> 💡 **Regel:** Beide Abfragen müssen dieselbe Spaltenanzahl und kompatible Datentypen aufweisen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'شهرهای مشتریان و دسته‌بندی محصولات را به شکل یکتا با `UNION` ترکیب کرده و بر اساس ستون اول مرتب نمایید (`ORDER BY 1`).',
        ],
        en: [
          '## Challenge Objective',
          'Combine customer cities and product categories (distinct), sorted by column 1 (`ORDER BY 1`).',
        ],
        de: [
          '## Ziel der Übung',
          'Kombinieren Sie Kundenstädte und Produktkategorien (eindeutig), sortiert nach Spalte 1 (`ORDER BY 1`).',
        ],
      },
    },
  ],
};

export const unionAll: Level = {
  id: 'set-union-all',
  name: {
    fa: 'اجتماع کامل با تکراری‌ها (UNION ALL)',
    en: 'UNION ALL',
    de: 'UNION ALL',
  },
  hint: {
    fa: 'SELECT COUNT(*) AS total FROM (SELECT city FROM customers UNION ALL SELECT category FROM products);',
    en: 'SELECT COUNT(*) AS total FROM (SELECT city FROM customers UNION ALL SELECT category FROM products);',
    de: 'SELECT COUNT(*) AS total FROM (SELECT city FROM customers UNION ALL SELECT category FROM products);',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT COUNT(*) AS total FROM (SELECT city FROM customers UNION ALL SELECT category FROM products);',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['total'],
    rows: [[10]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'union-all',
      markdowns: {
        fa: [
          '## تفاوت کلیدی UNION با UNION ALL',
          '`UNION ALL` ردیف‌ها را بدون بررسی تکراری‌ها ترکیب می‌کند؛ بنابراین بسیار سریع‌تر است.',
        ],
        en: [
          '## UNION vs UNION ALL',
          '`UNION ALL` retains duplicate rows without sorting or deduplication overhead, making it significantly faster.',
        ],
        de: [
          '## UNION im Vergleich zu UNION ALL',
          '`UNION ALL` behält Duplikate bei und ist deutlich performanter, da kein Sortier- oder Deduplizierungsaufwand anfällt.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'تعداد کل ردیف‌های حاصل از `UNION ALL` بین شهرهای مشتریان و دسته‌بندی کالاها را با نام `total` بشمارید.',
        ],
        en: [
          '## Challenge Objective',
          'Count the total rows resulting from a `UNION ALL` of cities and categories, aliased as `total`.',
        ],
        de: [
          '## Ziel der Übung',
          'Zählen Sie alle Zeilen aus einem `UNION ALL` von Städten und Kategorien unter dem Alias `total`.',
        ],
      },
    },
  ],
};

export const intersect: Level = {
  id: 'set-intersect',
  name: {
    fa: 'اشتراک مجموعه‌ها (INTERSECT)',
    en: 'INTERSECT',
    de: 'INTERSECT (Schnittmenge)',
  },
  hint: {
    fa: 'SELECT customer_id FROM orders WHERE product_id = 1 INTERSECT SELECT customer_id FROM orders WHERE product_id = 2 ORDER BY 1;',
    en: 'SELECT customer_id FROM orders WHERE product_id = 1 INTERSECT SELECT customer_id FROM orders WHERE product_id = 2 ORDER BY 1;',
    de: 'SELECT customer_id FROM orders WHERE product_id = 1 INTERSECT SELECT customer_id FROM orders WHERE product_id = 2 ORDER BY 1;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT customer_id FROM orders WHERE product_id = 1 INTERSECT SELECT customer_id FROM orders WHERE product_id = 2 ORDER BY 1;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['customer_id'],
    rows: [[4]],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'intersect',
      markdowns: {
        fa: [
          '## مفهوم اشتراک (INTERSECT)',
          '`INTERSECT` فقط ردیف‌هایی را بازمی‌گرداند که در هر دو کوئری دقیقاً وجود داشته باشند.',
        ],
        en: [
          '## Set Intersection (INTERSECT)',
          '`INTERSECT` returns only values that appear in BOTH queries.',
        ],
        de: [
          '## Schnittmenge (INTERSECT)',
          '`INTERSECT` liefert nur Datensätze zurück, die in BEIDEN Abfragen vorhanden sind.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'شناسه مشتریانی که هم محصول ۱ (کیبورد) و هم محصول ۲ (ماوس) را خریده‌اند پیدا کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Find customers who ordered both the Keyboard (product 1) and the Mouse (product 2).',
        ],
        de: [
          '## Ziel der Übung',
          'Finden Sie Kunden, die sowohl die Tastatur (Produkt 1) als auch die Maus (Produkt 2) bestellt haben.',
        ],
      },
    },
  ],
};

export const except: Level = {
  id: 'set-except',
  name: {
    fa: 'تفاضل مجموعه‌ها (EXCEPT)',
    en: 'EXCEPT',
    de: 'EXCEPT (Differenzmenge)',
  },
  hint: {
    fa: 'SELECT name FROM customers EXCEPT SELECT customers.name FROM customers JOIN orders ON orders.customer_id = customers.id WHERE orders.product_id = 1 ORDER BY 1;',
    en: 'SELECT name FROM customers EXCEPT SELECT customers.name FROM customers JOIN orders ON orders.customer_id = customers.id WHERE orders.product_id = 1 ORDER BY 1;',
    de: 'SELECT name FROM customers EXCEPT SELECT customers.name FROM customers JOIN orders ON orders.customer_id = customers.id WHERE orders.product_id = 1 ORDER BY 1;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name FROM customers EXCEPT SELECT customers.name FROM customers JOIN orders ON orders.customer_id = customers.id WHERE orders.product_id = 1 ORDER BY 1;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Alan Turing'],
      ['Barbara Liskov'],
      ['Grace Hopper'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      diagram: 'except',
      markdowns: {
        fa: [
          '## مفهوم تفاضل مجموعه‌ها (EXCEPT)',
          '`A EXCEPT B` ردیف‌هایی را برمی‌گرداند که در مجموعه A هستند اما در مجموعه B هرگز وجود ندارند.',
        ],
        en: [
          '## Set Difference (EXCEPT)',
          '`A EXCEPT B` returns rows present in set A that do not exist in set B.',
        ],
        de: [
          '## Differenzmenge (EXCEPT)',
          '`A EXCEPT B` liefert Zeilen, die in Menge A vorkommen, aber in Menge B fehlen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام تمام مشتریانی را استخراج کنید که هرگز محصول ۱ (کیبورد) را سفارش نداده‌اند.',
        ],
        en: [
          '## Challenge Objective',
          'List all customers who have NOT ordered the Keyboard (product 1).',
        ],
        de: [
          '## Ziel der Übung',
          'Listen Sie alle Kunden auf, die die Tastatur (Produkt 1) NICHT bestellt haben.',
        ],
      },
    },
  ],
};

export const setOpsLevels: Level[] = [union, unionAll, intersect, except];
