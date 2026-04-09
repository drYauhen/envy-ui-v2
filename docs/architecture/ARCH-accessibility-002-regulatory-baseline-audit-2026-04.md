# Accessibility Regulatory Baseline Audit (2026-04)

**Document ID:** ARCH-accessibility-002-regulatory-baseline-audit-2026-04
**Status:** Active
**Date:** 2026-04-08
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Architecture Rules (Binding)
**Related:**
- [ADR-0029](../adr/ADR-0029-accessibility-architecture-and-decision-framework.md)
- [ADR-0031](../adr/ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md)
- [ADR-0033](../adr/ADR-0033-accessibility-strategy-theme-switching-across-contexts.md)
- [ADR-0047](../adr/ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md)
- [ADR-0048](../adr/ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md)
- [ARCH-tokens-005](./ARCH-tokens-005-signal-pattern-authoring-rules.md)

---

## Purpose

This document records the regulatory-first audit baseline for Envy UI accessibility decisions and captures deltas found in existing ADRs/architecture docs as of **2026-04-08**.

---

## Regulatory Baseline (Current)

1. **WCAG 2.2 remains the primary normative accessibility baseline** for web conformance checks.
2. **WCAG2ICT** is the interpretation layer for applying WCAG 2.x criteria to non-web software and non-web documents.
3. **PDF/UA-2 (ISO 14289-2:2024)** is required for accessible PDF structure and programmatic accessibility, but it does not define all visual contrast policy details for every content class.
4. **EAA (Directive (EU) 2019/882)** is applicable from **28 June 2025** (with transitional measures such as service-provider/use-case windows to **28 June 2030**).
5. **EN 301 549** is a key European ICT accessibility standard used for conformity mapping in public/procurement contexts.
6. For US federal scope, **Section 508 Revised Standards** incorporate WCAG 2.0 AA by reference for web and non-web electronic content.

---

## Design-System Benchmark Notes

Observed in mature systems/tools used as practical implementation references:

1. **Highcharts** provides an accessibility module and token-friendly pattern fills, and explicitly supports pattern fill as an accessibility aid.
2. **Fluent 2** guidance reinforces:
   - minimum contrast expectations for text/non-text interactive elements;
   - use of non-color indicators (do not communicate only by color).

These references support the same direction adopted in [ADR-0047](../adr/ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) and [ADR-0048](../adr/ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md): color + additional visual channel + adequate interaction geometry.

---

## Findings from Internal Audit

### High Priority

1. **ADR-0031 wording was APCA-first** and could be interpreted as compliance gating by APCA.
   - Risk: mismatch with current regulatory audit expectations (WCAG 2.x baseline remains normative).

### Medium Priority

1. **Print/grayscale pattern stroke policy lacked explicit adaptive contrast rule.**
   - Fixed single stroke color may fail contrast on darker grayscale status backgrounds.

2. **Regulatory mapping in signal-pattern ADRs was incomplete.**
   - Needed explicit references to WCAG2ICT, EAA/EN 301 549, and PDF/UA scope boundaries.

---

## Changes Applied in This Audit Cycle

1. Updated [ADR-0031](../adr/ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md) to:
   - compliance-first baseline (WCAG 2.x compatible pass/fail),
   - APCA as advisory optimization, not sole gate,
   - explicit non-web/PDF interpretation layer.

2. Updated [ADR-0047](../adr/ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) and [ADR-0048](../adr/ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md) references with WCAG2ICT/EAA/EN 301 549/PDF-UA context.

3. Updated [ARCH-tokens-005](./ARCH-tokens-005-signal-pattern-authoring-rules.md) with explicit adaptive print-stroke rule and non-text `3:1` digital validation target for status-pattern overlays.

4. Updated signal print pattern tokens to use contrast-selected stroke colors by status in:
   - [`tokens/contexts/app/semantics/patterns/status-application.json`](../../tokens/contexts/app/semantics/patterns/status-application.json)

---

## Remaining Gaps

1. Add automated validation for pattern stroke vs grayscale background contrast (per status).
2. Add report-context token profile (`report/screen`, `report/print`) and enforce contrast checks there, not only in app-context stories.
3. Add explicit policy for physical print uncertainty:
   - digital preflight thresholds are required,
   - physical output can vary by printer/ink/paper and needs QA sampling in regulated workflows.

---

## References

### Internal Documents

- [ADR-0031](../adr/ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md)
- [ADR-0033](../adr/ADR-0033-accessibility-strategy-theme-switching-across-contexts.md)
- [ADR-0047](../adr/ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md)
- [ADR-0048](../adr/ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md)
- [ARCH-tokens-005](./ARCH-tokens-005-signal-pattern-authoring-rules.md)

### External Standards and Guidance

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Understanding SC 1.4.1 (Use of Color): <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>
- Understanding SC 1.4.11 (Non-text Contrast): <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>
- Understanding SC 2.5.8 (Target Size Minimum): <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>
- WCAG2ICT update (21 Aug 2025): <https://www.w3.org/WAI/news/2025-08-21/wcag2ict/>
- WCAG2ICT Group Note: <https://www.w3.org/TR/wcag2ict/>
- EAA summary (Directive (EU) 2019/882): <https://eur-lex.europa.eu/legal-content/ENG/LSU/?uri=CELEX%3A32019L0882>
- EN 301 549 project page (ETSI): <https://labs.etsi.org/rep/HF/en301549>
- Section 508 conformance applicability: <https://www.section508.gov/develop/applicability-conformance/>
- ISO 14289-2:2024 (PDF/UA-2): <https://www.iso.org/standard/82278.html>
- Highcharts accessibility module docs: <https://www.highcharts.com/docs/accessibility/accessibility-module>
- Highcharts pattern fills docs: <https://www.highcharts.com/docs/chart-design-and-style/pattern-fills>
- Fluent 2 accessibility: <https://fluent2.microsoft.design/accessibility>
