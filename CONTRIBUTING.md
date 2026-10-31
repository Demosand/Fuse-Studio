# Contributing

Propose updates as a focused pull request. Every new `knowledge/<area>/<topic>.md` entry needs frontmatter `title`, `tags`, and `area`; describe **realistic Roblox APIs** and mark untested assumptions. Avoid copy-pasting incompatible upstream material or stale code examples. Keep new knowledge concise, actionable and auditable; cite the official Roblox API reference where dynamic behavior is important.

Run `npm test && npm run check` (no npm install needed). When changing the plugin contract, also run `claude plugin validate .` on a machine with Claude Code installed. Increment the version when shipping; update the changelog. Keep license/third-party notices for any adapted material. No telemetry or mandatory non-local services.
