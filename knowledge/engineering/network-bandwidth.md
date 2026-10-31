---
title: Network Bandwidth
tags: packet buffer delta compression UnreliableRemoteEvent bandwidth rate limiting networking interpolation
area: engineering
---

# Bandwidth and high-frequency multiplayer

Measure send/receive traffic per player and the number of remote calls; don't optimize from anecdote. Prefer event semantics (shoot, reload, interact) over replicating an entire mutable table each frame. Derive low-frequency summary state from state snapshots and small deltas.

## Real-time position / aim

Use loss-tolerant traffic only for data that can be safely dropped. Add sequence numbers and expiry; older cosmetic packets must not overwrite newer ones. Interpolate transform samples, and stop extrapolation after a short bound. Keep a fallback when updates stop.

`UnreliableRemoteEvent` is appropriate for some high-rate visuals but not hit authority, purchases or inventory commits. Cap packet size and payload structure. Buffer packing may reduce bandwidth when profiling says serialization is costly; it introduces endianness, precision and versioning complexity, so don't use it casually.

## Scalability

Interest management: notify only nearby or otherwise relevant clients. Quantize precision based on actual gameplay (e.g., coarse cosmetic orientation versus combat validation). Apply rate limiting and packet budgets on the server, and test high-ping loss scenarios, out-of-order packets, and late joins.
