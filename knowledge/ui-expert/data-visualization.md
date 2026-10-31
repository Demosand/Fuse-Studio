---
title: Charts, meters and telemetry in Roblox HUD
tags: ui data visualization bar graph progress timeline stats number animation
status: curated
---

# Charts, meters and telemetry in Roblox HUD

## Use graphs to make a decision
Metric visualization is useful only if players can act on it. XP progress: show distance to next meaningful unlock, health: show urgency, cooldown: show time to use, scoreboard: show ranking with legible numbers. Use a single reference scale and visible labels for comparisons.

## Native rendering
For bars use `Frame` and `UIGradient`/`UICorner` as appropriate, update ratios with `math.clamp`. For plots, pool a fixed number of segments/GuiObjects; avoid adding one object per historical frame forever. Prefer server-sampled values at a suitable frequency; smooth on client without creating new network event per frame.

## Animation & extremes
Clamp invalid/NaN values, allow zero max, handle negative data explicitly if meaningful. Tween only visible display ratio, never gameplay state. Animate digit transitions with restraint; large currency changes may need abbreviated displays with full detail tooltip. Validate 0, 1, 999999999999 and burst updates.
