# ADR-0028: Internationalization (i18n) and RTL Support Architecture

**Status:** Proposed  
**Date:** 2025-01-01  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  
- [ADR-0018](./ADR-0018-typography-units-architecture-rem-em-px.md) — Typography Units Architecture - REM, EM, and PX  
- [ADR-0023](./ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization - Context and Theme Separation  
- [ADR-0024](./ADR-0024-css-layer-strategy-context-priority.md) — CSS Layer Strategy for Context Priority

---

## Context

The design system needs to support internationalization (i18n) and right-to-left (RTL) languages across all three contexts (app, website, report). **This is an immediate requirement for the website context**, where multi-language content and localization are already needed. The solution must be a **universal pattern that works correctly regardless of context**, ensuring consistency and maintainability across the entire design system.

Key challenges include:

1. **Immediate Need for Websites**:
   - **Website context already requires i18n support** - content management systems generate content in multiple languages
   - Websites may be viewed by international audiences with different language preferences
   - RTL languages (Arabic, Hebrew) are already in use for website content
   - Auto-translation services may be integrated for on-the-fly translation

2. **Variable Text Length**: 
   - Different languages have different average word lengths (e.g., German words are typically longer than English)
   - Dynamic content (project names, menu items, website content) has unpredictable lengths
   - Fixed-width components (e.g., menus with `200px` min-width) break with longer text
   - This affects all contexts but is most critical for websites with user-generated or CMS content

3. **RTL Language Support**:
   - Arabic, Hebrew, and other RTL languages require layout mirroring
   - Components must work seamlessly in both LTR and RTL directions
   - Icons, spacing, and alignment must adapt automatically
   - **Already needed for website context** with RTL language content

4. **Auto-Translation Integration**:
   - Third-party auto-translation services may translate text on-the-fly (especially for websites)
   - Components must adapt to translated content without breaking
   - No manual intervention should be required for different languages
   - **Critical for website context** where translation may happen dynamically

5. **Universal Pattern Requirement**:
   - **Solution must work identically across all contexts** (app, website, report)
   - Same token structure and CSS patterns for all contexts
   - No context-specific i18n implementations
   - Ensures consistency and reduces maintenance burden

6. **Context Requirements**:
   - **Application**: Dynamic UI with user-generated content (project names, menu items)
   - **Website**: **Immediate need** - Content management with potentially long text in multiple languages, RTL support, auto-translation
   - **Report**: Documentation and reports that may be translated or localized

7. **Maintenance Cost**:
   - Solution must not complicate token structure
   - Must be cheap to maintain (no per-language token variants unless necessary)
   - Must work "out of the box" for most use cases
   - **Universal pattern reduces maintenance** - one solution for all contexts

The goal is to create a **universal i18n and RTL architecture** that:
- Works identically across all contexts (app, website, report)
- Addresses the immediate need for website context
- Supports i18n and RTL without requiring extensive per-language configuration or complex token structures
- Provides a consistent pattern that can be applied uniformly throughout the design system

---

## Decision

I decided to implement a **universal i18n-first architecture** that works identically across all contexts (app, website, report). This universal pattern ensures that:

- **Website context** (with immediate i18n needs) is fully supported
- **Application and Report contexts** benefit from the same architecture from the start
- **No context-specific implementations** are needed - one pattern works everywhere
- **Consistency** is maintained across all contexts

The architecture uses:

1. **Relative Units for Text-Based Components**: Use `ch` (character width) and `em`/`rem` units instead of fixed `px` values for component widths
2. **CSS Logical Properties**: Use `inline-start`/`inline-end` instead of `left`/`right` for automatic RTL support
3. **Adaptive Sizing**: Use `min-content`, `max-content`, and `fit-content` for components with dynamic text
4. **RTL via `dir` Attribute**: Support RTL through standard HTML `dir="rtl"` attribute with automatic layout flipping
5. **Optional Language Variants**: Provide optional language-specific token overrides via `[lang]` selectors when needed

### Unit Strategy for i18n

**For Text-Based Components:**
- Use `ch` (character width) units for min/max widths
  - `ch` represents the width of the "0" character in the current font
  - Automatically adapts to different languages and font sizes
  - Example: `min-width: 20ch` means "at least 20 characters wide"

- Use `em`/`rem` for spacing and sizing relative to typography
  - Scales with font size changes
  - Maintains proportional relationships

- Use `min-content`, `max-content`, `fit-content` for adaptive sizing
  - Components automatically adjust to content length
  - No fixed widths that break with longer text

**For Fixed-Size Components:**
- Continue using `px` for components that should not scale (icons, avatars, fixed-height buttons)
- These components don't contain variable-length text

### CSS Logical Properties

Replace directional properties with logical properties:

**Before (LTR-only):**
```css
.menu {
  padding-left: 16px;
  padding-right: 16px;
  margin-left: 8px;
  text-align: left;
}
```

**After (RTL-compatible):**
```css
.menu {
  padding-inline-start: 16px;
  padding-inline-end: 16px;
  margin-inline-start: 8px;
  text-align: start;
}
```

**Benefits:**
- Automatically flips with `dir="rtl"`
- No need for separate RTL stylesheets
- Works seamlessly with language switching

### Universal Pattern Across All Contexts

**Critical Principle:** The i18n architecture must be a **universal pattern that works identically across all contexts** (app, website, report). This is not a context-specific feature - it's a foundational architecture that ensures proper functionality regardless of context.

**Why Universal Pattern:**
1. **Immediate Website Need**: Website context already requires i18n support for multi-language content, RTL languages, and auto-translation. The pattern must work correctly for websites from day one.
2. **Consistency**: Same behavior across all contexts ensures predictable, maintainable code
3. **Future-Proof**: New contexts automatically inherit i18n support without additional work
4. **Single Source of Truth**: One pattern to maintain, not three separate implementations
5. **Developer Experience**: Developers learn one pattern that works everywhere

**Implementation:** The same token structure and CSS patterns apply to **all contexts** (app, website, report). This ensures:

1. **Consistency**: Same i18n behavior regardless of context
2. **Maintainability**: One pattern to maintain, not three
3. **Predictability**: Developers know what to expect in any context
4. **Future-Proof**: New contexts automatically inherit i18n support

**Token Structure:**
- Same relative units (`ch`, `em`, `rem`) in all contexts
- Same logical properties in all contexts
- Same adaptive sizing patterns in all contexts
- Context-specific values (e.g., different `ch` counts) are allowed, but the pattern is universal

**CSS Implementation:**
- Same logical properties (`inline-start`/`inline-end`) in all contexts
- Same `dir` attribute support in all contexts
- Same RTL behavior in all contexts

### Component Size Tokens

**Example: Menu Component (Universal Pattern)**

```json
// tokens/{context}/components/menu/size.json
// Same structure for app, website, and report contexts
{
  "eui": {
    "menu": {
      "size": {
        "min-width": {
          "$value": "20ch",
          "$type": "dimension",
          "$description": "Minimum width for menu list. Uses 'ch' units for i18n support - adapts to text length."
        },
        "max-width": {
          "$value": "50ch",
          "$type": "dimension",
          "$description": "Maximum width for menu list. Uses 'ch' units for i18n support."
        },
        "item": {
          "min-width": {
            "$value": "min-content",
            "$type": "dimension",
            "$description": "Menu item minimum width - adapts to content length for dynamic text."
          },
          "max-width": {
            "$value": "100%",
            "$type": "dimension",
            "$description": "Menu item maximum width - fills available space."
          }
        }
      }
    }
  }
}
```

**Example: Dropdown Component (Universal Pattern)**

```json
// tokens/{context}/components/select/dropdown/size.json
// Same structure for app, website, and report contexts
{
  "eui": {
    "select": {
      "dropdown": {
        "size": {
          "min-width": {
            "$value": "20ch",
            "$type": "dimension",
            "$description": "Minimum width for dropdown. Uses 'ch' units for i18n support."
          },
          "max-width": {
            "$value": "50ch",
            "$type": "dimension",
            "$description": "Maximum width for dropdown. Uses 'ch' units for i18n support."
          }
        }
      }
    }
  }
}
```

**Example: Modal Component (Universal Pattern)**

```json
// tokens/{context}/components/modal/size.json
// Same structure for app, website, and report contexts
{
  "eui": {
    "modal": {
      "size": {
        "sm": {
          "width": {
            "$value": "90ch",
            "$type": "dimension",
            "$description": "Small modal width. Uses 'ch' units for i18n support."
          }
        },
        "md": {
          "width": {
            "$value": "120ch",
            "$type": "dimension",
            "$description": "Medium modal width. Uses 'ch' units for i18n support."
          }
        },
        "lg": {
          "width": {
            "$value": "150ch",
            "$type": "dimension",
            "$description": "Large modal width. Uses 'ch' units for i18n support."
          }
        }
      }
    }
  }
}
```

### CSS Implementation

**Component CSS with Logical Properties:**

```css
.eui-menu {
  /* Logical properties for RTL support */
  padding-inline-start: var(--eui-menu-spacing-padding-inline-start);
  padding-inline-end: var(--eui-menu-spacing-padding-inline-end);
  margin-inline-start: var(--eui-menu-spacing-margin-inline-start);
  margin-inline-end: var(--eui-menu-spacing-margin-inline-end);
  
  /* Text alignment adapts to direction */
  text-align: start;
  
  /* Adaptive width using relative units */
  min-width: var(--eui-menu-size-min-width); /* 20ch */
  max-width: var(--eui-menu-size-max-width); /* 50ch */
  width: fit-content;
}

.eui-menu-item {
  /* Items adapt to content */
  min-width: var(--eui-menu-size-item-min-width); /* min-content */
  max-width: var(--eui-menu-size-item-max-width); /* 100% */
}
```

### RTL Support

**HTML Structure:**

```html
<!-- LTR (default) -->
<div data-eui-context="app" dir="ltr" lang="en">
  <eui-menu>...</eui-menu>
</div>

<!-- RTL for Arabic -->
<div data-eui-context="app" dir="rtl" lang="ar">
  <eui-menu>...</eui-menu>
</div>
```

**Automatic Behavior:**
- Logical properties (`inline-start`/`inline-end`) automatically flip with `dir="rtl"`
- Text alignment (`start`/`end`) adapts automatically
- Flexbox and Grid layouts automatically reverse
- No additional CSS or token changes needed

### Optional Language Variants

For languages with significantly different text characteristics, optional language-specific overrides can be provided:

```json
// tokens/{context}/components/menu/i18n.json (optional)
{
  "eui": {
    "menu": {
      "i18n": {
        "long-text-languages": {
          "$value": {
            "min-width": "25ch",
            "max-width": "60ch"
          },
          "$description": "Width adjustments for languages with longer average word length (de, fi, etc.)"
        },
        "short-text-languages": {
          "$value": {
            "min-width": "15ch",
            "max-width": "40ch"
          },
          "$description": "Width adjustments for languages with shorter average word length (zh, ja, etc.)"
        }
      }
    }
  }
}
```

**CSS Application:**

```css
/* Apply to languages with longer words */
[lang="de"] .eui-menu,
[lang="fi"] .eui-menu {
  min-width: var(--eui-menu-i18n-long-text-languages-min-width);
  max-width: var(--eui-menu-i18n-long-text-languages-max-width);
}

/* Apply to languages with shorter words */
[lang="zh"] .eui-menu,
[lang="ja"] .eui-menu {
  min-width: var(--eui-menu-i18n-short-text-languages-min-width);
  max-width: var(--eui-menu-i18n-short-text-languages-max-width);
}
```

**Note:** Language variants are optional and should only be added when the default `ch`-based sizing doesn't work well for specific languages.

---

## Rationale

### Why Universal Pattern

1. **Immediate Website Requirement**: Website context needs i18n support now - universal pattern ensures it works correctly
2. **Consistency Across Contexts**: Same behavior in app, website, and report contexts
3. **Single Implementation**: One pattern to maintain, not context-specific variants
4. **Future-Proof**: New contexts automatically get i18n support
5. **Developer Clarity**: Developers know the pattern works the same way everywhere

### Why Relative Units (`ch`, `em`, `rem`)

1. **Automatic Adaptation**: `ch` units automatically adapt to different languages and font sizes
2. **No Per-Language Configuration**: Works for all languages without additional tokens
3. **Maintains Proportions**: `em`/`rem` maintain proportional relationships when font size changes
4. **Works Universally**: Same units work correctly in all contexts (app, website, report)
5. **Industry Standard**: Used by Material UI, Ant Design, Carbon Design System

### Why CSS Logical Properties

1. **Automatic RTL Support**: No need for separate RTL stylesheets or manual flipping
2. **Future-Proof**: Standard CSS feature, well-supported in modern browsers
3. **Simpler Maintenance**: One set of styles works for both LTR and RTL
4. **Better Semantics**: Logical properties describe layout intent, not physical direction

### Why `min-content`/`max-content`/`fit-content`

1. **Dynamic Content**: Components automatically adapt to unpredictable text lengths
2. **No Overflow**: Prevents text from being cut off or overflowing
3. **Flexible Layout**: Works with both short and long content
4. **Better UX**: Users see full content without manual width adjustments

### Why Optional Language Variants

1. **Rarely Needed**: Default `ch`-based sizing works for 95% of cases
2. **Targeted Overrides**: Only add when specific languages need different sizing
3. **Low Maintenance**: Most components won't need language variants
4. **Progressive Enhancement**: Start simple, add complexity only when needed

---

## Consequences

### Positive

- **Works Out of the Box**: Components adapt to different languages automatically
- **Low Maintenance Cost**: No per-language token variants needed for most cases
- **Simple Structure**: Minimal changes to existing token architecture
- **RTL Support**: Automatic RTL support via standard HTML `dir` attribute
- **Auto-Translation Compatible**: Works seamlessly with third-party translation services
- **Universal Pattern**: Same architecture works identically across all contexts (app, website, report)
- **Immediate Website Support**: Addresses current need for website context i18n
- **Future-Proof**: New contexts automatically inherit i18n support
- **Consistency**: One pattern ensures consistent behavior everywhere
- **Industry Standard**: Follows practices from Material UI, Ant Design, Carbon Design System

### Trade-offs

- **Migration Required**: Existing components with fixed `px` widths need to be updated
- **CSS Updates**: All components need to use logical properties instead of directional properties
- **Testing**: Need to test with RTL languages and various text lengths
- **Implementation**: System uses `ch` units and logical properties for adaptive sizing and RTL support (handled automatically by components)

### Implementation Requirements

1. **Token Updates**: Replace fixed `px` widths with `ch`/`em` for text-based components
2. **CSS Updates**: Replace `left`/`right` with `inline-start`/`inline-end`
3. **Component Testing**: Test with RTL languages (Arabic, Hebrew) and long text (German, Finnish)
4. **Documentation**: Document unit usage rules and RTL support

---

## Explicit Rules

### Unit Usage Rules

1. **Text-Based Components** (menu, dropdown, modal, card with text):
   - Use `ch` units for `min-width` and `max-width`
   - Use `min-content`, `max-content`, or `fit-content` for adaptive sizing
   - Avoid fixed `px` widths for text containers

2. **Fixed-Size Components** (icons, avatars, buttons with fixed height):
   - Continue using `px` for dimensions that should not scale
   - These components don't contain variable-length text

3. **Spacing and Typography**:
   - Continue using `em`/`rem` as per [ADR-0018](./ADR-0018-typography-units-architecture-rem-em-px.md)
   - Logical properties for spacing: `padding-inline`, `margin-inline`

### CSS Logical Properties Rules

1. **Always Use Logical Properties**:
   - `inline-start`/`inline-end` instead of `left`/`right`
   - `block-start`/`block-end` instead of `top`/`bottom`
   - `margin-inline`/`padding-inline` instead of `margin-left/right`/`padding-left/right`

2. **Text Alignment**:
   - Use `text-align: start` instead of `text-align: left`
   - Use `text-align: end` instead of `text-align: right`

3. **Flexbox/Grid**:
   - Use `justify-content: start`/`end` instead of `left`/`right`
   - Use `align-items: start`/`end` instead of `top`/`bottom`

### RTL Support Rules

1. **HTML `dir` Attribute**:
   - Set `dir="ltr"` or `dir="rtl"` on the root element or context container
   - Use `lang` attribute for language-specific overrides (optional)

2. **No Manual RTL Styles**:
   - Don't create separate RTL stylesheets
   - Logical properties handle RTL automatically

3. **Icon Flipping**:
   - Icons that represent direction (arrows, chevrons) may need manual flipping
   - Use CSS `transform: scaleX(-1)` or separate RTL icon variants if needed

### Language Variants Rules

1. **Default First**: Always use default `ch`-based sizing first
2. **Add Only When Needed**: Only add language variants when default sizing doesn't work
3. **Test Before Adding**: Test with actual content before adding language-specific tokens
4. **Document Reason**: Document why a language variant is needed

---

## Examples

### Example 1: Menu Component Migration

**Before:**

Token definition:
```json
{
  "eui": {
    "menu": {
      "size": {
        "min-width": {
          "$value": "200px",
          "$type": "dimension"
        },
        "max-width": {
          "$value": "400px",
          "$type": "dimension"
        }
      }
    }
  }
}
```

CSS implementation:
```css
.eui-menu {
  min-width: 200px;
  max-width: 400px;
  padding-left: 16px;
  padding-right: 16px;
  text-align: left;
}
```

**After:**

Token definition:
```json
{
  "eui": {
    "menu": {
      "size": {
        "min-width": {
          "$value": "20ch",
          "$type": "dimension",
          "$description": "Minimum width for menu list. Uses 'ch' units for i18n support."
        },
        "max-width": {
          "$value": "50ch",
          "$type": "dimension",
          "$description": "Maximum width for menu list. Uses 'ch' units for i18n support."
        }
      }
    }
  }
}
```

CSS implementation:
```css
.eui-menu {
  min-width: var(--eui-menu-size-min-width); /* 20ch */
  max-width: var(--eui-menu-size-max-width); /* 50ch */
  width: fit-content;
  padding-inline-start: 16px;
  padding-inline-end: 16px;
  text-align: start;
}
```

### Example 2: RTL Layout

**HTML:**
```html
<div data-eui-context="app" dir="rtl" lang="ar">
  <eui-menu>
    <eui-menu-item>العنصر الأول</eui-menu-item>
    <eui-menu-item>العنصر الثاني</eui-menu-item>
  </eui-menu>
</div>
```

**Result:**

When `dir="rtl"` is set:
- Menu items align to the right automatically
- Padding and margins flip automatically (via logical properties)
- Text alignment is right-to-left
- No additional CSS needed - logical properties handle everything

### Example 3: Dynamic Content

**Scenario:** Menu with project names of varying lengths

**English content:**
```
Project Alpha
Beta Project
```

**German content (longer words):**
```
Projekt Alpha
Beta-Projekt mit sehr langem Namen
```

**Result:**

With `ch` units and `fit-content`:
- Menu width adapts from `20ch` (minimum) to `50ch` (maximum) based on content
- No overflow or text cutoff - content always fits
- Works for both short and long names automatically
- German text with longer words expands the menu appropriately

### Example 4: Language Variant (Optional)

**Scenario:** German menu needs wider min-width

**Default (works for most languages):**
```css
.eui-menu {
  min-width: 20ch;
  max-width: 50ch;
}
```

**German Override (only if needed):**
```css
[lang="de"] .eui-menu {
  min-width: 25ch;
  max-width: 60ch;
}
```

---

## Notes

This ADR establishes the i18n and RTL architecture. For typography unit details, see:
- [ADR-0018](./ADR-0018-typography-units-architecture-rem-em-px.md) — Typography Units Architecture

For context and theme organization, see:
- [ADR-0023](./ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization - Context and Theme Separation

**Implementation Timeline:**
1. **Phase 1**: Update token structure (replace `px` with `ch` for text-based components)
2. **Phase 2**: Update component CSS (logical properties, adaptive sizing)
3. **Phase 3**: Test with RTL languages and various text lengths
4. **Phase 4**: Add language variants only if needed

**Testing Requirements:**
- Test with LTR languages (English, German, French, Spanish)
- Test with RTL languages (Arabic, Hebrew)
- Test with long text (German compound words, Finnish long words)
- Test with short text (Chinese, Japanese)
- Test with dynamic content (user-generated project names, menu items)

**Future Considerations:**
- Integration with translation services (i18next, react-intl)
- Locale-specific number and date formatting
- Currency and unit formatting
- Bi-directional text handling (mixed LTR/RTL content)

