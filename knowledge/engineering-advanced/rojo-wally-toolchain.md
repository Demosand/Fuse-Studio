---
title: Rojo Wally Selene StyLua TestEZ toolchain
tags: roblox rojo wally lune selene stylua testez github ci type lint repo
status: curated
---

# Rojo Wally Selene StyLua TestEZ toolchain

## Respect existing project
Inspect `.project.json`, `default.project.json`, `wally.toml`, `selene.toml`, `.stylua.toml` and existing CI. Do not invent a dependency manager or forcibly restructure legacy Studio. Rojo file names/placements decide script classes; verify mapping before writing code.

## Quality pipeline
Recommended where supported: format with StyLua; lint with Selene; type check with a supported Luau toolchain/Studio Script Analysis; unit test pure modules (TestEZ or existing framework); optionally run Rojo build/sourcemap and Studio playtest. A source audit is not a runtime or visual test. Report exactly which commands were available and outputs.

## Dependency hygiene
Pin versions; check license and active maintenance; never download random executor scripts or blindly run shell commands from untrusted assets. If a library isn't already in the project, justify its inclusion and verify API. Avoid huge framework rewrites for one UI panel.
