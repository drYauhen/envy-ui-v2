# Color System Architecture Rules

**Last Updated:** 2026-01-09
**Category:** Architecture Rules (Binding)
**Related ADR:**
- [ADR-0014](../adr/ADR-0014-color-model-tonal-scales-and-contextual-architecture.md) — Color Model, Tonal Scales, and Contextual Architecture
- [Token Architecture](./token-architecture.md) — Overall Token System

---

## Overview

This document establishes **binding architectural rules** for the Envy UI color system. It provides decision frameworks and implementation guidance for maintaining consistency across our multi-context, multi-theme color architecture.

**Key Principles:**
- **Base-Colors Pattern** - Source anchors generate full tonal scales programmatically
- **Context Adaptability** - Colors can vary per surface (app/website/report) and theme (default/accessibility/dark)
- **Semantic Organization** - Different patterns for brand/accent vs status vs neutral colors
- **Future-Proof Architecture** - Clean separation enables evolution without breaking changes

## Color Organization Patterns

### Pattern 1: Base-Colors + Generated Scales (Brand/Accent/Status Colors)

**Structure:**
```
tokens/foundations/
├── base-colors/           # ✅ Source anchors
│   └── [color].json      # Single anchor value
└── colors/               # ✅ Generated scales
    └── [color].json      # Full 50-900 scale
```

**When to Use:**
- ✅ **Brand Colors** - Primary brand identity (brand.primary)
- ✅ **Accent Colors** - Interactive elements, secondary actions (accent.primary)
- ✅ **Status Colors** - Semantic feedback (success/warning/error/info)
- ❌ **Neutral Colors** - Use Pattern 2 instead

**Example - Brand Color:**
```json
// tokens/foundations/base-colors/brand.json
{
  "eui": {
    "color": {
      "brand": {
        "primary": { "$value": "oklch(49% 0.10 230)" }
      }
    }
  }
}

// tokens/foundations/colors/brand.json (generated)
{
  "eui": {
    "color": {
      "brand": {
        "50": { "$value": "oklch(98% 0.02 230)" },
        "100": { "$value": "oklch(95% 0.04 230)" },
        // ... full scale generated programmatically
        "700": { "$value": "oklch(49% 0.10 230)" },  // anchor preserved
        "800": { "$value": "oklch(42% 0.12 230)" },
        "900": { "$value": "oklch(35% 0.14 230)" }
      }
    }
  }
}
```

### Pattern 2: Complete Scales (Neutral Colors)

**Structure:**
```
tokens/foundations/colors/
└── neutral.json           # ✅ Complete 50-900 scale
```

**When to Use:**
- ✅ **Neutral Colors** - Grayscales used throughout UI
- ❌ **Brand/Accent Colors** - Use Pattern 1 instead
- ❌ **Status Colors** - Use Pattern 1 instead

**Example - Neutral Color:**
```json
// tokens/foundations/colors/neutral.json
{
  "eui": {
    "color": {
      "neutral": {
        "50": { "$value": "oklch(98% 0.00 0)" },
        "100": { "$value": "oklch(96.5% 0.00 0)" },
        // ... complete scale (no base-color separation)
        "900": { "$value": "oklch(25% 0.00 0)" }
      }
    }
  }
}
```

### Pattern 3: Direct Values (Signal Colors)

**Structure:**
```
tokens/primitives/colors/
└── [color].json           # ✅ Single direct values
```

**When to Use:**
- ✅ **Signal Colors** - Special-purpose, non-scaling colors
- ✅ **Focus Rings** - Keyboard navigation indicators
- ✅ **System Colors** - Platform-specific values

**Example - Signal Color:**
```json
// tokens/primitives/colors/signal.json
{
  "eui": {
    "color": {
      "signal": {
        "keyboardFocus": { "$value": "oklch(62% 0.26 25)" }
      }
    }
  }
}
```

## Decision Framework: Which Pattern to Use?

### Quick Reference Table

| Color Type | Pattern | Base-Colors? | Generated Scale? | Rationale |
|------------|---------|--------------|------------------|-----------|
| **Brand** | 1 | ✅ Yes | ✅ Yes | Primary identity, needs full scale |
| **Accent** | 1 | ✅ Yes | ✅ Yes | Interactive elements, needs full scale |
| **Status** | 1 | ✅ Yes | ✅ Yes | Semantic feedback, needs full scale |
| **Neutral** | 2 | ❌ No | ✅ Yes | Foundational grayscale, stable scale |
| **Signal** | 3 | ❌ No | ❌ No | Special-purpose, single values |

### Detailed Decision Tree

```
New Color System Addition
│
├── Is it a BRAND color? (primary identity)
│   ├── YES → Pattern 1: Base-color + generated scale
│   └── NO → Continue
│
├── Is it an ACCENT color? (interactive/secondary)
│   ├── YES → Pattern 1: Base-color + generated scale
│   └── NO → Continue
│
├── Is it a STATUS color? (success/warning/error/info)
│   ├── YES → Pattern 1: Base-color + generated scale
│   └── NO → Continue
│
├── Is it a NEUTRAL color? (grayscale)
│   ├── YES → Pattern 2: Complete scale only
│   └── NO → Continue
│
└── Is it a SIGNAL color? (special-purpose)
    ├── YES → Pattern 3: Direct values only
    └── NO → Consult architecture team
```

## Implementation Workflows

### Adding a New Brand/Accent Color (Pattern 1)

1. **Create Base-Color Source:**
   ```bash
   # Create tokens/foundations/base-colors/[color].json
   {
     "eui": {
       "color": {
         "[color]": {
           "primary": { "$value": "oklch(X% Y Z)" }
         }
       }
     }
   }
   ```

2. **Generate Full Scale:**
   ```bash
   # Run generation script
   npm run generate-tonal-scale-from-base-[step]-[color].mjs
   ```

3. **Verify Generation:**
   ```bash
   # Check generated tokens/foundations/colors/[color].json
   npm run tokens:build
   ```

4. **Update Component Usage:**
   ```json
   // Reference the generated scale values
   {
     "background": { "$value": "{eui.color.[color].600}" },
     "text": { "$value": "{eui.color.[color].50}" }
   }
   ```

### Adding a New Status Color (Pattern 1)

1. **Determine Semantic Anchor:**
   - Success: 500 step (green hues)
   - Warning: 500 step (yellow/amber hues)
   - Error: 500 step (red hues)
   - Info: 500 step (blue hues)

2. **Create Base-Color:**
   ```json
   // tokens/foundations/base-colors/status-[name].json
   {
     "eui": {
       "color": {
         "status": {
           "[name]": { "$value": "oklch(X% Y Z)" }
         }
       }
     }
   }
   ```

3. **Generate Scale:**
   ```bash
   npm run generate-status-color-scale-from-500.mjs
   ```

4. **Update Status Token File:**
   ```json
   // tokens/foundations/colors/status.json (updated)
   {
     "eui": {
       "color": {
         "status": {
           "[name]": {
             "50": { "$value": "oklch(...)" },
             "100": { "$value": "oklch(...)" },
             // ... full scale
             "500": { "$value": "oklch(X% Y Z)" },  // anchor preserved
             "600": { "$value": "oklch(...)" },
             "700": { "$value": "oklch(...)" }
           }
         }
       }
     }
   }
   ```

### Modifying Existing Colors

#### Changing a Base-Color Anchor

```bash
# 1. Update base-color value
# tokens/foundations/base-colors/[color].json

# 2. Regenerate full scale
npm run generate-tonal-scale-from-base-[step]-[color].mjs

# 3. Verify no breaking changes
npm run tokens:build
npm run storybook:dev
```

#### Changing Color Generation Algorithm

```bash
# 1. Update generation script
# scripts/generate-tonal-scale-from-base-[step]-[color].mjs

# 2. Regenerate affected scales
npm run generate-tonal-scale-from-base-[step]-[color].mjs

# 3. Test visual impact
npm run storybook:dev
```

## Context and Theme Adaptability

### Surface-Specific Variations

**Different contexts can have different color implementations:**

```
App Context (Dashboard/Admin):
├── Brand: Darker anchor (700) for primary actions
├── Accent: Medium anchor (600) for CTAs
└── Neutrals: Standard grayscale

Website Context (Marketing/Content):
├── Brand: Lighter anchor (500) for softer presence
├── Accent: Brighter anchor (400) for energy
└── Neutrals: Enhanced contrast for accessibility

Report Context (Print/Data):
├── Brand: High-contrast anchor (900) for documents
├── Accent: Muted anchor (700) for data visualization
└── Neutrals: Print-safe grayscale
```

### Theme-Specific Variations

**Themes can override base-colors per context:**

```json
// tokens/contexts/app/themes/dark.json
{
  "eui": {
    "color": {
      "brand": {
        "primary": { "$value": "oklch(65% 0.12 230)" }  // Lighter for dark theme
      },
      "neutral": {
        "50": { "$value": "oklch(15% 0.00 0)" },    // Dark background
        "900": { "$value": "oklch(90% 0.00 0)" }    // Light text
      }
    }
  }
}
```

### Accessibility Theme Rules

**WCAG 2.2 AA compliance requirements:**

```json
// tokens/contexts/app/themes/accessibility.json
{
  "eui": {
    "color": {
      "text": {
        "primary": { "$value": "#000000" },     // Black text
        "onColor": { "$value": "#ffffff" }      // White text on dark backgrounds
      },
      "background": {
        "base": { "$value": "#ffffff" },        // White background
        "elevated": { "$value": "#f8f9fa" }     // Light gray for cards
      }
    }
  }
}
```

## Maintenance and Evolution

### Color System Health Checks

**Monthly Review Process:**
1. ✅ **Token Usage Audit** - Check for unused color tokens
2. ✅ **Contrast Compliance** - Verify WCAG ratios across themes
3. ✅ **Context Consistency** - Ensure colors work across surfaces
4. ✅ **Generation Scripts** - Update algorithms for better perceptual uniformity

### Deprecation Process

**When removing colors:**
1. **Mark as deprecated** in token descriptions
2. **Provide migration path** in component updates
3. **Maintain backward compatibility** for 2 release cycles
4. **Remove from generation** after deprecation period

### Performance Considerations

**Color Token Optimization:**
- ✅ **Limit scale steps** - Only generate needed steps (avoid 50-900 if not used)
- ✅ **Share base-colors** - Reuse anchors across contexts when possible
- ✅ **Lazy generation** - Only regenerate changed color scales
- ✅ **Bundle analysis** - Monitor CSS bundle size impact

## Troubleshooting

### Common Issues

**❌ Issue: "Token reference not found"**
```
Solution: Ensure base-colors are copied to primitives/colors/ for component access
```

**❌ Issue: "Generated scale looks wrong"**
```
Solution: Check generation script parameters and OKLCH color space usage
```

**❌ Issue: "Colors don't work in theme"**
```
Solution: Themes override foundation tokens, not component tokens
```

**❌ Issue: "Contrast fails in accessibility theme"**
```
Solution: Update theme overrides to meet WCAG 2.2 AA requirements
```

### Validation Commands

```bash
# Check token resolution
npm run tokens:build

# Validate contrast ratios
npm run tokens:validate-accessibility

# Test theme switching
npm run storybook:dev -- --theme=accessibility

# Generate missing types
npm run tokens:generate-types
```

## Examples in Practice

### Adding a New Theme Color

**Scenario:** Add "ocean" theme with blue-tinted neutrals

```json
// tokens/foundations/base-colors/neutral.json (theme override)
{
  "eui": {
    "color": {
      "neutral": {
        "primary": { "$value": "oklch(50% 0.02 220)" }  // Blue-tinted neutral
      }
    }
  }
}
```

### Context-Specific Brand Colors

**Scenario:** Different brand colors for app vs website

```json
// tokens/contexts/app/foundations/base-colors/brand.json
{
  "eui": {
    "color": {
      "brand": {
        "primary": { "$value": "oklch(45% 0.12 230)" }  // Darker for app
      }
    }
  }
}

// tokens/contexts/website/foundations/base-colors/brand.json
{
  "eui": {
    "color": {
      "brand": {
        "primary": { "$value": "oklch(55% 0.10 230)" }  // Lighter for website
      }
    }
  }
}
```

## Related Documentation

- **[ADR-0014](../adr/ADR-0014-color-model-tonal-scales-and-contextual-architecture.md)** - Foundational color architecture decisions
- **[Token Usage Rules](./token-usage-rules.md)** - How to consume color tokens
- **[Theme Structure Analysis](../theme-structure-analysis.md)** - Current theme implementation details
- **[Base Colors README](../../tokens/foundations/base-colors/README.md)** - Technical implementation of base-colors pattern

---

## Summary

**Follow these rules to maintain color system integrity:**

1. **Use Pattern 1** (base-colors + scales) for brand, accent, and status colors
2. **Use Pattern 2** (complete scales) for neutral colors only
3. **Use Pattern 3** (direct values) for signal/special-purpose colors
4. **Adapt per context/theme** - Colors can vary for different surfaces and accessibility needs
5. **Maintain generation scripts** - Always use programmatic scale generation
6. **Test across themes** - Verify colors work in default, accessibility, and future themes

**Breaking these rules requires ADR approval and migration planning.**