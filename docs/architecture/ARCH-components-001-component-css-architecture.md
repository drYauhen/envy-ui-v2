# Component CSS Architecture

**Document ID:** ARCH-components-001-component-css-architecture
**Last Updated:** 2026-01-14
**Category:** Architecture Rules (Binding)


**Last Updated:** 2026-01-09
**Category:** Architectural Rule
**Status:** Mandatory
**Related ADR:**
- [ADR-0017](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture
- [ADR-0023](../adr/ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization
- [ADR-0024](../adr/ADR-0024-css-layer-strategy-context-priority.md) — CSS Layer Strategy

---

## Overview

This document establishes mandatory rules for component CSS implementation to ensure architectural consistency, maintainability, and proper token-driven design across the entire design system.

**Core Principle:** Component CSS files must **never contain hardcoded values**. All styling decisions must flow from the design token system through generated CSS variables.

**Reference Pattern:** Badge + Card are the canonical reference components. New components must follow their contract-driven, semantic-only token pattern.

**Component pipeline (current canon):**
- `tokens/components/*.contract.json` → generated structure CSS (deterministic, strict by default)
- `tokens/components/*.tokens.json` → `generated/css/components/*.tokens.css` (mapping layer)

## Architecture Rules

### Rule 1: Single Source of Truth

**Mandate:** Design tokens in JSON files are the **only** source of truth for all styling values.

**Flow:**
```
Token Files (JSON)
    ↓ Canonical CSS Generators (scripts/generate-canonical-css.mjs + scripts/generate-component-css.mjs)
Generated CSS Variables (tokens.css + components/*.tokens.css)
    ↓ CSS Cascade
Component CSS (maps variables to selectors)
    ↓ Browser Rendering
Visual Output
```

**Violation Example:**
```css
/* ❌ FORBIDDEN: Hardcoded hex colors in component CSS */
[data-eui-context="app"][data-eui-theme="accessibility"] .eui-badge {
  background: #ffffff;  /* Hardcoded */
  color: #000000;       /* Hardcoded */
  border: 2px solid #006400;  /* Hardcoded */
}
```

**Correct Pattern:**
```css
/* ✅ CORRECT: Component maps to token variables */
[data-eui-context] .eui-badge {
  background: var(--eui-badge-background);
  color: var(--eui-badge-color);
  border: var(--eui-badge-border-width) solid var(--eui-badge-border);
}

/* Theme overrides happen in tokens.json, not CSS */
```

**Rationale:**
- Changes to tokens automatically propagate to all components
- OKLCH color space benefits preserved throughout
- Prevents drift between design intent and implementation
- Eliminates manual CSS maintenance burden

---

### Rule 2: No Hardcoded Values in Component CSS

**Mandate:** Component CSS files must **never** contain literal color, spacing, or dimension values.

**Forbidden Patterns:**
```css
/* ❌ Hardcoded colors */
.component {
  color: #333333;
  background: rgba(255, 255, 255, 0.9);
  border-color: oklch(62% 0.25 25);
}

/* ❌ Hardcoded dimensions */
.component {
  padding: 16px;
  margin: 2rem;
  gap: 8px;
}

/* ❌ Hardcoded typography */
.component {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
}
```

**Allowed Pattern:**
```css
/* ✅ Token variables */
.component {
  color: var(--eui-component-color);
  background: var(--eui-component-background);
  border-color: var(--eui-component-border);

  padding: var(--eui-component-padding);
  margin: var(--eui-component-margin);
  gap: var(--eui-component-gap);

  font-size: var(--eui-component-font-size);
  line-height: var(--eui-component-line-height);
  font-weight: var(--eui-component-font-weight);
}
```

**Limited Exceptions (Per ADR-0018):**
- **Border widths**: May use `px` for fixed dimensions (e.g., `1px` border)
- **Focus offsets**: May use `px` for consistent focus indication
- **Small padding values**: May use `px` when token doesn't exist, but must be documented

**Exception Documentation Required:**
```css
/* ✅ Documented exception (per ADR-0018) */
.component {
  border-width: 1px;  /* Fixed dimension per ADR-0018 - consistent across themes */
}
```

---

### Rule 3: Theme Overrides via Compound Selectors

**Mandate:** Theme-specific styling must **only** appear in compound selectors combining context and theme attributes.

**Correct Selector Pattern:**
```css
/* ✅ CORRECT: Compound selector for theme override */
[data-eui-context="app"][data-eui-theme="accessibility"] {
  --eui-badge-colors-success-solid-background: oklch(64% 0.17 150);
  --eui-badge-colors-success-solid-text: oklch(100% 0 0);
}
```

**Forbidden Patterns:**
```css
/* ❌ FORBIDDEN: Hardcoded in component CSS */
[data-eui-context="app"][data-eui-theme="accessibility"] .eui-badge[data-tone="success"] {
  background: #006400;  /* Hardcoded hex */
  color: #ffffff;
}

/* ❌ FORBIDDEN: Theme override without context */
[data-eui-theme="accessibility"] {
  --eui-badge-background: oklch(100% 0 0);
}

/* ❌ FORBIDDEN: Context-only selector in theme file */
[data-eui-context="app"] {
  --eui-badge-background: oklch(100% 0 0);  /* Must be in semantic, not theme */
}
```

**Architecture:**
- **Base tokens**: Define in `tokens/{context}/components/{component}/`
- **Theme overrides**: Define in `tokens/contexts/{context}/themes/{theme}.json`
- **CSS generation**: Canonical generators produce contexts/themes and component token mappings
- **Component CSS**: Maps variables to element selectors (no theme logic)

---

### Rule 4: OKLCH Color Space Throughout

**Mandate:** All color tokens must use OKLCH color space. Hex colors (`#rrggbb`) and RGB values are **forbidden** in token files and generated CSS.

**Correct Pattern:**
```json
// ✅ tokens/contexts/app/themes/accessibility.json
{
  "eui": {
    "badge": {
      "colors": {
        "success": {
          "background": {
            "$value": "{eui.color.neutral.white}",  // References semantic token
            "$type": "color"
          },
          "text": {
            "$value": "{eui.color.status.success.700}",  // Resolves to OKLCH
            "$type": "color"
          }
        }
      }
    }
  }
}
```

**Generated Output:**
```css
/* ✅ Generated tokens.css uses OKLCH */
[data-eui-context="app"][data-eui-theme="accessibility"] {
  --eui-badge-colors-success-background: oklch(100% 0 0);
  --eui-badge-colors-success-text: oklch(64% 0.17 150);
}
```

**Forbidden:**
```json
// ❌ FORBIDDEN: Hex colors in token files
{
  "success": {
    "background": { "$value": "#ffffff" }  // Use OKLCH or semantic reference
  }
}
```

**Benefits:**
- **Wider color gamut**: P3 display support
- **Perceptual uniformity**: Consistent visual weight across colors
- **Better interpolation**: Smooth color transitions
- **Future-proof**: Modern color space for HDR displays

---

### Rule 5: Semantic Layer Resolution

**Mandate:** Component tokens must reference the **semantic layer** whenever possible. Direct primitive references should be rare and justified.

**3-Layer Architecture:**
```
Primitives (global values)
    ↓
Semantics (meaningful references per context)
    ↓
Components (component-specific aliases)
```

**Correct Pattern (semantic-only):**
```json
// ✅ Component references semantic
// tokens/components/badge.tokens.json
{
  "badge": {
    "colors": {
      "success": {
        "text": {
          "$value": "{eui.color.status.success.text}",  // Semantic reference
          "$type": "color"
        }
      }
    }
  }
}
```

**If semantic is missing, add it (alias-only) and reference it:**
```json
// tokens/contexts/app/semantics/colors/status.json
{
  "eui": {
    "color": {
      "status": {
        "custom": {
          "text": {
            "$value": "{eui.color.neutral.900}",
            "$type": "color"
          }
        }
      }
    }
  }
}
```

```json
// tokens/components/badge.tokens.json
{
  "badge": {
    "colors": {
      "custom": {
        "text": {
          "$value": "{eui.color.status.custom.text}",
          "$type": "color"
        }
      }
    }
  }
}
```

**Token Reference Chain:**
```
Component Token → Semantic Token → Primitive Value
{eui.badge.text} → {eui.color.text.primary} → oklch(25% 0 0)
```

**CSS Generator Behavior (current canon):**
1. `scripts/generate-canonical-css.mjs` resolves semantic tokens to final values for contexts/themes (raw is internal and not emitted).
2. `scripts/generate-component-css.mjs` preserves component references to semantic CSS variables.
3. Component CSS maps variables to selectors; no values are authored in CSS.

---

### Rule 6: Component CSS Responsibility

**Mandate:** Component CSS files have a **single responsibility**: map token variables to CSS selectors.

**Component CSS Should:**
- ✅ Map token variables to element selectors
- ✅ Define component structure and layout
- ✅ Handle interaction states (`:hover`, `:focus`, `:active`)
- ✅ Provide accessibility states (`[aria-disabled]`, etc.)

**Component CSS Should NOT:**
- ❌ Define token values
- ❌ Override theme-specific styling
- ❌ Contain hardcoded colors or dimensions
- ❌ Implement theme switching logic

**Example:**
```css
/* ✅ CORRECT: Component CSS maps tokens to selectors */
[data-eui-context] .eui-badge {
  /* Map component variables to token variables */
  --eui-badge-background: var(--eui-badge-colors-neutral-background);
  --eui-badge-color: var(--eui-badge-colors-neutral-text);
  --eui-badge-border: var(--eui-badge-colors-neutral-border);
  --eui-badge-size-height: var(--eui-badge-size-default-height);
  --eui-badge-size-padding-block: var(--eui-badge-size-default-padding-block);
  --eui-badge-size-padding-inline: var(--eui-badge-size-default-padding-inline);
  --eui-badge-size-gap: var(--eui-badge-size-default-gap);
  --eui-badge-size-fontSize: var(--eui-badge-size-default-fontSize);
  --eui-badge-size-lineHeight: var(--eui-badge-size-default-lineHeight);

  /* Apply variables to properties */
  background: var(--eui-badge-background);
  color: var(--eui-badge-color);
  border: var(--eui-badge-border-width) solid var(--eui-badge-border);

  /* Layout and structure */
  display: inline-flex;
  align-items: center;
  height: var(--eui-badge-size-height);
  padding: var(--eui-badge-size-padding-block) var(--eui-badge-size-padding-inline);
  gap: var(--eui-badge-size-gap);

  /* Typography */
  font-size: var(--eui-badge-size-fontSize);
  line-height: var(--eui-badge-size-lineHeight);
}

/* Variant mapping */
[data-eui-context] .eui-badge[data-eui-tone='success'] {
  --eui-badge-background: var(--eui-badge-colors-success-background);
  --eui-badge-color: var(--eui-badge-colors-success-text);
  --eui-badge-border: var(--eui-badge-colors-success-border);
}

/* Solid variant mapping */
[data-eui-context] .eui-badge[data-eui-variant='solid'] {
  --eui-badge-background: var(--eui-badge-colors-neutral-solid-background);
  --eui-badge-color: var(--eui-badge-colors-neutral-solid-text);
}
```

**Container-Driven Sizing (Rule 6a):**
- Application components are container-driven: size is fixed, typography adapts.
- Height/padding/gap come from size tokens; typography uses size tokens instead of driving geometry.
- Badge is the reference implementation: default=24px height, small=20px height using existing dimension tokens.

**Explicit Interactivity (Rule 6b):**
- Components are non-interactive by default; interactivity requires explicit opt-in.
- Interactive styles (cursor, focus, hover, transitions) apply only with `data-eui-interactive="true"`.
- Badge is the reference implementation: base badge has no cursor/hover effects; only badges with `data-eui-interactive="true"` show interactive behavior.
- Independent of HTML element type (works with `<span>`, `<button>`, `<a>`, etc.).
- CSS controls visual behavior only; markup/runtime is responsible for focusability (`tabindex`, `role`, native elements).

---

### Rule 7: Deterministic Structure CSS (Strict by Default)

**Current strategy:** Contracts fully drive structure CSS (machine-run generation).

**Escape hatch:** A hybrid model (generated mapping + hand-authored structure) may be adopted if generator complexity becomes counterproductive. The boundary trigger is `ALLOW_MANUAL_STRUCTURE_CSS=false` by default and **must remain strict** until this rule is updated.

**Trigger condition examples:**
- Generator becomes brittle or requires opaque heuristics
- Edge-cases block component delivery
- Deterministic output becomes unmaintainable

**Process:** Update ADR/Architecture Rules **before** enabling the escape hatch. No ad-hoc exceptions.

---

## Implementation Patterns

### Pattern 1: Component Variable Mapping

**Purpose:** Create a stable interface between tokens and component styling.

**Implementation:**
```css
/* Step 1: Map token variables to component variables */
[data-eui-context] .eui-component {
  --eui-component-bg: var(--eui-component-colors-default-background);
  --eui-component-text: var(--eui-component-colors-default-text);
}

/* Step 2: Apply component variables to properties */
[data-eui-context] .eui-component {
  background: var(--eui-component-bg);
  color: var(--eui-component-text);
}

/* Step 3: Variant overrides update component variables */
[data-eui-context] .eui-component[data-variant='primary'] {
  --eui-component-bg: var(--eui-component-colors-primary-background);
  --eui-component-text: var(--eui-component-colors-primary-text);
}
```

**Benefits:**
- Clean separation between token mapping and property application
- Variants only update variables, not properties
- Easier to debug and maintain

---

### Pattern 2: Focus State Architecture

**Two-Layer System:**

**Layer 1: Theme-Dependent Focus (Default)**
```css
/* Component uses theme-driven focus color */
[data-eui-context] .eui-component:focus {
  box-shadow:
    0 0 0 var(--eui-focus-ring-offset-default) var(--eui-color-background-surface),
    0 0 0 calc(var(--eui-focus-ring-offset-default) + var(--eui-focus-ring-width))
      var(--eui-focus-ring-color);
}

[data-eui-context] .eui-component:focus-visible {
  box-shadow:
    0 0 0 var(--eui-focus-ring-offset-default) var(--eui-color-background-surface),
    0 0 0 calc(var(--eui-focus-ring-offset-default) + var(--eui-focus-ring-width))
      var(--eui-focus-ring-color-keyboard);
}
```

**Token Definition:**
```json
// tokens/components/component.tokens.json
{
  "focus": {
    "ring": {
      "color": {
        "$value": "{eui.color.focus.ring}",
        "$type": "color"
      },
      "width": {
        "$value": "{eui.focus.ring.width}",
        "$type": "dimension"
      },
      "offset": {
        "$value": "{eui.focus.ring.offset.default}",
        "$type": "dimension"
      }
    }
  }
}

// tokens/contexts/app/themes/accessibility.json
{
  "eui": {
    "color": {
      "focus": {
        "ring": {
          "$value": "{eui.color.accent.700}",
          "$type": "color"
        }
      }
    }
  }
}
```

**Layer 2: System Focus Policy Override (Optional)**
```css
/* System focus policy: bright orange for keyboard users */
[data-eui-focus-policy="system"] [data-eui-context] {
  --eui-focus-ring-color-keyboard: var(--eui-color-system-focus);
}
```

---

### Pattern 3: Theme Override Structure

**Token File Structure:**
```
tokens/contexts/app/themes/accessibility.json
```

**Content Pattern:**
```json
{
  "eui": {
    "color": {
      "text": {
        "primary": { "$value": "{eui.color.neutral.900}" }
      },
      "border": {
        "default": { "$value": "{eui.color.neutral.700}" }
      }
    }
  }
}
```

**Generated CSS:**
```css
@layer eui-themes {
  [data-eui-context="app"][data-eui-theme="accessibility"] {
    --eui-color-text-primary: oklch(25% 0 0);
    --eui-color-border-default: oklch(48% 0 0);
  }
}
```

---

## Enforcement & Validation

### Automated Checks

**Token Validation:**
```bash
npm run tokens:validate
```

Validates:
- ✅ Token references are valid
- ✅ No hardcoded values in component CSS (with documented exceptions)
- ✅ Proper selector patterns

**Runtime CSS Var Validation:**
```bash
npm run validate:css-vars
```

Validates:
- ✅ Undefined CSS variables across runtime bundles
- ✅ Contract-driven coverage for golden components
- ✅ Status token references exist in contexts CSS

### Manual Review Checklist

When adding or modifying component CSS:

- [ ] No hardcoded colors (hex, rgb, oklch literals)
- [ ] No hardcoded dimensions (except documented exceptions per ADR-0018)
- [ ] All values come from `var(--eui-*)` variables
- [ ] Theme overrides only in token files, not component CSS
- [ ] Compound selectors `[data-eui-context][data-eui-theme]` for theme overrides
- [ ] OKLCH color space in all token definitions
- [ ] Component references semantic layer when possible
- [ ] Focus states follow two-layer architecture

---

## Migration Strategy

When refactoring existing components to comply:

### Step 1: Identify Violations
```bash
# Find hardcoded colors
grep -r "#[0-9a-fA-F]\{6\}" src/ui/*.css

# Find hardcoded dimensions
grep -r "[0-9]\+px" src/ui/*.css | grep -v "var("
```

### Step 2: Create Token Definitions
```json
// Add missing tokens to appropriate layer
{
  "component": {
    "property": {
      "$value": "{eui.semantic.reference}",
      "$type": "color"
    }
  }
}
```

### Step 3: Rebuild Tokens
```bash
npm run tokens:build:canonical
node scripts/generate-component-css.mjs
```

### Step 4: Replace Hardcoded Values
```css
/* Before */
.component {
  background: #ffffff;
  color: #000000;
}

/* After */
.component {
  background: var(--eui-component-background);
  color: var(--eui-component-color);
}
```

### Step 5: Verify Theme Switching
- Test default theme
- Test accessibility theme
- Verify focus states (derived and system modes)

---

## Case Study: Badge Refactor (2026-01-09)

**Problem:** Badge component had 99 lines of hardcoded hex colors in CSS for accessibility theme overrides, violating single source of truth principle.

**Solution:**
1. **Deleted** hardcoded CSS block (badge.css:102-195)
2. **Fixed** accessibility theme tokens to properly differentiate variants
3. **Updated** CSS generator to resolve semantic base values correctly
4. **Verified** generated tokens.css contains correct OKLCH values

**Result:**
- ✅ Single source of truth restored
- ✅ OKLCH color space throughout
- ✅ Theme switching works automatically
- ✅ 94 lines of manual CSS eliminated

**Commit:** `1b736da` - "refactor: eliminate hardcoded badge CSS and restore token-driven architecture"

---

## Related Documentation

- **[Token Architecture](./ARCH-tokens-003-token-architecture.md)** - Overall token system design
- **[Token Usage Rules](./ARCH-tokens-004-token-usage-rules.md)** - Specific usage patterns
- **[ADR-0017](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md)** - Architectural foundation
- **[ADR-0018](../adr/ADR-0018-typography-units-architecture-rem-em-px.md)** - Typography unit rules
- **[ADR-0023](../adr/ADR-0023-token-organization-context-and-theme-separation.md)** - Token organization
- **[ADR-0024](../adr/ADR-0024-css-layer-strategy-context-priority.md)** - CSS layer strategy

---

## Summary

**Mandatory Principles:**
1. **Single Source of Truth**: Token files are authoritative
2. **No Hardcoded Values**: Component CSS must use token variables
3. **Compound Selectors**: Theme overrides only in `[context][theme]` selectors
4. **OKLCH Everywhere**: All colors use OKLCH color space
5. **Semantic Resolution**: Components reference semantic layer
6. **Component Responsibility**: CSS maps tokens to selectors only

**Enforcement:** Automated validation + manual code review + architectural guidelines.

**Exceptions:** Documented in ADR-0018 (fixed dimensions) and this document (focus architecture).
