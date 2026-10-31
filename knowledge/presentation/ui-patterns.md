---
title: Ui Patterns
tags: toast notifications shop settings inventory HUD responsive patterns panels modal animations
area: presentation
---

# UI patterns: shops, inventories, notifications

## Inventory

Virtualize or paginate large lists. Display actionable item state: selected, equipped, owned, locked, pending server transaction. Use icon plus text/shape for rarity. Preserve scroll location and focus when filtering or a remote response changes inventory.

## Shop

Make price, currency, effect and terms explicit before purchase. Don't show "success" until server confirms. Debounce repeated local taps but validate repeats server-side. Indicate unavailable items clearly; failure should recover without closing the whole interface unexpectedly.

## Toasts

Queue short noncritical notifications; merge duplicates; limit simultaneous visible count; cancel obsolete tweens. Critical security/data-loss errors need durable messaging, not a toast that vanishes unnoticed. Respect reduced motion and control screen edges around touch controls.

## Settings

Use toggles/sliders with clear labels, preview when safe, explicit reset, consistent focus. Persist user preferences but never let client-owned settings change server-authoritative rules. Expose reduced motion, shake, volume and quality options.
