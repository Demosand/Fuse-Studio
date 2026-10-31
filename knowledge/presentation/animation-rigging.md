---
title: Animation Rigging
tags: R6 R15 rig Animator AnimationTrack priority marker animation blending locomotion gameplay
area: presentation
---

# R6, R15 and custom animation rigs

Inspect rig type, hierarchy and actual Animator location before loading tracks. Verify asset ownership/access and target rig compatibility. A mismatched skeleton may produce no visible motion or broken poses.

## Blend and priorities

Assign priorities so attack/reaction layers override idle at expected joints without permanently locking locomotion. Avoid constantly recreating tracks; cache responsibly per character/animator and disconnect markers when rig is destroyed. Handle simultaneous equip/stun/knockback with explicit conflict rules.

Animation markers can synchronize local sounds, trails and camera cues, but a marker from client playback isn't an authoritative permission to deal damage. Server defines hit window. Ensure hit confirmation arrives when it should, and allow latency-friendly cosmetics without extra damage.

For R6, check limited joint motion; R15 has more articulation and differing animation assets. Test transitions and cleanup on respawn, death and fast tool switches. Use easing/contact frames with carefully controlled timing, not generic whole-body tweens that fight animation tracks.
