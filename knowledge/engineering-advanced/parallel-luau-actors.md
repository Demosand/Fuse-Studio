---
title: Parallel Luau and Actor architecture
tags: roblox parallel luau actor deserialize synchronize parallelism performance
status: curated
---

# Parallel Luau and Actor architecture

## Use only when justified
Measure a CPU-bound workload before introducing Actors. Not every Roblox API is parallel-safe; inspect current engine thread-safety annotations. Parallel scripts cannot mutate unrestricted shared DataModel state while desynchronized. Organize pure math/path preprocessing into actors and synchronize minimal outcomes on the main side. `task.desynchronize()`/`task.synchronize()` must follow documented constraints.

## Architecture
Bound data exchange; use Actor messaging and immutable payloads where appropriate. Avoid splitting tiny jobs into countless Actors with high coordination overhead. Beware of ordering, race, and shared mutable state. Profiling with representative clients is essential to know whether parallelism helped.

## Good candidates
Path batch preprocessing, high-volume independent numerical computation, procedural mesh/math generation where APIs permit. Less suitable: straightforward GUI event handlers or logic dominated by engine Instance mutations.
