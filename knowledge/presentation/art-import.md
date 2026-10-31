---
title: Art Import
tags: import Blender mesh texture PBR collisions scale pivot Blender FBX normals mobile
area: presentation
---

# Asset import and technical art checks

Maintain predictable units and pivots from Blender or other content tools; inspect first imported mesh in a throwaway place. Check normals/backface culling, UVs, textures, rig naming, mesh bounds and collisions. Never blindly duplicate hundreds of parts after an import orientation mistake.

Use intentionally low-overhead collisions for background meshes. Keep detail where the player can see it; far-world objects can use lower resolution or simpler geometry. Reuse shared textures/materials and limit unique high-resolution assets.

For interactive props, align pivot with gameplay affordance (door hinge, rotating loot, grip) so code and art agree. Prefer consistent material values and silhouette over an indiscriminate pile of high-frequency noise. Verify Creator Store and third-party licensing before redistribution.
