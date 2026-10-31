---
title: Prediction reconciliation and interpolation
tags: roblox networking prediction reconciliation lag interpolation input acknowledgments
status: curated
---

# Prediction reconciliation and interpolation

## Scope
Use local prediction to make responsive feel, not to grant rewards. Server validates outcomes, client renders immediate provisional feedback. Each request has monotonically increasing local sequence and timestamp if needed; server acknowledges authoritative state plus last processed sequence, client can rewind/replay pending input for a deterministic movement model where practical. For nondeterministic physics, prefer bounded smoothing/correction over false deterministic guarantees.

## Interpolation
For remote players, maintain short timestamped snapshot buffer, interpolate to a slightly delayed render time, extrapolate only briefly with bounds and snap on teleport/respawn. No frame-dependent lerp constants; use dt-based blend. Detect streaming removal and missing characters.

## Failure states
Unreliable packets missing, reordered snapshots, high ping, respawn, mode switch, stale server ack and network ownership changes. Always prevent a client-predicted projectile impact from modifying server health. Verify 30/100/200ms latency and intentional packet loss where test support exists.
