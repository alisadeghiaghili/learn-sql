<div align="center">

# LearnSQL

**Learn SQL the way learnGitBranching teaches Git** — type SQL, watch the query
pipeline light up, diff your result against a goal, and clear levels.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev)
[![SQLite](https://img.shields.io/badge/SQLite-sql.js-003b57.svg)](https://sql.js.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://www.typescriptlang.org)

[▶ Try the live demo](https://alisadeghiaghili.github.io/learn-sql/)

</div>

---

Everything runs in the browser (SQLite via [sql.js](https://sql.js.org)). No
backend, no setup beyond `npm install`.

## Why this exists

Git tutorials usually fail because you can't *see* the commit graph. SQL
tutorials fail for the same reason: you run a query and only see a flat table —
never the pipeline that produced it or the goal you're aiming at.

LearnSQL makes both visible: a **schema rail**, a **clause pipeline**, a live
**result grid**, and a side-by-side **goal**. Then it challenges you to close
the gap. Inspired by [pcottle/learnGitBranching](https://github.com/pcottle/learnGitBranching).

## How it works

```
   ┌──────────────────────────── query pipeline ────────────────────────────┐
   │  FROM ──► JOIN ──► WHERE ──► GROUP ──► HAVING ──► SELECT ──► ORDER ──► LIMIT │
   └────────────────────────────────────────────────────────────────────────┘
                              ▲ each stage lights as you run
   ┌──────────┐   ┌───────────────────┐   ┌───────────────────────────────┐
   │ schema   │   │   your query      │   │   result grid  ⟷  goal grid   │
   │ rail     │   │   (editor)        │   │   (green cells = match)       │
   └──────────┘   └───────────────────┘   └───────────────────────────────┘
```

Win conditions are `result` (columns + rows, order optional), `table`, or
`schema` — so the same engine checks SELECTs, mutations, and DDL.

## The curriculum

Fourteen guided sequences, **57 levels**, spanning the full SQL syllabus:

| # | Sequence | Covers | Levels |
|:-:|---|---|:-:|
| 1 | Introduction | `SELECT`, projection, `WHERE`, `ORDER BY`, `LIMIT` | 4 |
| 2 | Filtering Rows | `AND`/`OR`, `IN`, `BETWEEN`, `LIKE`, `IS NULL` | 3 |
| 3 | Joining Tables | `INNER JOIN`, `LEFT JOIN` | 2 |
| 4 | Aggregation | `COUNT`, `SUM`, `GROUP BY`, `HAVING` | 2 |
| 5 | Functions & CASE | string / math / date functions, `CASE`, NULL handling, `CAST` | 7 |
| 6 | Advanced Joins | `CROSS`, `SELF`, `RIGHT`, `FULL OUTER` | 4 |
| 7 | Subqueries & CTEs | scalar / `IN` / `EXISTS`, derived tables, `WITH`, recursive CTEs | 6 |
| 8 | Window Functions | `RANK`, running totals, `PARTITION BY`, `LAG`/`LEAD` | 4 |
| 9 | DDL & Schema Design | `CREATE`/`ALTER`/`DROP`, data types, constraints | 5 |
| 10 | Modifying Data (DML) | `INSERT`, `UPDATE`, `DELETE`, upserts | 5 |
| 11 | Set Operations | `UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT` | 4 |
| 12 | Views | `CREATE VIEW`, complex views, materialized-view pattern | 3 |
| 13 | Indexes & Performance | `CREATE INDEX`, `EXPLAIN QUERY PLAN`, composite indexes, tuning | 4 |
| 14 | Transactions & ACID | `BEGIN`/`COMMIT`/`ROLLBACK`, atomic ops, isolation | 4 |

## Features

- **Sandbox** — free SQL against a small in-browser shop schema (customers, products, orders).
- **Leveled challenges** — the 14 sequences above, each with a hint, a goal, and a reference solution.
- **Goal compare** — result sets diffed cell-by-cell; matching cells highlight green.
- **Query pipeline** — clause stages light up as the query executes.
- **Meta commands** — `levels`, `hint`, `show goal`, `show solution`, `reset`, `sandbox`, `undo`, `help`.
- **Query golf** — statements used vs par, tracked in `localStorage`.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL. For a production build:

```bash
npm run build
npm run preview
```

### Tests & typecheck

```bash
npm run typecheck
npm test
```

The test suite runs **every level's solution** through the engine and asserts it
satisfies its goal, so the curriculum can't silently regress.

## Architecture

```
src/
  engine/     sql.js wrapper, result compare, types
  levels/     level definitions, sequences, shared schemas
  commands/   console meta-command parser
  components/ schema rail, editor, pipeline, result, goal, console
  App.tsx     modes (sandbox / level), win check, undo/reset
```

See [DESIGN.md](./DESIGN.md) for the learnGitBranching → LearnSQL mapping and the
visual system.

### Level format

```ts
{
  id: 'intro-where',
  name: 'Filter Rows',
  hint: "SELECT name FROM customers WHERE city = 'London';",
  schema: 'CREATE TABLE ...',
  seed: 'INSERT INTO ...',
  solution: "SELECT name FROM customers WHERE city = 'London';",
  goal: {
    type: 'result',
    columns: ['name'],
    rows: [['Ada Lovelace']],
    orderMatters: false,
  },
  startDialog: [{ type: 'modal', markdowns: ['...'] }],
  golfPar: 1,
}
```

## Deployment

Pushing to `main` runs [.github/workflows/deploy-pages.yml](./.github/workflows/deploy-pages.yml)
(typecheck → test → build → GitHub Pages).

## Roadmap

- Level builder + import/export (like LGB `build level` / `import level`)
- Shareable permalinks (`?level=...&sql=...`)
- Persian (Farsi) locale for the dialogs
- Deeper coverage of a few advanced corners: `NOT LIKE`, `DISTINCT`,
  right/full joins in dialects that have them, execution-plan readouts, and
  normalization theory

## Acknowledgments

A big thank you to
[**Melika Bahmanabadi**](https://github.com/MelikaBahmanabadi) for carefully
reviewing the application and helping resolve its issues with great attention
to detail. Her thoroughness made a real difference in polishing LearnSQL.

## License

Released under the [Apache License 2.0](./LICENSE).

Copyright © 2026 Ali Sadeghi Aghili.
