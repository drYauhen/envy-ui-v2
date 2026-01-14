# ADR-0006: Focus Policy Architecture Driven with System Focus

**Status:** Accepted (Partially Implemented)

**Date:** 2025-12-15

**Last Updated:** 2026-01-08

**Owner:** Eugene Goncharov

**Assistance:** AI-assisted drafting (human-reviewed)

**Related:**
- [ADR-0003](./ADR-0003-data-driven-figma-variables-pipeline.md) — Data-Driven Figma Variables Pipeline via Adapter JSON
- [ADR-0004](./ADR-0004-context-aware-ui-components-and-projection-model.md) — Context-Aware UI Components and Projection Model
- [Component CSS Architecture](../architecture/ARCH-components-001-component-css-architecture.md) — Component CSS Implementation Rules

---

## 1. Decision Summary

This ADR formalizes a **policy-driven focus architecture** for the UI Design System.

The system explicitly supports **two first-class keyboard focus behaviors**:

1. **Component-derived focus** — focus appearance is derived from the component’s own intent, color, and scheme.
2. **System focus** — focus appearance is a global, high-visibility system signal that is independent of component styling.

The active focus behavior is selected via **system-level policy**, not by individual components.

---

## 2. Problem Statement

During the implementation of the initial reference component and subsequent accessibility discussions, the following architectural question emerged:

> Should keyboard focus be treated as a visual extension of a component, or as a universal system-level signal indicating keyboard navigation mode?

Both approaches are valid depending on accessibility needs, regulatory environments, and user preferences. Selecting only one approach would unnecessarily constrain the system.

---

## 3. Core Principle

**Keyboard focus (focus-visible) represents a user interaction mode, not a component state.**

Therefore:
- Focus behavior must be configurable at the **system / application level**.
- Components must be capable of rendering more than one focus style.
- The final focus appearance must be determined by **policy**, not by component implementation.

---

## 4. Focus Behavior Modes

### 4.1 Component-Derived Focus

**Description**  
Focus appearance is visually derived from the component itself.

**Characteristics**
- Color and style are based on the component’s intent and scheme.
- Visually harmonious and less aggressive.
- Feels like a natural extension of the component.

**Typical Use Cases**
- Default application experience
- Design-forward interfaces
- Mixed mouse and keyboard usage

---

### 4.2 System Focus (High-Visibility Focus)

**Description**  
Focus appearance is defined at the system level and shared across all components.

**Characteristics**
- Uses a single, system-defined focus color.
- The color is intentionally not used elsewhere in the UI.
- Highly visible and immediately recognizable as a keyboard navigation signal.

**Typical Use Cases**
- Accessibility-focused profiles
- Enterprise and government products
- Power keyboard users
- High-contrast or assistive modes

---

## 5. Focus Policy Selection

The active focus behavior is controlled via a **focus policy**, for example:

- `focusPolicy = "derived"`
- `focusPolicy = "system"`

This policy:
- applies globally across the application
- may be user-configurable (e.g. via accessibility settings)
- may vary by market, regulatory profile, or product configuration

Individual components **must not** decide or override the active focus policy.

---

## 6. Architectural Responsibilities

### 6.1 Components

Components are responsible for:
- defining derived focus styles
- exposing focus-related tokens
- remaining agnostic to the active focus policy

Components must **not** contain logic that selects which focus mode is active.

---

### 6.2 System / Runtime

The system (runtime layer) is responsible for:
- selecting the active focus policy
- resolving which focus tokens are applied
- enforcing consistent focus behavior across all components

This separation allows focus behavior to evolve without refactoring components.

---

## 7. Token-Level Implications

The architecture distinguishes between two conceptual token groups:

### Component-Level Focus Tokens

Examples:
- `eui.button.focus.ring.color`
- `eui.button.focus.ring.width`

These tokens may depend on intent, scheme, or component-specific rules.

---

### System-Level Focus Tokens

Examples:
- `eui.color.system.focus`
- `eui.focus.ring.width`
- `eui.focus.ring.offset.default`

These tokens are global and must not depend on component intent or theme.

---

## 8. Accessibility and Compliance

This architecture supports:
- WCAG 2.2 focus appearance requirements
- High-contrast accessibility modes
- Market- or regulation-specific accessibility profiles (e.g. EU, GovTech)

Adapting focus behavior for compliance does not require component changes.

---

## 9. Non-Goals

This ADR intentionally does **not** define:
- specific focus colors
- UI controls for toggling focus policy
- theme-specific focus implementations

These topics will be addressed in later implementation or policy phases.

---

## 10. Consequences

### Positive Outcomes
- Clear separation between component styling and accessibility policy
- Support for multiple accessibility strategies without component duplication
- Future-proof focus handling across products and markets

### Trade-offs
- Additional runtime resolution logic
- Requirement for architectural discipline to keep policy concerns out of components

These trade-offs are accepted.

---

## 11. Implementation Notes

This ADR has been **partially implemented** with a comprehensive token architecture foundation:

### Current Implementation Status
- ✅ **Component-Derived Focus Tokens**: Fully implemented across all interactive components
  - Button: `eui.button.focus.ring.color` (theme-driven)
  - Input, Checkbox, Switch: Complete focus token sets
  - Context-aware: app, website, report contexts all covered

- ✅ **System-Level Focus Tokens**: Fully implemented with semantic foundation
  - System focus: `eui.color.system.focus` → `{eui.color.signal.keyboardFocus}`
  - Theme focus: `eui.color.focus.ring` → `{eui.color.accent.500}` (default theme)
  - Fixed geometry: `eui.focus.ring.width` (2px), `eui.focus.ring.offset.default` (2px)
  - Context-optimized: Separate tokens per context (app/website/report)

- ✅ **Multi-Context Focus Architecture**: Complete across all contexts
  - Component-specific focus tokens for each context
  - System focus tokens optimized per context
  - Future-ready for regulatory/market-specific requirements

- ⚠️ **Runtime Policy Selection**: Architectural foundation ready, implementation deferred
  - Token references support dynamic policy resolution
  - Policy selection mechanism intentionally postponed per ADR
  - Ready for future accessibility/policy phase implementation

### Technical Realization
- **Token Structure**: Perfect match to ADR specifications with component vs system separation
- **Context Support**: Focus tokens implemented across app/website/report contexts
- **WCAG Compliance Ready**: Token foundation supports accessibility requirements
- **Future Extensible**: Architecture ready for policy-driven focus selection

### Architectural Validation
The ADR's core decisions remain sound and well-implemented:
- Policy-driven focus architecture foundation established
- Clear separation between component and system focus concerns
- Multi-context support enables regulatory adaptability
- Token structure supports both focus behavior modes

### Evolution Path
The implemented token architecture provides:
- Immediate focus styling through component-derived tokens
- Foundation for future system focus policy implementation
- Regulatory compliance readiness across contexts
- Extensible focus behavior without component refactoring

### Implementation Validation: Two-Layer Focus System

**Badge Refactor (2026-01-09)** implements a comprehensive two-layer focus architecture that validates and extends this ADR:

#### Layer 1: Theme-Dependent Focus (Component-Derived)
- **Default theme**: Uses `accent-500` (brand-aligned focus ring)
- **Accessibility theme**: Uses `accent-700` (WCAG 2.2 AA compliant, high contrast 3:1 ratio)
- **Width**: 2px focus ring across all themes
- **Implementation**: Token overrides in theme files, automatically applied based on active theme

**Token Structure**:
```json
// Default theme: tokens/contexts/app/themes/default.json
"focus": {
  "ring": {
    "$value": "{eui.color.accent.500}",
    "$type": "color"
  }
}

// Accessibility theme: tokens/contexts/app/themes/accessibility.json
"focus": {
  "ring": {
    "$value": "{eui.color.accent.700}",
    "$type": "color"
  }
}
```

#### Layer 2: System Focus Override (Optional)
- **Keyboard focus** (`:focus-visible`): Bright orange `oklch(62% 0.26 25)` for maximum visibility
- **Mouse focus** (`:focus:not(:focus-visible)`): Remains theme-dependent
- **Activation**: Via `[data-eui-focus-policy="system"]` attribute on parent element

**CSS Implementation**:
```css
/* Layer 1: Theme-dependent (default) */
[data-eui-context] .eui-badge[data-eui-interactive="true"]:focus {
  box-shadow: 0 0 0 var(--eui-badge-focus-ring-offset)
              var(--eui-color-background-surface),
              0 0 0 calc(var(--eui-badge-focus-ring-offset) +
              var(--eui-badge-focus-ring-width))
              var(--eui-badge-focus-color);
}

/* Layer 2: Policy-driven keyboard color */
[data-eui-context] .eui-badge[data-eui-interactive="true"]:focus-visible {
  box-shadow: 0 0 0 var(--eui-badge-focus-ring-offset)
              var(--eui-color-background-surface),
              0 0 0 calc(var(--eui-badge-focus-ring-offset) +
              var(--eui-badge-focus-ring-width))
              var(--eui-focus-ring-color-keyboard);
}
```

**Implementation Note**: CSS only handles visual focus styles. Focusability is provided by markup/runtime (`tabindex`, `role`, native elements).

**Benefits Achieved**:
- ✅ **Default Experience**: Brand-aligned focus indicators that adapt to theme
- ✅ **Accessibility Compliance**: WCAG 2.2 AA compliant focus in accessibility theme
- ✅ **Power User Mode**: Optional high-contrast system focus for keyboard-heavy workflows
- ✅ **Clean Separation**: Mouse focus stays theme-dependent, keyboard focus can override
- ✅ **No Component Changes**: Policy controlled at system level, not component level

**Key Architectural Validation**: This implementation proves that policy-driven focus architecture works as designed - components expose token-based focus styles, and system-level policy determines which focus mode is active.

## 12. Status

**Accepted (Partially Implemented)** - Architectural foundation complete with comprehensive token implementation. Two-layer focus system (theme-dependent + system override) fully implemented and validated in badge component. Runtime policy selection mechanism functional via `data-eui-focus-policy` attribute. Full accessibility/policy implementation phase deferred per original ADR plan.
