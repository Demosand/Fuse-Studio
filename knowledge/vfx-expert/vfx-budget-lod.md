---
title: Visual effects performance budget and LOD
tags: vfx mobile budget LOD rate limiting emitters lights pooling culling
status: curated
---

# Visual effects performance budget and LOD

## Budget by experience, then measure
Do not hard-code arbitrary particle counts as guaranteed FPS. Define a per-client simultaneous effects budget and quality tiers (low, medium, high) with weights. Low: essential silhouette and 1 impact cue; Medium: sparks/trail/short light; High: richer secondary effects. Apply distance and visibility culling; limit duplicates by event key/time, never drop authoritative feedback.

## Local spawning
Server communicates validated event type, approximate world location and sequence; client instantiates non-gameplay visuals. Do not replicate server-tweened cosmetic parts each frame. Nearby-player fanout can be filtered by relevance; no `FireAllClients` for every tiny particle.

## Pool discipline
Pool only repeated effects that are expensive to allocate. Reset transparency/size/color/rate/Enabled, attachments, beam bindings, particle state and timers on reuse. A released object must never carry old effect state. Profile in Developer Console/MicroProfiler on low-end target hardware.
