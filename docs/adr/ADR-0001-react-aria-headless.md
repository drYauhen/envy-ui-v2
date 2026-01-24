# ADR-0001: React Aria as Headless Accessibility Foundation

**Status:** Accepted
**Date:** 2025-12-15
**Last Updated:** 2026-01-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0002](ADR-0002-data-driven-storybook-pipeline.md) — Data-Driven Storybook Pipeline via Style Dictionary

---

## Purpose of This Document

This document captures an **architectural intention** for how React Aria is used in Envy UI.

Goals:

* preserve key architectural decisions,
* prevent loss of context over time,
* provide a reference for future work and for coding agents.

This is **not an API specification** and **not an implementation guide**. It is a record of intent and chosen direction.

---

## Core Position

**I use React Aria as an accessibility engine for Envy UI, not as a UI kit.**

I deliberately:

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

Envy UI follows modern industry practice:

* accessibility and interaction logic via **headless primitives**,
* fully custom rendering and DOM structure,
* visual styling driven entirely by Envy UI tokens.

React Aria is a strong fit for this model.

---

## What I Use From React Aria

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

* DOM structure is defined by Envy UI,
* semantics may be extended or adapted when necessary,
* visual presentation is fully controlled by the design system.

---

## What I Explicitly Do NOT Use

### High-Level React Aria Components

I explicitly do **not** use:

* `Table`
* `Calendar`
* `DatePicker`
* `ComboBox`

Reasoning:

* these components implement fixed semantic models,
* they do not fit complex, domain-specific structures (Grid, TreeGrid, expandable rows, mixed content).

---

### React Spectrum

I do **not** use React Spectrum components. Envy UI has its own design language, token system, and semantic models, and Spectrum’s prebuilt components would conflict with those decisions.

---

## Component Layering in Envy UI

Envy UI implements a **multi-tier component architecture** with different implementation strategies for different use cases.  
The **primary token rendering layer is HTML + CSS**. That layer is the canonical baseline and is valid for server-rendered and non-JS contexts (e.g., report generation).

### Tier 0: HTML + CSS (Canonical Token Rendering)

**Purpose**: Primary token surface and baseline visual semantics
**Implementation**: Semantic HTML + CSS using Envy UI tokens
**Examples**: Static layouts, documentation, server-rendered UI, foundational component styling

**Characteristics**:
* Token-driven styling without runtime dependencies
* Semantic HTML with ARIA where applicable
* Serves as the visual source of truth for higher tiers
* Supports SSR and static rendering scenarios

### Tier 1: TSX (Clean) Components

**Purpose**: Basic, lightweight components for simple use cases
**Implementation**: React wrappers over semantic HTML + CSS
**Examples**: Simple buttons, basic form inputs, layout components

**Characteristics**:
* No external dependencies beyond React
* Semantic HTML with ARIA attributes
* CSS-driven styling with Envy UI tokens
* Fast, lightweight, and reliable

---

### Tier 2: TSX + React Aria Components

**Purpose**: Accessible, interactive components requiring complex interaction patterns
**Implementation**: React Aria hooks with custom DOM structure and Envy UI styling
**Examples**: Select dropdowns, complex form controls, advanced navigation

**Characteristics**:
* React Aria hooks for accessibility and interaction
* Custom DOM structure optimized for Envy UI design language
* Full keyboard navigation and screen reader support
* Consistent behavior across browsers and devices

#### Low-Level Components (React Aria)

Examples:
* Button (with keyboard/focus management)
* Checkbox, Radio, Switch
* TextField, TextArea
* Focus management utilities

Implementation:
* `useButton`, `useCheckbox`, `useFocusRing` hooks
* Envy UI tokens for visual styling
* Custom accessibility enhancements

#### Mid-Level Components (React Aria)

Examples:
* Select, MultiSelect, SearchableSelect
* Menu, Dropdown
* Popover, Dialog
* ListBox, ComboBox

Implementation:
* Composition of React Aria pattern primitives (`useListBox`, `useMenu`)
* Custom DOM structure and semantics
* Extended accessibility features when needed

---

### Tier 3: Web Components

**Purpose**: Framework-agnostic, reusable components
**Implementation**: Web Components API with shadow DOM
**Examples**: Cross-framework UI primitives

**Characteristics**:
* No React dependency
* Shadow DOM encapsulation
* Framework-agnostic API
* Experimental/proof-of-concept status

---

### Implementation Strategy by Component Type

All components start with **HTML + CSS** as the canonical token-rendering baseline.  
The table below describes which higher tiers are primary for interactive behavior.

| Component Type | HTML + CSS (Canonical) | TSX (Clean) | TSX + React Aria | Web Components |
|---|---|---|---|---|
| Simple Button | ✅ Baseline | ✅ Primary | ✅ Advanced interactions | ✅ Cross-framework |
| Basic Input | ✅ Baseline | ✅ Primary | ✅ Complex validation | ❌ Not applicable |
| Select Dropdown | ✅ Baseline (static) | ❌ Limited | ✅ Primary | ✅ Cross-framework |
| Data Table | ✅ Baseline (static) | ❌ Limited | ✅ Primary | ❌ Complex |
| Layout Components | ✅ Baseline | ✅ Primary | ❌ Not needed | ❌ Not applicable |

---

## Relationship to Envy UI Tokens

Envy UI tokens define:

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

> **Envy UI adopts React Aria as a headless accessibility foundation.**
> **Only low-level and pattern-level primitives are used.**
> **All high-level components are custom-built and domain-specific.**

---

## Status

* Document type: **Intention / Architecture Decision**
* Status: **Accepted (current iteration)**
* Subject to refinement as Envy UI evolves

---

## Notes

This document should:

* be revisited when architectural changes are proposed,
* be used as shared context for coding agents,
* be updated deliberately when strategy changes, rather than rewritten ad hoc.
