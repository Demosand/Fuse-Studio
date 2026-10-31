---
title: Audio
tags: SoundService sound group reverb spatial attenuation footsteps music UX combat accessibility
area: presentation
---

# Audio design and runtime correctness

Sound is a functional layer: player input response, hit confirmation, enemy distance, ambient mood and informational UI. Prioritize distinct sound signatures; avoid saturating the mix with identical high-volume transient events.

## Practical design

- Organize SoundGroups for Master/Music/SFX/Voice/Ambience; expose volume sliders where appropriate.
- Spatial sound source placement should match the apparent position. Verify attenuation behavior and max distance in the current Roblox sound APIs.
- Use pitch/volume variation on repeated hits and footsteps, but ensure loudness stays comfortable and consistent.
- Music transitions should crossfade or happen at musical boundaries when possible. Don't start new music copies on every respawn.
- Sound assets must be available to the experience and follow Roblox permissions and audio policies.

## Lifecycle/performance

Use sound pools for frequent short transients, cap simultaneous voices, clean up streams when source is destroyed. Long one-shots triggered by duplicate remote events create a loudness bug and memory pressure.

## Accessibility and QA

Subtitles/captions for speech and critical cues; visual alternatives for gameplay information; separate mix controls. Test with headphones and mono/downmixed output and ensure audio does not reveal secrets via client-only hidden state.
