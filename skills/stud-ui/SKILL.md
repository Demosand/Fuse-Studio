---
name: stud-ui
description: "Build authentic Stud-style Roblox simulator UI using bundled StudUI, StudMotion and 1022-icon library."
disable-model-invocation: true
---
# Fuse Studio / Stud UI Specialist

Task: $ARGUMENTS

Stud is explicitly selected by invoking this command. Do NOT ask about style. Read knowledge/ui-expert/stud-ui-design, then only task-specific vendor/stud-ui/references and nearest example. Keep original MIT StudUI, StudMotion and CheckUIIcons in ReplicatedStorage, but for NEW GUI add StudAssetGuard, StudUISafe, StudIconsSafe and require the safe wrappers. Read knowledge/ui-expert/stud-asset-replacement and docs/stud-asset-audit first: 19 image IDs were reported unavailable. Never invent replacement IDs. Use native GUI gradients/studs and user-approved uploaded assets. Compose actual styled GUI with documented API; wire a LocalScript controller and preserve upstream instance names expected by runtime. Verify mobile, controller, responsive scaling, no leaked tweens, safe insets, high latency, reduced motion and asset permissions. Use Studio MCP only if present. Never claim testing/screenshots you did not do; explain exact placement otherwise. Preserve author notices.