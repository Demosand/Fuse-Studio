---
title: Beams trails attachments and flipbook VFX
tags: vfx beam trail particleemitter flipbook attachments render order offset
status: curated
---

# Beams trails attachments and flipbook VFX

## Correct building blocks
`Beam` joins Attachments and can use texture scrolling; `Trail` samples attachment motion and supports lifetime/transparency width; `ParticleEmitter` can render texture sequences and emit at bursts. Attachments must be under valid instances and aligned deliberately. Avoid creating a Model/Part per particle. Use a bounding/target lifetime and `Debris` or explicit cleanup where suitable; a pool can reduce churn.

## Slash recipe
Use a directional sweep mesh or Beam arc with one strong shape, secondary short sparks and contact decal. Synchronize hit effect with animation markers where possible; on miss reduce contact effect. Never make a 1-second giant flash obscure players during combat.

## Flipbook caveats
Verify particle FlipbookLayout/Mode/Framerate with Creator Hub and imported atlas; border bleeding, atlas tile order and alpha quality often cause broken visuals. Use low-cost fallback static sprite/particles for mobile.

## QA
Compare from close/medium distance, 30 FPS and 60 FPS, single vs 25 simultaneous impacts, varied lighting and streaming zones. Check parent destroyed while effect active.
