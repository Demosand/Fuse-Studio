---
title: Vfx
tags: VFX particle emitter beam trail flipbook sword slash impact explosion object pool lighting effects
area: presentation
---

# VFX art direction and technical ownership

Every effect has **silhouette -> timing -> color -> spatial motion -> sound**. Strong impact generally needs anticipation, main hit frame, follow-through and decay. Layer distinct frequencies: tiny fast spark + medium shape + slow glow/smoke. Distinguish rarity/element using shape and rhythm, not only hue.

## System design

- Server sends event id/type, position/seed and relevance (only when needed). Client plays non-authoritative visuals.
- Reuse emitter attachments/parts for high-frequency effects. Set emitter properties before burst; stop old tweens and clean particles on reuse.
- Bound per-frame particle counts and active sources. Provide low/medium/high device tiers, and respect reduced flashing.
- Use `ParticleEmitter:Emit(n)` for intentional bursts; ensure `Enabled` is managed predictably on pooled objects.
- `Beam` needs two valid Attachments; `Trail` needs Attachments on a moving object; otherwise the effect may be invisible or degenerate.

## VFX budget and clarity

Choose few readable layers over many overlapping transparent sprites. If effect covers players, blocks aim or confuses enemy/friendly attacks, reduce scale and opacity or move part of the effect into screen-space feedback. Test in bright, dark and crowded maps, mobile resolutions and actual combat camera distance.

## Hit effect recipe

1. 0–40ms: flash/emissive contact and small high-speed sparks.
2. 30–140ms: main radial shock or slash silhouette.
3. 100–350ms: trailing particles, smoke and shrinking light.
4. Finish: clean attachment, restore reused object state, destroy unexpected orphan instances.

Times are starting points, not engine guarantees. Tune by frame-by-frame visual inspection. The critical hit confirm should stay immediate even on slow clients.

## Failure modes

Remote flood for every particle, zero-lifetime emitter, invisible attachment setup, emitters parented to streamed-out targets, pooled effects with stale color or transparency, blend-heavy overdraw, camera shake that is physically unpleasant.
