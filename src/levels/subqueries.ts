/**
 * Subqueries & CTEs — scalar subqueries, IN/EXISTS, derived tables,
 * WITH (common table expressions), and recursive CTEs.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */
import { shopSchema, shopSeed } from './shopSchema';
import { employeesSchema, employeesSeed } from './customSchemas';
import type { Level } from './types';

export const scalarSubquery: Level = {
  id: 'subq-scalar',
  name: {
    fa: 'زیرکوئری اسکالر (تک‌مقداری)',
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
          '## زیرکوئری تک‌مقداری (Scalar Subquery)',
          'یک زیرکوئری اسکالر دقیقا **یک ردیف و یک ستون** بازمی‌گرداند. بنابراین می‌توان از آن درست مثل یک عدد ثابت یا متغیر در بخش `SELECT` یا `WHERE` استفاده کرد.',
          '```sql',
          'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price',
          'FROM products;',
          '```',
          'در این حالت مقدار خروجی زیرکوئری برای تک‌تک ردیف‌های جدول اصلی تکرار و مقایسه می‌شود.',
          '> 💡 **نکته کلیدی:** اگر زیرکوئری بیش از یک مقدار برگرداند، خطای موتور پایگاه‌داده دریافت خواهید کرد.',
        ],
        en: [
          '## Scalar Subquery',
          'A scalar subquery returns exactly **one value** (one row, one column). Because of this, it can be evaluated directly inside a `SELECT` list, `WHERE` expression, or calculation.',
          '```sql',
          'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price',
          'FROM products;',
          '```',
          'The single computed scalar is repeated alongside each row of the outer table.',
          '> 💡 **Key Concept:** If a subquery used in this context produces more than one row, SQL throws a runtime error.',
        ],
        de: [
          '## Skalare Unterabfrage',
          'Eine skalare Unterabfrage liefert exakt **einen einzigen Wert** (eine Zeile, eine Spalte). Dadurch kann sie direkt in der `SELECT`-Liste oder als Ausdruck in der `WHERE`-Klausel eingesetzt werden.',
          '```sql',
          'SELECT name, price, (SELECT MAX(price) FROM products) AS max_price',
          'FROM products;',
          '```',
          'Der errechnete Wert wird für jede Zeile der äußeren Abfrage angezeigt.',
          '> 💡 **Wichtig:** Liefert die Unterabfrage mehr als eine Zeile zurück, meldet die Datenbank einen Fehler.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام و قیمت تمام محصولات را استخراج کرده و در ستونی با نام مستعار `max_price` بیشترین قیمت موجود در کل کاتالوگ را کنار هر محصول نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Return every product (`name`, `price`) along with the catalog-wide maximum price as `max_price`.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie jedes Produkt (`name`, `price`) zusammen mit dem katalogweiten Höchstpreis als `max_price` aus.',
        ],
      },
    },
  ],
};

export const inSubquery: Level = {
  id: 'subq-in',
  name: {
    fa: 'فیلتر با زیرکوئری (IN)',
    en: 'Subquery with IN',
    de: 'Unterabfrage mit IN',
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
          '## فیلتر کردن با عملگر IN و زیرکوئری چندتایی',
          'عبارت `WHERE col IN (SELECT ...)` به شما امکان می‌دهد نتایج یک کوئری را به عنوان لیست مقادیر مجاز برای فیلتر جدول دیگر قرار دهید.',
          'در این چالش، دو زیرکوئری تودرتو داریم:',
          '1. پیدا کردن شناسه کتاب‌ها از جدول `products`.',
          '2. پیدا کردن شناسه خریدارانی که آن کتاب‌ها را سفارش داده‌اند از جدول `orders`.',
          '3. نمایش نام مشتریان مربوطه از جدول `customers`.',
        ],
        en: [
          '## Multi-row Subqueries with IN',
          'The `WHERE col IN (SELECT ...)` predicate checks whether an outer value exists anywhere within the list returned by the inner query.',
          'Here we can nest logical steps:',
          '1. Find product IDs in the `Books` category.',
          '2. Find customer IDs who placed orders for those book IDs.',
          '3. Filter `customers` to keep only those matches.',
        ],
        de: [
          '## Mehrzeilige Unterabfragen mit IN',
          'Der Ausdruck `WHERE col IN (SELECT ...)` prüft, ob ein Wert der äußeren Abfrage in der Ergebnisliste der inneren Abfrage enthalten ist.',
          'Hier schachteln wir logische Ebenen:',
          '1. IDs aller Produkte der Kategorie `Books` ermitteln.',
          '2. Kunden-IDs aus `orders` ermitteln, die diese Bücher bestellt haben.',
          '3. Namen der entsprechenden Kunden aus `customers` ausgeben.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام تمام مشتریانی که حداقل یک کتاب (`Books`) خریده‌اند را با استفاده از شرط‌های `IN` استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'List the names of customers who ordered at least one Book using nested `IN` subqueries.',
        ],
        de: [
          '## Ziel der Übung',
          'Geben Sie die Namen aller Kunden aus, die mindestens ein Buch (`Books`) über verschachtelte `IN`-Abfragen bestellt haben.',
        ],
      },
    },
  ],
};

export const existsSubquery: Level = {
  id: 'subq-exists',
  name: {
    fa: 'شرط وجود (EXISTS)',
    en: 'EXISTS Predicate',
    de: 'EXISTS-Bedingung',
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
          '## عملگر قدرتمند EXISTS (زیرکوئری وابسته / Correlated)',
          'عملگر `EXISTS` بررسی می‌کند که آیا زیرکوئری حداقل یک ردیف خروجی تولید می‌کند یا خیر.',
          '- به محض یافتن اولین تطابق متوقف می‌شود (**Short-circuit evaluation**) و کل داده‌ها را اسکن نمی‌کند.',
          '- از آنجا که داده‌ای انتقال پیدا نمی‌کند، نوشتن `SELECT 1` یا `SELECT *` درون آن تفاوتی ندارد.',
          '- برای بررسی عدم وجود، از `NOT EXISTS` استفاده می‌شود.',
        ],
        en: [
          '## Correlated Subqueries with EXISTS',
          '`EXISTS` tests whether the inner subquery returns at least one qualifying row for each outer row candidate.',
          '- It short-circuits on the very first match, making it exceptionally fast for existence checks on large tables.',
          '- The selected columns do not matter — convention uses `SELECT 1`.',
          '- Use `NOT EXISTS` to find records with zero matches.',
        ],
        de: [
          '## Korrelierte Unterabfragen mit EXISTS',
          '`EXISTS` prüft, ob die innere Unterabfrage mindestens eine passende Zeile für den Datensatz der äußeren Abfrage liefert.',
          '- Die Ausführung bricht sofort beim ersten Treffer ab (**Short-Circuit**), was bei großen Tabellen sehr effizient ist.',
          '- Die Spaltenauswahl spielt keine Rolle — Konvention ist `SELECT 1`.',
          '- Nutzen Sie `NOT EXISTS`, um Datensätze ohne Treffer zu finden.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'نام تمام مشتریانی که حداقل یک سفارش در سیستم دارند را با استفاده از `EXISTS` استخراج کنید.',
        ],
        en: [
          '## Challenge Objective',
          'List all customers who have placed at least one order using the `EXISTS` clause.',
        ],
        de: [
          '## Ziel der Übung',
          'Ermitteln Sie die Namen aller Kunden mit mindestens einer Bestellung mittels `EXISTS`.',
        ],
      },
    },
  ],
};

export const derivedTable: Level = {
  id: 'subq-derived',
  name: {
    fa: 'جدول مشتق‌شده (Derived Table)',
    en: 'Derived Table',
    de: 'Abgeleitete Tabelle',
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
          '## جدول مشتق‌شده درون بند FROM',
          'وقتی یک زیرکوئری را در بند `FROM` قرار می‌دهید، خروجی آن به عنوان یک جدول مجازی موقت عمل می‌کند که به آن **Derived Table** می‌گویند.',
          '```sql',
          'SELECT category, n',
          'FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t',
          'ORDER BY n DESC;',
          '```',
          '> ⚠️ **قانون الزامی SQL:** جدول مشتق‌شده حتماً باید یک نام مستعار (مثل `t`) داشته باشد.',
        ],
        en: [
          '## Derived Tables (Subquery in FROM)',
          'When placed in the `FROM` clause, a subquery acts as an in-memory virtual table that can be queried, filtered, and sorted like any regular table.',
          '```sql',
          'SELECT category, n',
          'FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t',
          'ORDER BY n DESC;',
          '```',
          '> ⚠️ **SQL Rule:** SQL standards mandate that every derived table must have an alias (like `t`).',
        ],
        de: [
          '## Abgeleitete Tabellen (Unterabfrage in FROM)',
          'Steht eine Unterabfrage in der `FROM`-Klausel, dient ihr Ergebnis als temporäre virtuelle Tabelle, die gefiltert und sortiert werden kann.',
          '```sql',
          'SELECT category, n',
          'FROM (SELECT category, COUNT(*) AS n FROM products GROUP BY category) t',
          'ORDER BY n DESC;',
          '```',
          '> ⚠️ **Regel:** Eine abgeleitete Tabelle muss stets einen Tabellen-Alias (z. B. `t`) besitzen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'تعداد محصولات هر دسته‌بندی را درون یک جدول مشتق‌شده به نام `t` تجمیع کرده و دسته‌بندی‌ها را به همراه تعداد (`n`) به ترتیب نزولی تعداد نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Aggregate product counts per category in a derived table named `t`, ordering by `n` descending.',
        ],
        de: [
          '## Ziel der Übung',
          'Aggregieren Sie die Produktanzahl je Kategorie in einer abgeleiteten Tabelle `t` und sortieren Sie absteigend nach `n`.',
        ],
      },
    },
  ],
};

export const cteBasic: Level = {
  id: 'subq-cte',
  name: {
    fa: 'عبارت جدول مشترک (CTE / WITH)',
    en: 'CTE (Common Table Expression)',
    de: 'CTE (WITH-Klausel)',
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
          '## خوانایی بهتر کوئری‌ها با CTE (بند WITH)',
          'عبارت **CTE (Common Table Expression)** با کلمه کلیدی `WITH` شروع می‌شود و به شما اجازه می‌دهد مجموعه‌های داده موقت و نام‌گذاری‌شده بسازید.',
          '```sql',
          'WITH expensive AS (',
          '  SELECT id, name, price FROM products WHERE price > 50',
          ')',
          'SELECT name, price FROM expensive ORDER BY price DESC;',
          '```',
          'مزایای CTE:',
          '- خوانایی بالا از بالا به پایین (برخلاف زیرکوئری‌های تودرتو پیچیده).',
          '- امکان استفاده مکرر از یک CTE در بخش‌های مختلف کوئری.',
        ],
        en: [
          '## Common Table Expressions (WITH)',
          'A **CTE (Common Table Expression)** defined with `WITH` creates a clean, named temporary result set available to the rest of the statement.',
          '```sql',
          'WITH expensive AS (',
          '  SELECT id, name, price FROM products WHERE price > 50',
          ')',
          'SELECT name, price FROM expensive ORDER BY price DESC;',
          '```',
          'Advantages of CTEs:',
          '- Clear top-to-bottom reading flow, avoiding nested subquery clutter.',
          '- Can be referenced multiple times across subsequent joins and queries.',
        ],
        de: [
          '## Common Table Expressions (WITH)',
          'Ein **CTE** mit der `WITH`-Klausel definiert eine benannte temporäre Ergebnismenge für die nachfolgende Abfrage.',
          '```sql',
          'WITH expensive AS (',
          '  SELECT id, name, price FROM products WHERE price > 50',
          ')',
          'SELECT name, price FROM expensive ORDER BY price DESC;',
          '```',
          'Vorteile von CTEs:',
          '- Klare Lesbarkeit von oben nach unten ohne unübersichtliche Schachtelungen.',
          '- Kann mehrfach in der gleichen Abfrage wiederverwendet werden.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'با استفاده از یک CTE به نام `expensive`، کالاهای با قیمت بیشتر از ۵۰ را استخراج کرده و سپس نام و قیمت آن‌ها را به ترتیب نزولی قیمت نمایش دهید.',
        ],
        en: [
          '## Challenge Objective',
          'Create a CTE named `expensive` for products priced above 50, then select `name` and `price` ordered by price descending.',
        ],
        de: [
          '## Ziel der Übung',
          'Erstellen Sie ein CTE namens `expensive` für Produkte über 50 und geben Sie `name` und `price` absteigend nach Preis aus.',
        ],
      },
    },
  ],
};

export const recursiveCte: Level = {
  id: 'subq-recursive',
  name: {
    fa: 'عبارت بازگشتی (Recursive CTE)',
    en: 'Recursive CTE',
    de: 'Rekursives CTE',
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
          '## پیمایش داده‌های درختی با Recursive CTE',
          'ساختار `WITH RECURSIVE` یکی از پیشرفته‌ترین امکانات SQL برای پیمایش گراف‌ها، سلسله‌مراتب سازمانی و درخت‌ها است.',
          'الگوی استاندارد بازگشتی شامل دو بخش متصل با `UNION ALL` است:',
          '1. **عضو پایه (Anchor):** ریشه درخت را انتخاب می‌کند (مثلاً مدیرعاملی که `manager_id IS NULL` است با عمق ۰).',
          '2. **عضو بازگشتی (Recursive member):** رکوردهای بعدی را به نتایج مرحله قبلی متصل کرده و عمق را افزایش می‌دهد (`depth + 1`).',
          'حلقه تا زمانی تکرار می‌شود که هیچ ردیف جدیدی برای اتصال باقی نماند.',
        ],
        en: [
          '## Traversing Hierarchies with Recursive CTEs',
          '`WITH RECURSIVE` allows SQL to traverse trees, organograms, and graphs.',
          'It consists of two unified sections connected via `UNION ALL`:',
          '1. **Anchor Member:** Selects root nodes (e.g. CEO where `manager_id IS NULL` with `depth = 0`).',
          '2. **Recursive Member:** Joins the underlying table back to the accumulating CTE, incrementing `depth + 1`.',
          'The engine repeats until no new children are found.',
        ],
        de: [
          '## Hierarchien traversieren mit rekursiven CTEs',
          '`WITH RECURSIVE` ermöglicht das Durchlaufen von Baumstrukturen und Organigrammen in SQL.',
          'Es besteht aus zwei Teilen, verbunden durch `UNION ALL`:',
          '1. **Basiselement (Anchor):** Wählt die Wurzelzeilen aus (`manager_id IS NULL` mit `depth = 0`).',
          '2. **Rekursives Element:** Verknüpft untergeordnete Datensätze mit dem CTE und erhöht die Tiefe (`depth + 1`).',
          'Der Prozess endet, sobald keine weiteren Untergebenen mehr existieren.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله',
          'چارت سازمانی را مسطح کنید: شناسه، نام و عمق سازمانی (`depth`) هر کارمند نسبت به مدیرعامل را محاسبه کرده و به ترتیب `depth` و سپس `id` مرتب کنید.',
        ],
        en: [
          '## Challenge Objective',
          'Flatten the organization chart: return `id`, `name`, and `depth` from the CEO, ordered by `depth` then `id`.',
        ],
        de: [
          '## Ziel der Übung',
          'Lösen Sie das Organigramm auf: Geben Sie `id`, `name` und die Tiefe (`depth`) bezüglich des CEOs aus, sortiert nach `depth` und `id`.',
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
