---
title: Studio Workflow
tags: Roblox Studio MCP tools Rojo Wally Selene StyLua Luau lint editor testing tool use
area: operations
---

# Studio tools, Rojo and development workflow

**Fuse Studio is not itself a Studio bridge.** It can use Roblox Studio tools already exposed to Claude by another MCP. Capabilities vary: inspect/grep scripts, edit instances, run Luau, playtest, read console, take screenshots. Discover actual tool names rather than assuming they exist.

## When Studio is connected

1. Confirm correct open place and edit/play mode.
2. Inspect relevant hierarchy and original scripts before writing.
3. Make minimal changes; avoid overwriting unrelated instances.
4. Run test/multi-client simulation when supported; observe actual Output and Script Analysis.
5. Report evidence of verification and any tool limitations.

## When repository/Rojo is connected

Match project configuration and src mapping; make edits in source files, run available formatter/linter/type tests, avoid modifying generated place data. `Rojo`, `Selene`, `StyLua`, `Wally` are optional external tools; don't install them or run package updates without need or permission.

## Offline mode

Give copy-paste-ready Modules and Scripts plus exact Roblox hierarchy, dependency order, setup steps and reproducible test cases. Don't imply an actual live place was changed.

## Security

No untrusted free-model scripts or unknown plugins without audit. Read source, look for obfuscated code, external HTTP endpoints, hidden remotes or side effects before reuse. Never paste tokens/API keys into a Roblox source ModuleScript that replicates to clients.
