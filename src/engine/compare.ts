/**
 * Result-set comparison used by level win conditions.
 */

import type { QueryResult, WinCheck, WinCondition } from './types';

function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) return 'null:';
  if (typeof value === 'number') return `n:${value}`;
  if (typeof value === 'boolean') return `b:${value}`;
  if (value instanceof Uint8Array) return `blob:${Array.from(value).join(',')}`;
  return `s:${String(value)}`;
}

function normalizeRow(row: unknown[]): string[] {
  return row.map(normalizeValue);
}

/**
 * Compare two result shapes (columns + rows).
 *
 * @param actual - Result produced by the player.
 * @param expected - Goal shape.
 * @returns Whether the shapes match and a diagnostic reason.
 */
export function compareResults(
  actual: Pick<QueryResult, 'columns' | 'rows'>,
  expected: { columns: string[]; rows: unknown[][]; orderMatters?: boolean },
): WinCheck {
  const actualCols = actual.columns.map((c) => c.toLowerCase());
  const expectedCols = expected.columns.map((c) => c.toLowerCase());

  if (actualCols.length !== expectedCols.length) {
    return {
      solved: false,
      reason: `Column count ${actualCols.length} != expected ${expectedCols.length}`,
    };
  }

  for (let i = 0; i < expectedCols.length; i += 1) {
    if (actualCols[i] !== expectedCols[i]) {
      return {
        solved: false,
        reason: `Column ${i + 1} is "${actual.columns[i]}", expected "${expected.columns[i]}"`,
      };
    }
  }

  if (actual.rows.length !== expected.rows.length) {
    return {
      solved: false,
      reason: `Row count ${actual.rows.length} != expected ${expected.rows.length}`,
    };
  }

  const expectedNorm = expected.rows.map(normalizeRow);
  const actualNorm = actual.rows.map(normalizeRow);

  if (expected.orderMatters) {
    const cellMatches: boolean[][] = [];
    for (let r = 0; r < expectedNorm.length; r += 1) {
      const rowMatch: boolean[] = [];
      for (let c = 0; c < expectedNorm[r].length; c += 1) {
        rowMatch.push(actualNorm[r][c] === expectedNorm[r][c]);
      }
      cellMatches.push(rowMatch);
      if (rowMatch.some((ok) => !ok)) {
        return {
          solved: false,
          reason: `Row ${r + 1} does not match the goal`,
          cellMatches,
        };
      }
    }
    return { solved: true, reason: 'Result matches goal', cellMatches };
  }

  const remaining = actualNorm.map((row, idx) => ({ row, idx, used: false }));
  const cellMatches: boolean[][] = expectedNorm.map(() =>
    expected.columns.map(() => false),
  );

  for (let e = 0; e < expectedNorm.length; e += 1) {
    let found = false;
    for (const candidate of remaining) {
      if (candidate.used) continue;
      if (
        candidate.row.length === expectedNorm[e].length &&
        candidate.row.every((v, i) => v === expectedNorm[e][i])
      ) {
        candidate.used = true;
        cellMatches[e] = expectedNorm[e].map(() => true);
        found = true;
        break;
      }
    }
    if (!found) {
      let bestIdx = -1;
      let bestScore = -1;
      for (const candidate of remaining) {
        if (candidate.used) continue;
        let score = 0;
        for (let i = 0; i < expectedNorm[e].length; i += 1) {
          if (candidate.row[i] === expectedNorm[e][i]) score += 1;
        }
        if (score > bestScore) {
          bestScore = score;
          bestIdx = candidate.idx;
        }
      }
      if (bestIdx >= 0) {
        cellMatches[e] = expectedNorm[e].map(
          (v, i) => actualNorm[bestIdx][i] === v,
        );
      }
      return {
        solved: false,
        reason: `Missing expected row ${e + 1}: (${expectedNorm[e]
          .map((v) => v.replace(/^(null|n|b|s):/, ''))
          .join(', ')})`,
        cellMatches,
      };
    }
  }

  return { solved: true, reason: 'Result matches goal', cellMatches };
}

/**
 * Evaluate a win condition against the current engine state.
 *
 * @param condition - Goal from the level definition.
 * @param context - Live query result and/or table dump.
 */
export function checkWin(
  condition: WinCondition,
  context: {
    lastResult?: QueryResult | null;
    table?: QueryResult | null;
  },
): WinCheck {
  if (condition.type === 'result') {
    if (!context.lastResult) {
      return { solved: false, reason: 'Run a query to produce a result' };
    }
    return compareResults(context.lastResult, condition);
  }

  if (condition.type === 'table') {
    if (!context.table) {
      return {
        solved: false,
        reason: `Table "${condition.table}" is not available`,
      };
    }
    return compareResults(context.table, condition);
  }

  return { solved: true, reason: 'Schema goal (checked separately)' };
}
