---
title: UI state machines, focus and modal management
tags: ui state machines modal controller routing focus stack loading error empty spam
status: curated
---

# UI state machines, focus and modal management

## Explicit screen lifecycle
Prefer a small controller tracking `closed`, `opening`, `open`, `closing` with a version counter; separately track request states `idle`, `pending`, `success`, `error`. Do not infer business state from `Visible` or transparency. Set state synchronously before asynchronous operations. Handle the player leaving, GUI reparenting, character reset and network errors.

## Modal coordination
Maintain a single owner for modal stack and overlay dimmer. Escape/Back closes the top dismissible modal; don't allow a prompt beneath a modal to consume input. Preserve original `GuiService.SelectedObject` and restore to a valid visible/selectable control. Confirm destructive actions before sending remotes; use server rejection as truth. Do not permit UI to grant inventory/currency locally.

## Fast user interactions
Throttle/disable buttons while purchase request pending; restore them even on timeout or failure. Optimistic UI only for reversible cosmetic local changes; reconcile with server authoritative snapshot. Guard stale requests with request ID; ignore a response for a previous selected item. Render `loading`, `empty`, `offline`, `error`, `success`, and `partial` states deliberately.

## Typical bugs to check
- Duplicate subscriptions when panel reopened 10×.
- UI randomly reappearing because old `Tween.Completed` callback sets `Visible`.
- Modal state forgotten after respawn.
- Gamepad selection on invisible element.
- Network response arrives after player navigated to another shop item.
- UI is destroyed with a pending remote response.
