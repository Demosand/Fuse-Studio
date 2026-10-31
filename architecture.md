# Kira Studio architecture

```text
Claude Code
  └─ plugin kira-studio
       ├─ skills/kira-studio       auto-invoked for Roblox questions
       ├─ skills/{build,ui,vfx,review,optimize,plan}  user invoked
       └─ local MCP server (node, stdio)
            ├─ search_knowledge(query) -> best topic + excerpts
            └─ read_knowledge(id) -> exact file (capped)
                 ↳ knowledge/{engineering,gameplay,presentation,operations}/**.md
                 ↳ workflows/*.md
```

The MCP server contains no outbound network calls and reads only bundled knowledge. It does **not** connect to the Roblox Studio editor. A separate Studio MCP bridge, or source repository, supplies edit/playtest capability. The skill router always prioritizes existing project conventions, selective reads, and measured performance. Invocation and reference budgets are heuristics, not guaranteed token limits.
