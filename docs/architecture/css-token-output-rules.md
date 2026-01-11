# CSS Token Output Rules

**Last Updated:** 2026-01-10
**Category:** Reference
**Related ADR:**
- [ADR-0038](../adr/ADR-0038-canonical-token-css-output-contract.md) — Canonical Token CSS Output Contract
- [Token Usage Rules](./token-usage-rules.md) — Runtime token usage rules
- [Component CSS Architecture](./component-css-architecture.md) — Component CSS implementation

---

## Overview

These are the normative MUST-level rules for CSS token output generation. They are enforceable invariants that prevent architectural violations and ensure consistent, predictable CSS generation.

## Core Output Structure

### Generated Files (MUST)

Token CSS is generated as 4 files in `generated/css/`:

1. **`tokens.css`** - Entrypoint with layer order declaration and imports
2. **`tokens.primitives.css`** - Literal values in `@layer eui-primitives`
3. **`tokens.contexts.css`** - Semantic aliases in `@layer eui-contexts`
4. **`tokens.themes.css`** - Theme overrides in `@layer eui-themes`

### Layer Order Declaration (MUST)

**tokens.css MUST declare layer order at the top:**

```css
@layer eui-primitives, eui-contexts, eui-themes;
```

**Rationale:** Ensures consistent cascade order across all usage contexts.

### Layer Wrapping (MUST)

**Each CSS file MUST wrap rules in its layer block:**

```css
/* tokens.primitives.css - MUST */
@layer eui-primitives {
  :root {
    --eui-color-neutral-500: oklch(75% 0 0);
  }
}

/* tokens.contexts.css - MUST */
@layer eui-contexts {
  [data-eui-context="app"] {
    --eui-color-text-primary: var(--eui-color-neutral-900);
  }
}

/* tokens.themes.css - MUST */
@layer eui-themes {
  [data-eui-context="app"][data-eui-theme="accessibility"] {
    --eui-color-text-primary: var(--eui-color-neutral-950);
  }
}
```

**Rationale:** CSS `@layer` requires rules to be inside layer blocks for proper cascade control.

## Content Filtering Rules

### Raw Layer NOT Materialized (MUST)

**tokens.contexts.css MUST be semantics-only.** No raw-proxy exports allowed:

```css
/* ❌ FORBIDDEN */
--eui-dimension-4: var(--eui-app-raw-dimension-4);
--eui-breakpoint-desktop: var(--eui-app-raw-breakpoint-desktop);
--eui-shadow-default: var(--eui-app-raw-shadow-default);

/* ✅ ALLOWED */
--eui-spacing-md: var(--eui-dimension-4);
--eui-layout-container-maxWidth: var(--eui-breakpoint-desktop);
--eui-shadow-default: var(--eui-app-raw-shadow-default);
```

**Filtered Prefixes:**
- `dimension-*`, `breakpoint-*`, `spacing-*`, `z-*`, `transition-*`
- `radius-*`, `shadow-*`, `opacity-*`, `filter-*`, `border-width-*`

**Rationale:** Raw layer is internal migration buffer, not user-facing API.

### Themes Override Semantics Only (MUST)

**tokens.themes.css MUST contain only semantic overrides.** No component variables allowed:

```css
/* ❌ FORBIDDEN */
--eui-badge-colors-neutral-background: #ffffff;
--eui-button-focus-ring-color-derived-base: #000000;
--eui-calendar-colors-day-border-default: #cccccc;

/* ✅ ALLOWED */
--eui-color-border-default: var(--eui-color-neutral-700);
--eui-typography-base-fontSize: var(--eui-typography-fontSize-lg);
--eui-color-background-muted: var(--eui-color-neutral-200);
```

**Filtered Component Prefixes:**
- `badge-*`, `button-*`, `calendar-*`, `card-*`, `checkbox-*`
- `input-*`, `radio-*`, `select-*`, `switch-*`, `tabs-*`
- `textarea-*`, `tooltip-*`, `dialog-*`, `dropdown-*`, `menu-*`
- `navigation-*`, `sidebar-*`, `table-*`, `toast-*`, `combobox-*`
- `listbox-*`, `option-*`, `progressbar-*`, `scrollbar-*`
- `separator-*`, `slider-*`, `spinbutton-*`, `tabpanel-*`
- `textbox-*`, `tree-*`, `treeitem-*`, `group-*`, `radiogroup-*`
- `tablist-*`, `grid-*`, `gridcell-*`, `columnheader-*`, `row-*`
- `rowheader-*`, `cell-*`, `link-*`, `heading-*`, `img-*`
- `list-*`, `listitem-*`, `term-*`, `definition-*`

**Rationale:** Components belong in their own CSS layer; prevents theme pollution.

## Output Determinism (MUST)

**Token CSS MUST be stable-sorted by token path (alphabetical):**

```css
/* ✅ CORRECT - alphabetical ordering */
--eui-color-border-default: var(--eui-color-neutral-300);
--eui-color-border-strong: var(--eui-color-neutral-800);
--eui-color-text-primary: var(--eui-color-neutral-900);

/* ❌ WRONG - arbitrary ordering */
--eui-color-text-primary: var(--eui-color-neutral-900);
--eui-color-border-default: var(--eui-color-neutral-300);
```

**Rationale:** Ensures reproducible builds and clean version control diffs.

## Forbidden Patterns

### Layer Declaration Violations

```css
/* ❌ FORBIDDEN: @layer without wrapping */
@layer eui-primitives;
:root {
  --eui-color-neutral-500: oklch(75% 0 0);
}

/* ❌ FORBIDDEN: Missing layer order */
@import './tokens.primitives.css';
@import './tokens.contexts.css';
@import './tokens.themes.css';

/* ❌ FORBIDDEN: Wrong layer order */
@layer eui-themes, eui-contexts, eui-primitives;
```

### Content Inclusion Violations

```css
/* ❌ FORBIDDEN: Raw-proxy in contexts */
@layer eui-contexts {
  [data-eui-context="app"] {
    --eui-dimension-4: var(--eui-app-raw-dimension-4);
  }
}

/* ❌ FORBIDDEN: Component vars in themes */
@layer eui-themes {
  [data-eui-context="app"][data-eui-theme="accessibility"] {
    --eui-badge-colors-neutral-background: #ffffff;
  }
}
```

### Selector Violations

```css
/* ❌ FORBIDDEN: Wrong selector in primitives */
@layer eui-primitives {
  [data-eui-context="app"] {  /* Should be :root */
    --eui-color-neutral-500: oklch(75% 0 0);
  }
}

/* ❌ FORBIDDEN: Wrong selector in contexts */
@layer eui-contexts {
  :root {  /* Should be [data-eui-context="..."] */
    --eui-color-text-primary: var(--eui-color-neutral-900);
  }
}
```

## Future Component CSS Layering

### Component Layer Structure (Phase 2 Ready)

**When component CSS is implemented:**

```css
/* tokens.css - Updated layer order */
@layer eui-primitives, eui-contexts, eui-themes, eui-components;

/* tokens.components.css */
@layer eui-components {
  [data-eui-context] .eui-button {
    background: var(--eui-color-brand-primary);
    border: 1px solid var(--eui-color-border-default);
  }
}
```

### Component CSS Rules (Normative)

1. **MUST use `@layer eui-components`**
2. **MUST map to semantic variables only** (`--eui-color-*`, `--eui-focus-*`, etc.)
3. **MUST NOT contain literal values**
4. **MAY use component contract variables** when appropriate
5. **MUST be added "one component at a time"** (no big-bang rollout)

**Rationale:** Prevents ambiguity for Phase 2 component CSS implementation.

## Validation & Enforcement

### Automated Checks (MUST)

**CI/CD validation MUST include:**
- ✅ Layer order declaration present in `tokens.css`
- ✅ Each CSS file wraps rules in appropriate `@layer { ... }`
- ✅ No raw-proxy exports in `tokens.contexts.css`
- ✅ No component variables in `tokens.themes.css`
- ✅ Tokens sorted deterministically

### Manual Review Requirements

**Code review MUST verify:**
- CSS generation script implements all filtering rules
- No exceptions granted without ADR approval
- Documentation stays synchronized with implementation

## Implementation Reference

### Current CSS Generation

Located in: `scripts/generate-canonical-css.mjs`

**Key Functions:**
- `generatePrimitivesCSS()` - Creates `@layer eui-primitives`
- `generateContextsCSS()` - Creates `@layer eui-contexts` (filtered)
- `generateThemesCSS()` - Creates `@layer eui-themes` (filtered)
- `generateEntrypointCSS()` - Creates layer order declaration

### Token Processing

**Raw Reference Preservation:**
```javascript
// Converts {eui.color.neutral.300} → var(--eui-color-neutral-300)
const preserveReference = (value) => {
  if (value.startsWith('{') && value.endsWith('}')) {
    const ref = value.slice(1, -1).split('.').join('-');
    return `var(--${ref})`;
  }
  return value;
};
```

**Content Filtering:**
```javascript
// Contexts: Remove raw-proxy exports
const semanticTokens = tokens.filter(({ name }) => {
  return !(
    name.startsWith('dimension-') ||
    name.startsWith('breakpoint-') ||
    // ... other raw prefixes
  );
});

// Themes: Remove component variables
const semanticTokens = tokens.filter(({ name }) => {
  const componentPrefixes = ['badge-', 'button-', /* ... */];
  return !componentPrefixes.some(prefix => name.includes(prefix));
});
```

## Migration Notes

### From Previous Patterns

**Old Issues (Now Forbidden):**
- `@layer eui-primitives;` without wrapping rules
- Raw-proxy exports in contexts: `--eui-dimension-* : var(--eui-app-raw-dimension-*)`
- Component variables in themes: `--eui-badge-*`, `--eui-button-*`
- Missing layer order declarations
- Non-deterministic token ordering

**Migration Complete:**
- ✅ All CSS generation updated to follow new contract
- ✅ ADR-0024 marked as superseded
- ✅ Documentation aligned with implementation
- ✅ Validation rules implemented

## Related Documentation

- **[ADR-0038](../adr/ADR-0038-canonical-token-css-output-contract.md)** - Authoritative contract definition
- **[Token Usage Rules](./token-usage-rules.md)** - Runtime usage patterns
- **[Component CSS Architecture](./component-css-architecture.md)** - Component implementation rules

---

**Enforcement Level:** MUST (no exceptions without ADR approval)
**Last Reviewed:** 2026-01-10
**Implementation:** `scripts/generate-canonical-css.mjs`
