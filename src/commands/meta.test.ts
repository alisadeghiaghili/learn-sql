/**
 * Console command parser tests.
 */

import { describe, expect, it } from 'vitest';
import { parseConsoleInput } from './meta';

describe('parseConsoleInput', () => {
  it('parses meta commands', () => {
    expect(parseConsoleInput('help').kind).toBe('help');
    expect(parseConsoleInput('levels').kind).toBe('levels');
    expect(parseConsoleInput('hint').kind).toBe('hint');
    expect(parseConsoleInput('reset').kind).toBe('reset');
    expect(parseConsoleInput('show goal').kind).toBe('showGoal');
  });

  it('parses level jumps', () => {
    expect(parseConsoleInput('level intro-where')).toEqual({
      kind: 'level',
      id: 'intro-where',
    });
    expect(parseConsoleInput('intro-where')).toEqual({
      kind: 'level',
      id: 'intro-where',
    });
  });

  it('treats SQL as sql', () => {
    const cmd = parseConsoleInput('SELECT * FROM customers;');
    expect(cmd.kind).toBe('sql');
  });
});
