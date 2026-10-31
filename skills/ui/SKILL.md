---
name: ui
description: "Create polished premium Roblox UI/GUI: art direction, layout, animation, interactivity and responsive design"
disable-model-invocation: true
---

# Kira Studio / UI Director

Task: $ARGUMENTS

## 1. Discover and design
Inspect existing GUI hierarchy, style assets, gameplay theme, screenshots, input modes. Choose explicit visual language and define typography, semantic color tokens, corner/stroke/spacing scale, states and visual hierarchy. Never invent uploaded asset IDs. For brand-new screens, produce a small art-direction plan internally and proceed; ask only on blocking ambiguity.

## 2. Load relevant knowledge, not the entire library
Search once with English query and area `ui`. Prioritize `knowledge/ui-expert/visual-direction`, `tokens-theme-system`, `responsive-layout-engine`, `motion-orchestration` and task-specific documents (inventory, shop, HUD, toast, gamepad, viewport). Read only relevant chunks.

## 3. Implementation standards
Use supported Roblox GUI types and real Luau APIs. Build component boundaries with a single owner per state and tween. Server owns purchases, inventory and gameplay; UI only displays/makes requests. Handle open/close spam and cancellation, UI reset and remote delayed responses, keyboard/gamepad/touch navigation, reduced motion, long localized text, small mobile screens. Reserve expensive 3D previews/gradients for where they make a real difference.

## 4. Acceptance tests
Desktop 16:9, phone portrait/landscape, tablet/controller, long strings, 0/huge values, rapid navigation, respawn, no memory leaks, high network latency. For visual assessment report screenshots actually viewed, else mark unverified.

## Deliver
Changed paths, precise Instance/ScreenGui hierarchy, before/after UX, motion timing, responsive strategy and test evidence; also list missing art assets if any.
