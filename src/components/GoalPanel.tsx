/**
 * Goal panel — expected result preview and win status.
 */

import type { WinCheck, WinCondition } from '../engine/types';
import type { Level } from '../levels/types';
import { localize } from '../levels/types';
import { ResultGrid } from './ResultGrid';

interface GoalPanelProps {
  level: Level | null;
  win: WinCheck | null;
  visible: boolean;
  solved: boolean;
  cellMatches?: boolean[][] | undefined;
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
}: GoalPanelProps) {
  if (!visible || !level) {
    return (
      <aside className="panel goal-panel">
        <div className="panel-header">
          <span>goal</span>
          <span>hidden</span>
        </div>
        <div className="empty-state">
          Run <code>show goal</code> or click Goal in the toolbar.
        </div>
      </aside>
    );
  }

  const preview = goalPreview(level.goal);

  return (
    <aside className={`panel goal-panel${solved ? ' solved' : ''}`}>
      <div className="panel-header">
        <span>goal</span>
        <span>{level.goal.type}</span>
      </div>
      <div className="goal-body">
        <div
          className={`goal-status ${solved ? 'solved' : win ? 'fail' : ''}`}
        >
          {solved
            ? 'Solved — result matches the goal.'
            : win
              ? win.reason
              : 'Match this result to clear the level.'}
        </div>
        <ResultGrid result={preview} cellMatches={cellMatches} />
        <div className="goal-status">
          {localize(level.hint)}
        </div>
      </div>
    </aside>
  );
}
