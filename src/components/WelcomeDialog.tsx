/**
 * First-run welcome dialog — product map, tracks, publisher.
 */

import type { ReactNode } from 'react';
import { allLevels } from '../levels';

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
}

/**
 * Landing card shown once (unless ?NODEMO) — mirrors the LearnDVC welcome.
 */
export function WelcomeDialog({ onClose, onOpenLevels }: WelcomeDialogProps) {
  const levelCount = allLevels.length;

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal welcome-modal"
        role="dialog"
        aria-label="LearnSQL"
      >
        <div className="modal-body welcome-body">
          <h1 className="welcome-title">LearnSQL</h1>

          <p>
            Interactive <Strong>SQL</Strong> tutorial — sandbox + guided
            levels.
          </p>

          <p>
            The board shows <Strong>Schema → Pipeline → Result</Strong>. That
            is the material flow a query manages.
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
              Joins: <Code>JOIN</Code>, <Code>LEFT JOIN</Code>, <Code>ON</Code>
            </li>
            <li>
              Aggregation: <Code>GROUP BY</Code>, <Code>HAVING</Code>,{' '}
              <Code>COUNT</Code>, <Code>SUM</Code>
            </li>
          </ul>

          <p>
            Meta: <Code>levels</Code>, <Code>hint</Code>,{' '}
            <Code>show goal</Code>, <Code>show solution</Code>,{' '}
            <Code>reset</Code>, <Code>sandbox</Code>, <Code>help</Code>.
          </p>

          <p>
            <Strong>{levelCount}</Strong> levels included. Open Levels to
            begin, or stay in sandbox.
          </p>

          <h2 className="welcome-h2">What is LearnSQL?</h2>
          <p>
            A browser lab bench for SQL: you type real queries and watch
            schema, pipeline stages, and result rows move against a goal. No
            install required for the tutorial core.
          </p>

          <h2 className="welcome-h2">Publisher</h2>
          <p>
            Published and maintained by <Strong>Ali Sadeghi Aghili</Strong> —
            programmer, data engineer / scientist, ML engineer.{' '}
            <a href={LINKTR_URL} target="_blank" rel="noopener noreferrer">
              linktr.ee/aliaghili
            </a>
          </p>

          <p>
            •{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub — source &amp; issues
            </a>
          </p>

          <p>Buy Me a Coffee (supports the publisher):</p>
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

          <p>
            Toolbar: <Strong>Lesson</Strong> (replay level intro) ·{' '}
            <Strong>GitHub</Strong> · <Strong>Buy me a coffee</Strong>.
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose}>
            Sandbox
          </button>
          <button type="button" className="primary" onClick={onOpenLevels}>
            Open levels
          </button>
        </div>
      </div>
    </div>
  );
}
