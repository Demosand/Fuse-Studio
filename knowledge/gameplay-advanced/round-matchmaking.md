---
title: Rounds parties matchmaking and cross-server state
tags: round matchmaking teleportservice memorystore queue parties lobby recovery
status: curated
---

# Rounds parties matchmaking and cross-server state

## State machine
Lobby → Starting → Active → Ending → Results → Cleanup, with timeouts, player leaves and failed teleport transitions. Never assume a TeleportService request succeeded without confirmation; handling depends on correct event/API. Distinguish per-server match state from cross-server queue metadata.

## Persistent vs ephemeral
Use DataStore for durable player progress; MemoryStore where appropriate for temporary cross-server queues/leases. Apply TTL and collision-safe keys, reconcile stale sessions, and never make a queue entry a permission to join an unauthorized match.

## Verification
Late joiner, leader quits, full lobby, two parties race, failed teleport, server crash, depleted MemoryStore budget. Prevent infinite waiting UI and provide safe return-to-lobby path.
