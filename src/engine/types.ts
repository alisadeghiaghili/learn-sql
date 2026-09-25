/**
 * Core engine types for LearnSQL.
 */

/** A single SQL statement result. */
export interface QueryResult {
  /** Column names in result order. */
  columns: string[];
  /** Row values aligned with `columns`. */
  rows: unknown[][];
  /** Rows affected for DML/DDL (0 for pure SELECT). */
  changes: number;
  /** Optional human summary (e.g. "3 rows"). */
  message?: string;
}

/** Schema snapshot for the UI. */
export interface TableInfo {
  name: string;
  columns: { name: string; type: string; pk: boolean; notnull: boolean }[];
  rowCount: number;
}

/** Win condition kinds (see DESIGN.md). */
export type WinCondition =
  | {
      type: 'result';
      columns: string[];
      rows: unknown[][];
      /** When true, row order must match. Default false (bag equality). */
      orderMatters?: boolean;
    }
  | {
      type: 'table';
      table: string;
      columns: string[];
      rows: unknown[][];
      orderMatters?: boolean;
    }
  | {
      type: 'schema';
      tables: string[];
    };

/** Outcome of comparing player state to a win condition. */
export interface WinCheck {
  solved: boolean;
  /** Short explanation for the console / goal panel. */
  reason: string;
  /** Cell-level match map for result goals (row-major). */
  cellMatches?: boolean[][];
}

export class SqlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SqlError';
  }
}
