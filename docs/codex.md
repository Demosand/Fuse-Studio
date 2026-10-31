# Fuse Studio for OpenAI Codex — v2.3

Fuse Studio includes an official-style Codex plugin package. The same **23 skills**, Roblox/Luau references, MIT-licensed Stud UI component kit, and local no-telemetry MCP server work across Codex CLI and supported Codex desktop installations. The existing Claude Code and Antigravity integrations remain unchanged.

## Install from GitHub (recommended)

In a terminal with a current Codex CLI:

```powershell
codex plugin marketplace add Demosand/Fuse-Studio
codex plugin add fuse-studio@fuse-studio
```

List your installed plugin to confirm:

```powershell
codex plugin list
```

Restart the Codex session if the new skills do not appear. In compatible desktop Codex UI, open the plugin marketplace and add the same GitHub repository as a custom source, then install Fuse Studio.

## Use

Open your Roblox game source/project with Codex. Type `/skills` or mention a skill, for example:

- `$fuse-studio` — general Roblox architecture and Luau implementation.
- `$ui` — polished GUI; asks which style to use only if not already chosen.
- `$stud-ui` — forces the original Stud UI kit, no style question.
- `$combat` — server-safe combat and hit registration.
- `$vfx` — visual effects with mobile performance budgets.
- `$optimize` — diagnose CPU/GPU and memory issues.

Skill availability and mention display can vary with the Codex UI version. Simply describe the Roblox task if the skill mention is not shown; Codex may match it to skill descriptions.

## Knowledge MCP

The Codex plugin uses **`mcp.json`** (portable) and **`.codex-mcp.json`** (legacy compatibility), with a read-only Node.js stdio server:

```json
{
  "command": "node",
  "args": ["server/index.mjs"],
  "cwd": "."
}
```

Codex resolves `cwd: "."` relative to the installed plugin root. This avoids relying on unsupported `CLAUDE_PLUGIN_ROOT` placeholders. Node.js **18+** must be on the PATH for `search_knowledge` and `read_knowledge`. The skills remain useful without the server, but targeted references must then be read from the package directly.

The MCP server reads included Markdown only. It does not make network requests, edit projects, launch Roblox Studio, or share lessons. Direct editing inside Roblox Studio requires a separate Studio MCP bridge. Repository code editing requires the normal Codex permissions.

## Update

```powershell
codex plugin marketplace upgrade fuse-studio
```

If your Codex version does not refresh the installed copy automatically, remove and reinstall the plugin:

```powershell
codex plugin remove fuse-studio@fuse-studio
codex plugin add fuse-studio@fuse-studio
```

## File layout

- `plugin.json` — portable OpenAI/Agent Plugins manifest.
- `mcp.json` — portable Codex MCP configuration using plugin-relative `cwd`.
- `.codex-plugin/plugin.json` — backwards-compatible Codex manifest.
- `.codex-mcp.json` — Codex compatibility MCP config.
- `.agents/plugins/marketplace.json` — GitHub marketplace source entry.
- `skills/*/SKILL.md` — the same 23 on-demand skills used by other clients.
- `knowledge/`, `workflows/`, `vendor/stud-ui/` — shared references and source kit.

Codex plugin packaging follows the current [OpenAI plugin guidance](https://developers.openai.com/plugins/build/plugins). Installation is a local Codex operation, not automatic publication to the universal plugin directory.

## Alternative: standalone skill installation

For older Codex builds without plugin marketplace support, install the single `fuse-studio` skill using the built-in `$skill-installer` and this folder:

`https://github.com/Demosand/Fuse-Studio/tree/main/skills/fuse-studio`

**Limitation:** installing only this folder is NOT equivalent to the full plugin. It omits the bundled MCP config, other specialized skills and root-level references. Prefer the native plugin installation above.
