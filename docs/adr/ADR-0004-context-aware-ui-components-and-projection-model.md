# ADR-0004: Context-Aware UI Components and Projection Model

**Status:** Accepted (Conceptual)  
**Date:** 2025-12-15  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)

**Related:**

* [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation
* [ADR-0002](./ADR-0002-data-driven-storybook-pipeline.md) — Data-Driven Storybook Pipeline via Style Dictionary
* [ADR-0003](./ADR-0003-data-driven-figma-variables-pipeline.md) — Data-Driven Figma Variables Pipeline via Adapter JSON

---

## 1. Decision Statement

I adopt a **context-aware projection model** for UI components, where:

* UI components (e.g. Button, Card) are **semantic invariants**.
* Visual appearance is a **projection** determined by rendering context and scheme.
* Context is an explicit, first-class axis, separate from intent, theme, and state.

A single component definition must be renderable in multiple contexts (application UI, generated website, report/print preview) **simultaneously**, without duplication of components or design systems.

---

## 2. Motivation

The application includes multiple UI surfaces:

* Interactive application UI
* Generated websites (site previews)
* Generated reports (print / PDF-oriented documents)

These surfaces may coexist within a single screen (e.g. application UI embedding both website and report previews).

While components remain semantically identical (e.g. a "Primary Button"), their **visual representation and interaction affordances must differ** depending on the surface in which they are rendered.

Creating separate design systems per surface would lead to:

* Semantic drift between components
* Duplicated accessibility logic
* Increased maintenance and AI-generation complexity
* Loss of conceptual continuity across the system

---

## 3. Key Architectural Insight

> **Components are invariant. Context defines projection.**

A Button is always a Button.

Differences between an application button, a website button, and a report button are **not differences in the component itself**, but differences in how the component is *projected* into a given rendering context.

---

## 4. Axis Separation (Critical)

The system explicitly separates the following concerns:

| Axis      | Responsibility                                       |
| --------- | ---------------------------------------------------- |
| Component | What the thing is (Button, Card, Input)              |
| Intent    | Why it exists (primary, secondary, danger)           |
| Context   | Where it is rendered (app, site, report)             |
| Scheme    | How it is styled (light, dark, high-contrast, print) |
| State     | How it reacts (hover, active, focus, disabled)       |

No axis may encode responsibilities of another axis.

---

## 5. Context Definition

**Context** represents the rendering environment and interaction expectations.

Initial conceptual contexts include:

* `app` – interactive application UI
* `site` – generated website preview
* `report` – printable / static document (PDF / HTML)

Contexts are **orthogonal** to themes and schemes.

A dark theme applied to an application UI does not imply the same styling rules as a dark theme applied to a generated website or report.

---

## 6. Context Assignment Model

Context is applied **externally**, not on the component itself.

Example:

```html
<div data-eui-context="app">
  <button class="eui-button" data-eui-intent="primary">Submit</button>
</div>

<div data-eui-context="site">
  <button class="eui-button" data-eui-intent="primary">Submit</button>
</div>
```

This allows:

* Multiple contexts on the same screen
* Identical component markup across contexts
* Context-aware projection without component duplication

---

## 7. Projection Model

Rendering follows a layered projection pipeline:

```
Component
  → Intent
    → Context
      → Scheme
        → Resolved Tokens
          → CSS / Platform Output
```

Context influences:

* Presence or absence of interaction affordances (hover, focus)
* Use of elevation, borders, shadows
* Density and layout constraints
* Print-safe or interactive-safe styling

Context does **not** change component semantics or intent.

---

## 8. Relationship to Accessibility

Accessibility behavior is preserved at the component level via headless logic (React Aria).

Context may:

* Suppress non-applicable interaction states (e.g. hover in print)
* Alter visual emphasis (e.g. stronger focus in application UI)

Context does **not** disable accessibility semantics.

---

## 9. Relationship to Data-Driven and Generative UI

This model aligns with data-driven and generative systems because:

* Component markup is declarative and self-describing
* Context is machine-readable and externally applied
* AI systems can reason about *what* a component is independently from *where* it is rendered

This avoids brittle inference based on class names or duplicated component variants.

---

## 10. Consequences

### Positive

* Single semantic component model across all surfaces
* No duplication of design systems
* Clear reasoning model for humans and machines
* Supports side-by-side rendering of multiple contexts
* Enables future expansion (new contexts, schemes) without refactoring components

### Trade-offs

* Requires early conceptual discipline
* Introduces an additional axis (context) to reason about
* Initial implementation complexity is slightly higher

These trade-offs are accepted as necessary for long-term scalability.

---

## 11. Non-Goals (for this ADR)

This decision does **not** define:

* Exact token values for non-app contexts
* Print-specific layout rules
* Dark theme mathematics
* Figma synchronization mechanics

These concerns are deferred to future ADRs once sufficient component coverage exists.

---

## 12. Rationale for Early Fixation

This ADR is intentionally created **before full implementation**.

The decision represents a foundational conceptual constraint. Failing to establish it early would risk architectural drift that would be expensive or impossible to correct later.

Future ADRs may revise or refine this model based on implementation experience; such revisions should be compared explicitly against this document.

---

## 13. Status

Accepted as a **conceptual foundation** for ongoing implementation.
