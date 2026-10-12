/**
 * Functions & CASE sequence — scalar functions, string/math/date helpers,
 * conditional logic, and NULL-forgiving wrappers.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */
import { shopSchema, shopSeed } from './shopSchema';
import { peopleSchema, peopleSeed } from './customSchemas';
import type { Level } from './types';

export const stringFns: Level = {
  id: 'fn-string',
  name: {
    fa: 'توابع رشته‌ای',
    en: 'String Functions',
    de: 'Zeichenfolgenfunktionen',
  },
  hint: {
    fa: "SELECT name, UPPER(name) AS upper_name, LENGTH(name) AS len FROM products WHERE name = 'Keyboard';",
    en: "SELECT name, UPPER(name) AS upper_name, LENGTH(name) AS len FROM products WHERE name = 'Keyboard';",
    de: "SELECT name, UPPER(name) AS upper_name, LENGTH(name) AS len FROM products WHERE name = 'Keyboard';",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name, UPPER(name) AS upper_name, LENGTH(name) AS len FROM products WHERE name = 'Keyboard';",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'upper_name', 'len'],
    rows: [['Keyboard', 'KEYBOARD', 8]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## توابع تبدیل رشته در SQL',
          'توابع اسکالر مقادیر ورودی را تغییر شکل می‌دهند:',
          '- `UPPER(s)`: تبدیل تمام حروف به حروف بزرگ انگلیسی.',
          '- `LOWER(s)`: تبدیل تمام حروف به حروف کوچک انگلیسی.',
          '- `LENGTH(s)`: شمارش تعداد کاراکترها.',
          '- `SUBSTR(s, start, len)`: برش و جداسازی بخشی از رشته.',
        ],
        en: [
          '## Scalar String Functions',
          'String functions transform text columns row by row:',
          '- `UPPER(s)`: Converts text to uppercase.',
          '- `LOWER(s)`: Converts text to lowercase.',
          '- `LENGTH(s)`: Counts character length.',
          '- `SUBSTR(s, start, len)`: Extracts a substring.',
        ],
        de: [
          '## Skalare Textfunktionen',
          'Zeichenfolgenfunktionen transformieren Textwerte zeilenweise:',
          '- `UPPER(s)`: Konvertiert in Großbuchstaben.',
          '- `LOWER(s)`: Konvertiert in Kleinbuchstaben.',
          '- `LENGTH(s)`: Ermittelt die Zeichenlänge.',
          '- `SUBSTR(s, start, len)`: Schneidet einen Teilstring aus.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'برای محصول کیبورد (`name = \'Keyboard\'`)، ستون‌های `name`، حروف بزرگ آن به نام `upper_name` و طول کاراکترهای آن به نام `len` را برگردانید.',
        ],
        en: [
          '## Challenge Objective',
          'For the Keyboard product, return `name`, its uppercase form as `upper_name`, and its length as `len`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie für die Tastatur (`Keyboard`) den Namen, den Namen in Großbuchstaben als `upper_name` und die Länge als `len` aus.',
        ],
      },
    },
  ],
};

export const concat: Level = {
  id: 'fn-concat',
  name: {
    fa: 'اتصال رشته‌ها (Concatenation)',
    en: 'String Concatenation',
    de: 'Zeichenfolgen-Verkettung',
  },
  hint: {
    fa: "SELECT name, 'costs ' || price || ' dollars' AS price_text FROM products WHERE id = 1;",
    en: "SELECT name, 'costs ' || price || ' dollars' AS price_text FROM products WHERE id = 1;",
    de: "SELECT name, 'costs ' || price || ' dollars' AS price_text FROM products WHERE id = 1;",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name, 'costs ' || price || ' dollars' AS price_text FROM products WHERE id = 1;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'price_text'],
    rows: [['Keyboard', 'costs 89.5 dollars']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## الحاق متن‌ها با عملگر ||',
          'در استاندارد SQL و به‌ویژه SQLite، عملگر الحاق دو خط عمودی `||` است.',
          '```sql',
          "'costs ' || price || ' dollars'",
          '```',
          'مقادیر عددی یا تاریخ‌ها به صورت خودکار به متن تبدیل شده و در میان جملات قرار می‌گیرند.',
        ],
        en: [
          '## String Concatenation Operator (||)',
          'In SQL standards and SQLite, the concatenation operator is `||`.',
          '```sql',
          "'costs ' || price || ' dollars'",
          '```',
          'Numeric and date types are automatically coerced into strings during concatenation.',
        ],
        de: [
          '## Zeichenfolgen verbinden mit dem || Operator',
          'In Standard-SQL und SQLite werden Zeichenfolgen mit dem Operator `||` verknüpft.',
          '```sql',
          "'costs ' || price || ' dollars'",
          '```',
          'Zahlen werden automatisch in Text konvertiert und nahtlos eingebettet.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'برای محصول با شناسه ۱، نام و متنی مثل "costs 89.5 dollars" را با نام مستعار `price_text` استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'For product id 1, return `name` and format price into "costs 89.5 dollars" under alias `price_text`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie für Produkt 1 den Namen und den formatierten Preistext "costs 89.5 dollars" als `price_text` aus.',
        ],
      },
    },
  ],
};

export const mathFns: Level = {
  id: 'fn-math',
  name: {
    fa: 'توابع ریاضی',
    en: 'Math Functions',
    de: 'Mathematische Funktionen',
  },
  hint: {
    fa: 'SELECT price, ROUND(price * 1.1) AS with_tax, ABS(price - 249) AS diff FROM products WHERE id = 2;',
    en: 'SELECT price, ROUND(price * 1.1) AS with_tax, ABS(price - 249) AS diff FROM products WHERE id = 2;',
    de: 'SELECT price, ROUND(price * 1.1) AS with_tax, ABS(price - 249) AS diff FROM products WHERE id = 2;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT price, ROUND(price * 1.1) AS with_tax, ABS(price - 249) AS diff FROM products WHERE id = 2;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['price', 'with_tax', 'diff'],
    rows: [[24, 26, 225]],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## محاسبات ریاضی در کوئری‌ها',
          'می‌توانید به طور مستقیم عملگرهای ریاضی `+`, `-`, `*`, `/` را روی ستون‌ها اعمال کنید و از توابع استاندارد کمک بگیرید:',
          '- `ROUND(val)`: گرد کردن به نزدیک‌ترین عدد صحیح.',
          '- `ABS(val)`: قدر مطلق عدد (فاصله بدون علامت منفی).',
        ],
        en: [
          '## Mathematical Expressions and Built-ins',
          'You can apply standard arithmetic (`+`, `-`, `*`, `/`) directly to numeric columns:',
          '- `ROUND(val)`: Rounds to nearest integer.',
          '- `ABS(val)`: Absolute value magnitude.',
        ],
        de: [
          '## Mathematische Ausdrücke und Funktionen',
          'Arithmetische Operatoren (`+`, `-`, `*`, `/`) können direkt auf Spalten angewendet werden:',
          '- `ROUND(val)`: Rundet auf die nächste Ganzzahl.',
          '- `ABS(val)`: Liefert den Betrag (Absolutwert).',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'برای محصول شماره ۲ (ماوس): قیمت، قیمت با ۱۰٪ مالیات گردشده به نام `with_tax` و اختلاف قیمت آن با ۲۴۹ به نام `diff` را استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'For product 2 (Mouse): output `price`, price with 10% tax rounded as `with_tax`, and absolute distance from 249 as `diff`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie für Produkt 2 (Maus) den Preis, den gerundeten Preis inkl. 10% Steuer als `with_tax` und die Differenz zu 249 als `diff` aus.',
        ],
      },
    },
  ],
};

export const dateFns: Level = {
  id: 'fn-date',
  name: {
    fa: 'توابع تاریخ و زمان',
    en: 'Date & Time Functions',
    de: 'Datums- und Zeitfunktionen',
  },
  hint: {
    fa: "SELECT order_date, strftime('%Y-%m', order_date) AS month, date(order_date, '+1 day') AS next_day FROM orders WHERE id = 1;",
    en: "SELECT order_date, strftime('%Y-%m', order_date) AS month, date(order_date, '+1 day') AS next_day FROM orders WHERE id = 1;",
    de: "SELECT order_date, strftime('%Y-%m', order_date) AS month, date(order_date, '+1 day') AS next_day FROM orders WHERE id = 1;",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT order_date, strftime('%Y-%m', order_date) AS month, date(order_date, '+1 day') AS next_day FROM orders WHERE id = 1;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['order_date', 'month', 'next_day'],
    rows: [['2024-01-12', '2024-01', '2024-01-13']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## کار با تاریخ در SQL',
          'تاریخ‌ها در قالب استاندارد ایزو (`YYYY-MM-DD`) ذخیره می‌شوند:',
          "- `strftime('%Y-%m', d)`: استخراج بخش سال و ماه.",
          "- `date(d, '+1 day')`: اضافه کردن یا کم کردن روزها و بازه‌ها به تاریخ.",
        ],
        en: [
          '## Working with Dates in SQL',
          'Dates are typically stored in ISO 8601 strings (`YYYY-MM-DD`):',
          "- `strftime('%Y-%m', d)`: Extracts year and month components.",
          "- `date(d, '+1 day')`: Shifts dates forward or backward by intervals.",
        ],
        de: [
          '## Arbeiten mit Datumsangaben',
          'Datumsangaben werden standardmäßig im ISO-Format (`YYYY-MM-DD`) abgelegt:',
          "- `strftime('%Y-%m', d)`: Extrahiert Jahr und Monat.",
          "- `date(d, '+1 day')`: Verschiebt ein Datum um ein Intervall.",
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'برای سفارش شماره ۱: تاریخ سفارش (`order_date`)، سال و ماه آن به نام `month` و یک روز پس از آن به نام `next_day` را نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'For order id 1: display its `order_date`, extracted year-month as `month`, and the following day as `next_day`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie für Bestellung 1 das Bestelldatum, Jahr-Monat als `month` und den Folgetag als `next_day` aus.',
        ],
      },
    },
  ],
};

export const caseWhen: Level = {
  id: 'fn-case',
  name: {
    fa: 'شرط‌های چندگانه (CASE WHEN)',
    en: 'Conditional Logic (CASE / WHEN)',
    de: 'Bedingte Logik (CASE / WHEN)',
  },
  hint: {
    fa: "SELECT name, CASE WHEN price >= 200 THEN 'expensive' WHEN price >= 50 THEN 'mid' ELSE 'cheap' END AS tier FROM products ORDER BY id;",
    en: "SELECT name, CASE WHEN price >= 200 THEN 'expensive' WHEN price >= 50 THEN 'mid' ELSE 'cheap' END AS tier FROM products ORDER BY id;",
    de: "SELECT name, CASE WHEN price >= 200 THEN 'expensive' WHEN price >= 50 THEN 'mid' ELSE 'cheap' END AS tier FROM products ORDER BY id;",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name, CASE WHEN price >= 200 THEN 'expensive' WHEN price >= 50 THEN 'mid' ELSE 'cheap' END AS tier FROM products ORDER BY id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'tier'],
    rows: [
      ['Keyboard', 'mid'],
      ['Mouse', 'cheap'],
      ['SQL Handbook', 'cheap'],
      ['Monitor', 'expensive'],
      ['Query Tuning', 'cheap'],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## عبارات شرطی با ساختار CASE',
          'عبارت `CASE` نقش دستور if/else را در ستون‌های SQL بازی می‌کند و مقادیر خام را دسته‌بندی می‌نماید.',
          '```sql',
          'CASE',
          "  WHEN price >= 200 THEN 'expensive'",
          "  WHEN price >= 50  THEN 'mid'",
          "  ELSE 'cheap'",
          'END AS tier',
          '```',
          'همیشه فراموش نکنید که عبارت شرطی را با کلمه کلیدی `END` خاتمه دهید.',
        ],
        en: [
          '## Conditional Expressions with CASE',
          'The `CASE` statement brings if/else logic directly into SQL projections:',
          '```sql',
          'CASE',
          "  WHEN price >= 200 THEN 'expensive'",
          "  WHEN price >= 50  THEN 'mid'",
          "  ELSE 'cheap'",
          'END AS tier',
          '```',
          'Every conditional block must conclude with the `END` keyword.',
        ],
        de: [
          '## Bedingte Logik mit CASE',
          'Die `CASE`-Anweisung implementiert if/else-Logik direkt in Abfragen:',
          '```sql',
          'CASE',
          "  WHEN price >= 200 THEN 'expensive'",
          "  WHEN price >= 50  THEN 'mid'",
          "  ELSE 'cheap'",
          'END AS tier',
          '```',
          'Jeder bedingte Block muss zwingend mit dem Schlüsselwort `END` abgeschlossen werden.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'تمامی کالاها را بر اساس قیمت دسته‌بندی کنید: اگر قیمت ۲۰۰ به بالا بود `expensive`، اگر ۵۰ به بالا بود `mid` و در غیر این صورت `cheap` در ستونی به نام `tier` قرار گیرد. به ترتیب `id` مرتب کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Categorize all products by price: >=200 is `expensive`, >=50 is `mid`, otherwise `cheap` as `tier`, ordered by `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Klassifizieren Sie alle Produkte: >=200 ist `expensive`, >=50 ist `mid`, sonst `cheap` als `tier`, sortiert nach `id`.',
        ],
      },
    },
  ],
};

export const nullFns: Level = {
  id: 'fn-nullfns',
  name: {
    fa: 'مدیریت مقادیر تهی (COALESCE)',
    en: 'NULL Handling (COALESCE)',
    de: 'NULL-Werte behandeln (COALESCE)',
  },
  hint: {
    fa: "SELECT name, COALESCE(city, 'unknown') AS city, COALESCE(age, 0) AS age FROM people;",
    en: "SELECT name, COALESCE(city, 'unknown') AS city, COALESCE(age, 0) AS age FROM people;",
    de: "SELECT name, COALESCE(city, 'unknown') AS city, COALESCE(age, 0) AS age FROM people;",
  },
  schema: peopleSchema,
  seed: peopleSeed,
  solution:
    "SELECT name, COALESCE(city, 'unknown') AS city, COALESCE(age, 0) AS age FROM people;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'city', 'age'],
    rows: [
      ['Ann', 'London', 30],
      ['Bob', 'unknown', 25],
      ['Cid', 'Paris', 0],
      ['Dot', 'unknown', 0],
      ['Eve', 'Berlin', 41],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## جایگزینی مقادیر ناشناخته با COALESCE',
          'مقدار `NULL` در پایگاه‌داده به معنی «داده ناشناخته یا تعریف‌نشده» است و هر عمل ریاضی با آن خروجی `NULL` تولید می‌کند.',
          'تابع `COALESCE(val1, val2, ...)` اولین مقدار غیر تهی (Non-NULL) در لیست ورودی را بازمی‌گرداند.',
          '```sql',
          "COALESCE(city, 'unknown')",
          'COALESCE(age, 0)',
          '```',
        ],
        en: [
          '## Fallback Defaults with COALESCE',
          '`NULL` represents unknown or missing data. Standard operations propagate NULLs.',
          '`COALESCE(val1, val2, ...)` returns the very first non-NULL value in its argument list.',
          '```sql',
          "COALESCE(city, 'unknown')",
          'COALESCE(age, 0)',
          '```',
        ],
        de: [
          '## Ersatzwerte mit COALESCE',
          '`NULL` kennzeichnet fehlende oder unbekannte Daten. Standardoperationen mit NULL liefern stets NULL.',
          '`COALESCE(val1, val2, ...)` gibt den ersten Wert zurück, der nicht NULL ist.',
          '```sql',
          "COALESCE(city, 'unknown')",
          'COALESCE(age, 0)',
          '```',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'لیست تمام افراد را استخراج کنید. اگر ستون `city` خالی بود عبارت "unknown" و اگر `age` خالی بود عدد 0 را نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Return each person with `city` replaced by "unknown" if NULL, and `age` replaced by 0 if NULL.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie alle Personen aus. Ersetzen Sie ein leeres `city` durch "unknown" und ein leeres `age` durch 0.',
        ],
      },
    },
  ],
};

export const castType: Level = {
  id: 'fn-cast',
  name: {
    fa: 'تبدیل نوع داده (CAST)',
    en: 'Type Casting (CAST)',
    de: 'Typumwandlung (CAST)',
  },
  hint: {
    fa: 'SELECT name, CAST(price AS INTEGER) AS int_price, typeof(price) AS t FROM products WHERE id = 1;',
    en: 'SELECT name, CAST(price AS INTEGER) AS int_price, typeof(price) AS t FROM products WHERE id = 1;',
    de: 'SELECT name, CAST(price AS INTEGER) AS int_price, typeof(price) AS t FROM products WHERE id = 1;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name, CAST(price AS INTEGER) AS int_price, typeof(price) AS t FROM products WHERE id = 1;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'int_price', 't'],
    rows: [['Keyboard', 89, 'real']],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## تبدیل صریح انواع داده با CAST',
          'برای تبدیل یک نوع داده به نوع دیگر (مثلاً تبدیل عدد اعشاری به عدد صحیح)، از تابع `CAST(val AS type)` استفاده می‌شود.',
          '- تابع `typeof(val)` نوع ذخیره‌سازی داده را در SQLite نشان می‌دهد (مانند integer, real, text).',
          '- تبدیل عدد اعشاری با `CAST(... AS INTEGER)` قسمت اعشار آن را حذف (Truncate) می‌کند.',
        ],
        en: [
          '## Explicit Type Conversion with CAST',
          'To explicitly convert values between data types, use the ANSI-standard `CAST(val AS type)` expression.',
          '- `typeof(val)` reports the internal storage class (e.g. integer, real, text).',
          '- Casting a floating-point number to `INTEGER` truncates fractional values.',
        ],
        de: [
          '## Explizite Typumwandlung mit CAST',
          'Zur Typkonvertierung dient der ANSI-Standardausdruck `CAST(val AS typ)`.',
          '- `typeof(val)` gibt die interne Speicherklasse an (z. B. integer, real, text).',
          '- Die Umwandlung von Fließkommazahlen in `INTEGER` schneidet Nachkommastellen ab.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'برای محصول با شناسه ۱ (کیبورد): نام، قیمت تبدیل‌شده به عدد صحیح به نام `int_price` و نوع اولیه قیمت به نام `t` را استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'For product id 1: return `name`, its price converted to `INTEGER` as `int_price`, and its storage type as `t`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie für Produkt 1 den Namen, den in `INTEGER` umgewandelten Preis als `int_price` und den Speichertyp als `t` aus.',
        ],
      },
    },
  ],
};

export const functionLevels: Level[] = [
  stringFns,
  concat,
  mathFns,
  dateFns,
  caseWhen,
  nullFns,
  castType,
];
