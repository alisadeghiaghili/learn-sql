/**
 * Result grid with optional goal cell highlighting.
 */

import type { QueryResult } from '../engine/types';

interface ResultGridProps {
  result: QueryResult | null;
  cellMatches?: boolean[][] | undefined;
  error?: string | null;
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return 'NULL';
  return String(value);
}

/**
 * Tabular display of a query result.
 */
export function ResultGrid({ result, cellMatches, error }: ResultGridProps) {
  if (error) {
    return (
      <div className="result-wrap">
        <div className="result-status">
          <span className="err">{error}</span>
        </div>
        <div className="empty-state">Fix the statement and run again.</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-wrap">
        <div className="result-status">
          <span>ready</span>
        </div>
        <div className="empty-state">
          Run a query to see rows here. Meta commands: type <code>help</code>.
        </div>
      </div>
    );
  }

  const hasCols = result.columns.length > 0;

  return (
    <div className="result-wrap">
      <div className="result-status">
        <span className="ok">{result.message ?? 'OK'}</span>
        <span>{hasCols ? `${result.columns.length} cols` : 'no result set'}</span>
      </div>
      {!hasCols && (
        <div className="empty-state">
          Statement completed. {result.changes} row(s) affected.
        </div>
      )}
      {hasCols && (
        <div className="grid-scroll">
          <table className="data-grid">
            <thead>
              <tr>
                <th>#</th>
                {result.columns.map((col, i) => (
                  <th key={`${col}-${i}`}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, r) => {
                const rowMatch =
                  cellMatches?.[r] != null && cellMatches[r].every(Boolean);
                return (
                  <tr key={r} className={rowMatch ? 'row-match' : undefined}>
                    <td className="null">{r + 1}</td>
                    {row.map((cell, c) => {
                      const isNull = cell === null || cell === undefined;
                      let cls = isNull ? 'null' : '';
                      const matchFlag = cellMatches?.[r]?.[c];
                      if (matchFlag === true) cls = 'match';
                      if (matchFlag === false) cls = 'miss';
                      return (
                        <td key={c} className={cls}>
                          {formatCell(cell)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
