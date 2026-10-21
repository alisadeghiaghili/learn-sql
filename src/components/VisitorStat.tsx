import { useEffect, useState } from 'react';
import { t, type Locale } from '../i18n';
import {
  formatVisitorCount,
  loadVisitorCount,
  readCachedCount,
} from '../visitor-counter';

/** Unique-visitor count shown in the toolbar; hidden until a value is known. */
export function VisitorStat({ locale }: { locale: Locale }) {
  const [count, setCount] = useState<number | null>(() => readCachedCount());

  useEffect(() => {
    let alive = true;
    void loadVisitorCount().then((value) => {
      if (alive && value !== null) setCount(value);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (count === null) return null;

  return (
    <span
      className="tb-stat"
      title={t('visitorsTitle', locale)}
      aria-label={`${t('visitorsLabel', locale)}: ${formatVisitorCount(count)}`}
    >
      <svg
        className="visitor-icon"
        viewBox="0 0 16 16"
        width="14"
        height="14"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0-2.21-2.69-4-6-4s-6 1.79-6 4v1h12v-1zm-1.07 0H3.07C3.56 11.83 5.48 11 8 11s4.44.83 4.93 2z" />
      </svg>
      <span className="visitor-count" dir="ltr">
        {formatVisitorCount(count)}
      </span>
    </span>
  );
}
