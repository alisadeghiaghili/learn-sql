/**
 * Intro / objective dialog (markdown-ish steps).
 */

import { useState } from 'react';
import type { DialogStep } from '../levels/types';

interface DialogModalProps {
  title: string;
  steps: DialogStep[];
  onClose: () => void;
}

/**
 * Multi-step level introduction modal.
 */
export function DialogModal({ title, steps, onClose }: DialogModalProps) {
  const [index, setIndex] = useState(0);
  if (steps.length === 0) return null;
  const step = steps[Math.min(index, steps.length - 1)];
  const isLast = index >= steps.length - 1;

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-label={title}>
        <div className="modal-header">
          <h2>{title}</h2>
          <span className="level-meta">
            {index + 1} / {steps.length}
          </span>
        </div>
        <div className="modal-body">
          {(step.beforeMarkdowns ?? step.markdowns).map((text, i) =>
            text ? <p key={i}>{renderInline(text)}</p> : <br key={i} />,
          )}
          {step.command && (
            <pre
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                background: 'var(--base)',
                border: '1px solid var(--border)',
                padding: 10,
                borderRadius: 5,
                overflow: 'auto',
              }}
            >
              {step.command}
            </pre>
          )}
          {step.afterMarkdowns?.map((text, i) =>
            text ? <p key={`a${i}`}>{renderInline(text)}</p> : null,
          )}
        </div>
        <div className="modal-footer">
          {index > 0 && (
            <button type="button" onClick={() => setIndex((i) => i - 1)}>
              Back
            </button>
          )}
          {!isLast ? (
            <button
              type="button"
              className="primary"
              onClick={() => setIndex((i) => i + 1)}
            >
              Next
            </button>
          ) : (
            <button type="button" className="primary" onClick={onClose}>
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function renderInline(text: string) {
  // Minimal `code` support without a markdown dependency.
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('## ')) {
      return <strong key={i}>{part.slice(3)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
