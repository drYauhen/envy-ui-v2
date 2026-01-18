# Token Structure Proposal: Contexts and Themes

**Date:** 2025-12-20  
**Status:** Proposal for review  
**Based on:** ADR-0017 (Layered Token Architecture for Contexts and Themes)

---

## Current Structure

```
tokens/
  foundations/
    colors/
      neutral.json
      brand.json
      accent.json
      signal.json
      status.json
    shape.json
  semantic/
    colors/
      text.json          → references foundations
      background.json    → references foundations
      border.json        → references foundations
      focus.json         → references foundations
  components/
    button/
      colors.json        → references foundations (brand.primary, neutral.*)
      focus.json         → references semantic focus
      size.json
      shape.json
      layout.json
      border.json
      separator.json
      group.json
```

**Current resolution:** Foundation → Semantic → Component

---

## Proposed Structure (ADR-0017)

```
tokens/
  foundations/                    # Base values (unchanged)
    colors/
      neutral.json
      brand.json
      accent.json
      signal.json
      status.json
    shape.json
  semantic/                       # Semantic tokens (base, can be context-neutral defaults)
    colors/
      text.json                   # eui.color.text.*
      background.json             # eui.color.background.*
      border.json                 # eui.color.border.*
      focus.json                  # eui.color.focus.*
  contexts/                       # Context-specific semantic overrides (NEW)
    app/
      semantic.json               # Override semantic tokens for app context
      # Example: eui.color.text.primary might be different for app
    website/
      semantic.json               # Override semantic tokens for website context
    report/
      semantic.json               # Override semantic tokens for report context
  themes/                         # Theme-specific overrides within context (NEW)
    app/
      default.json                # Default theme for app (may be empty if context default is enough)
      dark.json                   # Dark theme overrides semantic for app+dark
    website/
      brand-a.json                # Brand A theme overrides semantic for website+brand-a
      brand-b.json                # Brand B theme overrides semantic for website+brand-b
    report/
      print.json                  # Print theme overrides semantic for report+print
      screen.json                 # Screen theme overrides semantic for report+screen
  components/                     # Component tokens (unchanged, but inherit via semantic)
    button/
      colors.json                 # Still references foundations/semantic
      focus.json
      size.json
      shape.json
      layout.json
      border.json
      separator.json
      group.json
```

**Proposed resolution:** Foundation → Semantic → Context → Theme → Component

---

## Example: Button Primary Background Color

### Current Flow

```
eui.button.primary.background.base
  → {eui.color.brand.700}           (direct foundation reference)
    → #066a8d
```

### Proposed Flow

```
eui.button.primary.background.base
  → {eui.color.brand.primary}       (component references semantic)
    → Semantic: eui.color.brand.primary
      → Base: {eui.color.brand.700}
      → Context (app): (no override, use base)
      → Context (website): (no override, use base)
      → Context (report): (override for print-optimized contrast)
    → Theme (app/dark): (override if needed)
    → Theme (website/brand-a): (override brand color)
```

### Detailed Example Structure

#### 1. Semantic Base (semantic/colors/background.json)
```json
{
  "eui": {
    "color": {
      "brand": {
        "primary": {
          "$value": "{eui.color.brand.700}",
          "$type": "color"
        }
      }
    }
  }
}
```

#### 2. Context Override (contexts/app/semantic.json)
```json
{
  "eui": {
    "color": {
      "brand": {
        "primary": {
          "$value": "{eui.color.brand.700}",
          "$type": "color"
        }
      }
    }
  }
}
```
*Note: If no override needed, file might be empty or not exist*

#### 3. Context Override for Report (contexts/report/semantic.json)
```json
{
  "eui": {
    "color": {
      "text": {
        "primary": {
          "$value": "{eui.color.neutral.900}",
          "$type": "color",
          "$description": "Higher contrast for print"
        }
      },
      "background": {
        "surface": {
          "$value": "{eui.color.neutral.white}",
          "$type": "color",
          "$description": "Pure white for print"
        }
      }
    }
  }
}
```

#### 4. Theme Override (themes/app/dark.json)
```json
{
  "eui": {
    "color": {
      "background": {
        "surface": {
          "$value": "{eui.color.neutral.900}",
          "$type": "color"
        }
      },
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

#### 5. Component Token (components/button/colors.json) - UNCHANGED
```json
{
  "eui": {
    "button": {
      "primary": {
        "background": {
          "base": {
            "$value": "{eui.color.brand.primary}",
            "$type": "color"
          }
        }
      }
    }
  }
}
```

---

## Resolution Strategy

Style Dictionary merge order:
1. Load foundations
2. Load semantic (references foundations)
3. Load context semantic overrides (merge with semantic)
4. Load theme overrides (merge with context semantic)
5. Load component tokens (reference semantic tokens, which now have context/theme applied)

**CSS Variable Injection:**
- Base CSS variables: `--eui-color-text-primary` (from semantic base)
- Context override: `[data-eui-context="app"] { --eui-color-text-primary: ... }` (if context overrides)
- Theme override: `[data-eui-context="app"][data-eui-theme="dark"] { --eui-color-text-primary: ... }` (if theme overrides)

---

## Button Analysis: Current State vs Required Changes

### Current Button Token References

**✅ Already uses semantic:**
- `eui.button.primary.background.base` → `{eui.color.brand.primary}` ✓
- `eui.button.focus.ring.color.derived` → `{eui.color.brand.primary}` ✓

**❌ Direct foundation references (need semantic layer):**
- `eui.button.primary.background.disabled` → `{eui.color.neutral.300}` (should use semantic)
- `eui.button.primary.label.base` → `{eui.color.neutral.white}` (should use `{eui.color.text.inverse}`)
- `eui.button.primary.label.disabled` → `{eui.color.neutral.500}` (should use `{eui.color.text.disabled}`)
- `eui.button.secondary.background.base` → `{eui.color.neutral.white}` (should use `{eui.color.background.surface}`)
- `eui.button.secondary.label.base` → `{eui.color.neutral.900}` (should use `{eui.color.text.primary}`)
- `eui.button.secondary.border.base` → `{eui.color.neutral.300}` (should use semantic border)

**Missing semantic tokens needed:**
- `eui.color.text.inverse` ✓ (exists)
- `eui.color.text.primary` ✓ (exists)
- `eui.color.text.disabled` ✓ (exists)
- `eui.color.background.surface` ✓ (exists)
- `eui.color.border.default` ✓ (exists, can be used instead of `neutral.300`)
- `eui.color.background.disabled` - might need to be added for disabled states

### Required Changes to Button Tokens

**Before (direct foundation):**
```json
{
  "eui": {
    "button": {
      "primary": {
        "label": {
          "base": {
            "$value": "{eui.color.neutral.white}",
            "$type": "color"
          }
        }
      }
    }
  }
}
```

**After (semantic reference):**
```json
{
  "eui": {
    "button": {
      "primary": {
        "label": {
          "base": {
            "$value": "{eui.color.text.inverse}",
            "$type": "color"
          }
        }
      }
    }
  }
}
```

---

## Migration Strategy for Button

### Phase 1: Update button to use semantic tokens
- Change `eui.button.primary.label.*` to reference `{eui.color.text.inverse}` or `{eui.color.text.disabled}`
- Change `eui.button.secondary.background.*` to reference `{eui.color.background.surface}`
- Change `eui.button.secondary.label.*` to reference `{eui.color.text.primary}`
- Change `eui.button.secondary.border.*` to reference `{eui.color.border.default}`
- Add missing semantic tokens if needed (e.g., `eui.color.border.base`, `eui.color.background.disabled`)

### Phase 2: Create context structure
- Create `tokens/contexts/app/semantic.json` (initially empty or minimal)
- Create `tokens/contexts/website/semantic.json` (initially empty)
- Create `tokens/contexts/report/semantic.json` (add print-optimized overrides)

### Phase 3: Add theme structure
- Create `tokens/themes/app/default.json` (empty, context default is enough)
- Create `tokens/themes/app/dark.json` (dark theme overrides)
- Create `tokens/themes/website/brand-a.json` (brand-specific overrides)
- Create `tokens/themes/report/print.json` (print-specific overrides)

### Phase 4: Update Style Dictionary config
- Add context and theme platforms to config.mjs
- Implement merge strategy for layered resolution

---

## Questions to Resolve

1. **Empty context files:** Should we create empty files or skip if no overrides?
2. **Semantic completeness:** Do we need to add semantic tokens that button currently references directly (e.g., `eui.color.brand.primary`)?
3. **Component-level context overrides:** Will we need component-specific context overrides, or is semantic layer sufficient?
4. **Build-time vs runtime:** Should context/theme resolution happen at build-time (CSS generation) or runtime (CSS variables)?

---

## Next Steps

1. Review this proposal
2. Decide on resolution strategy (build-time vs runtime)
3. Create initial context/theme structure for button
4. Update Style Dictionary config to handle new structure
5. Test with button component in Storybook

