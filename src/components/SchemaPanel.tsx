/**
 * Schema rail — tables, columns, row counts.
 * Fluently localized in Persian (fa), English (en), and German (de).
 */

import type { TableInfo } from '../engine/types';
import { type Locale, t } from '../i18n';

interface SchemaPanelProps {
  tables: TableInfo[];
  onInsertTableName?: (name: string) => void;
  locale?: Locale;
}

/**
 * Left rail showing live schema of the SQLite database.
 */
export function SchemaPanel({ tables, onInsertTableName, locale = 'fa' }: SchemaPanelProps) {
  return (
    <aside className="panel">
      <div className="panel-header">
        <span>{t('schemaTitle', locale)}</span>
        <span>{tables.length} {t('tablesCount', locale)}</span>
      </div>
      <div className="panel-body">
        {tables.length === 0 && (
          <div className="empty-state">{t('noTables', locale)}</div>
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
              <em>{table.rowCount} {locale === 'de' ? 'Zeilen' : locale === 'en' ? 'rows' : 'ردیف'}</em>
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
