---
title: Lighting
tags: Lighting Atmosphere ColorCorrection Bloom SunRays Shadow lighting atmosphere perf scene art direction
area: presentation
---

# Atmosphere and lighting

Choose lighting for mood **and gameplay readability**. Establish a clear focal point, depth layers, light temperature contrast and silhouettes. Test at the lighting conditions players actually experience (time cycle, weather, dark interiors, low graphics quality).

## Scene strategy

1. Begin with base ambient/sky and a clear key-light direction.
2. Add depth by separating foreground, midground and background brightness/contrast.
3. Add local point/spot/surface lights only where they explain a physical source or direct attention.
4. Use Atmosphere, color correction, Bloom and other post effects **sparingly**; verify current available properties in Studio.
5. Test characters/items/UI against every background. Required interactables must remain visible without external monitor gamma hacks.

## Performance

Dynamic shadows and numerous overlapping local lights can be expensive; use selective shadow casting and mobile tiers. Bloom on already high-brightness VFX can ruin silhouette. Transparent volumetric proxy meshes can cause costly overdraw; cap them.

## Environment storytelling

Warm windows versus cold outdoors, color-coded room identity, quiet dark edges around points of interest, consistent material/roughness. Avoid uniform colored fog or overuse of screen filters. Test accessibility for brightness sensitivity and readability.
