---
title: GUI style selection and persistence
tags: roblox ui gui stud styles modern minimal glass sci-fi retro cartoon fantasy
status: curated
---
# Select the Roblox GUI style once

Before building a NEW interface, inspect the current project GUI, existing tokens, reference screenshots, user preference, and project docs/gui-style.md. If an existing style or screenshot already defines the design, preserve it and DO NOT ask again.

If truly undecided, ask the developer ONE concise question: "Какой стиль GUI выбрать: Stud (яркий Roblox-симулятор), Modern Minimal, Glass/Aurora, Sci-Fi, Retro Pixel, Cartoon, Fantasy или другой? Можешь прислать референс." Continue after their answer; accept any style not on the list.

If user says choose for me, select based on the game's genre and state choice. Persist choice in project docs/gui-style.md when appropriate, including typography, palette tokens, components, motion, responsive handling and icons. Reuse it for ALL new screens, not a new question for each button or menu. A UI bugfix should never trigger this question.

The question is for the DEVELOPER commissioning the interface, NOT for people who play the game. Do not force Stud as default. If Stud explicitly selected or /fuse-studio:stud-ui invoked, apply it immediately with bundled source kit. Avoid blending styles unless user explicitly requests it.