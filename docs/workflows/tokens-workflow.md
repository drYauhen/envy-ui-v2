# Tokens Workflow

Complete guide to working with design tokens in Envy UI v2.

## Overview

Design tokens are the foundational layer of the system. All other layers (components, CSS, Figma Variables, etc.) are derived from tokens through explicit generative pipelines.

## Token Structure

```
tokens/
  ├── foundations/      # Base tokens (OKLCH colors, spacing, typography)
  ├── semantic/         # Semantic tokens (text, background, border, focus)
  ├── contexts/         # Context-specific overrides (app, website, report)
  ├── themes/           # Theme-specific overrides (default, dark, accessibility)
  └── components/       # Component tokens (button, card, input, etc.)
```

## Token Resolution Order

```
Foundation Tokens
  ↓
Semantic Tokens
  ↓
Context Tokens
  ↓
Theme Tokens
  ↓
Component Tokens
```

Each layer can override values from previous layers.

## Working with Tokens

### Adding a New Token

1. **Determine layer:**
   - Foundation: Base values (colors, spacing, typography)
   - Semantic: Named meanings (text.primary, background.base)
   - Context: Environment-specific (app, website, report)
   - Theme: Visual identity (default, dark, accessibility)
   - Component: Component-specific (button.colors.background.primary)

2. **Create/update JSON file:**
   ```json
   {
     "eui": {
       "color": {
         "new-token": {
           "$value": "oklch(50% 0.15 250)",
           "$type": "color",
           "$description": "Description of the token"
         }
       }
     }
   }
   ```

3. **Build tokens:**
   ```bash
   npm run tokens:build
   ```

4. **Verify output:**
   - Check `generated/css/tokens.css`
   - Check `generated/figma/tokens/variables.tokens.scoped.json`
   - Check other platform outputs

### Changing Token Structure

1. **Create snapshot (if using Figma):**
   - See [Figma Workflow](./figma-workflow.md) for details

2. **Make changes:**
   - Edit token JSON files
   - Rename paths if needed
   - Update references

3. **Build tokens:**
   ```bash
   npm run tokens:build
   ```

4. **Analyze changes (if using Figma):**
   ```bash
   npm run figma:analyze
   ```

5. **Update components:**
   - Update component implementations if needed
   - Update CSS if needed

### Token Types

**Colors:**
- Format: OKLCH (e.g., `oklch(50% 0.15 250)`)
- Converted to RGB for CSS and Figma

**Spacing:**
- Format: Pixels or rem (e.g., `8px`, `1rem`)

**Typography:**
- Font size, weight, line height, etc.

**Dimensions:**
- Width, height, border radius, etc.

## Building Tokens

### Full Build

```bash
npm run tokens:build
```

**Generates:**
- CSS variables (`generated/css/tokens.css`)
- JavaScript tokens (`generated/js/tokens.js`)
- Figma adapter (`generated/figma/adapter/variables.adapter.json`)
- Figma tokens (`generated/figma/tokens/variables.tokens.scoped.json`)
- TypeScript contracts (`generated/tsx/*.contract.ts`)
- Storybook colors (`generated/storybook/colors.json`)

### Watch Mode

```bash
npm run tokens:watch
```

**Automatically rebuilds** when token files change.

## Token References

Tokens can reference other tokens:

```json
{
  "eui": {
    "color": {
      "text": {
        "primary": {
          "$value": "{eui.color.brand.700}",
          "$type": "color"
        }
      }
    }
  }
}
```

**Reference syntax:**
- `{eui.color.brand.700}` - Reference to another token
- Resolved during build process

## Context and Theme Tokens

### Context Tokens

Context tokens define environment-specific defaults:

```json
// tokens/contexts/app.json
{
  "eui": {
    "fontSize": {
      "$value": "14px"
    }
  }
}
```

**Contexts:**
- `app` - Application context (compact, 14px)
- `website` - Website context (relaxed, 16px)
- `report` - Report context (print-optimized, 12px)

### Theme Tokens

Theme tokens define visual identity:

```json
// tokens/themes/website/dark.json
{
  "eui": {
    "color": {
      "text": {
        "primary": {
          "$value": "{eui.color.neutral.white}"
        }
      }
    }
  }
}
```

**Themes:**
- `default` - Default theme
- `dark` - Dark theme
- `accessibility` - Accessibility theme

## Component Tokens

Component tokens define component-specific values:

```json
// tokens/components/button/colors.json
{
  "eui": {
    "button": {
      "colors": {
        "background": {
          "primary": {
            "$value": "{eui.color.brand.700}",
            "$type": "color"
          }
        }
      }
    }
  }
}
```

## Related Documentation

- [ADR-0017: Layered Token Architecture](./../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md)
- [ADR-0023: Token Organization - Context and Theme Separation](./../adr/ADR-0023-token-organization-context-and-theme-separation.md)
- [Token Usage Rules](./../architecture/token-usage-rules.md)

