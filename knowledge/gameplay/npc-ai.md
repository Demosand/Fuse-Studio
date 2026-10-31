---
title: Npc Ai
tags: NPC pathfinding PathfindingService navigation state machine behavior tree AI optimization pursuit stuck
area: gameplay
---

# NPC architecture and pathfinding

An NPC needs a compact state model: **Idle -> Search -> Chase -> Attack -> Recover**, with explicit transition guards. Choose finite state machines for simple enemies, utility/behavior tree systems only for genuinely complex decision logic.

## Pathfinding

- Use `PathfindingService` and recompute on changed objectives, obstruction or stale route, not every Heartbeat.
- Use target acquisition with spatial bounds and LOS checks; account for `StreamingEnabled` client visuals and server-only decisions.
- Have a stuck detector based on progress over time; reset paths safely, use a fallback rather than an infinite recompute loop.
- Stagger thinking/path requests across NPCs. Prefer one scheduler for large crowds and vary update frequency by distance/importance.
- Decide network ownership deliberately for physics NPC assemblies; do not grant remote clients control over combat truth.

## Network and lifecycle

Server owns target choices, health and hit outcomes. Clients can interpolate cosmetics, footsteps, facial effects and idle animations. Clear tracking connections, path blocked listeners and task loops on death/despawn. Cache expensive perception only while valid.

## Perception

Consider FOV, distance, sight blockers, recent noise, time since last seen. Separate last known location from actual current location to produce predictable stealth behavior. Use stable fairness rules (no telepathic targeting through walls) unless game design explicitly says otherwise.

## Test

20–100 NPC scale according to actual target device/server budget; doors open/close; moving targets; jump/navigation failure; server shutdown; duplicate spawn; chase target leaves; path target unreachable. Profile real expensive calls.
