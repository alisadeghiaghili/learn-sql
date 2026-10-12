/**
 * Level browser modal.
 * Fluently localized in Persian (fa), English (en), and German (de).
 * Matches learn-dvc 5-dot difficulty rating and ideal command layout.
 */

import { sequences, getLevelDifficulty } from '../levels';
import { localize, type SequenceInfo } from '../levels/types';
import { type Locale, t } from '../i18n';

interface LevelsModalProps {
  open: boolean;
  solvedIds: Set<string>;
  golf?: Record<string, number>;
  currentId: string | null;
  onClose: () => void;
  onSelect: (levelId: string) => void;
  locale?: Locale;
}

/**
 * Five equal-size dots matching learn-dvc; filled count = difficulty 1-5.
 */
function renderDiffDots(difficulty: number) {
  const n = Math.max(0, Math.min(5, difficulty));
  return (
    <span className="diff-dots">
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`diff-dot${i < n ? ' on' : ''}`} />
      ))}
    </span>
  );
}

/**
 * Format ideal command note matching learn-dvc (e.g. ideal 1 cmd / ideal 2 cmds).
 */
function formatIdealCmds(par: number, locale: Locale): string {
  if (locale === 'fa') {
    return `ایده‌آل ${par} فرمان`;
  }
  if (locale === 'de') {
    return `ideal ${par} Befehl${par === 1 ? '' : 'e'}`;
  }
  return `ideal ${par} cmd${par === 1 ? '' : 's'}`;
}

/**
 * Browse sequences and jump to a level.
 */
export function LevelsModal({
  open,
  solvedIds,
  golf = {},
  currentId,
  onClose,
  onSelect,
  locale = 'fa',
}: LevelsModalProps) {
  if (!open) return null;
  const isRtl = locale === 'fa';

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal levels-modal"
        role="dialog"
        aria-label="Levels"
        style={{ direction: isRtl ? 'rtl' : 'ltr' }}
      >
        <div className="modal-header">
          <h2>{t('allLevelsTitle', locale)}</h2>
          <button type="button" onClick={onClose}>
            {t('close', locale)}
          </button>
        </div>
        <div className="modal-body">
          <p className="pick-challenge-p">{t('pickChallenge', locale)}</p>

          <div className="legend-box">
            <div className="legend-title">{t('howToRead', locale)}</div>
            <ul className="legend-list">
              <li>
                {renderDiffDots(3)}{' '}
                <span>{t('difficultyLegend', locale)}</span>
              </li>
              <li>
                <span className="par-note">{formatIdealCmds(1, locale)}</span>{' '}
                <span>{t('idealLegend', locale)}</span>
              </li>
              <li>
                <span className="chip ok">
                  {t('solvedLabel', locale)} 1
                </span>{' '}
                <span>{t('solvedLegend', locale)}</span>
              </li>
            </ul>
          </div>

          {sequences.map((seq: SequenceInfo) => (
            <div key={seq.id} className="series-block">
              <h3>{localize(seq.displayName, locale)}</h3>
              <div className="about">{localize(seq.about, locale)}</div>
              <div className="level-list">
                {seq.levels.map((level) => {
                  const solved = solvedIds.has(level.id);
                  const isCurrent = level.id === currentId;
                  const diff = getLevelDifficulty(level);
                  const best = golf[level.id];
                  const par = level.golfPar ?? 1;

                  return (
                    <button
                      key={level.id}
                      type="button"
                      className={`level-row${solved ? ' solved' : ''}${isCurrent ? ' current' : ''}`}
                      onClick={() => onSelect(level.id)}
                    >
                      <span className="id">{level.id}</span>
                      <span className="name">{localize(level.name, locale)}</span>
                      <span className="par-note">{formatIdealCmds(par, locale)}</span>
                      <span
                        className={`chip ${solved ? 'ok' : ''}`}
                        title={t('difficultyOf', locale).replace('{n}', String(diff))}
                      >
                        {solved ? (
                          `${t('solvedLabel', locale)} ${best ?? par}`
                        ) : (
                          <span
                            className="diff-dots-wrap"
                            aria-label={t('difficultyOf', locale).replace('{n}', String(diff))}
                          >
                            {renderDiffDots(diff)}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button type="button" className="primary" onClick={onClose}>
            {t('close', locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
