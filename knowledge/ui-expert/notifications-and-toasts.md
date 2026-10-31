---
title: Toast queue notification architecture
tags: ui toast notifications queue stacking pooling cooldown interrupt priority
status: curated
---

# Toast queue notification architecture

## Queue policy
Classify `info`, `success`, `warning`, `error`, `reward`. Critical network errors shouldn't be buried under spam loot. Maximum 3 visible; queue cap and dropping/coalescing repeated lower priority events. Give each toast a stable id and lifecycle token; duplicate rewards collapse into a count. Do not permanently cover aiming or mobile jump controls.

## Motion and disposal
Spawn a cloned prefab or pooled frame, attach `UIScale`, set off-screen/transparent initial state, tween enter and exit, restore baseline when reused. Invalidate timers if toast explicitly dismissed or replaced; do not use `task.delay` callbacks after destruction. `Tween.Completed` may also fire on cancellation; check final state before hiding and ignore stale transitions.

## Reliability
UI reflects server authoritative event ids for paid awards; prevent duplicate toast for re-delivery. Accessibility: enough reading time, pause where practical, concise wording, reduced motion, optional history panel. Test spam 50 notifications and long localized text.
