/**
 * Aggregation sequence — GROUP BY and HAVING.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const groupBy: Level = {
  id: 'groups-count',
  name: {
    fa: 'توابع تجمیعی و GROUP BY',
    en: 'COUNT and GROUP BY',
    de: 'COUNT und GROUP BY',
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
      markdowns: {
        fa: [
          '## مدل ذهنی تجمیع داده‌ها (GROUP BY)',
          'توابع `COUNT`، `SUM`، `AVG`، `MIN`، `MAX` داده‌ها را در یک عدد خلاصه می‌کنند.',
          'دستور `GROUP BY` ردیف‌ها را بر اساس ستونی مشخص به دسته‌های جداگانه تقسیم می‌کند تا تابع تجمیعی روی هر دسته جداگانه محاسبه شود.',
          '> ⚠️ **قانون:** هر ستونی که در `SELECT` است اما در تابع تجمیعی نیست، باید حتماً در `GROUP BY` آورده شود.',
        ],
        en: [
          '## Aggregation & GROUP BY',
          'Functions like `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` collapse rows into summary statistics.',
          '`GROUP BY` partitions rows into distinct buckets so aggregates calculate per category.',
          '> ⚠️ **The Golden Rule:** Every non-aggregated column in `SELECT` must appear in the `GROUP BY` clause.',
        ],
        de: [
          '## Aggregation & GROUP BY',
          'Funktionen wie `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` fassen Zeilen zu Kennzahlen zusammen.',
          '`GROUP BY` teilt Zeilen in Gruppen ein, sodass Aggregationen pro Kategorie berechnet werden.',
          '> ⚠️ **Grundregel:** Jede nicht aggregierte Spalte in `SELECT` muss in der `GROUP BY`-Klausel aufgeführt sein.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'کالاها را بر اساس دسته‌بندی (`category`) گروه‌بندی کرده و تعداد کالاهای هر دسته را با `COUNT(*)` بشمارید.',
        ],
        en: [
          '## Challenge Objective',
          'Group products by category and calculate how many products exist in each category.',
        ],
        de: [
          '## Ziel der Übung',
          'Gruppieren Sie Produkte nach Kategorie und ermitteln Sie die Anzahl der Produkte je Kategorie.',
        ],
      },
    },
  ],
};

export const havingSum: Level = {
  id: 'groups-having',
  name: {
    fa: 'فیلتر گروه‌ها با HAVING',
    en: 'HAVING',
    de: 'HAVING (Gruppenfilter)',
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
          '## تفاوت بنیادین WHERE و HAVING',
          '- `WHERE`: ردیف‌های خام را قبل از گروه‌بندی فیلتر می‌کند.',
          '- `HAVING`: دسته‌ها را پس از محاسبه تابع تجمیعی فیلتر می‌کند.',
        ],
        en: [
          '## WHERE vs HAVING Lifecycle',
          '- `WHERE`: Filters raw input rows before grouping.',
          '- `HAVING`: Filters aggregated groups after the summary values are computed.',
        ],
        de: [
          '## Unterschied zwischen WHERE und HAVING',
          '- `WHERE`: Filtert Rohzeilen vor der Gruppierung.',
          '- `HAVING`: Filtert aggregierte Gruppen nach der Berechnung der Kennzahlen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'مشتریانی را پیدا کنید که مجموع تعداد سفارش‌های آن‌ها بیش از ۲ است (`HAVING SUM(quantity) > 2`).',
        ],
        en: [
          '## Challenge Objective',
          'Find customers whose total ordered quantity exceeds 2 (`HAVING SUM(quantity) > 2`).',
        ],
        de: [
          '## Ziel der Übung',
          'Ermitteln Sie Kunden, deren Gesamtbestellmenge größer als 2 ist (`HAVING SUM(quantity) > 2`).',
        ],
      },
    },
  ],
};

export const groupsLevels: Level[] = [groupBy, havingSum];
