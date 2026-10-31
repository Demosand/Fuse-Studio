---
title: Trustworthy high-conversion shop UI
tags: ui shop monetization marketplace developer products price receipts ethical
status: curated
---

# Trustworthy high-conversion shop UI

## Shop information architecture
Separate browse, product details, checkout request, pending purchase, receipt confirmation and server-delivered grant. Make product identity, amount, recurring vs one-time terms, and pricing understandable. Never label a reward delivered from `PromptProductPurchaseFinished`; ProcessReceipt on the server and durable deduplication are the source of truth for developer products.

## Design details
Use visual focus, crisp product art, concise selling points, clear cancellation. Small featured area and consistent cards beat walls of glow. Make gamepass ownership and developer product repeatability distinct. Mark paid randomness odds/policy requirements and regional restrictions accurately; verify current Creator Hub policies rather than hard-code outdated rules.

## Quality and ethics
No misleading countdowns, fake scarcity, hidden costs or pressure targeting kids. On purchase failure, keep state intact and offer retry without duplicate grant. Fallback when MarketplaceService is unavailable. Use server authority on all price/entitlement checks. UI can explain pending processing without claiming a successful grant prematurely.
