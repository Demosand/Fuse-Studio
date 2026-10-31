---
title: Engine Gotchas
tags: Roblox APIs deprecated StreamingEnabled RaycastParams CollectionService Debris task assembly FOV
area: engineering
---

# Common Roblox engine gotchas

- `WaitForChild()` without bounded behavior can conceal a missing object forever. Verify the producer, hierarchy, server/client replication and case-sensitive names.
- `FindFirstChild` returns `Instance?`; guard `nil`. `:: Part` only persuades the checker. Use `IsA` to verify runtime class.
- `Touched` is not a secure substitute for server-approved hits, especially with client-owned physics. Guard repeated contacts and state changes.
- `Model.PrimaryPart` may be unset; consider model pivot operations for movement where suitable.
- Character instances and camera objects can be replaced on respawn; reconnect and restore previous camera state.
- Studio edit-time visuals, plugin-side server execution and live runtime do not share identical semantics.
- Tween cancellation, respawn and overlapping animation priorities can produce stale presentation; make transitions idempotent.
- `UnreliableRemoteEvent` may drop messages; critical effects/game state require a reliable recovery path.
- Modern Luau syntax and Roblox API properties change; validate against current official documentation instead of inventing enum values.
- `StreamingEnabled` means distant descendants may not exist locally; servers still must check target validity and ownership.

## Investigate a suspected engine issue

Construct the smallest reproducible Studio place. Record expected vs actual, which side ran the code, multiplayer mode, device, network ownership and relevant log output. Distinguish editor-preview behavior from published server behavior.
