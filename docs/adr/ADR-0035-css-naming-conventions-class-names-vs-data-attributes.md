# ADR-0035: CSS Naming Conventions - Class Names vs Data Attributes

**Status:** Accepted  
**Date:** 2026-01-07  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**

- [ADR-0016](./ADR-0016-prefix-unification-eui.md) — Prefix Unification to eui
- [ADR-0024](./ADR-0024-css-layer-strategy-context-priority.md) — CSS Layer Strategy for Context Priority

---

## Context

The design system supports multiple contexts (app, website, report) with different themes and requires runtime flexibility for component variants, sizes, and states. Components need clear, predictable naming patterns that:

1. Define structural hierarchy and component identity
2. Enable dynamic configuration without class name manipulation
3. Support multi-tenant theming through context scoping
4. Avoid BEM modifier explosion
5. Provide clear separation between structure and behavior

## Decision

This ADR establishes the use of two complementary CSS naming mechanisms:

**Class Names** (`.eui-component__element`) for:
- Component identity (root element)
- Structural hierarchy using BEM-style elements (`__`)
- Semantic layout zones (header, body, footer)

**Data Attributes** (`[data-eui-*]`) for:
- Visual variants (`data-eui-variant`, `data-eui-intent`, `data-eui-tone`)
- Size options (`data-eui-size="sm|md|lg"`)
- Interactive states (`data-eui-selected`, `data-eui-active`, `data-eui-disabled`)
- Configuration (`data-eui-orientation`, `data-eui-shape`)
- Context scoping (`data-eui-context="app|website|report"`)

**BEM modifiers** with double dashes (`--`) are largely avoided in favor of data attributes, with rare exceptions for structural modifiers (e.g., `.eui-side-nav--collapsed`).

## Rationale

### 1. Separation of Concerns

- **Structure** (classes) is stable and defines what the component IS
- **Behavior** (data attributes) is dynamic and defines how the component BEHAVES
- Clear mental model: identity vs configuration

### 2. Runtime Flexibility

Data attributes can change without class manipulation:

```tsx
// Easy runtime toggle
<Divider orientation={isVertical ? 'vertical' : 'horizontal'} />
// Renders: data-eui-orientation="vertical"

// vs harder with classes
<div className={`eui-divider eui-divider--${orientation}`} />
```

### 3. Multi-Context Theming

All component styles are scoped under `[data-eui-context]`:

```css
[data-eui-context] .eui-button[data-eui-intent="primary"] { ... }
```

This enables app, website, and report contexts to have different styles for the same component variant.

### 4. Cleaner Specificity

Data attributes avoid combinatorial explosion of modifier classes:

```css
/* With data attributes (current pattern) */
.eui-button[data-eui-size="sm"] { }
.eui-button[data-eui-size="md"] { }
.eui-button[data-eui-intent="primary"] { }

/* Without (traditional BEM) */
.eui-button--sm { }
.eui-button--md { }
.eui-button--primary { }
.eui-button--sm.eui-button--primary { } /* Combinatorial explosion! */
```

### 5. Better Developer Experience

- Clear patterns for when to use each approach
- Predictable naming reduces decision fatigue
- Runtime flexibility simplifies component APIs
- Context-aware styling without prop drilling

## Decision Framework: When to Use Each Approach

### Definitions

**Structural Modifier (Class with `--`):**
- Changes the **fundamental layout or DOM structure** of the component
- Affects how child elements are arranged or displayed
- Usually involves significant layout changes (flexbox direction, positioning, visibility of sections)
- **Extremely rare** — only one example in the entire system: `.eui-side-nav--collapsed`

**Configurable Behavior (Data Attribute):**
- Changes **visual appearance** without structural reorganization
- Affects colors, sizes, borders, spacing within existing structure
- Runtime toggle based on props or state
- Can have multiple values or boolean states
- **Default choice** — use this unless you have a clear structural reason

### Decision Criteria

Use **Class Modifier** (`--`) ONLY when ALL of these are true:
1. Changes fundamental layout structure (e.g., sidebar width, flex direction)
2. Affects arrangement or visibility of child elements
3. Not a design system variant (not part of intent/variant/size/tone system)
4. Relatively static (doesn't toggle frequently at runtime)

Use **Data Attribute** when ANY of these are true:
1. Design system variant (intent, variant, size, shape, tone)
2. Interactive state (selected, active, focused, hovered, pressed, disabled)
3. Configuration option (orientation, alignment, position)
4. Frequent runtime changes
5. Part of theming system
6. **Default assumption: use this unless clearly structural**

### React Aria Integration

React Aria provides behavioral state through hooks:
- `useButton()` → `isPressed` state
- `useHover()` → `isHovered` state
- `useFocusRing()` → `isFocused`, `isFocusVisible` states
- `useSelect()` → `isOpen`, `isSelected` states

**Pattern:** Map React Aria state to `data-eui-*` attributes:

```tsx
const { buttonProps, isPressed } = useButton(props, ref);
const { hoverProps, isHovered } = useHover(props);
const { isFocusVisible, focusProps } = useFocusRing();

return (
  <button
    {...mergeProps(buttonProps, hoverProps, focusProps)}
    className="eui-button"  // Structure (stable)
    data-eui-intent={intent}  // Configuration (prop)
    data-eui-pressed={isPressed || undefined}  // State (React Aria)
    data-eui-hovered={isHovered || undefined}  // State (React Aria)
    data-eui-focus-visible={isFocusVisible || undefined}  // State (React Aria)
  />
);
```

### Examples: Structural vs Configurable

#### ✅ Structural Modifier (Class with `--`)

**Example: Side Navigation Collapsed State**

When building a side navigation that significantly changes layout when collapsed:

```tsx
<nav className={isCollapsed ? "eui-side-nav eui-side-nav--collapsed" : "eui-side-nav"}>
  <div className="eui-side-nav__item">
    <span className="eui-side-nav__item-icon">📁</span>
    <span className="eui-side-nav__item-label">Files</span>
  </div>
</nav>
```

```css
/* Base structure */
.eui-side-nav {
  width: 240px;
  display: flex;
  flex-direction: column;
}

.eui-side-nav__item-label {
  display: block;
}

/* Structural modification - changes layout fundamentally */
.eui-side-nav--collapsed {
  width: 48px; /* Significantly different width */
}

.eui-side-nav--collapsed .eui-side-nav__item-label {
  display: none; /* Hides child elements */
}
```

**Why class modifier?**
- Changes fundamental layout (width from 240px to 48px)
- Affects child element visibility (hides labels)
- Structural reorganization of navigation

#### ❌ NOT Structural (Use Data Attribute)

**Example: Button States and Variants**

```tsx
// Design system variants
<Button intent="primary" size="md" />
// Renders: data-eui-intent="primary" data-eui-size="md"

// Interactive states from React Aria
<Button isPressed={true} isHovered={true} />
// Renders: data-eui-pressed="" data-eui-hovered=""
```

```css
/* Visual variants - change appearance, not structure */
[data-eui-context] .eui-button[data-eui-intent="primary"] {
  background: var(--eui-button-primary-background);
}

[data-eui-context] .eui-button[data-eui-size="md"] {
  height: 36px;
  padding: 0 16px;
}

/* Interactive states */
[data-eui-context] .eui-button[data-eui-pressed] {
  transform: scale(0.98);
}
```

**Why data attribute?**
- Visual appearance changes only
- No structural reorganization
- Part of design system variant system
- Frequent runtime changes

#### Edge Case: Divider Orientation

**Question:** Should vertical divider use `.eui-divider--vertical` or `data-eui-orientation="vertical"`?

```tsx
// Current implementation: data attribute ✅
<Divider orientation="vertical" />
// Renders: data-eui-orientation="vertical"
```

```css
/* Horizontal (default) */
[data-eui-context] .eui-divider {
  width: 100%;
  height: 1px;
}

/* Vertical */
[data-eui-context] .eui-divider[data-eui-orientation="vertical"] {
  width: 1px;
  height: 100%;
}
```

**Analysis:**
- Does it change layout? Yes (width/height swap)
- Does it affect child elements? No (divider has no children)
- Is it a configuration option? Yes (orientation is a standard config)
- Is it a design system pattern? Yes (orientation appears in multiple components)
- **Decision: Data attribute ✅** — Configuration option, no child structure changes

### Guidelines for New Components

When building a new component:

1. **Start with data attributes** for ALL variants and states
2. **Use class names** only for component identity and child structure:
   - `.eui-component` — root element
   - `.eui-component__child` — structural children
3. **Only consider `--` modifiers** if you're fundamentally changing layout structure that affects child elements
4. **When in doubt, use data attributes** — it's the safe default

### Attribute Naming Conventions

**Data attributes follow specific patterns:**

- **Variants:** `data-eui-{property}="{value}"`
  - `data-eui-intent="primary|secondary|accent"`
  - `data-eui-variant="solid|outline|subtle"`
  - `data-eui-size="sm|md|lg"`

- **States (boolean):** `data-eui-{state}` (presence = true)
  - `data-eui-selected`
  - `data-eui-disabled`
  - `data-eui-active`

- **States (explicit value):** `data-eui-{state}="{value}"`
  - `data-eui-selected="true"`
  - `data-eui-orientation="vertical"`

**Native HTML/ARIA attributes:**
- Use for semantics: `disabled`, `aria-label`, `aria-expanded`
- Don't duplicate with data attributes if native exists

## Consequences

**Positive:**
- Clear, predictable naming patterns across all components
- Runtime flexibility for dynamic variants and states
- Reduced CSS specificity complexity
- Multi-context theming support
- Better separation of concerns (structure vs behavior)
- Cleaner component APIs (no className manipulation needed)
- Scalable approach for growing component library

**Negative:**
- Slight deviation from pure BEM methodology
- Data attributes less familiar to developers with pure BEM background
- Requires documentation and onboarding for new team members
- Selector specificity slightly different from class-only approach

**Neutral:**
- Pattern already consistently applied throughout codebase
- Documented after implementation (descriptive, not prescriptive)
- Aligned with modern CSS best practices

---

## Guidelines

| Use Case | Mechanism | Example |
|----------|-----------|---------|
| Component identity | Class name | `.eui-button`, `.eui-card` |
| DOM hierarchy | Class with `__` | `.eui-card__header`, `.eui-side-nav__item-icon` |
| Visual variants | Data attribute | `[data-eui-variant="subtle"]` |
| Configuration options | Data attribute | `[data-eui-orientation="vertical"]` |
| Interactive states | Data attribute | `[data-eui-selected]`, `[data-eui-active]` |
| Size options | Data attribute | `[data-eui-size="md"]` |
| Context/theme | Data attribute | `[data-eui-context="app"]` |
| Structural modifiers | Class with `--` (rare) | `.eui-side-nav--collapsed` |

## Examples

### Component Identity & Structure

```css
.eui-button { }                  /* Component identity */
.eui-card__header { }            /* Structural child */
.eui-side-nav__item-icon { }     /* Nested structural element */
```

### Configuration & Behavior

```css
/* Visual variants */
[data-eui-context] .eui-button[data-eui-intent="primary"] { }
[data-eui-context] .eui-badge[data-eui-variant="solid"] { }

/* Size options */
[data-eui-context] .eui-button[data-eui-size="md"] { }

/* Interactive states */
[data-eui-context] .eui-calendar__day[data-eui-selected="true"] { }

/* Configuration */
[data-eui-context] .eui-divider[data-eui-orientation="vertical"] { }
```

### Combined Pattern

```css
/* Structure + Configuration */
[data-eui-context] .eui-divider[data-eui-variant="subtle"] { }
[data-eui-context] .eui-side-nav__item[data-eui-active="true"] { }
[data-eui-context] .eui-calendar__day[data-eui-in-range="true"] { }
```

### Boolean vs Value Attributes

```css
/* Boolean attributes (presence = true) */
[data-eui-selected]
[data-eui-disabled]
[data-eui-expandable]

/* Value attributes (explicit values) */
[data-eui-size="md"]
[data-eui-variant="solid"]
[data-eui-orientation="horizontal"]
```

---

## Notes

**Context Scoping Pattern:**
All component CSS is scoped within `[data-eui-context]` to enable multi-tenant theming as documented in ADR-0017 and ADR-0024.

**Prefix System:**
All components use the `eui` prefix as documented in ADR-0016, ensuring global uniqueness and consistency.

**BEM Exception:**
The only component using traditional BEM `--` modifier is `.eui-side-nav--collapsed`, as this represents a structural state rather than a configurable behavior.
