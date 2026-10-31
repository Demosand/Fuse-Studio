---
name: data
description: "Design safe DataStore, profile migration, purchases, leaderboards and persistence"
disable-model-invocation: true
---

# Fuse Studio / data

Task: $ARGUMENTS

Read `knowledge/engineering-advanced/datastore-migrations` and `knowledge/engineering/data-persistence`. Respect UpdateAsync, error budgets and session locking; keep ProcessReceipt idempotent and durable; test duplicate events, crash, migrations. Do not invent purchase success or silently drop saved state.

Common protocol: inspect existing project context first; respect project's coding/style conventions; use targeted local knowledge search only if needed; make minimal coherent edits; verify using available tools; report changed paths and unverified behavior. Follow main Fuse Studio server-authority, cleanup and performance standards.
