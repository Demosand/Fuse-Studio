---
title: Premium inventory UI and interaction architecture
tags: ui inventory grid slots equipment hotbar filters sort virtualization item cards
status: curated
---

# Premium inventory UI and interaction architecture

## Data contract
Use server-generated item IDs/stack counts/rarity metadata. Client owns only layout/selection/search query. Equipment and trade actions go to server by intention, not client-reported final inventory. Support empty slots, locked slots, stacking, favorites, sorting, search, drag/drop or touch selection, detail pane and comparison.

## Layout architecture
Use a reusable `ItemCard` component with model, selectable state and lifecycle; virtualize/limit heavy rendering for hundreds of slots. Grid adapts by available width, preserving consistent card ratio. Top-level search/filter controls stay reachable when scrolled; use `ScrollingFrame.AutomaticCanvasSize` and update content when filter changes. Avoid overcreating ViewportFrames; lazy-load previews for visible/selected items.

## Polish recipe
Strong selected state (border + tiny scale + sound), subtle rarity accents without making text low contrast, reveal item acquisition once, stack amount readable at a glance. Rare variants can use small accent animations only when selected; no full-screen screen flash for every pickup. Clear state when trading/removing items.

## Integration
Send `RequestEquip(itemId)`; server validates ownership, state, cooldown and save progression. Use versioned snapshot/delta updates to reconcile UI. Verify phone touch scrolling vs selection, controller traversal, long item names, rapid equip spam, and two devices/clients modifying inventory.
