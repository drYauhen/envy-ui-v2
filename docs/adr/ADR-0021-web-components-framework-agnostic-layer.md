# ADR-0021: Web Components as Framework-Agnostic Implementation Layer

**Status:** Exploratory (Proof-of-Concept Implemented)
**Date:** 2025-01-01
**Last Updated:** 2026-04-15
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0001](ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation
- [ADR-0012](ADR-0012-interactive-components-evolution-layered-architecture-and-contexts.md) — Interactive Components Evolution, Layered Architecture and Contexts
- [ADR-0015](ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model
- [ADR-0017](ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes
- [ADR-0042](ADR-0042-density-axis-defaulting-and-inheritance.md) — Density Axis (Context x Theme x Density)

---
## Context

Envy UI is a token-driven, renderer-agnostic design system.

Active implementation layers include:
- **HTML + CSS** for static baseline rendering
- **TSX Clean** for React/TypeScript rendering without accessibility engine coupling
- **TSX + React Aria** for React rendering with accessibility primitives

To keep design decisions independent from any single framework lifecycle, Envy UI also needs a standards-based runtime layer that can be consumed across framework boundaries.

Web Components provide that layer through browser standards (Custom Elements and Shadow DOM) while preserving token-driven styling.

---
## Decision

I decided to use **Web Components** as an **exploratory implementation layer** in Envy UI.

This decision defines Web Components as:
- A validation layer for renderer-agnostic architecture
- A framework-neutral runtime option (React, Vue, Angular, vanilla JS)
- A standards-based projection of the same token and contract model

This decision does **not** declare Web Components as the default renderer for all components.

### Requirements

1. Components consume existing CSS custom properties (`--eui-*`) without token duplication.
2. Context, theme, and density behavior remains compatible with `[data-eui-context]`, `[data-eui-theme]`, `[data-eui-density]`.
3. Shadow DOM encapsulation must not break token inheritance.
4. Accessibility is implemented with native semantics and WAI-ARIA patterns.
5. Component APIs remain aligned with contract-level semantics used across layers.

### Implementation Approach

- Use **Custom Elements v1** and **Shadow DOM v1**.
- Keep visual styling token-first through CSS variables.
- Read environment configuration from host/ancestor attributes when required.
- Keep event behavior interoperable with host frameworks.

---
## Rationale

### 1) Standards Longevity

Web Components are web-platform standards, not framework-specific abstractions. This reduces coupling to a single UI framework roadmap.

### 2) Token Compatibility

CSS custom properties cascade into Shadow DOM, so the existing token system can be reused directly.

### 3) Architectural Consistency

The decision reinforces renderer-agnostic principles from [ADR-0015](ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md): tokens and contracts remain the source of truth, renderers are projections.

### 4) Interoperability

A Web Components layer enables integration in mixed technology environments and simplifies cross-framework consumption.

### 5) Accessibility Viability

Accessibility can be implemented with native HTML semantics and WAI-ARIA Authoring Practices, without React-specific dependencies.

---
## Consequences

### Benefits

- Confirms token portability across runtimes.
- Adds a framework-neutral distribution path.
- Improves long-term resilience of design-system decisions.
- Supports integration scenarios where React is not the host framework.

### Trade-offs

- Accessibility behavior is implemented manually compared to React Aria helpers.
- Framework integrations may require adapter patterns for props/events.
- Adds maintenance surface for an additional renderer.

---
## Implementation Status

Exploratory implementation is completed for baseline validation:

- `packages/web-components/button/` contains `eui-button` implementation as the initial reference adapter.
- Token-driven styling works through CSS variables in Shadow DOM.
- Context/theme/density model is compatible with Envy UI data attributes.
- Storybook coverage exists under `stories/web-components/`.

Result: Web Components are validated as a viable renderer in the Envy UI architecture; the decision scope targets component families, not only the initial button adapter.

---
## Scope Boundaries

This ADR validates feasibility and architectural fit. It does not, by itself, require:

- Full component-library parity in Web Components
- Immediate migration away from existing TSX layers
- Web Components-first prioritization for all feature work

Any move from exploratory validation to full production parity requires a separate decision.

---
## Future Considerations

If Web Components move beyond exploratory scope, define:

- A parity roadmap per component family
- Accessibility verification matrix per component type
- Performance and SSR strategy (including Declarative Shadow DOM where relevant)
- Versioning and distribution model for framework consumers
