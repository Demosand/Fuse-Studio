---
title: Server-side hit validation and lag compensation
tags: roblox lag compensation server rewind hit registration raycast anti exploit subtick
status: curated
---

# Server-side hit validation and lag compensation

## Why subtick cannot be copied 1:1
Roblox scripting is built on Roblox's own simulation/network stack. You can implement timestamped action requests, buffering historical transforms and rewind checks, but you cannot replace engine tick scheduling or guarantee CS2-style parity. Make design goals explicit: fairness, responsiveness and exploit resistance.

## Safe shot flow
1. Client predicts crosshair, muzzle, local effects and sends shot intent `{weaponId, origin, direction, clientShotTime?, sequence}`.
2. Server checks equipped weapon, fire rate, finite vector, valid origin offset, ammo and ability state. Ignore user-provided 'hit player' as proof.
3. Maintain bounded transform history for server-observed characters; clamp time rewind by known ping bounds and policy (e.g. don't reward extremely old claims).
4. Validate line-of-sight and reconstructed hitbox with a conservative tolerance; account for authoritative world collision where possible.
5. Apply damage once on server; broadcast appropriate cosmetic result.

## Risks
Do not trust arbitrary client timestamps or reconstruct unvalidated physics. Rewind needs bounded memory, cleanup on respawn/leave, server timestamps and measured tradeoffs. StreamingEnabled and client render delay affect what players see; test with bots/multi-client and latency simulation.
