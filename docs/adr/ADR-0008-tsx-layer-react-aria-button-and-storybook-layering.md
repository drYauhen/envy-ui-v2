# ADR-0008: TSX Layer (React Aria) Button v1 and Storybook Layering

**Status:** Accepted  
**Date:** 2025-12-16  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  

**Related ADRs:**  
- [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation  
- [ADR-0004](./ADR-0004-context-aware-ui-components-and-projection-model.md) — Context-Aware UI Components and Projection Model  
- [ADR-0005](./ADR-0005-canonical-ui-namespace-and-button-v1-baseline.md) — Canonical UI Namespace and Button v1 Baseline  
- [ADR-0006](./ADR-0006-focus-policy-architecture.md) — Focus Policy Architecture  
- [ADR-0007](./ADR-0007-focus-token-separation-and-policy-mapping.md) — Focus Token Separation and Policy Mapping  

---

## 1. Decision Summary

This ADR records the initial implementation of the **TSX component layer** for Envy UI v2.

Decisions:

1. The first TSX baseline component is **`Button`**, implemented with **React Aria hooks** and **custom rendering**.
2. I start with **meta-packages** (`react-aria`, `react-stately`) rather than granular packages; granular adoption is deferred.
3. The component API is **DOM-blessed** (e.g. `disabled`, `onClick`) while also supporting React Aria interaction (`onPress`) for future migration.
4. The TSX layer preserves the existing CSS contract (`class="eui-button"` + `data-eui-*` axes) and additionally exposes optional `data-eui-*` interaction state attributes so CSS can remain independent.
5. Storybook is layered and sorted as: **Tokens → CSS → TSX**, with TSX further grouped under **TSX/React Aria/** to keep accessibility engines swappable in the future.

---

## 2. Problem Statement / Context

Button v1 existed as a CSS-driven baseline rendered via raw HTML in Storybook.

I need a TSX component layer that:

- uses React Aria as a headless accessibility engine (per ADR-0001),
- keeps the token/CSS layer independent of implementation details,
- preserves the context-aware projection model (ADR-0004) by continuing to rely on external context (`data-eui-context`) rather than component-internal assumptions,
- can evolve toward granular dependency usage and/or alternative accessibility engines later.

---

## 3. Decision

### 3.1 React Aria integration approach

- Use `react-aria` hooks (`useButton`, `useHover`, `useFocusRing`) to standardize interactions and focus behavior.
- Do not adopt React Spectrum or higher-level prebuilt components.

### 3.2 Dependency strategy

- Install `react-aria` and `react-stately` as meta-packages initially.
- Defer granular packages until I have multiple components and a clearer bundle/ownership boundary.

### 3.3 Component API strategy

- The blessed public API follows DOM conventions (`disabled`, `onClick`, `type`, etc.).
- The component also accepts `onPress` and `isDisabled` to support React Aria semantics and gradual migration.

### 3.4 CSS independence and state signals

The TSX `Button`:

- preserves the existing styling contract:
  - `className="eui-button"`
  - `data-eui-intent`, `data-eui-size`, `data-eui-shape`
- additionally provides optional interaction state attributes:
  - `data-eui-hovered`, `data-eui-pressed`, `data-eui-focused`, `data-eui-focus-visible`

CSS may use pseudo-classes and/or these data attributes; the TSX layer must not require changing the CSS layer.

### 3.5 Storybook organization

Storybook content is organized to keep layers explicit:

- `Tokens/...` — token visualization stories
- `CSS/...` — HTML + CSS reference stories (no TSX components)
- `TSX/React Aria/...` — TSX component stories backed by React Aria

Story order is enforced as: `Tokens` → `CSS` → `TSX`.

---

## 4. Alternatives Considered

1. **Start with granular `@react-aria/*` / `@react-stately/*` immediately**
   - Deferred: correct direction long-term, but slows iteration and increases decision surface area during the first TSX baseline.

2. **Expose only React Aria-style props (`onPress`, `isDisabled`)**
   - Rejected: the system should feel like a normal React component library first; DOM conventions are the current standard for consumers.

3. **Do not emit state data attributes**
   - Rejected: I want the CSS layer to be able to style based on either pseudo-classes or state attrs (and support non-standard rendering contexts later).

---

## 5. Consequences

### Positive

- TSX components gain standardized, accessible behavior without adopting a UI kit.
- CSS remains a stable baseline and reference surface.
- Storybook makes layering explicit and enforces a consistent navigation order.
- TSX stories are grouped under `TSX/React Aria/` to keep room for future alternate accessibility engines.

### Trade-offs

- Supporting both DOM and React Aria interaction props introduces short-term surface area.
- Meta-packages may include more than needed; bundling concerns are deferred.

---

## 6. Non-Goals / Deferred Items

- Switching to granular React Aria packages.
- Adding additional components beyond Button.
- Refactoring CSS to rely exclusively on `data-eui-*` state attributes.
- Build-time generation of TSX component wrappers or token bindings.

---

## 7. Status

Accepted and implemented for the Button v1 TSX baseline + Storybook layering.
