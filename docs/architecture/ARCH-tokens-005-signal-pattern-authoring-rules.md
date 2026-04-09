# Signal Pattern Token Authoring Rules

**Document ID:** ARCH-tokens-005-signal-pattern-authoring-rules
**Status:** Active
**Date:** 2026-04-06
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Architecture Rules (Binding)
**Related:**
- [ADR-0047](../adr/ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md)
- [ADR-0048](../adr/ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md)
- [ARCH-tokens-003](./ARCH-tokens-003-token-architecture.md)
- [WORKFLOW-005](../workflows/WORKFLOW-005-tokens-workflow.md)

---

This document defines binding authoring constraints for signal pattern tokens in DTCG files.
It applies to pattern library tokens and semantic status-to-pattern mappings.

## Scope

Applies to:
- `tokens/contexts/app/semantics/patterns/status-application.json`
- `tokens/contexts/app/semantics/colors/status-application.json` (grayscale profile mapping)
- `tokens/primitives/status-application.json` (grayscale foundation values)
- any future token files that define:
  - pattern geometry;
  - renderer parity fields (CSS and chart adapters);
  - semantic status mapping to patterns.

## Required Token Contract

Each reusable pattern in the library must define:
- `cssImage`
- `cssSize`
- `highchartsPath`
- `highchartsWidth`
- `highchartsHeight`
- `highchartsStrokeWidth`
- `highchartsStrokeColor`

Each semantic status mapping must reference library tokens for all required fields.
Do not duplicate literal geometry in each status mapping.

For grayscale/print profile support, each semantic status color set must also provide:
- `eui.color.status.application.grayscale.*`

For print profile pattern support, each semantic status mapping should provide:
- `print.cssImage`
- `print.cssSize`
- `print.highchartsPath`
- `print.highchartsWidth`
- `print.highchartsHeight`
- `print.highchartsStrokeWidth`
- `print.highchartsStrokeColor`

## Distinguishability Rules

1. Semantic statuses must be visually distinguishable in:
- full color;
- grayscale;
- low-size legend symbols.

2. New patterns must be compared against existing signal statuses.
At least one of the following must differ from the nearest existing pattern:
- line direction;
- line continuity (solid vs dashed);
- crosshatch/grid structure;
- stroke density.

3. Avoid near-duplicates for neighboring semantic states.
Example: two horizontal solid patterns with only minor opacity changes are not acceptable.

## Geometry Rules

1. Keep pattern tile sizes in a compact readable range:
- preferred: `8x8` to `12x12` for signal overlays.

2. Keep stroke width in readable range:
- preferred: `1.2` to `2.2`.
- for print/grayscale profile, preferred minimum is `2.0`.

3. Pattern stroke color should preserve readability over status background:
- use light alpha strokes for color overlays by default;
- use dark, high-contrast strokes for print/grayscale profile;
- for dark grayscale backgrounds, switch print/profile stroke to light color (do not force one fixed stroke color for every status);
- ensure pattern stroke versus status background reaches at least `3:1` in digital rendering profiles used for accessibility validation;
- validate contrast in grayscale print simulations.

## Cross-Renderer Parity Rules

1. CSS and chart adapters must express the same geometry intent.
2. `cssImage` SVG path geometry must match `highchartsPath` geometry.
3. Changes to any pattern geometry require parity verification in Storybook examples for:
- component-level rendering;
- chart-level rendering.

## Forbidden Patterns

- Color-only status differentiation without pattern mapping.
- Renderer-specific pattern geometry that bypasses token contract.
- Per-status literal copies of library geometry.
- Silent token fallback for missing pattern fields.

## Validation Checklist

For every pattern update:

1. Build tokens and ensure emitted variables exist.
2. Verify pattern parity in Storybook (`signal-patterns` story and chart integration story).
3. Verify `pending` and `upcoming` remain distinguishable in grayscale preview.
4. Verify print profile (`grayscale + pattern`) readability in Storybook print simulation.
5. Verify legend readability with current legend interaction geometry tokens.

Recommended commands:

```bash
npm run tokens:build:canonical
npm run resolver:validate:app
npm run resolver:validate:phase4
npm run storybook:dev -- --smoke-test --ci
```

## Change Management

When adding or changing a signal pattern:

1. Update token source first.
2. Regenerate outputs.
3. Validate parity in component and chart stories.
4. Update related ADR/architecture docs when semantic meaning changes.

This keeps the pattern system token-first, auditable, and consistent across renderers.
