# ADR-0005: Canonical UI Namespace and Button v1 Baseline

**Status:** Accepted

**Date:** 2025-12-15

**Related:**

* ADR-0001: React Aria as Headless Accessibility Foundation
* ADR-0002/3: Data-Driven Token and Visualization Pipelines
* ADR-0004: Context-Aware UI Components and Projection Model

---

## 1. Decision Summary

This ADR formally records the outcomes of the **Button v1 exploration phase** and the associated **namespacing and layering decisions**.

We confirm:

1. A **single canonical namespace (`ui`)** is used across the system.
2. Semantic tokens and runtime aliases are **logically separated but not namespaced separately**.
3. Button v1 is accepted as a **baseline reference component**, not a final implementation.
4. Context-aware rendering is mandatory, with `app` as the initial explicit context.

This ADR intentionally captures the system state **after partial implementation**, to preserve architectural intent before further iteration.

---

## 2. Problem Statement

During the implementation of Button v1, several foundational questions emerged:

* Should semantic tokens and runtime aliases use separate namespaces?
* How should context, intent, and state be represented without fragmenting the system?
* How can the system remain adaptable to future requirements (themes, regulatory markets, print/PDF output, external embedding)?

These questions required resolution before continuing with further components or automation.

---

## 3. Canonical Namespace Decision

### 3.1 Decision

We adopt **`ui` as the single canonical namespace** for:

* Semantic design tokens
* Runtime CSS variables
* Component APIs
* HTML data attributes
* Documentation and mental model

No separate namespace (e.g. pipeline-only vs runtime-only) is introduced at this stage.

### 3.2 Rationale

* The system is developed and consumed as a **single product**, not a public multi-tenant design system.
* A single namespace reduces cognitive overhead for humans, agents, and generative tooling.
* Namespace separation can be introduced later at the **export/build boundary** if required.

Logical separation is preserved through **token roles and structure**, not naming.

---

## 4. Semantic vs Runtime Layering

Although the namespace is unified, layers are clearly distinguished conceptually:

| Layer           | Responsibility                          |
| --------------- | --------------------------------------- |
| Semantic Tokens | Meaning, intent, and relationships      |
| Runtime Aliases | Resolved values optimized for rendering |
| Components      | Consumption of runtime aliases          |

Rules:

* Semantic tokens must never encode visual math or context-specific logic.
* Runtime aliases may resolve state math and context projections.
* Components consume runtime aliases only.

---

## 5. Button v1 as Baseline

### 5.1 Scope of Button v1

Button v1 includes:

* Intents: `primary`, `secondary`
* Size: `md`
* Shapes: `round`, `circle`
* States: default, hover, active, focus (base + accessible), disabled
* Context: `app`

Button v1 is explicitly treated as:

* a **reference implementation**
* a validation of architectural assumptions
* a foundation for future automation

It is **not** considered production-final.

---

## 6. Context Handling

Context is a **first-class axis**, separate from intent, theme, and state.

* Context is applied externally (e.g. via `data-ui-context="app"`).
* Components do not encode or assume their rendering context.
* Multiple contexts may coexist on a single screen.

This follows the model established in ADR-0003.

---

## 7. Regulatory and Market Considerations

Potential future requirements (e.g. EU/Germany accessibility regulations, print/PDF constraints) are addressed through:

* Context
* Scheme
* Policy profiles

These concerns **do not require new component variants or namespaces**.

The current architecture is considered sufficient to accommodate these scenarios without structural refactoring.

---

## 8. Non-Decisions (Explicitly Deferred)

This ADR does **not** decide:

* Dark/light theme implementation
* Policy profile mechanics
* Build-time generators
* Figma plugin synchronization details
* Additional contexts beyond `app`

These topics will be addressed in future ADRs after further implementation experience.

---

## 9. Consequences

### Positive

* Stable conceptual foundation before scaling
* Reduced complexity for agents and tooling
* Clear separation of concerns without premature abstraction
* Safe continuation toward automation and Figma integration

### Trade-offs

* Some flexibility is postponed to build/export stages
* Requires discipline to maintain logical separation without namespace enforcement

These trade-offs are accepted.

---

## 10. Status and Next Steps

This ADR marks the completion of the **Button v1 baseline phase**.

Next steps (outside the scope of this ADR):

* Review and iterate on Button v1 implementation
* Introduce build-time generation
* Extend component coverage
* Revisit Figma plugin integration

---

**Status:** Accepted as a record of the completed stage and architectural alignment.
