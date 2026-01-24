# ADR-0038: Canonical Token CSS Output Contract

**Status:** Accepted
**Date:** 2026-01-10
**Last Updated:** 2026-01-10
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0037](ADR-0037-canonical-token-architecture-locked.md) — Canonical Token Architecture (JSON structure)
- [ADR-0024](ADR-0024-css-layer-strategy-context-priority.md) — CSS Layer Strategy (superseded)
- [Component CSS Architecture](../architecture/ARCH-components-001-component-css-architecture.md) — Component CSS Implementation Rules
- [Token Architecture](../architecture/ARCH-tokens-003-token-architecture.md) — Token System Overview
- [CSS Token Output Rules](../architecture/ARCH-tokens-002-css-token-output-rules.md) — Enforcement Rules
- [ADR-0042](ADR-0042-density-axis-defaulting-and-inheritance.md) — Density Axis (Context x Theme x Density)

---

## Context

The token system has been generating CSS with inconsistent patterns:
- Layer declarations without wrapping rules in `@layer { ... }`
- Missing explicit layer order declarations
- Raw-proxy exports in contexts (e.g., `--eui-dimension-* : var(--eui-app-raw-dimension-*)`)
- Component variables in themes (e.g., `--eui-badge-*`, `--eui-button-*`)
- Ambiguous documentation leading to repeated mistakes

This ADR locks the CSS output structure as a normative contract to prevent future generation mistakes and provide a stable reference for all CSS token work.

## Decision

I decided to establish a canonical CSS output contract for token generation that locks the structure, layer strategy, and filtering rules.

### Token CSS Output Structure

Generated Token CSS consists of 4 files in the `generated/css/` directory:

1. **`tokens.css`** - Entrypoint that imports all layers
2. **`tokens.primitives.css`** - Literal values in `@layer eui-primitives`
3. **`tokens.contexts.css`** - Semantic aliases in `@layer eui-contexts`
4. **`tokens.themes.css`** - Theme overrides in `@layer eui-themes`

### Layer Order Declaration (Mandatory)

**tokens.css MUST declare layer order at the top:**

```css
@layer eui-primitives, eui-contexts, eui-themes;
```

This ensures consistent cascade order across all usage contexts.

### Layer Wrapping (Mandatory)

Each file MUST wrap its rules inside the appropriate layer block:

```css
/* tokens.primitives.css */
@layer eui-primitives {
  :root {
    --eui-color-neutral-500: oklch(75% 0 0);
    /* ... all primitive literals */
  }
}

/* tokens.contexts.css */
@layer eui-contexts {
  [data-eui-context="app"] {
    --eui-color-text-primary: var(--eui-color-neutral-900);
    /* ... all semantic aliases */
  }

  /* Optional density overrides (same layer) */
  [data-eui-context][data-eui-density="compact"] {
    --eui-control-height-md: var(--eui-control-density-compact-height-md);
  }
}

/* tokens.themes.css */
@layer eui-themes {
  [data-eui-context="app"][data-eui-theme="accessibility"] {
    --eui-color-text-primary: var(--eui-color-neutral-950);
    /* ... all theme overrides */
  }
}
```

### Raw Layer NOT Materialized

**tokens.contexts.css MUST be semantics-only.** No raw-proxy exports allowed:

```css
/* ❌ FORBIDDEN: Raw-proxy exports */
--eui-dimension-4: var(--eui-app-raw-dimension-4);
--eui-breakpoint-desktop: var(--eui-app-raw-breakpoint-desktop);

/* ✅ ALLOWED: Semantic meaning tokens */
--eui-spacing-md: var(--eui-dimension-4);
--eui-layout-container-maxWidth: var(--eui-breakpoint-desktop);
```

#### Raw Resolution (Context Overrides)

Raw tokens are JSON-only context overrides. When semantics reference `{eui.app.raw.*}`, the generator resolves the raw token value and emits the final primitive reference:

```css
/* ✅ ALLOWED: raw resolved to primitives (no raw CSS variables) */
--eui-typography-textStyle-body-base-fontSize: var(--eui-typography-fontSize-sm);
```

This is how App and Website contexts can diverge (e.g., App base = 14px, Website base = 16px) without exposing raw variables in runtime CSS.

### Themes Override Semantics Only

**tokens.themes.css MUST contain only semantic overrides.** No component variables allowed:

```css
/* ❌ FORBIDDEN: Component variables in themes */
--eui-badge-colors-neutral-background: #ffffff;
--eui-button-focus-ring-color: #000000;

/* ✅ ALLOWED: Semantic meaning overrides */
--eui-color-border-default: var(--eui-color-neutral-700);
--eui-typography-base-fontSize: var(--eui-typography-fontSize-lg);
```

**Density note:** Theme overrides are highest priority for visual identity, but density is orthogonal and resolved independently via `data-eui-density` selectors in the contexts layer (see [ADR-0042](ADR-0042-density-axis-defaulting-and-inheritance.md)).

### Deterministic Output

Token CSS must be stable-sorted by token path (alphabetical) to ensure:
- Reproducible builds across environments
- Minimal diffs in version control
- Consistent output ordering

### Component CSS Layering (Future-Proofing)

**Component CSS Policy (Phase 2 Ready):**

When component CSS is implemented, it will use:
- **`@layer eui-components`** - Component-specific styles
- **Layer Order:** `@layer eui-primitives, eui-contexts, eui-themes, eui-components;`
- **Component CSS Rules:**
  - Map to semantic variables only (`--eui-color-*`, `--eui-focus-*`, etc.)
  - Never contain literal values
  - Use component contract variables when appropriate
  - Added "one component at a time" (no big-bang rollout)

### Container-Driven Component Sizing

Application components are container-driven: size is fixed, typography adapts. Size tokens define height/padding/gap and size-specific typography so geometry stays stable as type changes.

## Rationale

### Why Lock CSS Output Structure

The repeated generation mistakes indicate documentation ambiguity. Establishing a normative contract:
- Prevent future architectural drift in CSS generation
- Provide clear validation rules for automated checking
- Enable reliable tooling and developer expectations
- Support future component CSS layering without conflicts

### Why This Layer Strategy

**Three-Layer Approach:**
- **`eui-primitives`**: Foundation literals (only `:root` selector)
- **`eui-contexts`**: Context-specific semantic mappings
- **`eui-themes`**: Theme overrides (highest priority)

**Benefits:**
- Clear separation of concerns
- Explicit cascade control via `@layer`
- Future-proof for component additions
- Web Components compatible (CSS custom properties penetrate Shadow DOM)

### Why Filter Raw-Proxy and Component Variables

**Raw-Proxy Filtering:**
- Raw layer is internal migration buffer, not user-facing API
- Prevents accidental consumption of implementation details
- Keeps contexts focused on semantic meaning

**Component Variable Filtering:**
- Components belong in their own CSS layer (future phase)
- Prevents theme pollution with component-specific concerns
- Maintains clean separation between design tokens and component implementation

### Why Deterministic Output

Stable sorting ensures:
- Reproducible builds (no environment-specific ordering)
- Clean diffs in version control
- Predictable CSS output for tooling

## Consequences

### Positive

- **Architectural Stability**: Locked CSS output prevents generation mistakes
- **Clear Validation**: Automated rules can enforce the contract
- **Future-Proof**: Component layering policy prevents Phase 2 ambiguity
- **Developer Clarity**: Single source of truth for CSS generation expectations
- **Tooling Support**: Deterministic output enables reliable CSS processing

### Implementation Requirements

**Immediate (CSS Generation):**
- Update `scripts/generate-canonical-css.mjs` to implement all rules
- Add validation in CI to enforce contract compliance
- Update documentation to reference this ADR

**Future (Component CSS):**
- Implement `@layer eui-components` when component CSS is added
- Update layer order declaration: `@layer eui-primitives, eui-contexts, eui-themes, eui-components;`
- Ensure component CSS follows semantic variable mapping rules

### Migration

**Current Implementation:**
- ✅ All rules implemented in `scripts/generate-canonical-css.mjs`
- ✅ CSS generation produces compliant output
- ✅ Storybook integration validated

**Documentation Updates:**
- ✅ [ADR-0024](ADR-0024-css-layer-strategy-context-priority.md) marked as superseded (old layer strategy)
- ✅ Architectural rules added for enforcement
- ✅ Component layering policy documented

### Validation Rules

**Automated Checks:**
- Layer order declaration present in `tokens.css`
- Each CSS file wraps rules in appropriate `@layer { ... }`
- No raw-proxy exports in `tokens.contexts.css`
- No component variables in `tokens.themes.css`
- Tokens sorted deterministically

## Status

**Accepted (Implemented)** - Canonical Token CSS output contract locked and fully operational.

**Implementation Validation:**
- ✅ CSS generation follows all contract rules
- ✅ Layer wrapping implemented correctly
- ✅ Raw-proxy exports filtered from contexts
- ✅ Component variables filtered from themes
- ✅ Deterministic token sorting
- ✅ Storybook integration working
- ✅ Future component layering policy documented

**Documentation Aligned:**
- ✅ ADR-0038 establishes normative CSS output contract
- ✅ [ADR-0024](ADR-0024-css-layer-strategy-context-priority.md) marked as superseded
- ✅ Architectural rules provide enforcement framework
- ✅ Component CSS layering policy prevents future ambiguity

## Examples

### Current CSS Output Structure

```css
/* generated/css/tokens.css */
@layer eui-primitives, eui-contexts, eui-themes;

@import './tokens.primitives.css';
@import './tokens.contexts.css';
@import './tokens.themes.css';

/* generated/css/tokens.primitives.css */
@layer eui-primitives {
  :root {
    --eui-color-neutral-500: oklch(75% 0 0);
    --eui-spacing-md: 16px;
    /* ... all literals */
  }
}

/* generated/css/tokens.contexts.css */
@layer eui-contexts {
  [data-eui-context="app"] {
    --eui-color-text-primary: var(--eui-color-neutral-900);
    --eui-spacing-md: var(--eui-dimension-4);
    /* ... semantic aliases only */
  }
}

/* generated/css/tokens.themes.css */
@layer eui-themes {
  [data-eui-context="app"][data-eui-theme="accessibility"] {
    --eui-color-text-primary: var(--eui-color-neutral-950);
    --eui-typography-base-fontSize: var(--eui-typography-fontSize-lg);
    /* ... semantic overrides only */
  }
}
```

### Future Component CSS (Phase 2)

```css
/* Future: generated/css/tokens.css */
@layer eui-primitives, eui-contexts, eui-themes, eui-components;

@import './tokens.primitives.css';
@import './tokens.contexts.css';
@import './tokens.themes.css';
@import './tokens.components.css';

/* Future: generated/css/tokens.components.css */
@layer eui-components {
  [data-eui-context] .eui-button {
    background: var(--eui-color-brand-primary);
    border: 1px solid var(--eui-color-border-default);
    /* ... maps to semantic variables only */
  }
}
```

## References

**CSS Output Files:**
- `generated/css/tokens.css` - Layer order + imports
- `generated/css/tokens.primitives.css` - `@layer eui-primitives`
- `generated/css/tokens.contexts.css` - `@layer eui-contexts`
- `generated/css/tokens.themes.css` - `@layer eui-themes`

**Layer Priority (Lowest to Highest):**
1. `:root` (implicit, foundation)
2. `@layer eui-primitives` (literal values)
3. `@layer eui-contexts` (semantic aliases)
4. `@layer eui-themes` (theme overrides)
5. `@layer eui-components` (future, component styles)

**Forbidden Patterns:**
- `@layer X;` without wrapping rules in `@layer X { ... }`
- Raw-proxy exports: `--eui-dimension-* : var(--eui-app-raw-dimension-*)`
- Component variables in themes: `--eui-badge-*`, `--eui-button-*`
- Missing `@layer ...` order in entrypoint
- Non-deterministic token ordering

This ADR serves as the authoritative contract for all token CSS generation and establishes the foundation for future component CSS layering.
