---
title: Testing
tags: TestService TestEZ multi client Studio Play Solo emulator validation tests Luau
area: engineering
---

# Testing strategy

Use the best available level: pure-module unit tests, module integration tests, and multi-client Studio playtests. A clean syntax check is not proof a remote handler or DataStore is safe.

## For every feature

- Happy path, invalid/missing input, duplicate request, cooldown boundary, character respawn, player leave, lost/late network update.
- Validate client/server ModuleScript placement; ensure `require` paths exist and runtime properties have correct types.
- Check Studio Output for exceptions, Script Analysis for type errors and unexpected infinite yields.
- For UI: mobile viewport, aspect ratios, text scaling, keyboard/gamepad/touch, slow device quality.
- For combat: two players with latency, aim outside range, wall obstruction, shot replay/spam, simultaneous damage.
- For persistence: DataStore errors and duplicate receipts. Don't use live production data during experimentation.

## Testing workflow

```text
Arrange: create deterministic starting state, mock pure dependencies.
Act: request a valid and invalid action from independent players.
Assert: only authorized state changed, expected event was sent, nothing leaked.
Cleanup: disconnect and destroy resources, clear test data.
```

Studio MCP tools vary by bridge. Discover what's available; run playtests and inspect console if possible. If no bridge, present a reproducible manual test list instead of claiming automated validation. Automated tests should avoid reliance on public APIs or production secrets.
