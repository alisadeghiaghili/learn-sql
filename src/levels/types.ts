/**
 * Level definition types for LearnSQL.
 */

import type { WinCondition } from '../engine/types';

/** Simple i18n map — English is the source of truth. */
export type Localized = string | { en_US: string; [locale: string]: string };

export interface DialogStep {
  /** Modal text (markdown-ish plain text). */
  type: 'modal' | 'demo';
  markdowns: string[];
  /** For `demo`: SQL shown / run before and after copy. */
  command?: string;
  beforeMarkdowns?: string[];
  afterMarkdowns?: string[];
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
}

export interface SequenceInfo {
  id: string;
  displayName: Localized;
  about: Localized;
  levels: Level[];
}

export function localize(text: Localized): string {
  if (typeof text === 'string') return text;
  return text.en_US ?? Object.values(text)[0] ?? '';
}
