# ADR-0050: WCAG 3 Long-Term Readiness Vision and Architectural Reflection

**Document ID:** adr-0050-wcag-3-long-term-readiness-vision-and-architectural-reflection
**Status:** Proposed (Exploratory - Long-term Vision)
**Date:** 2026-04-14
**Last Updated:** 2026-04-14
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Accessibility Strategy
**Related:**
- [ADR-0029](./ADR-0029-accessibility-architecture-and-decision-framework.md) — Accessibility Architecture and Decision Framework
- [ADR-0031](./ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md) — Contrast Strategy for Dynamic Colors and On-Color Tokens
- [ADR-0033](./ADR-0033-accessibility-strategy-theme-switching-across-contexts.md) — Accessibility Strategy for Theme Switching Across Contexts
- [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md) — AI-First Component Architecture Vision
- [ADR-0040](./ADR-0040-focus-ring-geometry-v1.md) — Focus Ring Geometry Canon v1
- [ADR-0042](./ADR-0042-density-axis-defaulting-and-inheritance.md) — Density Axis (Context x Theme x Density)
- [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md) — Component Contract Definition and Agent Consumption
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection
- [ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) — Signal Pattern Accessibility and Cross-Renderer Parity
- [ADR-0048](./ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md) — Chart-Like Signal Interaction and Hit-Area Accessibility Policy
- [ARCH-accessibility-002](../architecture/ARCH-accessibility-002-regulatory-baseline-audit-2026-04.md) — Accessibility Regulatory Baseline Audit (2026-04)

---
## Context

This ADR is intentionally reflective. It does not define immediate implementation rules. It defines a long-term architectural posture for accessibility decisions.

As of **03 March 2026**, WCAG 3 remains a W3C Working Draft and is explicitly described by W3C as incomplete and likely to change substantially. The draft introduces a different structure and conformance approach than WCAG 2.x (for example: core requirements, supplemental requirements, assertions, and Bronze/Silver/Gold conformance levels).

At the same time, current regulatory and procurement baselines are still mapped to WCAG 2.x in most practical compliance contexts. Therefore, the system needs two things in parallel:

1. Regulatory reliability now.
2. Architectural flexibility for likely WCAG 3 directions over the next five years.

The risk this ADR addresses is architectural lock-in: building only for current pass/fail checks and creating expensive retrofits when process-level conformance, assertions, and broader scope requirements mature.

## WCAG 2.2 to WCAG 3: Evaluation Model Shift

### Context for Interpretation

WCAG 2.2 conformance is currently interpreted in practice through criterion-level pass/fail style reporting, often summarized in VPAT/ACR language (`Supports`, `Partially Supports`, `Does Not Support`, `Not Applicable`). WCAG 3 drafts move toward outcome-oriented evaluation with methods and potentially aggregated scoring.  
This shifts accessibility evaluation from "are UI rules satisfied per element" toward "how well does the user experience actually work end-to-end". As a result, partial or uneven accessibility coverage becomes more visible and more measurable at system level.

### Comparison Snapshot

| Aspect | WCAG 2.2 + current VPAT/ACR practice | WCAG 3 draft direction (forward-looking) |
|---|---|---|
| Evaluation model | Criterion conformance, mostly categorical status | Outcome conformance with method-based evidence and possible aggregation |
| Primary unit | Individual success criterion | User outcome across pages/views/processes |
| Partial coverage treatment | `Partially Supports` + remarks | Degree/proportion of outcome satisfaction can be expressed |
| Scope behavior | Local compliance can look acceptable while global consistency is unclear | System-level inconsistency is expected to reduce aggregate result |
| Reporting impact | Procurement-readable but often coarse for product quality comparison | Better potential to compare consistency and completeness of UX accessibility |

### Reporting Interpretation: VPAT Today vs Future Scoring

**Current fact (as of 2026-04):**
- VPAT 2.5Rev conformance levels are still categorical (`Supports`, `Partially Supports`, `Does Not Support`, `Not Applicable`).
- Current VPAT editions map to WCAG 2.x versions (2.0/2.1/2.2 depending edition), not WCAG 3.

**Forward-looking interpretation (non-normative):**
- No standardized "WCAG 3 VPAT" format should be assumed.
- If scoring-oriented conformance matures, "Partially Supports" ambiguity can be reduced by showing proportional coverage of an outcome across component and process scope.
- The same current-state result could be represented as uneven outcome performance, not just a single category label.

### Concrete Example: Signal Semantics Coverage

Current system state is intentionally uneven:
- [ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) implemented color+pattern semantics for Card and Highcharts paths.
- Badge rollout was explicitly out of scope in v1.

**WCAG 2.2 style interpretation (today):**
- A criterion such as non-color signal communication can end up as `Partially Supports`: some surfaces are compliant, but system-wide consistency is incomplete.

**WCAG 3 style conceptual interpretation (forward-looking, illustrative only):**
- Evaluate one outcome ("status can be distinguished without color") with method-level evidence per surface and flow.
- Example conceptual profile: Card `high`, chart legend `high`, Badge `low`.
- Aggregate result is then "inconsistent and below target" rather than a single ambiguous categorical label.

### UX-Level Accessibility Implications

Accessibility evaluation is no longer only about component correctness. UX decisions directly affect measurable accessibility quality:

1. Action clarity: unclear labeling and weak state feedback increase cognitive load even when ARIA wiring is correct.
2. Predictability: inconsistent behavior across similar controls/fragments degrades outcome reliability.
3. Flow consistency: accessibility quality must be stable across complete tasks, not only isolated widgets.
4. Density and hierarchy decisions (see [ADR-0042](./ADR-0042-density-axis-defaulting-and-inheritance.md)) influence comprehension and error rates, not only visual compactness.

### System Evolution Toward AI-Assisted and Generative Design (Forward-looking)

To align with an outcome-based future model, accessibility needs to be encoded as generation-time system constraints, not post-hoc QA notes:

1. Component contracts (see [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md)) should evolve from visual/behavioral mapping toward explicit accessibility-behavior and cognitive-clarity constraints.
2. Token surfaces can evolve beyond visual variables toward policy-like constraints (for example minimum clarity, feedback, and consistency rules per interaction class).
3. AI-assisted composition (see [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md), [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md)) can use these constraints to generate layouts and flows that are accessibility-aligned by default.
4. Manual criterion-by-criterion review remains necessary for compliance, but system-generated consistency can reduce repeated accessibility drift across contexts and renderers.

### Design System Implications for Envy UI

1. Accessibility must be modeled as a system property, not only per-instance component status.
2. Component defaults should enforce accessible behavior to reduce variability in generated or manual composition.
3. In scoring-oriented models, inconsistency across components and flows will materially degrade overall outcome posture.
4. UX patterns (clarity, predictability, cognitive load) become auditable accessibility scope alongside UI semantics.
5. Long-term architecture should encode accessibility as machine-readable composition constraints for AI-assisted generation.

## Decision

I decided to adopt a **dual-track accessibility architecture vision (2026-2031)**:

1. **Track A: Compliance baseline remains WCAG 2.x aligned**
- Continue treating WCAG 2.2-compatible criteria as the normative pass/fail baseline for current conformance.
- Keep regulatory mapping explicit for web, non-web ICT interpretation, and report/PDF contexts.

2. **Track B: WCAG 3 readiness becomes an architectural constraint**
- New architecture decisions should prefer patterns that remain compatible with the emerging WCAG 3 model.
- Priority is given to designs that support process-level evidence, assertions, and technology-agnostic methods without breaking current WCAG 2.x compliance.

3. **Future-facing design principle**
- Accessibility architecture should be designed for migration by configuration and governance, not by large structural rewrites.

## What Is Already Forward-Compatible

The current architecture already contains several strong decisions that are likely to age well:

1. **Semantic, token-first system contracts**
- The token and resolver model supports controlled evolution of accessibility policies without renderer-specific divergence.

2. **Function-over-appearance accessibility decisions**
- Role selection and ARIA behavior are already tied to functional intent, which aligns with the user-outcome orientation in WCAG 3 drafts.

3. **Dual-layer contrast posture**
- Normative WCAG 2.x baseline with advisory perceptual optimization provides a stable transition path while WCAG 3 conformance matures.

4. **Separation of theme and density axes**
- Accessibility tuning can evolve without coupling to compactness decisions.

5. **Focus visibility as a system policy**
- Canonical geometry plus contrast-driven focus policy gives a stable base for future focus-related requirements.

6. **Color + non-color signal channels**
- Pattern-based status encoding and chart parity already reduce dependency on color-only communication.

7. **Hit-area policy beyond visual glyph size**
- Interaction geometry and target sizing are modeled as first-class constraints, not incidental styling.

## Watchlist: Gaps to Monitor

These areas require ongoing attention for WCAG 3 readiness:

1. **Assertion-ready evidence pipeline**
- The system needs stronger, auditable traces of accessibility procedures (reviews, tests, exceptions, approvals) to support future assertion-style conformance claims.

2. **Process-level accessibility coverage**
- Validation remains component-heavy; end-to-end task/process accessibility evidence should become first-class.

3. **Accessibility-support-set declarations**
- Conformance reporting should explicitly declare UA/AT support assumptions per context and profile.

4. **Cognitive and language-oriented requirements**
- Draft WCAG 3 emphasis on clear language and process clarity requires stronger authoring and content governance links, not only UI-component correctness.

5. **Readiness metrics and governance cadence**
- A recurring readiness review is needed so that new WCAG 3 draft updates are reflected in architecture deltas, rather than handled ad hoc.

## Rationale

This approach minimizes strategic risk under uncertainty:

1. If WCAG 3 changes significantly, current compliance remains stable.
2. If WCAG 3 matures in a direction close to current drafts, migration cost is reduced because key architectural primitives already exist.
3. If regulators adopt phased transitions, dual-track governance supports gradual adoption rather than disruptive rewrites.

## Consequences

### Positive

- Preserves current regulatory defensibility while avoiding short-term optimization that harms long-term adaptability.
- Makes accessibility strategy explicit at architecture level, not only at component level.
- Improves decision quality for new contracts, tokens, and renderer adapters.

### Trade-offs

- Requires ongoing governance effort even when immediate regulatory pressure is unchanged.
- Adds documentation and evidence-management overhead.
- Some future-proofing investments may not map one-to-one to the final WCAG 3 model.

### Implementation Direction (Non-binding)

1. Define a recurring "WCAG 3 readiness review" cadence (for example, once per quarter).
2. Add a lightweight readiness matrix to major accessibility ADRs (already-covered, partially-covered, missing).
3. Extend validation strategy from component checks to process/task-level accessibility scenarios.
4. Track assertion-capable evidence artifacts in workflows.

---

## Notes

This ADR is a strategic reference for architectural thinking. It is not a replacement for current implementation baselines and not a standalone compliance claim document.

## References

### Internal Documents

- [ADR-0029](./ADR-0029-accessibility-architecture-and-decision-framework.md) — Accessibility Architecture and Decision Framework
- [ADR-0031](./ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md) — Contrast Strategy for Dynamic Colors and On-Color Tokens
- [ADR-0033](./ADR-0033-accessibility-strategy-theme-switching-across-contexts.md) — Accessibility Strategy for Theme Switching Across Contexts
- [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md) — AI-First Component Architecture Vision
- [ADR-0040](./ADR-0040-focus-ring-geometry-v1.md) — Focus Ring Geometry Canon v1
- [ADR-0042](./ADR-0042-density-axis-defaulting-and-inheritance.md) — Density Axis (Context x Theme x Density)
- [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md) — Component Contract Definition and Agent Consumption
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection
- [ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md) — Signal Pattern Accessibility and Cross-Renderer Parity
- [ADR-0048](./ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md) — Chart-Like Signal Interaction and Hit-Area Accessibility Policy
- [ARCH-accessibility-002](../architecture/ARCH-accessibility-002-regulatory-baseline-audit-2026-04.md) — Accessibility Regulatory Baseline Audit (2026-04)

### External Standards and W3C Draft Context

- WCAG 3 Introduction (updated 03 March 2026): <https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/>
- W3C Accessibility Guidelines (WCAG) 3.0 Working Draft (03 March 2026): <https://www.w3.org/TR/2026/WD-wcag-3.0-20260303/>
- Explainer for WCAG 3.0 (03 March 2026): <https://www.w3.org/TR/2026/DNOTE-wcag-3.0-explainer-20260303/>
- WCAG 3 publication history: <https://www.w3.org/standards/history/wcag-3.0/>
- WCAG 2.2 (Recommendation baseline): <https://www.w3.org/TR/WCAG22/>
- ITI VPAT 2.5Rev overview (April 2025): <https://lists.itic.org/policy/accessibility/vpat>
- Section508.gov ACR/VPAT FAQ (conformance-level terminology): <https://www.section508.gov/sell/acr-vpat-faq/>
