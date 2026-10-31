---
title: Network Security
tags: RemoteEvent RemoteFunction input validation anti exploit rate limit ownership authoritative purchase packet
area: engineering
---

# Secure Roblox networking

Treat every client-sent value as adversarial. The server decides damage, purchases, movement ability validity, ownership, loot and rewards. Clients send *intent*, not success declarations.

**Handler checklist:** type, structure/length, numeric range/finite, ownership, proximity/line of sight, cooldown, current match state, server resource balance, per-player rate limit. Never trust a client-sent price or access-control flag.

```lua
--!strict
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local request = ReplicatedStorage:WaitForChild("RequestPurchase") :: RemoteEvent
local lastRequest: {[Player]: number} = {}
local COOLDOWN = 0.2

request.OnServerEvent:Connect(function(player: Player, itemId: unknown)
    if typeof(itemId) ~= "string" or #itemId > 60 then return end
    local now = os.clock()
    if now - (lastRequest[player] or -math.huge) < COOLDOWN then return end
    lastRequest[player] = now
    -- Lookup item in *server-owned* catalog, verify entitlement and server balance.
    -- Call the server-side purchase transaction, never accept the price from client.
end)

Players.PlayerRemoving:Connect(function(player)
    lastRequest[player] = nil
end)
```

`RemoteFunction` can be useful for quick request/response, but never call `InvokeClient` from the server for critical operations: a compromised client can stall/error. Prefer server-controlled event replies with correlation ids for actions that may take time. Never expose a general remote that executes arbitrary actions or accesses other Instances by client-supplied path.

## Serialization / bandwidth

- Use event-per-intent or tightly defined action schemas; include compact ids and numbers rather than entire object graphs.
- Rate-limit on the **server**, not only UI. Bound table sizes and string lengths before allocation.
- Send high-frequency disposable visuals using `UnreliableRemoteEvent` if appropriate; do not rely on ordering/delivery. Reliable remotes carry critical game outcomes, not every particle update.
- Consider relevance-based replication, batching, deltas, quantization and `buffer` for hot streams. Verify with network stats rather than optimizing blindly.

## Testing attacker behavior

Spam same event; send nil, NaN, infinity, strings instead of numbers, giant tables, invalid IDs, purchase from distant position, old item after resale, leaving during action. Test at least two clients for isolation.
