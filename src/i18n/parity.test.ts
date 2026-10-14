/**
 * i18n parity guard: fa, en and de must expose the same keys and the same
 * {placeholders}, so a string added or edited in one language cannot silently
 * break another.
 */
import { describe, expect, it } from 'vitest';
import { LOCALES, UI_STRINGS, type Locale } from './index';

/**
 * Keys excluded from the checks.
 * `idealCmds` is currently unused: LevelsModal builds that label in code, and
 * the de value repeats {n} by mistake. Remove it from this list once the key
 * is deleted or the label is moved into i18n.
 */
const IGNORED_KEYS = new Set(['idealCmds']);

/** {s} is an English plural suffix; languages without plural suffixes may omit it. */
const OPTIONAL_PLACEHOLDERS = new Set(['s']);

const reference: Locale = 'en';
const codes = LOCALES.map((l) => l.code);

function keysOf(locale: Locale): string[] {
  return Object.keys(UI_STRINGS[locale])
    .filter((key) => !IGNORED_KEYS.has(key))
    .sort();
}

/** Placeholder names in order of appearance, duplicates kept, sorted for comparison. */
function placeholders(text: string): string[] {
  return [...text.matchAll(/\{(\w+)\}/g)]
    .map((m) => m[1])
    .filter((name) => !OPTIONAL_PLACEHOLDERS.has(name))
    .sort();
}

describe('i18n parity', () => {
  it('has strings for exactly the registered locales', () => {
    expect(Object.keys(UI_STRINGS).sort()).toEqual([...codes].sort());
  });

  for (const code of codes.filter((c) => c !== reference)) {
    it(`${code} has the same keys as ${reference}`, () => {
      const expected = keysOf(reference);
      const actual = keysOf(code);
      expect({
        missing: expected.filter((key) => !actual.includes(key)),
        extra: actual.filter((key) => !expected.includes(key)),
      }).toEqual({ missing: [], extra: [] });
    });

    it(`${code} uses the same placeholders as ${reference}`, () => {
      const mismatches = keysOf(reference).filter((key) => {
        const want = placeholders(UI_STRINGS[reference][key] ?? '');
        const have = placeholders(UI_STRINGS[code][key] ?? '');
        return want.join(',') !== have.join(',');
      });
      expect(mismatches).toEqual([]);
    });
  }

  for (const code of codes) {
    it(`${code} has no empty strings`, () => {
      const empty = Object.entries(UI_STRINGS[code])
        .filter(([, value]) => value.trim() === '')
        .map(([key]) => key);
      expect(empty).toEqual([]);
    });
  }
});
