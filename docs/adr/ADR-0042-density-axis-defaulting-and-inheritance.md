# ADR-0042: Density Axis (Context x Theme x Density)

**Status:** Accepted (Partially Implemented)
**Date:** 2026-02-05
**Last Updated:**
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0004](ADR-0004-context-aware-ui-components-and-projection-model.md) — Context-Aware UI Components and Projection Model
- [ADR-0037](ADR-0037-canonical-token-architecture-locked.md) — Canonical Token Architecture
- [ADR-0038](ADR-0038-canonical-token-css-output-contract.md) — Canonical Token CSS Output Contract
- [Token Architecture](../architecture/ARCH-tokens-003-token-architecture.md) — Token System Overview
- [Component CSS Architecture](../architecture/ARCH-components-001-component-css-architecture.md) — Component CSS Implementation Rules

---

## Context

The system already treats **Context** and **Theme** as orthogonal axes. The system also includes a third axis: **Density** (`data-eui-density="..."`) to control ergonomic scale (sizes, spacing, rhythm) without changing component semantics or visual identity.

Density is required for:
- Desktop application ergonomics (compact vs comfortable layouts)
- Report/print outputs (denser defaults)
- UI-driven modes (presentation vs archive)
- Nested containers that need local density overrides

Density must be formalized as a first-class axis with deterministic defaulting and inheritance. It is **optional to declare**, but **always resolved**.

---

## Decision

I decided to introduce **Density** as a first-class, orthogonal axis alongside Context and Theme.

**Axis model:** `Context x Theme x Density`

**Key rule:** `data-eui-density` is optional. If it is not present, the system applies a deterministic default density.

### Defaulting Model (Required)

1. **Global baseline density** exists (default/comfortable).
2. **Context defaults may override** the global baseline (e.g., report defaults to compact).
3. **Explicit `data-eui-density` always wins** within its subtree.

**Absence of the attribute is semantically equivalent to the resolved default density.**

### Inheritance & Nesting (Required)

All three axes are inheritable and independently overridable:
- Each axis is resolved by the **closest ancestor** that declares it.
- Overriding one axis does **not** reset the others.
- Nested contexts may inherit the outer theme and density unless overridden.

**Example (HTML):**
```html
<div data-eui-context="app" data-eui-theme="default">
  <!-- Density defaults to the app baseline -->
  <button class="eui-button">Default density</button>

  <div data-eui-density="compact">
    <!-- Only density changes here -->
    <button class="eui-button">Compact density</button>
  </div>
</div>
```

---

## Axis Responsibilities and Non-Goals

### Context
- **Responsibility:** Defines environment semantics (app/website/report).
- **May define defaults:** including default density.
- **Non-goals:** Must not encode theme identity or density overrides.

### Theme
- **Responsibility:** Visual identity (colors, surfaces, contrast, brand).
- **Non-goals:** Must not encode density or ergonomic scale changes.

### Density
- **Responsibility:** Ergonomic scale & rhythm (sizes, spacing, compactness).
- **Non-goals:** Must not change brand/semantic color identity or component meaning.

---

## Token Resolution Model (Conceptual)

Density influences only **density-aware categories** and must remain orthogonal to theme:

**Density-aware token categories:**
- spacing & gaps
- control sizes (height, padding, hit targets)
- layout rhythm (field spacing, row spacing)
- optionally typography scale/line-height where compactness is required

**Density-agnostic token categories:**
- color (brand/semantic/contrast)
- semantic meaning tokens (text/background role assignment)
- status meanings (success/warning/error semantics)

**Layering concept (unchanged):**
```
Primitives → Raw → Semantics → Themes → Components
```

Density introduces **override mapping** at the semantic layer (or adjacent utilities) without changing the canonical token chain. In practice this means:
- density-specific aliases live in the context semantics domain, and
- a density selector swaps the effective semantic values (no new component contracts).

---

## Migration & Impact Notes

**Expected impacted token groups:**
- control sizes (buttons, inputs, toggles)
- spacing/rhythm (form layouts, tables, lists)
- layout densities (rows, padding, gaps)

**Expected impacted components:**
- inputs, buttons, selects, checkboxes, toggles
- tables, list rows, data grids
- form layouts and field groups

**Non-impact by default:**
Existing behavior remains unchanged when `data-eui-density` is not specified.

**Phased migration:**
1. **Documentation & ADR alignment** (this ADR)
2. **Token coverage** (density-aware tokens with defaults)
3. **Component adoption** (use semantic density tokens, no API changes)

---

## Consequences

### Positive
- Clear third axis without overloading theme or context
- Deterministic defaulting and inheritance
- Local overrides are predictable and composable
- No component API changes required

### Trade-offs
- More axis complexity to reason about
- Requires discipline to keep theme and density responsibilities separate

---

## Notes

Density is **optional to declare**, but **mandatory in resolution**. The system always resolves a density even when the attribute is absent. This keeps defaults deterministic and prevents hidden “undefined density” states.
