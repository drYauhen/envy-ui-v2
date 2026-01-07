# Token Architecture

**Last Updated:** 2026-01-07
**Category:** Reference
**Related ADR:**
- [ADR-0017](./../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture
- [ADR-0023](./../adr/ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization
- [ADR-0036](./../adr/ADR-0036-dtcg-schema-resolution-and-token-architecture.md) — DTCG Schema Resolution

---

## Overview

The Envy UI token system is a comprehensive design token architecture that supports multiple contexts (app, website, report) with theme variations, while maintaining DTCG compliance and providing excellent developer experience.

## Core Principles

1. **Layered Architecture** - Foundation → Semantic → Context → Theme → Component
2. **DTCG Compliance** - Follows Design Tokens Community Group 2025.10 specification
3. **Multi-Context Support** - Independent token structures for different use cases
4. **Type Safety** - Generated TypeScript types for all tokens
5. **Developer Experience** - Rich tooling, validation, and documentation

## Architecture Layers

### 1. Foundation Layer (`tokens/{context}/foundations/`)

Base design tokens that are context-neutral within each context:

- **Color** - OKLCH color scales (neutral, brand, accent, status)
- **Typography** - Font families, sizes, weights, line heights
- **Spacing** - Spacing scale in REM units
- **Shape** - Border radius, shadows, borders

**Example Structure:**
```
tokens/app/foundations/
├── colors/
│   ├── neutral.json
│   ├── brand.json
│   └── accent.json
├── typography/
│   ├── font-family.json
│   ├── font-size.json
│   └── font-weight.json
├── spacing.json
└── shadow.json
```

### 2. Semantic Layer (`tokens/{context}/semantic/`)

Meaningful design tokens that reference foundations:

- **Colors** - Background, text, border, focus colors
- **Typography** - Text styles organized by semantic purpose
- **Spacing** - Component spacing patterns

**Typography Organization:**
```
tokens/app/semantic/typography/
├── headings.json     # heading.1-6 (6 tokens)
├── titles.json       # title.lg/md/sm (3 tokens)
├── body.json         # body.* + bodyStrong.* (5 tokens)
├── labels.json       # label.* + caption + overline (4 tokens)
└── code.json         # code.base/small (2 tokens)
```

### 3. Component Layer (`tokens/{context}/components/`)

Component-specific tokens that reference semantic tokens:

- **Button** - Colors, spacing, typography
- **Input** - Colors, spacing, typography
- **Card** - Colors, spacing, shadows

**Example:**
```json
// tokens/app/components/button/colors.json
{
  "eui": {
    "button": {
      "primary": {
        "background": { "$value": "{eui.color.brand.600}" },
        "label": { "$value": "{eui.color.neutral.white}" }
      }
    }
  }
}
```

## Context Structure

Each context (`app`, `website`, `report`) contains a complete, independent token structure:

```
tokens/{context}/
├── foundations/      # Base tokens
├── semantic/         # Semantic mappings
├── components/       # Component tokens
└── themes/           # Theme variations
    ├── default.json
    └── accessibility.json
```

### Context Responsibilities

- **`app`**: Application shell with compact spacing, standard UI patterns
- **`website`**: CMS/website content with relaxed spacing, content-optimized patterns
- **`report`**: Print/report generation with print-safe colors, formal typography

## Theme System

Themes provide visual variations within a context:

### Theme Resolution Order
1. **Foundation** - Base values (OKLCH colors, spacing)
2. **Semantic** - Context-specific defaults
3. **Theme** - Visual identity overrides
4. **Component** - Component-specific overrides

### Example Theme Override
```json
// tokens/app/themes/dark.json
{
  "eui": {
    "color": {
      "background": {
        "base": { "$value": "{eui.color.neutral.900}" }
      },
      "text": {
        "primary": { "$value": "{eui.color.neutral.50}" }
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
- ✅ **Theme system** - Default, dark, accessibility, print themes
- ✅ **DTCG compliance** - Local schema validation
- ✅ **TypeScript support** - Generated types and utilities
- ✅ **Developer tooling** - Validation, autocomplete, documentation
- ✅ **Platform exports** - CSS, Figma, JavaScript support
- ✅ **Token viewers** - Enhanced with resolved values

## Related Documentation

- **[Token Usage Rules](./token-usage-rules.md)** - Enforceable rules for token usage
- **[Token System Tooling](./../tokens/README.md)** - Developer tools and workflows
- **[ADR-0017](./../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md)** - Architectural foundation
- **[ADR-0036](./../adr/ADR-0036-dtcg-schema-resolution-and-token-architecture.md)** - Recent improvements