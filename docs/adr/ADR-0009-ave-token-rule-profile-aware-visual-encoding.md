# ADR-0009: AVE Token Rule — Profile-Aware Visual Encoding

**Status:** Accepted (Architectural Rule)  
**Date:** 2025-12-16  

**Related:**  
- ADR-0005 — Canonical UI Namespace and Button v1 Baseline  
- ADR-0008 — TSX Layer (React Aria) Button v1 and Storybook Layering  

---

## 1. Decision Summary

We adopt the **AVE Token Rule** (Profile-Aware Visual Encoding) as an architectural constraint: component tokens must flow through profile-level base tokens before reaching primitives. Visual appearance is determined by profiles (color, decoration, density), not by component tokens directly referencing primitives.

---

## 2. Context and Intent

- The token system must remain extensible for future themes, decorations, and densities without refactoring components.  
- Current state (v0): only the **default** profile exists per axis; no runtime switching.  
- Components depend on intent; profiles define appearance.

This rule is semantic/architectural, not an immediate implementation mandate.

---

## 3. Core Principle and Routing Rule

**No component token may encode a final visual primitive.**  
Component token → profile base token → primitive.

Example (Decoration / Radius):

```
ui.button.shape.default.radius
  → ui.profile.decorative.default.radius.base
    → 4px
```

Profiles are orthogonal and composable across axes:
- **Color Profile** — palettes, contrast, brand expression  
- **Decoration Profile** — radii, corner softness, style  
- **Density Profile** — sizing, spacing, compactness  

---

## 4. Scope and Current State (v0)

- Single profile per axis: `default`.  
- Components implicitly use `default`.  
- No theme/profile switching UI; no multiple profile files required yet.

---

## 5. Migration Strategy

Two acceptable paths:
- **Option A (Rule First, recommended):** keep existing tokens as-is; apply the routing rule incrementally to new/touched tokens.  
- **Option B (Immediate Alignment):** update existing component tokens to route through `ui.profile.*` for faster clarity, at the cost of upfront effort.

Violations are tolerated temporarily during exploration; treat this rule as lint-level guidance.

---

## 6. Composition Rules (Hard Constraints)

- Axes are orthogonal: intent, size, shape, state, focus, color/decor/density profiles.  
- **No compound or cross-axis overrides** (e.g., no `primarySmallRound`).  
- Each namespace represents a single concern; profiles supply visual resolution.

---

## 7. Consequences

### Positive
- Future themes/profiles can be introduced without component refactors.  
- Enables CMS-style customization and experimentation (rounded vs sharp, compact vs spacious, brand variations).  
- Keeps component tokens semantic and profile-agnostic.

### Trade-offs
- Adds indirection; may feel heavier during early exploration.  
- Requires discipline to route through `ui.profile.*` instead of primitives.

---

## 8. Non-Goals (Now)

- No theme/profile switcher UI.  
- No mandatory multiple profile JSONs yet.  
- No immediate Storybook profile controls.  
- No refactors unless explicitly requested.

---

## 9. Status and Next Steps

Rule is **accepted**. Implementation can follow Option A (incremental) or Option B (immediate alignment) depending on momentum and cleanliness priorities. Future ADRs may define concrete `ui.profile.*` structures and migration steps.
