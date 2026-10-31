---
title: Efficient networking interest management and serialization
tags: roblox replication rate buffer delta interest zones packet bandwidth
status: curated
---

# Efficient networking interest management and serialization

## Control network traffic
Decide event reliability: `RemoteEvent` for inventory/events, `UnreliableRemoteEvent` for expendable cosmetic samples where packet loss and reordering are acceptable. Don't send authoritative critical operations unreliably. Send local intent not complete client state; server chooses recipients in range, interest zones and team. Snapshot on join, compact deltas for changes, sequence/version and reconciliation after missed updates.

## Representation
Prefer small ids, finite rounded numbers, quantization and `buffer` for proven hot payloads. Measure packet size/serialization cost; a complex custom binary protocol is not automatically better than fewer events. Batch low-priority updates; avoid remoting every frame if clients can interpolate between server snapshots.

## Abuse constraints
Caps on payload lengths, array nesting, strings, rate limits, map lookups and processing costs; reject bad data early. Every client sent value may be malicious or NaN/±infinity. Rate limiter keyed by player and action must be cleaned on leave. Do not serialize Instances from clients as authorization signals.

## Evidence
Use Developer Console network stats and MicroProfiler network capture; distinguish packet overhead from render or server CPU stutter.
