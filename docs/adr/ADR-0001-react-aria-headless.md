# Envy UI v2 — React Aria Usage Intention

## Purpose of This Document

This document captures an **architectural intention** for how React Aria is used in Envy UI v2.

Goals:

* preserve key architectural decisions,
* prevent loss of context over time,
* provide a shared reference for future discussions and for coding agents.

This is **not an API specification** and **not an implementation guide**. It is a record of intent and agreed direction.

---

## Core Position

**Envy UI v2 uses React Aria as an accessibility engine, not as a UI kit.**

We deliberately:

* do not use React Spectrum,
* do not use React Aria high-level components (Table, Calendar, etc.),
* use only those React Aria parts that replace or standardize browser-native behavior.

---

## Problem Statement

### Browser-Native Components Are Inconsistent

Native HTML components (especially `select`, dropdowns, and complex inputs):

* render differently across browsers (Safari, Chrome, Windows),
* have limited and inconsistent styling capabilities,
* behave differently in terms of keyboard and focus handling.

This makes it impossible to build a consistent, scalable design system on top of purely native controls.

---

### Fully Custom Components Are Risky

Fully custom, div-based components:

* often break accessibility,
* require complex keyboard and focus management,
* are expensive to maintain long term.

---

## Chosen Strategy

### Headless Accessibility + Custom Rendering

Envy UI v2 follows modern industry practice:

* accessibility and interaction logic via **headless primitives**,
* fully custom rendering and DOM structure,
* visual styling driven entirely by Envy UI v2 tokens.

React Aria is a strong fit for this model.

---

## What We Use From React Aria

### Level 1 — Low-Level Primitives (Mandatory)

Used as **browser-behavior replacements**:

* `useButton`
* `useCheckbox`
* `useRadio`
* `useSwitch`
* `useTextField`
* `useFocusRing`
* `useHover`
* `usePress`

These provide:

* keyboard navigation,
* focus management,
* screen reader compatibility,
* consistent behavior across browsers.

---

### Level 2 — Pattern Primitives (Selective)

Used selectively as building blocks:

* `useListBox`
* `useMenu`
* `usePopover`
* `useDialog`

Notes:

* DOM structure is defined by Envy UI v2,
* semantics may be extended or adapted when necessary,
* visual presentation is fully controlled by the design system.

---

## What We Explicitly Do NOT Use

### High-Level React Aria Components

We explicitly do **not** use:

* `Table`
* `Calendar`
* `DatePicker`
* `ComboBox`

Reasoning:

* these components implement fixed semantic models,
* they do not fit complex, domain-specific structures (Grid, TreeGrid, expandable rows, mixed content).

---

### React Spectrum

React Spectrum is:

* a complete design system,
* with predefined styles and UX decisions.

Envy UI v2:

* has its own design language,
* its own token system,
* its own semantic models.

Using Spectrum would conflict with these goals.

---

## Component Layering in Envy UI v2

### Low-Level Components

Examples:

* Checkbox
* Radio
* Switch
* Button
* Input / TextField

Implementation:

* React Aria hooks
* Envy UI v2 tokens for styling

---

### Mid-Level Components

Examples:

* Select
* Dropdown
* Menu
* Popover

Implementation:

* composition of React Aria pattern primitives,
* custom DOM structure,
* custom or extended semantics when required.

---

### High-Level Components

Examples:

* Table / Grid
* Tree / TreeGrid
* Calendar-like systems

Implementation:

* fully custom,
* built on top of low-level primitives,
* without React Aria high-level components.

---

## Relationship to Envy UI v2 Tokens

Envy UI v2 tokens define:

* color
* spacing
* focus ring
* hover, active, and disabled states

React Aria provides:

* interaction logic
* accessibility
* keyboard behavior

This separation of responsibilities is intentional.

---

## Formal Intention Statement

> **Envy UI v2 adopts React Aria as a headless accessibility foundation.**
> **Only low-level and pattern-level primitives are used.**
> **All high-level components are custom-built and domain-specific.**

---

## Status

* Document type: **Intention / Architecture Decision**
* Status: **Accepted (current iteration)**
* Subject to refinement as Envy UI v2 evolves

---

## Notes

This document should:

* be revisited when architectural changes are proposed,
* be used as shared context for coding agents,
* be updated deliberately when strategy changes, rather than rewritten ad hoc.
