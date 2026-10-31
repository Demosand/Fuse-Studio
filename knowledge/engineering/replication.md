---
title: Replication
tags: replication StreamingEnabled network interpolation client prediction snapshot state delta ownership
area: engineering
---

# Replication and multiplayer state

The server owns gameplay truth; clients maintain presentation and optionally prediction. Decide if each value is: owner-only, nearby-visible, globally-visible, ephemeral cosmetic, or persistent. A replicated Instance, Attribute, or RemoteEvent is not automatically appropriate for every value.

## Joining and recovery

1. Client becomes ready; server sends a **snapshot** of current relevant state.
2. Server sends smaller ordered updates (sequence/version). Apply only if the update is newer than the snapshot state.
3. If updates are lost or state mismatch detected, re-request snapshot with rate limit.
4. Keep UI resilient while snapshot isn't ready; never assume every child Instance is already streamed in.

`StreamingEnabled`: parts can stream out/in. Use existence checks, local fallbacks, and avoid cached references that become invalid. For interactions, server must verify the Instance still exists, belongs to the intended container and is in range.

## Prediction

For local responsiveness, client predicts visual movement/weapon feedback; server independently validates inputs and simulates authoritative state. Reconcile gently with authoritative snapshots. Do not let a visual rollback duplicate damage, rewards or audio. Server can send hit result ids so local predicted effects are upgraded or quietly cancelled.

## Network ownership

Physics ownership can move simulation to clients to reduce lag, but it also creates an exploit surface. Do not treat client-reported object contacts as sufficient proof of reward or damage. Validate motion plausibility and important collision outcomes server-side.

## Transport choices

- Attributes/ValueObjects: low-frequency replicated public per-instance state.
- RemoteEvent: operations and notifications needing delivery.
- UnreliableRemoteEvent: high-rate, loss-tolerant cosmetics/aim streams.
- RemoteFunction: bounded quick question/answer; avoid long blocking calls.
