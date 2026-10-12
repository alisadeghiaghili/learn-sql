/**
 * Joins sequence — combining tables.
 *
 * Designed with critical pedagogy principles:
 * - Mental model & intuition before syntax
 * - RStudio-style cheat sheet visual diagrams
 * - Common beginner pitfalls & traps
 * - Clear step-by-step problem-solving strategy
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const innerJoin: Level = {
  id: 'joins-inner',
  name: 'INNER JOIN',
  hint: `SELECT customers.name, products.name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;`,
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
      markdowns: [
        '## مفهوم بنیادین: چرا به JOIN نیاز داریم؟',
        'در پایگاه‌های داده رابطه‌ای، داده‌ها عمداً در جدول‌های جداگانه نگهداری می‌شوند تا از تکرار بیهوده (Redundancy) و خطاهای به‌روزرسانی جلوگیری شود (نرمال‌سازی).',
        'به عنوان مثال: جدول `orders` نام مشتری را در خود نگه نمی‌دارد؛ بلکه فقط یک شناسه به نام **کلید خارجی** (`customer_id`) ذخیره می‌کند.',
        'دستور `JOIN` مانند نخ و سوزن عمل می‌کند: ردیف‌های دو جدول را بر اساس یک شرط مشترک (`ON`) به یکدیگر می‌دوزد.',
        '> 💡 **نکته کلیدی:** عبارت `JOIN` به تنهایی همان `INNER JOIN` است. در اتصال درونی، **تنها ردیف‌هایی در خروجی ظاهر می‌شوند که کلید آن‌ها در هر دو جدول وجود داشته باشد**.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## ساختار دستور و نحوه اتصال چند جدول',
        'سینتکس پایه برای اتصال دو جدول به این صورت است:',
        '```sql',
        'SELECT orders.id, customers.name',
        'FROM orders',
        'JOIN customers ON orders.customer_id = customers.id;',
        '```',
        '### اتصال هم‌زمان ۳ جدول:',
        'می‌توانید چند دستور `JOIN` را پشت سر هم بنویسید تا زنجیره‌ای از جدول‌ها به هم متصل شوند:',
        '```sql',
        'FROM orders',
        'JOIN customers ON orders.customer_id = customers.id',
        'JOIN products ON orders.product_id = products.id',
        '```',
        '> ⚠️ **خطای بسیار رایج مبتدیان (ستون‌های مبهم):** اگر هر دو جدول ستونی با نام یکسان داشته باشند (مانند `name` در `customers` و `name` در `products`)، نوشتن `SELECT name` خطا ایجاد می‌کند! حتماً نام جدول را قبل از نام ستون بنویسید: `customers.name` و `products.name`.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'از جدول سفارش‌ها (`orders`) شروع کنید و آن را به دو جدول دیگر وصل کنید:',
        '1. جدول `customers` بر اساس شناسه مشتری (`orders.customer_id = customers.id`)',
        '2. جدول `products` بر اساس شناسه محصول (`orders.product_id = products.id`)',
        '- در بخش `SELECT`، دو ستون خروجی انتخاب کنید: نام خریدار (`customers.name`) و نام کالای خریداری شده (`products.name`).',
        'نتیجه دقیقاً مشخص می‌کند کدام مشتری چه کالایی را خریده است.',
      ],
    },
  ],
};

export const leftJoin: Level = {
  id: 'joins-left',
  name: 'LEFT JOIN',
  hint: `SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
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
      markdowns: [
        '## مفهوم بنیادین LEFT JOIN (اتصال بیرونی چپ)',
        'در مرحله قبل دیدیم که `INNER JOIN` بی‌رحم است: اگر ردیفی در جدول مقابل جفتی نداشته باشد، کلاً از خروجی حذف می‌شود!',
        'اما فرض کنید می‌خواهیم **گزارش لیست همه مشتریان** را تهیه کنیم، حتی کسانی که هنوز هیچ سفارشی ثبت نکرده‌اند.',
        'اینجاست که `LEFT JOIN` نجات‌بخش است:',
        '- جدول سمت چپ (جدولی که بعد از `FROM` می‌آید) جدول مبنا است.',
        '- **تمامی ردیف‌های جدول چپ حفظ می‌شوند**، حتی اگر در جدول راست هیچ تطابقی وجود نداشته باشد.',
        '- برای ردیف‌های بدون سفارش، ستون‌های جدول راست با مقدار `NULL` پر می‌شوند.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## دام بزرگ مبتدیان در LEFT JOIN',
        'ترتیب نوشتن جدول‌ها در `LEFT JOIN` تفاوت زمین تا آسمان ایجاد می‌کند:',
        '- `FROM customers LEFT JOIN orders ...` یعنی تمام مشتریان حفظ شوند.',
        '- `FROM orders LEFT JOIN customers ...` یعنی تمام سفارش‌ها حفظ شوند.',
        '> ⚠️ **تله کلاسیک فیلتر در WHERE:** اگر در یک `LEFT JOIN` شرطی بنویسید که مقدار جدول سمت راست را در `WHERE` بررسی کند (مثلاً `WHERE orders.id > 0`)، ردیف‌هایی که `NULL` هستند فیلتر می‌شوند و عملاً اتصال شما به یک `INNER JOIN` تنزل پیدا می‌کند!',
        '> 💡 شرط‌های مربوط به انطباق جدول راست را همیشه داخل عبارت `ON` قرار دهید، نه در `WHERE`.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'لیستی از **همه مشتریان** به همراه شناسه سفارش‌های آن‌ها (`orders.id`) ایجاد کنید:',
        '- شروع از جدول مشتریان: `FROM customers`',
        '- اتصال بیرونی چپ به سفارش‌ها: `LEFT JOIN orders ON orders.customer_id = customers.id`',
        '- انتخاب ستون‌ها: `SELECT customers.name, orders.id`',
        'حتی اگر مشتری سفارشی نداشته باشد، نام او با سفارش `NULL` نمایش داده خواهد شد.',
      ],
    },
  ],
};

export const joinsLevels: Level[] = [innerJoin, leftJoin];
