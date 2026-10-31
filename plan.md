# Planning workflow (only for real complexity)

1. Read existing relevant code or Studio hierarchy. Define user intent and any binding constraints.
2. Provide a **short** design: system owner, module boundaries, types/schemas, remote intent, failure modes, test plan and launch constraints.
3. For user-facing game mechanics, include micro/session/meta loops, onboarding and fair progression. For pure utility systems skip generic gameplay analysis.
4. Choose minimal pattern based on measured need. Explain major trade-offs briefly; don't require ECS or OOP everywhere.
5. Break implementation into coherent, shippable slices, with test/acceptance conditions. For small reversible changes do the change directly instead of gating on approval.

Template: `templates/feature-plan.md`.
