---
title: UI renderer and animation performance
tags: ui performance canvasgroup viewportframe animated gradients particles redraw frame
status: curated
---

# UI renderer and animation performance

## Fast path
Event-driven updates; no UI tree rebuild every frame. Debounce search input; pre-create persistent common widgets; lazy-load long scroll content and expensive 3D previews. Reuse `TweenInfo` constants but cancel conflicting tweens. Avoid `GetPropertyChangedSignal('AbsoluteSize')` feedback loops that write the same size repeatedly.

## CanvasGroup and effects
CanvasGroup group transparency helps coherent fades but stacking many complex groups may cost extra rendering; measure. Gradients/strokes/corners are not free if thousands animate. UI particles made of many GuiObjects may be slower than a compact ParticleEmitter in 3D; profile on a low-end device. If screen animation is a CSS-video imitation with a hundred per-frame instance property changes, simplify.

## Verification
Collect Script Profiler and MicroProfiler evidence before/after, plus UI tree count and input-to-display latency if possible. Compare heavy inventory open and closed, common vs rare FX, 30 toasts, item grid 200 entries, console vs mobile. Report baseline and delta in ms, not guessed FPS percentages.
