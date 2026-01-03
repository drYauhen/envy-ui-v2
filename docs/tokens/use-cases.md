# Token Utilities Use Cases

This document provides concrete examples of how token utilities can be used in real-world scenarios, especially for AI agents and component development.

## Table of Contents

- [For AI Agents](#for-ai-agents)
  - [1. Generating New CSS Components](#1-generating-new-css-components)
  - [2. Validating Token Usage](#2-validating-token-usage)
  - [3. Finding Appropriate Tokens](#3-finding-appropriate-tokens)
  - [4. Generating TypeScript Styles](#4-generating-typescript-styles)
  - [5. Creating Token Documentation](#5-creating-token-documentation)
- [For Human Developers](#for-human-developers)
  - [6. Dynamic Theme Switching](#6-dynamic-theme-switching)
  - [7. Component Token Explorer](#7-component-token-explorer)
  - [8. Design Consistency Checks](#8-design-consistency-checks)
  - [9. Interactive Token Editor](#9-interactive-token-editor)
  - [10. Migration to Token System](#10-migration-to-token-system)

---

## For AI Agents

### 1. Generating New CSS Components

**Scenario:** AI agent needs to create a new `badge.css` component and must use correct tokens.

**Problem without utilities:**
```css
/* AI might use wrong token names */
.badge {
  color: var(--eui-badge-color); /* ❌ Wrong token name */
  padding: 12px; /* ❌ Literal value */
}
```

**Solution with utilities:**

**Step 1: Check available tokens for badge**
```typescript
import { getComponentTokens, searchTokens } from '@/utils/tokens';

// Check if badge tokens exist
const badgeTokens = getComponentTokens('badge');
console.log(badgeTokens);
// [] - No tokens found, need to use foundation tokens

// Search for appropriate foundation tokens
const colorTokens = searchTokens(/^eui-color-/);
const spacingTokens = searchTokens(/^eui-spacing-/);
const radiusTokens = searchTokens(/^eui-radius-/);
```

**Step 2: Use TypeScript types for validation**
```typescript
import { tokenVar, TOKEN_NAMES } from '@/generated/tsx/tokens.types';

// AI can check if token exists before using
function suggestTokenForBadge(property: string): string | null {
  const candidates = TOKEN_NAMES.filter(name => 
    name.includes(property.toLowerCase())
  );
  return candidates[0] || null;
}

// Example usage
const colorToken = suggestTokenForBadge('color');
// Might return: 'eui-color-text-default' or null
```

**Step 3: Generate correct CSS**
```css
/* AI uses found tokens */
.eui-badge {
  color: var(--eui-color-text-default);
  background-color: var(--eui-color-background-subtle);
  padding: var(--eui-spacing-sm);
  border-radius: var(--eui-radius-default);
}
```

---

### 2. Validating Token Usage

**Scenario:** AI created a component, need to validate token usage is correct.

**Automatic validation:**
```bash
# After generating component
npm run tokens:validate

# Output:
# ❌ Token validation errors:
#   src/ui/new-component.css:15 - Unknown token: --eui-new-component-wrong-name
```

**Programmatic validation:**
```typescript
import { isValidToken, getComponentTokens } from '@/utils/tokens';

// Function to validate CSS code before writing
function validateComponentCSS(cssCode: string, componentName: string): string[] {
  const errors: string[] = [];
  const validTokens = new Set(getComponentTokens(componentName));
  
  // Extract all var(--token-name)
  const tokenRegex = /var\(--([\w-]+)\)/g;
  let match;
  
  while ((match = tokenRegex.exec(cssCode)) !== null) {
    const tokenName = match[1];
    
    if (!isValidToken(tokenName)) {
      errors.push(`Unknown token: --${tokenName}`);
    }
  }
  
  return errors;
}

// Usage
const css = `
  .my-component {
    color: var(--eui-button-primary-label-base);
    padding: var(--eui-wrong-token-name);
  }
`;

const errors = validateComponentCSS(css, 'button');
console.log(errors); // ['Unknown token: --eui-wrong-token-name']
```

---

### 3. Finding Appropriate Tokens

**Scenario:** AI needs a list of available tokens for a specific property.

**Example token query:**
```typescript
import { searchTokens, formatTokenName } from '@/utils/tokens';

// AI asks: "What tokens are available for text color?"
function getTokensForProperty(property: string): Array<{name: string, display: string, cssVar: string}> {
  const pattern = new RegExp(property, 'i');
  const tokens = searchTokens(pattern);
  
  return tokens.map(token => ({
    name: token,
    display: formatTokenName(token), // "Button Primary Label Base"
    cssVar: `var(--${token})`
  }));
}

// Usage
const colorTokens = getTokensForProperty('color');
// [
//   { 
//     name: 'eui-color-text-default', 
//     display: 'Color Text Default', 
//     cssVar: 'var(--eui-color-text-default)' 
//   },
//   ...
// ]
```

**Finding tokens by component:**
```typescript
import { getComponentTokens } from '@/utils/tokens';

// Get all tokens for a component
const buttonTokens = getComponentTokens('button');
// ['eui-button-primary-label-base', 'eui-button-size-md-height', ...]

// Filter by property type
const buttonColorTokens = buttonTokens.filter(t => 
  t.includes('color') || t.includes('background') || t.includes('label')
);
```

---

### 4. Generating TypeScript Styles

**Scenario:** AI creates a React component and needs type-safe styles.

```typescript
import { tokenVar, type TokenName } from '@/generated/tsx/tokens.types';

// AI can generate type-safe styles
function generateComponentStyles(variant: 'primary' | 'secondary') {
  return {
    backgroundColor: tokenVar(`eui-button-${variant}-background-base`),
    color: tokenVar(`eui-button-${variant}-label-base`),
    padding: tokenVar('eui-button-size-md-padding-inline'),
    // TypeScript validates all tokens!
  };
}

// Usage
const primaryStyles = generateComponentStyles('primary');
// ✅ All tokens validated by TypeScript
```

**Dynamic style generation:**
```typescript
import { tokenVar, TOKEN_NAMES } from '@/generated/tsx/tokens.types';

// Generate styles based on component props
function generateStyles(component: string, size: string, variant: string) {
  const baseToken = `eui-${component}-${variant}-background-base`;
  
  // TypeScript ensures token exists
  if (TOKEN_NAMES.includes(baseToken as any)) {
    return {
      backgroundColor: tokenVar(baseToken as TokenName),
      // ... other styles
    };
  }
  
  return {};
}
```

---

### 5. Creating Token Documentation

**Scenario:** AI creates documentation for a component, needs to list used tokens.

```typescript
import { getComponentTokens, formatTokenName, getTokenValue } from '@/utils/tokens';

// Generate token table for documentation
function generateTokenTable(componentName: string): string {
  const tokens = getComponentTokens(componentName);
  
  let markdown = `## ${componentName} Tokens\n\n`;
  markdown += `| Token | Value |\n`;
  markdown += `|-------|-------|\n`;
  
  tokens.forEach(token => {
    const value = getTokenValue(token);
    const display = formatTokenName(token);
    markdown += `| \`--${token}\` | \`${value}\` |\n`;
  });
  
  return markdown;
}

// Usage
const buttonDocs = generateTokenTable('button');
console.log(buttonDocs);
// ## button Tokens
// | Token | Value |
// |-------|-------|
// | `--eui-button-primary-label-base` | `oklch(100% 0 0)` |
// ...
```

---

## For Human Developers

### 6. Dynamic Theme Switching

**Scenario:** Application needs to switch themes at runtime.

**Without utilities:**
```typescript
// ❌ Fragile code, easy to make mistakes
document.documentElement.style.setProperty('--eui-button-primary-label-base', newColor);
document.documentElement.style.setProperty('--eui-button-primary-background-base', newBg);
// ... need to manually list all tokens
```

**With utilities:**
```typescript
import { getComponentTokens, setTokenValue, getTokenValue } from '@/utils/tokens';

// Function to switch theme
function switchTheme(theme: 'light' | 'dark') {
  // Get all component tokens
  const buttonTokens = getComponentTokens('button');
  
  // Switch only color-related tokens
  const colorTokens = buttonTokens.filter(name => 
    name.includes('color') || name.includes('background') || name.includes('label')
  );
  
  colorTokens.forEach(tokenName => {
    const currentValue = getTokenValue(tokenName);
    const newValue = theme === 'dark' 
      ? invertColor(currentValue) 
      : originalColor(currentValue);
    
    setTokenValue(tokenName, newValue);
  });
}
```

**Theme configuration object:**
```typescript
import { setTokenValue } from '@/utils/tokens';

const themes = {
  light: {
    'eui-button-primary-label-base': 'oklch(100% 0 0)',
    'eui-button-primary-background-base': 'oklch(49% 0.10 230)',
    // ... more tokens
  },
  dark: {
    'eui-button-primary-label-base': 'oklch(0% 0 0)',
    'eui-button-primary-background-base': 'oklch(60% 0.10 230)',
    // ... more tokens
  }
};

function applyTheme(themeName: keyof typeof themes) {
  const theme = themes[themeName];
  Object.entries(theme).forEach(([token, value]) => {
    setTokenValue(token as TokenName, value);
  });
}
```

---

### 7. Component Token Explorer

**Scenario:** Developer wants to see all tokens used by a component.

```typescript
import { getComponentTokens, formatTokenName, getTokenValue } from '@/utils/tokens';

// Component to explore tokens
function TokenExplorer({ componentName }: { componentName: string }) {
  const tokens = getComponentTokens(componentName);
  
  return (
    <div>
      <h3>{componentName} Tokens ({tokens.length})</h3>
      <table>
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Display Name</th>
            <th>Current Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map(token => (
            <tr key={token}>
              <td><code>--{token}</code></td>
              <td>{formatTokenName(token)}</td>
              <td><code>{getTokenValue(token)}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Usage in Storybook or dev tools
<TokenExplorer componentName="button" />
```

---

### 8. Design Consistency Checks

**Scenario:** Ensure all components use consistent spacing/colors.

```typescript
import { searchTokens, getTokenValue, getComponentTokens } from '@/utils/tokens';

// Check if components use consistent spacing tokens
function checkSpacingConsistency(components: string[]): Map<string, string[]> {
  const spacingUsage = new Map<string, string[]>();
  
  components.forEach(component => {
    const tokens = getComponentTokens(component);
    const spacingTokens = tokens.filter(t => 
      t.includes('spacing') || t.includes('padding') || t.includes('gap')
    );
    
    spacingTokens.forEach(token => {
      const value = getTokenValue(token);
      if (!spacingUsage.has(value)) {
        spacingUsage.set(value, []);
      }
      spacingUsage.get(value)!.push(`${component}.${token}`);
    });
  });
  
  return spacingUsage;
}

// Usage
const inconsistencies = checkSpacingConsistency(['button', 'input', 'select']);
// Shows which components use the same spacing values
```

**Find duplicate values:**
```typescript
import { TOKEN_NAMES, getTokenValue } from '@/utils/tokens';

function findDuplicateTokenValues(): Map<string, string[]> {
  const valueMap = new Map<string, string[]>();
  
  TOKEN_NAMES.forEach(token => {
    const value = getTokenValue(token);
    if (!valueMap.has(value)) {
      valueMap.set(value, []);
    }
    valueMap.get(value)!.push(token);
  });
  
  // Return only duplicates
  const duplicates = new Map<string, string[]>();
  valueMap.forEach((tokens, value) => {
    if (tokens.length > 1) {
      duplicates.set(value, tokens);
    }
  });
  
  return duplicates;
}
```

---

### 9. Interactive Token Editor

**Scenario:** Create UI for editing tokens in real-time.

```typescript
import { getComponentTokens, setTokenValue, getTokenValue, searchTokens } from '@/utils/tokens';

// Component for editing tokens
function TokenEditor({ componentName }: { componentName: string }) {
  const tokens = getComponentTokens(componentName);
  
  return (
    <div>
      <h3>{componentName} Tokens</h3>
      {tokens.map(token => (
        <TokenInput
          key={token}
          token={token}
          value={getTokenValue(token)}
          onChange={(newValue) => setTokenValue(token, newValue)}
        />
      ))}
    </div>
  );
}

// Usage in Storybook or dev tools
<TokenEditor componentName="button" />
```

**Search and filter tokens:**
```typescript
import { searchTokens, formatTokenName } from '@/utils/tokens';

function TokenSearch({ query }: { query: string }) {
  const tokens = searchTokens(new RegExp(query, 'i'));
  
  return (
    <div>
      <h3>Search Results: {tokens.length}</h3>
      <ul>
        {tokens.map(token => (
          <li key={token}>
            <code>--{token}</code> - {formatTokenName(token)}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 10. Migration to Token System

**Scenario:** Old component uses literal values, need to migrate to tokens.

```typescript
import { searchTokens, isValidToken, getTokenValue } from '@/utils/tokens';

// Function to find suitable token by value
function findTokenByValue(targetValue: string): string | null {
  const allTokens = Array.from(TOKEN_NAMES);
  
  // Check each token (in reality would read from CSS)
  for (const token of allTokens) {
    const value = getTokenValue(token);
    if (value === targetValue) {
      return token;
    }
  }
  
  return null;
}

// Migrate CSS
function migrateCSS(oldCSS: string): string {
  // Find literal values and suggest tokens
  const literalRegex = /:\s*([0-9]+(?:px|rem|em|%));/g;
  let match;
  const suggestions: Array<{line: number, value: string, suggestion: string | null}> = [];
  
  const lines = oldCSS.split('\n');
  lines.forEach((line, index) => {
    if (literalRegex.test(line)) {
      const value = match[1];
      const suggestion = findTokenByValue(value);
      suggestions.push({
        line: index + 1,
        value,
        suggestion
      });
    }
  });
  
  return suggestions;
}
```

**Automated migration script:**
```typescript
import { searchTokens, tokenVar } from '@/utils/tokens';

function suggestTokenReplacement(literalValue: string, property: string): string | null {
  // Search for tokens matching the property
  const propertyTokens = searchTokens(new RegExp(property, 'i'));
  
  // Try to find token with similar value
  // (In real implementation, would compare actual values)
  const bestMatch = propertyTokens.find(token => {
    // Logic to find best matching token
    return true; // Simplified
  });
  
  return bestMatch ? tokenVar(bestMatch) : null;
}

// Usage
const replacement = suggestTokenReplacement('40px', 'height');
// Returns: 'var(--eui-button-size-md-height)' or null
```

---

## Best Practices

### For AI Agents

1. **Always validate tokens** before using them in generated code
2. **Use search functions** to find appropriate tokens instead of guessing
3. **Check component tokens first**, then fall back to foundation tokens
4. **Use TypeScript types** for compile-time validation
5. **Run validation script** after generating CSS files

### For Human Developers

1. **Use runtime utilities** for dynamic theme switching
2. **Explore tokens** before creating new components
3. **Check consistency** across components regularly
4. **Use token editor** for rapid prototyping
5. **Migrate gradually** from literal values to tokens

---

## Related Documentation

- [Token System Tooling](./README.md) - Main tooling documentation
- [Token Reference](./reference.md) - Complete token reference
- [Token Usage Rules](../architecture/token-usage-rules.md) - Rules for using tokens
- [Tokens Workflow](../workflows/tokens-workflow.md) - Complete workflow guide

---

*This document provides practical examples. For API reference, see [Token System Tooling](./README.md).*

