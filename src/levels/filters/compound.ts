/**
 * Filters sequence — compound predicates and pattern matching.
 *
 * Pedagogical design:
 * - Boolean logic & operator precedence (parentheses matter!)
 * - Simplifying verbose logic with IN and BETWEEN
 * - SQL Three-Valued Logic (3VL) & why `= NULL` is a critical bug
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const andOr: Level = {
  id: 'filters-and-or',
  name: 'AND / OR',
  hint: "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
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
      markdowns: [
        '## ترکیب شرط‌های منطقی (AND و OR)',
        'در زندگی واقعی به ندرت فیلترها تک‌شرطی هستند. برای ترکیب شرط‌ها از عملگرهای منطقی بولی استفاده می‌کنیم:',
        '- **عملگر `AND`:** ردیف فقط در صورتی انتخاب می‌شود که **هر دو شرط** برقرار باشند.',
        '- **عملگر `OR`:** کافی است **حداقل یکی از دو شرط** برقرار باشد تا ردیف برگردانده شود.',
        '> ⚠️ **دام اولویت عملگرها (Operator Precedence):** در زبان SQL تقدم عملگر `AND` بالاتر از `OR` است (دقیقاً مثل ضرب که بر جمع تقدم دارد). اگر شرط‌های ترکیبی دارید، حتماً از پرانتز `( )` برای مشخص کردن تقدم استفاده کنید.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'نام مشتریانی را استخراج کنید که در شهر لندن یا در نیویورک زندگی می‌کنند:',
        '```sql',
        "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
        '```',
      ],
    },
  ],
};

export const inBetween: Level = {
  id: 'filters-in-between',
  name: 'IN and BETWEEN',
  hint: "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
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
      markdowns: [
        '## تمیزنویسی با IN و بازه‌های مقداری با BETWEEN',
        'نوشتن زنجیره‌ای از `OR` برای یک ستون کلافه‌کننده است (`city = \'London\' OR city = \'Paris\' OR ...`).',
        'دستور `IN` کار را فوق‌العاده تمیز می‌کند:',
        "`WHERE city IN ('London', 'Paris', 'Tokyo')`",
        '### فیلتر بازه‌ای با BETWEEN:',
        'برای بررسی قرار گرفتن عدد بین حداقل و حداکثر، به جای `price >= 30 AND price <= 50` از `BETWEEN` استفاده می‌کنیم:',
        '`WHERE price BETWEEN 30 AND 50`',
        '> 💡 توجه: عملگر `BETWEEN` هر دو سر بازه را نیز شامل می‌شود (Inclusive).',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'نام کالاهایی را پیدا کنید که دسته‌بندی آن‌ها کتاب (`category = \'Books\'`) است **و** قیمت آن‌ها بین ۳۰ تا ۵۰ دلار قرار دارد (`price BETWEEN 30 AND 50`).',
      ],
    },
  ],
};

export const likeNull: Level = {
  id: 'filters-like-null',
  name: 'LIKE and NULL',
  hint: "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
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
      markdowns: [
        '## جستجوی الگوی متنی (LIKE) و فلسفه NULL در SQL',
        'اگر نام دقیق را نمی‌دانید یا به دنبال الگوی خاصی هستید، از `LIKE` استفاده کنید:',
        '- علامت `%`: جانشین صفر یا چند کاراکتر است (`\'A%\'` یعنی هر متنی که با A شروع شود).',
        '- علامت `_`: جانشین دقیقاً یک کاراکتر است.',
        '### چرا نوشتن WHERE column = NULL یک اشتباه فاحش است؟',
        'در پایگاه‌های داده، `NULL` یک مقدار نیست، بلکه **«نبود داده / نامعلوم»** است.',
        'آیا دو چیز نامعلوم با هم برابرند؟ خیر! بنابراین هر مقایسه‌ای مثل `city = NULL` حاصلش `UNKNOWN` خواهد بود.',
        '> ⚠️ **قانون ابدی:** برای بررسی تهی بودن، همیشه و منحصراً از `IS NULL` یا `IS NOT NULL` استفاده کنید.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'نام و شهر مشتریانی را بیابید که نام آن‌ها با حرف A شروع می‌شود (`name LIKE \'A%\'`) **یا** شهر آن‌ها خالی/ناشناخته است (`city IS NULL`):',
        '```sql',
        "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
        '```',
      ],
    },
  ],
};

export const filtersLevels: Level[] = [andOr, inBetween, likeNull];
