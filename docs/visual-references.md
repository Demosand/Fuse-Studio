# Fuse Studio 2.5 — full roblox-ai visual-reference search

## What is included
A complete, **offline-searchable metadata index** of [izzyfrm/roblox-ai](https://github.com/izzyfrm/roblox-ai) at pinned GitHub commit `e45dd095f4c58350f4826f529fd79b8fac435ece`. This snapshot contains **11,968 images, 5 videos, 213 Markdown descriptions**, 12,186 paths in total, in 13 text indexes under `catalog/roblox-ai/paths/`. **Image/video bytes and third-party article text are not bundled.** The 213 markdown files in the source primarily describe image collections; official Roblox documentation should be consulted at https://create.roblox.com/docs for current instructions.

### Why not copy all 12k files?
Upstream README explicitly states mixed copyright/permissions. Real Roblox game images, third-party icons and many screenshots **aren't licensed for commercial/game reuse or redistribution**. The lightweight index contains *only filenames and links* at an immutable upstream commit. Refer to original license notices when using CC0 Kenney contact sheets or CC BY Roblox Creator Docs screenshots. A screenshot is visual inspiration, not a published Roblox asset ID.

## In Claude Code, Codex or Antigravity

Invoke `/visual-refs` (Antigravity), `/fuse-studio:visual-refs` (Claude), or `$visual-refs` (Codex), or ask:

> Find 3 stud-style shop/inventory references in the Fuse visual catalog, actually view them if your tools support images, and make my own Stud UI using StudUISafe, without unverified Roblox asset IDs.

The Fuse MCP now offers four **read-only, local** tools:
- `search_knowledge(query,area)` — textual Luau/GUI design docs
- `read_knowledge(id,part)` — fetch a targeted reference chunk
- **`list_visual_categories()`** — file counts/categories/license warning
- **`search_visual_references(query, section, kind, limit, offset)`** — path/URL results only; images never downloaded or inspected by this tool.

Valid `section` options: `all`, `stud`, `ui`, `game`, `docs`, `vfx`, `animation`, `icon`, `style`, `other`. Valid `kind`: `all`, `image`, `video`, `document`. Limit 1–12 links per query. Use `offset` to page through all files.

Example English searches (English keywords usually best for filenames): `stud shop`, `inventory`, `horror user interface`, `sword impact`, `tutorial`, `gamepad`, `glass dashboard`, `pixel game`, `vfx`. Russian common terms have basic aliases.

## Retrieval policy for AI
1. Check existing project style, provided reference, visual requirements and device targets. If not specified for a NEW GUI, ask **once** (Stud, simulator, glass, minimal, sci-fi, etc.). Preserve style for other screens.
2. When visual examples matter, call `search_visual_references` **once**, with precise English query, area and limit 3–5. Do not dump all 12k into tokens.
3. Actually use a visual-capable tool to inspect 1–3 linked images. **Without viewing them, don't invent color/layout facts from filenames**; describe names as reference leads. The MCP only returns paths/links.
4. Extract reusable layout, color system, interaction principles, readability and composition; **implement original Roblox GUI** with native Frames/UIStroke/UIGradient or appropriately uploaded originals/CC0 assets.
5. On Stud tasks use `StudUISafe`, `StudIconsSafe` and `StudNativeIcons` with the upstream StudUI kit. Run opt-in image availability audit if Roblox Studio tools exist. Never hallucinate an `rbxassetid`.
6. For Roblox APIs use **current official Creator Hub text docs**; source image screenshots are not automatically current.
7. Report what images were viewed versus only linked. Don't claim rights or source asset availability without verification.

## Local use and maintenance

Search by Node.js without installing any dependencies:

```powershell
npm run refs:stats
npm run refs:search -- stud shop --section=stud
npm run refs:search -- optimization --section=docs
```

To update the index to a newer upstream snapshot (requires GitHub network access, fetches **metadata only**):

```powershell
npm run refs:update
npm test
npm run check
```

No updater runs automatically; a maintainer chooses when to refresh and commits changes. Keep the new `source_commit` in the manifest for reproducible deep links.
