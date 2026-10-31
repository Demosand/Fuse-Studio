---
title: Movement Security
tags: anticheat movement speed teleport fly network ownership jump server validate exploits
area: engineering
---

# Practical movement anti-cheat

Avoid false positives on lag, physics impulses, seats, jump pads, teleport abilities and moving platforms. Never claim a speed hack from a single position delta; record authoritative ability/vehicle state and bound plausible motion over several updates.

## Server-side validation

Track timestamped last-known safe positions, allowed movement budget and recently authorized impulses. If observed movement exceeds a dynamic limit, cross-check teleport/speed buffs, gravity/knockback, seat/network ownership and server load before reacting. Prefer rate-limited correction and telemetry of false positives; avoid immediate permanent punitive actions without evidence.

Critical interactions (pickup, attack, checkpoint) still validate proximity to server state separately — an anti-cheat is not a replacement for every RemoteEvent guard. Force/stun and moving platforms can cause unusual velocity spikes. Aim for exploit resistance with graceful degradation.
