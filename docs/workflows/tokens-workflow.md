# Tokens Workflow

Complete guide to working with design tokens in Envy UI v2.

## Overview

Design tokens are the foundational layer of the system. All other layers (components, CSS, Figma Variables, etc.) are derived from tokens through explicit generative pipelines.

## Token Structure

The token system is organized by context. Each context has its own complete token structure:

```
tokens/
  ├── app/              # Application context - complete token structure
  │   ├── foundations/  # Base tokens (OKLCH colors, spacing, typography)
  │   ├── semantic/     # Semantic tokens (text, background, border, focus)
  │   ├── components/   # Component tokens (button, card, input, etc.)
  │   └── themes/       # Theme overrides (default, accessibility)
  ├── website/          # Website context - complete token structure
  │   ├── foundations/  # Base tokens for website
  │   ├── semantic/     # Semantic tokens for website
  │   ├── components/    # Component tokens for website
  │   └── themes/       # Theme overrides (default, dark)
  └── report/           # Report context - complete token structure
      ├── foundations/  # Base tokens for reports
      ├── semantic/     # Semantic tokens for reports
      ├── components/   # Component tokens for reports
      └── themes/       # Theme overrides (print, screen)
```

Each context is fully independent with its own foundations, semantic, and component tokens. This ensures complete separation and avoids cross-context dependencies.

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

1. **Determine context and layer:**
   - **Context**: Which context does this token belong to? (app, website, report)
   - **Layer within context**:
     - Foundation: Base values (colors, spacing, typography)
     - Semantic: Named meanings (text.primary, background.base)
     - Theme: Visual identity overrides (default, dark, accessibility)
     - Component: Component-specific (button.colors.background.primary)

2. **Create/update JSON file in the appropriate context directory:**
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
   
   **Example locations:**
   - Foundation token: `tokens/app/foundations/colors/accent.json`
   - Semantic token: `tokens/app/semantic/colors/text.json`
   - Theme token: `tokens/app/themes/default.json`
   - Component token: `tokens/app/components/button/colors.json`

3. **Build tokens:**
   ```bash
   npm run tokens:build
   ```

4. **Verify output:**
   - Check `generated/css/tokens.css`
   - Check context-specific Figma files: `generated/figma/{context}/variables.tokens.scoped.json`
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
- Figma adapter (`generated/figma/adapter/variables.adapter.json`) - legacy
- Figma tokens per context:
  - `generated/figma/app/variables.tokens.scoped.json`
  - `generated/figma/website/variables.tokens.scoped.json`
  - `generated/figma/report/variables.tokens.scoped.json`
- General Figma tokens (`generated/figma/tokens/variables.tokens.scoped.json`) - all contexts
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

### Context Structure

Each context has its own complete token structure. Contexts are fully independent:

- **`app`** - Application context (compact, 14px base)
  - Location: `tokens/app/`
  - Contains: foundations, semantic, components, themes
  - Themes: default, accessibility

- **`website`** - Website context (relaxed, 16px base)
  - Location: `tokens/website/`
  - Contains: foundations, semantic, components, themes
  - Themes: default, dark

- **`report`** - Report context (print-optimized, 12px base)
  - Location: `tokens/report/`
  - Contains: foundations, semantic, components, themes
  - Themes: print, screen

### Foundation Tokens

Foundation tokens define base values within each context:

```json
// tokens/app/foundations/typography/font-size.json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": {
          "$value": "14px",
          "$type": "dimension"
        }
      }
    }
  }
}
```

### Semantic Tokens

Semantic tokens define named meanings within each context:

```json
// tokens/app/semantic/colors/text.json
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

### Theme Tokens

Theme tokens define visual identity overrides within a context:

```json
// tokens/website/themes/dark.json
{
  "eui": {
    "color": {
      "text": {
        "primary": {
          "$value": "{eui.color.neutral.white}",
          "$type": "color"
        }
      }
    }
  }
}
```

**Available themes per context:**
- **app**: default, accessibility
- **website**: default, dark
- **report**: print, screen

## Component Tokens

Component tokens define component-specific values within each context:

```json
// tokens/app/components/button/colors.json
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

**Note:** Component tokens are context-specific. Each context has its own component tokens in `tokens/{context}/components/`.

## Related Documentation

- [ADR-0017: Layered Token Architecture](./../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md)
- [ADR-0023: Token Organization - Context and Theme Separation](./../adr/ADR-0023-token-organization-context-and-theme-separation.md)
- [Token Usage Rules](./../architecture/token-usage-rules.md)
- [Token System Tooling](./../tokens/README.md) - Developer tools for working with tokens
- [Token Utilities Use Cases](./../tokens/use-cases.md) - Practical examples for AI agents and developers
- [Token Reference](./../tokens/reference.md) - Complete token reference (auto-generated)

