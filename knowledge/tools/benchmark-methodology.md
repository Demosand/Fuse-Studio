---
title: Skill benchmark matrix and evidence
tags: benchmarks eval test tokens prompts scorecard comparative studies
status: curated
---

# Skill benchmark matrix and evidence

## Evaluation design
Compare baseline Claude, ro-engineer, roblox-brain, Kira Studio under same model, reasoning effort, context, project, MCP, resources and target task; use fresh sessions with random task order to mitigate contamination. Track output tokens/tool calls separately. Predeclare success tests.

## Task suite
1. Build secure shop with idempotent ProcessReceipt.
2. Implement 200-slot responsive inventory with modal focus and touch.
3. Make combat VFX for desktop/mobile and avoid server cosmetic replication.
4. Fix double listener leak after 20 respawns.
5. Implement ranged shots with anti-exploit and 180ms simulated ping.
6. Diagnose a measured server/network FPS bottleneck.
7. Build NPC chase that handles blocked path and player quit.
8. Build localized gamepad UI and reduced-motion support.

## Score
Correctness 35%, test pass 25%, user experience 15%, performance 10%, security 10%, tool/token efficiency 5%; for UI also conduct blinded screenshot critique. Do not assert superiority from reference count alone; publish both success cases and failures.
