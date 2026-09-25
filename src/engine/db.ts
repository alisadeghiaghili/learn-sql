/**
 * sql.js (SQLite/WASM) wrapper for LearnSQL.
 *
 * Loads sql-wasm.wasm from the Vite asset URL in the browser and from
 * node_modules on disk under Node (unit tests).
 */

import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js';
import type { QueryResult, TableInfo } from './types';
import { SqlError } from './types';

let sqlPromise: Promise<SqlJsStatic> | null = null;

function isNode(): boolean {
  return typeof process !== 'undefined' && !!process.versions?.node;
}

async function loadSqlJs(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    if (isNode()) {
      const path = await import(/* @vite-ignore */ 'node:path');
      const { createRequire } = await import(/* @vite-ignore */ 'node:module');
      const req = createRequire(import.meta.url);
      // require.resolve('sql.js') already points at .../dist/sql-wasm.js
      const distDir = path.dirname(req.resolve('sql.js'));
      sqlPromise = initSqlJs({
        locateFile: (file: string) => path.join(distDir, file),
      });
    } else {
      const wasmUrl = (await import('sql.js/dist/sql-wasm.wasm?url')).default;
      sqlPromise = initSqlJs({
        locateFile: () => wasmUrl,
      });
    }
  }
  return sqlPromise;
}

/** Live in-browser SQLite database. */
export class LearnSqlDb {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  /**
   * Execute one or more SQL statements.
   *
   * @param sql - SQL text; multiple statements separated by semicolons.
   * @returns The last result set (or empty for pure DML).
   * @throws {SqlError} On syntax or constraint errors.
   */
  run(sql: string): QueryResult {
    const trimmed = sql.trim();
    if (!trimmed) {
      throw new SqlError('Empty statement');
    }

    try {
      const statements = this.db.exec(trimmed);
      if (statements.length === 0) {
        return {
          columns: [],
          rows: [],
          changes: this.db.getRowsModified(),
          message: 'OK',
        };
      }
      const last = statements[statements.length - 1];
      const changes = this.db.getRowsModified();
      return {
        columns: last.columns,
        rows: last.values,
        changes,
        message:
          last.columns.length > 0
            ? `${last.values.length} row${last.values.length === 1 ? '' : 's'}`
            : changes > 0
              ? `${changes} row${changes === 1 ? '' : 's'} affected`
              : 'OK',
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new SqlError(msg);
    }
  }

  /**
   * Execute a script that must not return a result set (DDL / seed data).
   *
   * @param sql - Multi-statement SQL script.
   * @throws {SqlError} On failure.
   */
  execScript(sql: string): void {
    try {
      this.db.exec(sql);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new SqlError(msg);
    }
  }

  /** Dump a single table as a result set. */
  dumpTable(table: string): QueryResult {
    const safe = table.replace(/"/g, '""');
    return this.run('SELECT * FROM "' + safe + '"');
  }

  /** List user tables with columns and row counts. */
  listTables(): TableInfo[] {
    const tablesRes = this.run(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
    );

    return tablesRes.rows.map((row) => {
      const name = String(row[0]);
      const safe = name.replace(/"/g, '""');
      const info = this.run('PRAGMA table_info("' + safe + '")');
      const count = this.run('SELECT COUNT(*) FROM "' + safe + '"');
      return {
        name,
        columns: info.rows.map((r) => ({
          name: String(r[1]),
          type: String(r[2] || ''),
          pk: Number(r[5]) > 0,
          notnull: Number(r[3]) > 0,
        })),
        rowCount: Number(count.rows[0]?.[0] ?? 0),
      };
    });
  }

  /** Whether a table exists. */
  hasTable(name: string): boolean {
    const safe = name.replace(/'/g, "''");
    const check = this.run(
      "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = '" + safe + "'",
    );
    return check.rows.length > 0;
  }

  /** Close the underlying database. */
  close(): void {
    this.db.close();
  }
}

/**
 * Create a database from schema and optional seed data.
 *
 * @param schema - CREATE TABLE / index statements.
 * @param seed - INSERT statements (optional).
 * @returns Ready-to-use database.
 */
export async function createDatabase(
  schema = '',
  seed = '',
): Promise<LearnSqlDb> {
  const SQL = await loadSqlJs();
  const db = new SQL.Database();
  const engine = new LearnSqlDb(db);
  if (schema.trim()) engine.execScript(schema);
  if (seed.trim()) engine.execScript(seed);
  return engine;
}
