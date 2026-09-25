/**
 * Schema rail — tables, columns, row counts.
 */

import type { TableInfo } from '../engine/types';

interface SchemaPanelProps {
  tables: TableInfo[];
  onInsertTableName?: (name: string) => void;
}

/**
 * Left rail showing live schema of the SQLite database.
 */
export function SchemaPanel({ tables, onInsertTableName }: SchemaPanelProps) {
  return (
    <aside className="panel">
      <div className="panel-header">
        <span>schema</span>
        <span>{tables.length} tables</span>
      </div>
      <div className="panel-body">
        {tables.length === 0 && (
          <div className="empty-state">No tables yet</div>
        )}
        {tables.map((table) => (
          <div key={table.name} className="table-card">
            <h3>
              <button
                type="button"
                className="ghost"
                style={{
                  border: 0,
                  padding: 0,
                  background: 'transparent',
                  color: 'inherit',
                  font: 'inherit',
                  textAlign: 'left',
                }}
                onClick={() => onInsertTableName?.(table.name)}
                title="Insert table name into editor"
              >
                {table.name}
              </button>
              <em>{table.rowCount} rows</em>
            </h3>
            {table.columns.map((col) => (
              <div key={col.name} className="col-row">
                <span>
                  {col.pk && <span className="pk">PK </span>}
                  {col.name}
                  {col.notnull && !col.pk ? '' : ''}
                </span>
                <span className="type">{col.type || 'ANY'}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
