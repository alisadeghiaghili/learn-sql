# LearnSQL

Interactive SQL visualization and tutorial — the learnGitBranching idea applied to SQL.

You type SQL in a workbench, watch a query pipeline light up, compare your result to a goal, and clear levels. Sandbox mode is free play on a small shop schema (customers, products, orders). Everything runs in the browser (SQLite via sql.js); no backend.

Inspired by [pcottle/learnGitBranching](https://github.com/pcottle/learnGitBranching).

## Live demo

https://alisadeghiaghili.github.io/learn-sql/

## Why this exists

Git tutorials often fail because you cannot see the commit graph. SQL tutorials fail for the same reason: you write a query and only see a flat table, not the pipeline or the goal. LearnSQL makes both visible — schema rail, clause pipeline, result grid, and a side-by-side goal — then challenges you to close the gap.

## Features

- **Sandbox** — free SQL against an in-browser SQLite database
- **Leveled challenges** — 14 sequences covering the full SQL syllabus: intro, filtering, joins, aggregation, functions & CASE, advanced joins, subqueries & CTEs, window functions, DDL, DML, set operations, views, indexes & performance, and transactions/ACID
- **Goal compare** — result sets (columns + rows, optional order)
- **Query pipeline** — FROM → JOIN → WHERE → GROUP → … stages light as you run
- **Meta commands** — `levels`, `hint`, `show goal`, `show solution`, `reset`, `sandbox`, `help`
- **Query golf** — statements used vs par (stored in `localStorage`)

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL. Production build:

```bash
npm run build
npm run preview
```

## Tests and typecheck

```bash
npm run typecheck
npm test
```

## Architecture

```
src/
  engine/     sql.js wrapper, result compare, types
  levels/     level definitions, sequences, shared shop schema
  commands/   console meta-command parser
  components/ schema rail, editor, pipeline, result, goal, console
  App.tsx     modes (sandbox / level), win check, undo/reset
```

See [DESIGN.md](./DESIGN.md) for the LGB → LearnSQL mapping and visual system.

## Level shape

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

Win conditions: `result` | `table` | `schema`.

## Deployment

Pushes to `main` run `.github/workflows/deploy-pages.yml` (typecheck → test → build → GitHub Pages).

## Roadmap

- Level builder + import/export (like LGB `build level` / `import level`)
- Shareable permalinks (`?level=...&sql=...`)
- Persian locale for dialogs
- More depth per topic (e.g. `NOT LIKE`, `DISTINCT`, right/full join in dialects that have them, execution-plan readouts, normalization theory)

Completed in the full-syllabus pass: window functions, subqueries/CTEs, DDL, DML,
set operations, views, indexes/performance, and transactions/ACID sequences.

## License

Apache License 2.0. See [LICENSE](./LICENSE).

Copyright 2026 Ali Sadeghi Aghili.
