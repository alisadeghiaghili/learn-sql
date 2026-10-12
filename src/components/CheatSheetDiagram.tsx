/**
 * RStudio / dplyr cheat-sheet style schematic diagrams for SQL operations.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import type { Locale } from '../i18n';

export type DiagramType =
  | 'select-projection'
  | 'where-filter'
  | 'order-limit'
  | 'group-by'
  | 'inner-join'
  | 'left-join'
  | 'right-join'
  | 'full-join'
  | 'cross-join'
  | 'self-join'
  | 'union'
  | 'union-all'
  | 'intersect'
  | 'except';

interface CheatSheetDiagramProps {
  type?: string;
  locale?: Locale;
}

const KEY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  '1': { bg: '#0d9488', text: '#ffffff', label: '1' },
  '2': { bg: '#2563eb', text: '#ffffff', label: '2' },
  '3': { bg: '#ea580c', text: '#ffffff', label: '3' },
  '4': { bg: '#9333ea', text: '#ffffff', label: '4' },
  'A': { bg: '#0284c7', text: '#ffffff', label: 'A' },
  'B': { bg: '#d97706', text: '#ffffff', label: 'B' },
  'Books': { bg: '#d97706', text: '#ffffff', label: 'Books' },
  'Hardware': { bg: '#0d9488', text: '#ffffff', label: 'Hardware' },
  'London': { bg: '#2563eb', text: '#ffffff', label: 'London' },
  'null': { bg: '#334155', text: '#94a3b8', label: 'NULL' },
};

function KeyBadge({ val }: { val: string | number | null }) {
  if (val === null || val === 'NULL') {
    return <span className="cs-badge cs-null">NULL</span>;
  }
  const keyStr = String(val);
  const conf = KEY_COLORS[keyStr] ?? { bg: '#475569', text: '#ffffff', label: keyStr };
  return (
    <span
      className="cs-badge"
      style={{ backgroundColor: conf.bg, color: conf.text }}
      title={`Key ${keyStr}`}
    >
      {keyStr}
    </span>
  );
}

const TEXTS: Record<Locale, Record<string, string>> = {
  fa: {
    sheetBadge: 'چیت‌شیت به سبک RStudio',
    tblLeft: 'جدول A (سمت چپ / x)',
    tblRight: 'جدول B (سمت راست / y)',
    tblLeftPreserved: 'جدول A (چپ — محفوظ)',
    tblRightPreserved: 'جدول B (راست — محفوظ)',
    tblLeftHighlight: 'جدول A (سمت چپ)',
    tblRightHighlight: 'جدول B (سمت راست)',
    tblInput: 'جدول ورودی (داده‌های خام)',
    resInner: 'نتیجه (فقط کلیدهای مشترک)',
    resLeft: 'نتیجه (تمام ردیف‌های چپ)',
    resRight: 'نتیجه (تمام ردیف‌های راست)',
    resFull: 'نتیجه (حفظ کامل دو جدول)',
    resCross: '۲ × ۳ = ۶ جفت خروجی',
    resSelf: 'نتیجه (کارمند و مدیر)',
    resSelect: 'خروجی (فقط ستون‌های دلخواه)',
    resWhere: 'خروجی (فقط ردیف‌های منطبق)',
    resOrderLimit: 'خروجی (مرتب‌شده و برش‌خورده)',
    resGroupBy: 'خروجی (ردیف‌های فشرده و آمار)',
    drop: '✕ حذف',
    keep: '✓ محفوظ',
    ruleInner: 'فقط ردیف‌هایی حفظ می‌شوند که کلید آن‌ها در هر دو جدول وجود داشته باشد (کلیدهای ۱ و ۲). ردیف‌های ۳ و ۴ دور ریخته می‌شوند.',
    ruleLeft: 'تمام ردیف‌های جدول سمت چپ حفظ می‌شوند. برای ردیف‌های بدون جفت در جدول راست، مقادیر با NULL پر می‌شوند.',
    ruleRight: 'تمام ردیف‌های جدول سمت راست حفظ می‌شوند. (در SQLite: جای دو جدول را عوض کرده و از LEFT JOIN استفاده کنید).',
    ruleFull: 'تمام ردیف‌ها از هر دو جدول حفظ می‌شوند و بخش‌های بدون جفت با NULL پر می‌شوند.',
    ruleCross: 'هر ردیف جدول چپ با تمام ردیف‌های جدول راست ترکیب می‌شود (ضرب دکارتی N × M بدون شرط ON).',
    ruleSelf: 'اتصال جدول به خودش با دو نام مستعار مجزا برای داده‌های سلسله‌مراتبی و درختی.',
    ruleSelect: 'عملیات Projection عمودی: فقط ستون‌های اعلام‌شده در SELECT حفظ می‌شوند و ستون‌های زائد کنار گذاشته می‌شوند.',
    ruleWhere: 'عملیات Filter افقی: ردیف‌ها تک‌تک بررسی می‌شوند. ردیف‌های با شرط نادرست یا NULL دور ریخته می‌شوند.',
    ruleOrderLimit: 'ردیف‌ها بر اساس ستون مرتب شده (DESC یا ASC) و دستور LIMIT فقط N ردیف بالای جدول مرتب‌شده را برش می‌زند.',
    ruleGroupBy: 'ردیف‌های با دسته یکسان فشرده شده و مقادیر دیگر توسط توابعی مثل COUNT یا SUM در یک عدد خلاصه می‌شوند.',
    setA: 'مجموعه A',
    setB: 'مجموعه B',
    setResult: 'خروجی',
  },
  en: {
    sheetBadge: 'RStudio Style Cheat Sheet',
    tblLeft: 'Table A (Left / x)',
    tblRight: 'Table B (Right / y)',
    tblLeftPreserved: 'Table A (Left — Preserved)',
    tblRightPreserved: 'Table B (Right — Preserved)',
    tblLeftHighlight: 'Table A (Left)',
    tblRightHighlight: 'Table B (Right)',
    tblInput: 'Input Table (Raw Rows)',
    resInner: 'Result (Matching Keys Only)',
    resLeft: 'Result (All Left Rows)',
    resRight: 'Result (All Right Rows)',
    resFull: 'Result (Full Outer Merge)',
    resCross: '2 × 3 = 6 Output Pairs',
    resSelf: 'Result (Employee & Manager)',
    resSelect: 'Result (Projected Columns Only)',
    resWhere: 'Result (Filtered Rows Only)',
    resOrderLimit: 'Result (Sorted & Top-N Sliced)',
    resGroupBy: 'Result (Aggregated Buckets)',
    drop: '✕ drop',
    keep: '✓ kept',
    ruleInner: 'Only rows with matching keys in BOTH tables are preserved (keys 1 & 2). Non-matching rows 3 and 4 are dropped.',
    ruleLeft: 'Keeps ALL rows from Table A (Left). When Table B has no match (key 3), its columns are filled with NULL.',
    ruleRight: 'Keeps ALL rows from Table B (Right). (In SQLite: swap table positions and use LEFT JOIN).',
    ruleFull: 'Keeps ALL rows from BOTH tables. Any side lacking a counterpart is padded with NULL.',
    ruleCross: 'Pairs EVERY row of Table A with EVERY row of Table B (Cartesian product: N × M rows without an ON clause).',
    ruleSelf: 'Joins a table to itself using two distinct aliases to traverse trees and hierarchical records.',
    ruleSelect: 'Vertical projection: only columns named in SELECT are extracted; unneeded columns are dropped from memory.',
    ruleWhere: 'Horizontal filtering: rows are tested individually. Non-matching rows evaluate to FALSE/NULL and are pruned.',
    ruleOrderLimit: 'Rows sort by key (ASC/DESC), and LIMIT n slices exactly the top n records from the sorted stream.',
    ruleGroupBy: 'Collapses identical bucket keys into single rows, summarizing data with aggregate functions like COUNT/SUM.',
    setA: 'Set A',
    setB: 'Set B',
    setResult: 'Result',
  },
  de: {
    sheetBadge: 'RStudio Spickzettel-Stil',
    tblLeft: 'Tabelle A (Links / x)',
    tblRight: 'Tabelle B (Rechts / y)',
    tblLeftPreserved: 'Tabelle A (Links — Beibehalten)',
    tblRightPreserved: 'Tabelle B (Rechts — Beibehalten)',
    tblLeftHighlight: 'Tabelle A (Links)',
    tblRightHighlight: 'Tabelle B (Rechts)',
    tblInput: 'Eingabetabelle (Rohdaten)',
    resInner: 'Ergebnis (Nur übereinstimmend)',
    resLeft: 'Ergebnis (Alle linken Zeilen)',
    resRight: 'Ergebnis (Alle rechten Zeilen)',
    resFull: 'Ergebnis (Vollständige Vereinigung)',
    resCross: '2 × 3 = 6 Zeilenpaare',
    resSelf: 'Ergebnis (Mitarbeiter & Manager)',
    resSelect: 'Ergebnis (Nur gewählte Spalten)',
    resWhere: 'Ergebnis (Gefilterte Zeilen)',
    resOrderLimit: 'Ergebnis (Sortiert & Begrenzt)',
    resGroupBy: 'Ergebnis (Aggregierte Gruppen)',
    drop: '✕ verworfen',
    keep: '✓ beibehalten',
    ruleInner: 'Nur Zeilen mit übereinstimmenden Schlüsseln in BEIDEN Tabellen bleiben erhalten (1 & 2). Schlüssel 3 und 4 entfallen.',
    ruleLeft: 'Behält ALLE Zeilen der linken Tabelle bei. Nicht vorhandene Werte der rechten Tabelle werden mit NULL aufgefüllt.',
    ruleRight: 'Behält ALLE Zeilen der rechten Tabelle bei. (In SQLite: Tabellenreihenfolge vertauschen und LEFT JOIN nutzen).',
    ruleFull: 'Behält ALLE Zeilen beider Tabellen bei. Fehlende Werte werden beidseitig mit NULL ergänzt.',
    ruleCross: 'Kombiniert JEDE Zeile von Tabelle A mit JEDER Zeile von Tabelle B (kartesisches Produkt: N × M Zeilen ohne ON-Bedingung).',
    ruleSelf: 'Verknüpft eine Tabelle mit sich selbst über zwei Aliase zur Darstellung von Hierarchien.',
    ruleSelect: 'Vertikale Projektion: Nur im SELECT genannte Spalten werden geladen; überflüssige Spalten entfallen.',
    ruleWhere: 'Horizontale Filterung: Jede Zeile wird geprüft. Zeilen ohne Übereinstimmung werden verworfen.',
    ruleOrderLimit: 'Zeilen werden sortiert (ASC/DESC) und LIMIT n schneidet exakt die ersten n Zeilen heraus.',
    ruleGroupBy: 'Fasst Zeilen mit gleichem Schlüssel zusammen und aggregiert Werte mit Funktionen wie COUNT oder SUM.',
    setA: 'Menge A',
    setB: 'Menge B',
    setResult: 'Ergebnis',
  },
};

export function CheatSheetDiagram({ type, locale = 'fa' }: CheatSheetDiagramProps) {
  if (!type) return null;
  const txt = TEXTS[locale] ?? TEXTS.en;
  const isRtl = locale === 'fa';

  switch (type) {
    case 'select-projection':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>SELECT name, city (Projection)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header">{txt.tblInput}</div>
              <div className="cs-row-header">
                <span>id [drop]</span>
                <span style={{ color: '#2ec4b6' }}>name [✓]</span>
                <span style={{ color: '#2ec4b6' }}>city [✓]</span>
                <span>year [drop]</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                  <span>London</span>
                  <span style={{ opacity: 0.4 }}>2019</span>
                </div>
                <div className="cs-row">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                  <span>Manchester</span>
                  <span style={{ opacity: 0.4 }}>2020</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resSelect}</div>
              <div className="cs-row-header">
                <span>name</span>
                <span>city</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <span>Ada</span>
                  <span>London</span>
                </div>
                <div className="cs-row matched">
                  <span>Alan</span>
                  <span>Manchester</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>SELECT:</strong> {txt.ruleSelect}
            </div>
          </div>
        </div>
      );

    case 'where-filter':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>WHERE city = 'London' (Row Filter)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header">{txt.tblInput}</div>
              <div className="cs-row-header">
                <span>name</span>
                <span>city</span>
                <span>Match?</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <span>Ada</span>
                  <span>London</span>
                  <span className="cs-keep-flag">TRUE ✓</span>
                </div>
                <div className="cs-row dropped">
                  <span>Alan</span>
                  <span>Manchester</span>
                  <span className="cs-drop-flag">FALSE ✕</span>
                </div>
                <div className="cs-row dropped">
                  <span>Grace</span>
                  <span>New York</span>
                  <span className="cs-drop-flag">FALSE ✕</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resWhere}</div>
              <div className="cs-row-header">
                <span>name</span>
                <span>city</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <span>Ada</span>
                  <span>London</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>WHERE:</strong> {txt.ruleWhere}
            </div>
          </div>
        </div>
      );

    case 'order-limit':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>ORDER BY price DESC LIMIT 2</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header">Sorted Stream (DESC)</div>
              <div className="cs-row-header">
                <span>product</span>
                <span>price</span>
                <span>Action</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <span>Monitor</span>
                  <strong>$249</strong>
                  <span className="cs-keep-flag">Row 1 (Kept)</span>
                </div>
                <div className="cs-row matched">
                  <span>Keyboard</span>
                  <strong>$89.5</strong>
                  <span className="cs-keep-flag">Row 2 (Kept)</span>
                </div>
                <div className="cs-row dropped">
                  <span>Query Tuning</span>
                  <span>$45</span>
                  <span className="cs-drop-flag">LIMIT Cut ✕</span>
                </div>
                <div className="cs-row dropped">
                  <span>Mouse</span>
                  <span>$24</span>
                  <span className="cs-drop-flag">LIMIT Cut ✕</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resOrderLimit}</div>
              <div className="cs-row-header">
                <span>product</span>
                <span>price</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <span>Monitor</span>
                  <span>$249</span>
                </div>
                <div className="cs-row matched">
                  <span>Keyboard</span>
                  <span>$89.5</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>ORDER & LIMIT:</strong> {txt.ruleOrderLimit}
            </div>
          </div>
        </div>
      );

    case 'group-by':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>GROUP BY category (COUNT / SUM)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header">Raw Rows (Products)</div>
              <div className="cs-row-header">
                <span>category</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="Books" />
                  <span>SQL Handbook</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="Books" />
                  <span>Query Tuning</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="Hardware" />
                  <span>Keyboard</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="Hardware" />
                  <span>Mouse</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="Hardware" />
                  <span>Monitor</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resGroupBy}</div>
              <div className="cs-row-header">
                <span>category</span>
                <span>COUNT(*)</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="Books" />
                  <strong>2</strong>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="Hardware" />
                  <strong>3</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>GROUP BY:</strong> {txt.ruleGroupBy}
            </div>
          </div>
        </div>
      );

    case 'inner-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>INNER JOIN (x, y)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header">{txt.tblLeft}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                </div>
                <div className="cs-row dropped">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <span className="cs-drop-flag">{txt.drop}</span>
                </div>
              </div>
            </div>

            <div className="cs-symbol">⋈</div>

            <div className="cs-table-card">
              <div className="cs-th-header">{txt.tblRight}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Book</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Mouse</span>
                </div>
                <div className="cs-row dropped">
                  <KeyBadge val="4" />
                  <span>Pen</span>
                  <span className="cs-drop-flag">{txt.drop}</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resInner}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                  <span>Book</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                  <span>Mouse</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>INNER JOIN:</strong> {txt.ruleInner}
            </div>
          </div>
        </div>
      );

    case 'left-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>LEFT JOIN (x, y)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header highlight">{txt.tblLeftPreserved}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                </div>
                <div className="cs-row preserved">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <span className="cs-keep-flag">{txt.keep}</span>
                </div>
              </div>
            </div>

            <div className="cs-symbol">⟕</div>

            <div className="cs-table-card">
              <div className="cs-th-header">{txt.tblRight}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Book</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Mouse</span>
                </div>
                <div className="cs-row dropped">
                  <KeyBadge val="4" />
                  <span>Pen</span>
                  <span className="cs-drop-flag">{txt.drop}</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resLeft}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                  <span>Book</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                  <span>Mouse</span>
                </div>
                <div className="cs-row null-padded">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <KeyBadge val="NULL" />
                </div>
              </div>
            </div>
          </div>

          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>LEFT JOIN:</strong> {txt.ruleLeft}
            </div>
          </div>
        </div>
      );

    case 'right-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>RIGHT JOIN (x, y)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header">{txt.tblLeft}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                </div>
                <div className="cs-row dropped">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <span className="cs-drop-flag">{txt.drop}</span>
                </div>
              </div>
            </div>

            <div className="cs-symbol">⟖</div>

            <div className="cs-table-card">
              <div className="cs-th-header highlight">{txt.tblRightPreserved}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Book</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Mouse</span>
                </div>
                <div className="cs-row preserved">
                  <KeyBadge val="4" />
                  <span>Pen</span>
                  <span className="cs-keep-flag">{txt.keep}</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resRight}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                  <span>Book</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                  <span>Mouse</span>
                </div>
                <div className="cs-row null-padded">
                  <KeyBadge val="4" />
                  <KeyBadge val="NULL" />
                  <span>Pen</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>RIGHT JOIN:</strong> {txt.ruleRight}
            </div>
          </div>
        </div>
      );

    case 'full-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>FULL OUTER JOIN (x, y)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header highlight">{txt.tblLeftHighlight}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                </div>
                <div className="cs-row preserved">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                </div>
              </div>
            </div>

            <div className="cs-symbol">⟗</div>

            <div className="cs-table-card">
              <div className="cs-th-header highlight">{txt.tblRightHighlight}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Book</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Mouse</span>
                </div>
                <div className="cs-row preserved">
                  <KeyBadge val="4" />
                  <span>Pen</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resFull}</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                  <span>Book</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                  <span>Mouse</span>
                </div>
                <div className="cs-row null-padded">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <KeyBadge val="NULL" />
                </div>
                <div className="cs-row null-padded">
                  <KeyBadge val="4" />
                  <KeyBadge val="NULL" />
                  <span>Pen</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>FULL JOIN:</strong> {txt.ruleFull}
            </div>
          </div>
        </div>
      );

    case 'cross-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>CROSS JOIN (Cartesian Product)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header">Sizes (2 rows)</div>
              <div className="cs-row-header"><span>val</span></div>
              <div className="cs-table-rows">
                <div className="cs-row"><KeyBadge val="A" /><span>Small</span></div>
                <div className="cs-row"><KeyBadge val="B" /><span>Large</span></div>
              </div>
            </div>

            <div className="cs-symbol">✕</div>

            <div className="cs-table-card">
              <div className="cs-th-header">Colors (3 rows)</div>
              <div className="cs-row-header"><span>val</span></div>
              <div className="cs-table-rows">
                <div className="cs-row"><KeyBadge val="1" /><span>Red</span></div>
                <div className="cs-row"><KeyBadge val="2" /><span>Blue</span></div>
                <div className="cs-row"><KeyBadge val="3" /><span>Green</span></div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resCross}</div>
              <div className="cs-row-header"><span>size</span><span>color</span></div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><span>Small</span><span>Red</span></div>
                <div className="cs-row matched"><span>Small</span><span>Blue</span></div>
                <div className="cs-row matched"><span>Small</span><span>Green</span></div>
                <div className="cs-row matched"><span>Large</span><span>Red</span></div>
                <div className="cs-row matched"><span>Large</span><span>Blue</span></div>
                <div className="cs-row matched"><span>Large</span><span>Green</span></div>
              </div>
            </div>
          </div>

          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>CROSS JOIN:</strong> {txt.ruleCross}
            </div>
          </div>
        </div>
      );

    case 'self-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">{txt.sheetBadge}</span>
            <strong>SELF JOIN (employees e ⋈ employees m)</strong>
          </div>
          <div className="cs-flow">
            <div className="cs-table-card">
              <div className="cs-th-header">employees (Alias: e)</div>
              <div className="cs-row-header"><span>id</span><span>name</span><span>mgr_id</span></div>
              <div className="cs-table-rows">
                <div className="cs-row"><KeyBadge val="1" /><span>CEO</span><KeyBadge val="NULL" /></div>
                <div className="cs-row matched"><KeyBadge val="2" /><span>CTO</span><KeyBadge val="1" /></div>
                <div className="cs-row matched"><KeyBadge val="3" /><span>Dev</span><KeyBadge val="2" /></div>
              </div>
            </div>

            <div className="cs-symbol">↺</div>

            <div className="cs-table-card">
              <div className="cs-th-header">employees (Alias: m)</div>
              <div className="cs-row-header"><span>id</span><span>name</span></div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><KeyBadge val="1" /><span>CEO</span></div>
                <div className="cs-row matched"><KeyBadge val="2" /><span>CTO</span></div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            <div className="cs-table-card result">
              <div className="cs-th-header result">{txt.resSelf}</div>
              <div className="cs-row-header"><span>employee</span><span>manager</span></div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><span>CTO</span><span>➔ CEO</span></div>
                <div className="cs-row matched"><span>Dev</span><span>➔ CTO</span></div>
              </div>
            </div>
          </div>

          <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>SELF JOIN:</strong> {txt.ruleSelf}
            </div>
          </div>
        </div>
      );

    case 'union':
    case 'union-all':
    case 'intersect':
    case 'except':
      return renderSetOpsDiagram(type, locale);

    default:
      return null;
  }
}

function renderSetOpsDiagram(type: string, locale: Locale = 'fa') {
  const txt = TEXTS[locale] ?? TEXTS.en;
  const isRtl = locale === 'fa';
  const isAll = type === 'union-all';
  const isIntersect = type === 'intersect';
  const isExcept = type === 'except';

  const opTitle = isAll
    ? 'UNION ALL'
    : isIntersect
    ? 'INTERSECT'
    : isExcept
    ? 'EXCEPT'
    : 'UNION';

  const ruleText = isAll
    ? (locale === 'de' ? 'UNION ALL hängt Zeilen aneinander und behält Duplikate bei (wesentlich schneller).' : locale === 'en' ? 'UNION ALL stacks queries keeping all duplicates (much faster than UNION).' : 'UNION ALL تمام ردیف‌ها را بدون حذف تکراری‌ها زیر هم می‌چسباند (بسیار سریع‌تر است).')
    : isIntersect
    ? (locale === 'de' ? 'INTERSECT gibt nur Zeilen zurück, die in beiden Abfragen vorkommen.' : locale === 'en' ? 'INTERSECT returns only rows present in both queries.' : 'INTERSECT فقط ردیف‌های مشترک بین هر دو کوئری را برمی‌گرداند.')
    : isExcept
    ? (locale === 'de' ? 'EXCEPT gibt Zeilen der ersten Abfrage zurück, die in der zweiten nicht vorkommen.' : locale === 'en' ? 'EXCEPT returns rows in the first query that do not exist in the second.' : 'EXCEPT ردیف‌هایی از کوئری اول را که در کوئری دوم نیستند بازمی‌گرداند.')
    : (locale === 'de' ? 'UNION kombiniert Zeilen und entfernt Duplikate.' : locale === 'en' ? 'UNION combines rows and removes all duplicates.' : 'UNION ردیف‌های هر دو را ترکیب کرده و تکراری‌ها را حذف می‌کند.');

  return (
    <div className="cs-container">
      <div className="cs-title-bar">
        <span className="cs-badge-kind">{txt.sheetBadge}</span>
        <strong>{opTitle}</strong>
      </div>
      <div className="cs-flow">
        <div className="cs-table-card">
          <div className="cs-th-header">{txt.setA}</div>
          <div className="cs-row-header"><span>value</span></div>
          <div className="cs-table-rows">
            <div className="cs-row matched"><KeyBadge val="1" /></div>
            <div className="cs-row matched"><KeyBadge val="2" /></div>
          </div>
        </div>

        <div className="cs-symbol">
          {isAll ? '∪+' : isIntersect ? '∩' : isExcept ? '−' : '∪'}
        </div>

        <div className="cs-table-card">
          <div className="cs-th-header">{txt.setB}</div>
          <div className="cs-row-header"><span>value</span></div>
          <div className="cs-table-rows">
            <div className="cs-row matched"><KeyBadge val="2" /></div>
            <div className="cs-row matched"><KeyBadge val="3" /></div>
          </div>
        </div>

        <div className="cs-arrow">➔</div>

        <div className="cs-table-card result">
          <div className="cs-th-header result">{txt.setResult}</div>
          <div className="cs-row-header"><span>value</span></div>
          <div className="cs-table-rows">
            {isAll && (
              <>
                <div className="cs-row matched"><KeyBadge val="1" /></div>
                <div className="cs-row matched"><KeyBadge val="2" /></div>
                <div className="cs-row matched"><KeyBadge val="2" /></div>
                <div className="cs-row matched"><KeyBadge val="3" /></div>
              </>
            )}
            {!isAll && !isIntersect && !isExcept && (
              <>
                <div className="cs-row matched"><KeyBadge val="1" /></div>
                <div className="cs-row matched"><KeyBadge val="2" /></div>
                <div className="cs-row matched"><KeyBadge val="3" /></div>
              </>
            )}
            {isIntersect && (
              <div className="cs-row matched"><KeyBadge val="2" /></div>
            )}
            {isExcept && (
              <div className="cs-row matched"><KeyBadge val="1" /></div>
            )}
          </div>
        </div>
      </div>

      <div className="cs-footer" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
        <span className="cs-rule-icon">💡</span>
        <div className="cs-rule-text">
          <strong>{opTitle}:</strong> {ruleText}
        </div>
      </div>
    </div>
  );
}
