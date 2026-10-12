/**
 * Advanced joins — CROSS, SELF, RIGHT, and FULL OUTER JOIN.
 *
 * Pedagogical design:
 * - Mental models with RStudio-style cheat sheet schematics
 * - Combinatorics & performance pitfalls (Cartesian explosion)
 * - Dialect differences & SQLite workarounds (industry practice)
 */
import { shopSchema, shopSeed } from './shopSchema';
import { employeesSchema, employeesSeed } from './customSchemas';
import type { Level } from './types';

export const crossJoin: Level = {
  id: 'aj-cross',
  name: 'CROSS JOIN',
  hint: 'SELECT COUNT(*) AS pairs FROM customers c CROSS JOIN products p;',
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
      markdowns: [
        '## مفهوم ضرب دکارتی (Cartesian Product)',
        'در تمام اتصال‌هایی که تاکنون دیدیم، یک شرط انطباق با `ON` وجود داشت. اما اگر هیچ شرطی نگذاریم چه می‌شود؟',
        'دستور `CROSS JOIN` **تک‌تک ردیف‌های جدول اول را با تک‌تک ردیف‌های جدول دوم جفت می‌کند**.',
        '- اگر جدول A دارای ۵ ردیف و جدول B دارای ۵ ردیف باشد، خروجی دقیقاً ۲۵ ردیف خواهد بود (۵ × ۵ = ۲۵).',
        '- کاربرد واقعی: تولید تمام حالت‌های ممکن (مثلاً تمام سایزها × تمام رنگ‌های یک پیراهن، یا تمام کاربران × تمام پلن‌های اشتراک برای تست).',
        '> ⚠️ **هشدار مرگبار عملکرد (Performance Trap):** اگر به اشتباه در یک کوئری بزرگ عبارت `ON` را فراموش کنید، ممکن است ناخواسته میلیاردها ردیف تولید کنید و سرور پایگاه داده از کار بیفتد!',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'می‌خواهیم ببینیم اگر هر مشتری را با تک‌تک کالاهای فروشگاه جفت کنیم، چند جفت حاصل می‌شود:',
        '```sql',
        'SELECT COUNT(*) AS pairs',
        'FROM customers c',
        'CROSS JOIN products p;',
        '```',
        '- با استفاده از `COUNT(*)` و نام مستعار `pairs`، تعداد کل جفت‌های حاصل از ضرب دکارتی را بشمارید.',
      ],
    },
  ],
};

export const selfJoin: Level = {
  id: 'aj-self',
  name: 'SELF JOIN',
  hint: 'SELECT e.name AS employee, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id ORDER BY e.id;',
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
      markdowns: [
        '## مفهوم SELF JOIN: اتصال یک جدول به خودش!',
        'گاهی رابطه‌های داده‌ای درون خود یک جدول قرار دارند؛ مشهورترین مثال آن **چارت سازمانی (سلسله‌مراتب کارمندان و مدیران)** است.',
        'در جدول `employees`، ستونی به نام `manager_id` وجود دارد که به ستون `id` در *همین جدول* ارجاع می‌دهد (مدیر خودش یک کارمند است!).',
        'چگونه نام کارمند و نام مدیرش را کنار هم بیاوریم؟',
        '- باید جدول `employees` را با خودش متصل کنیم!',
        '- موتور SQL برای تمایز قائل شدن بین دو نقش جدول، نیازمند **نام مستعار (Alias)** است: یکی در نقش کارمند (`e`) و دیگری در نقش مدیر (`m`).',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## ساختار دستور SELF JOIN',
        '```sql',
        'SELECT e.name AS employee, m.name AS manager',
        'FROM employees e',
        'JOIN employees m ON e.manager_id = m.id;',
        '```',
        '- `employees e`: نسخه اول جدول که کارمندان را نشان می‌دهد.',
        '- `employees m`: نسخه دوم جدول که نقش مدیر را ایفا می‌کند.',
        '- شرط اتصال: کلید خارجی مدیر در ردیف کارمند (`e.manager_id`) باید با شناسه در ردیف مدیر (`m.id`) برابر باشد.',
        '> 💡 توجه: از آنجا که CEO مدیری ندارد (`manager_id` او NULL است)، در یک `INNER JOIN` در خروجی نمی‌آید.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'نام هر کارمند را به عنوان `employee` و نام مدیر او را به عنوان `manager` استخراج کنید.',
        '- اتصال خودکار با نام‌های مستعار `e` و `m` بر اساس `e.manager_id = m.id`',
        '- مرتب‌سازی بر اساس شناسه کارمند: `ORDER BY e.id`',
      ],
    },
  ],
};

export const rightJoin: Level = {
  id: 'aj-right',
  name: 'RIGHT JOIN (via LEFT)',
  hint: 'SELECT customers.id AS customer_id, orders.id AS order_id FROM customers LEFT JOIN orders ON orders.customer_id = customers.id ORDER BY customers.id;',
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
      markdowns: [
        '## مفهوم RIGHT JOIN و رازهای پایگاه داده در دنیای واقعی',
        '`RIGHT JOIN` قرینه و آینه تمام‌نمای `LEFT JOIN` است: تمام ردیف‌های جدول سمت راست حفظ می‌شوند و اگر جدول چپ انطباقی نداشت، ستون‌هایش `NULL` می‌گیرند.',
        'اما یک نکته بسیار مهم مهندسی وجود دارد:',
        '> ⚠️ **موتور SQLite دستور RIGHT JOIN را به صورت محلی ندارد!** بسیاری از پایگاه‌های داده سبک و ابزارهای تحلیلی دستور RIGHT JOIN را پشتیبانی نمی‌کنند.',
        '### راه‌حل استاندارد چیست؟',
        'هر کوئری `A RIGHT JOIN B` از نظر ریاضی و منطقی معادل است با `B LEFT JOIN A`!',
        'تنها کافی است جای دو جدول را عوض کنید و از `LEFT JOIN` استفاده نمایید.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'هدف این است که نشان دهید چگونه می‌توان اتصال را به گونه‌ای نوشت که تمام مشتریان حفظ شوند (با استفاده از `LEFT JOIN`):',
        '```sql',
        'SELECT customers.id AS customer_id, orders.id AS order_id',
        'FROM customers',
        'LEFT JOIN orders ON orders.customer_id = customers.id',
        'ORDER BY customers.id;',
        '```',
        'این کوئری تمام مشتریان را با سفارش‌هایشان فهرست می‌کند و خروجی را مرتب می‌نماید.',
      ],
    },
  ],
};

export const fullJoin: Level = {
  id: 'aj-full',
  name: 'FULL OUTER JOIN (via UNION)',
  hint: 'LEFT JOIN ... UNION ... LEFT JOIN (with tables swapped).',
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
      markdowns: [
        '## مفهوم FULL OUTER JOIN (جامع‌ترین اتصال)',
        'گاهی در تطبیق داده‌ها (مانند مغایرت‌گیری مالی بین صورت‌حساب بانکی و سیستم حسابداری) نمی‌خواهید حتی یک ردیف از هیچ‌کدام از دو جدول گم شود!',
        '- در `FULL OUTER JOIN` تمام ردیف‌های جدول چپ **و** تمام ردیف‌های جدول راست حفظ می‌شوند.',
        '- هر کجا جفتی وجود نداشته باشد، ستون طرف مقابل با `NULL` پر می‌شود.',
        '> 💡 در پایگاه‌هایی که FULL JOIN ندارند (مانند SQLite)، توسعه‌دهندگان آن را با اجتماع دو اتصال چپ می‌سازند:',
        '> `(A LEFT JOIN B) UNION (B LEFT JOIN A)`',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## چالش این مرحله',
        'در جدول `employees`، مدیرعامل (`CEO`) هیچ مدیری ندارد، بنابراین در یک اتصال معمولی حذف می‌شود.',
        'با اتصال کامل، می‌خواهیم مطمئن شویم همه کارکنان (حتی مدیرعامل با مدیر `NULL`) در خروجی ظاهر می‌شوند:',
        '```sql',
        'SELECT e.id AS id, e.name, m.name AS manager',
        'FROM employees e',
        'LEFT JOIN employees m ON e.manager_id = m.id;',
        '```',
        'ستون‌های `id`، `name`، و `manager` را استخراج کنید.',
      ],
    },
  ],
};

export const advancedJoinLevels: Level[] = [crossJoin, selfJoin, rightJoin, fullJoin];
