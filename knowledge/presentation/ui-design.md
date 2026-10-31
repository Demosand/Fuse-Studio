---
title: Ui Design
tags: Roblox GUI responsive UIScale UIAspectRatioConstraint UISizeConstraint UIListLayout safe area HUD inventory store tokens
area: presentation
---

# High-quality Roblox UI systems

Begin from an intended **visual language**: genre, audience, typography, spacing, color tokens, borders, shadows, icon geometry. Reuse consistent visual primitives; avoid mixing five unrelated design styles. Visual hierarchy should tell players where to look, what is interactive and what changed.

## Responsive layout

- Use constraints and proper anchors for actual screens, not raw fixed pixel offsets everywhere.
- Design at 16:9, then check tall phone, small tablet, ultrawide and different safe areas. Beware squashed `UIScale` applied globally.
- `UIListLayout`, `UIPadding`, sizing constraints and appropriate automatic sizing can produce predictable reusable compositions. Beware nested automatic sizing feedback loops.
- Prefer spacing and type scale tokens. Large touch targets, stable HUD zones and gamepad selection paths matter as much as visual beauty.
- Test text translation, long usernames, dynamic numbers, readability over 3D scenes and aspect-ratio constraints.

## Example UI design tokens

```lua
--!strict
return {
    Color = {
        Surface = Color3.fromRGB(19, 23, 34),
        Elevated = Color3.fromRGB(32, 38, 53),
        Text = Color3.fromRGB(245, 247, 250),
        Accent = Color3.fromRGB(88, 202, 236),
        Danger = Color3.fromRGB(235, 93, 110),
    },
    Radius = { Small = 8, Medium = 14, Large = 22 },
    Space = { XS = 4, S = 8, M = 12, L = 20, XL = 28 },
}
```

These are **illustrative**, not universal Roblox GUI properties. Implement tokens as ModuleScript values used by the UI factory/components.

## Robust state architecture

HUD observes a read-only client-side representation of server state. Buttons invoke controllers, not business logic. For shops, display pending state and prevent accidental duplicate local click, but the server still validates and deduplicates.

## Visual QA

Can player tell what's clickable within one second? Is rarity coded with both color and shape/text? Do hover/click states appear on keyboard/mouse, touch and gamepad? Are modal focus traps and close actions consistent? Does every animation serve understanding rather than just movement?


## Select a GUI style
For new interfaces read `knowledge/ui-expert/style-selector` and `style-presets`; use the provided style or existing project tokens first. For Stud style, consult `knowledge/ui-expert/stud-ui-design` and the MIT upstream component kit bundled at `vendor/stud-ui`.
