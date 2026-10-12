/**
 * Level sequences registry with trilingual support (fa, en, de).
 */

import type { Level, SequenceInfo, Localized } from './types';
import { introLevels } from './intro/selectBasics';
import { filtersLevels } from './filters/compound';
import { joinsLevels } from './joins/joinBasics';
import { groupsLevels } from './groups/aggregates';
import { functionLevels } from './functions';
import { advancedJoinLevels } from './advanced-joins';
import { subqueryLevels } from './subqueries';
import { windowLevels } from './window';
import { ddlLevels } from './ddl';
import { dmlLevels } from './dml';
import { setOpsLevels } from './set-ops';
import { viewLevels } from './views';
import { performanceLevels } from './performance';
import { transactionLevels } from './transactions';
import { shopSchema, shopSeed } from './shopSchema';

export const sequences: SequenceInfo[] = [
  {
    id: 'intro',
    displayName: {
      fa: '۱. مفاهیم پایه و استخراج داده‌ها (SELECT)',
      en: '1. Introduction to SELECT',
      de: '1. Einführung in SELECT',
    },
    about: {
      fa: 'انتخاب ستون‌ها، فیلتر ردیف‌ها با WHERE، مرتب‌سازی با ORDER BY و محدود کردن نتایج با LIMIT.',
      en: 'SELECT, columns, WHERE filtering, ORDER BY, and LIMIT.',
      de: 'SELECT, Spalten, WHERE-Filter, ORDER BY und LIMIT.',
    },
    levels: introLevels,
  },
  {
    id: 'filters',
    displayName: {
      fa: '۲. شرط‌ها و فیلترهای پیشرفته (WHERE)',
      en: '2. Advanced Filtering',
      de: '2. Erweiterte Filterung',
    },
    about: {
      fa: 'شرط‌های ترکیبی AND / OR، عملگرهای IN و BETWEEN، الگوهای متنی LIKE و رفتار مقادیر NULL.',
      en: 'Compound predicates, IN, BETWEEN, LIKE pattern matching, and NULL handling.',
      de: 'Zusammengesetzte Prädikate, IN, BETWEEN, LIKE-Muster und NULL-Werte.',
    },
    levels: filtersLevels,
  },
  {
    id: 'joins',
    displayName: {
      fa: '۳. اتصال و پیوند جدول‌ها (JOINs)',
      en: '3. Joining Tables',
      de: '3. Tabellen verknüpfen (JOIN)',
    },
    about: {
      fa: 'اتصال درونی (INNER JOIN) و اتصال بیرونی چپ (LEFT JOIN) با دیاگرام‌های مفهومی و بصری.',
      en: 'INNER JOIN and LEFT JOIN across customers, products, and orders with visual schematics.',
      de: 'INNER JOIN und LEFT JOIN über Tabellen hinweg mit visuellen Spickzettel-Diagrammen.',
    },
    levels: joinsLevels,
  },
  {
    id: 'groups',
    displayName: {
      fa: '۴. تجمیع و گروه‌بندی داده‌ها (GROUP BY)',
      en: '4. Aggregation & Groups',
      de: '4. Aggregation & Gruppierung',
    },
    about: {
      fa: 'توابع تجمیعی COUNT، SUM، AVG و فیلتر کردن خروجی گروه‌ها با شرط HAVING.',
      en: 'Aggregate functions (COUNT, SUM, AVG), GROUP BY, and HAVING.',
      de: 'Aggregatfunktionen (COUNT, SUM, AVG), GROUP BY und HAVING.',
    },
    levels: groupsLevels,
  },
  {
    id: 'functions',
    displayName: {
      fa: '۵. توابع محاسباتی و منطق شرطی (Functions & CASE)',
      en: '5. Functions & Conditional Logic',
      de: '5. Funktionen & CASE-Logik',
    },
    about: {
      fa: 'توابع متنی، ریاضی و تاریخ، عبارت‌های شرطی CASE WHEN، مدیریت مقادیر تهی با COALESCE و تبدیل نوع با CAST.',
      en: 'String, math, and date helpers, CASE expressions, COALESCE, and type CAST.',
      de: 'Text-, Mathe- und Datumsfunktionen, CASE-Ausdrücke, COALESCE und Typumwandlung.',
    },
    levels: functionLevels,
  },
  {
    id: 'advanced-joins',
    displayName: {
      fa: '۶. اتصال‌های پیشرفته (Advanced JOINs)',
      en: '6. Advanced Joins',
      de: '6. Fortgeschrittene JOINs',
    },
    about: {
      fa: 'ضرب دکارتی CROSS JOIN، اتصال جدول به خود SELF JOIN، اتصالات RIGHT JOIN و FULL OUTER JOIN با دیاگرام‌های بصری.',
      en: 'CROSS, SELF, RIGHT, and FULL OUTER joins with visual schematics.',
      de: 'CROSS, SELF, RIGHT und FULL OUTER JOINs mit visuellen Diagrammen.',
    },
    levels: advancedJoinLevels,
  },
  {
    id: 'subqueries',
    displayName: {
      fa: '۷. زیرکوئری‌ها و عبارات جدول مشترک (Subqueries & CTEs)',
      en: '7. Subqueries & CTEs',
      de: '7. Unterabfragen & CTEs',
    },
    about: {
      fa: 'زیرکوئری‌های تک‌مقداری (Scalar)، عملگرهای IN و EXISTS، جدول‌های مشتق‌شده و CTEهای بازگشتی.',
      en: 'Scalar / IN / EXISTS subqueries, derived tables, WITH (CTEs), and recursive hierarchies.',
      de: 'Skalare / IN / EXISTS Unterabfragen, abgeleitete Tabellen, WITH (CTEs) und rekursive CTEs.',
    },
    levels: subqueryLevels,
  },
  {
    id: 'window',
    displayName: {
      fa: '۸. توابع پنجره‌ای و تحلیلی (Window Functions)',
      en: '8. Window Functions',
      de: '8. Fensterfunktionen',
    },
    about: {
      fa: 'رتبه‌بندی با RANK و DENSE_RANK، محاسبه مجموع تجمعی (Running Total)، افراز با PARTITION BY و توابع LAG/LEAD.',
      en: 'Ranking (RANK, DENSE_RANK), running totals, PARTITION BY, and positional LAG/LEAD.',
      de: 'Rangbildung (RANK, DENSE_RANK), laufende Summen, PARTITION BY und LAG/LEAD.',
    },
    levels: windowLevels,
  },
  {
    id: 'ddl',
    displayName: {
      fa: '۹. ساختار و معماری پایگاه‌داده (DDL)',
      en: '9. DDL & Schema Design',
      de: '9. DDL & Schemaentwurf',
    },
    about: {
      fa: 'تعریف جداول با CREATE، تغییر ساختار با ALTER، حذف با DROP و تعیین قیود PRIMARY KEY، UNIQUE و CHECK.',
      en: 'CREATE, ALTER, DROP, SQL storage data types, and integrity constraints.',
      de: 'CREATE, ALTER, DROP, SQL-Datentypen und Integritätsbedingungen (Constraints).',
    },
    levels: ddlLevels,
  },
  {
    id: 'dml',
    displayName: {
      fa: '۱۰. درج، ویرایش و حذف داده‌ها (DML)',
      en: '10. Modifying Data (DML)',
      de: '10. Datenmodifikation (DML)',
    },
    about: {
      fa: 'درج تکی و گروهی با INSERT، ویرایش رکوردها با UPDATE، حذف با DELETE و الگوی مدرن و اتمیک UPSERT.',
      en: 'Single & bulk INSERT, UPDATE, DELETE, and atomic UPSERT (ON CONFLICT).',
      de: 'Einzel- und Bulk-INSERT, UPDATE, DELETE und atomare UPSERT-Operationen.',
    },
    levels: dmlLevels,
  },
  {
    id: 'set-ops',
    displayName: {
      fa: '۱۱. عملگرهای مجموعه‌ای (Set Operations)',
      en: '11. Set Operations',
      de: '11. Mengenoperationen',
    },
    about: {
      fa: 'اجتماع داده‌ها با UNION و UNION ALL، اشتراک با INTERSECT و تفاضل با EXCEPT همراه با دیاگرام‌های ون.',
      en: 'UNION, UNION ALL, INTERSECT, and EXCEPT with visual set schematics.',
      de: 'UNION, UNION ALL, INTERSECT und EXCEPT mit visuellen Mengen-Diagrammen.',
    },
    levels: setOpsLevels,
  },
  {
    id: 'views',
    displayName: {
      fa: '۱۲. نماها و کش کردن نتایج (Views)',
      en: '12. Views & Materialized Patterns',
      de: '12. Views & Materialized Patterns',
    },
    about: {
      fa: 'ساخت نمای مجازی با CREATE VIEW، ساده‌سازی جوین‌های پیچیده و الگوی کش نمای مادی (Materialized View).',
      en: 'CREATE VIEW, encapsulating joins/aggregates, and the materialized-view caching pattern.',
      de: 'CREATE VIEW, Kapselung komplexer Verknüpfungen und Materialized-View Caching-Muster.',
    },
    levels: viewLevels,
  },
  {
    id: 'performance',
    displayName: {
      fa: '۱۳. ایندکس‌ها و افزایش کارایی (Performance)',
      en: '13. Indexes & Performance Tuning',
      de: '13. Indizes & Performance-Tuning',
    },
    about: {
      fa: 'ساخت ایندکس‌های درخت B، تحلیل پلن اجرای کوئری با EXPLAIN، ایندکس‌های مرکب و تکنیک‌های بهینه‌سازی.',
      en: 'B-Tree indexes, EXPLAIN QUERY PLAN inspection, composite indexes, and query tuning.',
      de: 'B-Tree Indizes, EXPLAIN QUERY PLAN Analyse, zusammengesetzte Indizes und Tuning.',
    },
    levels: performanceLevels,
  },
  {
    id: 'transactions',
    displayName: {
      fa: '۱۴. تراکنش‌ها و تضمین‌های ACID',
      en: '14. Transactions & ACID',
      de: '14. Transaktionen & ACID',
    },
    about: {
      fa: 'شروع و تثبیت تراکنش با BEGIN و COMMIT، بازگردانی با ROLLBACK، انتقال امن داده و اصول چهارگانه ACID.',
      en: 'BEGIN, COMMIT, ROLLBACK, atomic transfers, and the ACID transactional guarantees.',
      de: 'BEGIN, COMMIT, ROLLBACK, atomare Überweisungen und die ACID-Garantien.',
    },
    levels: transactionLevels,
  },
];

export const allLevels: Level[] = sequences.flatMap((s) => s.levels);

export function getLevel(id: string): Level | undefined {
  return allLevels.find((l) => l.id === id);
}

export function getNextLevel(id: string): Level | undefined {
  const idx = allLevels.findIndex((l) => l.id === id);
  if (idx < 0 || idx + 1 >= allLevels.length) return undefined;
  return allLevels[idx + 1];
}

export function getSequenceForLevel(id: string): SequenceInfo | undefined {
  return sequences.find((s) => s.levels.some((l) => l.id === id));
}

/**
 * Returns level difficulty 1-5 dots.
 * If explicitly defined on level, uses it; otherwise calculates based on topic complexity.
 */
export function getLevelDifficulty(level: Level): 1 | 2 | 3 | 4 | 5 {
  if (level.difficulty) return level.difficulty;
  const seq = getSequenceForLevel(level.id);
  const seqId = seq?.id ?? '';
  switch (seqId) {
    case 'intro':
      return 1;
    case 'filters':
    case 'dml':
    case 'ddl':
      return 2;
    case 'joins':
    case 'groups':
    case 'functions':
    case 'set-ops':
    case 'views':
      return 3;
    case 'advanced-joins':
    case 'performance':
    case 'transactions':
      return 4;
    case 'subqueries':
    case 'window':
      return 5;
    default:
      return 3;
  }
}

export { shopSchema, shopSeed };
export type { Level, SequenceInfo, Localized };
