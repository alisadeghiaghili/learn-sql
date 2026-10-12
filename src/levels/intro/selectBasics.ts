/**
 * Intro sequence — SELECT fundamentals.
 *
 * Pedagogical design:
 * - Demystifying the relational model (tables, rows, attributes)
 * - The declarative paradigm (specifying "what", not procedural loops)
 * - Projection vs filtering
 * - Relational order fallacy & sorting with ORDER BY
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const selectAll: Level = {
  id: 'intro-select-all',
  name: 'Select Everything',
  hint: 'Use SELECT * FROM customers;',
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
      markdowns: [
        '## پایگاه داده چیست و زبان SQL چگونه فکر می‌کند؟',
        'به دنیای جذاب پایگاه داده رابطه‌ای خوش آمدید! در پایگاه داده، اطلاعات در قالب **جدول‌ها (Tables)** ذخیره می‌شوند. هر جدول دارای:',
        '- **ستون‌ها (Columns):** ویژگی‌های موجودیت (مانند نام، شهر، سال عضویت).',
        '- **ردیف‌ها (Rows):** نمونه‌های واقعی داده (مانند تک‌تک مشتریان).',
        'زبان SQL یک زبان **توصیفی (Declarative)** است؛ یعنی شما به پایگاه داده می‌گویید **«چه داده‌ای می‌خواهید»**، نه اینکه چطور حلقه بزند یا داده را جستجو کند!',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## دستور SELECT *',
        'ساده‌ترین و پایه‌ای‌ترین کوئری در SQL استخراج تمام اطلاعات یک جدول است:',
        '```sql',
        'SELECT * FROM customers;',
        '```',
        '- کلمه کلیدی `SELECT`: ستون‌هایی که می‌خواهید را مشخص می‌کند.',
        '- علامت ستاره `*`: یک کارت عام (Wildcard) است که می‌گوید «تمام ستون‌ها را برگردان».',
        '- کلمه `FROM customers`: نام جدولی است که منبع داده است.',
        '> 💡 **دیدگاه مهندسی:** در برنامه‌های واقعی تجاری، متخصصان از نوشتن `SELECT *` خودداری می‌کنند چون ستون‌های غیرضروری ترافیک شبکه را هدر می‌دهند و در صورت تغییر ستون‌ها کد را می‌شکنند. اما برای اکتشاف اولیه داده‌ها بی‌نظیر است.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'تمام ردیف‌ها و ستون‌های جدول مشتریان (`customers`) را استخراج کنید.',
        'پنل سمت چپ ساختار جدول‌های فروشگاه را نشان می‌دهد و پنل هدف (Goal) در سمت راست نتیجه مورد انتظار را نمایش می‌دهد.',
      ],
    },
  ],
};

export const selectColumns: Level = {
  id: 'intro-select-columns',
  name: 'Pick Columns',
  hint: 'SELECT name, city FROM customers;',
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
      markdowns: [
        '## تصویربرداری ستون‌ها (Projection)',
        'به ندرت پیش می‌آید که در گزارش‌های واقعی تمام ستون‌های یک جدول را بخواهید. به جای `*`، نام ستون‌های مد نظرتان را با ویرگول (`,`) جدا کنید:',
        '```sql',
        'SELECT name, city FROM customers;',
        '```',
        '- **ترتیب مهم است:** ترتیبی که در بخش `SELECT` می‌نویسید، دقیقاً ترتیب ستون‌های خروجی را تعیین می‌کند.',
        '- این عمل در جبر رابطه‌ای «پروجکشن» نامیده می‌شود و سرعت انتقال داده‌ها را به شدت افزایش می‌دهد.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'فقط دو ستون `name` و `city` را از جدول `customers` برگردانید.',
        'سایر ستون‌ها (مانند شناسه و سال عضویت) باید از خروجی حذف شوند.',
      ],
    },
  ],
};

export const whereBasic: Level = {
  id: 'intro-where',
  name: 'Filter Rows',
  hint: "SELECT name FROM customers WHERE city = 'London';",
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
      markdowns: [
        '## فیلتر کردن ردیف‌ها با شرط WHERE',
        'تا اینجا ستون‌ها را فیلتر کردیم. اما چگونه ردیف‌ها را فیلتر کنیم؟',
        'عبارت `WHERE` به موتور پایگاه داده می‌گوید قبل از نمایش نتایج، هر ردیف را با یک شرط منطقی بررسی کند و فقط ردیف‌های دارای شرایط معتبر را نگه دارد:',
        '```sql',
        "SELECT name FROM customers WHERE city = 'London';",
        '```',
        "> ⚠️ **دام مهم متنی:** در زبان استاندارد SQL مقادیر متنی (رشته‌ها) همیشه داخل کوتیشن تکی (`'London'`) قرار می‌گیرند. استفاده از گیومه جفتی برای نام ستون‌ها یا جداول است.",
        '> 💡 از علامت مساوی `=` برای برابری، `<>` یا `!=` برای نابرابری، و `<` و `>` برای مقایسه‌های عددی استفاده می‌شود.',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'نام مشتریانی را بیابید که شهر آن‌ها لندن (`city = \'London\'`) است.',
        'خروجی فقط باید شامل یک ستون (`name`) باشد.',
      ],
    },
  ],
};

export const orderLimit: Level = {
  id: 'intro-order-limit',
  name: 'Order and Limit',
  hint: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
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
      markdowns: [
        '## توهم ترتیب در SQL و ضرورت ORDER BY',
        'یکی از مهم‌ترین مفاهیم تئوری پایگاه‌های داده رابطه‌ای این است: **جدول‌ها مجموعه‌های بدون ترتیب (Unordered Sets) هستند!**',
        'هیچ تضمینی وجود ندارد که ردیف‌ها به ترتیب ورودشان خوانده شوند، مگر اینکه شما صریحاً با `ORDER BY` دستور مرتب‌سازی بدهید.',
        '- `ORDER BY column ASC`: صعودی (پیش‌فرض، از کم به زیاد)',
        '- `ORDER BY column DESC`: نزولی (از زیاد به کم)',
        '### برش ردیف‌ها با LIMIT:',
        'دستور `LIMIT n` تنها `n` ردیف اول خروجی نهایی را نگه می‌دارد (برای سناریوهایی مثل ۱۰ کالای برتر یا صفحه‌بندی وب‌سایت).',
      ],
    },
    {
      type: 'modal',
      markdowns: [
        '## مأموریت این مرحله',
        'دو محصول گران‌قیمت فروشگاه را پیدا کنید:',
        '1. انتخاب نام و قیمت: `SELECT name, price FROM products`',
        '2. مرتب‌سازی از بیشترین قیمت به کمترین قیمت: `ORDER BY price DESC`',
        '3. محدود کردن خروجی به ۲ محصول برتر: `LIMIT 2`',
      ],
    },
  ],
};

export const introLevels: Level[] = [
  selectAll,
  selectColumns,
  whereBasic,
  orderLimit,
];
