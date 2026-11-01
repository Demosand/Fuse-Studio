---
name: visual-refs
description: "Search all 11,968 Roblox visual reference images, 5 clips and 213 README/docs paths by style, GUI type, animation, VFX and genre. Link to sources; inspect images only with actual vision tools."
disable-model-invocation: true
---
# Fuse Studio / Complete visual-reference search

Task: $ARGUMENTS

Read docs/visual-references.md for search rules. Use local MCP `list_visual_categories` when unsure about content, then `search_visual_references` with narrow English search and `section` (stud/ui/style/game/vfx/animation/icon/docs) and `limit=3..5`. If MCP absent use `npm run refs:search -- <keywords> --section=...` or search catalog/roblox-ai/paths/*.txt. Paths/index are included in the plugin; the pictures themselves are linked to source commit and require a visual-capable browser or user image attachment for actual inspection.

Do NOT ask for GUI style when game already has a style/reference. Otherwise ask developer once and remember in the project. Select no more than a few pictures per step, inspect visually when possible, then describe only what actually was seen, NOT assumed visual details from filenames. Build ORIGINAL Roblox UI/VFX, not replicated copyrighted game artworks. **Never use the external image URL in a Roblox ImageLabel and never invent an asset ID**. Use own native GUI elements or permitted uploaded images. For Stud combine `StudUISafe`, `StudIconsSafe`, and `StudNativeIcons`. Official Creator Hub textual docs take priority over historical screenshots for engine APIs. Preserve copyright and CC BY attribution where applicable.
