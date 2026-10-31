---
title: Strict Luau interfaces and code quality
tags: luau strict types typechecking generics project lint code review
status: curated
---

# Strict Luau interfaces and code quality

## Static guarantees
Prefer `--!strict` for new modules. Declare exported public shapes, use `unknown` for external payloads, avoid spreading `any`. `::` assertions don't validate runtime. Use discriminated unions for request/result variants and narrow on `kind`. Treat nil explicitly; don't mask unexpected nil with defaults that grant currency or bypass auth.

## File organization
Every module should have one reason to change and a bounded responsibility. Keep API contracts near entry points. Use `table.freeze` carefully (shallow freeze), immutable shared config and separate mutable per-player state. Choose manual state managers only if several systems truly subscribe; avoid import cycles and side effects at require time.

## Review criteria
Error checks on every yield; no unguarded `WaitForChild` that silently waits forever on missing optional content; every event connection canceled on destroy; no legacy `wait` / `spawn` / `delay`; each remote validates ownership/range/rate; all numeric remote values finite (`x == x` and ±∞ handling); typechecker output visible. Benchmark correctness and readability before code golf.
