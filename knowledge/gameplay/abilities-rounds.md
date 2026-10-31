---
title: Abilities Rounds
tags: round loop lobbies ability cooldown status stun buff debuff state machine Roblox
area: gameplay
---

# Round and ability systems

## Round lifecycle

`Waiting -> Intermission -> Starting -> Playing -> Ending -> Reset`. Model transitions explicitly, broadcast public clock/state, and handle cancellation (not enough players, teleport fails, player exits, round timer expires). Do not let stale callbacks from the previous round mutate the new one; give each round a monotonic id or cancellation scope.

## Ability pipeline

Client input -> intent remote -> server validates ability ownership, cooldown, charges, allowed phase, stamina and target -> server commits state and effect -> event for cosmetics. Show an immediate predicted animation, but await server for real damage/rewards.

Status effects are best represented with one authoritative registry per entity, with priority/stacking/duration rules. Avoid independent `task.delay` for every buff where a central expiry queue is easier to reason about. Idempotent cleanup on death/disconnect/round end.

## UX

Cool-down widgets should reflect server state with compensated display, but never authorize actions. Show clear feedback for invalid action (not enough energy, stunned, dead) without spamming network calls. For mobile, action targets must be sufficiently large and not overlap the thumbstick.

## QA

Two abilities simultaneous; cooldown spam; effect expires mid-animation; respawn while stunned; game ends during windup; player switches team; stale round callbacks; remote replay.
