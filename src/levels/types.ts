/**
 * Level definition types for LearnSQL with trilingual support (fa, en, de).
 */

import type { WinCondition } from '../engine/types';
import type { Locale } from '../i18n';

export type { Locale };

/** Trilingual localization map. */
export type Localized =
  | string
  | {
      fa?: string;
      en?: string;
      de?: string;
      en_US?: string;
      [locale: string]: string | undefined;
    };

export interface DialogStep {
  /** Modal text (markdown-ish plain text). Can be array of strings or localized map. */
  type: 'modal' | 'demo';
  markdowns: string[] | { fa?: string[]; en?: string[]; de?: string[] };
  /** For `demo`: SQL shown / run before and after copy. */
  command?: string;
  beforeMarkdowns?: string[] | { fa?: string[]; en?: string[]; de?: string[] };
  afterMarkdowns?: string[] | { fa?: string[]; en?: string[]; de?: string[] };
  /** Optional schematic diagram matching cheat sheet style (e.g. 'inner-join', 'left-join', etc.) */
  diagram?: string;
}

export interface Level {
  /** Stable id used in URLs and progress. */
  id: string;
  name: Localized;
  hint: Localized;
  /** DDL for the level database. */
  schema: string;
  /** Seed rows. */
  seed: string;
  /** Reference solution (used for golf par and `show solution`). */
  solution: string;
  goal: WinCondition;
  startDialog?: DialogStep[];
  /** SQL keywords / statements that error if used. */
  disabled?: string[];
  /** Statements that count toward golf (default: non-meta SQL). */
  golfPar?: number;
  /** Level difficulty (1 to 5 dots), matching learn-dvc standard. */
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

export interface SequenceInfo {
  id: string;
  displayName: Localized;
  about: Localized;
  levels: Level[];
}

export function localize(text: Localized, locale: Locale = 'fa'): string {
  if (typeof text === 'string') return text;
  if (locale === 'fa' && text.fa) return text.fa;
  if (locale === 'de' && text.de) return text.de;
  if (locale === 'en' && (text.en || text.en_US)) return text.en ?? text.en_US ?? '';
  return text[locale] ?? text.en ?? text.en_US ?? text.fa ?? text.de ?? Object.values(text)[0] ?? '';
}

export function resolveMarkdowns(
  lines?: string[] | { fa?: string[]; en?: string[]; de?: string[] },
  locale: Locale = 'fa',
): string[] {
  if (!lines) return [];
  if (Array.isArray(lines)) return lines;
  return lines[locale] ?? lines.en ?? lines.fa ?? lines.de ?? [];
}
