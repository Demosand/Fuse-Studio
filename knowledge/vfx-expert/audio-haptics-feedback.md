---
title: Sound design and synchronized feedback
tags: audio sound groups mixing spatial attenuation sound effect haptic rhythm
status: curated
---

# Sound design and synchronized feedback

## Sound structure
Define buses for music, ambience, UI, SFX, voice and combat with sane volume limits. Start with strong transient and short decay for tactile actions; avoid every GUI click playing long loud loops. In combat, distinguish authoritative confirmed hit vs predicted shot. Spatial sound should have tested rolloff and position; ensure 2D UI sound doesn't originate from map corner.

## Integrate modalities
Sound + animation + visual should have complementary transients, not all peaking simultaneously. Haptic feedback where supported can be subtle; no input system should require it. Respect muted audio and accessibility preferences.

## Reliability
Assets may fail to load and permissions can differ; avoid asserting playback happened without verifying. Stale Sound instances on pooled visual objects must be reset/disconnected. Test simultaneous 20 players, volume clipping and mobile speaker intelligibility.
