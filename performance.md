# Profiling and optimization workflow

Collect reproducible scene and baseline: player count, hardware class, FPS/frametime p95, memory, network and script profiler. If no profiling tools are available say clearly that proposed bottlenecks are hypotheses.

1. Separate server CPU vs client CPU vs GPU vs network vs memory/GC.
2. Sort hotspots by measured impact and expected patch risk.
3. Introduce focused changes: relevance filters, throttling, batching, pooling, object lifetime cleanup, visibility-based updates or simpler rendering.
4. Re-run the same benchmark; compare before/after in units and identify noise.
5. Include regression tests for timing/race and low-spec fallback.

Do not promise optimization via type annotations alone. Do not introduce large ECS rewrites without evidence.
