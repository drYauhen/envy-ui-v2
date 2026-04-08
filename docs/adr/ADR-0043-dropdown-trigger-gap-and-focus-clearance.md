# ADR-0043: Dropdown Trigger Gap and Focus Clearance

**Status:** Accepted  
**Date:** 2026-02-18  
**Last Updated:** 2026-04-07  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  

- [ADR-0006](./ADR-0006-focus-policy-architecture.md) — Focus Policy Architecture  
- [ADR-0040](./ADR-0040-focus-ring-geometry-v1.md) — Focus Ring Geometry Canon v1  
- [ADR-0042](./ADR-0042-density-axis-defaulting-and-inheritance.md) — Density Axis Defaulting and Inheritance  

---

## Context

Select-like controls and menu triggers use an external focus ring. When a dropdown surface opens too close to the trigger, the focus ring can appear visually clipped or merged with the overlay edge.

The system already fixes focus geometry through ADR-0040:
- Focus ring width: 2px
- Focus ring offset: 2px

This creates an expected external footprint of 4px around the focused trigger. A 2px dropdown gap is not sufficient for consistent visual separation.

## Decision

I decided to standardize the trigger-to-dropdown vertical gap at **5px** and express it through tokens.

- Canonical semantic token: `eui.overlay.offset.dropdown` (`--eui-overlay-offset-dropdown`)
- Select primitive token maps to semantic token: `eui.select.primitive.popover.spacing.offset`
- Floating positioning for `SelectPopover` and `Menu` resolves this token and uses it as `mainAxis` offset.
- For clipping scroll/list surfaces with full-width focusable rows, internal safe inset must be >= focus footprint (`offset + width`) to avoid clipped focus rings.

## Rationale

1. 5px is the minimum gap that keeps a 4px external focus footprint visually separated from dropdown borders.
2. The value is small enough to preserve trigger-overlay association while avoiding overlap artifacts.
3. Tokenizing this value enables consistent behavior across components and future context/theme overrides.
4. A semantic overlay token keeps the rule reusable beyond a single component family.

## Consequences

- `Select`, `Multi-Select`, `Searchable Select`, and `Multi-Select Tree` (through `SelectPopover`) now share a consistent token-based dropdown gap.
- `Menu` no longer uses a hardcoded `8px` offset and now follows the same semantic overlay gap token.
- Future overlay-capable components should consume `--eui-overlay-offset-dropdown` unless they have an explicit documented exception.
- Focus clearance is not solved by offset alone: clipping menu/list surfaces must also reserve internal safe inset and scroll padding for focused rows/options.
