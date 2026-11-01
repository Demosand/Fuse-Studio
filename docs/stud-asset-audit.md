# Stud UI asset audit and safe adapter (Fuse Studio)

19 community-reported inaccessible Roblox Asset IDs were located precisely in the vendored Stud UI kit. These are not confirmed deleted by our tools: live Studio permission tests are required. The original MIT modules are preserved without changes.

## Safe setup in Roblox Studio
Place six ModuleScripts together under ReplicatedStorage:
- StudUI.luau
- StudMotion.luau
- CheckUIIcons.luau
- StudAssetGuard.luau
- StudUISafe.luau
- StudIconsSafe.luau

Require the safe adapters for a NEW GUI:

    local RS = game:GetService("ReplicatedStorage")
    local UI = require(RS:WaitForChild("StudUISafe"))
    local Icons = require(RS:WaitForChild("StudIconsSafe"))

Previously built menus can keep the original code until you migrate. The safe adapter makes reported missing studs into small native decorations, uses pink header gradients, rarity gradients and R$ text. The remaining unlicensed icon illustrations should NOT be silently assumed available.

## Verify actual availability in YOUR experience
Use a deliberate client test LocalScript, not on every join:

    local Guard = require(game.ReplicatedStorage.StudAssetGuard)
    local statuses = Guard.AuditAsync(nil, function(asset, status)
        print("Stud:", asset, status.Name)
    end)

Roblox ContentProvider:PreloadAsync reports Enum.AssetFetchStatus. Failure may mean private/restricted or missing, not necessarily deleted. Test both client and published experience ownership/access where appropriate. Avoid preloading all 1022 icons on every respawn.

## Image references do not become Roblox IDs
- Original Stud UI screenshots: https://github.com/TemporaryLooker22/Stud-UI-Clean-Roblox/tree/main/assets/screenshots
- Original Stud mockups in roblox-ai: https://github.com/izzyfrm/roblox-ai/tree/main/style-refs/studs
- Kenney CC0 icon-sheet previews: https://github.com/izzyfrm/roblox-ai/tree/main/style-refs/simulator
- Illustrative basket/shop icons (visual only; rights uncertain): https://github.com/izzyfrm/roblox-ai/tree/main/visual-refs/icons

Upload your own images or CC0 assets with verified permission through Roblox Studio Asset Manager, get the assigned IDs and verify them. Avoid copying third-party screenshot graphics or game-specific logos. Native vector-like GUI components require no image uploads.

## Performance
The procedural stud fallback creates extra UI instances: profile on phones and reduce the number of generated studs for large grids. Its look is an approximation, not pixel-equivalent to the original texture.

See detailed IDs and suggested replacements in knowledge/ui-expert/stud-asset-replacement.md.
