/**
 * Goal panel — expected result preview and win status.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import type { WinCheck, WinCondition } from '../engine/types';
import type { Level } from '../levels/types';
import { localize } from '../levels/types';
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
          <span>hidden</span>
        </div>
        <div className="empty-state">
          {locale === 'de'
            ? 'Ziel ausgeblendet. Klicken Sie in der Symbolleiste auf Ziel.'
            : locale === 'en'
            ? 'Goal hidden. Click Goal in the toolbar to display.'
            : 'هدف مخفی است. روی دکمه هدف در نوار بالا کلیک کنید.'}
        </div>
      </aside>
    );
  }

  const preview = goalPreview(level.goal);

  return (
    <aside className={`panel goal-panel${solved ? ' solved' : ''}`}>
      <div className="panel-header">
        <span>{t('goal', locale)}</span>
        <span>{level.goal.type}</span>
      </div>
      <div className="goal-body">
        <div
          className={`goal-status ${solved ? 'solved' : win ? 'fail' : ''}`}
        >
          {solved
            ? t('solvedTitle', locale)
            : win
              ? win.reason
              : locale === 'de'
              ? 'Erreichen Sie dieses Ergebnis, um das Level zu beenden.'
              : locale === 'en'
              ? 'Match this result to clear the level.'
              : 'برای قبولی در این مرحله، خروجی کوئری خود را با این جدول تطبیق دهید.'}
        </div>
        <ResultGrid result={preview} cellMatches={cellMatches} />
        <div className="goal-status">
          {localize(level.hint, locale)}
        </div>
      </div>
    </aside>
  );
}
