# Security and code audit

Severity: **CRITICAL** (currency/data/exploit), **HIGH** (remote trust/memory runaway/duplicate purchase), **MEDIUM** (race, performance, compatibility), **LOW** (style/maintainability).

Read actual code; cite **specific lines/files** when available. Audit in this order:
1. Client-trusted currency, items, damage, weapon state, possession, distance, cooldown.
2. Receipt idempotence, DataStore consistency, session conflicts, schema changes.
3. Remote limits, invalid numeric payloads, deep structures/strings, spoofed Instance references.
4. Character lifecycle, connection leaks, stale timers, pooled state, streamed-out objects.
5. Network misuse, server CPU hot loops, excessive particles/draw/GUI updates.
6. Reliability/accessibility, mobile and gamepad modes, error handling.

Report compactly: severity, evidence, user impact, exploit/failure reproduction (non-destructive), minimal fix and how to test. Do not hallucinate found bugs in code you haven't inspected.
