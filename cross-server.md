---
title: Cross Server
tags: MessagingService MemoryStoreService matchmaking lobby leaderboard server teleport race
area: engineering
---

# Cross-server state and matchmaking

Use platform services for their intended scope: DataStore for persistent player profiles, MemoryStore for expiring coordination/queues where applicable, MessagingService for bounded cross-server notifications. Check current API limits and failures before relying on specific quotas.

Cross-server messages may arrive late, duplicate, fail or be reordered. Build idempotent processing with event ids, TTL and authoritative lookup for critical state. Never expect a broadcast alone to commit money or access.

For matchmaking, distinguish party ownership, skill/rule matching, join timeouts and requeue behavior. Reserve servers/teleports via current official APIs and use a recovery path for a player who can't connect. Do not store personal data or secret matchmaking tokens in client-replicated modules.

Test region mismatch, empty queues, rapid disconnect/rejoin, crashed destination server and message throttling. Monitor queue latency and match quality separately.
