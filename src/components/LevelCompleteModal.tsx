/**
 * Level celebration modal matching learn-dvc.
 *
 * Features:
 * - Animated celebratory star + pulsing glowing ring
 * - Pill badge "LEVEL CLEARED"
 * - Congratulatory cheer & stats comparison with golf par
 * - Progress bar (% of total curriculum completed)
 * - Social share targets (LinkedIn, X / Twitter, Facebook, Copy Post)
 * - Auto-launch full-screen confetti burst and audio fanfare
 */

import { useState } from 'react';
import { type Locale, t } from '../i18n';
import type { Level } from '../levels/types';
import { localize } from '../levels/types';
import { allLevels } from '../levels';

interface LevelCompleteModalProps {
  open: boolean;
  level: Level | null;
  next: Level | null;
  commandsUsed: number;
  solvedCount: number;
  locale: Locale;
  onNext: () => void;
  onBrowse: () => void;
  onClose: () => void;
}

const SHARE_URL = 'https://alisadeghiaghili.github.io/learn-sql/';

export function LevelCompleteModal({
  open,
  level,
  next,
  commandsUsed,
  solvedCount,
  locale,
  onNext,
  onBrowse,
  onClose,
}: LevelCompleteModalProps) {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  if (!open || !level) return null;

  const total = allLevels.length;
  const percent = Math.min(100, Math.round((solvedCount / total) * 100));
  const par = level.golfPar ?? 1;
  const underPar = commandsUsed <= par;

  const levelName = localize(level.name, locale);
  const nextName = next ? localize(next.name, locale) : null;

  // Select cheer message
  const cheer =
    commandsUsed <= par
      ? t('celebrateCheer1', locale)
      : t('celebrateCheer2', locale);

  const statsText =
    commandsUsed === 0
      ? `${par} ${t('commandsLabel', locale)}`
      : underPar
      ? locale === 'fa'
        ? `${commandsUsed} ${t('commandsLabel', locale)} (ایده‌آل: ${par} · اجرای بهینه و تمیز)`
        : locale === 'de'
        ? `${commandsUsed} ${t('commandsLabel', locale)} (Ideal: ${par} · Saubere Lösung)`
        : `${commandsUsed} ${t('commandsLabel', locale)} (Ideal par: ${par} · Clean run)`
      : locale === 'fa'
      ? `${commandsUsed} ${t('commandsLabel', locale)} (ایده‌آل: ${par} بود — ولی عالی حل کردی)`
      : locale === 'de'
      ? `${commandsUsed} ${t('commandsLabel', locale)} (Ideal: ${par} — toll gemeistert)`
      : `${commandsUsed} ${t('commandsLabel', locale)} (Ideal: ${par} — great job clearing it)`;

  const shareText =
    locale === 'fa'
      ? `من مرحله «${levelName}» را در LearnSQL حل کردم! 🚀\nتعداد کوئری: ${commandsUsed} (ایده‌آل: ${par})\nپیشرفت کل: ${solvedCount}/${total} مرحله.\nتمرین تعاملی SQL در مرورگر:\n${SHARE_URL}`
      : locale === 'de'
      ? `Ich habe das Level „${levelName}“ in LearnSQL gemeistert! 🚀\nAbfragen: ${commandsUsed} (Ideal: ${par})\nGesamtfortschritt: ${solvedCount}/${total} Level.\nInteraktives SQL im Browser:\n${SHARE_URL}`
      : `I just cleared "${levelName}" on LearnSQL! 🚀\nQueries: ${commandsUsed} (Ideal par: ${par})\nCurriculum progress: ${solvedCount}/${total} levels.\nInteractive SQL in the browser:\n${SHARE_URL}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyStatus(t('copyOk', locale));
      setTimeout(() => setCopyStatus(null), 2500);
    } catch {
      setCopyStatus(t('copyFail', locale));
      setTimeout(() => setCopyStatus(null), 2500);
    }
  };

  const handleShare = (network: 'linkedin' | 'x' | 'facebook') => {
    let url = '';
    if (network === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`;
    } else if (network === 'x') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    } else if (network === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer,width=650,height=550');
  };

  return (
    <div
      className="modal-backdrop overlay-celebrate"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal modal-celebrate"
        role="dialog"
        aria-modal="true"
        aria-label={t('completeTitle', locale)}
        style={{ direction: locale === 'fa' ? 'rtl' : 'ltr' }}
      >
        <div className="celebrate" aria-live="polite">
          <div className="celebrate-visual" aria-hidden="true">
            <div className="celebrate-ring"></div>
            <div className="celebrate-star">★</div>
          </div>

          <div className="celebrate-badge">{t('levelClearedBadge', locale)}</div>

          <h3 className="celebrate-title">{levelName}</h3>
          <p className="celebrate-sub">
            <code>{level.id}</code>
          </p>

          <p className="celebrate-cheer">{cheer}</p>

          <div className="celebrate-stats">
            <strong>{statsText}</strong>
          </div>

          <div className="celebrate-progress">
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="par-note">
              {t('progressKept', locale)
                .replace('{solved}', String(solvedCount))
                .replace('{total}', String(total))}
            </div>
          </div>

          <div className="share-block">
            <div className="share-title-text">{t('shareTitle', locale)}</div>
            <div className="share-row" role="group">
              <button
                type="button"
                className="share-btn linkedin"
                onClick={() => handleShare('linkedin')}
              >
                LinkedIn
              </button>
              <button
                type="button"
                className="share-btn x"
                onClick={() => handleShare('x')}
              >
                X / Twitter
              </button>
              <button
                type="button"
                className="share-btn facebook"
                onClick={() => handleShare('facebook')}
              >
                Facebook
              </button>
              <button
                type="button"
                className="share-btn copy"
                onClick={handleCopy}
              >
                {t('copyPost', locale)}
              </button>
            </div>
            {copyStatus && <div className="share-status">{copyStatus}</div>}
          </div>

          {next && (
            <div className="celebrate-next">
              {t('nextLevelButton', locale).replace('{name}', nextName || next.id)}
            </div>
          )}
        </div>

        <div className="modal-footer celebrate-footer">
          <button type="button" className="ghost" onClick={onClose}>
            {t('baskInIt', locale)}
          </button>
          {next ? (
            <button type="button" className="primary" onClick={onNext}>
              {t('nextLevelButton', locale).replace('{name}', nextName || next.id)}
            </button>
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
