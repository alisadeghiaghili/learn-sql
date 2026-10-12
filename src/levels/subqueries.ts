/**
 * Subqueries & CTEs — scalar subqueries, IN/EXISTS, derived tables,
 * WITH (common table expressions), and recursive CTEs.
 * Rigorous pedagogical scaffolding, visual mental models,
 * common pitfalls, and fluent trilingual support (fa, en, de).
 */
import { shopSchema, shopSeed } from './shopSchema';
import { employeesSchema, employeesSeed } from './customSchemas';
import type { Level } from './types';

export const scalarSubquery: Level = {
  id: 'subq-scalar',
  name: {
    fa: 'زیرکوئری تک‌مقداری (Scalar Subquery)',
    en: 'Scalar Subquery',
    de: 'Skalare Unterabfrage',
  },
  hint: {
    fa: 'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price FROM products;',
    en: 'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price FROM products;',
    de: 'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price FROM products;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price FROM products;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name', 'price', 'max_price'],
    rows: [
      ['Keyboard', 89.5, 249],
      ['Mouse', 24, 249],
      ['SQL Handbook', 39.9, 249],
      ['Monitor', 249, 249],
      ['Query Tuning', 45, 249],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## کوئری درون کوئری دیگر (جعبه‌های تودرتو) 📦',
          'تصور کنید به فروشگاهی رفته‌اید و می‌خواهید قیمت هر کالا را با **گران‌ترین کالای کل فروشگاه** مقایسه کنید.',
          'شما ابتدا در ذهن خود یک سوال جداگانه می‌پرسید: «گران‌ترین کلا کلاً چند است؟» (پاسخ: ۲۴۹ دلار).',
          'سپس برچسب ۲۴۹ دلار را برمی‌دارید و کنار قیمت تک‌تک کالاها می‌چسبانید.',
          'در SQL، به این سوال درونی که دقیقاً **یک عدد یا مقدار واحد (یک ردیف و یک ستون)** تولید می‌کند، **Scalar Subquery (زیرکوئری اسکالر)** می‌گویند.',
        ],
        en: [
          '## Nested Russian Dolls (The Mental Model) 📦',
          'Imagine walking through a hardware store comparing every product\'s price against the **single most expensive item in the entire store**.',
          'Mentally, you solve this in two steps:',
          '1. You ask an isolated inner question: "What is the store-wide maximum price?" (Answer: $249).',
          '2. You take that single scalar answer and project it beside every item on the shelves.',
          'In SQL, an inner query that returns strictly **one cell** (one row, one column) is known as a **Scalar Subquery**.',
        ],
        de: [
          '## Das Matrjoschka-Modell (Verschachtelte Abfragen) 📦',
          'Stellen Sie sich vor, Sie möchten den Preis jedes Produkts mit dem **teuersten Artikel des gesamten Ladens** vergleichen.',
          'Gedanklich geschieht dies in zwei Schritten:',
          '1. Sie ermitteln zunächst den Höchstpreis: „Was kostet der teuerste Artikel?“ (Ergebnis: 249 €).',
          '2. Diese einzelne Zahl wird neben jedem Artikel aufgeführt.',
          'In SQL nennt man eine Unterabfrage, die genau **eine einzige Zelle** liefert, eine **skalare Unterabfrage**.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## جایگاه‌های مجاز و خطای مرگبار زیرکوئری‌ها ⚠️',
          '```sql',
          'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price',
          'FROM products;',
          '```',
          '### نکات حیاتی و فنی:',
          '- پرانتزها الزامی هستند: زیرکوئری همیشه باید درون پرانتز `( ... )` محصور شود.',
          '- مقدار اسکالر درست مثل یک عدد ثابت عمل می‌کند و برای تمام ردیف‌های جدول بیرونی تکرار می‌شود.',
          '> ⚠️ **خطای مرگبار (Runtime Crash):** اگر زیرکوئری درون `SELECT` بیش از یک ردیف خروجی تولید کند (مثلاً `SELECT price FROM products` بدون MAX)، پایگاه داده بلافاصله با خطای `subquery returns more than 1 row` متوقف می‌شود!',
        ],
        en: [
          '## Syntax Rules & The Multi-Row Crash Trap ⚠️',
          '```sql',
          'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price',
          'FROM products;',
          '```',
          '### Technical Anatomy:',
          '- Parentheses are mandatory: Subqueries must always be strictly isolated within `( ... )`.',
          '- The resolved scalar value behaves as a repeated constant across all outer rows.',
          '> ⚠️ **Fatal Runtime Pitfall:** If an expression in a scalar context produces *more than one row* (e.g. `SELECT price FROM products` without an aggregate), the engine crashes with: `subquery returns more than 1 row`!',
        ],
        de: [
          '## Syntaxregeln & Der Mehrzeilen-Absturz ⚠️',
          '```sql',
          'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price',
          'FROM products;',
          '```',
          '### Technische Feinheiten:',
          '- Klammern sind Pflicht: Unterabfragen müssen immer in `( ... )` stehen.',
          '- Der skalare Wert wird wie eine Konstante für jede äußere Zeile wiederholt.',
          '> ⚠️ **Kritischer Fehler:** Liefert eine skalare Unterabfrage mehr als eine Zeile zurück, bricht die Datenbank mit dem Fehler `subquery returns more than 1 row` ab!',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'نام و قیمت تمام محصولات را استخراج کرده و بیشترین قیمت کل محصولات را در ستونی به نام `max_price` کنار هر محصول نمایش دهید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Return every product (`name`, `price`) accompanied by the catalog-wide maximum price under the alias `max_price`.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Geben Sie jedes Produkt (`name`, `price`) zusammen mit dem katalogweiten Höchstpreis als `max_price` aus.',
        ],
      },
    },
  ],
};

export const inSubquery: Level = {
  id: 'subq-in',
  name: {
    fa: 'فیلتر با زیرکوئری چندتایی (IN)',
    en: 'Multi-Row Filtering with IN',
    de: 'Mehrzeilige Unterabfrage mit IN',
  },
  hint: {
    fa: "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE product_id IN (SELECT id FROM products WHERE category = 'Books'));",
    en: "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE product_id IN (SELECT id FROM products WHERE category = 'Books'));",
    de: "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE product_id IN (SELECT id FROM products WHERE category = 'Books'));",
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE product_id IN (SELECT id FROM products WHERE category = 'Books'));",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Ada Lovelace'],
      ['Alan Turing'],
      ['Grace Hopper'],
      ['Barbara Liskov'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## کارآگاه‌بازی و حل مرحله‌به‌مرحله معما 🕵️',
          'فرض کنید می‌خواهید بدانید: «چه مشتریانی تا به حال کتاب خریده‌اند؟»',
          'در دنیای واقعی شما این کار را در ۳ قدم پی‌درپی حل می‌کنید:',
          '1. **قدم اول:** به قفسه کالاها می‌روید و شناسه کتاب‌ها را یادداشت می‌کنید: `SELECT id FROM products WHERE category = \'Books\'`.',
          '2. **قدم دوم:** به دفتر ثبت سفارشات می‌روید و می‌بینید چه مشتریانی آن شناسه‌ها را خریده‌اند: `SELECT customer_id FROM orders WHERE product_id IN (...)`.',
          '3. **قدم سوم:** به سراغ پرونده مشتریان می‌روید و نام آن خریداران را پیدا می‌کنید.',
          'عملگر `IN` به شما اجازه می‌دهد این زنجیره ۳ مرحله‌ای را درون یک کوئری واحد ترکیب کنید.',
        ],
        en: [
          '## The Detective Investigation Analogy 🕵️',
          'Suppose your manager asks: "Which customer names have ever ordered a Book?"',
          'You investigate the normalized database in three deductive steps:',
          '1. **Step 1:** Look up product IDs for the Books category: `SELECT id FROM products WHERE category = \'Books\'`.',
          '2. **Step 2:** Look up which customer IDs placed orders matching those book IDs: `SELECT customer_id FROM orders WHERE product_id IN (...)`.',
          '3. **Step 3:** Project names of customers whose ID exists in that matched buyer set.',
          'The `IN (SELECT ...)` predicate chains these deductive steps together into an expressive unified pipeline.',
        ],
        de: [
          '## Die Detektiv-Ermittlung 🕵️',
          'Aufgabe: „Welche Kunden haben jemals ein Buch bestellt?“',
          'In einer relationalen Datenbank lösen Sie dies in drei Schritten:',
          '1. **Schritt 1:** Produkt-IDs der Kategorie `Books` ermitteln: `SELECT id FROM products WHERE category = \'Books\'`.',
          '2. **Schritt 2:** Kunden-IDs aus `orders` ermitteln, die diese Buch-IDs bestellt haben.',
          '3. **Schritt 3:** Namen der Kunden ausgeben, deren ID in dieser Menge enthalten ist.',
          'Der `IN (SELECT ...)`-Operator verbindet diese Ermittlungsschritte in einer einzigen Abfrage.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## زیرکوئری‌های مستقل و نحوه اجرای آن‌ها ⚙️',
          '```sql',
          'SELECT name FROM customers',
          'WHERE id IN (',
          '  SELECT customer_id FROM orders',
          '  WHERE product_id IN (',
          '    SELECT id FROM products WHERE category = \'Books\'',
          '  )',
          ');',
          '```',
          '### نکات کارشناسی:',
          '- این زیرکوئری‌ها **غیروابسته (Uncorrelated)** هستند؛ یعنی داخلی‌ترین کوئری تنها یک‌بار اجرا می‌شود و خروجی آن به کوئری بیرونی پاس داده می‌شود.',
          '- زیرکوئری درون `IN` باید دقیقاً **یک ستون** برگرداند تا با ستون بیرونی مقایسه شود.',
        ],
        en: [
          '## Uncorrelated Subquery Mechanics ⚙️',
          '```sql',
          'SELECT name FROM customers',
          'WHERE id IN (',
          '  SELECT customer_id FROM orders',
          '  WHERE product_id IN (',
          '    SELECT id FROM products WHERE category = \'Books\'',
          '  )',
          ');',
          '```',
          '### Engineering Nuances:',
          '- These are **uncorrelated subqueries**: the inner query runs exactly once, producing an in-memory hash set evaluated by the parent queries.',
          '- Subqueries evaluated by `IN` must return strictly **one column** to match against the target column on the left.',
        ],
        de: [
          '## Unkorrelierte Ausführung ⚙️',
          '```sql',
          'SELECT name FROM customers',
          'WHERE id IN (',
          '  SELECT customer_id FROM orders',
          '  WHERE product_id IN (',
          '    SELECT id FROM products WHERE category = \'Books\'',
          '  )',
          ');',
          '```',
          '### Technische Details:',
          '- Dies sind **unkorrelierte Unterabfragen**: Die inneren Abfragen werden einmalig ausgeführt und als Menge zwischengespeichert.',
          '- Die Unterabfrage hinter `IN` darf genau **eine Spalte** zurückgeben.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'نام مشتریانی که حداقل یک کتاب (`Books`) سفارش داده‌اند را با استفاده از زیرکوئری‌های تودرتوی `IN` استخراج کنید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'List the names of customers who ordered at least one Book using nested `IN` subqueries.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Geben Sie die Namen aller Kunden aus, die mindestens ein Buch (`Books`) über verschachtelte `IN`-Abfragen bestellt haben.',
        ],
      },
    },
  ],
};

export const existsSubquery: Level = {
  id: 'subq-exists',
  name: {
    fa: 'شرط وجود هدفمند (EXISTS)',
    en: 'Targeted Existence (EXISTS)',
    de: 'Gezielte Existenzprüfung (EXISTS)',
  },
  hint: {
    fa: 'SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);',
    en: 'SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);',
    de: 'SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [
      ['Ada Lovelace'],
      ['Alan Turing'],
      ['Grace Hopper'],
      ['Edsger Dijkstra'],
      ['Barbara Liskov'],
    ],
    orderMatters: false,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## تفاوت تفکر IN با تفکر EXISTS ⚡',
          'تصور کنید می‌خواهید بدانید آیا شخصی تا به حال سفارشی ثبت کرده است یا خیر:',
          '- در روش `IN`: موتور کل سفارش‌های تاریخ شرکت را جمع‌آوری کرده و یک لیست غول‌پیکر می‌سازد، سپس بررسی می‌کند مشتری در آن لیست هست یا نه.',
          '- در روش `EXISTS`: موتور سراغ پرونده مشتری می‌رود و به جدول سفارش‌ها نگاه می‌کند. **به محض اینکه حتی یک سفارش دید، کار را متوقف می‌کند و می‌گوید: «بله، وجود دارد!»**',
          'به این قابلیت توقف زودهنگام در علم کامپیوتر **Short-Circuit Evaluation** می‌گویند.',
        ],
        en: [
          '## The Short-Circuit Mindset (IN vs EXISTS) ⚡',
          'Consider validating whether a customer has ever placed an order:',
          '- With `IN`: The database may assemble a massive list of every order placed in company history, then scans membership.',
          '- With `EXISTS`: The engine inspects the orders table for that specific customer and **stops scanning the millisecond it finds the very first matching record**.',
          'This immediate early exit is called **Short-Circuit Evaluation**, making `EXISTS` exceptionally performant on large tables.',
        ],
        de: [
          '## Das Short-Circuit Prinzip (IN vs EXISTS) ⚡',
          'Aufgabe: Prüfen, ob ein Kunde mindestens eine Bestellung getätigt hat.',
          '- Mit `IN`: Die Datenbank erstellt potenziell eine riesige Liste aller Bestellungen und gleicht ab.',
          '- Mit `EXISTS`: Das System sucht für den Kunden in `orders` und **stoppt sofort beim allerersten Treffer**.',
          'Dieser sofortige Abbruch (**Short-Circuit**) macht `EXISTS` bei großen Datenmengen extrem schnell.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## زیرکوئری وابسته و راز SELECT 1 🔑',
          '```sql',
          'SELECT name FROM customers c',
          'WHERE EXISTS (',
          '  SELECT 1 FROM orders o WHERE o.customer_id = c.id',
          ');',
          '```',
          '### چرا می‌نویسیم SELECT 1؟',
          'چون عملگر `EXISTS` هیچ اهمیتی به این نمی‌دهد که چه داده‌ای بازگردانده شده؛ فقط برایش مهم است که **آیا ردیفی برگشته یا نه**. نوشتن `SELECT 1` یا `SELECT *` برای موتور فرقی ندارد، اما `SELECT 1` استاندارد تمیزنویسی برنامه‌نویسان ارشد است.',
          '- عبارت `c.id` درون زیرکوئری به جدول بیرونی اشاره دارد که به آن **Correlated Subquery (زیرکوئری وابسته)** می‌گویند.',
        ],
        en: [
          '## Correlated Subqueries & The Secret of SELECT 1 🔑',
          '```sql',
          'SELECT name FROM customers c',
          'WHERE EXISTS (',
          '  SELECT 1 FROM orders o WHERE o.customer_id = c.id',
          ');',
          '```',
          '### Why write `SELECT 1`?',
          '`EXISTS` does not transmit or project column data. It strictly checks whether the qualifying result set is non-empty. Standard convention uses `SELECT 1`.',
          '- The subquery references `c.id` from the outer customer record; this coupling is known as a **Correlated Subquery**.',
        ],
        de: [
          '## Korrelierte Unterabfragen & Das Geheimnis von SELECT 1 🔑',
          '```sql',
          'SELECT name FROM customers c',
          'WHERE EXISTS (',
          '  SELECT 1 FROM orders o WHERE o.customer_id = c.id',
          ');',
          '```',
          '### Warum schreibt man `SELECT 1`?',
          '`EXISTS` ignoriert die zurückgegebenen Spaltendaten vollständig. Es prüft ausschließlich, ob mindestens eine Zeile existiert. `SELECT 1` ist die gängige Konvention.',
          '- Der Bezug auf `c.id` aus der äußeren Abfrage macht dies zu einer **korrelierten Unterabfrage**.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'نام تمام مشتریانی که حداقل یک سفارش در جدول سفارش‌ها دارند را با استفاده از `EXISTS` استخراج کنید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'List all customers who have placed at least one order using the `EXISTS` clause.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Ermitteln Sie die Namen aller Kunden mit mindestens einer Bestellung mittels `EXISTS`.',
        ],
      },
    },
  ],
};

export const derivedTable: Level = {
  id: 'subq-derived',
  name: {
    fa: 'جدول‌های مشتق‌شده درون حافظه (Derived Table)',
    en: 'Derived Tables in FROM',
    de: 'Abgeleitete Tabellen in FROM',
  },
  hint: {
    fa: 'SELECT category, n FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t ORDER BY n DESC;',
    en: 'SELECT category, n FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t ORDER BY n DESC;',
    de: 'SELECT category, n FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t ORDER BY n DESC;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'SELECT category, n FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t ORDER BY n DESC;',
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['category', 'n'],
    rows: [
      ['Hardware', 3],
      ['Books', 2],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## ساخت جدول موقت پروازی (On-The-Fly) 🛫',
          'همیشه مجبور نیستید داده‌ها را از جدول‌های واقعی دیسک بخوانید.',
          'در بند `FROM` می‌توانید یک کوئری کامل بنویسید؛ خروجی این کوئری مانند یک جدول موقت در حافظه رم ظاهر می‌شود که می‌توانید روی آن کوئری جدید بزنید، فیلتر کنید یا آن را مرتب سازید.',
          'به این جدول‌های موقت، **Derived Tables (جدول‌های مشتق‌شده)** می‌گویند.',
        ],
        en: [
          '## Ephemeral Tables On-The-Fly 🛫',
          'You are never limited to querying physical tables stored on disk.',
          'By placing a subquery directly inside the `FROM` clause, its result set materializes as an in-memory virtual table that you can query, join, and sort like any regular table.',
          'These in-memory query structures are called **Derived Tables** (or inline views).',
        ],
        de: [
          '## Temporäre Tabellen im Arbeitsspeicher 🛫',
          'Sie müssen Abfragen nicht zwingend auf physischen Tabellen ausführen.',
          'Eine Unterabfrage in der `FROM`-Klausel erzeugt eine temporäre virtuelle Tabelle im Arbeitsspeicher, die wie jede normale Tabelle abgefragt werden kann.',
          'Man nennt solche Strukturen **abgeleitete Tabellen** (Derived Tables).',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## قانون اجباری نام مستعار (Alias) 🏷️',
          '```sql',
          'SELECT category, n',
          'FROM (',
          '  SELECT category, COUNT(*) AS n FROM products GROUP BY category',
          ') t',
          'ORDER BY n DESC;',
          '```',
          '> ⚠️ **قانون خطای متداول:** استاندارد SQL حکم می‌کند که هر جدول مشتق‌شده **حتماً و بدون استثنا باید یک نام مستعار (مثل `t`)** داشته باشد. فراموش کردن حرف `t` بعد از پرانتز باعث خطای سینتکس خواهد شد!',
        ],
        en: [
          '## The Mandatory Table Alias Invariant 🏷️',
          '```sql',
          'SELECT category, n',
          'FROM (',
          '  SELECT category, COUNT(*) AS n FROM products GROUP BY category',
          ') t',
          'ORDER BY n DESC;',
          '```',
          '> ⚠️ **Mandatory Syntax Rule:** ANSI SQL strictly dictates that every derived table **must have an explicit table alias** (like `t`). Omitting `t` after the closing parenthesis triggers an immediate syntax error across all engines!',
        ],
        de: [
          '## Die Pflicht zum Tabellen-Alias 🏷️',
          '```sql',
          'SELECT category, n',
          'FROM (',
          '  SELECT category, COUNT(*) AS n FROM products GROUP BY category',
          ') t',
          'ORDER BY n DESC;',
          '```',
          '> ⚠️ **Syntax-Vorschrift:** Jede abgeleitete Tabelle **muss zwingend einen Alias (z. B. `t`) erhalten**. Ohne den Alias bricht die Abfrage mit einem Syntaxfehler ab!',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'تعداد محصولات هر دسته را درون یک جدول مشتق‌شده به نام `t` تجمیع کرده و دسته‌بندی‌ها را به همراه تعداد (`n`) به ترتیب نزولی تعداد نمایش دهید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Aggregate product counts per category inside a derived table aliased as `t`, selecting `category` and `n` ordered by `n DESC`.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Aggregieren Sie die Produktanzahl je Kategorie in einer abgeleiteten Tabelle `t` und sortieren Sie nach `n DESC`.',
        ],
      },
    },
  ],
};

export const cteBasic: Level = {
  id: 'subq-cte',
  name: {
    fa: 'عبارت‌های جدول مشترک (CTE / WITH)',
    en: 'Clean Pipelines with CTEs (WITH)',
    de: 'Saubere Pipelines mit CTEs (WITH)',
  },
  hint: {
    fa: 'WITH expensive AS (SELECT id, name, price FROM products WHERE price > 50) SELECT name, price FROM expensive ORDER BY price DESC;',
    en: 'WITH expensive AS (SELECT id, name, price FROM products WHERE price > 50) SELECT name, price FROM expensive ORDER BY price DESC;',
    de: 'WITH expensive AS (SELECT id, name, price FROM products WHERE price > 50) SELECT name, price FROM expensive ORDER BY price DESC;',
  },
  schema: shopSchema,
  seed: shopSeed,
  solution:
    'WITH expensive AS (SELECT id, name, price FROM products WHERE price > 50) SELECT name, price FROM expensive ORDER BY price DESC;',
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
      markdowns: {
        fa: [
          '## نجات از جهنم پرانتزهای تودرتو 📖',
          'وقتی زیرکوئری‌ها زیاد می‌شوند، کدهای SQL شبیه کلافی سردرگم می‌شوند که خواندن آن‌ها از داخل به خارج بسیار دشوار است.',
          'عبارت **CTE (Common Table Expression)** که با دستور `WITH` شروع می‌شود، به شما اجازه می‌دهد پایپ‌لاین‌های تحلیلی را دقیقاً مانند خواندن یک کتاب داستان **از بالا به پایین** بنویسید:',
          '1. ابتدا می‌گویید: «فرض کن جدولی موقت به نام `expensive` داریم...»',
          '2. سپس در خط بعدی از آن جدول تمیز و شفاف استفاده می‌کنید.',
        ],
        en: [
          '## Escaping Nested Subquery Hell 📖',
          'Deeply nested derived tables quickly become unreadable spaghetti code forced to be deciphered inside-out.',
          'A **CTE (Common Table Expression)** defined via the `WITH` keyword transforms queries into top-to-bottom procedural pipelines:',
          '1. You declare named modular steps at the top of your script.',
          '2. Subsequent blocks reference those named steps cleanly.',
        ],
        de: [
          '## Befreiung von verschachteltem Code-Spaghetti 📖',
          'Tief verschachtelte Unterabfragen sind schwer lesbar und fehleranfällig.',
          'Ein **CTE (Common Table Expression)** mit `WITH` ermöglicht eine saubere Strukturierung von oben nach unten wie ein Rezept:',
          '1. Oben definieren Sie Zwischenschritte unter klaren Namen.',
          '2. Darunter greifen Sie einfach auf diese benannten Schritte zu.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## ساختار استاندارد CTE 🏗️',
          '```sql',
          'WITH expensive AS (',
          '  SELECT id, name, price FROM products WHERE price > 50',
          ')',
          'SELECT name, price FROM expensive',
          'ORDER BY price DESC;',
          '```',
          '### مزایای معماری CTE در پروژه‌های واقعی:',
          '- خوانایی فوق‌العاده بالا برای اعضای تیم و کدهای اشتراکی.',
          '- امکان تعریف چندین CTE با کاما: `WITH a AS (...), b AS (...) SELECT ...`.',
          '- امکان اتصال (JOIN) چندین CTE به یکدیگر در انتهای کوئری.',
        ],
        en: [
          '## Architectural Syntax & Composability 🏗️',
          '```sql',
          'WITH expensive AS (',
          '  SELECT id, name, price FROM products WHERE price > 50',
          ')',
          'SELECT name, price FROM expensive',
          'ORDER BY price DESC;',
          '```',
          '### Professional Engineering Advantages:',
          '- Self-documenting readability for team code reviews.',
          '- Chain multiple sequential steps with simple commas: `WITH step_one AS (...), step_two AS (...) SELECT ...`.',
          '- Reusable: A single CTE can be joined multiple times in the final statement without duplicating query logic.',
        ],
        de: [
          '## Architektur & Wiederverwendbarkeit 🏗️',
          '```sql',
          'WITH expensive AS (',
          '  SELECT id, name, price FROM products WHERE price > 50',
          ')',
          'SELECT name, price FROM expensive',
          'ORDER BY price DESC;',
          '```',
          '### Praxis-Vorteile:',
          '- Hervorragende Lesbarkeit für Code-Reviews.',
          '- Beliebig viele Zwischenschritte mit Kommas verketten: `WITH a AS (...), b AS (...) SELECT ...`.',
          '- Mehrfachverwendbarkeit ohne redundante Code-Duplikate.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'یک CTE به نام `expensive` برای محصولاتی با قیمت بالای ۵۰ دلار بسازید و سپس `name` و `price` را به ترتیب نزولی قیمت استخراج کنید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Create a CTE named `expensive` isolating products priced above 50, selecting `name` and `price` ordered by price descending.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Erstellen Sie ein CTE `expensive` für Produkte über 50 und fragen Sie `name` und `price` absteigend nach Preis ab.',
        ],
      },
    },
  ],
};

export const recursiveCte: Level = {
  id: 'subq-recursive',
  name: {
    fa: 'عبارت‌های بازگشتی و گراف‌ها (Recursive CTE)',
    en: 'Hierarchies & Recursive CTEs',
    de: 'Hierarchien & Rekursive CTEs',
  },
  hint: {
    fa: "WITH RECURSIVE r AS (SELECT id, name, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, r.depth + 1 FROM employees e JOIN r ON e.manager_id = r.id) SELECT id, name, depth FROM r ORDER BY depth, id;",
    en: "WITH RECURSIVE r AS (SELECT id, name, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, r.depth + 1 FROM employees e JOIN r ON e.manager_id = r.id) SELECT id, name, depth FROM r ORDER BY depth, id;",
    de: "WITH RECURSIVE r AS (SELECT id, name, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, r.depth + 1 FROM employees e JOIN r ON e.manager_id = r.id) SELECT id, name, depth FROM r ORDER BY depth, id;",
  },
  schema: employeesSchema,
  seed: employeesSeed,
  solution:
    "WITH RECURSIVE r AS (\n  SELECT id, name, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id, r.depth + 1 FROM employees e JOIN r ON e.manager_id = r.id\n)\nSELECT id, name, depth FROM r ORDER BY depth, id;",
  golfPar: 1,
  goal: {
    type: 'result',
    columns: ['id', 'name', 'depth'],
    rows: [
      [1, 'CEO', 0],
      [2, 'CTO', 1],
      [6, 'Finance', 1],
      [3, 'VP Eng', 2],
      [4, 'Dev A', 3],
      [5, 'Dev B', 3],
    ],
    orderMatters: true,
  },
  startDialog: [
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## حل معمای چارت سازمانی و شجره‌نامه‌ها 🌳',
          'چگونه می‌توان تمام زیردستان یک مدیرعامل، یا تمام اجداد یک شخص را پیدا کرد وقتی عمق درخت نامعلوم است؟',
          'با جوین‌های عادی، برای هر لایه باید یک `JOIN` دستی بنویسید؛ اما با **Recursive CTE (عبارت بازگشتی)**، پایگاه‌داده خودش حلقه می‌زند و از ریشه تا عمیق‌ترین برگ درخت جلو می‌رود!',
        ],
        en: [
          '## Tree Traversals & Organizational Charts 🌳',
          'How do you query all reporting lines in a company hierarchy when tree depth is arbitrarily deep?',
          'Normal joins require hardcoding one explicit JOIN per level of depth. A **Recursive CTE** automates recursion natively, crawling from root nodes down to leaves dynamically.',
        ],
        de: [
          '## Baumstrukturen & Organigramme 🌳',
          'Wie ermittelt man alle Untergebenen in einer Unternehmenshierarchie mit unbekannter Tiefe?',
          'Standard-Joins erfordern für jede Hierarchiestufe einen separaten Join. Ein **rekursives CTE** durchläuft Bäume automatisch von der Wurzel bis zu den Blättern.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## معماری دو مرحله‌ای WITH RECURSIVE ⚙️',
          'هر بازگشتی شامل دو قسمت متصل به هم با `UNION ALL` است:',
          '1. **عضو پایه (Anchor Member):** ریشه درخت را معین می‌کند (مدیرعاملی که `manager_id IS NULL` است با عمق ۰).',
          '2. **عضو بازگشتی (Recursive Member):** در هر دور، کارمندان را به نتایج مرحله قبلی متصل کرده و عمق را یکی اضافه می‌کند (`r.depth + 1`).',
          'حلقه زمانی تمام می‌شود که هیچ ردیف جدیدی پیدا نشود.',
        ],
        en: [
          '## The Two-Phase Recursive Architecture ⚙️',
          'Every recursive CTE pairs two unified halves via `UNION ALL`:',
          '1. **Anchor Query:** Establishes the seed/root nodes (CEO where `manager_id IS NULL` at depth 0).',
          '2. **Recursive Member:** Joins the underlying table back to the previous iteration step, incrementing `r.depth + 1`.',
          'Recursion terminates cleanly when an iteration produces zero new rows.',
        ],
        de: [
          '## Aufbau eines rekursiven CTEs ⚙️',
          'Ein rekursives CTE besteht aus zwei Teilen, verbunden durch `UNION ALL`:',
          '1. **Anker-Abfrage (Anchor):** Definiert die Wurzel (`manager_id IS NULL` mit Tiefe 0).',
          '2. **Rekursiver Schritt:** Verknüpft untergeordnete Zeilen mit dem vorherigen Durchlauf und erhöht `r.depth + 1`.',
          'Die Rekursion endet automatisch, sobald keine neuen Zeilen mehr gefunden werden.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          'چارت سازمانی را مسطح کنید: `id`، `name` و عمق سازمانی نسبت به مدیرعامل (`depth`) را محاسبه کرده و به ترتیب `depth` و سپس `id` مرتب کنید.',
        ],
        en: [
          '## Challenge Objective 🎯',
          'Flatten the organization chart: return `id`, `name`, and `depth` from the CEO, ordered by `depth` then `id`.',
        ],
        de: [
          '## Ziel der Übung 🎯',
          'Lösen Sie das Organigramm auf: Geben Sie `id`, `name` und `depth` bezüglich des CEOs aus, sortiert nach `depth` und `id`.',
        ],
      },
    },
  ],
};

export const subqueryLevels: Level[] = [
  scalarSubquery,
  inSubquery,
  existsSubquery,
  derivedTable,
  cteBasic,
  recursiveCte,
];
