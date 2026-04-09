# ADR-0031: Contrast Strategy for Dynamic Colors and On-Color Tokens

**Document ID:** adr-0031-contrast-strategy-dynamic-colors-on-color-tokens
**Status:** Proposed (Regulatory Baseline Revision)
**Date:** 2026-01-05
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Accessibility
**Related:**
- [ADR-0014](ADR-0014-color-model-tonal-scales-and-contextual-architecture.md) — Color Model, Tonal Scales, and Contextual Architecture
- [ADR-0029](ADR-0029-accessibility-architecture-and-decision-framework.md) — Accessibility Architecture and Decision Framework
- [ADR-0033](ADR-0033-accessibility-strategy-theme-switching-across-contexts.md) — Accessibility Strategy for Theme Switching Across Contexts
- [ADR-0047](ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) — Signal Pattern Accessibility and Cross-Renderer Parity
- [ADR-0048](ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md) — Chart-Like Signal Interaction and Hit-Area Accessibility Policy

---

## Context

Envy UI must remain readable across contexts (`app`, `website`, `report`) and for dynamic themes where colors may be user-defined or generated at runtime.

The previous draft leaned on APCA as the primary algorithm. After regulatory audit, this is not sufficient for compliance gating today because:

1. Current legal and procurement baselines still map to WCAG 2.x success criteria (ratios and SC mapping), not WCAG 3.
2. For non-web software/documents, WCAG application is mediated through WCAG2ICT and region-specific regulations/standards.
3. PDF/UA governs document accessibility structure/semantics, but does not itself define full visual contrast policy for all content classes.

---

## Decision

I decided to adopt a two-level contrast model:

1. **Compliance Baseline (normative gate): WCAG 2.x-compatible checks**
   - Use WCAG 2.x contrast rules as the required pass/fail baseline in token generation and validation.
   - Keep explicit token pairs (`background`, `border`, `text/on`) as the default consumption path for components.
   - Do not allow component-level ad hoc contrast math for tokenized surfaces.

2. **Perceptual Enhancement (advisory): APCA/advanced scoring**
   - APCA may be used as an additional quality signal for tuning and ranking options.
   - APCA must not be the only compliance gate in the current architecture.

3. **Profile-based thresholds by output mode**
   - Define explicit profiles (for example `screen-default`, `screen-accessibility`, `report-screen`, `report-print`) with threshold presets.
   - Threshold presets can be stricter than minimum regulatory baseline.

4. **Non-web and PDF policy**
   - For report/PDF outputs, pair structural requirements (PDF/UA) with WCAG-mapped criteria for perceivable contrast and use-of-color behavior.
   - Treat WCAG2ICT guidance as the interpretation layer for non-web software/documents.

---

## Rationale

### 1) Regulatory alignment

WCAG 3 is still a Working Draft. It is valuable for forward-looking design, but not a replacement for current compliance baselines.

### 2) Deterministic enforcement

Token-first pairs make contrast behavior auditable and consistent across renderers.

### 3) Practical evolution path

Keeping APCA as advisory preserves future-readiness without breaking present-day compliance expectations.

### 4) Better report/PDF posture

PDF/UA is necessary for tagged, navigable accessible PDFs, but not sufficient as a standalone visual contrast policy.

---

## Consequences

### Positive

- Compliance checks become easier to explain to auditors and procurement stakeholders.
- Dynamic color generation remains possible, but with clear baseline validation rules.
- APCA stays useful for optimization without being over-claimed as compliance proof.

### Trade-offs

- Two scoring layers (normative + advisory) increase implementation complexity.
- Some APCA-favored color pairs may still fail WCAG 2.x thresholds and must be rejected for baseline profiles.

### Implementation impact

- Validation scripts should expose both:
  - required WCAG-based pass/fail result;
  - optional APCA/perceptual score.
- Token profiles must declare which threshold set is active.

---

## Important Steps

1. Add explicit profile config for contrast thresholds per context/output mode. *(future implementation)*
2. Add deterministic contrast validator output (`pass/fail + score + selected token`). *(future implementation)*
3. Ensure all dynamic color utilities expose WCAG-ratio baseline before APCA ranking. *(future implementation)*
4. Keep APCA as an opt-in optimization layer until WCAG 3 is normative in target compliance regimes. *(future implementation)*

---

## References

### Internal Documents

- [ADR-0029](./ADR-0029-accessibility-architecture-and-decision-framework.md) — Accessibility Architecture and Decision Framework
- [ADR-0033](./ADR-0033-accessibility-strategy-theme-switching-across-contexts.md) — Accessibility Strategy for Theme Switching Across Contexts
- [ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) — Signal Pattern Accessibility and Cross-Renderer Parity
- [ADR-0048](./ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md) — Chart-Like Signal Interaction and Hit-Area Accessibility Policy

### External Standards and Guidance

- WCAG 2.2 (Recommendation): <https://www.w3.org/TR/WCAG22/>
- Understanding SC 1.4.1 Use of Color: <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>
- Understanding SC 1.4.11 Non-text Contrast: <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>
- Understanding SC 2.5.8 Target Size (Minimum): <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>
- WCAG2ICT update (21 August 2025): <https://www.w3.org/WAI/news/2025-08-21/wcag2ict/>
- WCAG2ICT Group Note (current publication): <https://www.w3.org/TR/wcag2ict/>
- Section 508 applicability and WCAG incorporation: <https://www.section508.gov/develop/applicability-conformance/>
- ISO 14289-2:2024 (PDF/UA-2): <https://www.iso.org/standard/82278.html>
