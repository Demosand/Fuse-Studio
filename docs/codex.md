# Fuse Studio for OpenAI Codex — v2.3.1

Fuse Studio includes an official-style Codex plugin package. The same **23 skills**, Roblox/Luau references, MIT-licensed Stud UI component kit, and local no-telemetry MCP server work across Codex CLI and supported Codex desktop installations. The existing Claude Code and Antigravity integrations remain unchanged.

## Codex desktop app without CLI

You **do not need** a `codex` executable, Codex CLI, Git, or an administrator account to register this marketplace. The desktop app loads personal marketplace configuration from `%USERPROFILE%\.agents\plugins\marketplace.json`.

**Windows steps:**
1. Download [Fuse Studio ZIP from GitHub](https://github.com/Demosand/Fuse-Studio/archive/refs/heads/main.zip) and unzip it.
2. Double-click `scripts\install-codex-app.cmd` inside the extracted directory. It invokes its adjacent `install-codex-app.ps1`.
3. The installer creates or merges the personal marketplace entry. It **backs up an existing configuration** and preserves unrelated plugin entries. It writes no binaries, executes no remote code, and doesn't require admin privileges.
4. Restart Codex, open **Plugins Directory**, choose **Personal Plugins** (or your previous personal marketplace name), open **Fuse Studio**, and select **Install**.
5. Start a new Codex conversation. Ask `Use Fuse Studio to review my Luau RemoteEvents`. For local MCP search, install Node.js 18+.

The personal marketplace entry points to `https://github.com/Demosand/Fuse-Studio.git` with `source: url`. The desktop app fetches the plugin itself after you select Install; Fuse Studio is **not** automatically installed solely by adding the marketplace.

**If the plugin is not visible:** confirm you're using a Codex app version with local plugin marketplaces, restart the desktop app, inspect `%USERPROFILE%\.agents\plugins\marketplace.json` for the Fuse Studio entry, and look under your personal marketplace rather than the universal public directory. If you already have a personal marketplace, its existing display name is preserved.

**Manual fallback without a script:** copy the repository's [marketplace.json](https://github.com/Demosand/Fuse-Studio/blob/main/.agents/plugins/marketplace.json) into `%USERPROFILE%\.agents\plugins\marketplace.json`, **only if that file does not already exist** (otherwise merge its single plugin entry to avoid deleting other marketplaces). Restart Codex and install from Plugins Directory.

## Install from GitHub using Codex CLI

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
