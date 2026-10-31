---
title: Luau
tags: strict type checking Luau export type generics task future type checker casts pcall
area: engineering
---

# Modern Luau defaults

Use `--!strict` on new maintainable modules unless local project constraints require another mode. Avoid introducing undocumented new Luau syntax without confirming it exists in the target runtime.

```lua
--!strict
export type Item = { id: string, price: number, stackable: boolean }
local Items = {}
function Items.canBuy(wallet: number, item: Item): boolean
    return wallet >= item.price and item.price >= 0
end
return Items
```

Prefer `task.spawn`, `task.defer`, `task.delay`, and `task.wait` instead of legacy scheduling APIs. Use modern generalized iteration where supported. Type exported interfaces and module boundaries first. A cast (`:: RemoteEvent`) is a promise to the typechecker, **not a runtime assertion**; check class with `IsA` when the instance may be untrusted or dynamic.

## Unknown inputs and narrow types

```lua
--!strict
local function validAmount(value: unknown): number?
    if typeof(value) ~= "number" or value ~= value then return nil end -- NaN
    if value % 1 ~= 0 or value < 1 or value > 50 then return nil end
    return value
end
```

Remote payloads must be validated at runtime; types alone do not protect the server. Prefer `unknown` over `any` on external inputs. Do not make public consumers depend on implicit broad dynamic tables.

## Async and failure

- Handle `nil` from `FindFirstChild`; consider timeouts for awaited dynamic objects.
- Check DataStore, HTTP and cross-server calls with `pcall` plus defined retry/backoff logic.
- A yield inside an unexpected hot path can cause stalls or races; record which public functions yield.
- Disconnect event listeners and cancel delayed work when objects disappear. Task cancellation is not a substitute for lifecycle design.

## Sources to verify

Official Roblox Creator Hub API Reference and Luau language docs. Community skills are helpful but not authoritative when APIs change.
