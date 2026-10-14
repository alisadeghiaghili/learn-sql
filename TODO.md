# LearnSQL TODO

Consolidated findings from a critical review of the app, the translations, the beginner experience and the repository itself. Items are grouped into phases and ordered by dependency: each phase makes the next one safer.

Legend: `[ ]` open, `[x]` done. IDs are stable so commits and PRs can reference them (for example `Refs: C1`).

## Recommended order

1. Phase A (repo safety net) and Phase B (tests) first. Nothing else is safe to change without them.
2. Phase C (engine) and Phase D (App.tsx refactor) next.
3. Phase E (beginner experience), Phase F (execution order) and Phase G (content accuracy).
4. Phase H (translations) only after the content in E/F/G has settled, otherwise everything gets translated twice.
5. Phase I (docs and legal) last, plus the quick wins marked there.

If time is short, the highest-value items are: A1, A2, B1, B2, C1, G1, H2.

---

## Phase A: Repo safety net

- [ ] **A1** Protect `main`: require PRs, require passing CI, disallow direct pushes. Today both branches are unprotected and 25 commits went straight to `main`.
- [ ] **A2** Run CI on pull requests and branches, not only on push to `main`. Split the workflow: a `ci` job (typecheck, lint, test, build) for PRs, and the deploy job only on `main`. Restrict `pages: write` and `id-token: write` to the deploy job; the build job only needs `contents: read`.
- [ ] **A3** Add ESLint (with `react-hooks/exhaustive-deps`) and Prettier to `devDependencies`, add a `lint` script, run it in CI. There is currently an `eslint-disable` comment but no ESLint installed.
- [ ] **A4** Decide on Playwright. It is in `devDependencies` and `scripts/smoke.mjs` exists, but neither is wired into `package.json` scripts or CI. Either add `npm run smoke` and run it in CI, or remove both.
- [ ] **A5** Pick one commit convention (Conventional Commits) and enforce it with commitlint. History currently mixes `feat:` / `chore:` with `Add ...` / `Update ...` / `Remove ...`.
- [ ] **A6** Decide on branch `feat/visitor-counter`. It adds a unique visitor counter through a shared remote counter service, which contradicts the README/DESIGN claim of "no backend, no network after asset load" and raises privacy/consent questions (the app ships a German locale). Review the actual code, then either delete the branch, or merge it with explicit disclosure in the README and a consent/opt-out path.
- [ ] **A7** Add issue templates (bug, level feedback, translation), a PR template and `CONTRIBUTING.md` with a clear way to report bugs. Currently there are zero open issues and no reporting channel.
- [ ] **A8** Prefer small, focused PRs. One commit rewrote localization for all remaining sequences at once; that is not reviewable or revertable.

## Phase B: Tests (safety net for content and i18n)

- [ ] **B1** Add a test that runs every level's `hint` through the engine and checks it against the goal. Two levels (`fn-string`, `fn-concat`) shipped with unsolvable hints because only `solution` is tested. Acceptance: runs over all 57 levels.
- [ ] **B2** Add an i18n parity test: `fa`, `en` and `de` must have identical key sets and identical placeholder sets (`{n}`, `{s}`, `{name}`, `{solved}`, `{total}`). This would have caught `de.idealCmds` (`Abfrage{n}`).
- [ ] **B3** Assert the exact level count (`toBe(57)`) or generate the README number from `allLevels.length`. The current `toBeGreaterThanOrEqual(50)` lets the README drift.
- [ ] **B4** Test that `hint` and `solution` SQL is identical across locales, or fix the `Localized` type so plain SQL can be a single string (see G5).
- [ ] **B5** Add unit tests for `detectStages`: a keyword inside a comment or string literal must not light a stage.
- [ ] **B6** Enable a DOM test environment (jsdom / Testing Library) and include `*.test.tsx` in `vite.config.ts`. Currently only `src/**/*.test.ts` run in a `node` environment, so `App.tsx` and all components are untested.

## Phase C: Engine and win checks

- [ ] **C1** Statement-aware goals. Win checks only compare the final result set, so transaction levels do not test what they teach. Evidence: `tx-rollback` has a goal equal to the initial data, so a plain `SELECT name, city FROM users` clears it; `tx-commit` and `tx-atomic` clear without `BEGIN`/`COMMIT`. Add a goal option such as `requires: { statements: ['BEGIN', 'ROLLBACK'] }`. Two designs: parse the statement list before running (simple, fragile with comments/strings), or execute statements one by one with a proper statement splitter (accurate, more work). Preferred: the second. Acceptance: a bare `SELECT` no longer clears `tx-rollback`.
- [ ] **C2** Rewrite `tx-acid`. It is currently just `SUM`/`COUNT` and teaches nothing about ACID. Either design a real exercise, or rename the level (it is called "ACID Principles & Isolation" but has no isolation content).
- [ ] **C3** Improve `compareResults` diagnostics: report extra rows (not only the first missing row), mark wrong/extra cells in red via `cellMatches`, and give a readable message for type mismatches (for example `n:1` vs `s:1` should say "column 2 is text, a number was expected").
- [ ] **C4** Separate `hint` from `solution`. In all four transaction levels the hint is the full solution. Move to tiered hints: concept hint, then a skeleton with blanks, then the full solution.
- [ ] **C5** Friendly SQL error messages in all three languages. `db.ts` passes raw SQLite messages through (for example `no such column: London`). Map common errors (`no such column`, `no such table`, `syntax error near`, misuse of aggregate) to a short explanation with an example, keeping the raw message below.
- [ ] **C6** Before writing any level that depends on an engine error (see F4), run it in sql.js and record the exact error text.

## Phase D: App.tsx cleanup

- [ ] **D1** Remove dead code in `runSql`: the unused `snapshot` (`void snapshot;`), the empty `undoStack`, and the `void par;` / `void nextBest;` leftovers in the golf block.
- [ ] **D2** Make `undo` real by replaying the statement log, or rename the button. Today `undo` is identical to `reset` (it rebuilds the database from the seed). Preferred: replay.
- [ ] **D3** Fix golf semantics. `statementsIssued` counts every run, including exploratory SELECTs, and the code comments admit the value is "stale-ish". Count only successful runs, or switch to character length, and rename accordingly. Resolve the stale-closure problem with a `useRef` or reducer.
- [ ] **D4** Remove the artificial 40 ms-per-stage `setTimeout` delay before every query (up to about 320 ms). Use a CSS animation instead of blocking execution.
- [ ] **D5** Fix dependency arrays: `handleMeta` is missing `locale` and `runSql`; `runSql` depends on stale state.
- [ ] **D6** Split `App.tsx` (about 24 KB) into hooks such as `useLevelRunner`, `useLocale` and `useProgress`. Do this only after Phase B tests exist.
- [ ] **D7** Replace the string-`replace` logic in `changeLocale` that translates hint comments in the editor. It breaks silently as soon as the user edits the text. Keep the hint out of the editor state and render it separately, or regenerate it from the level.

## Phase E: Beginner ("absolute zero") experience

- [ ] **E1** Define the target persona explicitly (never-programmed student, Excel analyst, or developer new to SQL) and a success metric: run think-aloud sessions with 3 real beginners; goal is level 1 solved in under 2 minutes with no help.
- [ ] **E2** Cap lesson length. Every level has three modals before the first keystroke. First modal: at most 3 sentences. Move "production pitfalls" and theory into a collapsible "Learn more" section (E8).
- [ ] **E3** Remove or define jargon in the first 6 levels: declarative, imperative, query optimizer, projection, predicate, relational algebra, set theory, covering index, memory bandwidth. Fix the Persian rendering of Projection as "تصویربرداری" (use "انتخاب ستون‌ها"), and fix the wrong claim about "ایندکس‌های حافظه رم" (indexes are not RAM structures).
- [ ] **E4** Add a "level 0": code is pre-filled, the learner only presses Run, sees the table, then changes one word. First success should need no typing.
- [ ] **E5** Add fill-in-the-blank starter templates in the editor for the first levels (for example `SELECT ___ FROM customers WHERE ___`).
- [ ] **E6** Guided first run: open directly in level 1 (not the sandbox) with a short 3-step tour (schema, editor, goal). Sandbox comes after.
- [ ] **E7** Fix concept ordering: the WHERE level explains `NULL` before NULL is taught. Mention it very simply or defer it.
- [ ] **E8** Implement the "Learn more" collapsible pattern so advanced content stays available without overwhelming beginners.

## Phase F: Execution-order explanation

The pipeline bar exists but never explains itself. A friend of the project also flagged that execution order needs an explanation.

- [ ] **F1** Fix `detectStages`: strip comments and string literals before the regex. Today `runSql(editor)` receives the whole editor text including the `-- Hint: ...` comment block, so stages can light up for keywords the learner never wrote.
- [ ] **F2** Add stages (or hide the bar) for `WITH` (CTE), `DISTINCT`, `OVER` (window functions) and `UNION`/set operations. The bar is currently incomplete for advanced levels.
- [ ] **F3** Add per-stage tooltips in all three languages, one plain sentence each (for example "WHERE: drops rows that fail the condition").
- [ ] **F4** Add a "written order vs run order" diagram and a short level where `WHERE COUNT(*) > 1` fails and `HAVING` fixes it. Do NOT teach "aliases cannot be used in WHERE": SQLite allows aliases there as a non-standard extension, so learners would disprove the lesson in the sandbox. Verify the real error text first (C6).
- [ ] **F5** Correct the README wording: the bar visualizes logical clause order; it is not driven by real execution (it is a timed animation).
- [ ] **F6** (Stretch) Show a row count under each stage for simple single-SELECT queries (`FROM: 5 rows -> WHERE: 1 row -> SELECT: 1 column`). Hide it for subqueries and CTEs.
- [ ] **F7** State once that logical order is a mental model; real optimizers can reorder work.

## Phase G: Content accuracy

- [ ] **G1** Fix incorrect transaction text in all three languages: ROLLBACK is a command the user issues, not something that runs after a crash or error (crash recovery is separate; in SQLite a constraint violation aborts the statement, not necessarily the transaction); `BEGIN` does not provide isolation by itself; remove the claim that COMMIT writes "to disk" in this in-memory app.
- [ ] **G2** Say plainly in the Durability explanation that sql.js runs in memory and everything is lost on refresh, so durability is simulated here.
- [ ] **G3** Change `balance REAL` to an integer amount (for example cents) in the money examples, and explain why.
- [ ] **G4** Add levels for the syllabus gaps: `DISTINCT`, `NOT LIKE`, `COALESCE`/`IFNULL`. Update `coverage.test.ts`, the README table and the level count (B3).
- [ ] **G5** Fix the `Localized` type so language-neutral content (SQL hints/solutions) can be a plain string. Today every hint is copy-pasted three times.

## Phase H: Translations

- [ ] **H1** Create `GLOSSARY.md` and lock the terms: query ("کوئری"), database ("پایگاه‌داده", with ZWNJ), sandbox ("میز کار آزاد"), hint ("راهنمایی"), transaction, isolation. Currently the Persian text mixes "پایگاه داده", "پایگاه‌داده", "دیتابیس", and "سوال"/"کوئری"/"پرس‌وجو".
- [ ] **H2** Rewrite the Persian text from meaning, not from English, in a single informal-friendly register ("تو"). The UI currently mixes "کردی" with "کنید", and even the three cheer messages switch between "تو" and "شما". Remove English-structured sentences, bureaucratic phrases ("پایان موفقیت‌آمیز مرحله", "هیچ جدولی یافت نشد", "با موفقیت حل کردی") and calques ("به زیبایی یاد گرفتی"). Priority: `i18n/index.ts`, then `transactions.ts`, then the other level files.
- [ ] **H3** Make the UI Guide read its button names from `t()`. It currently says "نکته" and "بازنویسی/بازنشانی" while the real buttons say "راهنمایی" and "شروع مجدد", and "سندباکس" vs "میز کار آزاد" vs "تمرین آزاد" for one concept. Also fix "جریان اجرای سوال".
- [ ] **H4** German fixes: `idealCmds` is `'ideal {n} Abfrage{n}'` (wrong placeholder and plural); mismatched quotes in `uiGuideIntro` (opening low quote, closing ASCII quote); inconsistent Sie/du (UI uses du, while `goalHiddenMsg`, `matchGoalMsg` and `transactions.ts` use Sie). Pick du.
- [ ] **H5** Replace the Persian `completeAllMessage` ("you mastered the whole course") with an honest "you finished the course".
- [ ] **H6** Have a native Persian speaker and a native German speaker review the final text. An automated review can catch obvious errors but not naturalness.
- [ ] **H7** Manually test RTL/bidi: Persian hint comments (`-- 💡 ...`) inside the LTR SQL editor and in the result grid. Not yet inspected.
- [ ] **H8** Persian font. DESIGN.md names IBM Plex Sans for UI chrome, which has no Arabic-script glyphs, while the default locale is Persian. Check what actually renders and add a Persian font (for example Vazirmatn), self-hosted (I6).

## Phase I: Docs, legal and project hygiene

- [ ] **I1** Update `DESIGN.md`: it says "no confetti" (confetti, fanfare and sharing were added), describes a bottom console (removed), lists an outdated level JSON shape (`disabled`, plain-list `startDialog`), lists 7 MVP sequences (now 14), and says "not Duolingo pastel" while the app now celebrates with confetti.
- [ ] **I2** Update `README.md`: remove "Persian locale" from the roadmap, document FA/EN/DE, add `i18n/`, `styles/` and `types/` to the architecture block, and fix the Level format example (localized fields, `diagram`).
- [ ] **I3** Bring `CHANGELOG.md` up to date (it lists only issues #1 to #4; trilingual support, UI guide, syntax highlighting, celebration modal and more are missing) and tag `0.2.0`.
- [ ] **I4** Check the licence and attribution of the "RStudio-style" cheat-sheet diagrams. The brand label was removed, but the derivation question remains.
- [ ] **I5** Document the source and licence of the "official SQL logo" added in the branding commit.
- [ ] **I6** Self-host fonts (Google Fonts is loaded from `index.html`), which also supports the "no network after load" claim.
- [ ] **I7** Add an `engines` field to `package.json` (CI uses Node 22).
- [ ] **I8** (Later) Extract the shared shell (toolbar, language menu, UI guide) used by learn-dvc, learn-powershell and learn-sql into a shared package so a fix lands once.

---

## Open decisions (owner)

- Who is the "absolute beginner" persona (E1)? It drives tone, examples and the sample schema.
- Transaction levels (C1): parse statements up front, or execute one at a time with a statement splitter?
- Visitor counter (A6): delete, or keep with disclosure and consent?
- Execution-order explanation (F4): standalone level, or merged into the GROUP BY / HAVING level?

## Not yet reviewed

The review did not cover: `src/components/*` (except `PipelineBar`), `.gitignore`, `public/`, `src/styles/`, `src/commands/`, `src/levels/*` other than `intro/selectBasics.ts` and `transactions.ts`, and the code on `feat/visitor-counter`. Expect the same patterns (translation quality, jargon, hint equals solution) to repeat in the unreviewed level files.
