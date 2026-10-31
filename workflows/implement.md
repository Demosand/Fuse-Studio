# Implementation workflow

- Identify actual project execution mode: live Studio, Rojo repository or offline.
- Inspect source and any existing libraries/API contracts **first**; keep diffs targeted.
- Choose authoritative ownership. Validate client data; separate reliable gameplay events from disposable effects.
- Prefer --!strict Luau with typed public API; correct nil guards; lifecycle teardown; no broad global state.
- Wire client presentation and mobile quality without relying on server for per-frame visual work.
- Test with available tooling; for offline mode include explicit hierarchy and manual test instructions.
- Report files changed, meaningful constraints, verified outcomes and unresolved risks; do not report unperformed tests.
