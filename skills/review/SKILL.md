---
name: review
description: "Audit Roblox code for bugs, exploits, performance, data loss and architecture"
disable-model-invocation: true
---

Audit $ARGUMENTS. Be skeptical and evidence-driven. Identify severity (critical/high/medium/low), file/line where possible, exploit or failure scenario and minimal corrective patch. Prioritize money/data-loss, RemoteEvents, replication, memory leaks, perf hot paths and StreamingEnabled. Do not propose unrelated rewrites; run checks/tests when available. Reference `workflows/audit` as needed.
