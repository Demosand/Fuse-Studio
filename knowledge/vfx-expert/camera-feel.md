---
title: Camera recoil shake and cinematic composition
tags: camera fx recoil shake blur impact fov motion sickness animation
status: curated
---

# Camera recoil shake and cinematic composition

## Feel before shake
Prefer animation anticipation, sound transient and reticle recoil first. Camera effects only where they communicate physical impact. Implement local additive camera offset with predictable precedence and smooth restoration; do not fight default CameraModule or write one competing CFrame each frame from multiple controllers.

## Recoil architecture
Separate weapon aim/recoil model, camera presentation recoil and server ballistic authority. Recoil pattern does not determine hit validation by itself. FOV pulse needs bounded maximum and reset on interruption, death, camera mode switch or respawn.

## Accessibility
Reduce or remove camera shake and FOV distortion if the user prefers reduced motion; test first-person discomfort. Never use a giant shake on every hit; establish camera safe motion range. If needed use a client-only effects controller and consolidate frame update into one callback with cleanup.
