# ADR-0006: Focus Policy Architecture Driven with System Focus

**Status:** Accepted  
**Date:** 2025-12-15  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)

**Related ADRs:**  
- ADR-0003 — Context-Aware UI Components and Projection Model  
- ADR-0004 — Canonical UI Namespace and Button v1 Baseline

---

## 1. Decision Summary

This ADR formalizes a **policy-driven focus architecture** for the UI Design System.

The system explicitly supports **two first-class keyboard focus behaviors**:

1. **Component-derived focus** — focus appearance is derived from the component’s own intent, color, and scheme.
2. **System focus** — focus appearance is a global, high-visibility system signal that is independent of component styling.

The active focus behavior is selected via **system-level policy**, not by individual components.

---

## 2. Problem Statement

During the implementation of Button v1 and subsequent accessibility discussions, the following architectural question emerged:

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
- `eui.button.focus.ring.color.derived`
- `eui.button.focus.ring.width.derived`

These tokens may depend on intent, scheme, or component-specific rules.

---

### System-Level Focus Tokens

Examples:
- `eui.focus.ring.color.system`
- `eui.focus.ring.width.accessible`
- `eui.focus.ring.offset.accessible`

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
- final focus ring thickness or offsets
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

## 11. Status

This ADR is accepted as a **conceptual and architectural foundation**.

Implementation is intentionally deferred until a dedicated accessibility or policy phase.
