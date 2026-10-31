---
name: gui-audit
description: "Audit a Roblox GUI against a concrete quality rubric, including accessibility and performance"
disable-model-invocation: true
---

# Kira Studio / gui-audit

Task: $ARGUMENTS

Read `knowledge/ui-expert/interface-review-scorecard` and `knowledge/ui-expert/visual-direction`; inspect screens, layouts and scripts in the project. Score each of ten domains 0–4 with evidence or N/T. Report critical usability blockers first, then high-leverage visual revisions, state/race correctness and mobile/controller gaps. Don’t claim visual testing without screenshots or Studio.

Common protocol: inspect existing project context first; respect project's coding/style conventions; use targeted local knowledge search only if needed; make minimal coherent edits; verify using available tools; report changed paths and unverified behavior. Follow main Kira Studio server-authority, cleanup and performance standards.
