# Verification and limits

## Verified locally

- `npm test`: Node unit and MCP stdio protocol checks, privacy guard and content/routing coverage.
- `npm run check`: JSON manifests, plugin structure, files and path consistency.
- `npm run benchmark`: fixed local search relevance cases.
- ZIP archive integrity checked with Python `zipfile.testzip()`.

## NOT verified in this environment

- `claude plugin validate` (Claude Code CLI is not installed here).
- Actual installation on user's Claude Code build and `/plugin` UI.
- Live code execution, visual rendering, input behavior or performance in Roblox Studio.
- Measured superiority vs ro-engineer / roblox-brain on equivalent coding projects.

Reference snippets and Luau examples must be checked with Studio Script Analysis and playtested. Search relevance and file quantity do not prove generated code quality. Use the benchmark methodology documents for real comparisons.

## Official references (checked 2026-10-31)

- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/plugin-marketplaces
- https://create.roblox.com/docs/ui/size-modifiers
- https://create.roblox.com/docs/ui/animation
- https://create.roblox.com/docs/production/publishing/accessibility
- https://create.roblox.com/docs/performance-optimization/improve
- https://create.roblox.com/docs/performance-optimization/microprofiler/use-microprofiler

Dynamic Roblox APIs and policies should always be rechecked against Creator Hub.
