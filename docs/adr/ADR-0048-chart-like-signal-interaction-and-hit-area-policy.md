# ADR-0048: Chart-Like Signal Interaction and Hit-Area Accessibility Policy

**Document ID:** adr-0048-chart-like-signal-interaction-and-hit-area-policy
**Status:** Accepted
**Date:** 2026-04-06
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Accessibility

---
## Context

[ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) introduced semantic signal patterns and cross-renderer parity (CSS + Highcharts).  
During implementation, a second-level accessibility question appeared: how to size and structure interactive legend items and similar signal controls across visual renderers.

The main tension:
1. A visibly large legend symbol (for example 24x24) improves pattern readability but can be visually heavy in dense dashboards.
2. Accessibility requirements focus on interactive target area, not necessarily visible symbol area.

This affects not only Highcharts. The same policy must work for chart-like components implemented via:
- Highcharts;
- plain SVG;
- CSS-only visual blocks;
- future third-party visualization libraries.

## Decision

I decided to define a renderer-agnostic interaction policy for chart-like signal components, with Highcharts as the first concrete reference adapter (not the policy boundary).

The policy is:

1. Keep visible legend/swatch symbol at a balanced default size:
   - `18x18` (unified baseline).
2. Ensure interactive legend item target area meets accessibility target sizing:
   - target area around item (symbol + label) must be at least ~`24px` in height when interactive, consistent with [WCAG 2.2 SC 2.5.8 Target Size (Minimum)](https://www.w3.org/TR/WCAG22/#target-size-minimum).
3. Treat accessibility target size and visible symbol size as separate concerns:
   - symbol can stay visually compact;
   - item spacing, line-height, and padding provide the interactive hit-area.
4. Keep legend placement policy consistent:
   - legend is placed below chart content by default for chart-like components.
5. Keep dual semantic rendering modes:
   - standard mode: color-only signals;
   - accessibility mode: color + token-driven patterns.
6. For interactive legend behavior (hover/focus/click), apply the same target-area rule regardless of renderer.

## Why New ADR (Instead of Extending ADR-0047)

[ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) is about semantic pattern parity and token contract.  
This ADR introduces a separate governance layer: interaction geometry and hit-area policy for chart-like signal UIs.

Keeping this as a separate ADR makes future reuse easier for non-Highcharts renderers without changing the semantic decisions of [ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md).

## Rationale

### 1) Accessibility intent without visual bloat

A 24x24 visible marker everywhere is not always desirable.  
Using 18x18 for the visible symbol while expanding interactive item area preserves readability and layout density.

### 2) Correct interpretation of target-size guidance

Target-size guidance applies to interactive targets, not strictly to icon glyph size (see [WCAG 2.2 SC 2.5.8](https://www.w3.org/TR/WCAG22/#target-size-minimum) and [Understanding SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).  
Therefore, symbol size and hit-area are modeled independently.

### 3) Cross-renderer consistency

The user experience should remain consistent whether chart-like visuals are built with Highcharts, SVG, or CSS.  
Defining policy at the architecture level avoids per-library divergence.

### 4) Backward-compatible rollout

This policy can be adopted incrementally in existing stories and integrations without breaking token contracts.

## Implemented Scope (Current Step)

Current validation examples (representative adapters):

1. [`stories/architecture/signal-patterns.stories.tsx`](../../stories/architecture/signal-patterns.stories.tsx)
   - unified legend symbol baseline at 18x18;
   - increased legend item spacing/line-height for larger hit-area;
   - bottom legend placement retained.
2. [`stories/tsx/clean/react-grid-layout.stories.tsx`](../../stories/tsx/clean/react-grid-layout.stories.tsx)
   - same legend policy applied in integration chart adapter;
   - Highcharts accessibility module enabled;
   - bottom legend placement retained.
3. Source-file documentation links now open through a read-only Storybook shell with syntax highlighting:
   - [`stories/docs/tools/source-file-viewer.stories.tsx`](../../stories/docs/tools/source-file-viewer.stories.tsx)
   - [`stories/viewers/code/SourceFileViewer.tsx`](../../stories/viewers/code/SourceFileViewer.tsx)
   - link resolution integrated in [`stories/viewers/docs/DocViewer.tsx`](../../stories/viewers/docs/DocViewer.tsx)

## Renderer Adapter Rules

For any chart-like renderer adapter:

1. Read semantic signal colors and optional pattern metadata from tokens ([ADR-0047 contract](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md)).
2. When legend items are interactive (hover/focus/click/toggle):
   - enforce minimum item hit-area around 24px height.
3. Keep visible symbol at baseline 18x18 unless a renderer-specific exception is documented.
4. Keep legend below chart unless documented variant requires otherwise.
5. Apply keyboard interaction expectations consistent with [WAI-ARIA APG keyboard interface practices](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).

## Non-Goals (This ADR)

1. Redefining status-card indicator geometry and hover areas (deferred).
2. Enforcing identical DOM/SVG structure across renderers.
3. Replacing renderer-native accessibility APIs with a custom abstraction layer.

## Consequences

### Positive

- Accessibility and visual density are balanced instead of treated as an all-or-nothing choice.
- Highcharts behavior now maps to a reusable architecture policy.
- Future chart-like components can follow a clear rule set from day one.

### Trade-offs

- Requires adapter-level implementation details per renderer.
- Target-area checks may need runtime or visual verification tooling.
- One baseline may not fit every ultra-compact dashboard use case; exceptions must be documented.

## Validation and Ops

Recommended checks for this policy:

```bash
npm run storybook:dev -- --smoke-test --ci
npm run docs:validate
```

For future hardening:
1. add automated checks for legend item hit-area in integration stories;
2. add visual regression snapshots for standard vs accessibility mode.

## Important Steps

1. Add tokenized chart legend interaction metrics (symbol size, item min-height, spacing) to avoid hardcoded story values. *(implemented)*
2. Add a reusable helper for chart adapters (Highcharts/SVG/CSS) that centralizes legend geometry defaults. *(future implementation)*
3. Add explicit exception protocol (when a component intentionally deviates from 18x18 symbol baseline). *(future implementation)*
4. Revisit `Card` status indicator interaction zone in a dedicated ADR/update after separate UX review. *(future implementation)*
5. Add a read-only code-file viewer shell for documentation links to `.ts/.tsx/.css/.json` adapter files, so implementation references open as syntax-highlighted Storybook pages instead of raw file text. *(implemented)*

---

## Notes

This ADR is intentionally orthogonal to ADR-0047:
- [ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) answers semantic signal encoding and renderer parity.
- ADR-0048 answers interaction geometry and target-size policy for chart-like signal UIs.

Note: APG does not define a dedicated chart legend pattern. For interactive legends, this ADR applies APG keyboard and interaction principles together with WCAG target-size guidance.

## References

### Internal Documents

- [ADR-0029](./ADR-0029-accessibility-architecture-and-decision-framework.md) — Accessibility Architecture and Decision Framework
- [ADR-0030](./ADR-0030-third-party-library-integration-strategy.md) — Third-Party Library Integration Strategy
- [ADR-0031](./ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md) — Contrast Strategy Dynamic Colors on Color Tokens
- [ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) — Signal Pattern Accessibility and Cross-Renderer Parity
- [WORKFLOW-005](../workflows/WORKFLOW-005-tokens-workflow.md) — Tokens Workflow
- [ARCH-tokens-005](../architecture/ARCH-tokens-005-signal-pattern-authoring-rules.md) — Signal Pattern Token Authoring Rules

### External Standards

- WCAG 2.2 SC 1.4.1 Use of Color: <https://www.w3.org/TR/WCAG22/#use-of-color>
- Understanding SC 1.4.1: <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color>
- WCAG 2.2 SC 2.5.8 Target Size (Minimum): <https://www.w3.org/TR/WCAG22/#target-size-minimum>
- Understanding SC 2.5.8: <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum>
- WCAG2ICT Group Note: <https://www.w3.org/TR/wcag2ict/>
- Directive (EU) 2019/882 (EAA) summary: <https://eur-lex.europa.eu/legal-content/ENG/LSU/?uri=CELEX%3A32019L0882>
- WAI-ARIA APG (informative guidance): <https://www.w3.org/WAI/ARIA/apg/>
- APG Patterns index: <https://www.w3.org/WAI/ARIA/apg/patterns/>
- APG Keyboard Interface practices: <https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/>
