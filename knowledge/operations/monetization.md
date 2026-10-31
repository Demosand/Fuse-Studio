---
title: Monetization
tags: gamepass developer product ProcessReceipt monetization paid random items premium policies purchase
area: operations
---

# Monetization that is reliable and fair

Separate entitlement and grant mechanics. Game passes are durable entitlements; developer products are consumable/repeatable purchases and need robust receipt processing. Roblox may change platform policies; consult official Creator Hub before launch.

## Receipts

- Implement `MarketplaceService.ProcessReceipt` with a durable, idempotent `PurchaseId` record and same-transaction grant where possible.
- If player's profile is unavailable or persistence fails, return the appropriate "not processed" decision so Roblox retries. Do not infer payment success from prompt closing.
- Never trust a client saying it purchased something; verify only through platform-approved server mechanisms.
- Test duplicate delivery, reconnect while purchase resolves, server shutdown and previously-granted product.

## Pricing and ethics

Make item contents and purchase terms clear. Do not pressure young players with deceptive scarcity, hidden odds or coercive countdowns. Verify paid-random-items and age/region restrictions before shipping; disclose actual probabilities wherever required. If a product is unavailable, UI should explain this without soft-locking game progress.

## Economy integration

Use server prices, track sources/sinks and prevent negative or overflow balances. Keep virtual purchases and real-money grants separate in logic, with consistent receipt idempotence.
