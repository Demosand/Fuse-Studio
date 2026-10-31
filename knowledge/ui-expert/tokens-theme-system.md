---
title: Roblox UI design tokens and theming
tags: ui tokens palette typography font scale responsive design system components
status: curated
---

# Roblox UI design tokens and theming

## Stable tokens
Define reusable `Colors`, `Spacing`, `Radii`, `Typography`, `Durations`, `Easings`, `ZLayers`, `Icons`, `Quality`. Use a typed ModuleScript in ReplicatedStorage (UI constants shared, not networked for every component). Group by semantic role: `surfacePrimary`, `surfaceElevated`, `textPrimary`, `textMuted`, `accent`, `positive`, `negative`, `strokeFocus`, `scrim`; avoid raw `Color3.fromRGB` scattered throughout controllers.

## Example contract (Luau)
```luau
--!strict
local Theme = {
    Colors = { surface = Color3.fromRGB(17, 22, 35), text = Color3.fromRGB(244, 246, 251), accent = Color3.fromRGB(111, 211, 255) },
    Space = { xs = 4, sm = 8, md = 12, lg = 20, xl = 32 },
    Motion = { fast = 0.12, normal = 0.24, slow = 0.4 },
}
return table.freeze(Theme)
```

Use themed component factories with explicit ownership; visual styling and gameplay state should not be mixed. Apply theme changes to alive components; disconnect listeners when screen unmounts. `table.freeze` is shallow; do not assume nested tables frozen. Test dark scenes, color-blind distinguishability and contrast under UIGradient.

## Typography and localization
Prefer correct fonts using `FontFace` where appropriate; maintain readable baseline and line height. `TextScaled` may shrink unpredictably; prefer explicit `TextSize` with `UITextSizeConstraint` or `AutomaticSize` for changing content. Avoid hard-coded label dimensions assuming English; test Russian, German, long player names and large numerals.

## Scaling principle
Treat phone, tablet, TV/gamepad and desktop as distinct input/layout modes, not one universal UIScale multiplier. If using UIScale, clamp by viewport and preserve logical sizes for interactive targets. Use `GuiService.PreferredTextSize` behavior where relevant. See Roblox Creator Hub UI size modifiers / accessibility.
