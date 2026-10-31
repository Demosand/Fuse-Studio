---
title: Weapons Tools
tags: Tool Equipped Unequipped Activated ContextActionService equip combat reload client state
area: gameplay
---

# Tools and equipment lifecycle

An equipped Tool changes hands, gets dropped, removed or destroyed. Put authoritative ammunition and damage on server; put input, viewmodel, recoil and cosmetic sounds locally. Use Tool's equipment events to attach/detach controller cleanup, not as proof of ownership: the server must check inventory/equip state before firing.

Separate immutable `WeaponConfig` from per-player mutable state (ammo, reload deadline, shot sequence). On weapon switch, cancel pending reload and local animation tracks by unique generation token; late callbacks should never affect the new weapon.

Design controls for mouse, touch and gamepad. Validate melee/hitscan actions as described in `gameplay/combat`. For gun smoke/tracers, prefer client presentation with relevant server events. Test dual equipping, respawn mid-reload, tool deleted during animation, lagged shot after unequip and exploit requests using another player's weapon id.
