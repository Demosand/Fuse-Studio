---
title: High-end UI motion choreography
tags: ui animation tween spring transition stagger orchestration motion microinteractions
status: curated
---

# High-end UI motion choreography

## Make motion semantic
Motion signals hierarchy and cause/effect. Enter: establish destination and first focal element; update: communicate value change; exit: close swiftly without a long block; success: reward the action, not an endless loop. Anticipation → action → settle, but restraint beats constant bounce. Use one motion language: e.g. snappy mechanical or soft elastic, not both randomly.

## Practical timings (initial hypotheses, tune by testing)
Hover 80–150ms, press 70–120ms, toast 160–260ms, modal 180–320ms, large screen transition 220–450ms. These are design starting points, not Roblox guarantees. Sequence children with small stagger 20–45ms only where meaningfully improves reading.

## Technical rules
Tween `UIScale.Scale`, position, transparency, `UIStroke.Transparency`, `UIGradient.Offset` when supported, not the entire screen hierarchy every frame. One controller owns one property's active tween: cancel stale tween on new intent; update state before playing; guard late callbacks with an incrementing sequence ID. Use `CanvasGroup.GroupTransparency` for unified fades where appropriate, but profile complex stacked CanvasGroups. No endless `Heartbeat` tweens.

## Accessibility
Respect `GuiService.ReducedMotionEnabled` and provide zero-motion/short-duration transitions. Avoid flash, excessive shake, and loss of pointer target under movement. Make popup close button interactive immediately. Preserve input focus or restore it on dismissal.

## Acceptance
Spam open/close 20×: no offscreen panels, leaked connections, orphan tweens or input locked forever. Validate after respawn and when input type changes. In client logs, no suspended callbacks attempting to animate destroyed instances.
