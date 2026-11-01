---
name: asset-audit
description: "Find broken/unavailable Roblox image asset references, identify 19 Stud IDs, test real accessibility in Studio and use safe native-drawn replacements rather than fake IDs."
disable-model-invocation: true
---
# Fuse Studio / Asset Auditor

Task: $ARGUMENTS

Read `knowledge/ui-expert/stud-asset-replacement`, `docs/stud-asset-audit.md` and `data/stud-reported-ids.json`. The 19 IDs are community-reported, NOT proven globally deleted; an asset can fail due to permissions, moderation, network and other reasons. Use `npm run asset-audit` for static mapping and `StudAssetGuard.AuditAsync` only when Studio test execution is available and user expects a test. Original MIT modules stay intact; for new GUIs use `StudUISafe`, `StudIconsSafe`, `StudNativeIcons` (and StudAssetGuard) as a safe adapter. Basket/gamepad/coin can be replaced by native GUI icon drawings; rarity, studs and shop header use native GUI and gradients. Banana emoji may not render across fonts; prefer own authorized PNG uploaded to Studio when needed. References from `roblox-ai` are *image references only*, not Roblox IDs. Give tested results separately from assumptions. Do not produce fake replacement IDs.
