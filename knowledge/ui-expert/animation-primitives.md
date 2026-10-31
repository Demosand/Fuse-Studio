---
title: Reusable animated button and panel primitives
tags: ui primitives tween debounce easing UIScale buttons panels callback cleanup luau
status: curated
---

# Reusable animated button and panel primitives

## Button primitive
Keep hitbox stable while animating a child or parent UIScale; avoid moving clickable region away from pointer. Press/touch activation uses `Activated`, hover use `MouseEnter`/`MouseLeave` for pointers only. Ensure selection glow for controller; reduce motion. Active tween per property stored and canceled when state changes, not new connection per hover.

## Modal primitive
State `closed/opening/open/closing`; one overlay manager; versioned transition so old completion does not hide a reopened panel. Starting state matches target to avoid position teleport. On close: release focus, clear temporary events and disable interaction at correct time. No async loops that survive destroyed UI.

## Progress primitive
Clamp numeric server value between bounds; tween to latest target while a previous tween may be in flight. Update screen reader equivalent text and show numeric change; don't use a visual bar as sole indication.

## Quality gates
Spam interaction tests, mid-animation resize, reset character, switch gamepad, press Escape, disconnect network. See `examples/luau/` for typed starter components. These are implementation patterns, not universal drop-in components: adapt to actual GUI hierarchy.
