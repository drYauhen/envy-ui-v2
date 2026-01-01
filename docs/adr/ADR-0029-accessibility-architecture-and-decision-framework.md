# ADR-0029: Accessibility Architecture and Decision Framework

**Status:** Accepted  
**Date:** 2025-12-31  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  

- [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation

---

## Context

When building accessible components, questions arise about which ARIA roles and patterns to use, especially when components are composed or extended with additional functionality:

1. **Table with expandable rows:** Should it remain a `table`, or become a `grid` or `treegrid`?
2. **Menu with checkboxes:** Should it remain a `menu`, or become a `listbox`?
3. **Component composition:** How should ARIA roles change when adding interactive elements to static components?

Without a clear decision framework, the system may:
- Use incorrect ARIA roles, breaking accessibility
- Create inconsistent patterns across components
- Misapply React Aria hooks vs. custom implementations

This ADR establishes a decision framework for choosing appropriate ARIA roles and patterns in Envy UI v2.

---

## Decision

I decided to establish a decision framework based on the principle: **ARIA roles should reflect functional purpose, not just visual appearance.**

### Core Principle

**Functional Purpose Over Visual Appearance:** The ARIA role assigned to a component should accurately represent its functional behavior to assistive technologies, ideally reflecting functional purpose rather than just visual presentation.

### Decision Rules

#### 1. Table vs. Grid vs. TreeGrid

| Scenario | ARIA Role | Rationale |
|----------|-----------|-----------|
| Static tabular data (read-only) | `role="table"` or native `<table>` | Standard table semantics |
| Interactive cells (editable, clickable) | `role="grid"` | Grid supports keyboard navigation and cell interaction |
| Expandable/collapsible rows (hierarchical) | `role="treegrid"` | Treegrid combines table structure with tree navigation |

**Guideline:** When a table gains interactive elements (expandable rows, editable cells), the system should consider transitioning from `table` to `grid` or `treegrid` to better reflect its functional purpose.

#### 2. Menu vs. ListBox

| Scenario | ARIA Role | React Aria Hook | Rationale |
|----------|-----------|-----------------|-----------|
| List of actions (click to execute) | `role="menu"` | `useMenu` | Menu represents commands/actions |
| List of selectable items (with checkboxes) | `role="listbox"` | `useSelect` / `useListBox` | Listbox represents selection, not execution |

**Guideline:** When a menu gains checkboxes or selection behavior, it should become a `listbox` rather than remaining a `menu`.

#### 3. Component Composition Guidelines

When composing or extending components, the system should:

1. **Identify functional purpose first:** Consider what the component's primary function is
2. **Choose role accordingly:** Select an ARIA role that aligns with the function
3. **Reassess on composition:** When adding features, evaluate if the role remains appropriate
4. **Follow WAI-ARIA APG patterns:** Leverage established patterns from the Authoring Practices Guide where applicable

### Decision Framework Process

1. **Determine functional purpose:**
   - Is this a data display? → `table`, `grid`, `treegrid`
   - Is this a list of actions? → `menu`
   - Is this a list of selectable items? → `listbox`
   - Is this a form input? → `textbox`, `checkbox`, `radio`, etc.

2. **Assess interactivity:**
   - Static → Semantic HTML or simple ARIA role
   - Interactive → More complex role (grid, listbox, etc.)

3. **Check for composition:**
   - Adding expandable rows to table? → Consider `treegrid`
   - Adding checkboxes to menu? → Consider `listbox`
   - Adding interactive cells to table? → Consider `grid`

4. **Choose React Aria hook (if applicable):**
   - Use low-level primitives for basic components (per ADR-0001)
   - Use pattern primitives selectively for complex patterns (per ADR-0001)
   - Prefer avoiding high-level components (per ADR-0001)

---

## Rationale

### Alignment with WAI-ARIA Specification

The WAI-ARIA specification defines roles based on functional behavior, not visual appearance. Using roles that match functional purpose ensures:

- Screen readers correctly announce component behavior
- Keyboard navigation works as expected
- Users understand component purpose without visual cues

### Consistency with Industry Standards

This framework aligns with:
- WAI-ARIA Authoring Practices Guide patterns
- React Aria's design philosophy (functional semantics)
- Industry best practices (Material Design, Adobe Spectrum, etc.)

### Support for Component Evolution

By reassessing roles when composing components, the framework:
- Prevents accessibility regressions when adding features
- Maintains correct semantics as components evolve
- Enables accessibility-aware design decisions to be made consistently

### Integration with ADR-0001

This framework complements ADR-0001's React Aria strategy:
- Uses React Aria hooks where appropriate (low-level primitives, pattern primitives)
- Prefers avoiding high-level React Aria components (per ADR-0001)
- Supports custom implementations built on primitives

---

## Consequences

### Benefits

**Accessibility Compliance:**
- Components use correct ARIA roles for their functional purpose
- Screen reader users receive accurate information
- Keyboard navigation works correctly

**System Design:**
- Provides clear guidelines for ARIA role selection
- Establishes predictable patterns across components
- Aims to eliminate decision paralysis when implementing components

**Maintainability:**
- Framework supports component evolution
- Prevents accessibility regressions
- Aligns with industry standards

**Consistency:**
- System applies a consistent decision process
- Patterns are consistent across components
- Easier to audit and maintain accessibility

### Trade-offs

**Implementation Considerations:**
- Framework should correctly map component functionality to appropriate ARIA roles
- System would benefit from handling role transitions when components are composed or extended
- Some components may benefit from role changes when composed (handled by framework)
- System should account for functional purpose when selecting appropriate roles
- Complex cases may benefit from custom implementations (built on primitives per ADR-0001)

### Implementation Notes

**Reference Documentation:**
- See [Accessibility Reference](../architecture/accessibility-reference.md) for complete lists of:
  - ARIA roles by category
  - WAI-ARIA APG patterns
  - React Aria hooks
  - Current usage in Envy UI v2

**Future Decisions:**
- This framework can be applied when:
  - Building new components
  - Extending existing components with new features
  - Evaluating React Aria hooks
  - Considering custom implementation vs. React Aria patterns

**Examples:**
- Table with expandable rows → Use `role="treegrid"` with custom implementation (per ADR-0001, no high-level React Aria Table component)
- Menu with checkboxes → Use `role="listbox"` with `useSelect` hook
- Static table → Use native `<table>` or `role="table"`

---

## Notes

This ADR establishes the decision framework. For comprehensive reference material (complete lists of ARIA roles, patterns, React Aria hooks), see the [Accessibility Reference](../architecture/accessibility-reference.md) document.

**Related Patterns:**
- ADR-0001 establishes React Aria as the accessibility engine
- This ADR establishes how to choose ARIA roles and patterns
- Together, they provide complete guidance for accessibility implementation

**Future Enhancements:**
- Consider creating component-specific accessibility guidelines
- Document common patterns (e.g., "How to build an accessible table with expandable rows")
- Create accessibility checklist for new components
