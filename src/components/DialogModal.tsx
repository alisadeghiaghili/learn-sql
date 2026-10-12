/**
 * Intro / objective dialog with RStudio-style cheat sheet diagrams
 * and fluent trilingual support (fa, en, de).
 */

import { useState } from 'react';
import type { DialogStep } from '../levels/types';
import { resolveMarkdowns } from '../levels/types';
import { type Locale, t } from '../i18n';
import { CheatSheetDiagram } from './CheatSheetDiagram';

interface DialogModalProps {
  title: string;
  steps: DialogStep[];
  onClose: () => void;
  locale?: Locale;
}

export function DialogModal({ title, steps, onClose, locale = 'fa' }: DialogModalProps) {
  const [index, setIndex] = useState(0);
  if (steps.length === 0) return null;
  const step = steps[Math.min(index, steps.length - 1)];
  const isLast = index >= steps.length - 1;
  const isRtl = locale === 'fa';

  const rawLines = resolveMarkdowns(step.beforeMarkdowns ?? step.markdowns, locale);
  const afterLines = resolveMarkdowns(step.afterMarkdowns, locale);

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-label={title} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        <div className="modal-header">
          <h2>{title}</h2>
          <span className="level-meta">
            {t('stepOf', locale)} {index + 1} {t('of', locale)} {steps.length}
          </span>
        </div>
        <div className="modal-body">
          {renderBlocks(rawLines, step.diagram, locale)}

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
                margin: '12px 0',
                direction: 'ltr',
              }}
            >
              {step.command}
            </pre>
          )}

          {afterLines.length > 0 && renderBlocks(afterLines, undefined, locale)}
        </div>
        <div className="modal-footer">
          {index > 0 && (
            <button type="button" onClick={() => setIndex((i) => i - 1)}>
              {t('back', locale)}
            </button>
          )}
          {!isLast ? (
            <button
              type="button"
              className="primary"
              onClick={() => setIndex((i) => i + 1)}
            >
              {t('next', locale)}
            </button>
          ) : (
            <button type="button" className="primary" onClick={onClose}>
              {t('start', locale)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function hasRtl(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

function renderInline(text: string) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return <strong key={i}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      return <code key={i}>{token.slice(1, -1)}</code>;
    }
    return <span key={i}>{token}</span>;
  });
}

function renderBlocks(lines: string[], diagramType?: string, locale: Locale = 'fa') {
  const elements: React.ReactNode[] = [];
  let diagramRendered = false;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (!line || line.trim() === '') {
      elements.push(<div key={`br-${i}`} style={{ height: 6 }} />);
      i++;
      continue;
    }

    const trimmed = line.trim();

    // Inline diagram directive
    if (trimmed.startsWith('::diagram')) {
      const parts = trimmed.split(/\s+/);
      const dType = parts[1] || diagramType;
      if (dType) {
        elements.push(<CheatSheetDiagram key={`diag-${i}`} type={dType} locale={locale} />);
        diagramRendered = true;
      }
      i++;
      continue;
    }

    // Headings
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h3
          key={`h2-${i}`}
          style={{
            margin: '10px 0 8px',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--ink)',
            direction: hasRtl(trimmed) ? 'rtl' : 'ltr',
          }}
        >
          {renderInline(trimmed.slice(3))}
        </h3>,
      );

      if (diagramType && !diagramRendered) {
        elements.push(<CheatSheetDiagram key={`step-diag-${i}`} type={diagramType} locale={locale} />);
        diagramRendered = true;
      }

      i++;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h4
          key={`h3-${i}`}
          style={{
            margin: '8px 0 6px',
            fontSize: 13.5,
            fontWeight: 600,
            color: 'var(--accent)',
            direction: hasRtl(trimmed) ? 'rtl' : 'ltr',
          }}
        >
          {renderInline(trimmed.slice(4))}
        </h4>,
      );
      i++;
      continue;
    }

    // Callout / Blockquote
    if (trimmed.startsWith('> ')) {
      const calloutText = trimmed.slice(2);
      const isWarn =
        calloutText.includes('⚠️') ||
        calloutText.includes('هشدار') ||
        calloutText.includes('خطای رایج') ||
        calloutText.includes('Warnung') ||
        calloutText.includes('Pitfall');
      const isTip =
        calloutText.includes('💡') ||
        calloutText.includes('نکته') ||
        calloutText.includes('Hinweis') ||
        calloutText.includes('Tip');

      const calloutClass = isWarn
        ? 'lesson-callout warning'
        : isTip
        ? 'lesson-callout tip'
        : 'lesson-callout';

      elements.push(
        <div
          key={`callout-${i}`}
          className={calloutClass}
          style={{ direction: hasRtl(calloutText) ? 'rtl' : 'ltr' }}
        >
          {renderInline(calloutText)}
        </div>,
      );
      i++;
      continue;
    }

    // Unordered lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          className="lesson-list"
          style={{ direction: hasRtl(listItems[0] || '') ? 'rtl' : 'ltr' }}
        >
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          className="lesson-list"
          style={{ direction: hasRtl(listItems[0] || '') ? 'rtl' : 'ltr' }}
        >
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Code blocks
    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;
      elements.push(
        <pre
          key={`codeblock-${i}`}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            background: 'var(--base)',
            border: '1px solid var(--border)',
            padding: 10,
            borderRadius: 5,
            overflow: 'auto',
            margin: '8px 0',
            direction: 'ltr',
          }}
        >
          {codeLines.join('\n')}
        </pre>,
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        style={{
          margin: '0 0 8px',
          lineHeight: 1.6,
          direction: hasRtl(trimmed) ? 'rtl' : 'ltr',
        }}
      >
        {renderInline(trimmed)}
      </p>,
    );
    i++;
  }

  if (diagramType && !diagramRendered) {
    elements.unshift(<CheatSheetDiagram key="fallback-diag" type={diagramType} locale={locale} />);
  }

  return elements;
}
