# Kira Studio v2.0 — Roblox Studio super toolkit for Claude Code

**One local-first plugin for premium GUI, VFX, Lua(u) engineering, game design, secure multiplayer and Roblox Studio workflows.**

> Independent plugin inspired by the MIT-licensed [ro-engineer](https://github.com/excaldev/ro-engineer) and [roblox-brain](https://github.com/AkitoDevs/roblox-brain), substantially extended with original specialist guides and workflows. Not an official upstream fork, endorsement or complete verbatim mirror. See [third-party notices](THIRD_PARTY_NOTICES.md).

## Install from GitHub

Publish these files at the **root** of a public GitHub repository named `kira-studio`. Keep hidden `.claude-plugin/` and `.mcp.json` files. In Claude Code:

```text
/plugin marketplace add YOUR_GITHUB_USERNAME/kira-studio
/plugin install kira-studio@kira-studio
```

Replace `YOUR_GITHUB_USERNAME` with your real GitHub username. Restart Claude Code or reload plugins. Requires Node.js **18+** for the optional local MCP knowledge search; no `npm install`, paid API or third-party telemetry.

**CLI:**

```sh
claude plugin marketplace add YOUR_GITHUB_USERNAME/kira-studio
claude plugin install kira-studio@kira-studio
```

**Update:**

```sh
claude plugin marketplace update kira-studio
claude plugin update kira-studio@kira-studio
```

**Local development:** use `claude --plugin-dir ./kira-studio` and, if installed, `claude plugin validate ./kira-studio`. No files are uploaded automatically by this package.

## What is included

- **21 named skills/commands** (one default router; 20 explicitly invoked specialists).
- **82 curated articles + 6 workflows** = **88 searchable references** (see [index](reference-index.md)).
- **3 optional expert agents**: UI critic, network security reviewer, performance profiler.
- **8 templates** and **5 Luau examples** (note: examples require integration/Studio testing).
- **Local MCP** `search_knowledge` and `read_knowledge` (English/Russian, topical filtering, chunked reads), no HTTP or telemetry.
- **Automated validation** and local knowledge routing regression cases. Quality of generated games still requires Studio evaluation.

### Most useful commands

| Command | What it does |
|---|---|
| `/kira-studio:ui` | Visual art direction, polished GUI, responsive layouts, state lifecycle |
| `/kira-studio:ui-motion` | Fancy but robust animations, tweens, reduced motion |
| `/kira-studio:gui-audit` | 40-point interface scorecard and prioritized improvements |
| `/kira-studio:vfx` | Impact effects, particles, trails, lighting, camera, mobile tiers |
| `/kira-studio:combat` | Shooting, melee, hit detection, lag compensation, anti-cheat |
| `/kira-studio:build` | Feature implementation in strict Luau |
| `/kira-studio:network` | Network authority, reliability, snapshots, prediction |
| `/kira-studio:data` | DataStores, migrations, sessions, purchase correctness |
| `/kira-studio:npc` | NPC behaviors, perception, pathfinding |
| `/kira-studio:studio` | Safe live editing/playtesting if an external Studio MCP is available |
| `/kira-studio:review` | Security and performance code audit |
| `/kira-studio:optimize` | CPU/GPU/replication/GC profiling workflow |
| `/kira-studio:benchmark` | Structured tests; prevents unproven performance claims |

Other named skills: `animate`, `economy`, `kira-studio`, `lighting`, `plan`, `publish`, `security`, `world`.

Example prompts:

```text
/kira-studio:ui Create a cinematic sci-fi inventory GUI with mobile layout and controller support
/kira-studio:ui-motion Make the shop open/close like a polished console game, never break under rapid clicks
/kira-studio:combat Improve hit registration with server-side validation at high ping
/kira-studio:vfx Design a readable electric sword finisher with low-end mobile fallback
/kira-studio:review Audit every currency-awarding remote for exploits and duplicate grants
```

Claude can also automatically use the core `kira-studio` skill for Roblox tasks. The other commands are opt-in to minimize accidental heavy workflows. Specialized knowledge is loaded only when needed.

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

Copyright 2026 Kira Studio Contributors. MIT license. Original projects and their MIT notices are credited in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The new documentation is an original synthesis and expansion, not a complete mirror; review upstream changes and Roblox API deprecations periodically. Neither Roblox Corporation nor Anthropic sponsors this project.
