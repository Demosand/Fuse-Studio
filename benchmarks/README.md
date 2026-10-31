# Kira Studio evaluation

`npm run benchmark` tests only the **local knowledge search**, not generated-game quality. It checks whether each fixed multilingual query returns relevant references in its first four results. This reproducibly catches major regressions in routing.

For actual side-by-side tests with `ro-engineer` or `roblox-brain`, see [`knowledge/tools/benchmark-methodology.md`](../knowledge/tools/benchmark-methodology.md) and [`templates/skill-comparison.md`](../templates/skill-comparison.md). A claim that Kira outperforms either project requires independent comparable evaluations in actual Claude Code + Studio environments.

No benchmark runner here invokes Claude or needs credentials; sample usage and quality numbers would otherwise be misleading.
