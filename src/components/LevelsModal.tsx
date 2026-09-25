/**
 * Level browser modal.
 */

import { sequences } from '../levels';
import { localize, type SequenceInfo } from '../levels/types';

interface LevelsModalProps {
  open: boolean;
  solvedIds: Set<string>;
  currentId: string | null;
  onClose: () => void;
  onSelect: (levelId: string) => void;
}

/**
 * Browse sequences and jump to a level (LGB `levels` command).
 */
export function LevelsModal({
  open,
  solvedIds,
  currentId,
  onClose,
  onSelect,
}: LevelsModalProps) {
  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-label="Levels">
        <div className="modal-header">
          <h2>Levels</h2>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          {sequences.map((seq: SequenceInfo) => (
            <div key={seq.id} className="seq-block">
              <h3>{localize(seq.displayName)}</h3>
              <div className="about">{localize(seq.about)}</div>
              <div className="level-list">
                {seq.levels.map((level, i) => {
                  const solved = solvedIds.has(level.id);
                  const current = level.id === currentId;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      className={`level-item${solved ? ' solved' : ''}`}
                      onClick={() => onSelect(level.id)}
                    >
                      <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="name">{localize(level.name)}</span>
                      {current && <span className="badge">now</span>}
                      {solved && <span className="badge">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button type="button" className="primary" onClick={onClose}>
            Back to workbench
          </button>
        </div>
      </div>
    </div>
  );
}
