/**
 * Rich SQL Editor component with:
 * 1. Syntax highlighting overlay (keywords, functions, tables, columns, strings, numbers, comments).
 * 2. SSMS-style IntelliSense autocompletion popup with table/column/keyword icons and doc details.
 * 3. Automatic SQL keyword auto-casing on typing space/enter/semicolon.
 * 4. Caret position tracking and scroll synchronization.
 */

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { TableInfo } from '../engine/types';
import {
  autoFormatSqlCasing,
  buildCandidates,
  completeToken,
  getSuggestions,
  type SuggestionItem,
} from '../autocomplete';
import { highlightSqlToHtml } from '../syntax';

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  onRun: () => void;
  tables: TableInfo[];
  placeholder?: string;
  className?: string;
}

export function SqlEditor({
  value,
  onChange,
  onRun,
  tables,
  placeholder,
  className = '',
}: SqlEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  // IntelliSense state
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<{
    items: SuggestionItem[];
    token: string;
    tokenStart: number;
    isDot: boolean;
  } | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);

  // Precomputed table and column names for syntax highlighting
  const tableNames = useMemo(
    () => new Set(tables.map((t) => t.name.toLowerCase())),
    [tables],
  );
  const columnNames = useMemo(() => {
    const set = new Set<string>();
    for (const t of tables) {
      for (const c of t.columns) {
        set.add(c.name.toLowerCase());
      }
    }
    return set;
  }, [tables]);

  // Synchronize scroll between textarea and highlighted overlay
  const handleScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  // Update popup position based on cursor in textarea
  const updatePopup = useCallback(
    (textVal: string, cursor: number) => {
      const sug = getSuggestions(textVal, cursor, tables);
      if (!sug || sug.items.length === 0) {
        setSuggestions(null);
        setPopupPos(null);
        return;
      }

      setSuggestions(sug);
      setActiveSuggestionIndex(0);

      const ta = textareaRef.current;
      if (!ta) return;

      // Approximate coordinates based on text line and column
      const textBefore = textVal.slice(0, cursor);
      const lines = textBefore.split('\n');
      const lineNum = lines.length;
      const colNum = lines[lines.length - 1].length;

      // Line height ~ 20px, char width ~ 7.8px with 13px mono font
      const lineHeight = 20;
      const charWidth = 7.8;
      const top = Math.min(ta.clientHeight - 40, (lineNum * lineHeight) - ta.scrollTop + 14);
      const left = Math.min(ta.clientWidth - 220, Math.max(14, (colNum * charWidth) - ta.scrollLeft + 14));

      setPopupPos({ top, left });
    },
    [tables],
  );

  const applySuggestion = useCallback(
    (item: SuggestionItem) => {
      if (!suggestions || !textareaRef.current) return;
      const ta = textareaRef.current;
      const cursor = ta.selectionStart;
      const before = value.slice(0, suggestions.tokenStart);
      const after = value.slice(cursor);
      const nextVal = before + item.label + after;
      const nextCursor = suggestions.tokenStart + item.label.length;

      onChange(nextVal);
      setSuggestions(null);
      setPopupPos(null);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(nextCursor, nextCursor);
        }
      }, 0);
    },
    [onChange, suggestions, value],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 1. Run query on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      setSuggestions(null);
      onRun();
      return;
    }

    // 2. IntelliSense navigation when popup is visible
    if (suggestions && suggestions.items.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex((i) => (i + 1) % suggestions.items.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex((i) =>
          i === 0 ? suggestions.items.length - 1 : i - 1,
        );
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        const item = suggestions.items[activeSuggestionIndex];
        if (item) applySuggestion(item);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setSuggestions(null);
        return;
      }
    }

    // 3. Fallback Tab-key completion if popup is not active
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart ?? value.length;
      const res = completeToken(value, start, buildCandidates(tables));
      if (res) {
        onChange(res.value);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.setSelectionRange(res.cursor, res.cursor);
          }
        }, 0);
      }
      return;
    }

    // 4. Trigger auto-casing on space or semicolon
    if (e.key === ' ' || e.key === ';' || e.key === 'Enter') {
      const ta = e.currentTarget;
      const cursor = ta.selectionStart;
      const formatted = autoFormatSqlCasing(value, cursor);
      if (formatted.text !== value) {
        onChange(formatted.text);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextVal = e.target.value;
    const cursor = e.target.selectionStart;
    onChange(nextVal);
    updatePopup(nextVal, cursor);
  };

  const handleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    updatePopup(value, e.currentTarget.selectionStart);
  };

  const highlightedHtml = useMemo(() => {
    return highlightSqlToHtml(value, tableNames, columnNames);
  }, [value, tableNames, columnNames]);

  return (
    <div className={`sql-editor-container ${className}`}>
      {/* Background syntax highlighting overlay */}
      <div
        ref={highlightRef}
        className="sql-highlight-overlay"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: highlightedHtml + '\n' }}
      />

      {/* Actual interactive textarea */}
      <textarea
        ref={textareaRef}
        className="sql-editor-textarea"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onScroll={handleScroll}
        placeholder={placeholder}
        spellCheck={false}
        aria-label="SQL editor"
      />

      {/* SSMS IntelliSense Popup */}
      {suggestions && popupPos && (
        <div
          className="ssms-popup"
          style={{ top: popupPos.top, left: popupPos.left }}
          role="listbox"
        >
          <div className="ssms-popup-header">
            <span>SQL IntelliSense</span>
            <span>{suggestions.items.length} suggestions</span>
          </div>
          <div className="ssms-list">
            {suggestions.items.slice(0, 15).map((item, idx) => {
              const isSelected = idx === activeSuggestionIndex;
              let iconChar = 'T';
              let iconCls = 'table';
              if (item.kind === 'column') {
                iconChar = 'C';
                iconCls = 'column';
              } else if (item.kind === 'function') {
                iconChar = 'ƒ';
                iconCls = 'function';
              } else if (item.kind === 'keyword') {
                iconChar = 'K';
                iconCls = 'keyword';
              }

              return (
                <div
                  key={item.label + item.kind}
                  className={`ssms-item ${isSelected ? 'active' : ''}`}
                  onClick={() => applySuggestion(item)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className={`ssms-icon ${iconCls}`}>{iconChar}</span>
                  <span className="ssms-label">{item.label}</span>
                  {item.detail && (
                    <span className="ssms-detail">{item.detail}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
