/**
 * Level sequences registry.
 */

import type { Level, SequenceInfo, Localized } from './types';
import { introLevels } from './intro/selectBasics';
import { filtersLevels } from './filters/compound';
import { joinsLevels } from './joins/joinBasics';
import { groupsLevels } from './groups/aggregates';
import { functionLevels } from './functions';
import { advancedJoinLevels } from './advanced-joins';
import { subqueryLevels } from './subqueries';
import { windowLevels } from './window';
import { ddlLevels } from './ddl';
import { dmlLevels } from './dml';
import { setOpsLevels } from './set-ops';
import { viewLevels } from './views';
import { performanceLevels } from './performance';
import { transactionLevels } from './transactions';
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
  {
    id: 'functions',
    displayName: 'Functions & CASE',
    about: 'String, math, and date functions, CASE, NULL handling, and casting.',
    levels: functionLevels,
  },
  {
    id: 'advanced-joins',
    displayName: 'Advanced Joins',
    about: 'CROSS, SELF, RIGHT, and FULL OUTER joins (SQLite workarounds included).',
    levels: advancedJoinLevels,
  },
  {
    id: 'subqueries',
    displayName: 'Subqueries & CTEs',
    about: 'Scalar / IN / EXISTS subqueries, derived tables, WITH, and recursive CTEs.',
    levels: subqueryLevels,
  },
  {
    id: 'window',
    displayName: 'Window Functions',
    about: 'Ranking, running totals, PARTITION BY, and LAG/LEAD.',
    levels: windowLevels,
  },
  {
    id: 'ddl',
    displayName: 'DDL & Schema Design',
    about: 'CREATE / ALTER / DROP, data types, and constraints.',
    levels: ddlLevels,
  },
  {
    id: 'dml',
    displayName: 'Modifying Data (DML)',
    about: 'INSERT, UPDATE, DELETE, and upserts.',
    levels: dmlLevels,
  },
  {
    id: 'set-ops',
    displayName: 'Set Operations',
    about: 'UNION, UNION ALL, INTERSECT, and EXCEPT.',
    levels: setOpsLevels,
  },
  {
    id: 'views',
    displayName: 'Views',
    about: 'CREATE VIEW, complex views, and the materialized-view pattern.',
    levels: viewLevels,
  },
  {
    id: 'performance',
    displayName: 'Indexes & Performance',
    about: 'CREATE INDEX, EXPLAIN QUERY PLAN, composite indexes, and tuning.',
    levels: performanceLevels,
  },
  {
    id: 'transactions',
    displayName: 'Transactions & ACID',
    about: 'BEGIN / COMMIT / ROLLBACK, atomic operations, and isolation.',
    levels: transactionLevels,
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
