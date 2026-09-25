/**
 * Bottom console — log + command input (SQL or meta).
 */

import { useEffect, useRef, useState } from 'react';

export interface LogLine {
  id: number;
  text: string;
  kind: 'cmd' | 'err' | 'ok' | 'muted' | 'info';
}

interface ConsoleProps {
  lines: LogLine[];
  onSubmit: (input: string) => void;
}

/**
 * LGB-style command console.
 */
export function Console({ lines, onSubmit }: ConsoleProps) {
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [lines]);

  function submit() {
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
    setHistory((h) => [...h, text]);
    setHistIdx(-1);
    setValue('');
  }

  return (
    <footer className="console">
      <div className="console-log" ref={logRef} aria-live="polite">
        {lines.map((line) => (
          <div key={line.id} className={`log-line ${line.kind}`}>
            {line.text}
          </div>
        ))}
      </div>
      <div className="console-input-row">
        <span className="console-prompt">sql&gt;</span>
        <input
          ref={inputRef}
          className="console-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submit();
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              if (history.length === 0) return;
              const next =
                histIdx < 0
                  ? history.length - 1
                  : Math.max(0, histIdx - 1);
              setHistIdx(next);
              setValue(history[next] ?? '');
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              if (histIdx < 0) return;
              const next = histIdx + 1;
              if (next >= history.length) {
                setHistIdx(-1);
                setValue('');
              } else {
                setHistIdx(next);
                setValue(history[next] ?? '');
              }
            }
          }}
          placeholder="SQL or meta command (help)"
          spellCheck={false}
          autoComplete="off"
          aria-label="Command input"
        />
        <button type="button" className="primary" onClick={submit}>
          Run
        </button>
      </div>
    </footer>
  );
}
