/**
 * Level sequences registry.
 */

import type { Level, SequenceInfo, Localized } from './types';
import { introLevels } from './intro/selectBasics';
import { filtersLevels } from './filters/compound';
import { joinsLevels } from './joins/joinBasics';
import { groupsLevels } from './groups/aggregates';
import { shopSchema, shopSeed } from './shopSchema';

export const sequences: SequenceInfo[] = [
  {
    id: 'intro',
    displayName: 'Introduction Sequence',
    about: 'SELECT, columns, WHERE, ORDER BY, and LIMIT — paced like learnGitBranching intro.',
    levels: introLevels,
  },
  {
    id: 'filters',
    displayName: 'Filtering Rows',
    about: 'Compound predicates, IN, BETWEEN, LIKE, and NULL handling.',
    levels: filtersLevels,
  },
  {
    id: 'joins',
    displayName: 'Joining Tables',
    about: 'INNER JOIN and LEFT JOIN across customers, products, and orders.',
    levels: joinsLevels,
  },
  {
    id: 'groups',
    displayName: 'Aggregation',
    about: 'COUNT, SUM, GROUP BY, and HAVING.',
    levels: groupsLevels,
  },
];

export const allLevels: Level[] = sequences.flatMap((s) => s.levels);

export function getLevel(id: string): Level | undefined {
  return allLevels.find((l) => l.id === id);
}

export function getNextLevel(id: string): Level | undefined {
  const idx = allLevels.findIndex((l) => l.id === id);
  if (idx < 0 || idx + 1 >= allLevels.length) return undefined;
  return allLevels[idx + 1];
}

export function getSequenceForLevel(id: string): SequenceInfo | undefined {
  return sequences.find((s) => s.levels.some((l) => l.id === id));
}

export { shopSchema, shopSeed };
export type { Level, SequenceInfo, Localized };
