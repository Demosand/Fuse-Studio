---
title: Release
tags: Roblox publish checklist QA moderation privacy analytics game design live ops security
area: operations
---

# Publish and live operations checklist

## Before publishing

- Functional: all core loops and tutorial states; no blocking error in Output; respawn and rejoin work.
- Security: remote audit, exploit/duplicate grant tests, server authority, datastore session locking, purchase callbacks.
- Performance: multi-player stress test, mobile quality and ping, no obvious long-run memory growth, clean loading.
- UX: icons/thumbnails and descriptions truthful, UI mobile/gamepad accessible, readable in bright/dark maps.
- Rights: all assets/audio/animations and branding appropriately licensed/owned; no credentials in repository or game.
- Policies: check latest Roblox terms on monetization, age, paid randomness, advertising, privacy and external links.
- Operations: error monitoring, rollback/versioning strategy, data schema migrations, on-call owner.

## Safe deployment

Back up sources and test in staging place. Introduce versioned schema updates and a plan to roll back **code** without corrupting new data. Roll out feature flags to small percentages where supported, watch business and stability metrics together and keep emergency disabling paths for exploitable features.

## Post-launch

Monitor server crash/error rate, data load failures, suspicious reward spikes, retention for voluntary gameplay and device-specific performance. Avoid optimizing metrics by coercive mechanics. Document incidents and update tests.
