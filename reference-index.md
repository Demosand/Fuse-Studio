# Offline reference index

Kira Studio works without its local MCP knowledge server. Open **only** the relevant file under `knowledge/` by exact id; avoid loading everything at once.

## Engineering

`knowledge/engineering/architecture`, `project-structure`, `luau`, `network-security`, `network-bandwidth`, `replication`, `movement-security`, `cross-server`, `data-persistence`, `lifecycle`, `performance`, `testing`, `engine-gotchas`, `security-free-assets`.

## Gameplay

`knowledge/gameplay/combat`, `npc-ai`, `physics`, `abilities-rounds`, `loops-economy`, `weapons-tools`, `building-placements`.

## Presentation

`knowledge/presentation/ui-design`, `ui-motion`, `ui-patterns`, `ui-viewportframes`, `vfx`, `vfx-slashes`, `vfx-quality`, `camera-animation`, `animation-rigging`, `lighting`, `art-building`, `art-import`, `audio`, `accessibility`.

## Operations

`knowledge/operations/monetization`, `release`, `studio-workflow`, `leaderboards`.

## Workflows

`workflows/plan`, `implement`, `audit`, `polish`, `performance`, `release`.

Complete ids contain the prefix shown on the first entry in each section: e.g. `knowledge/engineering/network-bandwidth` maps to `knowledge/engineering/network-bandwidth.md`. The local MCP search handles ids without reading files manually.
