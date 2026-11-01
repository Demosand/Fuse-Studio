# 2.5.0 — Complete roblox-ai reference index and procedural Stud icons

- Indexed all 12,186 source paths (11,968 images, 5 clips, 213 Markdown descriptions) at pinned upstream commit. Linked paths only; no restricted media bytes copied.
- Added local searchable visual reference catalog to Fuse MCP: search_visual_references and list_visual_categories. Supports keywords, Russian aliases, categories and pagination with small responses.
- Added local CLI search/stats and opt-in metadata-only index update script.
- Added original no-asset-ID native GUI graphics for Stud basket/shop, Robux-style token, gamepad and social indicator; emoji banana. Existing gradient/procedural fallbacks retained.
- Expanded UI, Stud, styles, VFX and world skill routing to retrieve selective external references, require actual visual inspection and respect copyright.
- Updated cross-client versions, README and test suite. Roblox Studio rendering/accessibility not yet playtested.

# 2.4.0 — roblox-ai visual reference links and safe Stud asset handling

- Added curated rights-aware links to izzyfrm/roblox-ai (25 art directions, Stud, GUI, VFX, icons); no copyrighted images copied.
- Traced all 19 user-reported problematic image IDs to original Stud source and documented safer alternatives.
- Added opt-in StudUISafe, StudIconsSafe and StudAssetGuard Lua modules; original MIT kit unchanged.
- Added /visual-refs and /asset-audit specialist skills, static ID scanner and regression tests.
- Did not claim external IDs were verified deleted or that replacement assets were confirmed working in Roblox Studio.

# 2.3.1 — Codex desktop app no-CLI installer

- Windows `.cmd` + PowerShell helper for personal GitHub marketplace registration without installing Codex CLI or Git.
- Preserves existing personal plugin entries and backs up existing configuration before writing.
- Codex desktop app installation documented separately from optional Codex CLI commands.

# 2.3.0 — OpenAI Codex support

- Portable Codex Agent Plugins manifest: `plugin.json`, `mcp.json`.
- Backwards-compatible `.codex-plugin/plugin.json` and separate plugin-relative MCP configuration.
- GitHub repository marketplace in `.agents/plugins/marketplace.json`.
- Two-command installation: `codex plugin marketplace add Demosand/Fuse-Studio` then `codex plugin add fuse-studio@fuse-studio`.
- Codex usage guide and cross-client consistency tests. Claude Code and Antigravity remain supported.

# 2.2.0 — Google Antigravity native support

- Native multi-provider plugin manifest in `.antigravity-plugin/plugin.json` with Antigravity starter prompts.
- Automatic local Node.js knowledge MCP via Antigravity `mcp_config.json` and `${PLUGIN_ROOT}`.
- Single-command GitHub install using `agy plugin install https://github.com/Demosand/Fuse-Studio`.
- Windows IDE global plugin installation instructions and detailed `docs/antigravity.md` guide.
- Cross-provider manifest and skill-discovery tests; Claude Code installation unchanged.

# 2.1.0 — Fuse Studio and Stud UI

- Rename plugin and MCP to fuse-studio; 23 specialist skills.
- Ask developer once for new GUI art direction if undecided (Stud, Minimal, Glass, Sci-Fi, Pixel, Cartoon, Fantasy and more).
- Bundle source modules StudUI, StudMotion, 1022 icons, docs and six examples, preserving MIT and third-party notices.
- Add /fuse-studio:stud-ui and /fuse-studio:ui-styles commands.
- GitHub repository slug must be renamed separately in repository Settings.

# Changelog

## 2.0.0 — 2026-10-31

- Created independent UI Expert library (art direction, responsive, theme tokens, motion, modal state machines, inventories, shop, HUD, toasts, gamepad/touch, 3D previews, performance, materials, localization, accessibility scorecards).
- Added VFX Expert layer for cinematic effects, mobile quality tiers, camera, beam/trail/flipbook, audio and lighting.
- Added network, security, data, profiling, parallelism, procedural worlds, NPC and combat guidance.
- Expanded to 21 user-facing skills and three optional review agents.
- Added English/Russian curated local knowledge search with area filters and chunked read, retaining no telemetry.
- Added Luau examples, templates, reference index and local search regression benchmark.
- Improved developer tests, publishing instructions and honest verification limitations.

## 1.0.0 — 2026-10-31

- Initial unified Roblox engineering/creative skills, knowledge library, offline search, workflows and MIT notices.
