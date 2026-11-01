---
name: asset-audit
description: "Check missing, private, restricted or outdated Roblox ImageLabel asset IDs, with safeguards for 19 problematic Stud UI images."
disable-model-invocation: true
---
# Fuse Studio — Roblox asset audit

Task: $ARGUMENTS

Read knowledge/ui-expert/stud-asset-replacement and docs/stud-asset-audit.md. Identify all reported IDs and exact usages before editing. Do not claim the ID was deleted based on an inaccessible webpage; Studio permissions and moderation may be involved. Prefer no-ID procedural fallbacks using Frame, UICorner, UIGradient, UIStroke and TextLabel, or original/licensed images uploaded to the target Roblox experience and verified. Preserve upstream MIT source, use StudAssetGuard, StudUISafe and StudIconsSafe instead. Only on request or in explicit Studio testing run ContentProvider:PreloadAsync and report asset fetch statuses with appropriate uncertainty. Never invent substitute Roblox asset IDs.
