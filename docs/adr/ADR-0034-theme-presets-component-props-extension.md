# ADR-0034: Theme Presets - Component Props Extension for Third-Party Integration

**Status:** Proposed
**Date:** 2026-01-06
**Last Updated:** 2026-01-06
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0030](./ADR-0030-third-party-library-integration-strategy.md) — Third-Party Library Integration Strategy
- [ADR-0032](./ADR-0032-token-override-strategy-multi-tenant-generative-ui.md) — Token Override Strategy for Multi-Tenant and Generative UI
- [ADR-0017](./ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes
- [ADR-0023](./ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization - Context and Theme Separation

---

## Context

The design system uses a **token-first architecture** where design tokens are the single source of truth for visual styling. Tokens are consumed as CSS custom properties and control all visual aspects of components.

However, **third-party libraries** (e.g., Handsontable, React Grid Layout, Recharts) require configuration beyond CSS:

1. **Component props** that control behavior and appearance
2. **Theme-specific settings** that vary by visual identity
3. **Layout preferences** that differ between contexts (app, website, report)
4. **Integration parameters** that change with themes

**Current limitations:**

- Visual tokens only control CSS custom properties
- Theme switching changes styles but not component props
- Third-party component configuration is hardcoded in stories/components
- No single source of truth for theme-dependent component behavior

**Example:** Handsontable integration requires:
- CSS tokens for colors, spacing, borders (handled by current system)
- Props like `theme="ht-theme-main"`, `stretchH="all"` (currently hardcoded)
- These props should change with theme switching (e.g., toy-r-us theme → different Handsontable theme)

**Requirements:**

1. Extend theme concept beyond CSS tokens to include component props
2. Make third-party component configuration theme-aware
3. Maintain token-first principles
4. Support context/theme switching for props
5. Enable multi-tenant customization (per ADR-0032)

---

## Decision

I decided to introduce **Theme Presets** as a metadata extension layer that defines theme-dependent component props alongside visual tokens.

### Core Concepts

1. **Theme Presets Format**: `.presets.meta.json` files
   - Located alongside theme token files: `tokens/{context}/themes/{theme}.presets.meta.json`
   - DTCG-compliant metadata (excluded from CSS generation via `.meta.json` suffix)
   - Defines component props, layout settings, and integration parameters

2. **Preset Structure**:
   ```json
   {
     "$schema": "../../../schemas/theme-presets.schema.json",
     "$description": "Component presets for third-party integrations",
     "components": {
       "handsontable": {
         "props": {
           "theme": "ht-theme-main",
           "stretchH": "all",
           "className": "ht-theme-main"
         },
         "layout": {
           "centerContent": false,
           "maxWidth": "100%"
         },
         "$meta": {
           "description": "Default Handsontable configuration",
           "vendor": "handsontable",
           "version": "^14.0.0"
         }
       }
     }
   }
   ```

3. **Token References in Presets**:
   - Presets can reference visual tokens using `{eui.token.path}` syntax
   - Resolved at runtime from CSS custom properties
   - Example: `"fontFamily": "{eui.typography.base.fontFamily}"`

4. **Runtime Loading**:
   - Presets loaded via `loadThemePresets(context, theme)` function
   - Cached per context/theme combination
   - Returns null if preset file doesn't exist (graceful degradation)

5. **React Hook Integration**:
   ```typescript
   const hotPresets = useThemePresets('app', 'default', 'handsontable');

   <HotTable
     data={data}
     {...hotPresets?.props}
     colHeaders={['Name', 'Age']}
   />
   ```

### File Structure

```
tokens/
├── app/
│   └── themes/
│       ├── default.json                    # Visual tokens
│       ├── default.presets.meta.json       # Component presets
│       ├── accessibility.json
│       └── accessibility.presets.meta.json
├── website/
│   └── themes/
│       ├── default.json
│       ├── default.presets.meta.json
│       ├── toy-r-us.json
│       └── toy-r-us.presets.meta.json      # Custom presets for toy-r-us
└── report/
    └── themes/
        ├── print.json
        └── print.presets.meta.json
```

### Build Pipeline Integration

**No changes to Style Dictionary pipeline:**
- `.presets.meta.json` files excluded from CSS generation (via `.meta.json` suffix)
- Metadata filter already handles this pattern
- Presets copied to `public/tokens/{context}/themes/` for runtime access

**New build step (optional):**
- `npm run tokens:validate-presets` - validates preset schemas
- Checks token references are valid
- Ensures required fields are present

---

## Rationale

### Why This Approach?

**1. Extends Token-First Architecture Naturally**
- Visual tokens → CSS custom properties
- Preset tokens → component props
- Both layers controlled by theme switching
- Consistent mental model

**2. Maintains Separation of Concerns**
- Visual styling: `.json` files → Style Dictionary → CSS
- Behavioral configuration: `.presets.meta.json` files → runtime loading
- Clear distinction between style and behavior

**3. Compatible with Existing Systems**
- ADR-0030: Third-party CSS in `@layer third-party`, presets control props
- ADR-0032: Presets can be per-tenant overrides (same patch pattern)
- No breaking changes to token pipeline

**4. Enables Theme-Aware Components**
- Theme switching changes both CSS and props
- Third-party components adapt to visual identity
- Example: toy-r-us theme → playful Handsontable theme

**5. Scalable for Multi-Tenant**
- Tenant-specific presets as JSON patches (per ADR-0032)
- Small override files instead of duplicating entire configs
- Same composition pattern as token overrides

**6. Developer-Friendly**
- Single source of truth for component configuration
- TypeScript types for preset structure
- Runtime validation optional but available

### Why Not Alternative Approaches?

**Alternative 1: Props in Visual Token Files**
- ❌ Mixes CSS and JavaScript concerns
- ❌ Style Dictionary would need custom transforms
- ❌ Breaks token-first principle (tokens are CSS values)

**Alternative 2: Props in Component Files**
- ❌ Hardcoded, not theme-aware
- ❌ Duplicated across stories/components
- ❌ No single source of truth

**Alternative 3: Separate Config System**
- ❌ Disconnected from theme system
- ❌ Doesn't follow token organization
- ❌ Harder to maintain consistency

---

## Consequences

### Positive

- **Theme-Aware Props**: Component configuration changes with themes
- **Single Source of Truth**: Presets defined alongside theme tokens
- **Multi-Tenant Ready**: Compatible with ADR-0032 override pattern
- **Token-First Maintained**: CSS tokens unchanged, presets are metadata layer
- **Graceful Degradation**: Missing presets don't break components
- **Developer Experience**: Clear, predictable pattern for third-party integration

### Trade-offs

- **Additional Files**: Each theme may have corresponding `.presets.meta.json`
- **Runtime Loading**: Presets fetched at runtime (cached, but initial fetch required)
- **Validation Needed**: Token references must be validated
- **Documentation Required**: Pattern must be documented for consistency

### Implementation Requirements

1. **Create preset schema** (`schemas/theme-presets.schema.json`)
2. **Update build pipeline** to copy presets to public directory
3. **Implement runtime API**:
   - `loadThemePresets(context, theme)` - fetch and cache
   - `useThemePresets(context, theme, component)` - React hook
   - `resolveTokenReferences(obj)` - resolve `{eui.token.path}` syntax
4. **Create TypeScript types** for preset structure
5. **Add validation script** (optional): `npm run tokens:validate-presets`
6. **Document pattern** in workflows and architecture docs
7. **Create example presets** for existing integrations (Handsontable)

### Migration Path

**Existing integrations (Handsontable, React Grid Layout):**
1. Extract hardcoded props to preset files
2. Update stories to use `useThemePresets` hook
3. Verify theme switching updates both CSS and props

**New integrations:**
1. Follow ADR-0030 for CSS integration
2. Create preset file for theme-dependent props
3. Use `useThemePresets` hook in components

---

## Notes

### Example: Handsontable Integration

**Before (Hardcoded):**
```tsx
<HotTable
  data={data}
  theme="ht-theme-main"
  stretchH="all"
  className="ht-theme-main"
  colHeaders={['Name', 'Age']}
/>
```

**After (Theme Presets):**
```tsx
const hotPresets = useThemePresets('app', currentTheme, 'handsontable');

<HotTable
  data={data}
  {...hotPresets?.props}
  colHeaders={['Name', 'Age']}
/>
```

**Preset File (`tokens/app/themes/default.presets.meta.json`):**
```json
{
  "components": {
    "handsontable": {
      "props": {
        "theme": "ht-theme-main",
        "stretchH": "all",
        "className": "ht-theme-main"
      }
    }
  }
}
```

**Toy-R-Us Theme (`tokens/website/themes/toy-r-us.presets.meta.json`):**
```json
{
  "components": {
    "handsontable": {
      "props": {
        "theme": "ht-theme-playful",
        "className": "ht-theme-playful hot-toy-theme"
      },
      "layout": {
        "centerContent": true,
        "maxWidth": "1200px"
      }
    }
  }
}
```

### Token Reference Example

**Recharts integration with token references:**
```json
{
  "components": {
    "recharts": {
      "props": {
        "style": {
          "fontFamily": "{eui.typography.base.fontFamily}",
          "fontSize": "{eui.typography.base.fontSize}"
        }
      },
      "palette": {
        "primary": [
          "{eui.color.chart.primary.1}",
          "{eui.color.chart.primary.2}",
          "{eui.color.chart.primary.3}"
        ]
      }
    }
  }
}
```

### Multi-Tenant Override Pattern

**Base preset** (`tokens/app/themes/default.presets.meta.json`):
```json
{
  "components": {
    "handsontable": {
      "props": { "theme": "ht-theme-main" }
    }
  }
}
```

**Tenant override** (per ADR-0032 patch pattern):
```json
{
  "components": {
    "handsontable": {
      "props": { "theme": "ht-theme-tenant-custom" }
    }
  }
}
```

Composed at build/runtime: `base + override → final preset`

### Validation Rules

**Schema validation:**
- `components` must be object
- Each component must have valid structure
- Token references must match `{eui.*}` pattern

**Token reference validation:**
- Referenced tokens must exist in token system
- Path must be valid: `{eui.category.subcategory.token}`
- Resolved value must be compatible with prop type

### Future Extensions

**Possible enhancements (not in scope for this ADR):**
1. **Type generation** from presets to TypeScript types
2. **AI-generated presets** following ADR-0032 validation patterns
3. **Preset inheritance** (theme extends base preset)
4. **Preset variants** (per-component variants within theme)
5. **Runtime preset switching** without page reload
