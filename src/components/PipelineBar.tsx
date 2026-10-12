/**
 * Query pipeline strip — clause stages that light up while a statement runs.
 */

import { type Locale, t } from '../i18n';

export type PipeStage = 'from' | 'join' | 'where' | 'group' | 'having' | 'select' | 'order' | 'limit';

const STAGES: { id: PipeStage; label: string }[] = [
  { id: 'from', label: 'FROM' },
  { id: 'join', label: 'JOIN' },
  { id: 'where', label: 'WHERE' },
  { id: 'group', label: 'GROUP' },
  { id: 'having', label: 'HAVING' },
  { id: 'select', label: 'SELECT' },
  { id: 'order', label: 'ORDER' },
  { id: 'limit', label: 'LIMIT' },
];

/**
 * Detect which pipeline stages a SQL string appears to use.
 *
 * @param sql - Statement text.
 * @returns Set of active stage ids.
 */
export function detectStages(sql: string): Set<PipeStage> {
  const s = sql.toLowerCase();
  const active = new Set<PipeStage>();
  if (/\bfrom\b/.test(s)) active.add('from');
  if (/\bjoin\b/.test(s)) active.add('join');
  if (/\bwhere\b/.test(s)) active.add('where');
  if (/\bgroup\s+by\b/.test(s)) active.add('group');
  if (/\bhaving\b/.test(s)) active.add('having');
  if (/\bselect\b/.test(s)) active.add('select');
  if (/\border\s+by\b/.test(s)) active.add('order');
  if (/\blimit\b/.test(s)) active.add('limit');
  return active;
}

interface PipelineBarProps {
  active: Set<PipeStage>;
  highlightIndex?: number | null;
  solved?: boolean;
  locale?: Locale;
}

/**
 * Horizontal clause pipeline (the commit-tree analog for SQL).
 */
export function PipelineBar({
  active,
  highlightIndex,
  solved,
  locale = 'fa',
}: PipelineBarProps) {
  // Precompute lit stages
  const litStages = STAGES.map((stage, i) => {
    return highlightIndex != null
      ? active.has(stage.id) && countActiveBefore(active, i) <= highlightIndex
      : active.has(stage.id);
  });

  return (
    <div className="pipeline-section" aria-label="Query pipeline">
      <div className="pipeline-header">
        <span className="pipeline-title">{t('executionOrderTitle', locale)}</span>
      </div>
      <div className="pipeline">
        {STAGES.map((stage, i) => {
          const isActive = active.has(stage.id);
          const isLit = litStages[i];
          const cls = [
            'pipe-stage',
            isLit ? 'active' : '',
            solved && isActive ? 'matched' : '',
          ]
            .filter(Boolean)
            .join(' ');

          // An arrow before stage i (i > 0) connects stage i - 1 to stage i.
          // It should light up if the preceding stage is lit AND at least one subsequent stage (from i onward) is lit.
          const isArrowLit =
            i > 0 &&
            litStages[i - 1] &&
            litStages.slice(i).some(Boolean);

          return (
            <span key={stage.id} style={{ display: 'contents' }}>
              {i > 0 && (
                <span className={`pipe-arrow ${isArrowLit ? 'active' : ''}`}>
                  →
                </span>
              )}
              <span className={cls}>{stage.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function countActiveBefore(active: Set<PipeStage>, index: number): number {
  let n = 0;
  for (let i = 0; i < index; i += 1) {
    if (active.has(STAGES[i].id)) n += 1;
  }
  return n;
}
