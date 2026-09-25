# LearnSQL Design Notes

Internal product and visual design for LearnSQL — an interactive SQL tutorial
in the spirit of [learnGitBranching](https://github.com/pcottle/learnGitBranching).

## Product mapping (LGB → LearnSQL)

| LGB | LearnSQL |
| --- | --- |
| Commit tree canvas | Schema map + query pipeline + result grid |
| Git commands in terminal | SQL statements + meta commands |
| `startTree` / `goalTreeString` | Seed schema/data / expected result or table state |
| `solutionCommand` | Solution SQL |
| Sequences (intro, rampup, …) | Topic sequences (intro, filters, joins, …) |
| Sandbox mode | Sandbox mode |
| Level builder / import level | Level builder / import level (planned) |
| Git golf (command count) | Query golf (statement count) |
| Goal tree compare | Result-set / table-state compare |

## Style anchor

LGB's terminal-game shell (command console + live canvas) crossed with a
query workbench (TablePlus / Postico density) and a coding-dojo progression
loop. Not Duolingo pastel, not SaaS card kits, not cream/serif editorial.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| base | `#0B0F14` | App background (cool near-black) |
| panel | `#121820` | Primary panels |
| raised | `#1A2330` | Elevated surfaces, inputs |
| ink | `#D7E0EA` | Primary text |
| muted | `#7A8794` | Secondary text, headers |
| accent | `#2EC4B6` | Active query, primary actions (teal) |
| goal | `#F4A261` | Goal / solved (warm amber) |
| danger | `#E76F51` | Errors |
| border | `#243041` | Hairlines |

## Typography

- UI chrome: **IBM Plex Sans** (11 / 13 / 15 / 20 / 28)
- SQL, console, tabular data: **IBM Plex Mono**
- Dense workbench scale; letter-spacing default; no all-caps eyebrows

## Layout system

Full-viewport three-zone shell:

```
┌──────────────────────────────────────────────────────┐
│ toolbar: brand · level · goal · hint · levels · reset │
├───────────┬──────────────────────────────┬───────────┤
│ schema    │ pipeline → editor → result   │ goal      │
│ rail      │                              │ panel     │
├───────────┴──────────────────────────────┴───────────┤
│ console (meta commands + log)                        │
└──────────────────────────────────────────────────────┘
```

Spacing rhythm: 4 / 8 / 12 / 16 / 24. Borders 1px hairline. Radius 4–6px
on inputs only; panels stay mostly square to feel like a workbench.

## Signature moments

1. **Query pipeline** lights clause stages left → right as a statement runs.
2. **Goal lock**: matching result cells dim to goal color; mismatches stay ink.
3. **Solved pulse**: amber edge pulse on the goal panel once — no confetti.

## Level JSON shape

```json
{
  "id": "intro-select-all",
  "name": "Select Everything",
  "hint": "SELECT * FROM customers;",
  "schema": "CREATE TABLE ...",
  "seed": "INSERT INTO ...",
  "solution": "SELECT * FROM customers;",
  "goal": {
    "type": "result",
    "columns": ["id", "name"],
    "rows": [[1, "Ada"]],
    "orderMatters": false
  },
  "startDialog": ["markdown", "..."],
  "disabled": ["DROP"]
}
```

Win conditions:

- `result` — last statement result set matches columns + rows
- `table` — named table's contents match after mutations
- `schema` — required table names exist

## Engine

- Client-only (same constraint as LGB)
- SQL: [sql.js](https://github.com/sql-js/sql.js) (SQLite compiled to WASM)
- Dialect: SQLite
- No backend, no network required after asset load

## Sequences (MVP)

1. `intro` — SELECT, columns, WHERE, ORDER BY, LIMIT
2. `filters` — AND/OR, IN, BETWEEN, LIKE, NULL
3. `joins` — INNER, LEFT, multi-table
4. `groups` — aggregates, GROUP BY, HAVING
5. `subqueries` — scalar, IN, CTEs
6. `dml` — INSERT / UPDATE / DELETE
7. `ddl` — CREATE TABLE, constraints

MVP ships `intro` + `filters` + start of `joins`, sandbox, meta commands.
