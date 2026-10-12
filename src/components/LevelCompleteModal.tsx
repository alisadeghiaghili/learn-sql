/**
 * "Level complete" dialog — shown the moment a level is solved. Offers a
 * primary "Next level" action (advancing into it) plus a browse option.
 */

import { type Locale, t } from '../i18n';

interface LevelCompleteModalProps {
  open: boolean;
  /** Localized name of the level that was just cleared. */
  levelName: string;
  /** Localized name of the next level, or null when the curriculum is finished. */
  nextName: string | null;
  locale: Locale;
  onNext: () => void;
  onBrowse: () => void;
  onClose: () => void;
}

/** Substitute a `{name}` placeholder in a UI string. */
function withName(key: string, name: string, locale: Locale): string {
  return t(key, locale).replace('{name}', name);
}

/**
 * Modal congratulating the learner and moving on to the next level.
 */
export function LevelCompleteModal({
  open,
  levelName,
  nextName,
  locale,
  onNext,
  onBrowse,
  onClose,
}: LevelCompleteModalProps) {
  if (!open) return null;

  const hasNext = nextName != null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={t('completeTitle', locale)}>
        <div className="modal-header">
          <h2>{t('completeTitle', locale)}</h2>
          <button type="button" onClick={onClose} aria-label={t('close', locale)}>
            {t('close', locale)}
          </button>
        </div>
        <div className="modal-body">
          <p>
            {hasNext
              ? withName('completeMessage', levelName, locale)
              : t('completeAllMessage', locale)}
          </p>
        </div>
        <div className="modal-footer">
          {hasNext ? (
            <>
              <button type="button" className="ghost" onClick={onBrowse}>
                {t('browseLevels', locale)}
              </button>
              <button type="button" className="primary" onClick={onNext}>
                {withName('nextLevelButton', nextName!, locale)}
              </button>
            </>
          ) : (
            <button type="button" className="primary" onClick={onBrowse}>
              {t('browseLevels', locale)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
