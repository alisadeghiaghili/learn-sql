# Changelog

All notable changes to LearnSQL are documented here.

## [Unreleased]

### Added

- **Tab-key autocomplete in the SQL editor** — pressing `Tab` completes the
  current token using live table names, live column names, and a curated set of
  SQL/SQLite keywords. The shortest matching candidate is chosen (first-seen on
  a length tie). ([#1](https://github.com/alisadeghiaghili/learn-sql/issues/1),
  closed in [`9da4612`](https://github.com/alisadeghiaghili/learn-sql/commit/9da46126d492227054ab23df7d08303d36f38895))
- **"Level complete" modal with next-level redirect** — when a level is solved, a
  modal now appears confirming the win and offering a **Next** button that
  advances into the next level (previously the app only logged to the console
  and stayed put). The final level shows an "end of curriculum" variant with a
  browse option instead. ([#2](https://github.com/alisadeghiaghili/learn-sql/issues/2),
  closed in [`9da4612`](https://github.com/alisadeghiaghili/learn-sql/commit/9da46126d492227054ab23df7d08303d36f38895))

### Fixed

- **String Functions level (`fn-string`)** — the hint was unsolvable: it produced
  raw-expression column names (`UPPER(name)`, `LENGTH(name)`) while the goal
  requires the aliased names `upper_name` and `len`. The hint now carries the
  `AS` aliases so following it clears the level.
  ([#3](https://github.com/alisadeghiaghili/learn-sql/issues/3),
  closed in [`b5c75ca`](https://github.com/alisadeghiaghili/learn-sql/commit/b5c75ca2b3b5dbfa244f4f0ebfdb759ba50cab53))
- **Concatenation level (`fn-concat`)** — same bug: the hint produced
  `'costs ' || price` while the goal requires the aliased column `price_text`.
  The hint now includes `AS price_text`.
  ([#4](https://github.com/alisadeghiaghili/learn-sql/issues/4),
  closed in [`b5c75ca`](https://github.com/alisadeghiaghili/learn-sql/commit/b5c75ca2b3b5dbfa244f4f0ebfdb759ba50cab53))
