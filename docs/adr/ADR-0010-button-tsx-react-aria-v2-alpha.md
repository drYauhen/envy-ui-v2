# ADR-0010: Button TSX + React Aria v2 (Alpha)

**Status:** Accepted (Alpha)  
**Date:** 2025-12-16  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  

**Related:**  
- ADR-0001 — React Aria as Headless Accessibility Foundation  
- ADR-0005 — Canonical UI Namespace and Button v1 Baseline  
- ADR-0008 — TSX Layer (React Aria) Button v1 and Storybook Layering  
- ADR-0009 — AVE Token Rule (Profile-Aware Visual Encoding)  

---

## 1. Context

- The token + CSS layer for Button is established and used as the visual contract.  
- I need an accessibility-first TSX implementation that consumes the token/CSS contract without encoding visuals.  
- A single “smart” Button should cover application usage (button, link, proxy/asChild) while old/new systems coexist.  
- This ADR captures the architecture for Button TSX + React Aria v2 (alpha) to evaluate complexity, ergonomics, and composability.

---

## 2. Decision

### A. Button as an Interactive Surface
- Not just a `<button>` wrapper; provides behavior, semantics, and host-flexible rendering.

### B. Behavior Engine: React Aria
- Uses React Aria hooks for keyboard interaction, focus-visible, press semantics, and disabled handling.

### C. Visual Boundary
- TSX encodes **no visual values** (no colors/sizes/radii).  
- Styling is via a single base class (`ui-button`) plus data-* attributes; visuals remain in tokens/CSS.

### D. Composition Model (Orthogonal Axes)
- Axes: **intent × size × shape**.  
- No compound variants or cross-axis overrides (composition over variants).

### E. Host Model (3 modes)
1. Default button host: `<button>` (supports `type=button|submit|reset`).  
2. Link host: `<a>` when `href` is provided (`target`/`rel` pass-through).  
3. Proxy/slot host: `asChild` opt-in; behavior/ARIA/data attributes are merged onto a single child element (warnings if misused).  
- `href + asChild` warns if child is non-anchor-like; forms default to `<button>`.

### F. State Mapping Contract (CSS Interface)
- Axes: `data-intent`, `data-size`, `data-shape` (also `data-ui-*` for legacy compatibility).  
- States: `data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`, `data-loading` (plus `data-ui-*` parallels).  
- One base class: `ui-button`.

### G. Loading Semantics
- `isLoading` blocks press, sets `aria-busy="true"`, and sets `data-loading`.  
- Loading is a state flag only; visuals are CSS-driven.

---

## 3. Alternatives Considered

- Simple `<button>`-only component.  
- Separate components (Button, LinkButton, CardButton) instead of one host-flexible component.  
- Class-based variant styling (class variants) instead of data-attribute contract.  
- Non–React Aria approach (manual keyboard/focus/press handling).

---

## 4. Consequences

### Pros
- Accessibility and consistent interaction via React Aria.  
- Single component covers button/link/proxy cases; composable axes (intent/size/shape).  
- Future-proof for profile-aware visual routing (AVE rule) without visual leakage in TSX.

### Cons / Trade-offs
- Larger API surface and host-mode branching.  
- Requires CSS discipline to rely on data-attributes.  
- asChild adds edge-case handling (warnings, ref/host constraints).

---

## 5. Implementation Notes (Alpha)

- Code: `src/ui/button.tsx` — host-flexible React Aria button with axes/states surfaced via data-attributes; no visual tokens inside TSX.  
- Stories: `stories/tsx/react-aria/button.stories.tsx` — demonstrates default button, link host, `asChild` proxy, loading + icons, and keyboard focus.  
- Icons: optional `startIcon`/`endIcon` slots wrapped in data-marked spans; no styling imposed.  
- Edge cases deferred: stricter `asChild` validation, richer link-child semantics, and removal of legacy `data-ui-*` once CSS is updated.

---

## 6. Future Work

- Potential split into simpler wrappers (e.g., SimpleButton, LinkButton) if ergonomics require.  
- Align component tokens with profile routing (AVE) when profiles are introduced.  
- Storybook polish (surface size/shape visually via CSS) and stricter asChild host validation.  
- Evaluate API ergonomics after broader usage; adjust prop surface accordingly.
