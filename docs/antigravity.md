# Fuse Studio for Google Antigravity

Fuse Studio runs as a **native Antigravity plugin** alongside the existing Claude Code plugin. No conversion, individual skill copying, extra API keys, or npm install is needed.

## Option A — easiest, Antigravity CLI (`agy` available)

```powershell
agy plugin install https://github.com/Demosand/Fuse-Studio
agy plugin list
```

The command installs the plugin globally, including all 23 skills, 3 subagents and the local, read-only knowledge MCP. Node.js **18+** is required for MCP search; the skill instructions work even if Node is missing. In Antigravity, use `/fuse-studio`, `/stud-ui`, `/ui`, `/ui-styles`, `/combat`, `/vfx`, etc., or simply ask a Roblox question. The Antigravity slash syntax is `/<skill-name>` rather than Claude Code's `/fuse-studio:<skill-name>`.

Test the packaging if you have the CLI:

```powershell
agy plugin validate --strict https://github.com/Demosand/Fuse-Studio
```

If your CLI validates local directories only, clone the repository and use `agy plugin validate --strict .` from its root.

## Option B — Antigravity standalone IDE on Windows (without `agy`)

Run this **in PowerShell** (Git must be installed):

```powershell
New-Item -ItemType Directory -Force "$HOME\.gemini\config\plugins" | Out-Null; git clone https://github.com/Demosand/Fuse-Studio.git "$HOME\.gemini\config\plugins\fuse-studio"
```

Open Antigravity and visit **Customizations → Installed**; find Fuse Studio. The plugin is global for all projects. If the folder already exists, update rather than clone:

```powershell
git -C "$HOME\.gemini\config\plugins\fuse-studio" pull --ff-only
```

If Git is not installed, download the GitHub ZIP, extract it as `fuse-studio` into `%USERPROFILE%\.gemini\config\plugins\` (make sure `.antigravity-plugin/plugin.json` is directly inside that folder). Avoid nested `Fuse-Studio-main/fuse-studio` folders.

## Option C — just one workspace

Place the repository in `<workspace>/.agents/plugins/fuse-studio/` (the manifest still lives in `.antigravity-plugin/plugin.json`). This activates it only for that workspace. Do **not** copy only `skills/`: the knowledge files and MCP live in other folders. This works on macOS and Linux too.

## What is included

- 23 task skills (`skills/*/SKILL.md`), loaded only when needed. `/fuse-studio` is the general Roblox entry; `/stud-ui` selects the bundled Stud UI kit without another style question.
- Three optional custom agents in `agents/` (visual review, network security, profiling).
- Read-only local `fuse-studio-knowledge` MCP server loaded from `mcp_config.json`. `${PLUGIN_ROOT}` is resolved by Antigravity; it is deliberately **not** `${CLAUDE_PLUGIN_ROOT}`.
- Original MIT Stud UI modules and references under `vendor/stud-ui/`; attribution retained.

## How to verify

Ask: `Use Fuse Studio to find a relevant reference about Roblox RemoteEvent security.` It should discover `search_knowledge` and `read_knowledge`. If only the instructions work, check `node --version` and the plugin's MCP status in **Customizations → Installed → MCP**. A separate Roblox Studio MCP bridge is needed for direct live Studio editing; Fuse Studio alone cannot control Roblox Studio.

## Updating and compatibility

Use `agy plugin list` to check installation. For manually cloned installs, `git pull --ff-only` updates the global directory. Claude Code remains supported independently via `/plugin marketplace add Demosand/Fuse-Studio` and `/plugin install fuse-studio@fuse-studio`. Do not install Fuse twice through multiple mechanisms into the same Antigravity profile.

**Privacy:** the built-in MCP reads local Markdown only; no network access, API keys, or automatic lesson sharing. Installation from GitHub requires network access to GitHub, but using the installed plugin does not.
