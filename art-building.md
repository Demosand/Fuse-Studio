---
title: Art Building
tags: Blender Roblox mesh FBX asset import scale pivot modular environment part CSG props z fighting
area: presentation
---

# Modeling and environmental art in Roblox

The art pipeline is a production workflow: blockout -> scale validation -> silhouette -> material/color -> optimization -> collision/interaction -> lighting -> final in-game camera review.

## Blockout first

Gray-box with real player avatars, mobile controls and movement bounds. Check width/clearance, jump routes, cover, and points of interest before details. Validate first-person and third-person camera clipping. Use modular chunks with purposeful proportions, but avoid obvious repetitive wall tiling.

## Assets

Blender/mesh import: confirm units, pivot, orientation, UVs, normals and texture format in a test scene. Do not assume Blender-to-Studio orientations. Keep separate collision proxies when detailed mesh collision is costly, and avoid invisible oversized hitboxes.

**Part builds:** avoid z-fighting from coincident faces; vary detail scale (large silhouette, medium structure, small finishing marks). Use color/material variation rather than texture noise on every object. Avoid thousands of unique tiny Parts when a simpler mesh or repeated geometry works.

## Art direction

Choose cohesive shape language (rounded/cozy, sharp/industrial, hand-painted, low-poly) and limited palette. Build a small reusable prop family then extend variations. Environmental storytelling should reinforce objectives and gameplay affordances.

## Performance and rights

Review mesh triangles, texture resolution, collision fidelity, shadows and streaming distance on low-end devices. Use content you have rights to and verify Roblox asset moderation/permissions. Build alternatives for unavailable external assets.
