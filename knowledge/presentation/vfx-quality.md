---
title: Vfx Quality
tags: vfx optimization mobile overdraw pool emitters transparency effect LOD particle budgets
area: presentation
---

# Particle quality scaling and performance

Treat transparency layers, full-screen alpha blending, dynamic lights and high-rate emitters as a budget. Particle count alone doesn't predict GPU cost; large overdraw across the whole screen can be much worse than many tiny sparks.

## Quality tiers

- Low: silhouette + decisive flash, very few particles, no secondary lighting, reduced trails.
- Medium: silhouette + medium particles + short trail.
- High: deliberate extra layers, optional local light, atmospheric decay; never obscure gameplay.

Select quality based on device/application settings and observed performance, not vague "PC" labels. Reduce output dynamically only if the adaptation cannot cause flashing/flickering or lost game-critical cues. Stop/offscreen systems and recycle attachments. Benchmark busy arena scenes on real target devices.

Server should not replicate cosmetic effect instances every frame. Send compact trigger and let client render its tier. Critical results still need reliable authoritative state.
