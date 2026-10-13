/**
 * Interactive UI Guide modal behind the `?` help button.
 *
 * Lists the app's live regions with a Highlight button each. Highlighting
 * closes the modal, outlines that region on screen for a moment, then
 * reopens the guide — mirroring the LearnPowerShell UI Guide.
 */

import { useEffect, useRef, useState } from 'react';
import { guideRegions } from '../uiGuide';
import { type Locale, t } from '../i18n';

interface UiGuideModalProps {
  open: boolean;
  onClose: () => void;
  /** Called with all region selectors for a full tour, or one id for a single region. */
  onTour: (focusId?: string) => void;
  /** Called when a single region has been highlighted and it is time to reopen the guide. */
  onReopen: () => void;
  locale?: Locale;
}

const TOUR_MS = 3000;

export function UiGuideModal({
  open,
  onClose,
  onTour,
  onReopen,
  locale = 'fa',
}: UiGuideModalProps) {
  const [closing, setClosing] = useState(false);
  const reopenTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      setClosing(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (reopenTimer.current != null) {
        window.clearTimeout(reopenTimer.current);
        reopenTimer.current = null;
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  const regions = guideRegions(locale);
  const isRtl = locale === 'fa';

  const startTour = () => {
    onTour();
    setClosing(true);
    reopenTimer.current = window.setTimeout(() => {
      reopenTimer.current = null;
      setClosing(false);
      onReopen();
    }, TOUR_MS);
  };

  const highlight = (id: string) => {
    onTour(id);
    setClosing(true);
    reopenTimer.current = window.setTimeout(() => {
      reopenTimer.current = null;
      setClosing(false);
      onReopen();
    }, TOUR_MS);
  };

  return (
    <div
      className={`modal-backdrop${closing ? ' is-closing' : ''}`}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-label={t('uiGuideTitle', locale)} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        <div className="modal-header">
          <h2>{t('uiGuideTitle', locale)}</h2>
          <button type="button" onClick={onClose}>
            {t('close', locale)}
          </button>
        </div>
        <div className="modal-body">
          <p className="ui-help-intro">{t('uiGuideIntro', locale)}</p>
          {regions.map((r) => (
            <section key={r.id} className="ui-help-item">
              <div className="ui-help-head">
                <h3>{r.title}</h3>
                <button type="button" className="ui-help-focus" onClick={() => highlight(r.id)}>
                  {t('uiGuideHighlight', locale)}
                </button>
              </div>
              <div className="ui-help-what">
                <p>{r.what}</p>
              </div>
              <div className="ui-help-how">
                <p>
                  <strong>{t('uiGuideHowTo', locale)}</strong> {r.how}
                </p>
              </div>
            </section>
          ))}
        </div>
        <div className="modal-footer">
          <button type="button" onClick={startTour}>
            {t('uiGuideHighlight', locale)}
          </button>
          <button type="button" className="primary" onClick={onClose}>
            {t('close', locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
