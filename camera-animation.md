---
title: Camera Animation
tags: CameraType CFrame TweenService camera shake R6 R15 animation markers transitions cutscene
area: presentation
---

# Animation, camera and player feedback

Character animation logic must match the actual rig (R6/R15/custom), animation asset ownership and playback priority. Never assume an animation id from another project is accessible. Use animation markers for precise *presentation* timing, but the server must validate hit windows independently.

## Animation flow

Start -> transition blend -> active action -> recovery. Avoid running endless overlapping tracks at high priority. Reuse loaded tracks where safe; stop/remove tracks and event connections on equipment changes, death and respawn. Test the same timeline from third-person and first-person views.

## Camera design

Local camera effects belong to the client. Preserve prior camera configuration when entering/exiting cutscenes and use a scoped controller so abort/respawn restores it. Do not permanently overwrite camera script ownership.

Camera shake should be small, shaped and optional. Combine positional impulse and subtle angular kick proportional to event weight rather than applying noise continuously. Expose reduced motion and camera shake sliders. Never simulate a full-screen strobe at combat cadence.

## Cutscenes

Storyboard major beats, camera framing, interactive skip, screen reader/subtitle considerations and synchronization with audio. If character parts stream in late, have an explicit fallback. Don't lock player input irreversibly if the initiating quest fails.

## Hit feel stack

- Contact silhouette and short audio transient.
- Hit marker / UI feedback in a stable position.
- Local non-authoritative recoil, animation reaction, optional restrained shake.
- Server-verified damage event and target response.
