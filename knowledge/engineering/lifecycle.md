---
title: Lifecycle
tags: cleanup Maid Trove Janitor memory leaks RunService heartbeat task cancel connections respawn
area: engineering
---

# Lifecycle and memory safety

Every feature should declare who creates it and who destroys it. Track all event connections, tasks, tweens, BindToRenderStep callbacks, temporary Instances, projectiles, NPC state, player entries and camera overrides. Hidden listeners in modules are a common source of slow degradation.

```lua
--!strict
local connections: {RBXScriptConnection} = {}
local function observeButton(button: GuiButton)
    table.insert(connections, button.Activated:Connect(function()
        print("activated")
    end))
end
local function destroyController()
    for _, connection in connections do connection:Disconnect() end
    table.clear(connections)
end
```

For systems with several resource types use an existing Maid/Janitor/Trove-style cleanup utility, but confirm actual API. Never add a dependency just to disconnect one event. `Destroy()` often disconnects events on that Instance, but not every external subscription/timer holding references to it; own the full cleanup.

## Frequent leaks

- Long-lived `RunService.Heartbeat` or `RenderStepped` callbacks per enemy or GUI that are never disconnected.
- UI controllers rebuilt on each respawn while old controllers still listen.
- Delayed callbacks that touch destroyed player/character or recycled pooled object.
- Tables keyed by Player never cleared on `Players.PlayerRemoving`.
- Pools retaining stale attributes/particles/connections and accidentally reusing state.

## Verify

Repeat 20+ join/leave, respawn, open/close and ability-use cycles. Observe memory, Instance/connection counts and time/frame metrics; a rising line means the lifetime is not controlled. Distinguish cache warmup from actual leak.
