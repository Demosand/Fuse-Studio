---
title: Physics
tags: physics projectile network ownership raycast constraints ragdoll vehicles replication
area: gameplay
---

# Physics and projectiles

Physics has two competing goals: responsive motion and cheat-resistant authority. For cosmetic debris, client simulation is normally fine; for rewards/damage, the server must independently validate. Prefer raycasts for fast projectiles that might tunnel through thin parts. Use overlap queries for area checks when precise physics events are unnecessary.

## Choosing projectile models

| Type | Useful for | Trade-off |
|---|---|---|
| Client-only tracer | Visual hitscan beam | Cosmetic; not proof of hit |
| Server raycast | Competitive hits | Server authoritative; must handle timing/latency |
| Server physics projectile | Slow/grenade-style | Higher replication and CPU cost |
| Simulated deterministic trajectory | Lots of bullets | Requires careful collision steps and consistent params |

Use meaningful `RaycastParams` filters and validate interaction targets belong to the expected world. Query costs grow with frequency and scene complexity; aggregate when possible. Avoid allocating long-lived per-bullet Heartbeat connections. Use projectiles with bounded lifetime and cleanup.

## Ragdoll / constraints

Set known physical states and restore them on recovery. Clear constraints and temporary collision groups. Avoid making a character permanently uncontrollable because one timeout didn't fire. Verify network ownership changes and seats/vehicles across client disconnects.

## Tests

High speed vs thin walls, spawn inside geometry, non-collidable but queryable targets, moving targets, teleport/respawn and ownership transfer. Check public APIs before relying on particular engine semantics.
