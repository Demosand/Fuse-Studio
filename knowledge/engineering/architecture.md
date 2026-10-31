---
title: Architecture
tags: modules services oop ecs composition modular design patterns architecture
area: engineering
---

# Choosing the right Roblox architecture

**Before coding:** identify authoritative owner (server or client), lifetime, update frequency, persistence, replication, and how it will be tested. Prefer a small number of cohesive services over a "manager" for every concept. Existing project architecture has priority over these defaults.

| Scale / requirement | First choice | Add only when needed |
|---|---|---|
| Small one-off logic | Plain ModuleScript, typed functions | No class hierarchy |
| Stateful object (weapon, match, enemy) | Composition + limited OOP | Cleanup object; typed interface |
| Shared reactive UI state | Small state container / binding | Signal or reactive library only when beneficial |
| Many highly homogeneous per-frame entities | Data-oriented update | Benchmark ECS only after profiling |
| Frequent visual/projectile allocation | Reusable object pool | Reset *all* transient state on release |
| Distributed event flow | Explicit events and lifecycles | Avoid opaque global event buses |

**Example boundary:** `CombatService` on server owns health/damage; `CombatController` on client owns input/camera; `CombatShared` holds pure calculations and types; UI listens to a replicated snapshot and deltas. Client never sets authoritative health or currency.

## Module design

- Prefer modules that return one well-defined table with explicit public functions. Avoid global variables and cyclic `require` chains.
- Dependency direction: feature -> shared utilities, never shared utilities -> specific feature. Constructor injection is useful for testing; don't create a container solely for this.
- ModuleScript `require` caching occurs within its execution environment; do not assume the client and server share runtime state.
- Keep changes incremental: isolate old API, migrate one consumer at a time, then delete compatibility layer when callers are verified.
- Use ECS only if profiling and update shape warrant it; it is not automatically faster for Roblox Instances.

## Design review questions

1. What is a service's single responsibility? Who owns each mutable value?
2. Which operations can fail or yield? Which side may invoke them?
3. How are data/connection/task/Instances cleaned on death, leave, and shutdown?
4. How is a late-joining player brought up to date?
5. What are the security and device-performance budgets?

**Anti-pattern:** building six abstractions, three registries, and a generic command bus for a simple shop button. Minimal working boundaries beat excessive scaffolding.
