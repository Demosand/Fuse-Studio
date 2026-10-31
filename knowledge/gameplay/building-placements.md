---
title: Building Placements
tags: tycoon placement snap grid rotated builds base ownership collision saves Roblox
area: gameplay
---

# Player-owned building and placement systems

Client shows a responsive preview; the server validates final placement. The client is allowed to suggest object id, transform, rotation and intent, **not** to define ownership, price, collision legality or save success.

## Validation steps

- Player owns the base/plot; item is unlocked, inventory has stock, and server price is available.
- Placement coordinates/rotation are finite and within bounds; quantize to allowed grid/rotation.
- Server collision and restricted-zone checks pass with correct filters; no overlap with forbidden objects.
- Reject excessive request rate; write authoritative Instance and update persistent layout transactionally.
- Enforce maximum placed parts and budget to prevent performance griefing.

The preview can use a transparent ghost model and grid highlights locally. Validate placement again on commit; other players may have changed the scene meanwhile. When loading save, migrate old ids and cap corrupt data so an invalid profile cannot freeze the server.
