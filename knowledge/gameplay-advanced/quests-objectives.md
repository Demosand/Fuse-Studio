---
title: Quests tutorials objectives and interaction design
tags: quests objective tutorial onboarding mission checkpoint mission ui
status: curated
---

# Quests tutorials objectives and interaction design

## Quest state
Define objective id/version and predicates server-side; progression via authoritative observed events only, not client-reported 'I completed'. A quest's state must survive allowed respawn/reconnect or deliberately reset; distinguish daily/weekly and one-time rewards with exactly-once semantics where needed.

## Onboarding
Teach by doing: first goal within seconds, short readable prompts, immediate feedback, optional depth. Avoid tutorials that hide player controls for 5 minutes. Make prompts contextual and device-aware; support returning players skipping known tutorial.

## Robustness
Multiple objectives update at once, players complete during loading, cross-server quest handoff, reward claim replay, outdated UI objective tracker, long translations. Verify crash/retry before grant.
