---
title: Stud UI Roblox simulator component kit and style
tags: stud studs simulator ui gui chunky buttons beveled glass rarity sunburst inventory shop icons
status: upstream-mit
source: https://github.com/TemporaryLooker22/Stud-UI-Clean-Roblox
---
# Stud UI — authentic visual language and source kit

Original: TemporaryLooker22/Stud-UI-Clean-Roblox (Copyright 2026 TemporaryLooker22, MIT). Fuse bundles upstream actual Luau modules, docs and examples under vendor/stud-ui, including original LICENSE and third-party notices. See the upstream GitHub README for visual screenshot comparisons.

Design signature:
1. Build truly LAYERED 3D buttons: dark tinted outline, shaded bottom lip, vibrant gradient face, two diagonal glass streaks, stud texture, tiny inner bevel, bottom glow. No generic flat rounded button substitution.
2. Bold Montserrat Heavy / GothamSSm Heavy text, contextual dark-tint strokes, two-pixel extruded shadows for key labels.
3. Dark translucent window body and bright stud header, tilted icon overflowing top-left, chunky red close button, optional scene blur.
4. Outlined cartoon sticker icons tilted a little, using real paths from CheckUIIcons, not invented IDs.
5. Dark item slots, rarity accents and selective rotating sunbursts (Common through Cosmic).
6. Green=coins/confirm; purple=Robux/skip; red=shop/danger; blue=primary nav; yellow=reward/premium; gray=done.
7. Build around source's 1050x620 reference geometry with one root UIScale and safe-area testing on mobile; not a fixed one-resolution implementation.
8. Snappy button press (~0.05 seconds, 0.92 scale) and bouncy open (~0.32 seconds), fast close, optional hover/sounds. Respect reduced motion and restore blur/FOV.

Real source kit (not a style imitation):
- vendor/stud-ui/src/StudUI.luau: UI.Window, UI.Button, UI.ProductCard, UI.ItemSlot, UI.ProgressBar, UI.Pill and more.
- vendor/stud-ui/src/StudMotion.luau: window management, button binding, scaling, sounds, idle animation and camera effects.
- vendor/stud-ui/src/CheckUIIcons.luau: 1022 icons. Never read all registry lines into model context; search vendor/stud-ui/references/icon-catalog.md for exact named icons.
- vendor/stud-ui/references/: measured tokens, components, layouts, motion, assets and QA checklist.
- vendor/stud-ui/examples/: 6 concrete builders/controllers for shop, HUD, rebirth, rewards, index and interaction.

Implementation:
1. Only when user chooses Stud or their established project UI already uses it. Otherwise follow style selector question.
2. Inspect live project. Read relevant source docs and a nearest matching example; avoid loading entire icon catalog.
3. Place StudUI, StudMotion and CheckUIIcons as ModuleScripts under ReplicatedStorage (or use Rojo). Build GUIs in StarterGui Edit mode, not per-respawn.
4. Use documented actual component calls and preserve upstream internal instance names needed by motion.
5. Bind client interactions with StudMotion in LocalScript. All currency/purchase/loot decisions are authoritative on server.
6. Check desktop/mobile safe insets, touch, gamepad, long text, rapid toggles, respawn, memory leaks, reduced motion, asset permissions. Custom Roblox asset IDs may be inaccessible; use authorized replacements.
7. Compare Studio screenshots to upstream gallery when Studio screenshot MCP exists; otherwise say visual match is unverified. Preserve upstream license and icon notices.

Source: https://github.com/TemporaryLooker22/Stud-UI-Clean-Roblox
## Community-reported unavailable images (Fuse 2.4)
The original Stud UI kit includes 19 specific IDs reported unavailable in one user environment (7 icons, 4 UI textures, 8 rarity panels). These may be permissions/availability failures, NOT proven deleted. For new projects install original StudUI, StudMotion, CheckUIIcons together with StudAssetGuard, StudUISafe and StudIconsSafe and require the safe wrappers in builders. The wrappers use native GUI studs, header/rarity gradients and fallback Robux text without inventing asset IDs. Source kit is retained byte-for-byte; see knowledge/ui-expert/stud-asset-replacement, docs/stud-asset-audit and optional runtime PreloadAsync audit. Links to visual Stud mockups in izzyfrm/roblox-ai are reference only.
