# Security and privacy

Fuse Studio executes a local Node.js stdio process when Claude loads the configured MCP server. It reads local Markdown files from its own bundled `knowledge/` and `workflows/` directories. It has no networking code, does not automatically share lessons, does not execute project code, and does not read personal files. MCP requests must specify an exact known id for document reading. The project has no installation-time hooks or dependency install scripts.

**Trust boundaries:** Claude Code and any installed Studio bridge may have their own data access and network behavior; Fuse Studio does not control these. The text of the files it reads is passed to the language model as normal tool output, so read your model provider's data policy for that separate processing.

Please report security issues through GitHub Security Advisories (if enabled) or a private maintainer channel. Do not paste sensitive project tokens, credentials or Roblox cookies into issues.
