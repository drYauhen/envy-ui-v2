# ADR-0018: Typography Units Architecture - REM, EM, and PX

**Status:** Accepted  
**Date:** 2025-01-21  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  
- [ADR-0017](./ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes  
- [ADR-0014](./ADR-0014-color-model-tonal-scales-and-contextual-architecture.md) — Color Model, Tonal Scales, and Contextual Architecture

---

## Important Note

**⚠️ Disclaimer:** All specific font-size values (e.g., 14px, 16px, 10px) mentioned in this ADR are **example values** for demonstration purposes only. The actual font-size values used in the system are **theme-dependent** and may differ from these examples. The architecture and logic described here (REM, EM, PX unit usage) remains consistent regardless of the specific values chosen. Concrete font-size decisions are made at the theme level and can evolve over time.

---

## Context

The UI system needs a typography architecture that:

1. **Supports multiple contexts** with different typography requirements:
   - **Application** - Standard UI (example: 14px/16px base - actual values are theme-dependent)
   - **Website** - Brand-specific websites (example: 18px base - actual values are theme-dependent)
   - **Report** - Multiple use cases (all values below are examples):
     - Compact reports (example: 10px base - maximum content)
     - Archive reports (example: 11-12px base - formal compliance)
     - Accessibility reports (example: 16px base - WCAG compliance)
     - Presentation reports (example: 14px base - visual appeal)

2. **Scales appropriately** when themes change (example: default theme base → accessibility theme base, where actual values are theme-dependent)

3. **Maintains visual consistency** while allowing flexibility

4. **Follows industry standards** for maintainability and developer familiarity

5. **Future-proof** - should be easy to simplify if needed, but hard to expand if started narrow (graceful degradation strategy)

The challenge is choosing the right CSS units (REM, EM, PX) for different aspects of component typography to achieve global consistency, proportional scaling, and fixed dimensions where needed.

---

## Decision

I decided to implement a **hybrid typography unit architecture** using:

1. **REM units** - For component font-size (typography)
2. **EM units** - For spacing and internal elements (padding, gap, icons)
3. **PX units** - For fixed dimensions (height, borders, shadows)

### Typography Foundation Architecture

```
Foundation → Semantic → Context → Theme → Component
```

**Structure:**
- **Foundations** (`tokens/foundations/typography/`):
  - `font-size.json` - Typography scale in REM (xs, sm, base, md, lg, xl, 2xl...6xl)
  - `font-family.json` - Font families (UI, monospace)
  - `font-weight.json` - Font weights (light, normal, medium, semibold, bold)
  - `line-height.json` - Line heights (none, tight, normal, relaxed, loose)

- **Semantic** (`tokens/semantic/typography/`):
  - `text-styles.json` - Semantic text styles (heading-1 through heading-6, body, caption, code)

- **Contexts/Themes** (`tokens/themes/`):
  - Base font-size per theme (example values: `app/default` might use one base size, `app/accessibility` might use a larger base - actual values are theme-dependent)
  - Component-level font-size overrides per theme (optional)

- **Components** (`tokens/components/*/`):
  - Component-specific typography tokens in REM
  - Can be overridden per theme

### Base Font-Size Setup

**CSS Level:**
```css
:root {
  font-size: var(--eui-typography-base-fontSize, 14px); /* 14px is example fallback - actual value comes from theme */
}
```

**Theme Overrides (example values):**
```css
[data-eui-context="app"][data-eui-theme="default"] {
  --eui-typography-base-fontSize: 14px; /* Example value - actual may differ */
}

[data-eui-context="app"][data-eui-theme="accessibility"] {
  --eui-typography-base-fontSize: 16px; /* Example value - actual may differ */
}

[data-eui-context="report"][data-eui-theme="compact"] {
  --eui-typography-base-fontSize: 10px; /* Example value - actual may differ */
}
```

**Rationale:** Base font-size must be set at CSS `:root` level because all REM units calculate from root. Theme switching updates the root value, causing all REM-based typography to recalculate automatically.

---

## Unit Usage Rules

### REM Units - Component Typography

**Used for:**
- Component font-size
- Global scaling from `:root` font-size

**Example:**
```json
// tokens/components/button/size.json
{
  "button": {
    "size": {
      "md": {
        "font": {
          "size": { "$value": "0.95rem" }
        }
      }
    }
  }
}
```

```css
.eui-button {
  font-size: var(--eui-button-size-md-font-size); /* = 0.95rem */
}
```

**Why REM:**
- ✅ Scales globally with `:root` font-size
- ✅ Theme switching affects all components automatically
- ✅ Industry standard for typography (Material Design, Ant Design, Chakra UI)
- ✅ Simple mental model (everything relative to document root)
- ✅ Predictable (no cascading font-size issues)

**Calculation (example with hypothetical theme values):**
```
If default theme base = 14px: 0.95rem = 0.95 × 14px = 13.3px
If accessibility theme base = 16px: 0.95rem = 0.95 × 16px = 15.2px
(Actual values depend on theme configuration)
```

---

### EM Units - Spacing and Internal Elements

**Used for:**
- Padding (inside component)
- Gap (between elements)
- Icon sizes
- Internal spacing
- Elements that should scale proportionally with component font-size

**Important Note:** If a component's root element has `font-size: 1rem`, then using `em` units inside that component is **functionally equivalent** to using `rem` units, because `1em` (relative to component) equals `1rem` (component font-size) equals the base font-size from `:root`. The advantage of `em` becomes apparent when:
- Component has a different font-size (e.g., `0.9rem` or `1.2rem`)
- Internal elements need to scale proportionally with that component-specific font-size
- Component variants have different font-sizes (e.g., small button `0.875rem` vs large button `1.125rem`)

**Example:**
```css
.eui-button {
  font-size: var(--eui-button-size-md-font-size); /* = 0.95rem (example) */
  padding: 0.5em 1em; /* Scales with button font-size (0.95rem) */
  gap: 0.5em;
}

.eui-button__icon {
  width: 1.2em; /* Scales with button font-size (0.95rem) */
  height: 1.2em;
}
```

**Why EM:**
- ✅ Scales proportionally with component font-size
- ✅ Maintains visual harmony (icons/spacing stay in proportion)
- ✅ Better for complex components with internal hierarchy
- ✅ Industry standard for spacing within components (Ant Design, Chakra UI)
- ✅ Enables component-level scaling when component font-size differs from base

**Calculation (example with hypothetical theme values):**
```
If button font-size = 0.95rem = 13.3px (example: default theme base 14px)
  → padding: 0.5em = 6.65px (relative to 0.95rem)
  → gap: 0.5em = 6.65px
  → icon: 1.2em = 15.96px

If button font-size = 1rem (matches base)
  → 1em = 1rem (equivalent behavior)
  → EM and REM would behave the same

If button font-size = 0.9rem (smaller than base)
  → 1em = 0.9rem (different from base, enables component-level scaling)
  → Internal elements with EM scale proportionally
(Actual values depend on theme configuration)
```

---

### PX Units - Fixed Dimensions

**Used for:**
- Component height (fixed)
- Border width (always same)
- Shadow blur (always same)
- Min/max dimensions
- Elements that should remain constant across themes

**Example:**
```css
.eui-button {
  height: 40px; /* Fixed height */
  border-width: 1px; /* Always 1px */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); /* Fixed shadow */
}
```

**Why PX:**
- ✅ Consistency across themes
- ✅ Borders always same width regardless of font-size
- ✅ Component heights maintain visual consistency
- ✅ Shadows maintain same blur
- ✅ Industry standard for fixed dimensions

---

## Component Implementation Pattern

### Best Practice: Explicit Font-Size on Component Root

**If a component uses EM units internally (for spacing, icons, etc.), it should explicitly set `font-size` on its root element.**

**Why:**
- ✅ Makes EM calculations predictable (EM units calculate from component's font-size)
- ✅ Prevents unexpected behavior from inherited font-sizes
- ✅ Enables component-level scaling (change root font-size → all EM values scale)
- ✅ Clear intent (component owns its typography scale)

**Pattern:**
```css
.eui-button {
  /* Explicitly set font-size on component root (REQUIRED if using EM internally) */
  font-size: var(--eui-button-size-md-font-size); /* = 0.95rem (example) */
  
  /* Now EM units inside component calculate from this font-size */
  padding: 0.5em 1em; /* = 0.5 × component font-size */
  gap: 0.5em;
}
```

**Note:** Even if component font-size is `1rem` (equals base), it's still good practice to set it explicitly for clarity and future flexibility.

---

### Complete Example: Button Component

**Tokens:**
```json
// tokens/components/button/size.json
{
  "button": {
    "size": {
      "md": {
        "height": { "$value": "40px" }, // Fixed
        "padding": {
          "inline": { "$value": "20px" } // Can be changed to em later
        },
        "font": {
          "size": { "$value": "0.95rem" } // Relative to :root
        }
      }
    }
  }
}
```

**CSS:**
```css
.eui-button {
  /* Typography: REM - MUST be set on component root if using EM internally */
  font-size: var(--eui-button-size-md-font-size); /* = 0.95rem (example) */
  font-weight: var(--eui-button-size-md-font-weight);
  
  /* Dimensions: PX (fixed) */
  height: var(--eui-button-size-md-height); /* = 40px */
  border-width: 1px; /* Fixed */
  
  /* Spacing: EM (proportional) - calculates from component font-size above */
  padding: 0.5em var(--eui-button-size-md-padding-inline); /* Can mix em + px */
  gap: 0.5em; /* Relative to button font-size (0.95rem) */
}

.eui-button__icon {
  /* Icons: EM (proportional) - calculates from component font-size */
  width: 1.2em; /* Relative to button font-size (0.95rem) */
  height: 1.2em;
}
```

**Browser Inspector Result:**
```css
.eui-button {
  font-size: 0.95rem;        /* REM */
  height: 40px;              /* PX */
  border-width: 1px;         /* PX */
  padding: 0.5em 20px;       /* EM + PX (mixed) */
  gap: 0.5em;                /* EM */
}

.eui-button__icon {
  width: 1.2em;              /* EM */
  height: 1.2em;             /* EM */
}
```

---

## Theme System for Typography

### Base Font-Size per Theme

**Application Context (example values):**
```json
// tokens/themes/app/default.json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": { "$value": "14px" } // Example value - actual may differ
      }
    }
  }
}

// tokens/themes/app/accessibility.json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": { "$value": "16px" } // Example value - actual may differ
      }
    }
  }
}
```

### Component-Level Overrides (Optional)

**For specific use cases (example: compact reports - all values are examples):**
```json
// tokens/themes/report/compact.json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": { "$value": "10px" } // Example value - actual may differ
      }
    },
    "button": {
      "size": {
        "md": {
          "font": {
            "size": { "$value": "0.85rem" } // Example: smaller multiplier for compact theme
          }
        }
      }
    }
  }
}
```

**Rationale:** Component-level overrides allow fine-grained control for specific use cases (e.g., compact reports need smaller components) while maintaining global consistency within a theme.

---

## Rationale

### Why REM for Typography

1. **Industry Standard:**
   - Material Design uses REM
   - Ant Design uses REM
   - Chakra UI uses REM
   - Tailwind CSS uses REM
   - Bootstrap uses REM

2. **Global Consistency:**
   - All components scale together
   - Theme switching affects everything uniformly
   - Simple mental model

3. **Theme Flexibility:**
   - Change `:root` font-size → all components scale
   - Different themes can have different base sizes
   - Components inherit scaling automatically

4. **Predictability:**
   - No cascading font-size issues
   - Easy to debug (all sizes trace back to root)
   - Clear calculation chain

### Why EM for Spacing/Icons

1. **Proportional Scaling:**
   - Spacing scales with component font-size
   - Icons stay in proportion
   - Visual harmony maintained

2. **Component Isolation:**
   - Each component can have its own font-size (set explicitly on root)
   - Internal elements scale proportionally with component font-size
   - Better for complex components
   - Enables component-level scaling (change root font-size → all EM values scale)

3. **Industry Standard:**
   - Ant Design uses EM for spacing (components set font-size on root)
   - Chakra UI uses EM for spacing (components set font-size on root)
   - Common pattern for internal elements

**Best Practice:** If a component uses EM units internally, it **must** explicitly set `font-size` on its root element. This makes EM calculations predictable and prevents unexpected behavior from inherited font-sizes.

### Why PX for Fixed Dimensions

1. **Consistency:**
   - Borders always same width
   - Heights maintain component consistency
   - Shadows maintain same blur

2. **Predictability:**
   - Fixed values don't change with font-size
   - Clear intent (this should not scale)

3. **Industry Standard:**
   - All design systems use PX for borders
   - All design systems use PX for fixed heights
   - Common pattern for non-scaling elements

### Why Hybrid Approach (Not Pure REM or Pure EM)

**Pure REM approach:**
- ❌ No component isolation
- ❌ Can't scale components independently
- ❌ Harder to handle different use cases within same context

**Pure EM approach:**
- ❌ Not industry standard for typography
- ❌ Complex mental model (cascading font-size)
- ❌ Harder debugging
- ❌ Theme switching complexity

**Hybrid approach (REM + EM + PX):**
- ✅ Best of all worlds
- ✅ Industry standard pattern
- ✅ Global consistency (REM)
- ✅ Proportional scaling (EM)
- ✅ Fixed dimensions (PX)
- ✅ Flexible and future-proof

### Why Graceful Degradation Strategy (Start Wide, Simplify Later)

**Start with wide base (current approach):**
- ✅ Full typography scale (xs-6xl)
- ✅ Complete text styles
- ✅ Theme system with component overrides
- ✅ Multiple contexts/themes support

**Benefits:**
- ✅ Easy to simplify later (remove unused tokens)
- ✅ No breaking changes when simplifying
- ✅ Handles unknown future requirements
- ✅ Can adapt to new use cases

**If started narrow:**
- ❌ Expanding later = breaking changes
- ❌ Need to refactor components
- ❌ Technical debt accumulates
- ❌ Can't predict all requirements upfront

---

## Consequences

### Benefits

1. **Flexibility:**
   - Supports multiple contexts with different typography needs
   - Theme system allows fine-grained control
   - Component-level overrides for specific use cases

2. **Maintainability:**
   - Industry standard pattern (familiar to developers)
   - Clear unit usage rules
   - Easy to debug (rem → root, em → component, px → fixed)

3. **Scalability:**
   - Global scaling via REM
   - Proportional scaling via EM
   - Consistent dimensions via PX

4. **Future-Proof:**
   - Can simplify later if needed
   - Can expand without breaking changes
   - Handles unknown requirements

5. **Consistency:**
   - Matches industry standards
   - Predictable behavior
   - Visual harmony across components

### Trade-offs

1. **Complexity:**
   - Three unit types to understand (REM, EM, PX)
   - Need to know when to use which
   - More concepts to learn

2. **Implementation:**
   - Need to set base font-size at `:root`
   - Need theme system for overrides
   - Component tokens need proper structure

3. **Maintenance:**
   - Need to maintain typography scale
   - Need to maintain theme overrides
   - Need documentation for unit usage rules

### Risks and Mitigations

**Risk:** Developers might use wrong unit type
- **Mitigation:** Clear documentation, linting rules, code review

**Risk:** Theme system might become too complex
- **Mitigation:** Start wide, simplify later based on usage, document decisions

**Risk:** Performance impact of CSS calculations
- **Mitigation:** REM/EM calculations are native CSS, minimal performance impact

---

## Alternatives Considered

### Alternative 1: Pure REM Approach

**Description:** Use only REM units for all typography and spacing.

**Rejected because:**
- ❌ No component isolation
- ❌ Can't scale components independently
- ❌ Harder to handle different use cases
- ❌ Spacing doesn't scale proportionally with component

### Alternative 2: Pure EM Approach

**Description:** Use only EM units, set font-size on component root.

**Rejected because:**
- ❌ Not industry standard for typography
- ❌ Complex mental model (cascading font-size)
- ❌ Harder debugging
- ❌ Theme switching complexity
- ❌ Breaking changes would be needed

### Alternative 3: REM + PX (No EM)

**Description:** Use REM for typography, PX for everything else.

**Rejected because:**
- ❌ Spacing doesn't scale proportionally
- ❌ Icons don't scale with component
- ❌ Less visual harmony
- ❌ Common industry pattern includes EM for spacing

---

## Implementation Notes

### Current Implementation Status

- ✅ Foundation typography tokens created (`tokens/foundations/typography/`)
- ✅ Semantic text styles created (`tokens/semantic/typography/`)
- ✅ Theme base font-size tokens created (`tokens/themes/*/`)
- ✅ Component typography tokens use REM (`tokens/components/*/size.json`)
- ✅ Base font-size set in CSS (`:root` in `.storybook/preview.css`)
- ⏳ EM units for spacing/icons (can be migrated gradually)

### Migration Path

**Current (Phase 1):**
- REM for typography ✅
- PX for fixed dimensions ✅
- PX/REM mix for spacing ⏳

**Enhanced (Phase 2 - Optional):**
- REM for typography ✅
- EM for spacing/icons ⏳
- PX for fixed dimensions ✅

**Migration is non-breaking:**
- Can change padding from `px` to `em` gradually
- Can change gap from `rem` to `em` gradually
- No breaking changes

---

## References

- Material Design Typography: Uses REM for font-size
- Ant Design Typography: Uses REM for font-size, EM for spacing
- Chakra UI Typography: Uses REM for font-size, EM for spacing
- Tailwind CSS: Uses REM for typography scale
- Bootstrap: Uses REM for typography, PX for fixed dimensions

---

## Changelog

- 2025-01-21: Initial ADR - Typography units architecture decision

