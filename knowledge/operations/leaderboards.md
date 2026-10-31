---
title: Leaderboards
tags: OrderedDataStore leaderboard ranking top players update async rate limits privacy
area: operations
---

# Rankings and leaderboards

Treat leaderboards as a derived view, not the single source of truth. Player profile contains authoritative score; a leaderboard store/index is updated from verified results with controlled rate. Avoid writes every frame or on every low-value reward.

When reading ranked pages, handle missing data, duplicate names, privacy display requirements, throttling and stale values. Explain in the UI that rankings can take time to refresh if eventual consistency matters. Never let client write their own score.

Guard numeric magnitudes and schema migrations. Test score reset, negative exploits, repeated server reports, concurrent matches and temporary service errors. Hide or limit sensitive details unrelated to scoring.
