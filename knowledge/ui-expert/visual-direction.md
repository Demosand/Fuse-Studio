---
title: UI art direction and critique
tags: ui gui art direction design systems originality readability hierarchy
status: curated
---

# UI art direction and critique

## Start from the experience, not a decoration recipe
Identify the game's fantasy, audience, pace, platform, emotional tone, monetization boundaries, current screenshots and visual references. Choose ONE coherent design language and write a 5-line art-direction brief: purpose, metaphor, shape language, color rhythm, motion signature. The game should not look like a generic dashboard or a copy of a reference.

## Composition that reads in 2 seconds
Establish primary action > contextual content > utility controls. Use a strong silhouette and 2–3 spatial groups. Give important actions contrast and space, not repeated glow. Prefer restrained palettes with purposeful accent colors; check the UI in grayscale. Align baselines and edge positions; use a spacing scale (e.g. 4/8/12/16/24/32 rather than every object having arbitrary padding). Choose distinct typographic roles (display, title, value, body, caption); avoid more than two unrelated font families. Make numbers tabular when appropriate.

## Roblox-native implementation
Use `Frame`, `TextLabel`, `TextButton`/`ImageButton`, `UICorner`, `UIStroke`, `UIGradient`, `UIPadding`, `UIListLayout`, `UIGridLayout`, `UIAspectRatioConstraint`, `UISizeConstraint`, `CanvasGroup` as needed. Do not add every effect to every component. Never mimic real glass blur with a fake heavy translucent overlay if text contrast suffers. ScreenGui layering is intentional, not large uncontrolled ZIndex ranges.

## Critique loop
- Capture at least desktop 16:9, narrow phone portrait, phone landscape, tablet and gamepad selection when available.
- Evaluate hierarchy, consistent corners/strokes, typography, contrast, content density, empty/long values, hover/focus/pressed/disabled/loading and safe areas.
- Compare hierarchy in 80%-scale screenshot, grayscale, and during gameplay movement.
- Make three most impactful fixes; do not endlessly add random effects.

## Handoff contract
Return a visual specification and exact implementation locations, component tree, sizing/spacing/color tokens, interaction states, lifecycle and verification matrix. If no Studio visual tools, explicitly label visual quality unverified.
