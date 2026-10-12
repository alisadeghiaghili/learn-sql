/**
 * Intro sequence — SELECT fundamentals.
 * Refined with ELI pedagogical scaffolding, visual mental models,
 * common pitfalls, and fluent trilingual support (fa, en, de).
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const selectAll: Level = {
  id: 'intro-select-all',
  name: {
    fa: 'استخراج کامل اطلاعات (SELECT *)',
    en: 'Retrieve Everything (SELECT *)',
    de: 'Alles abfragen (SELECT *)',
  },
  hint: {
    fa: 'SELECT * FROM customers;',
    en: 'SELECT * FROM customers;',
    de: 'SELECT * FROM customers;',
  },
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
      markdowns: {
        fa: [
          '## سطح ۱: توضیح ساده (Explain Like I\'m 5) 🧒',
          'تصور کنید پایگاه‌داده مثل یک **کتابخانه بزرگ** با قفسه‌های برچسب‌خورده است. هر قفسه یک **جدول (Table)** نام دارد (مثلاً قفسه مشتریان به نام `customers`).',
          'در هر قفسه، پرونده‌های افراد در ردیف‌ها چیده شده و هر پرونده شامل برگه‌های مشخصی مثل نام، شهر و سال عضویت است.',
          '### زبان SQL چگونه کار می‌کند؟',
          'برخلاف زبان‌های برنامه‌نویسی معمولی مثل پایتون یا جاوااسکریپت که باید مرحله‌به‌مرحله به کامپیوتر بگویید «چگونه» بگردد، SQL یک زبان **توصیفی (Declarative)** است:',
          '> شما فقط به کتابدار می‌گویید **«چه می‌خواهید»**، و موتور پایگاه‌داده خودش سریع‌ترین راه را پیدا می‌کند!',
        ],
        en: [
          '## Level 1: Intuition & The Mental Model 🧒',
          'Think of a database as an **organized filing library**. Each distinct section is a **Table** (such as our customer registry `customers`).',
          'Inside each table, rows represent individual records, and columns represent specific attributes (id, name, city, year).',
          '### The Declarative Nature of SQL',
          'Unlike imperative programming languages (Python, C++, JS) where you write loops telling the machine *how* to iterate, SQL is **declarative**:',
          '> You simply declare **what result you want**, and the database engine\'s query optimizer calculates the fastest access path.',
        ],
        de: [
          '## Stufe 1: Intuition & Mentales Modell 🧒',
          'Stellen Sie sich eine Datenbank wie eine **gut sortierte Bibliothek** vor. Jeder Bereich ist eine **Tabelle** (z. B. unsere Kundentabelle `customers`).',
          'Zeilen stellen einzelne Personen/Einträge dar, Spalten die Eigenschaften (ID, Name, Stadt, Jahr).',
          '### Die deklarative Natur von SQL',
          'Im Gegensatz zu prozeduralen Sprachen, in denen Sie Schleifen programmieren, ist SQL **deklarativ**:',
          '> Sie beschreiben lediglich, **was** Sie haben möchten, und das Datenbank-System wählt selbstständig die schnellste Methode.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## سطح ۲: کالبدشکافی دستور و دام‌های عملکردی ⚙️',
          '```sql',
          'SELECT * FROM customers;',
          '```',
          '- کلمه کلیدی `SELECT`: مشخص می‌کند چه ستون‌هایی باید برگردانده شوند.',
          '- علامت ستاره `*`: به معنای «تمام ستون‌های جدول بدون استثنا».',
          '- کلمه کلیدی `FROM customers`: جدولی را که داده‌ها باید از آن استخراج شوند مشخص می‌کند.',
          '- سمی‌کالن `;`: پایان رسمی هر عبارت SQL.',
          '> ⚠️ **دام عملکردی در دنیای واقعی:** علامت `*` برای محیط‌های یادگیری عالی است، اما در سیستم‌های بزرگ صنعتی با میلیون‌ها رکورد هرگز نباید بی‌دلیل از `SELECT *` استفاده کرد، زیرا ترافیک سنگین شبکه و مصرف رم غیرضروری ایجاد می‌کند.',
        ],
        en: [
          '## Level 2: Syntax Anatomy & Real-World Caveats ⚙️',
          '```sql',
          'SELECT * FROM customers;',
          '```',
          '- `SELECT`: Specifies which column projections to extract.',
          '- Asterisk `*`: Wildcard meaning "every single column in the table".',
          '- `FROM customers`: Designates the source relation to read from.',
          '- Semicolon `;`: Formally terminates the SQL statement.',
          '> ⚠️ **Production Pitfall:** `SELECT *` is convenient for learning and exploratory consoles. In production systems with wide tables or millions of rows, it causes severe I/O bottlenecks and prevents index-only execution paths.',
        ],
        de: [
          '## Stufe 2: Syntax-Aufbau & Praxis-Fallstricke ⚙️',
          '```sql',
          'SELECT * FROM customers;',
          '```',
          '- `SELECT`: Bestimmt, welche Spalten ausgegeben werden sollen.',
          '- Stern `*`: Platzhalter für „alle vorhandenen Spalten der Tabelle“.',
          '- `FROM customers`: Gibt die Quelltabelle an.',
          '- Semikolon `;`: Schließt die SQL-Anweisung formal ab.',
          '> ⚠️ **Praxis-Hinweis:** In Produktivsystemen sollte `SELECT *` vermieden werden, da unnötige Netzwerk- und Speicherlasten entstehen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'تمام ردیف‌ها و ستون‌های جدول مشتریان (`customers`) را با استفاده از دستور `SELECT *` استخراج کنید و دکمه **اجرا (Run SQL)** یا کلیدهای `Ctrl + Enter` را بزنید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Retrieve every row and column from the `customers` table using `SELECT *`. Press **Run SQL** or hit `Ctrl + Enter`.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Rufen Sie mit `SELECT *` alle Zeilen und Spalten aus der Tabelle `customers` ab. Drücken Sie **SQL ausführen** oder `Strg + Enter`.',
        ],
      },
    },
  ],
};

export const selectColumns: Level = {
  id: 'intro-select-columns',
  name: {
    fa: 'تصویربرداری و انتخاب ستون‌ها (Projection)',
    en: 'Column Projection',
    de: 'Spaltenprojektion (SELECT cols)',
  },
  hint: {
    fa: 'SELECT name, city FROM customers;',
    en: 'SELECT name, city FROM customers;',
    de: 'SELECT name, city FROM customers;',
  },
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
      diagram: 'select-projection',
      markdowns: {
        fa: [
          '## سطح ۱: برش عمودی داده‌ها (Projection) ✂️',
          'تصور کنید به جای ورق زدن کل پرونده افراد، فقط می‌خواهید یک فهرست تماس شامل **نام** و **شهر** تهیه کنید.',
          'در ریاضیات و پایگاه‌داده، به عمل انتخاب ستون‌های خاص و دور انداختن ستون‌های اضافه، **Projection (تصویربرداری عمودی)** می‌گویند.',
          'به دیاگرام بالا نگاه کنید: ستون‌های `id` و `signup_year` فیلتر شده و تنها ستون‌های `name` و `city` به خروجی منتقل شده‌اند.',
        ],
        en: [
          '## Level 1: Vertical Slicing (Projection) ✂️',
          'Imagine preparing a quick directory list: you only need each customer\'s **name** and **city**, ignoring administrative IDs and signup years.',
          'In relational algebra, filtering specific columns vertically while discarding unneeded attributes is called **Projection**.',
          'Look at the schematic above: columns `id` and `signup_year` are dropped, streaming only `name` and `city` to the client.',
        ],
        de: [
          '## Stufe 1: Vertikales Zuschneiden (Projektion) ✂️',
          'Wenn Sie lediglich ein Verzeichnis mit **Name** und **Stadt** benötigen, müssen Sie nicht die gesamte Akte laden.',
          'In der relationalen Algebra bezeichnet man das gezielte Auswählen von Spalten als **Projektion**.',
          'Im obigen Schaubild sehen Sie: `id` und `signup_year` werden verworfen, nur `name` und `city` gelangen in das Ergebnis.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## سطح ۲: قواعد نگارش و ترتیب ستون‌ها 📋',
          'کافی است نام ستون‌های مورد نظر را با کاما انگلیسی `,` از یکدیگر جدا کنید:',
          '```sql',
          'SELECT name, city FROM customers;',
          '```',
          '### نکات حرفه‌ای:',
          '- ترتیبی که در بخش `SELECT` می‌نویسید، ترتیب ستون‌ها در جدول خروجی را معین می‌کند (`city, name` با `name, city` متفاوت است).',
          '- انتخاب صریح ستون‌ها باعث می‌شود موتور پایگاه داده بتواند از ایندکس‌های حافظه رم استفاده کند و مجبور به خواندن داده‌های سنگین از دیسک نشود.',
        ],
        en: [
          '## Level 2: Syntax Conventions & Column Ordering 📋',
          'Separate desired attributes with standard commas `,`:',
          '```sql',
          'SELECT name, city FROM customers;',
          '```',
          '### Key Engineering Principles:',
          '- The sequence listed in `SELECT` dictates the exact column order of the output grid.',
          '- Selecting only the necessary columns allows storage engines to utilize covering indexes and minimize memory bandwidth consumption.',
        ],
        de: [
          '## Stufe 2: Syntaxregeln & Spaltenreihenfolge 📋',
          'Trennen Sie die gewünschten Spaltennamen einfach durch Kommas `,`:',
          '```sql',
          'SELECT name, city FROM customers;',
          '```',
          '### Wichtige Grundlagen:',
          '- Die Reihenfolge im `SELECT` bestimmt direkt die Spaltenanordnung der Ausgabe.',
          '- Das gezielte Anfordern notwendiger Spalten spart Speicherbandbreite und ermöglicht effiziente Index-Scans.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'تنها دو ستون `name` و `city` را از جدول `customers` انتخاب کرده و کوئری را اجرا کنید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Return strictly the `name` and `city` columns from `customers`.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Geben Sie ausschließlich die Spalten `name` und `city` aus der Tabelle `customers` zurück.',
        ],
      },
    },
  ],
};

export const whereBasic: Level = {
  id: 'intro-where',
  name: {
    fa: 'فیلتر ردیف‌ها با شرط (WHERE)',
    en: 'Horizontal Row Filtering (WHERE)',
    de: 'Zeilen filtern mit WHERE',
  },
  hint: {
    fa: "SELECT name FROM customers WHERE city = 'London';",
    en: "SELECT name FROM customers WHERE city = 'London';",
    de: "SELECT name FROM customers WHERE city = 'London';",
  },
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
      diagram: 'where-filter',
      markdowns: {
        fa: [
          '## سطح ۱: فیلتر کردن افقی داده‌ها (Selection) 🔍',
          'اگر ستون‌ها «برش عمودی» بودند، بند `WHERE` یک **«الک افقی»** است!',
          'موتور پایگاه‌داده ردیف به ردیف جلو می‌رود و از هر ردیف می‌پرسد: «آیا شرط من درباره تو درست است؟»',
          '- اگر پاسخ `TRUE` باشد: ردیف حفظ می‌شود.',
          '- اگر پاسخ `FALSE` یا `NULL` باشد: ردیف بلافاصله دور ریخته می‌شود.',
          'در دیاگرام بالا، تنها ردیف مربوط به Ada در شهر London شرط را برآورده کرده و عبور می‌کند.',
        ],
        en: [
          '## Level 1: Horizontal Slicing & Predicates 🔍',
          'While column projection is a vertical slice, the `WHERE` clause is a **horizontal sieve**.',
          'The engine evaluates rows against your Boolean condition:',
          '- If the predicate evaluates to `TRUE`: the row is kept.',
          '- If it evaluates to `FALSE` or `NULL` (unknown): the row is discarded.',
          'In the schematic above, only Ada in London satisfies the test and reaches the result.',
        ],
        de: [
          '## Stufe 1: Horizontales Sieben von Daten 🔍',
          'Während die Spaltenauswahl ein vertikaler Schnitt ist, fungiert die `WHERE`-Klausel als **horizontales Filtersieb**.',
          'Jede Zeile wird anhand des Prädikats geprüft:',
          '- Ist die Bedingung `TRUE`: Zeile wird beibehalten.',
          '- Ist sie `FALSE` oder `NULL`: Zeile wird verworfen.',
          'Im Diagramm oben besteht nur Ada in London die Prüfung.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## سطح ۲: قوانین کوتیشن و عملگرهای مقایسه 💡',
          '```sql',
          "SELECT name FROM customers WHERE city = 'London';",
          '```',
          '### نکات طلایی و خطاهای رایج:',
          "- **رشته‌های متنی حتماً داخل کوتیشن تکی (`'...'`):** کلماتی مانند `'London'` که داده متنی هستند باید در کوتیشن تکی باشند. اگر بدون کوتیشن بنویسید، SQL فکر می‌کند نام یک ستون است و خطای `no such column` می‌دهد!",
          '- **اعداد به کوتیشن نیاز ندارند:** مانند `signup_year = 2020`.',
          '- **عملگرهای مقایسه‌ای:** `=`, `!=` (یا `<>`), `>`, `<`, `>=`, `<=`.',
        ],
        en: [
          '## Level 2: Syntax Precision & Common Pitfalls 💡',
          '```sql',
          "SELECT name FROM customers WHERE city = 'London';",
          '```',
          '### Golden Rules:',
          "- **Text literals always take single quotes (`'...'`):** Words like `'London'` are data values. Writing `WHERE city = London` causes a `no such column: London` error!",
          '- **Numeric values never take quotes:** e.g. `signup_year = 2020`.',
          '- **Comparison Operators:** `=`, `!=` (or `<>`), `>`, `<`, `>=`, `<=`.',
        ],
        de: [
          '## Stufe 2: Syntax-Details & typische Stolpersteine 💡',
          '```sql',
          "SELECT name FROM customers WHERE city = 'London';",
          '```',
          '### Wichtige Regeln:',
          "- **Textliterale immer in einfachen Anführungszeichen (`'...'`):** `'London'` ist ein Wert. Ohne Anführungszeichen sucht SQL nach einer Spalte namens `London`!",
          '- **Zahlenwerte ohne Anführungszeichen:** z. B. `signup_year = 2020`.',
          '- **Vergleichsoperatoren:** `=`, `!=` (oder `<>`), `>`, `<`, `>=`, `<=`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'نام مشتریانی را بیابید که شهر آن‌ها دقیقاً لندن (`city = \'London\'`) است.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Return the name of customers whose city is exactly London (`city = \'London\'`).',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Geben Sie den Namen aller Kunden aus, deren Stadt exakt London (`city = \'London\'`) ist.',
        ],
      },
    },
  ],
};

export const orderLimit: Level = {
  id: 'intro-order-limit',
  name: {
    fa: 'مرتب‌سازی و برش نتایج (ORDER BY و LIMIT)',
    en: 'Sorting & Slicing (ORDER BY & LIMIT)',
    de: 'Sortieren & Begrenzen (ORDER BY & LIMIT)',
  },
  hint: {
    fa: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
    en: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
    de: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 2;',
  },
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
      diagram: 'order-limit',
      markdowns: {
        fa: [
          '## سطح ۱: چرا پایگاه داده ترتیب ذاتی ندارد؟ 🎲',
          'در تئوری مجموعه‌ها و پایگاه‌های داده رابطه‌ای، جدول‌ها مثل یک **کیسه مهره** هستند؛ هیچ ترتیب اول یا آخری به صورت پیش‌فرض وجود ندارد!',
          'اگر بدون `ORDER BY` کوئری بزنید، پایگاه داده حق دارد ردیف‌ها را با هر ترتیبی که مایل است بازگرداند.',
          '### مدل ذهنی ترکیب ORDER BY و LIMIT:',
          '1. ابتدا تمام ردیف‌ها در حافظه بر اساس معیار شما از بیشترین به کمترین چیده می‌شوند.',
          '2. سپس دستور `LIMIT n` مثل یک گیوتین عمل کرده و فقط `n` تای اول را نگه می‌دارد.',
        ],
        en: [
          '## Level 1: Why Tables Have No Inherent Order 🎲',
          'In relational set theory, a table is an **unordered bag of records**. Unless explicitly ordered, record order is non-deterministic.',
          'Running queries without `ORDER BY` means results could arrive in arbitrary sequence depending on storage internals.',
          '### The Mental Model of ORDER BY + LIMIT:',
          '1. Rows are sorted deterministically along the requested column dimension.',
          '2. `LIMIT n` slices exactly the top `n` elements from the head of the sorted stream.',
        ],
        de: [
          '## Stufe 1: Warum Tabellen keine feste Reihenfolge haben 🎲',
          'In der relationalen Mengentheorie ist eine Tabelle eine **ungeordnete Menge**. Ohne Sortieranweisung ist die Zeilenfolge zufällig.',
          'Erst `ORDER BY` stellt eine verlässliche Reihenfolge sicher.',
          '### Das Zusammenspiel von ORDER BY und LIMIT:',
          '1. Die Zeilen werden nach dem angegebenen Kriterium sortiert.',
          '2. `LIMIT n` schneidet exakt die ersten `n` Zeilen ab.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## سطح ۲: کلیدواژه‌های ASC و DESC 📊',
          '```sql',
          'SELECT name, price FROM products',
          'ORDER BY price DESC',
          'LIMIT 2;',
          '```',
          '- `ASC` (Ascending): صعودی از کم به زیاد / از A به Z (حالت پیش‌فرض).',
          '- `DESC` (Descending): نزولی از زیاد به کم / از Z به A.',
          '> ⚡ **الگوی Top-N در دنیای واقعی:** پیدا کردن «گران‌ترین کالاها»، «پرفروش‌ترین ماه‌ها» یا «پرافتخارترین بازیکنان» همیشه با ترکیب `ORDER BY col DESC LIMIT n` انجام می‌شود.',
        ],
        en: [
          '## Level 2: Directional Sorting & Top-N Patterns 📊',
          '```sql',
          'SELECT name, price FROM products',
          'ORDER BY price DESC',
          'LIMIT 2;',
          '```',
          '- `ASC` (Ascending): Lowest to highest / A-Z (default behavior).',
          '- `DESC` (Descending): Highest to lowest / Z-A.',
          '> ⚡ **The Ubiquitous Top-N Pattern:** Finding "highest priced items", "top sales performers", or "latest events" is universally implemented using `ORDER BY col DESC LIMIT n`.',
        ],
        de: [
          '## Stufe 2: Sortierrichtung & Top-N Muster 📊',
          '```sql',
          'SELECT name, price FROM products',
          'ORDER BY price DESC',
          'LIMIT 2;',
          '```',
          '- `ASC`: Aufsteigend (Standard).',
          '- `DESC`: Absteigend (vom Höchsten zum Niedrigsten).',
          '> ⚡ **Das Top-N Muster:** Typische Abfragen wie „die 2 teuersten Produkte“ basieren stets auf `ORDER BY col DESC LIMIT n`.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'نام و قیمت ۲ محصول گران‌قیمت کاتالوگ فروشگاه را با مرتب‌سازی نزولی قیمت استخراج کنید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Return the `name` and `price` of the two most expensive products by ordering price descending and limiting to 2.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Geben Sie Name und Preis der beiden teuersten Produkte aus, indem Sie absteigend nach Preis sortieren und das Ergebnis auf 2 begrenzen.',
        ],
      },
    },
  ],
};

export const introLevels: Level[] = [
  selectAll,
  selectColumns,
  whereBasic,
  orderLimit,
];
