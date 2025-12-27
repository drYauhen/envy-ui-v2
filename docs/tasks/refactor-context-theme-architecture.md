# Task: Refactor Context & Theme Architecture for Future-Proof Multi-Platform Support

**Status:** Ready for Implementation  
**Created:** 2025-12-26  
**Priority:** High  
**Estimated Complexity:** High  
**Related ADRs:** [ADR-0017](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md)

---

## Problem Statement

The current context/theme architecture has several critical issues:

1. **Nested Context Problem**: Contexts can be nested (e.g., `app` contains `website` preview), but current CSS selector approach doesn't support this. Elements can exist in multiple contexts simultaneously, and there's no clear resolution strategy.

2. **Figma Variables Incompatibility**: Current export only uses `mode: "default"`, losing all context/theme information. Figma Variables use **modes** to represent different values for the same variable, which should map to context+theme combinations.

3. **Not Future-Proof**: Other tools (AI generators, design tools) may not understand CSS selectors or data attributes. They need flat, resolved token structures.

4. **Architectural Confusion**: Current structure mixes contexts and themes in `tokens/themes/` folder. According to ADR-0017, contexts should be separate from themes, but implementation doesn't match the architecture.

---

## Goals

1. **Separate Contexts from Themes**: Create `tokens/contexts/` for context-specific overrides, keep `tokens/themes/` only for themes within contexts.

2. **Support Nested Contexts**: Implement CSS cascade-based resolution where inner contexts override outer contexts naturally.

3. **Figma Variables Support**: Generate Figma Variables with modes for each context+theme combination (e.g., `app-default`, `website-dark`).

4. **Platform-Agnostic Token Storage**: Keep token storage flat and clear, with platform-specific resolution layers.

5. **Future-Proof**: Ensure architecture works with:
   - CSS (current)
   - Figma Variables (modes)
   - Future AI tools (flat resolved tokens)
   - Other design tools (API/JSON exports)

---

## Current State Analysis

### Current Structure:
```
tokens/
  themes/
    app/
      default.json          # Mixes context (app) and theme (default)
      accessibility.json
    website/
      default.json          # Mixes context (website) and theme (default)
      dark.json
    report/
      print.json
      screen.json
```

### Current CSS Generation:
- Generates: `[data-eui-context="app"][data-eui-theme="default"]`
- Problem: No support for nested contexts
- Problem: Context and theme are mixed in file structure

### Current Figma Export:
- Only exports `mode: "default"`
- Loses all context/theme information
- Cannot switch between contexts/themes in Figma

---

## Target Architecture

### 1. Token Storage Structure

```
tokens/
  foundations/          # Base tokens (unchanged)
  semantic/            # Semantic tokens (unchanged)
  contexts/            # NEW: Context-specific overrides
    app.json           # App context overrides (e.g., fontSize: 14px)
    website.json       # Website context overrides (e.g., fontSize: 16px)
    report.json        # Report context overrides
  themes/              # REFACTORED: Only themes within contexts
    app/
      default.json     # Theme overrides for app context
      accessibility.json
    website/
      default.json     # Theme overrides for website context
      dark.json
    report/
      print.json
      screen.json
  components/          # Component tokens (unchanged)
```

### 2. Resolution Order

```
Foundation → Semantic → Context → Theme → Component
```

**Key Principle**: 
- **Contexts** define environment-specific defaults (e.g., app uses 14px, website uses 16px)
- **Themes** override within a context (e.g., accessibility theme changes colors but keeps context fontSize)

### 3. CSS Generation Strategy

**Base tokens** → `:root`
**Context tokens** → `[data-eui-context="app"]`, `[data-eui-context="website"]`, etc.
**Theme tokens** → `[data-eui-context="app"][data-eui-theme="default"]`, etc.

**Nested Context Support**:
- Use CSS cascade: inner context selectors have higher specificity
- Example: `[data-eui-context="app"] [data-eui-context="website"]` will override parent app context
- More specific context wins (website > app > report)

### 4. Figma Variables Strategy

**Structure**:
```json
{
  "collections": [
    {
      "name": "Envy UI • Colors",
      "modes": [
        "app-default",
        "app-accessibility",
        "website-default", 
        "website-dark",
        "report-print",
        "report-screen"
      ],
      "variables": [
        {
          "path": "eui.color.text.primary",
          "type": "COLOR",
          "valuesByMode": {
            "app-default": "oklch(...)",
            "app-accessibility": "oklch(...)",
            "website-default": "oklch(...)",
            "website-dark": "oklch(...)",
            "report-print": "oklch(...)",
            "report-screen": "oklch(...)"
          }
        }
      ]
    }
  ]
}
```

**For Nested Contexts in Figma**:
- Figma doesn't support nested modes
- Solution: Create explicit combined modes if needed: `app-website-default`
- Or: Export separate collections per context, designer chooses which to use

---

## Implementation Steps

### Step 1: Create Contexts Structure

1. Create `tokens/contexts/` directory
2. Move context-specific overrides from `themes/*/default.json` to `contexts/*.json`
3. Extract context-only tokens (e.g., `fontSize` for app vs website)
4. Keep theme-specific tokens (e.g., colors that change per theme) in `themes/`

**Example Migration**:

**Before** (`tokens/themes/app/default.json`):
```json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": {
          "$value": "14px",
          "$description": "Base font size for default theme. Dense UI design for application context."
        }
      }
    },
    "color": {
      "border": {
        "default": {
          "$value": "{eui.color.neutral.300}",
          "$description": "Subtle border color for default theme."
        }
      }
    }
  }
}
```

**After** (`tokens/contexts/app.json`):
```json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": {
          "$value": "14px",
          "$type": "fontSize",
          "$description": "Base font size for app context. Dense UI design."
        }
      }
    }
  }
}
```

**After** (`tokens/themes/app/default.json`):
```json
{
  "eui": {
    "color": {
      "border": {
        "default": {
          "$value": "{eui.color.neutral.300}",
          "$type": "color",
          "$description": "Subtle border color for default theme in app context."
        }
      }
    }
  }
}
```

### Step 2: Update CSS Generation Format

**File**: `style-dictionary/formats/cssVariablesThemed.js`

**Changes Needed**:

1. **Read contexts separately**:
   ```javascript
   // Find context files
   const contextsDir = path.join(tokensRoot, 'contexts');
   const contextFiles = new Map(); // Map<context, data>
   
   if (fs.existsSync(contextsDir)) {
     fs.readdirSync(contextsDir)
       .filter(f => f.endsWith('.json'))
       .forEach(contextFile => {
         const context = path.basename(contextFile, '.json');
         const filePath = path.join(contextsDir, contextFile);
         const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
         contextFiles.set(context, data);
       });
   }
   ```

2. **Generate context selectors**:
   ```javascript
   // Generate context tokens
   contextFiles.forEach((data, context) => {
     const selector = `[data-eui-context="${context}"]`;
     const tokens = extractTokensFromJson(data);
     // Output to CSS
   });
   ```

3. **Generate theme selectors** (combine context + theme):
   ```javascript
   // Generate theme tokens (context + theme)
   themeFiles.forEach((data, selector) => {
     // selector already includes both context and theme
     // [data-eui-context="app"][data-eui-theme="default"]
   });
   ```

4. **Support nested contexts via CSS cascade**:
   - Context selectors should cascade naturally
   - More specific selectors (nested) will override parent
   - Example: `[data-eui-context="app"] [data-eui-context="website"]` has higher specificity

### Step 3: Update Figma Export Formats

**Files to Update**:
- `style-dictionary/formats/figmaVariablesScoped.js`
- `style-dictionary/formats/variablesFull.js`
- `style-dictionary/formats/figmaAdapter.js`

**Changes Needed**:

1. **Collect all context+theme combinations**:
   ```javascript
   const contextThemeCombinations = [];
   
   // Read contexts
   const contexts = ['app', 'website', 'report'];
   
   // Read themes per context
   contexts.forEach(context => {
     const themesDir = path.join(tokensRoot, 'themes', context);
     if (fs.existsSync(themesDir)) {
       const themes = fs.readdirSync(themesDir)
         .filter(f => f.endsWith('.json'))
         .map(f => path.basename(f, '.json'));
       
       themes.forEach(theme => {
         contextThemeCombinations.push(`${context}-${theme}`);
       });
     }
   });
   ```

2. **Resolve tokens for each combination**:
   ```javascript
   const resolvedTokensByMode = new Map();
   
   contextThemeCombinations.forEach(mode => {
     const [context, theme] = mode.split('-');
     
     // Resolve: Foundation → Semantic → Context → Theme
     const resolved = resolveTokens({
       foundation: foundationTokens,
       semantic: semanticTokens,
       context: contextTokens.get(context),
       theme: themeTokens.get(`${context}/${theme}`)
     });
     
     resolvedTokensByMode.set(mode, resolved);
   });
   ```

3. **Generate Figma Variables with modes**:
   ```javascript
   const collections = [];
   
   // Group tokens by collection (e.g., Colors, Dimensions)
   tokenGroups.forEach(group => {
     const collection = {
       name: `Envy UI • ${group.name}`,
       modes: contextThemeCombinations,
       variables: []
     };
     
     // For each token, create variable with values for each mode
     group.tokens.forEach(token => {
       const variable = {
         path: token.path.join('.'),
         type: token.type,
         valuesByMode: {}
       };
       
       contextThemeCombinations.forEach(mode => {
         const resolved = resolvedTokensByMode.get(mode);
         variable.valuesByMode[mode] = resolved.get(token.path);
       });
       
       collection.variables.push(variable);
     });
     
     collections.push(collection);
   });
   ```

### Step 4: Update Style Dictionary Config

**File**: `style-dictionary/config.mjs`

**Changes**:
- Ensure `contexts/` directory is included in source paths
- Verify resolution order: foundations → semantic → contexts → themes → components

### Step 5: Migration Script

Create migration script to:
1. Extract context tokens from `themes/*/default.json`
2. Move them to `contexts/*.json`
3. Remove context tokens from theme files
4. Update descriptions

**File**: `scripts/migrate-contexts-from-themes.mjs`

### Step 6: Update Documentation

1. Update ADR-0017 to reflect new structure
2. Document resolution order
3. Document Figma Variables structure
4. Add examples of nested contexts

---

## Testing Checklist

### CSS Generation Tests

- [ ] Context tokens generate correct selectors: `[data-eui-context="app"]`
- [ ] Theme tokens generate correct selectors: `[data-eui-context="app"][data-eui-theme="default"]`
- [ ] Nested contexts work: inner context overrides outer
- [ ] CSS cascade works correctly (specificity)
- [ ] All tokens are present in generated CSS

### Figma Export Tests

- [ ] All context+theme combinations are exported as modes
- [ ] Token values are correctly resolved for each mode
- [ ] Figma Variables JSON is valid
- [ ] Can import into Figma successfully
- [ ] Mode switching works in Figma

### Token Resolution Tests

- [ ] Foundation → Semantic → Context → Theme resolution works
- [ ] Context overrides semantic correctly
- [ ] Theme overrides context correctly
- [ ] Component tokens reference resolved semantic tokens

### Backward Compatibility

- [ ] Existing CSS still works
- [ ] Existing components don't break
- [ ] Storybook stories still render correctly

---

## Example: Complete Token Resolution

### Input Tokens:

**Foundation** (`tokens/foundations/colors/neutral.json`):
```json
{
  "eui": {
    "color": {
      "neutral": {
        "500": { "$value": "oklch(65% 0 0)" }
      }
    }
  }
}
```

**Semantic** (`tokens/semantic/colors/text.json`):
```json
{
  "eui": {
    "color": {
      "text": {
        "primary": { "$value": "{eui.color.neutral.900}" }
      }
    }
  }
}
```

**Context** (`tokens/contexts/app.json`):
```json
{
  "eui": {
    "typography": {
      "base": {
        "fontSize": { "$value": "14px" }
      }
    }
  }
}
```

**Theme** (`tokens/themes/app/default.json`):
```json
{
  "eui": {
    "color": {
      "text": {
        "primary": { "$value": "{eui.color.neutral.900}" }
      }
    }
  }
}
```

### Resolved Output for `app-default`:

```json
{
  "eui.color.text.primary": "oklch(15% 0 0)",
  "eui.typography.base.fontSize": "14px"
}
```

### CSS Output:

```css
:root {
  --eui-color-text-primary: oklch(15% 0 0);
}

[data-eui-context="app"] {
  --eui-typography-base-font-size: 14px;
}

[data-eui-context="app"][data-eui-theme="default"] {
  --eui-color-text-primary: oklch(15% 0 0);
}
```

### Figma Variables Output:

```json
{
  "collections": [
    {
      "name": "Envy UI • Colors",
      "modes": ["app-default", "website-default"],
      "variables": [
        {
          "path": "eui.color.text.primary",
          "type": "COLOR",
          "valuesByMode": {
            "app-default": "oklch(15% 0 0)",
            "website-default": "oklch(15% 0 0)"
          }
        }
      ]
    }
  ]
}
```

---

## Edge Cases to Handle

1. **Missing Context File**: If context doesn't exist, use semantic defaults
2. **Missing Theme File**: If theme doesn't exist for context, use context defaults
3. **Token Not in Context/Theme**: Inherit from previous layer
4. **Nested Contexts in CSS**: Inner context selector has higher specificity
5. **Figma Mode Naming**: Use kebab-case: `app-default`, not `app_default`
6. **OKLCH in Figma**: Figma may not support OKLCH natively - may need conversion or fallback

---

## Success Criteria

1. ✅ Contexts and themes are properly separated in file structure
2. ✅ CSS generation supports nested contexts via cascade
3. ✅ Figma Variables export includes all context+theme combinations as modes
4. ✅ Token resolution works correctly: Foundation → Semantic → Context → Theme
5. ✅ Existing functionality is preserved (backward compatible)
6. ✅ Documentation is updated
7. ✅ All tests pass

---

## Notes for Agent

- **Start with migration**: Move existing tokens to new structure first
- **Test incrementally**: Test CSS generation after each major change
- **Preserve backward compatibility**: Don't break existing CSS/component usage
- **Use Style Dictionary's resolution**: Leverage built-in token resolution where possible
- **Handle OKLCH in Figma**: Check if Figma supports OKLCH, if not, convert to RGB/HEX for Figma export only
- **Document decisions**: If you make architectural choices, document them

---

## Related Files to Modify

1. `style-dictionary/formats/cssVariablesThemed.js` - CSS generation
2. `style-dictionary/formats/figmaVariablesScoped.js` - Figma export
3. `style-dictionary/formats/variablesFull.js` - Figma full export
4. `style-dictionary/formats/figmaAdapter.js` - Figma adapter
5. `style-dictionary/config.mjs` - Config updates
6. `tokens/themes/*/default.json` - Migration to contexts
7. `docs/adr/ADR-0017-*.md` - Documentation update

---

## Questions to Resolve During Implementation

1. Should Figma export convert OKLCH to RGB/HEX? (Check Figma support)
2. How to handle very large number of mode combinations? (Optimization)
3. Should we create explicit combined modes for nested contexts in Figma? (e.g., `app-website-default`)
4. How to handle theme inheritance? (e.g., dark theme extends default)

---

**End of Task Document**

