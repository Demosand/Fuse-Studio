---
title: Project Structure
tags: Rojo folder hierarchy ReplicatedStorage ServerScriptService StarterPlayer bootstrap services controllers
area: engineering
---

# File and instance structure

Use the repository's established layout first. For a new medium-scale experience, this is a legible starting point:

```text
ReplicatedStorage/
  Shared/                 -- typed config, shared pure functions, interfaces
  Remotes/                -- server-created RemoteEvent/Function instances
ServerScriptService/
  Bootstrap.server.luau
  Services/               -- ShopService, DataService, CombatService
StarterPlayer/StarterPlayerScripts/
  Bootstrap.client.luau
  Controllers/            -- Input, UI, Camera, VFX
StarterGui/               -- visual ScreenGuis if designed in Studio
ServerStorage/            -- private templates, server-only assets
```

- Server owns critical state, client owns visual feel and local input.
- Build init order explicitly: config -> data -> core services -> handlers -> gameplay start. Don't yield forever waiting for a remote created later by another uncontrolled script.
- Avoid duplicating constants across client/server. ReplicatedStorage shares **ModuleScript source**, not a shared mutable runtime.
- Where Rojo is in use, update the actual source of truth and project map; do not edit generated instances and lose your work at next sync.
- Preserve names, public APIs, and existing packages unless change is justified. If using Wally, pin versions; if using a module library, read the installed API instead of inventing methods.

## Bootstrap practice

Centralized startup is useful when modules depend on each other; a tiny game can start from two scripts. Modules should not perform hidden side effects at `require` if explicit initialization is necessary. `Init` registers dependencies; `Start` connects inputs and begins yielding tasks. Guard against double-start.

## New feature checklist

Write one sentence each for: entry point, server owner, input path, replicated public state, persistence (if any), cleanup hook, failure path, and manual verification. This prevents a large amount of later debugging.
