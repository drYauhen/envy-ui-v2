# ADR-0007: Focus Token Separation and Policy Mapping

**Status:** Accepted  
**Date:** 2025-12-16  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)

**Related ADRs:**  
- [ADR-0005](./ADR-0005-canonical-ui-namespace-and-reference-component-baseline.md)  
- [ADR-0006](./ADR-0006-focus-policy-architecture.md)

---

## 1. Decision Summary

This ADR defines how **system focus** vs **component-derived focus** is represented in tokens and how the active focus mode is applied at runtime.

- **System focus** tokens are **global** and live under `eui.color.system` and `eui.focus.*`.
- **Component-derived focus** tokens live under the component namespace (e.g. `eui.button.*`).
- Runtime selects the active focus behavior via **system-level policy** (e.g. `data-eui-focus-policy="system"`), without component logic selecting modes.

---

## 2. Problem Statement / Context

Per [ADR-0006](./ADR-0006-focus-policy-architecture.md), keyboard focus behavior must be configurable at the system/application level, and components must not decide the active focus policy.

During initial component implementation work, I needed to:
- make the **system focus color** clearly distinct from component styling
- ensure tokens are placed in the correct conceptual hierarchy (global vs component)
- apply the policy consistently in Storybook and runtime

---

## 3. Decision

### 3.1 Token Placement

**System-level**
- `eui.color.system.focus` — a unique system focus color (intentionally not reused as a brand/semantic component color)
- `eui.focus.ring.color.system` — references `eui.color.system.focus`
- `eui.focus.ring.width.*` — global focus ring widths (already present)

**Component-level (derived)**
- `eui.button.focus.ring.color.derived` — the button’s derived focus ring color (may reference brand/semantic button tokens)

### 3.2 Runtime Mapping

Components render focus using a component-local CSS variable (e.g. `--eui-button-focus-color`) that defaults to the component-derived token.

The system focus policy overrides that variable at a higher level, for example:
- when `data-eui-focus-policy="system"` is active, map `--eui-button-focus-color` to `eui.focus.ring.color.system`

This preserves the separation of responsibilities:
- **components** define derived focus styles and expose tokens
- **system/runtime** selects the active focus policy and applies the mapping

---

## 4. Alternatives Considered

1. **Hardcode system focus color directly in `eui.focus.*`**
   - Rejected: colors belong in `eui.color.*` so they can be reused, audited, and managed consistently.

2. **Store both derived and system focus tokens inside the component namespace**
   - Rejected: system focus must be independent of component intent/styling and globally consistent.

3. **Let components choose policy via props**
   - Rejected: violates [ADR-0006](./ADR-0006-focus-policy-architecture.md) (policy must be system-selected).

---

## 5. Consequences

### Positive
- Clear, auditable token ownership: global vs component.
- Components remain policy-agnostic.
- Easy to roll out system focus across components by extending policy mapping, not rewriting components.

### Trade-offs
- Requires a runtime/policy layer that maps component variables to system tokens.
- Initial setup complexity increases slightly, but scales better as more components are added.

---

## 6. Non-Goals / Deferred Items

- Defining final focus ring offsets, styles, and animation rules.
- Defining multiple policy profiles beyond `"derived"` vs `"system"`.
- Applying the same mapping to all components (Button is the first baseline consumer).

---

## 7. Status

Accepted and implemented for the initial reference component baseline + Storybook policy toggle.
