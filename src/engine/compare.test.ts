/**
 * Compare tests for level win conditions.
 */

import { describe, expect, it } from 'vitest';
import { checkWin, compareResults } from './compare';

describe('compareResults', () => {
  it('matches identical results', () => {
    const result = compareResults(
      { columns: ['id', 'name'], rows: [[1, 'Ada'], [2, 'Alan']] },
      { columns: ['id', 'name'], rows: [[1, 'Ada'], [2, 'Alan']] },
    );
    expect(result.solved).toBe(true);
  });

  it('is order-insensitive by default', () => {
    const result = compareResults(
      { columns: ['name'], rows: [['Alan'], ['Ada']] },
      { columns: ['name'], rows: [['Ada'], ['Alan']] },
    );
    expect(result.solved).toBe(true);
  });

  it('respects orderMatters', () => {
    const result = compareResults(
      { columns: ['name'], rows: [['Alan'], ['Ada']] },
      { columns: ['name'], rows: [['Ada'], ['Alan']], orderMatters: true },
    );
    expect(result.solved).toBe(false);
  });

  it('detects column mismatch', () => {
    const result = compareResults(
      { columns: ['id'], rows: [[1]] },
      { columns: ['name'], rows: [['Ada']] },
    );
    expect(result.solved).toBe(false);
    expect(result.reason).toMatch(/Column/);
  });

  it('detects row count mismatch', () => {
    const result = compareResults(
      { columns: ['id'], rows: [[1], [2]] },
      { columns: ['id'], rows: [[1]] },
    );
    expect(result.solved).toBe(false);
    expect(result.reason).toMatch(/Row count/);
  });

  it('compares null and numbers distinctly', () => {
    const nullMatch = compareResults(
      { columns: ['v'], rows: [[null]] },
      { columns: ['v'], rows: [[null]] },
    );
    expect(nullMatch.solved).toBe(true);

    const numVsStr = compareResults(
      { columns: ['v'], rows: [[1]] },
      { columns: ['v'], rows: [['1']] },
    );
    expect(numVsStr.solved).toBe(false);
  });
});

describe('checkWin', () => {
  it('requires a result for result goals', () => {
    const win = checkWin(
      { type: 'result', columns: ['id'], rows: [[1]] },
      { lastResult: null },
    );
    expect(win.solved).toBe(false);
  });

  it('accepts a matching result', () => {
    const win = checkWin(
      { type: 'result', columns: ['id'], rows: [[1]] },
      { lastResult: { columns: ['id'], rows: [[1]], changes: 0 } },
    );
    expect(win.solved).toBe(true);
  });

  it('checks table dumps for table goals', () => {
    const win = checkWin(
      { type: 'table', table: 't', columns: ['id'], rows: [[1]] },
      { table: { columns: ['id'], rows: [[2]], changes: 0 } },
    );
    expect(win.solved).toBe(false);
  });
});
