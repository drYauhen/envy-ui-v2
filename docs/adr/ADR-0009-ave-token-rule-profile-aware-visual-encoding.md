# ADR-0009: AVE Token Rule — Profile-Aware Visual Encoding

**Status:** Accepted (Architectural Rule)
**Date:** 2025-12-16
**Last Updated:** 2026-01-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0005](ADR-0005-canonical-ui-namespace-and-reference-component-baseline.md) — Canonical UI Namespace and Reference Component Baseline
- [ADR-0008](ADR-0008-tsx-layer-react-aria-and-storybook-layering.md) — TSX Layer (React Aria) and Storybook Layering

---

## 1. Decision Summary

I adopt the **AVE Token Rule** (Profile-Aware Visual Encoding) as an architectural constraint: component tokens must flow through profile-level base tokens before reaching primitives. Visual appearance is determined by profiles (color, decoration, density), not by component tokens directly referencing primitives.

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
eui.button.shape.default.radius
  → eui.profile.decorative.default.radius.base
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
- **Option B (Immediate Alignment):** update existing component tokens to route through `eui.profile.*` for faster clarity, at the cost of upfront effort.

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
- Requires discipline to route through `eui.profile.*` instead of primitives.

---

## 8. Non-Goals (Now)

- No theme/profile switcher UI.  
- No mandatory multiple profile JSONs yet.  
- No immediate Storybook profile controls.  
- No refactors unless explicitly requested.

---

## 9. Implementation Notes

This ADR establishes an **architectural rule** that is **accepted but not yet implemented**, following the **Option A (incremental)** migration strategy:

### Current Implementation Status
- ✅ **Architectural Rule Accepted**: AVE Token Rule established as system guidance
- ✅ **Token Structure Foundation**: Orthogonal axes (color/decoration/density) architecturally sound
- ✅ **Migration Strategy Chosen**: Option A (incremental application) actively pursued
- ⚠️ **Profile-Level Tokens**: No `eui.profile.*` tokens exist yet (expected per deferral)
- ⚠️ **Component Token Routing**: Components contain descriptive strings, not profile references (tolerated per ADR)

### Technical Assessment
- **Component Token State**: All current component tokens are "violations" (direct descriptions vs profile routing)
- **Primitive Token Availability**: Complete primitive token library exists in `tokens/primitives/`
- **Future Extensibility**: Token structure enables seamless profile introduction
- **Incremental Progress**: New/changed tokens can adopt AVE rule without system-wide refactor

### Architectural Validation
The AVE Token Rule provides **essential future-proofing**:
- **Theme Independence**: Components won't require refactoring for new visual themes
- **Profile Flexibility**: Color, decoration, density profiles remain orthogonal and composable
- **Semantic Preservation**: Component tokens represent intent, profiles handle visual resolution
- **CMS-Ready**: Enables runtime theme switching and brand customization

### Evolution Path
The rule enables future capabilities without current disruption:
- **Multi-Theme Support**: Different brand palettes without component changes
- **Regulatory Compliance**: Market-specific visual requirements (EU/GovTech accessibility)
- **User Customization**: CMS-style theme switching and personalization
- **Design System Evolution**: A/B testing of visual treatments

## 10. Status and Next Steps

Rule is **accepted as architectural guidance**. Implementation follows **Option A (incremental)** - existing tokens remain as-is while new/changed tokens adopt the AVE routing rule. Profile-level token structures will be defined in future ADRs when theme/profile switching becomes a concrete requirement.
