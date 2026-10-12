/**
 * Set operations — UNION, UNION ALL, INTERSECT, EXCEPT.
 *
 * Pedagogical design:
 * - Set theory intuition vs relational joins (vertical stacking vs horizontal stitching)
 * - Strict schema matching rules (column count and type affinity)
 * - RStudio-style cheat sheet diagrams
 * - Deduplication performance cost
 */
import { shopSchema, shopSeed } from './shopSchema';
import type { Level } from './types';

export const union: Level = {
  id: 'set-union',
  name: 'UNION',
  hint: 'SELECT city FROM customers UNION SELECT category FROM products;',
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
      markdowns: [
        '## مفهوم عملیات مجموعه‌ای (Set Operations)',
        'تا اینجا با `JOIN` جدول‌ها را **به صورت افقی (ستون در کنار ستون)** به هم می‌چسباندیم.',
        'اما عملگرهای مجموعه‌ای داده‌ها را **به صورت عمودی (ردیف زیر ردیف)** ترکیب می‌کنند!',
        'دستور `UNION` نتایج دو پرس‌وجو را مانند دو کیسه مهره در هم می‌ریزد و **تمام موارد تکراری را حذف می‌کند**.',
        '> 💡 **قانون طلایی عملیات مجموعه‌ای:** هر دو پرس‌وجو در دو طرف `UNION` باید **دقیقاً تعداد ستون‌های برابر** و نوع داده‌های سازگار داشته باشند.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'می‌خواهیم فهرستی یکتا از تمام واژه‌های مکانی و دسته‌بندی‌ها داشته باشیم:',
        '- تمام شهرهای مشتریان (`SELECT city FROM customers`)',
        '- تمام دسته‌بندی کالاها (`SELECT category FROM products`)',
        '- ترکیب با `UNION` و مرتب‌سازی بر اساس ستون اول (`ORDER BY 1`).',
        'هر مقدار تکراری به صورت خودکار حذف خواهد شد.',
      ],
    },
  ],
};

export const unionAll: Level = {
  id: 'set-union-all',
  name: 'UNION ALL',
  hint: 'SELECT city FROM customers UNION ALL SELECT category FROM products;',
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
      markdowns: [
        '## تفاوت سرنوشت‌ساز UNION با UNION ALL',
        'دستور `UNION` برای حذف تکراری‌ها مجبور است کل داده‌ها را مرتب کند یا در جدول درهم‌سازی (Hash Table) بگذارد؛ این کار در داده‌های میلیونی **بسیار پرهزینه و کند** است.',
        'در مقابل، `UNION ALL` بدون هیچ بررسی اضافه، ردیف‌های کوئری دوم را مستقیماً به انتهای کوئری اول اضافه می‌کند:',
        '- ردیف‌های تکراری دست‌نخورده باقی می‌مانند.',
        '- **سرعت اجرای فوق‌العاده بالاتری دارد**.',
        '> 💡 **توصیه دنیای واقعی مهندسی داده:** همیشه به صورت پیش‌فرض از `UNION ALL` استفاده کنید مگر اینکه واقعاً و صریحاً نیاز به حذف ردیف‌های تکراری داشته باشید.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'مجموع شهرهای ۵ مشتری و ۵ دسته‌بندی کالا را با `UNION ALL` ترکیب کنید و تعداد کل ردیف‌ها را بشمارید:',
        '```sql',
        'SELECT COUNT(*) AS total',
        'FROM (',
        '  SELECT city FROM customers',
        '  UNION ALL',
        '  SELECT category FROM products',
        ');',
        '```',
        'چون هیچ تکراری حذف نمی‌شود، دقیقاً ۵ + ۵ = ۱۰ ردیف به دست می‌آید.',
      ],
    },
  ],
};

export const intersect: Level = {
  id: 'set-intersect',
  name: 'INTERSECT',
  hint: 'SELECT customer_id FROM orders WHERE product_id = 1 INTERSECT SELECT customer_id FROM orders WHERE product_id = 2 ORDER BY 1;',
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
      markdowns: [
        '## مفهوم اشتراک مجموعه‌ها (INTERSECT)',
        'دستور `INTERSECT` اشتراک ریاضی بین دو پرس‌وجو است: **تنها ردیف‌هایی که در هر دو کوئری دقیقاً وجود دارند** بازگردانده می‌شوند.',
        'تصور کنید می‌خواهید بدانید: کدام مشتریان هم کیبورد (محصول ۱) و هم ماوس (محصول ۲) را خریده‌اند؟',
        '- کوئری اول: مشتریانی که محصول ۱ را خریده‌اند.',
        '- کوئری دوم: مشتریانی که محصول ۲ را خریده‌اند.',
        '- عملگر `INTERSECT` نقطه اشتراک این دو گروه را پیدا می‌کند.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'شناسه مشتریانی که **هم محصول ۱ و هم محصول ۲** را خریده‌اند استخراج کنید:',
        '```sql',
        'SELECT customer_id FROM orders WHERE product_id = 1',
        'INTERSECT',
        'SELECT customer_id FROM orders WHERE product_id = 2',
        'ORDER BY 1;',
        '```',
      ],
    },
  ],
};

export const except: Level = {
  id: 'set-except',
  name: 'EXCEPT',
  hint: 'SELECT name FROM customers EXCEPT SELECT customers.name FROM customers JOIN orders ON orders.customer_id = customers.id WHERE orders.product_id = 1 ORDER BY 1;',
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
      markdowns: [
        '## مفهوم تفاضل مجموعه‌ها (EXCEPT یا MINUS)',
        'دستور `EXCEPT` (که در برخی پایگاه‌ها مانند اوراکل `MINUS` نامیده می‌شود) تفاضل ریاضی است: **ردیف‌هایی که در مجموعه اول هستند اما در مجموعه دوم هرگز دیده نشده‌اند**.',
        'کاربرد کلیدی در کسب‌وکار: "کدام مشتریان هرگز فلان کالا را نخریده‌اند؟"',
        '- مجموعه A: همه مشتریان',
        '- مجموعه B: مشتریانی که کیبورد خریده‌اند',
        '- حاصل `A EXCEPT B`: مشتریانی که تا به حال کیبورد نخریده‌اند!',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'نام تمام مشتریانی که **محصول شماره ۱ (Keyboard)** را نخریده‌اند فهرست کنید:',
        '```sql',
        'SELECT name FROM customers',
        'EXCEPT',
        'SELECT customers.name',
        'FROM customers',
        'JOIN orders ON orders.customer_id = customers.id',
        'WHERE orders.product_id = 1',
        'ORDER BY 1;',
        '```',
      ],
    },
  ],
};

export const setOpsLevels: Level[] = [union, unionAll, intersect, except];
