---
title: Combat HUD and readable live data
tags: ui hud crosshair damage indicators ammo health latency scoreboard cooldown
status: curated
---

# Combat HUD and readable live data

## Combat readability
Every HUD element should answer a question during 300ms glance: health, ammo, cooldown, objective, damage direction, interaction target. Prioritize contrast with the world, not mere decorative aesthetics. Reduce nonessential HUD during intense combat and restore outside it. Provide color + shape cues for low health, not color alone.

## Feedback layering
Hit marker is client prediction only; authoritative damage arrives separately. Never display final score/currency from client-only hit. Reconcile ammo and reload state with server equipment rules; predicted local animations can be rolled back. Layer markers with bounded numbers: important crits > small routine hits; cap concurrent floating numbers.

## Implementation
Use one observable state representation or lean event-driven UI binding, not 20 loose scripts polling `ValueObject`s on RenderStepped. Each update tween cancels stale update, merges bursts and uses latest state. Minimize per-frame text mutation. Test in bright sky/dark rooms, split objective/score overlays, mobile controls, 200ms ping, resolution scaling.
