# Fuse Studio — Stud UI integration

Stud UI is **opt-in**, not applied to every Roblox interface. If a brand-new UI lacks a selected art direction, Fuse asks once; if style is already chosen or existing project screens establish it, Fuse follows it. /fuse-studio:stud-ui selects Stud immediately.

The **complete source-code kit** (excluding large screenshots) from the MIT-licensed TemporaryLooker22/Stud-UI-Clean-Roblox is bundled under vendor/stud-ui: StudUI.luau, StudMotion.luau, CheckUIIcons.luau, 1022-icon catalog, exact design tokens and component/layout docs, QA checklist and six builder/controller examples. The original MIT license, copyright and separate icon notices are included.

To set up Roblox Studio: install these three modules in ReplicatedStorage once; inspect vendor/stud-ui/examples for a matching screen and run builder in Edit mode; add a client LocalScript for interactive motion. A compatible external Studio MCP is needed for direct editing or screenshots. Custom image uploads may require permitted replacement assets. The gallery remains upstream, without duplicating its screenshot images: https://github.com/TemporaryLooker22/Stud-UI-Clean-Roblox/tree/main/assets/screenshots

For lowest token cost, use knowledge/ui-expert/stud-ui-design before selectively reading vendor/stud-ui/reference files; never inject the full 1022-icon catalog into prompt by default.