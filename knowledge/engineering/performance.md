---
title: Performance
tags: MicroProfiler Script Performance Stats GPU draw calls memory mobile perf budgets networking pooling
area: engineering
---

# Performance: measure, then fix

First specify target devices and expected player/entity count. A scene smooth on a desktop can fail badly on low-end mobile. Separate **CPU script**, **GC/allocation**, **physics**, **network**, **GPU/overdraw**, **asset memory** and **server budget**.

## Measurement workflow

1. Record actual symptom and reproduction scene, baseline frame-time distributions (not only average FPS), client/server player count, device.
2. Inspect MicroProfiler, Script Performance, Developer Console Stats, network and rendering details.
3. Rank hotspots by evidence, patch a single bottleneck, reproduce, compare and monitor regression.
4. If tools unavailable, say "hypothesis" and provide clear instructions to measure. Never report invented speedups.

## Typical fixes

- O(N²) target searches -> spatial query/filtering or cached candidates with invalidation.
- 100+ per-entity heartbeat loops -> central scheduler with staggered/visibility-based updates.
- Creating/destroying hundreds of visual parts -> pool and reset; reduce high-cost particles before adding complexity.
- Excess allocations -> reuse transient tables selectively; beware caches that leak forever.
- Excess RemoteEvents -> combine related deltas, send only to relevant players, lower cosmetic frequency.
- Overdraw/high transparency and expensive lighting -> reduce layered alpha, lights/shadows, particles, visible GUI effects.
- Pathfinding for all NPCs every frame -> path only on changed goals/blocked routes; time-slice decisions.

## Pool correctness

Reset velocity, `CFrame`, `Transparency`, attachments, tweens, tags, attributes, callbacks and Emitters on acquire/release as appropriate. Reset stale callbacks and ensure one owner at a time.

## Avoid premature optimization

Favor readable modules, then profile. Fixed entity-count thresholds and "ECS always faster" claims are unreliable; run real A/B trials on target devices. Prefer frame time and p95 latency metrics over a single FPS screenshot.
