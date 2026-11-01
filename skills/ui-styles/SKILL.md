---
name: ui-styles
description: "Choose and persist Roblox GUI art direction. Explore the 25 styles and 11,968 image references from roblox-ai without reusing copyrighted assets."
disable-model-invocation: true
---
# Fuse Studio / UI Style Selector

Task: $ARGUMENTS

Inspect existing GUI, project `docs/gui-style.md` and supplied screenshots FIRST. If style is already established, preserve it without asking. For a NEW UI where style is unclear, ask developer ONCE: Stud, Premium Simulator, Modern Minimal, Glass/Aurora, Sci-Fi, Tactical, Pixel/Retro, Cartoon, Fantasy or custom/reference? Accept other styles. If developer explicitly delegates design, choose an appropriate style.

Use `search_visual_references` with `section='style'` or `section='stud'` and `limit<=5` to browse the full local catalog. View at most 2–3 relevant images using available vision/browser tools before describing their appearance. For themes consult original mockups at `style-refs`; real-game screenshots and image links are inspiration, not freely redistributable assets. Persist selected design tokens and usage in project files when appropriate, then apply consistently to HUD, inventory, shop and menus. Stud uses original kit + Fuse safe native fallback wrappers; other styles use design principles rather than claiming a bundled kit.
