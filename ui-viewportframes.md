---
title: Ui Viewportframes
tags: ViewportFrame WorldModel camera 3d inventory icons item preview performance lighting
area: presentation
---

# 3D item previews in UI

`ViewportFrame` creates a contained 3D presentation; a `WorldModel` may be appropriate when preview behavior needs it. Clone lightweight display models rather than live gameplay Instances with active scripts. Set a predictable `Camera` and pivot/model bounds; don't assume an asset is centered or oriented forward.

## Composition

Choose consistent preview scale, angle, light and material response across rarity tiers. The item silhouette should read even as a small icon. UI controls must not obscure the model; provide a 2D fallback for low-end devices or loading failures.

## Performance

Don't render dozens of independent rotating high-poly previews at once. Pause when panel closes, throttle rotations, reuse camera/scenes if reasonable and dispose cloned models/tweens/connections when no longer visible. Verify texture/mesh asset permissions. Mobile draw cost may rise with both game scene and several UI viewports.
