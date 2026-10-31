---
title: Performance budgets and measurement methodology
tags: roblox performance profiling memory microprofiler cpu gpu network spikes mobile
status: curated
---

# Performance budgets and measurement methodology

## Start with the symptom
Stutter can originate from CPU Luau, replication, garbage collection, physics, rendering or assets. Capture baseline: device, scene, player count, median and p95 frame times, memory and network. Distinguish client and server traces. Developer Console, Script Profiler and MicroProfiler provide concrete evidence; a guessed bottleneck is not a measured result.

## Diagnosis matrix
CPU spikes on frame task: inspect per-frame work and allocations. Network spikes: remote storms and server-tweened parts. Memory climb: missed event disconnects/Instances/retained tables. Rendering bottleneck: particles, lights, scene complexity. Physics spikes: unconstrained moving assemblies and collision pairs. Startup delays: large asset import/content loading.

## Method
One primary change → re-run same scene/device → compare p50/p95 and failure rate. Use budget tiers and interest management before compromising essential game feel. Profile low-end mobile and multiplayer rather than desktop solo only. If no profiler, provide reproducible experiment and flag actual results pending.
