# ADR-0011: Token-Driven Button Contracts (v1, Exploratory)

**Status:** Accepted (Exploratory)  
**Date:** 2025-12-16  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  

**Related:**  
- [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation  
- [ADR-0005](./ADR-0005-canonical-ui-namespace-and-button-v1-baseline.md) — Canonical UI Namespace and Button v1 Baseline  
- [ADR-0008](./ADR-0008-tsx-layer-react-aria-button-and-storybook-layering.md) — TSX Layer (React Aria) Button v1 and Storybook Layering  
- [ADR-0009](./ADR-0009-ave-token-rule-profile-aware-visual-encoding.md) — AVE Token Rule (Profile-Aware Visual Encoding)  
- [ADR-0010](./ADR-0010-button-tsx-react-aria-v2-alpha.md) — Button TSX + React Aria v2 (Alpha)  

---

## 1. Context

- System is token-first; Button tokens already encode semantic axes (intent, size, shape, states).  
- Components historically duplicated token-derived enums/unions manually, causing drift and cognitive overhead.  
- Button v2 highlighted the need for a single semantic contract reusable across implementations (React Aria today, others later).

---

## 2. Decision

I introduce a **custom token → contract generator** that reads DTCG-compatible token JSON and emits TypeScript contracts (literal arrays + union types). For v1 the contract surface is intentionally broad (Graceful Degradation):  
- **Intent, Size, Shape** — from component tokens.  
- **States** — enumerable states from tokens (even if runtime-derived).  
- **Slots** — semantic structure (label, startIcon, endIcon) as static values.  

The generator is component-agnostic (one script, multiple components); Button is the first consumer.

---

## 3. Scope Clarification

What the contract **is**:
- A bridge between tokens and component public API (semantic axes).  
- Technology-agnostic (no React/ARIA/DOM).  
- A single source of truth for what a component can be.

What the contract **is not**:
- Not an implementation, runtime model, or projection layer.  
- Not a replacement for tokens.  
- Not tied to CSS, data-attributes, or hooks.

---

## 4. Alternatives Considered

1) Manual enums in components — rejected (duplication, drift, poor scaling).  
2) Style Dictionary-based contract generation — rejected (value-focused, formatter complexity for semantic contracts).  

---

## 5. Consequences

### Positive
- Eliminates manual union duplication; component API changes become token-driven.  
- Multiple implementations can share a single semantic contract.  
- Clarifies component capability surface early (even if pruned later).

### Trade-offs
- Introduces a custom generator.  
- Broad surface may include items later moved or simplified.  
- Requires discipline to avoid leaking implementation details into contracts.

---

## 6. Implementation Notes (v1)

- Script: `scripts/generate-contracts.ts` (CommonJS).  
- Output: `contracts/button.contract.ts` (generated, deterministic, overwrites).  
- Axes captured for Button: `intent`, `size`, `shape`, `states` (from tokens), `slots` (static semantic).  
- Component usage: `src/ui/button.tsx` imports/exports generated types; manual unions removed.  
- Doc: `contracts/README.md` explains usage, adding components, and axis extension.

---

## 7. Future Work

- Add more components to the generator configuration.  
- Refine contract surface (prune or split axes) based on usage/cognitive load.  
- Align with AVE profile routing when profiles materialize.  
- Improve Storybook/docs to visualize contract axes alongside tokens.

---

## 8. Status

- **Accepted (Exploratory)**. Revisions expected as the system evolves and as more components adopt generated contracts.
