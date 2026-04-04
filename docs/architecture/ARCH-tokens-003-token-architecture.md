# Token Architecture

**Document ID:** ARCH-tokens-003-token-architecture
**Status:** Draft
**Date:** 2026-01-15
**Last Updated:** 2026-04-04
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Architecture Rules (Binding)
**Related:**


---

## Overview

The Envy UI token system is a comprehensive design token architecture that supports multiple contexts (app, website, report) with theme variations, while maintaining DTCG compliance and providing excellent developer experience. The old `web` name is deprecated and renamed to `website` (legacy artifacts may exist under `tokens/legacy/contexts/web`).

**Key Features:**
- **WCAG 2.2 AA Accessibility Theme** - Built-in high-contrast theme for accessibility compliance
- **Composition-Based Themes** - Holistic theme approach for better maintainability
- **Multi-Context Support** - Independent token structures for app/website/report contexts
- **Website Context** - Canonical context; may temporarily inherit `app` values until specialized tokens are added
- **Density Axis (Optional)** - Ergonomic scale controlled by `data-eui-density` (defaulted when absent)

## Core Principles

1. **Canonical Resolution Chain** - Primitives → Raw → Semantics → Themes → Components
2. **DTCG Compliance** - Follows Design Tokens Community Group [2025](../steps/2025-12-20-step.md).10 specification
3. **Multi-Context Support** - Independent token structures for different use cases
4. **Zero Literal Leaks** - All literal values live only in primitives
5. **Zero Self-Aliases** - No `x -> {x}` references anywhere in canon
6. **Directory Classification** - Clear separation of canon/knowledge/legacy
7. **Type Safety** - Generated TypeScript types for all tokens
8. **Developer Experience** - Rich tooling, validation, and documentation

## Resolver Orchestration (Implemented)

- Resolver documents are the canonical composition contract for active targets.
- Resolver files: `tokens/knowledge/resolver/*.resolver.json`.
- Resolver schema: `schemas/dtcg-resolver-2025.10.schema.json`.
- Canonical build path is SD-first: `npm run tokens:build:canonical` (delegates to `tokens:build:canonical:sd`).
- Resolver validation path:
  - `npm run resolver:validate:schema`
  - `npm run resolver:check`

For operational details, use [WORKFLOW-009](../workflows/WORKFLOW-009-resolver-migration-workflow.md).

## Canonical Token Architecture

**Resolution Chain:**
```
Primitives → Raw → Semantics → Themes → Components
```

### Directory Classification

| Directory | Purpose | Render Pipeline | Status |
|-----------|---------|-----------------|--------|
| `tokens/primitives/` | Literal source of truth | ✅ Included | Canonical |
| `tokens/contexts/**/raw/` | Context namespaced aliases | ✅ Included | Canonical |
| `tokens/contexts/**/semantics/` | Meaning-based aliases | ✅ Included | Canonical |
| `tokens/contexts/**/themes/` | Override-only aliases | ✅ Included | Canonical |
| `tokens/components/*.tokens.json` | Component tokens (semantic-only) | ✅ Included (via component CSS generator) | Canonical |
| `tokens/components/*.contract.json` | Component contracts (structure/behavior) | ❌ Not rendered | Canonical |
| `tokens/knowledge/` | Documentation/workflow | ❌ Excluded | Workflow |
| `tokens/legacy/` | Historical quarantine | ❌ Excluded | Legacy |

## Architecture Layers

### 1. Primitives Layer (`tokens/primitives/`)

**Single source of truth for all literal values.** No literals exist anywhere else in the system.

- **Colors** - OKLCH color scales (neutral, brand, accent, status)
- **Typography** - Font families, sizes, weights, line heights, letter spacing
- **Spacing** - Spacing scale in REM units
- **Dimension** - Border widths, sizing values
- **Shape** - Border radius, shadows, borders
- **Layout** - Container constraints, breakpoints
- **Interaction** - Opacity, transitions, z-index, filters

**Example Structure:**
```
tokens/primitives/
├── neutral.json     # OKLCH neutral color scale
├── typography.json  # Font primitives + text properties
├── spacing.json     # Spacing scale
├── dimension.json   # Sizing values
├── border.json      # Border definitions
├── shadow.json      # Shadow definitions
├── opacity.json     # Opacity values
├── transition.json  # Animation definitions
└── z-index.json     # Z-index scale
```

### 2. Raw Layer (`tokens/contexts/*/raw/`)

**Context-namespaced aliases to primitives.** Acts as migration buffer and stable interface.

- Uses context namespace: `eui.app.raw.*`
- Only references primitives: `{eui.typography.fontSize.sm}`
- Provides stable interface for semantic layer
- Allows future migration of truth into contexts

**Example Structure:**
```
tokens/contexts/app/raw/
├── typography.json  # {eui.typography.*} → {eui.app.raw.typography.*}
├── colors.json      # {eui.neutral.*} → {eui.app.raw.color.*}
├── spacing.json     # {eui.spacing.*} → {eui.app.raw.spacing.*}
└── opacity.json     # {eui.opacity.*} → {eui.app.raw.opacity.*}
```

### 3. Semantics Layer (`tokens/contexts/*/semantics/`)

**Meaning-based aliases to raw layer.** Defines semantic purpose, never references primitives directly.

- Only references raw: `{eui.app.raw.*}`
- Human-readable names: `background`, `text`, `border`, `focus`
- Stable interface for components and themes

**Typography Organization:**
```
tokens/contexts/app/semantics/typography/
├── headings.json     # heading.1-6 (6 tokens)
├── titles.json       # title.lg/md/sm (3 tokens)
├── body.json         # body.* + bodyStrong.* (5 tokens)
├── labels.json       # label.* + caption + overline (4 tokens)
├── code.json         # code.base/small (2 tokens)
├── font-size.json    # xs, sm, base, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
├── font-weight.json  # thin-light-normal-medium-semibold-bold-extrabold-black
├── font-family.json  # ui, monospace
├── letter-spacing.json # tighter-tight-normal-wide-wider-widest
├── line-height.json  # tight-snug-normal-relaxed-loose
├── font-style.json   # normal-italic-oblique
├── text-decoration.json # none-underline-line-through
└── text-transform.json # none-uppercase-lowercase-capitalize
```

### 4. Themes Layer (`tokens/contexts/*/themes/`)

**Override-only aliases to semantics.** Never introduces new values, only changes existing ones.

- Only references semantics: `{eui.color.*}`, `{eui.focus.*}`, etc.
- Composable approach: single files with all overrides
- Accessibility theme provides WCAG 2.2 AA compliance

**Example Structure:**
```
tokens/contexts/app/themes/
├── default.json      # Base context theme (minimal overrides)
└── accessibility.json # WCAG 2.2 AA high-contrast theme
```

### 5. Components Layer (`tokens/components/*.tokens.json`)

**Component-specific contracts** that reference semantic tokens.

- References semantic layer: `{eui.color.*}`, `{eui.focus.*}`, etc.
- Defines component-specific tokens (button colors, spacing)
- Context-specific variants when needed

**Contract source of truth:**
- `tokens/components/*.contract.json` define structure/behavior and variable contracts
- Structure CSS is generated from contracts (deterministic, strict by default)

## Context Structure

Each canonical context (`app`, `website`, `report`) contains a complete token structure:

```
tokens/contexts/app/
├── raw/              # Context-namespaced aliases to primitives
├── semantics/        # Meaning-based aliases to raw
├── themes/           # Override-only aliases to semantics

tokens/contexts/website/
├── raw/
├── semantics/
├── themes/
```

### Context Responsibilities

- **`app`**: Application shell with compact spacing, standard UI patterns
  - **`raw/`**: Context-specific aliases (`eui.app.raw.*`)
  - **`semantics/`**: App-appropriate semantic mappings
  - **`themes/`**: Default + WCAG 2.2 AA accessibility
  - **Component tokens**: Live in `tokens/components/*.tokens.json` (semantic-only)

- **`website`**: Generated websites (secondary context)
  - May temporarily inherit `app` semantics until website-specific tokens are defined

- **`report`**: Report/print context (in progress)
  - Use report themes (e.g., print/screen) to express output differences.
  - Component styling for print/report is handled via report context + theme, not `@media print`.
  - `@media print` is reserved for document-level concerns (page breaks, layout, hiding chrome).

## Theme System

Themes provide visual variations within a context using a **composition-based approach** where all theme overrides are contained in single comprehensive files.

## Density Axis (Optional)

Density is a first-class axis alongside context and theme. It is **optional to declare**, but **always resolved** to a default density (see [ADR-0042](../adr/ADR-0042-density-axis-defaulting-and-inheritance.md)).

**Responsibilities:**
- Controls ergonomic scale (sizes, spacing, rhythm)
- Does not change color identity or semantic meaning

**Usage (example):**
```html
<div data-eui-context="app" data-eui-theme="default">
  <!-- default density applied -->
  <div data-eui-density="compact">
    <!-- compact density for this subtree -->
  </div>
</div>
```

### Theme Resolution Order
1. **Foundation** - Base values (OKLCH colors, spacing)
2. **Semantic** - Context-specific defaults
3. **Theme** - Visual identity overrides (composition-based)
4. **Component** - Component-specific overrides

### Current Theme Structure

**Composition Approach:**
```
tokens/contexts/app/themes/
├── default.json          # Default theme (implicit baseline)
└── accessibility.json    # WCAG 2.2 AA compliant high-contrast theme
```

### Accessibility Theme Features

The accessibility theme provides WCAG 2.2 AA compliance with:
- **4.5:1 minimum contrast ratios** for normal text
- **High-contrast color combinations** for all UI elements
- **Semantic color preservation** while ensuring readability
- **Component overrides belong in component tokens** (theme generator filters component prefixes)

### Example Theme Override (Accessibility)
```json
// tokens/contexts/app/themes/accessibility.json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": { "$value": "{eui.typography.fontSize.lg}" }
      }
    },
    "color": {
      "border": {
        "default": { "$value": "{eui.color.neutral.700}" }
      },
      "text": {
        "primary": { "$value": "{eui.color.neutral.900}" }
      }
    }
  }
}
```

## DTCG Schema Compliance

### Local Schema Implementation

All token files reference a local DTCG [2025](../steps/2025-12-20-step.md).10 compliant schema:

```json
{
  "$schema": "./schemas/dtcg-2025.10-schema.json",
  "eui": {
    // token definitions
  }
}
```

### Schema Features
- ✅ **DTCG [2025](../steps/2025-12-20-step.md).10 Compliant** - Based on official specification
- ✅ **Local Validation** - No external dependencies
- ✅ **IDE Support** - JSON schema validation in editors
- ✅ **Future-Proof** - Can be updated when official schema is published

## Token Viewers & Developer Experience

### Enhanced Token Tables

Token viewers display both raw references and resolved values:

- **Reference Column**: `{eui.color.brand.600}` (raw token reference)
- **Resolved Value Column**: `oklch(62% 0.25 25)` (actual computed value)

### Available Viewers
- **TokenRefTable** - Shows references with resolved values
- **TokenLayout** - Visual layout of token categories
- **Spacing Stories** - Interactive spacing scale with resolved values

### Benefits
- ✅ **Transparency** - See actual output values
- ✅ **Debugging** - Understand token resolution
- ✅ **Documentation** - Clear understanding of token behavior

## TypeScript Integration

### Generated Types
```typescript
import { tokenVar, type TokenName } from '@/generated/tsx/tokens.types';

// Type-safe token references
const color = tokenVar('eui-button-primary-background'); // ✅ Type-checked
```

### Runtime Utilities
```typescript
import { getTokenValue, setTokenValue } from '@/utils/tokens';

// Runtime token access
const value = getTokenValue('eui-color-brand-600');
setTokenValue('eui-color-brand-600', 'oklch(70% 0.3 25)');
```

## Validation & Tooling

### Token Validation
```bash
npm run tokens:validate  # Validates token usage in CSS
```

- ✅ Checks for unknown token references
- ✅ Warns about literal values
- ✅ Enforces token usage rules

### VS Code Integration
```bash
npm run tokens:generate-vscode  # Generates autocomplete data
```

- ✅ CSS custom property autocomplete
- ✅ Token descriptions and values
- ✅ Type-safe development

### Build Pipeline
```bash
npm run tokens:build:canonical  # Generate canonical CSS (primitives/contexts/themes)
npm run tokens:validate         # Validate token usage
npm run validate:css-vars       # Validate runtime CSS vars (A/B/C)
npm run tokens:generate-types  # Generate TypeScript types
npm run tokens:full      # Complete token generation pipeline
```

## Context Switching

### CSS Implementation
```css
/* Base context styles (generated output; do not edit) */
[data-eui-context="app"] {
  --eui-color-background-surface: oklch(100% 0 0);
}

/* Theme overrides (generated output; do not edit) */
[data-eui-context="app"][data-eui-theme="accessibility"] {
  --eui-color-background-surface: oklch(100% 0 0);
}

/* Density overrides (generated output or utilities; optional) */
[data-eui-context][data-eui-density="compact"] {
  --eui-control-height-md: var(--eui-control-density-compact-height-md);
}
```

### Runtime Switching
```typescript
// Change context/theme/density at runtime
document.documentElement.setAttribute('data-eui-context', 'app'); // app | website | report
document.documentElement.setAttribute('data-eui-theme', 'default');
document.documentElement.setAttribute('data-eui-density', 'compact'); // default | compact | relaxed
```

## Multi-Platform Export

### Supported Platforms
- **CSS** - Primary implementation (CSS custom properties)
- **Figma** - Variables export with context+theme modes
- **JavaScript** - Runtime token objects
- **TypeScript** - Type-safe token references

### Figma Integration
Each active context exports as separate Figma files:
- `generated/figma/app/variables.tokens.scoped.json`
- `generated/figma/website/variables.tokens.scoped.json`
- `generated/figma/report/variables.tokens.scoped.json`
Website exports are canonical; the old `web` name is legacy-only.

**Density note:** Density is orthogonal to theme. If density variants are exported to Figma, they must be modeled explicitly (not folded into theme modes).

## CSS Token Output

The token system generates canonical CSS that reflects the layered architecture structure. CSS output follows strict contracts to ensure predictable cascade order and prevent architectural violations.

### Generated CSS Structure

**4 Files in `generated/css/`:**
- **`tokens.css`** - Entrypoint with layer order declaration and imports
- **`tokens.primitives.css`** - Literal values in `@layer eui-primitives`
- **`tokens.contexts.css`** - Semantic aliases in `@layer eui-contexts`
- **`tokens.themes.css`** - Theme overrides in `@layer eui-themes`

**Component token CSS in `generated/css/components/`:**
- **`badge.tokens.css`**, **`card.tokens.css`** - Component mapping tokens in `@layer eui-components`

### Layer Order & Wrapping

**Mandatory layer order declaration:**
```css
@layer eui-primitives, eui-contexts, eui-themes, eui-components;
```

**Mandatory layer wrapping:**
```css
/* Each file wraps rules in its layer block */
@layer eui-primitives { :root { /* literals */ } }
@layer eui-contexts {
  [data-eui-context] { /* semantics */ }
  [data-eui-context][data-eui-density] { /* density overrides */ }
}
@layer eui-themes { [data-eui-context][data-eui-theme] { /* overrides */ } }
@layer eui-components { [data-eui-context] .eui-component { /* component tokens */ } }
```

### Content Filtering Rules

- **Raw layer NOT materialized** - No raw-proxy exports in contexts
- **Themes override semantics only** - No component variables in themes
- **Deterministic output** - Tokens sorted alphabetically

### Forbidden Patterns

```css
/* ❌ Raw-proxy exports in contexts */
--eui-dimension-4: var(--eui-app-raw-dimension-4);

/* ❌ Component vars in themes */
--eui-badge-colors-neutral-background: #ffffff;

/* ❌ Missing layer wrapping */
@layer eui-primitives;
:root { /* rules */ }
```

See **[CSS Token Output Rules](ARCH-tokens-002-css-token-output-rules.md)** for complete normative rules and **[ADR-0038](../adr/ADR-0038-canonical-token-css-output-contract.md)** for the authoritative contract.

## Token Usage Rules

### Allowed Patterns
```css
/* ✅ Use token variables directly */
.my-component {
  color: var(--eui-color-text-primary);
  padding: var(--eui-spacing-md);
}
```

### Disallowed Patterns
```css
/* ❌ Avoid literal values */
.my-component {
  color: oklch(100% 0 0);  /* Use tokens instead */
  padding: 16px;           /* Use tokens instead */
}
```

### Exceptions
- Third-party library overrides (documented)
- Temporary gaps (motion, opacity, press translation)

## Maintenance & Evolution

### Adding New Tokens
1. **Foundation tokens** - Add to `tokens/{context}/foundations/`
2. **Semantic tokens** - Add to `tokens/{context}/semantic/`
3. **Component tokens** - Add to `tokens/{context}/components/{component}/`
4. **Regenerate** - Run `npm run tokens:full`

### Context Expansion
1. **Create structure** - Copy existing context structure
2. **Customize tokens** - Override for context-specific needs
3. **Update exports** - Add to build pipeline
4. **Test integration** - Verify across all platforms

### Schema Updates
- Monitor DTCG specification updates
- Update local schema when official version is published
- Maintain backward compatibility during transitions

## Current Implementation Status

- ✅ **Multi-context architecture** - app/website/report contexts (`web` renamed to `website`)
- ✅ **Composition-based themes** - Holistic theme approach with accessibility theme
- ✅ **WCAG 2.2 AA compliance** - Built-in high-contrast accessibility theme
- ✅ **Scoped accessibility testing** - A11y tests focused on component content only
- ✅ **DTCG compliance** - Local schema validation
- ✅ **TypeScript support** - Generated types and utilities
- ✅ **Developer tooling** - Validation, autocomplete, documentation
- ✅ **Platform exports** - CSS, Figma, JavaScript support
- ✅ **Token viewers** - Enhanced with resolved values
- ✅ **Badge accessibility** - Full WCAG compliance for all badge variants

## Related Documentation

- **[Token Usage Rules](ARCH-tokens-004-token-usage-rules.md)** - Enforceable rules for token usage
- **[Token System Tooling](../tokens/TOKENS-001-token-system-tooling.md)** - Developer tools and workflows

## Architectural Decision Records

### Current Canonical Architecture
- **[ADR-0037](../adr/ADR-0037-canonical-token-architecture-locked.md)** - Locked canonical token architecture (current implementation)

### Historical Context & Evolution
- **[ADR-0017](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md)** - Initial layered architecture concept (superseded)
- **[ADR-0023](../adr/ADR-0023-token-organization-context-and-theme-separation.md)** - Context/theme separation (superseded)
- **[ADR-0026](../adr/ADR-0026-app-default-color-positioning.md)** - App-default positioning (superseded)
- **[ADR-0041](../adr/ADR-0041-dtcg-schema-resolution-and-token-architecture.md)** - DTCG schema validation implementation
