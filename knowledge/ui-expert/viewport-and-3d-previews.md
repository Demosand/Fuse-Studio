---
title: ViewportFrame premium preview pipeline
tags: ui viewportframe worldmodel preview rig animation camera rotation thumbnail performance
status: curated
---

# ViewportFrame premium preview pipeline

## Setup
Use `ViewportFrame` with its own dedicated `Camera` assigned as `CurrentCamera`; clone only necessary model contents into a `WorldModel` under the ViewportFrame. Clear scripts and extraneous descendants in preview clones. Set reliable pivot and camera framing using bounds; account for models of different aspect ratios and rotation. Studio lighting does not translate 1:1 into viewport rendering; tune lights and environment intentionally.

## Animation / interaction
Use controlled slow model spin only when selected, not dozens of simultaneous rotating thumbnails. Use gesture rotate with clamped angle; reset on next item. Animator playback inside preview must be confirmed in Studio. For large inventories render icons and one shared 3D preview, not one WorldModel per slot.

## Security/performance
Never run arbitrary scripts from cloned assets; clear scripts. Cache preview for selected item, dispose on panel close, don't retain references to destroyed WorldModels. Test missing mesh assets and avatar accessories; allow image fallback when preview unavailable.
