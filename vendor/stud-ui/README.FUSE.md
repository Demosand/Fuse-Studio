# Stud UI Clean Roblox — original MIT sources

Original project: https://github.com/TemporaryLooker22/Stud-UI-Clean-Roblox

This folder includes original Luau kit source code, reference docs and examples from TemporaryLooker22 (2026). Full license is in LICENSE and icon provenance in THIRD_PARTY_NOTICES.md. The source uses 1022 icon references; real Roblox image asset access is subject to Roblox policies. Upstream gallery screenshots are deliberately not bundled; see original GitHub README and assets/screenshots.

For Fuse Studio use /fuse-studio:stud-ui. This folder is source/reference material, NOT an additional enabled Claude skill, so users choose Stud explicitly or through one-time style selection.
## Fuse Studio safe adapters
StudAssetGuard.luau, StudUISafe.luau, and StudIconsSafe.luau are Fuse-authored additions. They avoid 19 user-reported unavailable IDs without altering original source modules. Use with original StudUI/CheckUIIcons/StudMotion. See docs/stud-asset-audit.md. All originals remain covered by their upstream copyright; no screenshot gallery was redistributed.

## Fuse 2.5
StudNativeIcons.luau is a Fuse-authored procedural alternative to user-reported unavailable ShopBasket, Robux coin, and CheckUIIcons gamepad/social IDs. It is loaded automatically by the Safe modules, not the original MIT kits. Emoji banana may require a custom authorized icon on some platforms. All external roblox-ai reference images remain source-linked only.
