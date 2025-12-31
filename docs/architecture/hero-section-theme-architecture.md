# Hero Section Theme Architecture

## Principle: Structure vs. Visual Parameters

### What DOES NOT Change with Theme (Template Configuration)
- **Layout variant** (centered, split, minimal) - structural choice
- **Content structure** (heading, subheading, CTAs) - content organization
- **Media position** (left, right, background) - layout arrangement
- **Navigation style** (overlay, integrated) - structural behavior

These are defined in `templates/*.json` and remain constant across themes.

### What DOES Change with Theme (Tokens)
- **Colors** - background, text, overlay (via semantic tokens)
- **Typography** - font sizes, weights, line heights
- **Spacing** - padding, gaps (can vary by theme)
- **Component styling** - buttons, cards inside Hero Section inherit theme

These are defined in `tokens/components/hero-section/` and reference semantic tokens that change per theme.

## Architecture Flow

```
Template Configuration (templates/hero-centered-v1.json)
  ↓
  Defines: layout variant, content structure, media position
  ↓
Hero Section Tokens (tokens/components/hero-section/)
  ↓
  References: semantic tokens (text, background, spacing)
  ↓
Semantic Tokens (tokens/website/semantic/)
  ↓
  Can be overridden by: Theme
  ↓
Website Theme (tokens/website/themes/brand-a.json)
  ↓
  Overrides: semantic colors, typography, spacing
  ↓
Final CSS Variables
```

## Example: Hero Section in Different Themes

### Same Template, Different Themes

**Template:** `hero-centered-v1.json` (structure stays the same)
- Layout: centered
- Content: heading + subheading + 2 CTAs
- Background: gradient

**Theme: brand-a (light)**
- Background: light gradient (`{eui.color.brand.primary}` → light)
- Text: dark (`{eui.color.text.primary}` = `{eui.color.neutral.900}`)
- Buttons: use button tokens (inherit theme)

**Theme: brand-a-dark**
- Background: dark gradient (`{eui.color.brand.primary}` → dark)
- Text: light (`{eui.color.text.primary}` = `{eui.color.neutral.white}`)
- Buttons: use button tokens (inherit theme, may be inverted)

## Implementation

Hero Section tokens reference semantic tokens:

```json
// tokens/website/components/hero-section/colors.json
{
  "text": {
    "heading": {
      "$value": "{eui.color.text.primary}",  // ← Changes with theme
      "$type": "color"
    }
  }
}
```

Theme overrides semantic tokens:

```json
// tokens/website/themes/brand-a-dark.json
{
  "eui": {
    "color": {
      "text": {
        "primary": {
          "$value": "{eui.color.neutral.white}",  // ← Override for dark theme
          "$type": "color"
        }
      }
    }
  }
}
```

Result: Hero Section text automatically becomes light in dark theme, without changing template structure.

## Key Points

1. **Template = Structure** - Layout, content organization, media arrangement
2. **Tokens = Visual Parameters** - Colors, typography, spacing that adapt to theme
3. **Components Inside Hero** - Buttons, cards inherit theme automatically via their own tokens
4. **One Template, Multiple Themes** - Same JSON template works with any website theme

