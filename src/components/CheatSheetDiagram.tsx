/**
 * RStudio / dplyr cheat-sheet style schematic diagrams for SQL operations.
 *
 * Provides visual table-block representations of joins, set operations,
 * and data transformations with color-coded key matching, preserved rows,
 * and explicit NULL padding.
 */

export type DiagramType =
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
}

const KEY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  '1': { bg: '#0d9488', text: '#ffffff', label: '1' },
  '2': { bg: '#2563eb', text: '#ffffff', label: '2' },
  '3': { bg: '#ea580c', text: '#ffffff', label: '3' },
  '4': { bg: '#9333ea', text: '#ffffff', label: '4' },
  'A': { bg: '#0284c7', text: '#ffffff', label: 'A' },
  'B': { bg: '#d97706', text: '#ffffff', label: 'B' },
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

export function CheatSheetDiagram({ type }: CheatSheetDiagramProps) {
  if (!type) return null;

  switch (type) {
    case 'inner-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">RStudio Style Cheat Sheet</span>
            <strong>INNER JOIN (x, y)</strong>
          </div>
          <div className="cs-flow">
            {/* Table A */}
            <div className="cs-table-card">
              <div className="cs-th-header">Table A (Left / x)</div>
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
                <div className="cs-row dropped" title="No match in Table B — will be dropped">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <span className="cs-drop-flag">✕ drop</span>
                </div>
              </div>
            </div>

            <div className="cs-symbol">⋈</div>

            {/* Table B */}
            <div className="cs-table-card">
              <div className="cs-th-header">Table B (Right / y)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>product</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Keyboard</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Monitor</span>
                </div>
                <div className="cs-row dropped" title="No match in Table A — will be dropped">
                  <KeyBadge val="4" />
                  <span>Mouse</span>
                  <span className="cs-drop-flag">✕ drop</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            {/* Result Table */}
            <div className="cs-table-card result">
              <div className="cs-th-header result">Result (Matching Keys Only)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>product</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                  <span>Keyboard</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                  <span>Monitor</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-footer">
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>قاعده کلیدی INNER JOIN:</strong> فقط ردیف‌هایی حفظ می‌شوند که کلید آن‌ها در <em>هر دو جدول</em> وجود داشته باشد (اشتراک کلیدها: ۱ و ۲). ردیف ۳ از چپ و ردیف ۴ از راست چون جفتی ندارند، کاملاً حذف می‌شوند.
            </div>
          </div>
        </div>
      );

    case 'left-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">RStudio Style Cheat Sheet</span>
            <strong>LEFT JOIN (x, y)</strong>
          </div>
          <div className="cs-flow">
            {/* Table A */}
            <div className="cs-table-card">
              <div className="cs-th-header highlight">Table A (Left — محفوظ)</div>
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
                <div className="cs-row preserved" title="Unmatched left row — preserved with NULL right fields">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <span className="cs-keep-flag">✓ نگه‌داشته شد</span>
                </div>
              </div>
            </div>

            <div className="cs-symbol">⟕</div>

            {/* Table B */}
            <div className="cs-table-card">
              <div className="cs-th-header">Table B (Right / y)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>product</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Keyboard</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Monitor</span>
                </div>
                <div className="cs-row dropped" title="Right row with key 4 has no match in left — dropped">
                  <KeyBadge val="4" />
                  <span>Mouse</span>
                  <span className="cs-drop-flag">✕ drop</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            {/* Result Table */}
            <div className="cs-table-card result">
              <div className="cs-th-header result">Result (تمام ردیف‌های چپ)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>product</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                  <span>Keyboard</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                  <span>Monitor</span>
                </div>
                <div className="cs-row null-padded">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <KeyBadge val="NULL" />
                </div>
              </div>
            </div>
          </div>

          <div className="cs-footer">
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>قاعده کلیدی LEFT JOIN:</strong> تمام ردیف‌های جدول چپ (Table A) بدون استثنا باقی می‌مانند. اگر در جدول راست جفتی یافت شود اطلاعات آن می‌آید؛ در غیر این صورت فیلدهای جدول راست با <code>NULL</code> پر می‌شوند.
            </div>
          </div>
        </div>
      );

    case 'right-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">RStudio Style Cheat Sheet</span>
            <strong>RIGHT JOIN (x, y)</strong>
          </div>
          <div className="cs-flow">
            {/* Table A */}
            <div className="cs-table-card">
              <div className="cs-th-header">Table A (Left / x)</div>
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
                <div className="cs-row dropped" title="Left row dropped because no match in right">
                  <KeyBadge val="3" />
                  <span>Grace</span>
                  <span className="cs-drop-flag">✕ drop</span>
                </div>
              </div>
            </div>

            <div className="cs-symbol">⟖</div>

            {/* Table B */}
            <div className="cs-table-card">
              <div className="cs-th-header highlight">Table B (Right — محفوظ)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>product</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Keyboard</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Monitor</span>
                </div>
                <div className="cs-row preserved" title="Unmatched right row — preserved with NULL left fields">
                  <KeyBadge val="4" />
                  <span>Mouse</span>
                  <span className="cs-keep-flag">✓ نگه‌داشته شد</span>
                </div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            {/* Result Table */}
            <div className="cs-table-card result">
              <div className="cs-th-header result">Result (تمام ردیف‌های راست)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>product</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched">
                  <KeyBadge val="1" />
                  <span>Ada</span>
                  <span>Keyboard</span>
                </div>
                <div className="cs-row matched">
                  <KeyBadge val="2" />
                  <span>Alan</span>
                  <span>Monitor</span>
                </div>
                <div className="cs-row null-padded">
                  <KeyBadge val="4" />
                  <KeyBadge val="NULL" />
                  <span>Mouse</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-footer">
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>قاعده کلیدی RIGHT JOIN:</strong> تمام ردیف‌های جدول راست حفظ می‌شوند. اگر جدول چپ برای ردیفی مقداری نداشت، ستون‌های چپ <code>NULL</code> می‌گیرند. (در SQLite: چون RIGHT JOIN ندارد، جای دو جدول را عوض کرده و از <code>LEFT JOIN</code> استفاده می‌کنیم).
            </div>
          </div>
        </div>
      );

    case 'full-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">RStudio Style Cheat Sheet</span>
            <strong>FULL OUTER JOIN (x, y)</strong>
          </div>
          <div className="cs-flow">
            {/* Table A */}
            <div className="cs-table-card">
              <div className="cs-th-header highlight">Table A (Left)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><KeyBadge val="1" /><span>Ada</span></div>
                <div className="cs-row matched"><KeyBadge val="2" /><span>Alan</span></div>
                <div className="cs-row preserved"><KeyBadge val="3" /><span>Grace</span><span className="cs-keep-flag">✓</span></div>
              </div>
            </div>

            <div className="cs-symbol">⟗</div>

            {/* Table B */}
            <div className="cs-table-card">
              <div className="cs-th-header highlight">Table B (Right)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>product</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><KeyBadge val="1" /><span>Keyboard</span></div>
                <div className="cs-row matched"><KeyBadge val="2" /><span>Monitor</span></div>
                <div className="cs-row preserved"><KeyBadge val="4" /><span>Mouse</span><span className="cs-keep-flag">✓</span></div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            {/* Result Table */}
            <div className="cs-table-card result">
              <div className="cs-th-header result">Result (حفظ ۱۰۰٪ دو طرف)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>product</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><KeyBadge val="1" /><span>Ada</span><span>Keyboard</span></div>
                <div className="cs-row matched"><KeyBadge val="2" /><span>Alan</span><span>Monitor</span></div>
                <div className="cs-row null-padded"><KeyBadge val="3" /><span>Grace</span><KeyBadge val="NULL" /></div>
                <div className="cs-row null-padded"><KeyBadge val="4" /><KeyBadge val="NULL" /><span>Mouse</span></div>
              </div>
            </div>
          </div>

          <div className="cs-footer">
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>قاعده کلیدی FULL OUTER JOIN:</strong> تمام ردیف‌ها از هر دو جدول حفظ می‌شوند. هیچ ردیفی دور ریخته نمی‌شود؛ هر جا جفتی نباشد ستون خالی با <code>NULL</code> پر می‌شود. (در SQLite: ترکیب <code>LEFT JOIN ... UNION ... LEFT JOIN</code>).
            </div>
          </div>
        </div>
      );

    case 'cross-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">RStudio Style Cheat Sheet</span>
            <strong>CROSS JOIN (x, y) — ضرب دکارتی</strong>
          </div>
          <div className="cs-flow">
            {/* Table A */}
            <div className="cs-table-card">
              <div className="cs-th-header">Table A (۲ ردیف)</div>
              <div className="cs-row-header"><span>cust</span></div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><KeyBadge val="A" /><span>Ada</span></div>
                <div className="cs-row matched"><KeyBadge val="B" /><span>Alan</span></div>
              </div>
            </div>

            <div className="cs-symbol">✕</div>

            {/* Table B */}
            <div className="cs-table-card">
              <div className="cs-th-header">Table B (۳ ردیف)</div>
              <div className="cs-row-header"><span>item</span></div>
              <div className="cs-table-rows">
                <div className="cs-row"><KeyBadge val="1" /><span>Keybd</span></div>
                <div className="cs-row"><KeyBadge val="2" /><span>Mouse</span></div>
                <div className="cs-row"><KeyBadge val="3" /><span>Screen</span></div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            {/* Result Table */}
            <div className="cs-table-card result">
              <div className="cs-th-header result">۲ × ۳ = ۶ جفت خروجی</div>
              <div className="cs-row-header">
                <span>cust</span>
                <span>item</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><KeyBadge val="A" /><span>Keybd</span></div>
                <div className="cs-row matched"><KeyBadge val="A" /><span>Mouse</span></div>
                <div className="cs-row matched"><KeyBadge val="A" /><span>Screen</span></div>
                <div className="cs-row matched"><KeyBadge val="B" /><span>Keybd</span></div>
                <div className="cs-row matched"><KeyBadge val="B" /><span>Mouse</span></div>
                <div className="cs-row matched"><KeyBadge val="B" /><span>Screen</span></div>
              </div>
            </div>
          </div>

          <div className="cs-footer">
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>قاعده CROSS JOIN:</strong> هر ردیف جدول چپ با تمام ردیف‌های جدول راست جفت می‌شود. هیچ شرط <code>ON</code> وجود ندارد. تعداد ردیف‌ها ضرب اندازه جدول‌ها است: <code>N × M</code>.
            </div>
          </div>
        </div>
      );

    case 'self-join':
      return (
        <div className="cs-container">
          <div className="cs-title-bar">
            <span className="cs-badge-kind">RStudio Style Cheat Sheet</span>
            <strong>SELF JOIN — اتصال جدول به خودش</strong>
          </div>
          <div className="cs-flow">
            {/* Employees as Worker */}
            <div className="cs-table-card">
              <div className="cs-th-header">employees (Alias: e — کارمند)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
                <span>mgr_id</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row"><KeyBadge val="1" /><span>CEO</span><KeyBadge val="NULL" /></div>
                <div className="cs-row matched"><KeyBadge val="2" /><span>CTO</span><KeyBadge val="1" /></div>
                <div className="cs-row matched"><KeyBadge val="3" /><span>Dev</span><KeyBadge val="2" /></div>
              </div>
            </div>

            <div className="cs-symbol">↺</div>

            {/* Employees as Manager */}
            <div className="cs-table-card">
              <div className="cs-th-header">employees (Alias: m — مدیر)</div>
              <div className="cs-row-header">
                <span>id</span>
                <span>name</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><KeyBadge val="1" /><span>CEO</span></div>
                <div className="cs-row matched"><KeyBadge val="2" /><span>CTO</span></div>
              </div>
            </div>

            <div className="cs-arrow">➔</div>

            {/* Result Table */}
            <div className="cs-table-card result">
              <div className="cs-th-header result">نتیجه (کارمند و مدیرش)</div>
              <div className="cs-row-header">
                <span>کارمند</span>
                <span>مدیر</span>
              </div>
              <div className="cs-table-rows">
                <div className="cs-row matched"><span>CTO</span><span>➔ CEO</span></div>
                <div className="cs-row matched"><span>Dev</span><span>➔ CTO</span></div>
              </div>
            </div>
          </div>

          <div className="cs-footer">
            <span className="cs-rule-icon">💡</span>
            <div className="cs-rule-text">
              <strong>قاعده SELF JOIN:</strong> برای ساختارهای درختی یا سلسله‌مراتبی (مانند کارمند و مدیر)، جدول را دوبار با دو نام مستعار مجزا می‌آوریم (مانند <code>employees e JOIN employees m ON e.manager_id = m.id</code>).
            </div>
          </div>
        </div>
      );

    case 'union':
    case 'union-all':
    case 'intersect':
    case 'except':
      return renderSetOpsDiagram(type);

    default:
      return null;
  }
}

function renderSetOpsDiagram(type: string) {
  const isAll = type === 'union-all';
  const isIntersect = type === 'intersect';
  const isExcept = type === 'except';

  const opTitle = isAll
    ? 'UNION ALL (تمام ردیف‌ها با تکراری‌ها)'
    : isIntersect
    ? 'INTERSECT (فقط اشتراک ردیف‌ها)'
    : isExcept
    ? 'EXCEPT (ردیف‌های جدول اول منهای دوم)'
    : 'UNION (ردیف‌های یکتا از هر دو جدول)';

  return (
    <div className="cs-container">
      <div className="cs-title-bar">
        <span className="cs-badge-kind">RStudio Style Cheat Sheet</span>
        <strong>{opTitle}</strong>
      </div>
      <div className="cs-flow">
        {/* Table A */}
        <div className="cs-table-card">
          <div className="cs-th-header">مجموعه A</div>
          <div className="cs-row-header"><span>value</span></div>
          <div className="cs-table-rows">
            <div className="cs-row matched"><KeyBadge val="1" /></div>
            <div className="cs-row matched"><KeyBadge val="2" /></div>
          </div>
        </div>

        <div className="cs-symbol">
          {isAll ? '∪+' : isIntersect ? '∩' : isExcept ? '−' : '∪'}
        </div>

        {/* Table B */}
        <div className="cs-table-card">
          <div className="cs-th-header">مجموعه B</div>
          <div className="cs-row-header"><span>value</span></div>
          <div className="cs-table-rows">
            <div className="cs-row matched"><KeyBadge val="2" /></div>
            <div className="cs-row matched"><KeyBadge val="3" /></div>
          </div>
        </div>

        <div className="cs-arrow">➔</div>

        {/* Result */}
        <div className="cs-table-card result">
          <div className="cs-th-header result">خروجی</div>
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

      <div className="cs-footer">
        <span className="cs-rule-icon">💡</span>
        <div className="cs-rule-text">
          {isAll && 'UNION ALL ردیف‌های هر دو کوئری را زیر هم می‌چسباند و ردیف‌های تکراری را حذف نمی‌کند (سریع‌تر است چون نیازی به بررسی تکراری‌ها ندارد).'}
          {!isAll && !isIntersect && !isExcept && 'UNION ردیف‌های هر دو را ترکیب کرده و تکراری‌ها را حذف می‌کند (فقط یک کپی از هر ردیف می‌ماند).'}
          {isIntersect && 'INTERSECT فقط ردیف‌هایی را برمی‌گرداند که در هر دو کوئری دقیقاً وجود داشته باشند.'}
          {isExcept && 'EXCEPT ردیف‌هایی از کوئری اول را برمی‌گرداند که اصلاً در کوئری دوم وجود نداشته باشند.'}
        </div>
      </div>
    </div>
  );
}
