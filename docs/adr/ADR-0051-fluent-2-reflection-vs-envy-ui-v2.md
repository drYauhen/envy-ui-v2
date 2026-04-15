# ADR-0051: Fluent 2 Reflection vs Envy UI v2

**Document ID:** adr-0051-fluent-2-reflection-vs-envy-ui-v2
**Status:** Proposed (Reflective Benchmark)
**Date:** 2026-04-14
**Last Updated:** 2026-04-14
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Strategy Reflection
**Related:**
- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model
- [ADR-0021](./ADR-0021-web-components-framework-agnostic-layer.md) — Web Components as Framework-Agnostic Implementation Layer
- [ADR-0025](./ADR-0025-figma-variables-integration-strategy.md) — Figma Variables Integration Strategy
- [ADR-0027](./ADR-0027-figma-files-structure-and-organization.md) — Figma Files Structure and Organization
- [ADR-0032](./ADR-0032-token-override-strategy-multi-tenant-generative-ui.md) — Token Override Strategy for Multi-Tenant and Generative UI
- [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md) — AI-First Component Architecture Vision
- [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md) — Canonical Token Architecture - Locked
- [ADR-0038](./ADR-0038-canonical-token-css-output-contract.md) — Canonical Token CSS Output Contract
- [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md) — Component Contract Definition and Agent Consumption
- [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md) — DTCG Resolver Adoption and Phased Migration
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection
- [ADR-0050](./ADR-0050-wcag-3-long-term-readiness-vision-and-architectural-reflection.md) — WCAG 3 Long-Term Readiness Vision and Architectural Reflection
- [WORKFLOW-002](../workflows/WORKFLOW-002-figma-workflow.md) — Figma Workflow

---
## Context

This ADR is a reflective benchmark against Fluent 2 as a mature external system.

Industry signal is explicit: Microsoft’s evolution from Fluent 1 to Fluent 2 reflects a shift from a traditional code-centric component-library model toward a design-led, tokenized, Figma-first system. Fluent 2 positions itself as system-level evolution (token system, robust usage guidance, accessibility notation) on top of Fluent 1 foundations, with code presented as implementation libraries mapped from design assets.

This confirms that movement from component-library thinking toward system-level, tokenized, design-platform workflows is already validated at scale. The purpose of this ADR is to evaluate where Envy UI is aligned, where it diverges intentionally, and where Fluent 2 is currently stronger.

## Decision

I decided to treat Fluent 2 as a strategic benchmark for direction, not as a template to copy.

The comparison should inform three decision classes:
1. **Adopt directly** where Fluent 2 practices fit our architecture without conflict.
2. **Adapt** where Fluent 2 intent is valuable but Envy UI requires a different implementation model.
3. **Avoid** where copying would reduce the strengths of our token-contract-projection architecture.

## Fluent 2 Overview (Compressed)

Fluent 2 currently demonstrates a mature design-led model:
1. Figma-first design surface with UI kits mapped to code libraries.
2. Design tokens with global + alias layering and strong theming/accessibility posture.
3. Platform-specific code libraries (React, Web Components, iOS, Android, Windows) as implementation layers of one design language.
4. Strong usage guidance at UX/pattern level (behavior, content, layout, accessibility) in component documentation.

## Comparison: Fluent 2 vs Envy UI

| Capability / Dimension | Fluent 2 | Envy UI v2 (Current) | Envy UI v2 (Planned) |
|---|---|---|---|
| Design-first approach (Figma as primary surface) | Yes | Partial | Partial |
| Token-based system (visual) | Yes | Yes | Yes |
| Semantic/business-level token modeling | Partial | Partial | Yes |
| UX/pattern-level abstraction | Yes | Partial | Yes |
| Code as projection/implementation layer | Partial | Yes | Yes |
| Multi-platform projection (React/Web/etc.) | Partial | Partial | Yes |
| AI-assisted design / generation support | Partial | Partial (experimental) | Yes |
| Accessibility as system constraint | Partial | Partial | Yes |
| Consistency enforcement at system level | Yes (process-driven) | Partial | Yes (system-driven) |

Planned-state grounding:
- `Semantic/business-level token modeling` and programmable override direction: [ADR-0032](./ADR-0032-token-override-strategy-multi-tenant-generative-ui.md), [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md).
- `Multi-platform projection`: established architecture in [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md), Web Components trajectory in [ADR-0021](./ADR-0021-web-components-framework-agnostic-layer.md).
- `AI-assisted design / generation support`: [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md), [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md).
- `Accessibility as system constraint`: [ADR-0050](./ADR-0050-wcag-3-long-term-readiness-vision-and-architectural-reflection.md), [ADR-0031](./ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md), [ADR-0047](./ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md), [ADR-0048](./ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md).
- `Consistency enforcement`: canonical token and resolver governance in [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md), [ADR-0038](./ADR-0038-canonical-token-css-output-contract.md), [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md).

Interpretation:
Envy UI is already aligned with Fluent 2 in tokenized, system-level design direction and in treating code as an implementation projection. Envy UI intentionally extends this path by adding an additional abstraction layer through resolver contracts, machine-readable component contracts, and AI-oriented generation direction. Some of these advantages are architectural and directional (planned in ADRs), not yet uniformly implemented across all components and workflows. Fluent 2 optimizes for design consistency at scale, while Envy UI evolves toward design computation and generation.

## Alignment: Where Envy UI Already Matches the Direction

1. **Token-first foundation is real, not aspirational**
- Canonical architecture and CSS output contracts are already locked and implemented.

2. **Semantic layering exists in production architecture**
- Envy UI already separates raw values from semantic meaning and theme overrides.

3. **Figma integration is operational**
- Context-scoped Figma artifacts, plugin workflow, and migration scripts are in place.

4. **Design-system scope exceeds a single renderer**
- Architecture is explicitly projection-oriented, with framework-agnostic intent.

## Divergence: Where Envy UI Intentionally Differs (or Goes Further)

1. **Resolver-governed composition as first-class architecture**
- Envy UI uses explicit DTCG resolver documents for build orchestration, not just token sets.

2. **Contract-centric machine readability for agents**
- Component contracts and schema governance make semantics consumable by automation/agents.

3. **System as computation layer, not only design library**
- Multi-tenant override strategy and AI-generated token-delta direction move the system toward programmable design computation.

4. **Projection model emphasis**
- The architecture is optimized to keep semantics stable while renderers can vary over time.

## Gaps: Where Fluent 2 Is Stronger Today

1. **Design-surface maturity and adoption scale**
- Fluent 2 has stronger production-proven designer workflows and organizational adoption.

2. **Pattern/usage guidance consistency**
- Fluent 2 documentation consistently encodes behavior/content/layout decisions; Envy UI guidance is deeper in architecture but less uniform at UX-pattern layer.

3. **Code-to-design linkage completeness**
- Envy UI includes `@figma/code-connect` and initial files, but real component coverage remains partial (few mapped components, placeholder file IDs still present).

4. **Operational closure of AI direction**
- Envy UI has strong AI architectural intent, but core agent metadata and milestone instrumentation are still incomplete at system scale.

## Strategic Takeaways

### Adopt (Direct)

1. Treat UX usage guidance as a first-class system artifact alongside tokens and code.
2. Keep design-to-development mapping explicit and continuously validated.
3. Preserve strong accessibility notation as part of normal component guidance, not separate audit-only material.

### Adapt (Reinterpret)

1. Apply Fluent-style design-led practice through Envy UI’s canonical token+resolver source-of-truth model.
2. Expand Figma role without turning Figma into authoritative source-of-truth.
3. Translate pattern guidance into machine-readable contract constraints where possible.

### Avoid (Intentional Non-Goals)

1. Avoid re-centering authority on design artifacts at the expense of deterministic token contracts.
2. Avoid platform/library coupling that weakens projection-layer portability.
3. Avoid adopting guidance-only patterns that cannot be validated in build/runtime workflows.

## Forward Direction

Fluent 2 should inform Envy UI trajectory as external validation of system-level design evolution, not as a strict implementation blueprint.

Near-term direction:
1. Increase UX/pattern guidance density and consistency across components.
2. Raise Code Connect and design-link coverage from pilot to broad component surface.
3. Continue evolving from visual tokens toward policy/constraint-capable semantics for AI-assisted composition.
4. Keep token-contract-resolver architecture as the stable core while expanding generation and design surfaces.

---

## Notes

Inference note: this ADR uses Fluent 2 public documentation as evidence of design-led/tokenized evolution. Statements about broader industry movement are strategic interpretation, not normative standard claims.

## References

### Internal Documents

- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model
- [ADR-0021](./ADR-0021-web-components-framework-agnostic-layer.md) — Web Components as Framework-Agnostic Implementation Layer
- [ADR-0025](./ADR-0025-figma-variables-integration-strategy.md) — Figma Variables Integration Strategy
- [ADR-0027](./ADR-0027-figma-files-structure-and-organization.md) — Figma Files Structure and Organization
- [ADR-0032](./ADR-0032-token-override-strategy-multi-tenant-generative-ui.md) — Token Override Strategy for Multi-Tenant and Generative UI
- [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md) — AI-First Component Architecture Vision
- [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md) — Canonical Token Architecture - Locked
- [ADR-0038](./ADR-0038-canonical-token-css-output-contract.md) — Canonical Token CSS Output Contract
- [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md) — Component Contract Definition and Agent Consumption
- [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md) — DTCG Resolver Adoption and Phased Migration
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection from Milestone-Driven Agent Research
- [ADR-0050](./ADR-0050-wcag-3-long-term-readiness-vision-and-architectural-reflection.md) — WCAG 3 Long-Term Readiness Vision and Architectural Reflection
- [WORKFLOW-002](../workflows/WORKFLOW-002-figma-workflow.md) — Figma Workflow

### External Sources

- Fluent 2 - Start Designing (Figma kits, design-language source-of-truth): <https://fluent2.microsoft.design/get-started/design>
- Fluent 2 - Design Tokens (global/alias model): <https://fluent2.microsoft.design/design-tokens>
- Fluent 2 - Start Developing (platform libraries and tokenized implementation): <https://fluent2.microsoft.design/get-started/develop>
- Fluent 2 - What’s New (system-level evolution from Fluent 1 foundations): <https://fluent2.microsoft.design/get-started/whatisnew>
- Fluent 2 component usage guidance example (behavior/content/layout/accessibility): <https://fluent2.microsoft.design/components/web/react/core/infolabel/usage>
