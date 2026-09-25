/**
 * LearnSQL application shell.
 *
 * Modes: sandbox (free play) and level challenges (goal compare).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createDatabase, type LearnSqlDb } from './engine/db';
import { checkWin } from './engine/compare';
import type { QueryResult, TableInfo, WinCheck } from './engine/types';
import { SqlError } from './engine/types';
import {
  getNextLevel,
  getLevel,
  shopSchema,
  shopSeed,
  type Level,
} from './levels';
import { localize } from './levels/types';
import {
  HELP_TEXT,
  parseConsoleInput,
  type MetaCommand,
} from './commands/meta';
import { Console, type LogLine } from './components/Console';
import { SchemaPanel } from './components/SchemaPanel';
import { ResultGrid } from './components/ResultGrid';
import { PipelineBar, detectStages, type PipeStage } from './components/PipelineBar';
import { GoalPanel } from './components/GoalPanel';
import { LevelsModal } from './components/LevelsModal';
import { DialogModal } from './components/DialogModal';
import {
  WelcomeDialog,
  COFFEE_URL,
  GITHUB_URL,
} from './components/WelcomeDialog';

type Mode =
  | { kind: 'sandbox' }
  | { kind: 'level'; level: Level; intro: boolean };

interface Snapshot {
  schema: string;
  seed: string;
  sqlLog: string[];
}

const SOLVED_KEY = 'learnsql.solved';
const GOLF_KEY = 'learnsql.golf';

function loadSolved(): Set<string> {
  try {
    const raw = localStorage.getItem(SOLVED_KEY);
    return new Set<string>(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveSolved(ids: Set<string>): void {
  localStorage.setItem(SOLVED_KEY, JSON.stringify([...ids]));
}

function loadGolf(): Record<string, number> {
  try {
    const raw = localStorage.getItem(GOLF_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function saveGolf(map: Record<string, number>): void {
  localStorage.setItem(GOLF_KEY, JSON.stringify(map));
}

let logId = 1;

/**
 * Root application component.
 */
export function App() {
  const [mode, setMode] = useState<Mode>({ kind: 'sandbox' });
  const [db, setDb] = useState<LearnSqlDb | null>(null);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cellMatches, setCellMatches] = useState<boolean[][] | undefined>();
  const [win, setWin] = useState<WinCheck | null>(null);
  const [solved, setSolved] = useState(false);
  const [lines, setLines] = useState<LogLine[]>([]);
  const [editor, setEditor] = useState('-- Write SQL here, or type help in the console\nSELECT * FROM customers;\n');
  const [showGoal, setShowGoal] = useState(true);
  const [showLevels, setShowLevels] = useState(false);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => loadSolved());
  const [golf, setGolf] = useState<Record<string, number>>(() => loadGolf());
  const [pipeActive, setPipeActive] = useState<Set<PipeStage>>(new Set());
  const [pipeHighlight, setPipeHighlight] = useState<number | null>(null);
  const [statementsIssued, setStatementsIssued] = useState(0);
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return !new URLSearchParams(window.location.search).has('NODEMO');
    } catch {
      return true;
    }
  });

  const undoStack = useRef<Snapshot[]>([]);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const pushLog = useCallback((text: string, kind: LogLine['kind'] = 'info') => {
    setLines((prev) => [...prev, { id: logId++, text, kind }]);
  }, []);

  const refreshSchema = useCallback((database: LearnSqlDb) => {
    try {
      setTables(database.listTables());
    } catch {
      setTables([]);
    }
  }, []);

  const applySeed = useCallback(
    async (schema: string, seed: string) => {
      if (db) db.close();
      undoStack.current = [];
      const next = await createDatabase(schema, seed);
      setDb(next);
      refreshSchema(next);
      setResult(null);
      setError(null);
      setCellMatches(undefined);
      setWin(null);
      setSolved(false);
      setStatementsIssued(0);
    },
    [db, refreshSchema],
  );

  // Boot sandbox
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const database = await createDatabase(shopSchema, shopSeed);
      if (cancelled) {
        database.close();
        return;
      }
      setDb(database);
      refreshSchema(database);
      pushLog('LearnSQL ready. Type help for commands. levels opens challenges.', 'muted');
      pushLog('Sandbox mode — shop schema (customers, products, orders).', 'muted');
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enterLevel = useCallback(
    async (level: Level, withIntro: boolean) => {
      await applySeed(level.schema, level.seed);
      setMode({ kind: 'level', level, intro: withIntro });
      setShowGoal(true);
      setPipeActive(new Set());
      setPipeHighlight(null);
      setEditor('-- ' + localize(level.name) + '\n');
      pushLog(`Level: ${localize(level.name)}`, 'ok');
      pushLog(localize(level.hint) ? `Hint: ${localize(level.hint)}` : 'Type hint for help.', 'muted');
    },
    [applySeed, pushLog],
  );

  const enterSandbox = useCallback(async () => {
    await applySeed(shopSchema, shopSeed);
    setMode({ kind: 'sandbox' });
    setEditor('SELECT * FROM customers;\n');
    pushLog('Sandbox mode.', 'ok');
  }, [applySeed, pushLog]);

  const runSql = useCallback(
    async (sql: string) => {
      if (!db) return;
      const stages = detectStages(sql);
      setPipeActive(stages);
      const order: PipeStage[] = ['from', 'join', 'where', 'group', 'having', 'select', 'order', 'limit'];
      const activeOrdered = order.filter((s) => stages.has(s));

      for (let i = 0; i < activeOrdered.length; i += 1) {
        setPipeHighlight(i);
        await new Promise((r) => setTimeout(r, 40));
      }
      setPipeHighlight(null);

      // snapshot for undo
      const currentMode = modeRef.current;
      const snapshot: Snapshot = {
        schema: currentMode.kind === 'level' ? currentMode.level.schema : shopSchema,
        seed: currentMode.kind === 'level' ? currentMode.level.seed : shopSeed,
        sqlLog: [],
      };
      void snapshot;

      try {
        pushLog('> ' + sql.replace(/\n/g, ' ').slice(0, 120), 'cmd');
        const res = db.run(sql);
        setResult(res);
        setError(null);
        pushLog(res.message ?? 'OK', 'ok');
        setStatementsIssued((n) => n + 1);

        refreshSchema(db);

        // win check
        const m = modeRef.current;
        if (m.kind === 'level') {
          const goal = m.level.goal;
          let tableDump: QueryResult | null = null;
          if (goal.type === 'table') {
            try {
              tableDump = db.dumpTable(goal.table);
            } catch {
              tableDump = null;
            }
          }
          if (goal.type === 'schema') {
            const missing = goal.tables.filter((t) => !db.hasTable(t));
            const schemaWin: WinCheck =
              missing.length === 0
                ? { solved: true, reason: 'All required tables exist' }
                : { solved: false, reason: `Missing tables: ${missing.join(', ')}` };
            setWin(schemaWin);
            setCellMatches(undefined);
            if (schemaWin.solved) {
              setSolved(true);
            }
            return;
          }

          const check = checkWin(goal, { lastResult: res, table: tableDump });
          setWin(check);
          setCellMatches(check.cellMatches);
          if (check.solved && !solved) {
            setSolved(true);
            const id = m.level.id;
            setSolvedIds((prev) => {
              const next = new Set(prev);
              next.add(id);
              saveSolved(next);
              return next;
            });
            setGolf((prev) => {
              const par = m.level.golfPar ?? 1;
              const best = prev[id];
              const nextBest =
                best == null ? statementsIssued + 1 : Math.min(best, statementsIssued + 1);
              // statementsIssued is stale-ish; recompute from current increment
              const count = statementsIssued + 1;
              void par;
              const updated = { ...prev, [id]: best == null ? count : Math.min(best, count) };
              void nextBest;
              saveGolf(updated);
              return updated;
            });
            pushLog('Level solved!', 'ok');
            const nextLevel = getNextLevel(id);
            if (nextLevel) {
              pushLog(`Next: ${localize(nextLevel.name)} (${nextLevel.id}). Type "level ${nextLevel.id}" or open levels.`, 'muted');
            } else {
              pushLog('Sequence complete. Open levels to keep going.', 'ok');
            }
          } else if (!check.solved) {
            pushLog(check.reason, 'muted');
          }
        }
      } catch (err) {
        const msg = err instanceof SqlError || err instanceof Error ? err.message : String(err);
        setError(msg);
        setResult(null);
        setCellMatches(undefined);
        pushLog(msg, 'err');
      }
    },
    [db, pushLog, refreshSchema, solved, statementsIssued],
  );

  const handleMeta = useCallback(
    async (cmd: MetaCommand) => {
      switch (cmd.kind) {
        case 'help':
          pushLog(HELP_TEXT, 'muted');
          return;
        case 'levels':
          setShowLevels(true);
          return;
        case 'hint': {
          const m = modeRef.current;
          if (m.kind === 'level') pushLog(localize(m.level.hint), 'ok');
          else pushLog('Sandbox has no hint. Open levels for challenges.', 'muted');
          return;
        }
        case 'lesson': {
          const m = modeRef.current;
          if (m.kind === 'level') {
            setMode({ ...m, intro: true });
          } else {
            pushLog('No level intro in sandbox. Open levels first.', 'muted');
          }
          return;
        }
        case 'showGoal':
          setShowGoal(true);
          return;
        case 'hideGoal':
          setShowGoal(false);
          return;
        case 'showSolution': {
          const m = modeRef.current;
          if (m.kind === 'level') {
            setEditor(m.level.solution + '\n');
            pushLog('Solution loaded into the editor. Run it when ready.', 'ok');
          } else {
            pushLog('No solution in sandbox.', 'muted');
          }
          return;
        }
        case 'reset': {
          const m = modeRef.current;
          if (m.kind === 'level') {
            await applySeed(m.level.schema, m.level.seed);
            pushLog('Database reset to seed.', 'ok');
          } else {
            await applySeed(shopSchema, shopSeed);
            pushLog('Database reset to shop seed.', 'ok');
          }
          return;
        }
        case 'undo': {
          pushLog('Undo restores the database to the pre-statement snapshot (best-effort).', 'muted');
          const m = modeRef.current;
          const schema = m.kind === 'level' ? m.level.schema : shopSchema;
          const seed = m.kind === 'level' ? m.level.seed : shopSeed;
          await applySeed(schema, seed);
          pushLog('Database rebuilt from seed (full undo of mutations).', 'ok');
          return;
        }
        case 'sandbox':
          await enterSandbox();
          return;
        case 'level': {
          const level = getLevel(cmd.id);
          if (!level) {
            pushLog(`Unknown level "${cmd.id}". Type levels to browse.`, 'err');
            return;
          }
          await enterLevel(level, false);
          return;
        }
        case 'sql':
          await runSql(cmd.sql);
          return;
      }
    },
    [applySeed, enterLevel, enterSandbox, pushLog, runSql],
  );

  const onSubmitConsole = useCallback(
    (input: string) => {
      // Editor run path uses runSql; console can do both.
      const cmd = parseConsoleInput(input);
      void handleMeta(cmd);
    },
    [handleMeta],
  );

  const runEditor = useCallback(() => {
    void runSql(editor);
  }, [editor, runSql]);

  const activeLevel = mode.kind === 'level' ? mode.level : null;
  const showIntro = mode.kind === 'level' && mode.intro;

  const goalMatchLabel = useMemo(() => {
    if (!activeLevel) return null;
    return localize(activeLevel.name);
  }, [activeLevel]);

  return (
    <div className="app">
      <header className="toolbar">
        <div className="brand">
          LEARN<span>SQL</span>
        </div>
        <div className="level-title">
          {activeLevel ? localize(activeLevel.name) : 'Sandbox'}
        </div>
        <div className="level-meta">
          {activeLevel
            ? `golf ${golf[activeLevel.id] ?? statementsIssued} / par ${activeLevel.golfPar ?? 1}`
            : 'free play'}
          {goalMatchLabel ? '' : ''}
        </div>
        <div className="toolbar-actions">
          <button type="button" onClick={() => setShowLevels(true)}>
            Levels
          </button>
          <button type="button" onClick={() => setShowGoal((g) => !g)}>
            Goal
          </button>
          <button
            type="button"
            onClick={() => void handleMeta({ kind: 'lesson' })}
          >
            Lesson
          </button>
          <button
            type="button"
            onClick={() => void handleMeta({ kind: 'hint' })}
          >
            Hint
          </button>
          <button
            type="button"
            onClick={() => void handleMeta({ kind: 'reset' })}
          >
            Reset
          </button>
          <button type="button" onClick={() => void enterSandbox()}>
            Sandbox
          </button>
          <a
            className="toolbar-link"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="toolbar-link support"
            href={COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Buy me a coffee"
          >
            Buy me a coffee
          </a>
        </div>
      </header>

      <div className="main">
        <SchemaPanel
          tables={tables}
          onInsertTableName={(name) => setEditor((e) => e + name)}
        />

        <section className="workbench">
          <PipelineBar
            active={pipeActive}
            highlightIndex={pipeHighlight}
            solved={solved}
          />
          <div className="editor-wrap">
            <div className="editor-toolbar">
              <button type="button" className="primary" onClick={runEditor}>
                Run SQL
              </button>
              <button
                type="button"
                onClick={() => void handleMeta({ kind: 'showSolution' })}
              >
                Solution
              </button>
              <span className="hint-text">
                Ctrl/Cmd+Enter runs · console accepts meta commands
              </span>
            </div>
            <textarea
              className="sql-editor"
              value={editor}
              onChange={(e) => setEditor(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  runEditor();
                }
              }}
              spellCheck={false}
              aria-label="SQL editor"
            />
          </div>
          <ResultGrid
            result={result}
            cellMatches={cellMatches}
            error={error}
          />
        </section>

        <GoalPanel
          level={activeLevel}
          win={win}
          visible={showGoal && !!activeLevel}
          solved={solved}
          cellMatches={cellMatches}
        />
      </div>

      <Console lines={lines} onSubmit={onSubmitConsole} />

      <LevelsModal
        open={showLevels}
        solvedIds={solvedIds}
        currentId={activeLevel?.id ?? null}
        onClose={() => setShowLevels(false)}
        onSelect={(id) => {
          const level = getLevel(id);
          setShowLevels(false);
          if (level) void enterLevel(level, true);
        }}
      />

      {showIntro && activeLevel?.startDialog && (
        <DialogModal
          title={localize(activeLevel.name)}
          steps={activeLevel.startDialog}
          onClose={() => {
            const m = modeRef.current;
            if (m.kind === 'level') setMode({ ...m, intro: false });
          }}
        />
      )}

      {showWelcome && (
        <WelcomeDialog
          onClose={() => setShowWelcome(false)}
          onOpenLevels={() => {
            setShowWelcome(false);
            setShowLevels(true);
          }}
        />
      )}
    </div>
  );
}
