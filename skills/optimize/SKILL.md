---
name: optimize
description: "Profile and optimize Roblox scripts, networking, UI and rendering"
disable-model-invocation: true
---

Optimize $ARGUMENTS. Baseline first: MicroProfiler/Script Performance/Stats/Network when available; if no measurements, say which hypotheses need testing. Separate CPU, replication, GC, GPU, draw/particle and asset pressure. Rank fixes by impact and risk, patch one bottleneck at a time and compare results. Consult `engineering/performance`. Do not claim FPS improvements without measurements.
