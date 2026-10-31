---
title: Task cancellation event lifecycles and clean shutdown
tags: roblox lifecycle janitor maid connections cancellation respawn task delay leaks
status: curated
---

# Task cancellation event lifecycles and clean shutdown

## Ownership
Every connection, repeating task, tween, Instance, temporary Sound, particle and input binding has exactly one owner and one cleanup path. Player-scoped controllers clean on PlayerRemoving/CharacterRemoving. GUI controllers clean on Destroy/replacement. Avoid listener creation inside click handlers without a matching disconnect.

## Cancellation
`task.delay` cannot simply be 'forgotten': close over an incrementing generation token or cancel a thread where appropriate. Do not yield inside cleanup. A callback must verify its owner is still alive before touching destroyed UI or avatar. Avoid global `Trove` that outlives the feature; prefer a per-instance disposable.

## Leak test
Open/close 50×; respawn 20×; hot reload a GUI; run 40-player round loop; inspect connection count, instance count, memory, lingering animation updates. Use examples/luau/cleanup-bag.luau as a reference, adapt to project lifecycle.
