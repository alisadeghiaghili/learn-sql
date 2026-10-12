/**
 * Aggregation sequence — GROUP BY and HAVING.
 *
 * Pedagogical design:
 * - Split-Apply-Combine mental model
 * - The strict GROUP BY projection constraint
 * - Execution lifecycle: WHERE (pre-group) vs HAVING (post-aggregate)
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const groupBy: Level = {
  id: 'groups-count',
  name: 'COUNT and GROUP BY',
  hint: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
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
      markdowns: [
        '## مدل ذهنی تجمیع داده‌ها (Split-Apply-Combine)',
        'توابع تجمیعی (`COUNT`، `SUM`، `AVG`، `MIN`، `MAX`) صدها ردیف را دریافت کرده و آن‌ها را در **یک عدد خلاصه** فشرده می‌کنند.',
        'اما اگر بخواهیم این خلاصه را **به تفکیک دسته‌ها** داشته باشیم چه؟',
        'دستور `GROUP BY` الگوی سه مرحله‌ای معروف علم داده را اجرا می‌کند:',
        '1. **تقسیم (Split):** ردیف‌ها بر اساس ستون مورد نظر (مثلاً دسته کالا) در سطل‌های مجزا قرار می‌گیرند.',
        '2. **اعمال تابع (Apply):** روی هر سطل تابع تجمیعی اجرا می‌شود (مثلاً شمارش اقلام آن سطل).',
        '3. **ترکیب (Combine):** خروجی به شکل یک جدول فشرده با یک ردیف به ازای هر دسته ارائه می‌شود.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## قانون طلایی GROUP BY',
        '```sql',
        'SELECT category, COUNT(*)',
        'FROM products',
        'GROUP BY category;',
        '```',
        '> ⚠️ **مهم‌ترین خطای مفهومی در SQL:** هر ستونی که در بخش `SELECT` می‌آورید اما درون یک تابع تجمیعی (مانند `COUNT` یا `SUM`) نیست، **باید حتماً در عبارت `GROUP BY` ذکر شده باشد**! اگر نام ستونی را بنویسید که در گروه‌بندی نیست، پایگاه داده نمی‌داند از میان ردیف‌های درون آن گروه، کدام مقدار را انتخاب کند.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'کالاهای جدول `products` را بر اساس ستون دسته‌بندی (`category`) گروه‌بندی کنید و تعداد کالاهای هر دسته را با `COUNT(*)` محاسبه نمایید.',
      ],
    },
  ],
};

export const havingSum: Level = {
  id: 'groups-having',
  name: 'HAVING',
  hint: `SELECT customer_id, SUM(quantity)
FROM orders
GROUP BY customer_id
HAVING SUM(quantity) > 2;`,
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
      markdowns: [
        '## راز تفاوت WHERE و HAVING در چرخه عمر کوئری',
        'یکی از پرتکرارترین سؤالات در مصاحبه‌های فنی SQL تفاوت `WHERE` و `HAVING` است:',
        '- عبارت `WHERE` **ردیف‌های خام** را قبل از گروه‌بندی و قبل از هرگونه محاسبه تجمیعی فیلتر می‌کند.',
        '- عبارت `HAVING` **دسته‌های ساخته‌شده** را پس از محاسبه تابع تجمیعی فیلتر می‌کند.',
        '> ⚠️ **چرا نمی‌توان نوشت WHERE SUM(quantity) > 2؟**',
        '> زیرا موتور پایگاه داده ابتدا شرط‌های `WHERE` را اعمال می‌کند تا ردیف‌های لازم را بخواند. در آن لحظه هنوز هیچ گروهی تشکیل نشده و مقدار `SUM` هنوز اصلاً وجود خارجی ندارد!',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## ساختار فیلتر کردن گروه‌ها با HAVING',
        '```sql',
        'SELECT customer_id, SUM(quantity)',
        'FROM orders',
        'GROUP BY customer_id',
        'HAVING SUM(quantity) > 2;',
        '```',
        '- گروه‌بندی بر اساس شناسه مشتری: `GROUP BY customer_id`',
        '- محاسبه مجموع تعداد اقلام: `SUM(quantity)`',
        '- فیلتر کردن مشتریانی که مجموع اقلام سفارش داده آن‌ها بیش از ۲ است: `HAVING SUM(quantity) > 2`',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'شناسه مشتری (`customer_id`) و مجموع تعداد اقلام سفارش داده شده (`SUM(quantity)`) را برای مشتریانی بیابید که در کل بیش از ۲ کالا خریده‌اند.',
      ],
    },
  ],
};

export const groupsLevels: Level[] = [groupBy, havingSum];
