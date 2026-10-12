/**
 * Goal panel — expected result preview and win status.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import type { WinCheck, WinCondition } from '../engine/types';
import type { Level } from '../levels/types';
import { type Locale, t } from '../i18n';
import { ResultGrid } from './ResultGrid';

interface GoalPanelProps {
  level: Level | null;
  win: WinCheck | null;
  visible: boolean;
  solved: boolean;
  cellMatches?: boolean[][] | undefined;
  locale?: Locale;
}

function goalPreview(condition: WinCondition) {
  if (condition.type === 'result') {
    return {
      columns: condition.columns,
      rows: condition.rows,
      changes: 0,
    };
  }
  if (condition.type === 'table') {
    return {
      columns: condition.columns,
      rows: condition.rows,
      changes: 0,
    };
  }
  return {
    columns: ['tables'],
    rows: condition.tables.map((t) => [t]),
    changes: 0,
  };
}

/**
 * Right rail showing the target result and match diagnostics.
 */
export function GoalPanel({
  level,
  win,
  visible,
  solved,
  cellMatches,
  locale = 'fa',
}: GoalPanelProps) {
  if (!visible || !level) {
    return (
      <aside className="panel goal-panel">
        <div className="panel-header">
          <span>{t('goal', locale)}</span>
          <span>{t('hiddenGoal', locale)}</span>
        </div>
        <div className="empty-state">
          {t('goalHiddenMsg', locale)}
        </div>
      </aside>
    );
  }

  const preview = goalPreview(level.goal);
  const goalTypeLabel =
    level.goal.type === 'result'
      ? (locale === 'fa' ? 'خروجی کوئری' : locale === 'de' ? 'Ergebnis' : 'result')
      : level.goal.type === 'table'
      ? (locale === 'fa' ? 'جدول هدف' : locale === 'de' ? 'Zieltabelle' : 'table')
      : (locale === 'fa' ? 'طرح جداول' : locale === 'de' ? 'Schema' : 'schema');

  return (
    <aside className={`panel goal-panel${solved ? ' solved' : ''}`}>
      <div className="panel-header">
        <span>{t('goal', locale)}</span>
        <span>{goalTypeLabel}</span>
      </div>
      <div className="goal-body">
        <div
          className={`goal-status ${solved ? 'solved' : win ? 'fail' : ''}`}
        >
          {solved
            ? t('solvedTitle', locale)
            : win
              ? win.reason
              : t('matchGoalMsg', locale)}
        </div>
        <ResultGrid result={preview} cellMatches={cellMatches} />
      </div>
    </aside>
  );
}
