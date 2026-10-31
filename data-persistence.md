---
title: Data Persistence
tags: DataStore UpdateAsync session lock safe save retry schema migration ProcessReceipt autosave
area: engineering
---

# Data persistence without dupes or losses

**Critical:** DataStore failures are normal operational events. Save with defensive schema validation, retries with bounded exponential backoff, `UpdateAsync`-style merge logic, periodic autosave, leave/shutdown hooks, and session ownership. For a serious economy prefer a well-maintained, battle-tested profile/session-locking library, but inspect its installed API/version first.

## Required invariants

- Each profile has a schema version and defaults for missing fields; migrations are ordered and idempotent.
- Don't trust malformed/stale value types. Enforce caps on balances, inventory sizes and serialization budget.
- Only the owning server can modify a live profile. Use a session lock/lease or library that guarantees this; don't simply `GetAsync` on multiple servers and last-writer-wins.
- Read failure is **not** a new empty save: never overwrite a player's actual profile after failing to load it.
- If save fails, show or log the failure, retry safely and don't promise persistence.

## Purchase receipts

Robux developer product grants must be decided by `MarketplaceService.ProcessReceipt`; don't grant based on the purchase prompt closing. Persist processed `PurchaseId` alongside effects in a single durable transaction. Returning `NotProcessedYet` lets Roblox retry on failed persistence; make the grant idempotent to avoid dupes. Check current official receipt requirements before launch.

## Example outline (not production session-lock implementation)

```lua
--!strict
-- Use a profile library with leases; below is a service boundary, not a complete datastore.
local function grantProduct(profile, receiptId: string, amount: number): boolean
    if profile.processedReceipts[receiptId] then return true end
    profile.coins += amount
    profile.processedReceipts[receiptId] = true
    -- Persist profile atomically; report success ONLY if durable commit succeeded.
    return saveProfileAtomically(profile)
end
```

**Do not copy this outline as a finished receipt handler:** `saveProfileAtomically` and transactional rollback are application-specific. Real receipt callbacks must handle unavailable profile, failed saves, idempotence and return enum decisions correctly.

## Test matrix

Join/leave quickly; two servers compete; shutdown during save; DataStore throttling; duplicate purchase callback; migration from several old schemas; network failure; player rejoins while previous save is pending.
