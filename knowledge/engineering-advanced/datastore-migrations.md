---
title: Reliable persistence schema migrations and session locks
tags: datastore persistence schema updateasync migration session locking retries atomicity
status: curated
---

# Reliable persistence schema migrations and session locks

## Persistence architecture
Wrap DataStore use in a single service with versioned schema, defaults and upgrade steps. Use `UpdateAsync` when read-modify-write across sessions or ownership matters; session locks need lease, renewal, stale owner recovery and careful shutdown. Follow Roblox budgets and failure handling; don't spin retries at zero delay.

## Migration contract
A migration is idempotent and moves version N → N+1, preserving unknown safe fields as appropriate. Validate corrupted/legacy data. Never overwrite a newer schema with old defaults. Separate player profile state from temporary combat/UI state.

## Write discipline
Mark changed state dirty and debounce/schedule saves, but persist critical paid grants correctly. Handle server shutdown with time limits, `BindToClose`, concurrent Profile ownership and leave/rejoin. `ProcessReceipt` deduplication should survive server crashes and retries, not just memory.

## Tests
First login, schema upgrade, 2 servers, partial failure, rate limited store, duplicate receipt, lock expiration, crash before/after save, server shutdown under pressure.
