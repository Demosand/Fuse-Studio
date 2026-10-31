---
title: NPC state machines perception and combat AI
tags: npc ai behavior tree navmesh pathfinding perception line of sight state machine
status: curated
---

# NPC state machines perception and combat AI

## Design agents around player experience
States: Idle, Patrol, Investigate, Chase, Attack, Search, Retreat/Stunned. Transitions from bounded perception events: sight cone, raycast occlusion, last known position, sound stimulus, cooldown and threat. Avoid perfect information cheats unless intentionally telegraphed. Give enemy tells for attacks and clear counterplay.

## Runtime
Perception and path planning run on staggered intervals; only local motion interpolation needs frequent updates. Cache goals with invalidation; repath when blocked or target moved significantly, not every Heartbeat. Use `PathfindingService` with verified agent parameters, safe fallback when path fails, and distance/line of sight checks before attacking.

## Multiplayer correctness
Server owns NPC intention and damage. Client owns cosmetic reactions. Enforce zone budgets on simultaneous AI and avoid thousands of colliding NPC parts. Test unreachable target, doorway, jump, player quit, streaming boundary and 40 NPCs.
