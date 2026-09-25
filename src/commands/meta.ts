/**
 * Meta command parsing (levels, hint, reset, undo, show goal, help).
 */

export type MetaCommand =
  | { kind: 'help' }
  | { kind: 'levels' }
  | { kind: 'hint' }
  | { kind: 'reset' }
  | { kind: 'undo' }
  | { kind: 'showGoal' }
  | { kind: 'hideGoal' }
  | { kind: 'showSolution' }
  | { kind: 'lesson' }
  | { kind: 'sandbox' }
  | { kind: 'level'; id: string }
  | { kind: 'sql'; sql: string };

/**
 * Classify a console line as meta command or SQL.
 *
 * @param input - Raw console text.
 * @returns Parsed command.
 */
export function parseConsoleInput(input: string): MetaCommand {
  const trimmed = input.trim();
  if (!trimmed) return { kind: 'sql', sql: '' };

  const lower = trimmed.toLowerCase();
  if (lower === 'help' || lower === '?') return { kind: 'help' };
  if (lower === 'levels') return { kind: 'levels' };
  if (lower === 'hint') return { kind: 'hint' };
  if (lower === 'reset') return { kind: 'reset' };
  if (lower === 'undo') return { kind: 'undo' };
  if (lower === 'show goal' || lower === 'goal') return { kind: 'showGoal' };
  if (lower === 'hide goal') return { kind: 'hideGoal' };
  if (lower === 'show solution' || lower === 'solution') {
    return { kind: 'showSolution' };
  }
  if (lower === 'objective' || lower === 'lesson') return { kind: 'lesson' };
  if (lower === 'sandbox') return { kind: 'sandbox' };

  const levelMatch = /^(?:level\s+)?([a-z0-9][a-z0-9-]*)$/i.exec(trimmed);
  if (levelMatch && !/^(select|with|insert|update|delete|create|pragma|explain|drop|alter)/i.test(trimmed)) {
    // bare id like "intro-where" or "level intro-where"
    if (/^(level\s+)/i.test(trimmed) || trimmed.includes('-')) {
      return { kind: 'level', id: levelMatch[1].toLowerCase() };
    }
  }

  const levelCmd = /^level\s+(.+)$/i.exec(trimmed);
  if (levelCmd) {
    return { kind: 'level', id: levelCmd[1].trim().toLowerCase() };
  }

  return { kind: 'sql', sql: trimmed };
}

export const HELP_TEXT = `Commands:
  <sql>              run SQL (SELECT / DML / DDL)
  levels             open level browser
  level <id>         jump to a level
  hint               show the current hint
  lesson|objective     show the level introduction
  show goal          show expected result
  hide goal          hide the goal panel
  show solution      fill in the reference solution
  reset              rebuild the database from seed
  undo               restore DB before your last statement
  sandbox            free-play mode with the shop schema
  help               this text`;
