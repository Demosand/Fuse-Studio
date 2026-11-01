---
name: stud-ui
description: "Build polished Stud UI with bundled original MIT modules and Fuse native fallback artwork for 19 reported problematic Roblox asset IDs; browse full visual reference catalog."
disable-model-invocation: true
---
# Fuse Studio / Stud UI specialist

Task: $ARGUMENTS

Stud style is SELECTED; do not ask again. Read `knowledge/ui-expert/stud-ui-design`, `knowledge/ui-expert/stud-asset-replacement`, then only the needed original `vendor/stud-ui/references` and nearest example. For visual inspiration, use local `search_visual_references(query,section='stud',kind='image',limit=3)` to find mockups. The MCP returns URLs/names only: visually inspect results before making claims; do not copy copyrighted assets.

Install original `StudUI`, `StudMotion`, `CheckUIIcons` **plus** Fuse `StudAssetGuard`, `StudUISafe`, `StudIconsSafe`, `StudNativeIcons` as Roblox ModuleScripts together in ReplicatedStorage. For new builders require `StudUISafe` for UI and `StudIconsSafe` for icon lookup, not the raw originals. Fuse drawings replace user-reported unavailable Stud texture, pink header, rarity panels, basket, robux coin, gamepad and neutral social symbol; banana uses emoji text and may require an original uploaded fallback. If a specific visual needs a custom texture, create/obtain one with rights and **upload to Roblox first**, then verify its access.

Preserve existing working GUIs unless migration is requested. Build UI in Edit mode, wire LocalScript lifecycle/tweens correctly and validate server-side shop transactions. Verify safe areas, mobile, controller, text scaling, high latency, missing asset permissions, and mobile render cost. If a Studio MCP is connected, run an opt-in `StudAssetGuard.AuditAsync` for the 19 IDs; do not assume they were deleted. Report tests actually run; if Studio is inaccessible, provide precise setup and test steps. Maintain MIT notices.
