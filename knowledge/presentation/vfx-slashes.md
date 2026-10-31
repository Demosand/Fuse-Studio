---
title: Vfx Slashes
tags: sword slash mesh beam trail flipbook VFX timing hit spark trail afterimage
area: presentation
---

# Weapon slash and impact recipes

Define shape language first: a narrow energetic slash, broad heavy blade arc, or magical continuous beam are different visual stories. A strong slash reads on the actual player camera at real gameplay speed, not only a paused close-up.

## Layer timing (illustrative)

- Windup: subtle trail/smear and anticipation; avoid revealing server-private state to opponents too early.
- Contact: short high-contrast slash silhouette + flash/spark, synchronized local hit sound.
- Follow-through: thinner trail and dissipating particles; reduce screen coverage around aiming reticle.
- Recovery: effect fades and pooled objects reset, without lingering invisible Parts.

For a moving blade `Trail` requires two appropriate Attachments. `Beam` ties two Attachments and can emulate straight arcs, but may need geometry/texture deformation for curved swooshes. Meshes/flipbooks can provide stylized silhouettes; verify orientation and face-camera behavior. `EditableMesh` availability and restrictions must be checked in current Studio APIs before adopting it.

Cap stacked effects for combos. Use a lower-cost alternative for phones and reduced flashing options. The VFX event does not determine damage; server validates the strike separately.
