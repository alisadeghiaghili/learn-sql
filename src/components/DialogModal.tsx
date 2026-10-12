/**
 * Intro / objective dialog with RStudio-style cheat sheet diagrams
 * and pedagogically rich lesson formatting.
 */

import { useState } from 'react';
import type { DialogStep } from '../levels/types';
import { CheatSheetDiagram } from './CheatSheetDiagram';

interface DialogModalProps {
  title: string;
  steps: DialogStep[];
  onClose: () => void;
}

export function DialogModal({ title, steps, onClose }: DialogModalProps) {
  const [index, setIndex] = useState(0);
  if (steps.length === 0) return null;
  const step = steps[Math.min(index, steps.length - 1)];
  const isLast = index >= steps.length - 1;

  const rawLines = step.beforeMarkdowns ?? step.markdowns;

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-label={title}>
        <div className="modal-header">
          <h2>{title}</h2>
          <span className="level-meta">
            گام {index + 1} از {steps.length}
          </span>
        </div>
        <div className="modal-body">
          {renderBlocks(rawLines, step.diagram)}

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
              }}
            >
              {step.command}
            </pre>
          )}

          {step.afterMarkdowns && renderBlocks(step.afterMarkdowns)}
        </div>
        <div className="modal-footer">
          {index > 0 && (
            <button type="button" onClick={() => setIndex((i) => i - 1)}>
              قبلی (Back)
            </button>
          )}
          {!isLast ? (
            <button
              type="button"
              className="primary"
              onClick={() => setIndex((i) => i + 1)}
            >
              گام بعدی (Next)
            </button>
          ) : (
            <button type="button" className="primary" onClick={onClose}>
              شروع حل تمرین (Start)
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
  // Supports **bold** and `code`
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

function renderBlocks(lines: string[], diagramType?: string) {
  const elements: React.ReactNode[] = [];
  let diagramRendered = false;

  // If a diagram is explicitly provided on the step, render it after the first heading or at top
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (!line || line.trim() === '') {
      elements.push(<div key={`br-${i}`} style={{ height: 6 }} />);
      i++;
      continue;
    }

    const trimmed = line.trim();

    // Check for inline diagram directive ::diagram <type>
    if (trimmed.startsWith('::diagram')) {
      const parts = trimmed.split(/\s+/);
      const dType = parts[1] || diagramType;
      if (dType) {
        elements.push(<CheatSheetDiagram key={`diag-${i}`} type={dType} />);
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

      // If diagram has not been rendered yet and was passed in step.diagram, place it right under the heading
      if (diagramType && !diagramRendered) {
        elements.push(<CheatSheetDiagram key={`step-diag-${i}`} type={diagramType} />);
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
        calloutText.includes('Pitfall');
      const isTip =
        calloutText.includes('💡') ||
        calloutText.includes('نکته') ||
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

    // Unordered lists (- or *)
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

    // Numbered lists (1. , 2. )
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

    // Code block inside markdown (``` ... ```)
    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
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

    // Regular paragraph
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

  // If diagram was not rendered yet and is provided, append at top/end
  if (diagramType && !diagramRendered) {
    elements.unshift(<CheatSheetDiagram key="fallback-diag" type={diagramType} />);
  }

  return elements;
}
