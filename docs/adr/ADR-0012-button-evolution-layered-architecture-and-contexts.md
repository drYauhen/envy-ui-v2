# ADR-0012: Button Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)

**Status:** Proposed (Exploratory)  
**Date:** 2025-12-16  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  

**Related:**  
- [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation  
- [ADR-0005](./ADR-0005-canonical-ui-namespace-and-button-v1-baseline.md) — Canonical UI Namespace and Button v1 Baseline  
- [ADR-0008](./ADR-0008-tsx-layer-react-aria-button-and-storybook-layering.md) — TSX Layer (React Aria) Button v1 and Storybook Layering  
- [ADR-0009](./ADR-0009-ave-token-rule-profile-aware-visual-encoding.md) — AVE Token Rule (Profile-Aware Visual Encoding)  
- [ADR-0010](./ADR-0010-button-tsx-react-aria-v2-alpha.md) — Button TSX + React Aria v2 (Alpha)  
- [ADR-0011](./ADR-0011-token-driven-button-contracts-v1-exploratory.md) — Token-Driven Button Contracts (v1, Exploratory)  

---

## 1. Context and Intent

This ARD captures the current, intentionally messy stage of Button architecture. The system is expanding its semantic surface to learn whether a token-driven, layered approach can support diverse runtimes and compositions without locking into a single base implementation.

---

## 2. Button Beyond a Clickable Element

Button has grown from a simple control into:
- A **semantic action carrier** (primary/secondary intent).  
- A **toggle/selected surface** (persistent application state distinct from press).  
- A **building block** for menus, toolbars, segmented controls, and future composites.

Key separation:
- **Pressed** = interaction/gesture (momentary).  
- **Selected** = application state (persistent).  
Interaction state is not the same as semantic/application state.

---

## 3. Grouped and Stackable Composition

- Grouped buttons are treated as **composition**, not a new component.  
- Positions (single/first/middle/last) and orientations (horizontal/vertical) are expressed in tokens, enabling segmented and stacked patterns.  
- This covers segmented controls, menu-like vertical stacks, and future split-button patterns without hardcoded left/right logic.  
- Current implementation is **incomplete and exploratory**; grouping is a structural language, not finalized mechanics.

---

## 4. Layered Component Architecture (Parallel Siblings)

Layers are siblings, not inheritance:
- **Tokens** — source of truth.  
- **HTML + CSS** — static baseline.  
- **TSX (Clean)** — no accessibility logic; minimal reference.  
- **TSX + React Aria** — behavior/a11y layer.  

Rationale:
- No single “base” layer; duplication is acceptable to validate universality.  
- Parallel stacks demonstrate the design system can project into different runtimes/frameworks.  
- React Aria is not assumed to be canonical; future stacks (e.g., Radix) remain viable.

---

## 5. Contextual Consumption

The same system is intended for multiple contexts:
- Application UI  
- Generated/static sites  
- Reports/documents  
- Future non-React runtimes

Different layers suit different contexts; the system is intentionally **not tied to one framework/runtime**. Tokens anchor semantics; layers project them for the consuming surface.

---

## 6. Exploratory and Non-Final Nature

- Implementations are intentionally rough; consistency is not the current goal.  
- This phase is about expanding architectural context and observing friction.  
- Future ARDs may supersede or contradict these choices; refactors are expected.  
- Graceful Degradation over premature optimization: start with broader semantics, prune later.

---

## 7. What I'm Trying to Learn

- Can a token-driven model support semantic state (selected) and compositional grouping without entangling behavior?  
- Do parallel layers meaningfully reduce coupling to any single stack (React Aria, etc.)?  
- How much cognitive load do expanded contracts (states, slots, grouping) introduce, and where should they live long-term?

---

## 8. Summary

Button now carries more than “click”: it represents intent, selection, and compositional relationships (grouped/stacked). Parallel layers exist to prove the design system’s universality across runtimes. The current state is exploratory by design; its purpose is to inform future refinements, not to declare a final architecture.
