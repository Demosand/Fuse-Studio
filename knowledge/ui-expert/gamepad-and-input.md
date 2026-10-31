---
title: Keyboard gamepad touch accessibility and navigation
tags: ui gamepad focus controller touch navigation input contexts selection
status: curated
---

# Keyboard gamepad touch accessibility and navigation

## Input contract
Define actions by intent, not device. Use `ContextActionService`/`UserInputService` appropriately for gameplay input; UI activation should use `GuiButton.Activated` instead of mouse-only click callbacks where possible. Keep prompts for keyboard, touch and controller coherent and reactive to modality changes. No click-only gestures; alternative for drag/drop and hover tooltips.

## Gamepad focus
Set `Selectable`, `SelectionImageObject`, `NextSelection*` links where layout demands, and explicit initial selection on opening. Avoid focus traps; restore focus after modal closure. `GuiService.SelectedObject` must refer to a live, visible control. Test directional navigation and controller Back/Escape.

## Touch
Interaction targets should be large enough and separated. When 2+ controls cluster, consider thumbs and occlusion of world. Distinguish swipe-to-scroll from tap-to-equip. Avoid requiring press-and-hold without visible affordance; provide haptic/audio only as optional feedback.

## Accessibility
Respect user text size and reduced motion, use text labels with icons and shape redundancy, provide readable error text and avoid rapid flashing. Check safe zones on notched devices; account for on-screen keyboard.
