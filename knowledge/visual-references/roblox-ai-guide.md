---
title: izzyfrm roblox-ai visual inspiration catalog
tags: roblox ai visual references stud gui shop inventory art style images vfx animation
status: curated-links
source: https://github.com/izzyfrm/roblox-ai
---
# Visual reference library — izzyfrm/roblox-ai

This is primarily visual research, NOT a Luau coding skillset. Upstream README reports 11,968 image files + 5 short clips, and the repository has no root LICENSE, no SKILL.md and no Lua/Luau/JS files in its default branch. Images have mixed ownership: do not copy/redistribute them or make them Roblox asset IDs without licensing and uploading.

## Curated gallery links
- [25 styles](https://github.com/izzyfrm/roblox-ai/tree/main/style-refs): original mockups organized by theme, with CC0 Kenney contact sheets where indicated.
- [9 original Stud UI mockups](https://github.com/izzyfrm/roblox-ai/tree/main/style-refs/studs): HUD, inventory, shop, settings, palette, loading, rewards, dialogue, leaderboard.
- [Simulator CC0 contact sheets](https://github.com/izzyfrm/roblox-ai/tree/main/style-refs/simulator): compare Kenney icons, then verify originals at kenney.nl before reuse.
- [Stud GUI image references](https://github.com/izzyfrm/roblox-ai/tree/main/visual-refs/studs-ui): 377 screenshots; reference only.
- [31 icon illustrations](https://github.com/izzyfrm/roblox-ai/tree/main/visual-refs/icons): includes Glossy Pink Shopping Basket Icon, Shop Outline, Settings Outline and more; rights for game redistribution are not granted by repository.
- [151 UI style examples](https://github.com/izzyfrm/roblox-ai/tree/main/ui-styles): modern, glass, retro, stud wood, real-game interface screenshots.
- [VFX](https://github.com/izzyfrm/roblox-ai/tree/main/vfx), [animations](https://github.com/izzyfrm/roblox-ai/tree/main/animations), [cutscenes](https://github.com/izzyfrm/roblox-ai/tree/main/cutscenes), [SFX previews](https://github.com/izzyfrm/roblox-ai/tree/main/sfx).
- [Roblox Creator Docs screenshots](https://github.com/izzyfrm/roblox-ai/tree/main/roblox-docs): 3,730 official screenshots, CC BY 4.0 with attribution.
- [Real Roblox game references](https://github.com/izzyfrm/roblox-ai/tree/main/game-refs): 6,602 images; ownership retained by game creators.

## Workflow
1. Existing reference or style takes priority; don't ask for style again.
2. For new UI, select a style once with /ui-styles then browse 2-4 relevant specific pictures. Never bulk-inject 12k images or links into context.
3. Actually VIEW the pictures with a visual tool before claiming their exact appearance. Otherwise give links or request a screenshot.
4. Extract layout, spacing, color, motion and hierarchy; create an original implementation, without copyrighted logos/characters. Rights must be checked before reusing images.
5. GitHub images are NOT rbxassetid URLs. For Stud use the real Stud kit with safe wrappers, and handle missing assets using native Roblox GUI or properly uploaded permitted replacements.

Style categories: studs, simulator, cartoon, fantasy, sci-fi, pixel, retro-pixel, glass, dark-pro, horror, anime, medieval, cyberpunk, kawaii, pirate, space, candy, western, winter, survival, speed, sports, tycoon, tower-defense, input-prompts.

## Full offline filename catalog (Fuse 2.5)
Now ALL source paths are indexed in `catalog/roblox-ai/paths/*.txt` with pinned SHA in `catalog/roblox-ai/manifest.json`: 11,968 images, 5 clips, 213 Markdown descriptions. Use local MCP `search_visual_references({query,section,kind,limit,offset})` and `list_visual_categories()`. Retrieve just 3–5 relevant URLs per task; visualize actual files with a supported vision/browser tool before claiming what they depict. The index doesn't contain media and does not convey reproduction rights. More details: docs/visual-references.md.
