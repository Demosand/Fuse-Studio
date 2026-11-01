---
title: 19 reported unavailable Stud UI asset IDs and design replacements
tags: roblox stud asset image missing deleted permission icons panel shop banner
status: community-reported-not-verified
---
# Stud UI — 19 reported problematic Roblox asset IDs

Reported by user; found in source code. Availability has NOT been independently verified in Roblox Studio. A failure may indicate permissions, moderation, deletion, content type, or connectivity.

| ID | Exact upstream role | Safe non-ID replacement |
|---|---|---|
| 128758985973789 | Banana 1st icon | Original fruit icon or licensed CC0 sprite uploaded by creator |
| 80257872092187 | Discord Gamepad 1st Outline | Native gamepad silhouette with dark/light stroke |
| 117542131956071 | Discord Gamepad 2nd | Native gamepad silhouette |
| 78959709568458 | Discord Gamepad 2nd Outline | Gamepad silhouette with outline |
| 117065333515921 | Discord Gamepad Black | Dark custom gamepad graphic |
| 79504731314029 | Discord Gamepad White | White custom gamepad graphic |
| 121258694194678 | Twitter Bird White | Plain social label or authorized brand graphic |
| 140544932962041 | Studs texture tile | Procedural studs using small Frames/UICorners |
| 108268925256584 | Pink shop header | UIGradient pink header with native stud detail |
| 120530633952826 | Shop basket | Original shop bag icon; reference at roblox-ai/visual-refs/icons |
| 83084350609799 | Robux coin | TextLabel R$ or authorized uploaded coin |
| 89267995407736 | Common rarity panel | UIGradient + UIStroke in Common colors |
| 131137889121430 | Uncommon rarity panel | UIGradient + UIStroke in Uncommon colors |
| 105083838865206 | Rare rarity panel | UIGradient + UIStroke in Rare colors |
| 101084229455301 | Epic rarity panel | UIGradient + UIStroke in Epic colors |
| 86850543324255 | Legendary rarity panel | UIGradient + UIStroke in Legendary colors |
| 135658280761682 | Mythic rarity panel | UIGradient + UIStroke in Mythic colors |
| 71658771409468 | Divine rarity panel | UIGradient + UIStroke in Divine colors |
| 121878407812617 | Cosmic rarity panel | UIGradient + UIStroke in Cosmic colors |

The first 7 occur in vendor/stud-ui/src/CheckUIIcons.luau, also in FlatMap; the other 12 in vendor/stud-ui/src/StudUI.luau. All 19 are an exclusion list for the safe adapter, NOT a complete audit of the original 1022 icons.

## Safe adapter modules
Original MIT source remains unmodified. Copy StudUI, StudMotion, CheckUIIcons, StudAssetGuard, StudUISafe, StudIconsSafe into ReplicatedStorage. In new builders require StudUISafe instead of StudUI and StudIconsSafe instead of CheckUIIcons. Procedural studs and rarity gradients replace reported textures; R$ replaces missing Robux icon. Other missing decorative icons remain placeholders, never invented IDs.

## Runtime verification
Use the explicit Studio audit during testing (client LocalScript):

    local Guard = require(game.ReplicatedStorage.StudAssetGuard)
    local statuses = Guard.AuditAsync(nil, function(assetId, status)
        print(assetId, status.Name)
    end)

ContentProvider PreloadAsync status can fail for reasons other than deletion. Do not run a 1022-icon preload on every spawn. Once you upload originals or verify third-party CC0 assets with proper permission, use those new, working experience-specific Roblox IDs.

Reference style galleries: https://github.com/izzyfrm/roblox-ai/tree/main/style-refs/studs ; https://github.com/izzyfrm/roblox-ai/tree/main/style-refs/simulator

Official ContentProvider: https://create.roblox.com/docs/reference/engine/classes/ContentProvider

## Fuse 2.5: native icon implementations
`StudNativeIcons.luau` draws basket, Robux-style coin, gamepad, neutral social symbol and emoji banana. `StudIconsSafe.Get()` returns internal `fuse://...` markers for the 7 reported icon IDs; `StudUISafe.Image()` converts markers to GUI graphics, not to Roblox `ImageLabel.Image` asset IDs. If a real accessible uploaded asset is desired, supply it explicitly after checking rights/availability in the target place. Source MIT modules stay unchanged. Stud texture, pink header and all 8 rarity panels already use procedural/native gradients.
