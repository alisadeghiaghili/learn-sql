# Changelog

All notable changes to LearnSQL are documented here.

## [Unreleased]

### Added

- **Tab-key autocomplete in the SQL editor** — pressing `Tab` completes the
  current token using live table names, live column names, and a curated set of
  SQL/SQLite keywords. The shortest matching candidate is chosen (first-seen on
  a length tie). ([#1](https://github.com/alisadeghiaghili/learn-sql/issues/1))
- **"Level complete" modal with next-level redirect** — when a level is solved, a
  modal now appears confirming the win and offering a **Next** button that
  advances into the next level (previously the app only logged to the console
  and stayed put). The final level shows an "end of curriculum" variant with a
  browse option instead. ([#2](https://github.com/alisadeghiaghili/learn-sql/issues/2))

> The hint fixes for the String Functions and Concatenation levels
> ([#3](https://github.com/alisadeghiaghili/learn-sql/issues/3),
> [#4](https://github.com/alisadeghiaghili/learn-sql/issues/4)) were already
> addressed in a previous commit on `main`.
