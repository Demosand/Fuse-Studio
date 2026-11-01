# Fuse Studio v2.5 — Roblox Studio toolkit for Claude Code, Google Antigravity & OpenAI Codex

**One local-first plugin for premium GUI, VFX, Lua(u) engineering, game design, secure multiplayer and Roblox Studio workflows.**

> Independent plugin inspired by the MIT-licensed [ro-engineer](https://github.com/excaldev/ro-engineer) and [roblox-brain](https://github.com/AkitoDevs/roblox-brain), substantially extended with original specialist guides and workflows. Not an official upstream fork, endorsement or complete verbatim mirror. See [third-party notices](THIRD_PARTY_NOTICES.md).

## OpenAI Codex installation (2.3.1)

**Codex desktop app only (NO CLI / NO Git required):** Download the repository ZIP from [GitHub](https://github.com/Demosand/Fuse-Studio/archive/refs/heads/main.zip), extract it, and double-click `scripts/install-codex-app.cmd`. This safely merges Fuse Studio into your existing personal marketplace without deleting other plugins (it backs up the JSON). Restart Codex, open **Plugins Directory**, select **Personal Plugins** (or your existing personal marketplace name), and click **Install** on Fuse Studio. Codex downloads the plugin from GitHub at installation time. This requires a Codex desktop version with local marketplace support. See [the app-only Codex guide](docs/codex.md#codex-desktop-app-without-cli).

**Full native plugin**, including all 25 skills, Stud UI, curated references and a local, read-only knowledge/visual MCP. In a terminal with the current Codex CLI:

```powershell
codex plugin marketplace add Demosand/Fuse-Studio
codex plugin add fuse-studio@fuse-studio
codex plugin list
```

Restart your Codex session if needed. Use `/skills` or mention a skill such as `$fuse-studio`, `$ui`, `$stud-ui`, `$combat`, `$vfx` or `$optimize` in Codex. **Node.js 18+** is needed for local knowledge search; basic skill guidance works without it. Codex CLI and compatible desktop clients can use repo marketplaces; installation is not an official Plugin Directory listing.

The package uses portable `plugin.json` + `mcp.json`, plus a compatibility fallback in `.codex-plugin/`. Codex's MCP uses plugin-relative `cwd: "."` rather than Claude's `CLAUDE_PLUGIN_ROOT`. See [Codex installation and troubleshooting](docs/codex.md).

## Google Antigravity installation (2.2)

**Native plugin support:** installs all 25 skills, 3 expert agents and the local read-only knowledge MCP using Antigravity's own plugin system. No conversion or manual copying of individual skills.

**Antigravity CLI (single command):**

```sh
agy plugin install https://github.com/Demosand/Fuse-Studio
agy plugin list
```

**Antigravity IDE on Windows without `agy`:** run in PowerShell (Git required):

```powershell
New-Item -ItemType Directory -Force "$HOME\.gemini\config\plugins" | Out-Null; git clone https://github.com/Demosand/Fuse-Studio.git "$HOME\.gemini\config\plugins\fuse-studio"
```

Then open **Customizations → Installed** to find Fuse Studio. For Windows IDE updates, use `git -C "$HOME\.gemini\config\plugins\fuse-studio" pull --ff-only`. Skills invoke as `/fuse-studio`, `/stud-ui`, `/ui`, `/combat`, etc. in Antigravity (not Claude Code's `/fuse-studio:ui` syntax). Node.js 18+ is needed for local MCP search. More options and troubleshooting: **[Antigravity guide](docs/antigravity.md)**.

The provider manifests remain independent: Antigravity uses `.antigravity-plugin/plugin.json` and `mcp_config.json`, Claude Code uses `.claude-plugin/` and `.mcp.json`, and Codex uses the root `plugin.json` and `mcp.json`. All share knowledge and Luau code.

## Claude Code installation

Publish these files at the **root** of a public GitHub repository named `fuse-studio`. Keep hidden `.claude-plugin/` and `.mcp.json` files. In Claude Code:

```text
/plugin marketplace add Demosand/Fuse-Studio
/plugin install fuse-studio@fuse-studio
```

Restart Claude Code or reload plugins. Requires Node.js **18+** for the optional local MCP knowledge search; no `npm install`, paid API or third-party telemetry.

**CLI:**

```sh
claude plugin marketplace add Demosand/Fuse-Studio
claude plugin install fuse-studio@fuse-studio
```

**Update:**

```sh
claude plugin marketplace update fuse-studio
claude plugin update fuse-studio@fuse-studio
```

**Local development:** use `claude --plugin-dir ./fuse-studio` and, if installed, `claude plugin validate ./fuse-studio`. No files are uploaded automatically by this package.

## What is included

- **25 named skills/commands** (one default router; 24 explicitly invoked specialists).
- **87 curated articles + 6 workflows** = **93 searchable references** (see [index](reference-index.md)).
- **3 optional expert agents**: UI critic, network security reviewer, performance profiler.
- **8 templates** and **5 Luau examples** (note: examples require integration/Studio testing).
- **Local MCP** `search_knowledge` and `read_knowledge` (English/Russian, topical filtering, chunked reads), no HTTP or telemetry.
- **Automated validation** and local knowledge routing regression cases. Quality of generated games still requires Studio evaluation.

### Most useful commands

| Command | What it does |
|---|---|
| `/fuse-studio:ui` | Visual art direction, polished GUI, responsive layouts, state lifecycle |
| `/fuse-studio:ui-motion` | Fancy but robust animations, tweens, reduced motion |
| `/fuse-studio:gui-audit` | 40-point interface scorecard and prioritized improvements |
| `/fuse-studio:vfx` | Impact effects, particles, trails, lighting, camera, mobile tiers |
| `/fuse-studio:combat` | Shooting, melee, hit detection, lag compensation, anti-cheat |
| `/fuse-studio:build` | Feature implementation in strict Luau |
| `/fuse-studio:network` | Network authority, reliability, snapshots, prediction |
| `/fuse-studio:data` | DataStores, migrations, sessions, purchase correctness |
| `/fuse-studio:npc` | NPC behaviors, perception, pathfinding |
| `/fuse-studio:studio` | Safe live editing/playtesting if an external Studio MCP is available |
| `/fuse-studio:review` | Security and performance code audit |
| `/fuse-studio:optimize` | CPU/GPU/replication/GC profiling workflow |
| `/fuse-studio:benchmark` | Structured tests; prevents unproven performance claims |

Other named skills: `animate`, `economy`, `fuse-studio`, `lighting`, `plan`, `publish`, `security`, `world`.

Example prompts:

```text
/fuse-studio:ui Create a cinematic sci-fi inventory GUI with mobile layout and controller support
/fuse-studio:ui-motion Make the shop open/close like a polished console game, never break under rapid clicks
/fuse-studio:combat Improve hit registration with server-side validation at high ping
/fuse-studio:vfx Design a readable electric sword finisher with low-end mobile fallback
/fuse-studio:review Audit every currency-awarding remote for exploits and duplicate grants
```

Claude can also automatically use the core `fuse-studio` skill for Roblox tasks. The other commands are opt-in to minimize accidental heavy workflows. Specialized knowledge is loaded only when needed.

## Why the unified design matters

1. **Engineer first:** inspect existing code, avoid unnecessary rewrites; strict types, server authority, safe remotes, lifecycle and current Roblox APIs.
2. **Design director:** unique visual language, hierarchy, deliberate motion, full input/mobile support, reduced-motion accessibility, premium effects with performance budgets.
3. **Release rigor:** tests, failure modes, screenshots and performance evidence; no unverified 'I tested it' claims.
4. **Privacy and token care:** local read-only Node MCP; no external endpoint and no automatic lesson sharing; search once on complex tasks, small results; read long files in chunks.
5. **No fake tooling:** a skill alone cannot control Roblox Studio. Install a compatible Studio MCP bridge separately for actual live edits/playtesting; otherwise Claude provides code, exact placement and manual verification.

### Privacy and dependencies

No third-party API keys or npm packages required. MCP is launched locally via `node` and reads Markdown from this repo. It doesn't execute Luau or modify project files. Agents are optional and are not automatically required for every task. Use `/context` in Claude Code to measure real token consumption; there is no claimed guaranteed percentage savings.

## Test before publishing

```sh
node --version
npm test
npm run check
npm run benchmark
claude plugin validate .  # only if Claude Code CLI is installed
```

The local search benchmark verifies **reference relevance**, not whether Claude produces a superior game. Do not confuse pass rates with a head-to-head comparison of other plugins. See [evaluation methodology](knowledge/tools/benchmark-methodology.md) and [verification](docs/verification.md).

## Source and rights

Copyright 2026 Fuse Studio Contributors. MIT license. Original projects and their MIT notices are credited in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The new documentation is an original synthesis and expansion, not a complete mirror; review upstream changes and Roblox API deprecations periodically. Neither Roblox Corporation nor Anthropic sponsors this project.

## GUI style selection and bundled Stud UI (2.1)

For a new GUI with no style or reference, Fuse Studio asks the developer **once**: Stud, Premium Simulator, Modern Minimal, Glass/Aurora, Sci-Fi, Tactical HUD, Retro Pixel, Cartoon, Fantasy or custom style? If style already exists, no repeat questions. Minor fixes skip the choice.

- `/fuse-studio:ui-styles`: choose art direction.
- `/fuse-studio:stud-ui`: use Stud immediately.
- `/fuse-studio:ui`: use existing style, or ask once if undecided.

Included **real MIT Stud UI Clean Roblox** source by TemporaryLooker22 in `vendor/stud-ui`: StudUI, StudMotion, 1022 icon registry, exact tokens, layouts, 6 builder/controller examples and licenses. Screenshot gallery remains upstream at https://github.com/TemporaryLooker22/Stud-UI-Clean-Roblox. See [Stud integration](docs/stud-ui-integration.md).

**Official repository:** [Demosand/Fuse-Studio](https://github.com/Demosand/Fuse-Studio). Install with `/plugin marketplace add Demosand/Fuse-Studio` followed by `/plugin install fuse-studio@fuse-studio`.

## Fuse Studio 2.4 — roblox-ai references and safer Stud UI assets

The external [izzyfrm/roblox-ai](https://github.com/izzyfrm/roblox-ai) project is **a visual inspiration library, not a coding skill**: it reports 11,968 images and 5 videos, without a general repo-wide media license. Fuse Studio now links to its original Stud UI mockups, 25 style families, icon examples, Kenney CC0 contact sheets, screenshots, animation and VFX galleries through [curated reference guidance](knowledge/visual-references/roblox-ai-guide.md). The images are **NOT copied into Fuse** and do not supply usable Roblox asset IDs. Reuse of copyrighted art is never implied.

**19 community-reported broken Stud assets:** source mapping and no-image replacement strategies are provided in [the audit guide](docs/stud-asset-audit.md). We have not independently verified whether Roblox deleted these IDs; failure can mean permissions. New optional modules in `vendor/stud-ui/src/` are `StudAssetGuard.luau`, `StudUISafe.luau` and `StudIconsSafe.luau`. Together with the original Stud modules, they can replace suspect stud textures with native GUI details, shop headers with gradients, rarity panels with gradients and missing Robux coin with text. Some unavailable icons still need your approved uploads. Upstream MIT files remain unchanged.

New skills: **`/fuse-studio:visual-refs`** (find images by style, link-only) and **`/fuse-studio:asset-audit`** (trace IDs, plan Studio verification and fallbacks). Use `npm run asset-audit` for a static source report; live checks require Roblox Studio and `ContentProvider:PreloadAsync`.

## 2.5: complete indexed roblox-ai references + native Stud replacement graphics

**All 12,186 source paths indexed locally:** 11,968 image refs, 5 video refs, 213 Markdown descriptions. The index stores filenames and **immutable GitHub source URLs**, NOT original images/video/document bodies (which have mixed ownership and licenses). See [visual reference search](docs/visual-references.md) and `catalog/roblox-ai/`. Our MCP offers `search_visual_references` and `list_visual_categories` in addition to `search_knowledge` and `read_knowledge`; these are local read-only tools. For fast use: `npm run refs:search -- stud shop --section=stud` and `npm run refs:stats`. For optional metadata refresh: `npm run refs:update` (manual and network-based, never auto-downloads media).

**Stud safe icons improved:** `vendor/stud-ui/src/StudNativeIcons.luau` draws an original native Roblox shop basket, Robux-style currency token, gamepad and neutral social indicator; banana has an emoji fallback (may need a user-provided icon). These complement the safe stud pattern, native shop header and rarity gradients. Use `StudUI`, `StudMotion`, `CheckUIIcons`, `StudUISafe`, `StudIconsSafe`, `StudAssetGuard`, `StudNativeIcons` ModuleScripts together and require the **Safe** entrypoints. Original MIT files remain unchanged. The 19 IDs are community-reported inaccessible, not confirmed globally deleted; in-Studio asset and rendering tests are still needed.

For Stud UI examples that formerly depended on failing image IDs, the Fuse native icon fallback module is now `StudNativeIcons.luau`. It draws basket, gamepad, currency and neutral social elements with built-in Roblox GUI. Use `StudUISafe` + `StudIconsSafe` rather than the original module entrypoints when creating new GUI. See [the asset audit guide](stud-asset-audit.md).
