# Theme Structure Analysis: Composition vs Semantic Breakdown

**Document ID:** ARCH-theme-002-theme-structure-analysis-composition-vs-semantic-breakdown
**Status:** Draft
**Date:** 2026-01-15
**Last Updated:** 2026-01-09
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Guide
**Related:**


---

## Question

Should theme JSON files maintain composition (single comprehensive files) or be broken down to mimic semantic levels structure?

## Current Implementation

Your accessibility theme uses the **composition approach** with a single comprehensive file:

```json
// tokens/contexts/app/themes/accessibility.json
{
  "$schema": "../../schemas/dtcg-2025.10-schema.json",
  "eui": {
    "typography": { /* Font size overrides */ },
    "color": { /* Color palette overrides */ },
    "badge": { /* Component-specific overrides */ },
    "calendar": { /* Component-specific overrides */ },
    "radius": { /* Shape overrides */ }
  }
}
```

## Alternative Structure: Semantic Breakdown

The semantic breakdown would mirror your semantic layer organization:

```
tokens/contexts/app/themes/accessibility/
├── colors.json              # All color overrides
├── typography.json          # All typography overrides
├── components/
│   ├── badge.json          # Badge-specific overrides only
│   ├── button.json         # Button-specific overrides only
│   └── calendar.json       # Calendar-specific overrides only
├── spacing.json            # Spacing overrides
└── shape.json              # Border radius/shape overrides
```

## Analysis Framework

### 1. **Composition Approach (Current)**

**Structure:**
- Single file per theme per context
- Holistic organization by semantic category
- Cross-cutting concerns kept together

**Advantages:**
- ✅ **Single Source of Truth** - All theme overrides in one location
- ✅ **Contextual Coherence** - Theme decisions made holistically
- ✅ **Build Performance** - Single file loads faster
- ✅ **Theme Switching** - Atomic theme application
- ✅ **Developer Experience** - See all overrides in one place
- ✅ **Maintenance** - Easy to audit complete theme coverage

**Disadvantages:**
- ❌ **File Size** - Can become large for complex themes
- ❌ **Concurrent Editing** - Multiple developers editing same file
- ❌ **Selective Overrides** - Can't easily override just one category

### 2. **Semantic Breakdown Approach**

**Structure:**
- Multiple files per theme per context
- Organized by semantic concern
- Granular file structure

**Advantages:**
- ✅ **Modularity** - Override specific semantic categories independently
- ✅ **Team Collaboration** - Different developers can work on different files
- ✅ **Selective Loading** - Load only needed semantic categories
- ✅ **Git History** - Finer-grained change tracking
- ✅ **Reusability** - Semantic files can be shared across themes

**Disadvantages:**
- ❌ **Complexity** - Theme coordination across multiple files
- ❌ **Build Complexity** - Multiple file loading and merging
- ❌ **Maintenance Overhead** - Tracking which files belong to which theme
- ❌ **Developer Overhead** - Need to know which file contains which overrides

## Recommendation: Keep Composition Approach

Based on your current token architecture and accessibility theme usage patterns, **I recommend keeping the composition approach**.

### Rationale

#### 1. **Theme Nature Analysis**
Your accessibility theme is a **holistic accessibility feature** that affects multiple semantic categories simultaneously:

- **Color overrides** affect text, backgrounds, borders, and focus states
- **Typography changes** (larger font sizes) impact spacing and layout
- **Component overrides** ensure accessibility compliance across UI elements

These decisions are **interdependent** - changing contrast ratios affects multiple semantic categories.

#### 2. **Current Scale Assessment**
Your accessibility theme file is ~200 lines - **perfect size for composition approach**:

- Small enough to be manageable in one file
- Large enough to benefit from holistic organization
- Easy to review and maintain as a single unit

#### 3. **Architecture Alignment**
Your token architecture already uses composition at other levels:

- **Foundation Layer**: Multiple files (colors/, typography/, etc.) - ✅ Semantic breakdown
- **Semantic Layer**: Multiple files (colors/, typography/, etc.) - ✅ Semantic breakdown
- **Component Layer**: Single files per component - ⚠️ Mixed approach
- **Theme Layer**: Single files per theme - ✅ Composition approach

**Themes as composition layers** creates a clean architectural separation.

#### 4. **Developer Experience**
Accessibility themes are **specialized, focused overrides** that benefit from:
- **Complete visibility** of all accessibility decisions
- **Easy auditing** of WCAG compliance across all categories
- **Simple maintenance** without file coordination complexity

## Implementation Examples

### Current Composition (Recommended)

```json
// tokens/contexts/app/themes/accessibility.json
{
  "eui": {
    "color": {
      "text": {
        "primary": { "$value": "{eui.color.neutral.900}" },
        "muted": { "$value": "{eui.color.neutral.800}" }
      }
    },
    "typography": {
      "base": {
        "fontSize": { "$value": "16px" }
      }
    },
    "badge": {
      "colors": {
        "neutral": {
          "text": { "$value": "{eui.color.neutral.900}" }
        }
      }
    }
  }
}
```

### Alternative Semantic Breakdown

```json
// tokens/contexts/app/themes/accessibility/colors.json
{
  "eui": {
    "color": {
      "text": {
        "primary": { "$value": "{eui.color.neutral.900}" },
        "muted": { "$value": "{eui.color.neutral.800}" }
      }
    }
  }
}

// tokens/contexts/app/themes/accessibility/typography.json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": { "$value": "16px" }
      }
    }
  }
}

// tokens/contexts/app/themes/accessibility/components/badge.json
{
  "eui": {
    "badge": {
      "colors": {
        "neutral": {
          "text": { "$value": "{eui.color.neutral.900}" }
        }
      }
    }
  }
}
```

## When Semantic Breakdown Makes Sense

Consider semantic breakdown if your themes:

1. **Scale dramatically** (>500 lines per theme file)
2. **Have multiple maintainers** working on different semantic categories
3. **Need frequent, independent updates** to specific categories
4. **Share semantic overrides** across multiple themes
5. **Require granular loading** for performance reasons

## Migration Path (If Needed)

If you later decide to switch to semantic breakdown:

```bash
# Create theme directories
mkdir -p tokens/contexts/app/themes/accessibility/components

# Split current files using token processing scripts
# Update build pipeline to merge semantic theme files
# Update documentation and developer workflows
```

## Conclusion

**Keep your current composition approach** for theme JSON files. It's architecturally sound, maintainable, and provides the best developer experience for your accessibility theme use case.

Your current structure follows design token best practices and creates a clean separation between semantic organization (foundations/semantic layers) and holistic theme application (theme layer).

## Related Documentation

- [Token Architecture](ARCH-tokens-003-token-architecture.md)
- [ADR-0017](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture
- [WCAG 2.2 AA Accessibility Standards](https://www.w3.org/WAI/WCAG22/quickref/)
