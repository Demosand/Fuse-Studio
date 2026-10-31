---
title: Responsive layouts across PC phone console
tags: ui responsiveness mobile safearea viewport orientation foldable gamepad UIScale
status: curated
---

# Responsive layouts across PC phone console

## Layout system
Use relative anchor/scale for large containers and pixel offsets for minimum target sizes, gutters, strokes and readability. `UIPadding` + `UIListLayout`/`UIGridLayout` handles flow; `AutomaticSize` handles content growth; `UISizeConstraint` and `UIAspectRatioConstraint` avoid extreme stretching. Beware of constraint conflicts and `AutomaticSize` inside `ScrollingFrame`: use `AutomaticCanvasSize` for the latter.

## Breakpoint-based adaptations
Derive layout from `workspace.CurrentCamera.ViewportSize` on the client and appropriate inset/safe-area settings, update on camera changes, not per frame. Desktop: optional sidebars; phone portrait: bottom navigation and vertical inventory; phone landscape: shorten header, tuck utility buttons; controller: focusable consistent grid. Do not assume physical device type from viewport alone; use input modality as separate variable.

## Safe area
Inspect `ScreenGui.ScreenInsets`/other available inset policies and relevant `GuiService` topbar/safe area behavior. Ensure HUD and critical buttons do not sit under notches/topbar/thumb zones. Avoid blind `IgnoreGuiInset = true` changes. Beware of inset double-application. Verify with device emulator and on real hardware if possible.

## Test matrix
Viewport classes: 360×640, 390×844, 768×1024, 1280×720, 1920×1080; also ultra-wide. Test horizontal text scaling, scrolling, keyboard obstruction while typing, topbar toggling, long inventory name, 0/999999 currencies, localization, respawn after menu open.

## Acceptance
No clipped controls, no overlap with input prompts, all actions reachable by touch/controller, buttons comfortably tappable, no infinite feedback layout loop. Record screenshots before/after or state that only structural review was possible.
