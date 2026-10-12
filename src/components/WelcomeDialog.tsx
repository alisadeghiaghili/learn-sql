/**
 * First-run welcome dialog — product map, tracks, publisher.
 */

import type { ReactNode } from 'react';
import { allLevels } from '../levels';
import { type Locale, t } from '../i18n';

export const COFFEE_URL = 'https://www.buymeacoffee.com/alisadeghil';
export const COFFEE_BUTTON_IMG =
  'https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=alisadeghil&button_colour=2a3a4a&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00';
export const GITHUB_URL = 'https://github.com/alisadeghiaghili/learn-sql';
export const LINKTR_URL = 'https://linktr.ee/aliaghili';

function Code({ children }: { children: ReactNode }) {
  return <code className="wd-code">{children}</code>;
}

function Strong({ children }: { children: ReactNode }) {
  return <strong>{children}</strong>;
}

interface WelcomeDialogProps {
  onClose: () => void;
  onOpenLevels: () => void;
  locale?: Locale;
}

/**
 * Landing card shown once (unless ?NODEMO) — mirrors the LearnDVC welcome.
 */
export function WelcomeDialog({ onClose, onOpenLevels, locale = 'fa' }: WelcomeDialogProps) {
  const levelCount = allLevels.length;
  const isRtl = locale === 'fa';

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal welcome-modal"
        role="dialog"
        aria-label="LearnSQL"
        style={{ direction: isRtl ? 'rtl' : 'ltr' }}
      >
        <div className="modal-body welcome-body">
          <h1 className="welcome-title">LearnSQL</h1>

          {locale === 'fa' ? (
            <>
              <p>
                آزمایشگاه تعاملی آموزش <Strong>SQL</Strong> — میز کار آزاد (سندباکس) به همراه مراحل آموزشی هدف‌محور.
              </p>

              <p>
                صفحه کار مسیر حرکت و تغییر داده‌ها را نشان می‌دهد:{' '}
                <Strong>طرح پایگاه داده (Schema) ← ترتیب منطقی اجرای کوئری (Pipeline) ← جدول نتایج (Result)</Strong>.
              </p>

              <ul className="welcome-list">
                <li>
                  مفاهیم پایه: <Code>SELECT</Code>، <Code>WHERE</Code>،{' '}
                  <Code>ORDER BY</Code>، <Code>LIMIT</Code>
                </li>
                <li>
                  فیلترها: <Code>AND</Code>/<Code>OR</Code>، <Code>IN</Code>،{' '}
                  <Code>BETWEEN</Code>، <Code>LIKE</Code>، مدیریت مقادیر <Code>NULL</Code>
                </li>
                <li>
                  اتصال‌ها: <Code>INNER JOIN</Code>، <Code>LEFT JOIN</Code>، <Code>ON</Code>
                </li>
                <li>
                  تجمیع و گروه‌بندی: <Code>GROUP BY</Code>، <Code>HAVING</Code>،{' '}
                  <Code>COUNT</Code>، <Code>SUM</Code>
                </li>
                <li>
                  پیشرفته: توابع شرطی <Code>CASE</Code>، زیرکوئری‌ها و <Code>CTEs</Code>، توابع پنجره‌ای (<Code>Window Functions</Code>)، <Code>DDL</Code>، <Code>DML</Code>، ایندکس‌ها و تراکنش‌های <Code>ACID</Code>
                </li>
              </ul>

              <p>
                کلیدهای ناوبری و کمکی: <Code>مراحل</Code>، <Code>درس</Code>، <Code>هدف</Code>،{' '}
                <Code>راهنمایی</Code>، <Code>راه‌حل</Code>، <Code>واگرد</Code>، <Code>میز کار آزاد</Code>.
              </p>

              <p>
                شامل <Strong>{levelCount}</Strong> مرحله چالش آموزشی. برای شروع مسیر یادگیری، «مشاهده و انتخاب مراحل» را بزنید یا در میز کار آزاد تمرین کنید.
              </p>

              <h2 className="welcome-h2">LearnSQL چیست؟</h2>
              <p>
                یک آزمایشگاه مرورگری مدرن برای یادگیری عمیق SQL: کوئری‌های واقعی بنویسید و ساختار جداول، مراحل پردازش منطقی و ردیف‌های خروجی را به‌صورت زنده با هدف مقایسه کنید — بدون نیاز به نصب هرگونه ابزار جانبی.
              </p>

              <h2 className="welcome-h2">سازنده و توسعه‌دهنده</h2>
              <p>
                طراحی، پیاده‌سازی و نگهداری توسط <Strong>علی صادقی عقیلی</Strong> — برنامه‌نویس، مهندس داده / دانشمند داده، مهندس یادگیری ماشین.{' '}
                <a href={LINKTR_URL} target="_blank" rel="noopener noreferrer">
                  linktr.ee/aliaghili
                </a>
              </p>
            </>
          ) : locale === 'de' ? (
            <>
              <p>
                Interaktives <Strong>SQL</Strong>-Lernlabor — freier Sandkasten und geführte Level.
              </p>

              <p>
                Die Arbeitsfläche visualisiert den Datenfluss:{' '}
                <Strong>Schema → Logische Pipeline → Ergebnis</Strong>.
              </p>

              <ul className="welcome-list">
                <li>
                  Grundlagen: <Code>SELECT</Code>, <Code>WHERE</Code>,{' '}
                  <Code>ORDER BY</Code>, <Code>LIMIT</Code>
                </li>
                <li>
                  Filter: <Code>AND</Code>/<Code>OR</Code>, <Code>IN</Code>,{' '}
                  <Code>BETWEEN</Code>, <Code>LIKE</Code>, <Code>NULL</Code>
                </li>
                <li>
                  Joins: <Code>INNER JOIN</Code>, <Code>LEFT JOIN</Code>, <Code>ON</Code>
                </li>
                <li>
                  Aggregation: <Code>GROUP BY</Code>, <Code>HAVING</Code>,{' '}
                  <Code>COUNT</Code>, <Code>SUM</Code>
                </li>
                <li>
                  Fortgeschritten: <Code>CASE</Code>, Unterabfragen, <Code>CTEs</Code>, Fensterfunktionen, <Code>DDL</Code>/<Code>DML</Code>, Indizes und <Code>ACID</Code>
                </li>
              </ul>

              <p>
                Befehle: <Code>Level</Code>, <Code>Lektion</Code>, <Code>Ziel</Code>,{' '}
                <Code>Hinweis</Code>, <Code>Lösung</Code>, <Code>Zurücksetzen</Code>, <Code>Sandkasten</Code>.
              </p>

              <p>
                <Strong>{levelCount}</Strong> Level enthalten. Öffnen Sie die Level-Übersicht zum Starten oder nutzen Sie den Sandkasten.
              </p>

              <h2 className="welcome-h2">Was ist LearnSQL?</h2>
              <p>
                Ein interaktives Browser-Labor für SQL: Schreiben Sie echte Abfragen und beobachten Sie Schemata, Ausführungsschritte und Zeilenausgaben live im Vergleich zum Ziel. Keine Installation erforderlich.
              </p>

              <h2 className="welcome-h2">Entwickler</h2>
              <p>
                Entwickelt und gepflegt von <Strong>Ali Sadeghi Aghili</Strong> — Programmierer, Data Engineer / Data Scientist, ML Engineer.{' '}
                <a href={LINKTR_URL} target="_blank" rel="noopener noreferrer">
                  linktr.ee/aliaghili
                </a>
              </p>
            </>
          ) : (
            <>
              <p>
                Interactive <Strong>SQL</Strong> tutorial — sandbox + guided levels.
              </p>

              <p>
                The board shows <Strong>Schema → Pipeline → Result</Strong>. That is the material flow a query manages.
              </p>

              <ul className="welcome-list">
                <li>
                  Basics: <Code>SELECT</Code>, <Code>WHERE</Code>,{' '}
                  <Code>ORDER BY</Code>, <Code>LIMIT</Code>
                </li>
                <li>
                  Filters: <Code>AND</Code>/<Code>OR</Code>, <Code>IN</Code>,{' '}
                  <Code>BETWEEN</Code>, <Code>LIKE</Code>, <Code>NULL</Code>
                </li>
                <li>
                  Joins: <Code>INNER JOIN</Code>, <Code>LEFT JOIN</Code>, <Code>ON</Code>
                </li>
                <li>
                  Aggregation: <Code>GROUP BY</Code>, <Code>HAVING</Code>,{' '}
                  <Code>COUNT</Code>, <Code>SUM</Code>
                </li>
                <li>
                  Advanced: <Code>CASE</Code>, Subqueries, <Code>CTEs</Code>, Window Functions, <Code>DDL</Code>/<Code>DML</Code>, Indexes, and <Code>ACID</Code>
                </li>
              </ul>

              <p>
                Meta controls: <Code>levels</Code>, <Code>lesson</Code>, <Code>goal</Code>,{' '}
                <Code>hint</Code>, <Code>solution</Code>, <Code>undo</Code>, <Code>sandbox</Code>, <Code>help</Code>.
              </p>

              <p>
                <Strong>{levelCount}</Strong> levels included. Open Levels to begin, or stay in sandbox.
              </p>

              <h2 className="welcome-h2">What is LearnSQL?</h2>
              <p>
                A browser lab bench for SQL: you type real queries and watch schema, pipeline stages, and result rows move against a goal. No install required for the tutorial core.
              </p>

              <h2 className="welcome-h2">Publisher</h2>
              <p>
                Published and maintained by <Strong>Ali Sadeghi Aghili</Strong> — programmer, data engineer / scientist, ML engineer.{' '}
                <a href={LINKTR_URL} target="_blank" rel="noopener noreferrer">
                  linktr.ee/aliaghili
                </a>
              </p>
            </>
          )}

          <p>
            •{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              {locale === 'fa'
                ? 'گیت‌هاب — سورس‌کد پروژه و گزارش مشکلات'
                : locale === 'de'
                ? 'GitHub — Quellcode & Fehlerberichte'
                : 'GitHub — source & issues'}
            </a>
          </p>

          <p>
            {locale === 'fa'
              ? 'حمایت مالی در Buy Me a Coffee:'
              : locale === 'de'
              ? 'Kaffee spendieren (unterstützt den Entwickler):'
              : 'Buy Me a Coffee (supports the publisher):'}
          </p>
          <p>
            <a
              className="coffee-btn"
              href={COFFEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Buy me a coffee"
            >
              <img src={COFFEE_BUTTON_IMG} alt="Buy me a coffee" height={40} />
            </a>
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose}>
            {t('sandboxBtn', locale)}
          </button>
          <button type="button" className="primary" onClick={onOpenLevels}>
            {locale === 'fa'
              ? 'مشاهده و انتخاب مراحل'
              : locale === 'de'
              ? 'Level öffnen'
              : 'Open levels'}
          </button>
        </div>
      </div>
    </div>
  );
}
