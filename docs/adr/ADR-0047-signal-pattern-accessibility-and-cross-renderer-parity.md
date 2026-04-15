# ADR-0047: Signal Pattern Accessibility and Cross-Renderer Parity

**Document ID:** adr-0047-signal-pattern-accessibility-and-cross-renderer-parity
**Status:** Accepted (Implemented v1)
**Date:** 2026-04-05
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Accessibility

---
## Context

Signal states in Envy UI were color-driven, but color-only encoding is insufficient for:
- users with color-vision deficiencies;
- grayscale and black-and-white print workflows;
- cross-platform consistency where semantic states are rendered outside core UI components (for example Highcharts).

At the same time, component signals and chart signals must stay semantically aligned. If CSS and chart engines render different pattern geometry for the same status, the system loses predictability and accessibility value.

During implementation review, two concrete gaps were observed:
1. Highcharts pattern rendering initially diverged visually from CSS pattern rendering.
2. Some statuses were too similar (`pending` vs `upcoming`) and required clearer pattern differentiation.

This ADR formalizes the v1 architecture that solves those gaps while preserving token-first, resolver-driven generation.

## Decision

I decided to implement a tokenized signal-pattern system as a first-class semantic layer and make it the single source of truth across renderers, with CSS and Highcharts as the first validated adapters.

The decision contains six concrete rules:

1. Introduce a reusable pattern library in semantic tokens:
   - `eui.pattern.library.*`
2. Introduce semantic status-pattern mapping:
   - `eui.pattern.signal.status.application.*`
3. Ensure cross-renderer parity by storing both CSS and Highcharts pattern parameters in the same token model:
   - `cssImage`, `cssSize`
   - `highchartsPath`, `highchartsWidth`, `highchartsHeight`, `highchartsStrokeWidth`, `highchartsStrokeColor`
4. Use solid semantic status color as pattern background in charts, with white/alpha pattern lines overlaid.
5. Make pattern rendering switchable:
   - global switch via `data-eui-pattern-mode="on|off"`
   - per-component override for `Card` via the same attribute
6. Provide documentation and visual verification in Storybook, including print simulation:
   - normal signal-color chart examples
   - grayscale print simulation example with the same pattern mapping

## Rationale

### 1) Accessibility-first signal encoding

Color remains useful, but accessibility requires an additional visual channel. Pattern overlays provide a non-color-dependent signal and improve interpretability for both UI components and data visualizations, consistent with [WCAG 2.2 SC 1.4.1 Use of Color](https://www.w3.org/TR/WCAG22/#use-of-color) and [SC 1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast).

For non-web/report outputs, WCAG interpretation is aligned through WCAG2ICT, while PDF/UA remains the structural document accessibility layer rather than a standalone visual-contrast rulebook.

### 2) Single-source semantics across renderers

Without token-level parity, CSS and chart renderers drift. Storing geometry and stroke metadata together in one token structure removes hidden renderer-specific logic and keeps meaning consistent.

### 3) Resolver and canonical CSS compatibility

The solution is implemented in the existing DTCG + resolver architecture instead of ad-hoc component config. This keeps generation deterministic and observable within the same governance model already established in [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md) and [WORKFLOW-009](../workflows/WORKFLOW-009-resolver-migration-workflow.md).

### 4) Operational flexibility

Pattern mode must be optional by product/context. Global and local switching allows teams to enable patterns selectively (for accessibility mode, reports, regulated views) without forking components.

### 5) Distinguishability as an explicit requirement

`upcoming` was moved from continuous horizontal lines to dashed horizontal lines (`dashHorizontal`) so statuses remain distinguishable even in grayscale contexts.

## Consequences

### Positive

- Semantic signal encoding now has dual channel support (color + pattern).
- CSS and Highcharts pattern rendering use the same token source.
- Print-oriented grayscale preview is supported in Storybook.
- Component-level and app-level rollout can be staged safely.

### Trade-offs

- Token surface area grows (additional pattern fields and mappings).
- Highcharts integration adds renderer-specific consumption code (still token-driven).
- Pattern parity across all third-party renderers is not automatic; each renderer needs an adapter that consumes the same token contract.

### Non-Goals (v1)

- Automatic rollout to every component that uses status colors.
- Full pattern rollout across all status-bearing components (Badge and other component families) is excluded in this phase.
- Full export pipeline for every charting library beyond the current Highcharts integration path.

## Implemented Scope (v1)

### Token Architecture

- Added semantic pattern source:
  - [`tokens/contexts/app/semantics/patterns/status-application.json`](../../tokens/contexts/app/semantics/patterns/status-application.json)
- Added pattern library + signal mapping fields used by CSS and Highcharts.
- Added `dashHorizontal` and mapped `upcoming` to it for distinction from `pending`.

### Resolver Integration

- Added new semantic token source to:
  - [`tokens/knowledge/resolver/app-core.resolver.json`](../../tokens/knowledge/resolver/app-core.resolver.json)
  - [`tokens/knowledge/resolver/storybook.resolver.json`](../../tokens/knowledge/resolver/storybook.resolver.json)

### Component Integration

Card integration is the first representative component-level adapter for this policy (not the architecture boundary).

- Added status pattern variables to card tokens:
  - [`tokens/components/card.tokens.json`](../../tokens/components/card.tokens.json)
- Added card runtime behavior for global/local pattern mode:
  - [`src/ui/components/card/card.structure.css`](../../src/ui/components/card/card.structure.css)
  - [`src/ui/card.css`](../../src/ui/card.css) (legacy compatibility layer)
- Generated component token output reflects pattern variables:
  - [`generated/css/components/card.tokens.css`](../../generated/css/components/card.tokens.css)

### Storybook + Highcharts Integration

- Added global Storybook switch:
  - [`.storybook/preview.tsx`](../../.storybook/preview.tsx) (`patternMode`)
- Added architecture story demonstrating:
  - pattern library;
  - status mapping;
  - component overrides;
  - Highcharts with accessibility module;
  - signal vs non-signal vs grayscale print simulation.
  - [`stories/architecture/signal-patterns.stories.tsx`](../../stories/architecture/signal-patterns.stories.tsx)
- Updated integration story to consume the same signal pattern tokens:
  - [`stories/tsx/clean/react-grid-layout.stories.tsx`](../../stories/tsx/clean/react-grid-layout.stories.tsx)

## Validation and Ops

Primary validation commands used for this decision:

```bash
node scripts/generate-component-css.mjs
npm run tokens:build:canonical
npm run resolver:validate:app
npm run resolver:validate:phase4
```

These checks guarantee:
- resolver inventory includes pattern semantics;
- canonical context CSS emits expected variables;
- component token CSS includes status pattern variables.

## Alternatives Considered

### A) Keep patterns only in component CSS (rejected)

Rejected because it creates renderer drift and bypasses token governance.

### B) Keep patterns only in chart adapters (rejected)

Rejected because components and charts would encode different semantics and duplication would grow over time.

### C) Use gradients in CSS and independent SVG in charts (partially used, then improved)

This was an intermediate step. Final v1 moved CSS to SVG `data:image` patterns so geometry can match Highcharts path definitions more closely.

## Important Steps

1. Add token-level guidance and constraints to architecture docs for pattern authoring (shape density, minimum distinguishability thresholds). *(implemented)*
2. Add visual regression checks specifically for pattern parity across component and chart previews. *(future implementation)*
3. Extend the same pattern adapter model to additional third-party visualization libraries where needed. *(future implementation)*
4. Evaluate opt-in print theme preset that defaults to grayscale + patterns for reporting contexts. *(implemented: evaluation complete, report `print|screen` theme path retained as baseline; optional chart-specific preset remains future implementation)*

---

## Notes

This ADR defines a practical baseline for accessible signal encoding and cross-renderer consistency. It should be considered foundational for future third-party chart integrations and report-focused output modes.

## References

### Internal Documents

- [ADR-0029](./ADR-0029-accessibility-architecture-and-decision-framework.md) — Accessibility Architecture and Decision Framework
- [ADR-0030](./ADR-0030-third-party-library-integration-strategy.md) — Third-Party Library Integration Strategy
- [ADR-0031](./ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md) — Contrast Strategy Dynamic Colors on Color Tokens
- [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md) — Canonical Token Architecture Locked
- [ADR-0038](./ADR-0038-canonical-token-css-output-contract.md) — Canonical Token CSS Output Contract
- [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md) — DTCG Resolver Adoption and Phased Migration
- [WORKFLOW-005](../workflows/WORKFLOW-005-tokens-workflow.md) — Tokens Workflow
- [WORKFLOW-009](../workflows/WORKFLOW-009-resolver-migration-workflow.md) — Resolver Migration Workflow
- [ARCH-tokens-005](../architecture/ARCH-tokens-005-signal-pattern-authoring-rules.md) — Signal Pattern Token Authoring Rules

### External Standards

- WCAG 2.2 SC 1.4.1 Use of Color: <https://www.w3.org/TR/WCAG22/#use-of-color>
- Understanding SC 1.4.1: <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color>
- WCAG 2.2 SC 1.4.11 Non-text Contrast: <https://www.w3.org/TR/WCAG22/#non-text-contrast>
- Understanding SC 1.4.11: <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast>
- WCAG 2.2 SC 2.5.8 Target Size (Minimum): <https://www.w3.org/TR/WCAG22/#target-size-minimum>
- Understanding SC 2.5.8: <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum>
- WCAG2ICT update (21 August 2025): <https://www.w3.org/WAI/news/2025-08-21/wcag2ict/>
- WCAG2ICT Group Note: <https://www.w3.org/TR/wcag2ict/>
- Directive (EU) 2019/882 (EAA) summary: <https://eur-lex.europa.eu/legal-content/ENG/LSU/?uri=CELEX%3A32019L0882>
- EN 301 549 (current published version noted by ETSI): <https://labs.etsi.org/rep/HF/en301549>
- ISO 14289-2:2024 (PDF/UA-2): <https://www.iso.org/standard/82278.html>
- WAI-ARIA APG (informative guidance): <https://www.w3.org/WAI/ARIA/apg/>
- APG Patterns index: <https://www.w3.org/WAI/ARIA/apg/patterns/>
- APG Keyboard Interface practices: <https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/>
