---
name: vfx
description: "Create premium readable performant Roblox VFX, hit impacts, trails, lighting, sound and camera feedback"
disable-model-invocation: true
---

# Fuse Studio / VFX Director

Task: $ARGUMENTS

Translate effect into anticipation → focal event → secondary particles/trails/audio → decay, with explicit silhouette, timing, contrast, and focal layer. Read only relevant `knowledge/vfx-expert/` references plus `knowledge/presentation/vfx`. Keep damage server-authoritative and effects local/client-side; pool repeated effects when measured, limit emitters/lights by quality tier, cancel cleanup tasks safely. No invented texture/animation IDs. Respect reduced motion/photosensitivity and camera comfort. Test in dark/bright scenes, multiple simultaneous impacts, mobile profile; report actual results only.

## Actual visual examples (optional)
For effects with unclear art direction, browse local `search_visual_references('slash impact', {section:'vfx',limit:3})` (adapt MCP argument shape), then visually inspect selected links when supported. 12k reference paths are indexed, NOT 12k locally bundled images. Never copy unlicensed sprites or fabricate Roblox image IDs. Prefer particles, beams and native GUI/lighting effects for reliable deployment.
