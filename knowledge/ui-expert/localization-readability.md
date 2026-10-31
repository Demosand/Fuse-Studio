---
title: Text localization long strings and legibility
tags: ui localization russian english german bidi text overflow textscaled preferredtextsize
status: curated
---

# Text localization long strings and legibility

## Localize structure, not just strings
Provide localization keys rather than concatenating translations; placeholders and pluralization need correct localization tooling. Make layouts tolerant of 1.5–2× length expansion. Preserve readable line height, punctuation and numeric grouping. Detect clipping in different languages, keyboard input and player-generated names.

## Text rendering in Roblox
`AutomaticSize` with wrapped labels can avoid fixed-height clipping. Be mindful of `TextScaled` producing unreadably small labels; `UITextSizeConstraint` prevents extremes but can conflict with automatic resizing. Measure before deciding. Be aware of GuiService PreferredTextSize and engine settings; verify with actual settings.

## QA
Pseudo-localized long labels, strings with Cyrillic + digits and emoji, empty values, right-to-left text where supported, asset fallback for missing glyphs, controller prompts translated. Truncate only secondary copy; never silently truncate price or an actionable warning.
