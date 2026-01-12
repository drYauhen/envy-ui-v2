# ADR-0031: Contrast Strategy for Dynamic Colors and On-Color Tokens

**Status:** Proposed  
**Date:** 2026-01-05  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  

- [ADR-0014](./ADR-0014-color-model-tonal-scales-and-contextual-architecture.md) — Color Model, Tonal Scales, and Contextual Architecture  
- [ADR-0018](./ADR-0018-typography-units-architecture-rem-em-px.md) — Typography Units Architecture - REM, EM, and PX  
- [ADR-0029](./ADR-0029-accessibility-architecture-and-decision-framework.md) — Accessibility Architecture and Decision Framework

---

## Context

Envy UI must remain readable across contexts (app, website, report) and across dynamic user-driven themes (custom websites, print templates, client-defined palettes).

Manual pairing of background and text colors does not scale when colors can be generated or chosen at runtime. We need a system-wide strategy that:

- Produces reliable text/background pairs for known palettes.
- Supports runtime decisions for user-defined colors.
- Is consistent across build-time generation and runtime usage.

---

## Decision

I decided to adopt a two-path contrast strategy:

1. **Token-first "on-color" pairs**  
   For all system-defined backgrounds (semantic surfaces, status colors, component fills), the token pipeline will generate explicit `background`, `border`, and `text/on` pairs. Components must consume these pairs directly and must not compute contrast in component code.

2. **Shared contrast utility for dynamic colors**  
   For user-defined or runtime-generated colors, a shared utility will compute a recommended on-color using **APCA** as the primary algorithm. The same utility will be available to:
   - Token build scripts (to generate `on-*` pairs)
   - Runtime consumers (for dynamic themes/templates)

3. **Configurable thresholds by use case**  
   Contrast targets are configurable (e.g., higher thresholds for print/report templates). The utility returns the chosen color and the contrast score so the caller can enforce stricter rules when needed.

---

## Rationale

- **Scalability:** Explicit token pairs handle the majority of cases without runtime logic.
- **Consistency:** The same algorithm drives both build-time and runtime decisions.
- **Future-proofing:** Dynamic templates (website/report) need deterministic, automated contrast.
- **Accessibility alignment:** APCA is designed for modern UI perception and is the direction of WCAG 3.

---

## Consequences

- Token pipeline must generate and expose `on-*` pairs for relevant surfaces.
- Components should reference tokens rather than compute text colors locally.
- A shared contrast utility becomes part of the system API for dynamic themes.
- We must document target thresholds per context (app/site/report) as they are finalized.

---

## Notes

- APCA provides a contrast score (not a ratio). Thresholds will be documented by context.
- WCAG 2.x ratio checks may still be used as a fallback or for tooling compatibility.
