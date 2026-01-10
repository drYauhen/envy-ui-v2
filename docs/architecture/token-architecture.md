# Token Architecture

**Last Updated:** 2026-01-10
**Category:** Reference
**Related ADR:**
- [ADR-0037](./../adr/ADR-0037-canonical-token-architecture-locked.md) — Canonical Token Architecture (Locked)
- [ADR-0017](./../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture (superseded)
- [ADR-0023](./../adr/ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization (superseded)
- [ADR-0036](./../adr/ADR-0036-dtcg-schema-resolution-and-token-architecture.md) — DTCG Schema Resolution
- [Theme Structure Analysis](../theme-structure-analysis.md) — Current Theme Architecture Decisions

---

## Overview

The Envy UI token system is a comprehensive design token architecture that supports multiple contexts (app, website, report) with theme variations, while maintaining DTCG compliance and providing excellent developer experience.

**Key Features:**
- **WCAG 2.2 AA Accessibility Theme** - Built-in high-contrast theme for accessibility compliance
- **Composition-Based Themes** - Holistic theme approach for better maintainability
- **Multi-Context Support** - Independent token structures for different use cases
- **Scoped Accessibility Testing** - A11y testing focused on component content only

## Core Principles

1. **Canonical Resolution Chain** - Primitives → Raw → Semantics → Themes → Components
2. **DTCG Compliance** - Follows Design Tokens Community Group 2025.10 specification
3. **Multi-Context Support** - Independent token structures for different use cases
4. **Zero Literal Leaks** - All literal values live only in primitives
5. **Zero Self-Aliases** - No `x -> {x}` references anywhere in canon
6. **Directory Classification** - Clear separation of canon/knowledge/legacy
7. **Type Safety** - Generated TypeScript types for all tokens
8. **Developer Experience** - Rich tooling, validation, and documentation

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
| `tokens/contexts/**/components.json` | Component contracts | ✅ Included | Canonical |
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

### 5. Components Layer (`tokens/contexts/*/components.json`)

**Component-specific contracts** that reference semantic tokens.

- References semantic layer: `{eui.color.*}`, `{eui.focus.*}`, etc.
- Defines component-specific tokens (button colors, spacing)
- Context-specific variants when needed

## Context Structure

Each context (`app`) contains a complete canonical token structure:

```
tokens/contexts/app/
├── raw/              # Context-namespaced aliases to primitives
├── semantics/        # Meaning-based aliases to raw
├── themes/           # Override-only aliases to semantics
└── components.json   # Component contracts
```

### Context Responsibilities

- **`app`**: Application shell with compact spacing, standard UI patterns
  - **`raw/`**: Context-specific aliases (`eui.app.raw.*`)
  - **`semantics/`**: App-appropriate semantic mappings
  - **`themes/`**: Default + WCAG 2.2 AA accessibility
  - **`components.json`**: Component contracts for app context

## Theme System

Themes provide visual variations within a context using a **composition-based approach** where all theme overrides are contained in single comprehensive files.

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
- **Badge-specific overrides** for all variants (subtle, solid, outline)

### Example Theme Override (Accessibility)
```json
// tokens/contexts/app/themes/accessibility.json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": { "$value": "16px" }  // Larger for accessibility
      }
    },
    "badge": {
      "colors": {
        "neutral": {
          "background": { "$value": "#ffffff" },  // High contrast
          "text": { "$value": "#000000" }         // Black text
        },
        "success": {
          "solid": {
            "background": { "$value": "#006400" }, // Dark green
            "text": { "$value": "#ffffff" }        // White text
          }
        }
      }
    }
  }
}
```

## DTCG Schema Compliance

### Local Schema Implementation

All token files reference a local DTCG 2025.10 compliant schema:

```json
{
  "$schema": "./schemas/dtcg-2025.10-schema.json",
  "eui": {
    // token definitions
  }
}
```

### Schema Features
- ✅ **DTCG 2025.10 Compliant** - Based on official specification
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
npm run tokens:build     # Generate CSS from tokens
npm run tokens:generate-types  # Generate TypeScript types
npm run tokens:full      # Complete token generation pipeline
```

## Context Switching

### CSS Implementation
```css
/* Base context styles */
[data-eui-context="app"] {
  --eui-color-background-base: oklch(100% 0 0);
}

/* Theme overrides */
[data-eui-context="app"][data-eui-theme="dark"] {
  --eui-color-background-base: oklch(15% 0 0);
}
```

### Runtime Switching
```typescript
// Change context/theme at runtime
document.documentElement.setAttribute('data-eui-context', 'website');
document.documentElement.setAttribute('data-eui-theme', 'default');
```

## Multi-Platform Export

### Supported Platforms
- **CSS** - Primary implementation (CSS custom properties)
- **Figma** - Variables export with context+theme modes
- **JavaScript** - Runtime token objects
- **TypeScript** - Type-safe token references

### Figma Integration
Each context exports as separate Figma files:
- `generated/figma/app/variables.tokens.scoped.json`
- `generated/figma/website/variables.tokens.scoped.json`
- `generated/figma/report/variables.tokens.scoped.json`

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

- ✅ **Multi-context architecture** - app/website/report contexts
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

- **[Token Usage Rules](./token-usage-rules.md)** - Enforceable rules for token usage
- **[Token System Tooling](./../tokens/README.md)** - Developer tools and workflows

## Architectural Decision Records

### Current Canonical Architecture
- **[ADR-0037](./../adr/ADR-0037-canonical-token-architecture-locked.md)** - Locked canonical token architecture (current implementation)

### Historical Context & Evolution
- **[ADR-0017](./../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md)** - Initial layered architecture concept (superseded)
- **[ADR-0023](./../adr/ADR-0023-token-organization-context-and-theme-separation.md)** - Context/theme separation (superseded)
- **[ADR-0026](./../adr/ADR-0026-app-default-color-positioning.md)** - App-default positioning (superseded)
- **[ADR-0036](./../adr/ADR-0036-dtcg-schema-resolution-and-token-architecture.md)** - DTCG schema validation implementation
