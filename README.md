# Kira Studio

**One unified, privacy-first, token-aware Roblox Studio development plugin for Claude Code.**

Kira Studio combines the engineering/system-design strengths of [ro-engineer](https://github.com/excaldev/ro-engineer) with the wide creative and Studio knowledge coverage of [roblox-brain](https://github.com/AkitoDevs/roblox-brain), then adds cross-domain workflows, explicit invocations, local knowledge search, low-end mobile quality guidance, testing and multiplayer security checks.

> This is an independent, original integration inspired by both projects, **not a verbatim copy of their entire knowledge libraries**. Both projects are MIT-licensed; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Not affiliated with Roblox or Anthropic.

## Install in Claude Code (after publishing this folder as `YOUR_USERNAME/kira-studio` on GitHub)

```text
/plugin marketplace add YOUR_USERNAME/kira-studio
/plugin install kira-studio@kira-studio
```

Replace `YOUR_USERNAME` with the actual GitHub username or organization. Restart Claude Code or run `/reload-plugins` if supported. Open `/plugin` to manage installation/update.

**CLI alternative:**

```bash
claude plugin marketplace add YOUR_USERNAME/kira-studio
claude plugin install kira-studio@kira-studio
```

### Available commands

| Command | Task |
|---|---|
| `/kira-studio:kira-studio ...` | All-purpose Roblox engineering skill (also auto-invoked when relevant) |
| `/kira-studio:build ...` | Build or repair features |
| `/kira-studio:ui ...` | Design and build UI |
| `/kira-studio:vfx ...` | Particles, VFX, animation, camera, audio |
| `/kira-studio:review ...` | Security/code review |
| `/kira-studio:optimize ...` | Performance investigation |
| `/kira-studio:plan ...` | Feature/system plan |

These are **plugin-prefixed skill commands**, not separate plugins. The six specialized skills are user-only to avoid unnecessary always-on context. The main skill auto-triggers only when relevant. All content works offline.

**Examples:**

```text
/kira-studio:build Add a server-authoritative melee system to my existing game
/kira-studio:ui Build a responsive inventory with satisfying animated transitions
/kira-studio:vfx Make a stylized sword impact with mobile quality tiers
/kira-studio:review Check my shop Remotes for exploits and receipt duplicate-grants
/kira-studio:optimize Diagnose client stutter when 40 players shoot
```

## What is inside

- Strict Luau, typed interfaces, pragmatic module/composition/OOP/ECS selection.
- Secure remotes, client/server ownership, interpolation, prediction, lag compensation, and reliable hit checks.
- Safe DataStore patterns, lifecycle cleanup, performance and tests.
- Gameplay, combat, NPCs, physics, round loops, progression and monetization.
- Responsive UI, motion design, VFX, audio, lighting, art, modeling and accessibility.
- Release and audit procedures, clear templates and optional Roblox Studio MCP integration.

## Token economy & privacy

The plugin **never uploads files, logs, lessons or telemetry to a third party**. Its optional MCP server performs local searches against `knowledge/*.md`. It uses Node.js **18+**, built-in modules only, no `npm install`. Both knowledge tools are local, read-only, and capped in output. No hooks, model downloads or code execution from unknown sources.

Simple tasks can skip knowledge search; unfamiliar/specialist tasks search once then load targeted entries. Use `/context` in Claude Code to inspect your own consumption. No fixed percent savings are promised. The server's always-on tool definitions still have a small token cost. To disable just local searching, remove or rename `.mcp.json` before installation; the Markdown files remain usable.

## Roblox Studio connectivity

Kira Studio is a **knowledge and workflow plugin**, not a standalone Studio bridge. For live read/edit/playtest, connect a supported Roblox Studio MCP bridge separately; Kira Studio discovers and uses available tools. If none is installed, it gives source code and precise placement steps. Rojo-based repository workflows are also supported.

## Developer validation

```bash
node --version    # Node 18+
npm test          # Offline, no dependencies
npm run check     # Validate manifests / reference paths
claude plugin validate .  # Authoritative validation if Claude Code CLI installed
```

## Publishing your own copy

1. Create a public GitHub repository named `kira-studio`.
2. Upload **the contents of this folder to the repository root** (not a folder within it). Include hidden directory `.claude-plugin` and `.mcp.json`.
3. Keep `LICENSE` and `THIRD_PARTY_NOTICES.md`.
4. Run `/plugin marketplace add YOUR_USERNAME/kira-studio`, then `/plugin install kira-studio@kira-studio`.
5. Increment `.claude-plugin/plugin.json` version for releases; users can update the marketplace and plugin through `/plugin`.

If you clone locally: `claude --plugin-dir ./kira-studio` can load it for development without publishing.

## Provenance and maintenance

This v1 is independently reorganized and condensed (not an exhaustive mirror of either upstream). **No auto-update from upstream**: documentation is reviewed deliberately. Some Roblox APIs and platform rules evolve; verify against [Roblox Creator Hub](https://create.roblox.com/docs) before shipping. Upstream concepts and full MIT notices: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

MIT © 2026 Kira Studio Contributors.
