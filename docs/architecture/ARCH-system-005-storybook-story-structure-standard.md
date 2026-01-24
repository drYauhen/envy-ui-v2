# Storybook Story Structure Standard

**Document ID:** ARCH-system-005-storybook-story-structure-standard
**Status:** Draft
**Date:** 2026-01-15
**Last Updated:** 2026-01-14
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Architecture Rules (Binding)
**Related:**


---

This guide defines the canonical, repeatable story structure for all components using the MultiContextViewer model. It exists to keep Storybook stories consistent, mobile-friendly, and easy to scan.

## Fixed Storybook Wrapper Model

- The general wrapper is always Envy UI with `context="app"` and `theme="default"`.
- Density is implicit by default; only set `data-eui-density` when explicitly demonstrating density variants.
- Component previews must use `MultiContextViewer` as the only renderer.
- Themes are controlled only by the global toolbar switcher.
- Stories must not apply their own context/theme wrappers or overrides.

## Canonical Story Set (Per Component)

Story ordering is fixed and consistent:

1) **Overview** (single-context)  
   - Mode: `contexts=[app]`  
   - Show: default configuration + one typical real-world example  
   - Purpose: fast “what it is” snapshot

2) **Variants** (single-context)  
   - Mode: `contexts=[app]`  
   - Show: variant × tone (or a representative subset)  
   - Layout: vertical sections only  
   - Purpose: quick style scan

3) **Sizes** (single-context)  
   - Mode: `contexts=[app]`  
   - Show: default + small (and any other supported sizes)  
   - Layout: vertical rows per size  
   - Purpose: validate container-driven geometry

4) **Shapes** (single-context, if supported)  
   - Mode: `contexts=[app]`  
   - Show: rectangular, pill, circle (or supported shapes)  
   - Layout: vertical rows per shape  
   - Purpose: verify shape axis without size or tone noise

5) **States & Interaction** (single-context)  
   - Mode: `contexts=[app]`  
   - Show: interactive vs non-interactive, disabled/aria-disabled, focus states  
   - Purpose: behavior verification

6) **Comprehensive Multi-Context** (last)  
   - Mode: `contexts=[app, website, report]` (all supported)  
   - Show: full matrix if light, otherwise representative subset  
   - Layout: vertical stacking inside each context panel  
   - Purpose: cross-context comparison

**Rule:** The Comprehensive Multi-Context story must be last.

## Layout Rules (Mandatory)

- Variant/size/tone comparisons must be vertical-stacked (mobile-safe).  
- Do not use left/right or side-by-side size comparisons.  
- One story = one validation goal. Avoid full matrices everywhere.

## Component Axis Mapping

- Story content must reflect component axes (size, variant, tone, state, interactivity, etc.).  
- Shape is a standard extension axis; if a component supports shape variants, include a Shapes story.  
- If an axis is unsupported, omit the corresponding story.  
- For heavy components (table, calendar), reduce the multi-context story to a representative subset.
