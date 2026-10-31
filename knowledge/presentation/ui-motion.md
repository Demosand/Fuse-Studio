---
title: Ui Motion
tags: tweens easing transitions FLIP UI motion microinteraction design Roblox TweenService animation accessibility
area: presentation
---

# UI motion design — readable, intentional and fast

Motion communicates hierarchy and causality: element appears because player opened it; item moves because inventory changed; feedback shows action accepted or failed. Use anticipation, primary motion, overshoot **sparingly**, and settle. Never animate every layer just because it is possible.

## Suggested motion vocabulary (tunable starting points)

- Micro feedback (press/hover): roughly 80–160 ms.
- Small pop/toast: roughly 150–250 ms.
- Full panel transition: roughly 200–350 ms; a slow dramatic reveal can be longer when intentionally cinematic.
- Use consistent easing families and animate opacity/position/scale as appropriate. Avoid chaining unrelated tweens that compete for the same property.

## Tween correctness

`GroupTransparency` exists on `CanvasGroup`, **not** on a general `GuiObject`. Use a CanvasGroup where group fade is needed, or animate the valid transparency properties of individual children. Always inspect API types rather than guessing.

## Safe implementation example

```lua
--!strict
local TweenService = game:GetService("TweenService")
local function animateIn(panel: CanvasGroup)
    panel.Visible = true
    panel.GroupTransparency = 1
    TweenService:Create(panel, TweenInfo.new(0.22, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
        GroupTransparency = 0,
    }):Play()
end
```

## Avoid common faults

Cancel stale tweens when changing open/closed state. An event fired mid-transition should not leave the panel half-visible or mouse-blocking. Gate extremely rapid repeated clicks, destroy connections when GUI closes and avoid dozens of perpetual decorative tweens. Respect reduced-motion options; gameplay-critical information must remain visible without animation.

## Differentiation ideas

Use tactile hover, masked reveal, small spring-like visual scale, depth/lighting changes, layered parallax (low cost), progress indicators with easing and snappy selection changes. Make effects align with brand and content — *not* a random preset pack.
