---
title: Combat
tags: shooting guns hit detection server rewind raycast melee lag compensation anti cheat weapons
area: gameplay
---

# Combat and gunplay that survives latency and exploits

Split **input and feel** (client) from **outcome** (server). The client can instantly animate/recoil/flash a predicted shot, but the server independently checks weapon entitlement, ammo, fire rate, reload state, target and range. Don't accept client-declared hit target/damage as truth. Use server-issued shot ids to correlate authoritative results.

## Hitscan flow

1. Client observes local equipped weapon and applies immediate cosmetics.
2. Client sends shot intent: sequence, aim origin/direction or timestamp, not damage.
3. Server verifies equipped weapon, legal cadence and ammo, plausible origin relative to character/muzzle and allowed aim.
4. Server performs its own raycast or carefully bounded lag-compensated validation; use explicit filter lists.
5. Server applies authoritative damage exactly once and replicates result/event id.
6. Other clients play relevant cosmetic effects; owner reconciles predicted hit indicator.

## Lag compensation / rewind

A recent bounded, time-stamped history of character collision proxies enables hit checks against approximate past positions. This is difficult: synchronize clocks carefully, cap rewind duration, reject implausible timestamps, avoid rewinding live physics Instances blindly, and prevent shooting through changed world geometry. Keep history small and test attackers sending stale timestamps. **Server rewind is a design concept here, not a built-in Roblox API.** Always validate the server's actual shot and map context.

## Melee

Use explicit active frames/animation markers, avoid `Touched`-only damage, track one hit per target per swing and validate range and angle server-side. Design parry/dodge/block windows according to measured server state while allowing client-side anticipation. Don't let high latency create infinite invulnerability.

## Feedback and fairness

Prioritize hit confirm timing, clear target reaction, appropriate sound pitch, camera shake capped in accessibility settings, readable friendly-fire cues and small device-scale alternatives. Test with two clients and latency simulation; don't assume zero-latency behavior.

## Failure modes

Rapid fire event flooding, invalid numeric values, weapon switch during reload, respawn in mid-swing, late hits against deleted targets, client camera origin separated far from muzzle, duplicate shot ids, server-side area damage without line-of-sight checks.
