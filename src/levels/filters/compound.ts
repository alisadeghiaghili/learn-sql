/**
 * Filters sequence — compound predicates and pattern matching.
 * Natural, engaging pedagogy with visual mental models,
 * common pitfalls, and fluent trilingual support (fa, en, de).
 */

import { shopSchema, shopSeed } from '../shopSchema';
import type { Level } from '../types';

export const andOr: Level = {
  id: 'filters-and-or',
  name: {
    fa: 'ترکیب شرط‌های منطقی (AND و OR)',
    en: 'Combining Logic (AND / OR)',
    de: 'Logische Verknüpfungen (AND / OR)',
  },
  hint: {
    fa: "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
    en: "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
    de: "SELECT name FROM customers WHERE city = 'London' OR city = 'New York';",
  },
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
      markdowns: {
        fa: [
          '## منطق چراغ راهنما (AND در برابر OR) 🚦',
          'تصور کنید به نگهبان یک ساختمان می‌گویید چه کسانی اجازه ورود دارند:',
          '- اگر بگویید: «کارت دعوت داشته باشد **AND** لباس رسمی پوشیده باشد» ➔ شخص باید **هر دو شرط** را هم‌زمان داشته باشد، وگرنه رد می‌شود.',
          '- اگر بگویید: «کارت دعوت داشته باشد **OR** کارمند شرکت باشد» ➔ داشتن **حتی یکی از این دو شرط** برای ورود کافی است.',
          'در SQL، عملگر `AND` سخت‌گیرانه و عملگر `OR` منعطف است.',
        ],
        en: [
          '## The Bouncer Analogy (AND vs OR) 🚦',
          'Imagine instructions given to a security gatekeeper:',
          '- "Has invitation ticket **AND** wearing formal suit" ➔ Both criteria must strictly be satisfied simultaneously.',
          '- "Has invitation ticket **OR** is verified company employee" ➔ Fulfilling **either single criterion** grants entry.',
          'In SQL query filtering, `AND` narrows result sets down, while `OR` broadens candidate sets.',
        ],
        de: [
          '## Die Einlasskontrolle (AND vs OR) 🚦',
          'Stellen Sie sich Anweisungen für einen Sicherheitsdienst vor:',
          '- „Hat Einladung **AND** trägt Abendkleidung“ ➔ Beide Kriterien müssen zwingend erfüllt sein.',
          '- „Hat Einladung **OR** ist Mitarbeiter“ ➔ **Mindestens ein Kriterium** genügt für den Einlass.',
          'In SQL verengt `AND` das Suchergebnis, während `OR` das Ergebnis erweitert.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## دام بزرگ تقدم عملگرها (Operator Precedence) ⚠️',
          'در ریاضیات ضرب قبل از جمع انجام می‌شود؛ در زبان SQL نیز **`AND` همیشه قبل از `OR`** ارزیابی می‌شود!',
          '```sql',
          "-- خطر: این کوئری آنچه فکر می‌کنید انجام نمی‌دهد!",
          "WHERE city = 'London' OR city = 'Paris' AND signup_year = 2020",
          '```',
          'موتور پایگاه‌داده عبارت بالا را این‌گونه می‌خواند: تمام لندنی‌ها (با هر سالی!) یا پاریسی‌های سال ۲۰۲۰.',
          '> 💡 **قانون طلایی مهندسی:** هر زمان که `AND` و `OR` را با هم ترکیب می‌کنید، **حتماً از پرانتز `( )`** استفاده کنید تا تقدم شرط‌ها کاملاً صریح و بدون ابهام باشد.',
        ],
        en: [
          '## The Critical Operator Precedence Trap ⚠️',
          'Just as multiplication precedes addition in arithmetic, in SQL **`AND` binds tighter than `OR`**!',
          '```sql',
          "-- Trap: Evaluates differently than common human reading intuition!",
          "WHERE city = 'London' OR city = 'Paris' AND signup_year = 2020",
          '```',
          'The engine evaluates `Paris AND 2020` first, then unions anyone from London regardless of signup year!',
          '> 💡 **Golden Rule:** Whenever mixing `AND` with `OR`, **always use parentheses `( )`** to explicitly enforce intended business logic boundaries.',
        ],
        de: [
          '## Die Falle der Operatorrangfolge ⚠️',
          'Wie Punktrechnung vor Strichrechnung in der Mathematik, **bindet `AND` in SQL stärker als `OR`**!',
          '```sql',
          "-- Vorsicht: Wird anders interpretiert als intuitiv vermutet!",
          "WHERE city = 'London' OR city = 'Paris' AND signup_year = 2020",
          '```',
          'Das System bindet `Paris AND 2020` zuerst zusammen und liefert Londoner unabhängig vom Jahr.',
          '> 💡 **Goldene Regel:** Setzen Sie beim Kombinieren von `AND` und `OR` **stets Klammern `( )`**.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          "نام مشتریانی را بیابید که در لندن یا در نیویورک زندگی می‌کنند (`city = 'London' OR city = 'New York'`).",
        ],
        en: [
          '## Challenge Objective 🎯',
          "Return the names of customers located in either London or New York (`city = 'London' OR city = 'New York'`).",
        ],
        de: [
          '## Ziel der Übung 🎯',
          "Geben Sie die Namen der Kunden aus, die in London oder in New York leben (`city = 'London' OR city = 'New York'`).",
        ],
      },
    },
  ],
};

export const inBetween: Level = {
  id: 'filters-in-between',
  name: {
    fa: 'فیلتر تمیز با IN و بازه‌ای با BETWEEN',
    en: 'Clean Matching (IN & BETWEEN)',
    de: 'Elegante Filter (IN & BETWEEN)',
  },
  hint: {
    fa: "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
    en: "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
    de: "SELECT name FROM products WHERE category = 'Books' AND price BETWEEN 30 AND 50;",
  },
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
      markdowns: {
        fa: [
          '## رهایی از زنجیره‌های طولانی OR 🧹',
          'اگر بخواهید مشتریان ۵ شهر مختلف را فیلتر کنید، نوشتن `city = \'A\' OR city = \'B\' OR city = \'C\' ...` کد شما را شلوغ و مستعد خطا می‌کند.',
          'عملگر `IN` مانند یک **سبد انتخاب** است: بررسی می‌کند که آیا مقدار ستون درون لیست پیشنهادی شما وجود دارد یا خیر:',
          '```sql',
          "WHERE city IN ('London', 'Paris', 'Tokyo')",
          '```',
          'عملگر `BETWEEN` نیز به جای نوشتن `price >= 30 AND price <= 50`، یک بازه پیوسته و خوانا ایجاد می‌کند.',
        ],
        en: [
          '## Eliminating Tedious OR Chains 🧹',
          'Filtering across multiple candidate values with repetitive chains like `city = \'A\' OR city = \'B\' OR city = \'C\'` is noisy and error-prone.',
          'The `IN` operator functions like a **membership checklist**:',
          '```sql',
          "WHERE city IN ('London', 'Paris', 'Tokyo')",
          '```',
          'Likewise, `BETWEEN` expresses continuous inclusive ranges elegantly instead of verbose `>= AND <=` comparisons.',
        ],
        de: [
          '## Schluss mit langen OR-Ketten 🧹',
          'Das Aneinanderhängen vieler `OR`-Bedingungen (`city = \'A\' OR city = \'B\' ...`) ist unübersichtlich und fehleranfällig.',
          'Der `IN`-Operator prüft elegant, ob ein Wert in einer Wertemenge enthalten ist:',
          '```sql',
          "WHERE city IN ('London', 'Paris', 'Tokyo')",
          '```',
          'Ebenso ersetzt `BETWEEN` umständliche `>= AND <=` Konstrukte durch kompakte Bereichsabfragen.',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## نکته ریاضی مرزهای BETWEEN 📐',
          'یک سوال متداول: «آیا عددهای ابتدا و انتهای بازه هم جزو نتایج هستند؟»',
          '> **پاسخ قطعی:** بله! عملگر `BETWEEN a AND b` در استاندارد SQL **کاملاً فراگیر (Inclusive)** است. یعنی معادل دقیق `price >= a AND price <= b` بوده و هر دو عدد مرزی در نتایج خواهند بود.',
          'همچنین می‌توانید با عملگر `NOT` آن‌ها را معکوس کنید: `NOT IN (...)` یا `NOT BETWEEN a AND b`.',
        ],
        en: [
          '## Boundary Inclusivity in BETWEEN 📐',
          'A frequent interview question: "Are boundaries included in BETWEEN?"',
          '> **Definitive Answer:** Yes! In ANSI SQL, `BETWEEN a AND b` is **strictly inclusive** on both edges: `price >= a AND price <= b`. If an item costs exactly 30 or 50, it matches.',
          'Both operators support clean negation via `NOT IN (...)` and `NOT BETWEEN a AND b`.',
        ],
        de: [
          '## Grenzwerte bei BETWEEN 📐',
          'Eine häufige Frage: „Sind die Grenzwerte bei BETWEEN enthalten?“',
          '> **Klare Antwort:** Ja! In SQL ist `BETWEEN a AND b` **vollständig inklusiv**: `price >= a AND price <= b`. Genau 30 oder 50 sind gültige Treffer.',
          'Beide Operatoren können mit `NOT` negiert werden (`NOT IN`, `NOT BETWEEN`).',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          "نام محصولاتی از دسته کتاب‌ها (`category = 'Books'`) را بیابید که قیمت آن‌ها بین ۳۰ تا ۵۰ دلار است (`price BETWEEN 30 AND 50`).",
        ],
        en: [
          '## Challenge Objective 🎯',
          "Return the names of products in the Books category (`category = 'Books'`) whose price is between 30 and 50 inclusive (`price BETWEEN 30 AND 50`).",
        ],
        de: [
          '## Ziel der Übung 🎯',
          "Ermitteln Sie die Namen aller Bücher (`category = 'Books'`) mit einem Preis zwischen 30 und 50 (`price BETWEEN 30 AND 50`).",
        ],
      },
    },
  ],
};

export const likeNull: Level = {
  id: 'filters-like-null',
  name: {
    fa: 'جستجوی الگو (LIKE) و منطق سه‌ارزشی NULL',
    en: 'Pattern Matching & Three-Valued Logic',
    de: 'Mustersuche & Drei-wertige NULL-Logik',
  },
  hint: {
    fa: "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
    en: "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
    de: "SELECT name, city FROM customers WHERE name LIKE 'A%' OR city IS NULL;",
  },
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
      markdowns: {
        fa: [
          '## کارت‌های وایلدکارت در جستجوی متنی 🃏',
          'وقتی دقیقاً نمی‌دانید کاربر چه کلمه‌ای را تایپ کرده، عملگر `LIKE` جستجوی انعطاف‌پذیر ارائه می‌دهد:',
          "- علامت درصد `%`: جانشین **هر تعداد کاراکتر** (از صفر تا بی‌نهایت حرف). مثلاً `'A%'` یعنی هر کلمه‌ای که با حرف A شروع شود.",
          "- علامت خط زیرین `_`: جانشین **دقیقاً یک کاراکتر**. مثلاً `'h_t'` کلمات hat و hit را پیدا می‌کند.",
        ],
        en: [
          '## Wildcard Characters with LIKE 🃏',
          'When exact string matching is insufficient, the `LIKE` pattern matching operator allows fuzzy searches:',
          "- `%` (Percent): Wildcard matching **zero or more characters**. E.g., `'A%'` matches any string starting with letter A.",
          "- `_` (Underscore): Wildcard matching **exactly one single character**. E.g., `'h_t'` matches hat, hit, hot.",
        ],
        de: [
          '## Wildcards mit LIKE 🃏',
          'Wenn der genaue Text nicht bekannt ist, ermöglicht der `LIKE`-Operator flexible Mustersuchen:',
          "- `%` (Prozent): Platzhalter für **beliebig viele Zeichen** (0 bis unendlich). `'A%'` findet alle Wörter, die mit A beginnen.",
          "- `_` (Unterstrich): Platzhalter für **exakt ein einzelnes Zeichen**. `'h_t'` findet z. B. hat oder hot.",
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## منطق سه‌ارزشی و معمای بزرگ NULL 🤯',
          'در SQL برخلاف زبان‌های دیگر، منطق دوارزشی نیست (فقط درست و غلط نداریم)؛ بلکه **منطق سه‌ارزشی (Three-Valued Logic)** داریم: `TRUE`، `FALSE` و `UNKNOWN`.',
          'مقدار `NULL` به معنی عدد صفر یا متن خالی نیست؛ بلکه به معنای **«ناشناخته یا نامعلوم»** است.',
          '### خطرناک‌ترین خطای مبتدیان:',
          'اگر بنویسید `WHERE city = NULL`، خروجی همیشه خالی خواهد بود! چون دیتابیس می‌گوید: «نمی‌دانم شهر چیست، پس نمی‌توانم بگویم با یک مقدار نامعلوم برابر است یا نه!»',
          '> ⚠️ **قانون قطعی پایگاه‌داده:** برای سنجش مقادیر خالی، هرگز از علامت مساوی استفاده نکنید. **همیشه بنویسید `IS NULL` یا `IS NOT NULL`.**',
        ],
        en: [
          '## Three-Valued Logic & The Mystery of NULL 🤯',
          'Unlike binary Boolean logic, SQL implements **Three-Valued Logic**: `TRUE`, `FALSE`, and `UNKNOWN`.',
          '`NULL` is not zero, and it is not an empty string `""`. It signifies **missing, unknown information**.',
          '### The Deadliest Beginner Trap:',
          'Writing `WHERE city = NULL` will **NEVER** return any rows! Comparing anything to NULL evaluates to UNKNOWN, which the WHERE clause discards.',
          '> ⚠️ **Unbreakable Law of SQL:** Never test NULL with equality `=`. **Always use `IS NULL` or `IS NOT NULL`.**',
        ],
        de: [
          '## Drei-wertige Logik & das Geheimnis von NULL 🤯',
          'SQL verwendet eine **drei-wertige Logik**: `TRUE`, `FALSE` und `UNKNOWN`.',
          '`NULL` ist weder Null noch ein leerer Text, sondern bedeutet **unbekannt / fehlend**.',
          '### Die häufigste Fehlerquelle:',
          'Der Ausdruck `WHERE city = NULL` liefert niemals ein Ergebnis! Vergleiche mit NULL ergeben immer UNKNOWN.',
          '> ⚠️ **Goldene Regel:** Vergleichen Sie NULL niemals mit `=`. **Nutzen Sie immer `IS NULL` oder `IS NOT NULL`.**',
        ],
      },
    },
    {
      type: 'modal',
      markdowns: {
        fa: [
          '## مأموریت این مرحله 🎯',
          "نام و شهر مشتریانی را استخراج کنید که نام آن‌ها با حرف A شروع می‌شود یا شهر آن‌ها ثبت نشده و خالی است (`name LIKE 'A%' OR city IS NULL`).",
        ],
        en: [
          '## Challenge Objective 🎯',
          "Return the `name` and `city` of customers whose name begins with 'A' or whose city is recorded as NULL (`name LIKE 'A%' OR city IS NULL`).",
        ],
        de: [
          '## Ziel der Übung 🎯',
          "Geben Sie `name` und `city` von Kunden aus, deren Name mit 'A' beginnt oder deren Stadt NULL ist (`name LIKE 'A%' OR city IS NULL`).",
        ],
      },
    },
  ],
};

export const filtersLevels: Level[] = [andOr, inBetween, likeNull];
