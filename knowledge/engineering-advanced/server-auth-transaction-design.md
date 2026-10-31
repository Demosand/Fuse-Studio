---
title: Server-authoritative transactional gameplay
tags: roblox server auth transactions inventory currency idempotency receipts
status: curated
---

# Server-authoritative transactional gameplay

## Trust model
Client sends intention and minimal non-sensitive input. Server owns balances, inventory, XP, damage, unlocks and match result. A remote event is not a permission check; validation includes type, id format, rate, current character, distance, active session and server-known entitlement. Do not rely solely on cooldowns on client.

## Transaction steps
1. Validate request shape and player/session ownership.
2. Check permission/preconditions against latest server state.
3. Apply changes atomically within a non-yielding critical section where possible; avoid performing yielding DataStore calls while holding local mutable transaction state without a recovery plan.
4. Persist through a stable session/data layer where needed, with idempotency key for paid or replayable events.
5. Send outcome and versioned snapshot/delta. Never trust client-provided new currency balance.

## Races and retries
Repeated clicks, duplicated RemoteEvents, two servers, timeouts and player leave are normal. Revalidate state after any yield that could make state stale. For purchases, `MarketplaceService.ProcessReceipt` owns granting; store durable receipt id and avoid returning `PurchaseGranted` before durable grant state is secure. Test duplicate delivery and failure/restart paths.
