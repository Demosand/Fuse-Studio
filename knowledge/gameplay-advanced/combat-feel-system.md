---
title: AAA-feel melee ranged and movement combat
tags: combat action anticipation active recovery hitstop hitbox knockback recoil combo
status: curated
---

# AAA-feel melee ranged and movement combat

## The four feel layers
Mechanics (timing and risk), readable anticipation, confirmed impact feedback, fair recovery. Define each attack's startup/active/recovery frames or time intervals; publish input buffer and cancel windows if design needs them. Attack priority should be testable, not a dozen magic booleans.

## Server flow
Server owns equip, cooldown, stamina and damage; client predicts animation and swing VFX. Server verifies origin, range, line of sight and hit validity; use bounded rewinding only when justified. A hit marker can be predicted but a health change requires server confirmation.

## Art direction
Use animation markers for strike/contact/footstep cues, clear silhouettes and readable recovery. VFX focal hit + debris, audio transient + material, short optional camera impulse; mobile-tier versions of all effects. Avoid too much blur/shake.

## Coverage
Attack during stun, jumping, respawn, desync, 200ms ping, rapid weapon swap, simultaneous damage, full-server area damage. Unregister all event handles when weapon unequipped.
