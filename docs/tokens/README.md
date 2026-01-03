# Token System Tooling

This document explains the developer tools available for working with design tokens in the Envy UI system.

## Overview

The token system provides several tools to improve developer experience:

1. **TypeScript Types** - Type-safe token references
2. **Token Validation** - Validate token usage in CSS files
3. **VS Code Autocomplete** - Autocomplete for CSS custom properties
4. **Runtime Utilities** - Helper functions for working with tokens
5. **Auto-Generated Documentation** - Token reference documentation

## TypeScript Types

### Generated Types

TypeScript types are automatically generated from CSS tokens. The types provide:

- `TokenName` - Union type of all valid token names
- `TokenVar` - Template literal type for CSS variable references
- `TOKEN_NAMES` - Array of all token names
- `tokenVar()` - Helper function to create type-safe CSS variable references
- `isValidTokenName()` - Type guard to validate token names

### Usage

```typescript
import { tokenVar, type TokenName, TOKEN_NAMES } from '@/generated/tsx/tokens.types';

// Type-safe token reference
const buttonColor = tokenVar('eui-button-primary-label-base'); // ✅ OK
const wrongColor = tokenVar('eui-button-wrong-name'); // ❌ TypeScript error

// Check if token exists
if (TOKEN_NAMES.includes('eui-button-primary-label-base')) {
  // Token exists
}

// Type guard
function useToken(name: string) {
  if (isValidTokenName(name)) {
    // TypeScript now knows name is TokenName
    const value = tokenVar(name);
    return value;
  }
  throw new Error(`Invalid token name: ${name}`);
}
```

### Generating Types

```bash
npm run tokens:generate-types
```

Types are generated from `generated/css/tokens.css` and written to `generated/tsx/tokens.types.ts`.

## Token Validation

### Validating Token Usage

The validation script checks all CSS files in `src/ui/` to ensure:

- All `var(--token-name)` references use valid token names
- No literal values are used (except allowed exceptions)

### Running Validation

```bash
npm run tokens:validate
```

The script will:
- Report errors for unknown tokens
- Report warnings for literal values
- Exit with code 1 if errors are found (useful for CI/CD)

### Allowed Exceptions

The following literal values are allowed:

- `0px`, `0rem`, `0em`, `0%`, `0`
- `1px` (for borders)
- `100%`, `auto`, `inherit`, `transparent`
- CSS keywords (e.g., `solid`, `dashed`, `flex`, `block`)

### Example Output

```
✅ All tokens are valid!
   Validated 48 CSS files
```

Or if errors are found:

```
❌ Token validation errors:
  src/ui/button.css:42 - Unknown token: --eui-button-wrong-name

❌ Found 1 error(s) and 0 warning(s)
```

## VS Code Autocomplete

### Setup

VS Code autocomplete is automatically configured when you run:

```bash
npm run tokens:generate-vscode
```

This generates `.vscode/css-custom-data.json` and updates `.vscode/settings.json`.

### Usage

Once configured, VS Code will provide autocomplete for CSS custom properties:

```css
.my-component {
  color: var(--eui-|); /* Autocomplete shows all tokens */
}
```

The autocomplete includes:
- All available token names
- Token descriptions (when available)
- Token values

### Manual Setup

If you need to configure manually, add to `.vscode/settings.json`:

```json
{
  "css.customData": [".vscode/css-custom-data.json"]
}
```

## Runtime Utilities

### Available Functions

The `src/utils/tokens.ts` module provides utility functions:

- `getTokenValue(tokenName)` - Get token value from CSS variable
- `setTokenValue(tokenName, value)` - Set token value dynamically
- `getComponentTokens(componentName)` - Get all tokens for a component
- `searchTokens(pattern)` - Search tokens by pattern
- `formatTokenName(tokenName)` - Format token name for display
- `getTokenVar(tokenName)` - Get CSS variable reference
- `isValidToken(name)` - Check if string is valid token name

### Usage Examples

```typescript
import { 
  getTokenValue, 
  setTokenValue, 
  getComponentTokens,
  searchTokens,
  formatTokenName 
} from '@/utils/tokens';

// Get token value at runtime
const buttonColor = getTokenValue('eui-button-primary-label-base');
console.log(buttonColor); // e.g., "oklch(100% 0 0)"

// Set token value dynamically (for theme switching)
setTokenValue('eui-button-primary-label-base', 'oklch(50% 0.1 200)');

// Get all tokens for a component
const buttonTokens = getComponentTokens('button');
console.log(buttonTokens);
// ['eui-button-primary-label-base', 'eui-button-size-md-height', ...]

// Search tokens by pattern
const colorTokens = searchTokens(/color/);
const sizeTokens = searchTokens('button.*size');

// Format token name for display
const formatted = formatTokenName('eui-button-primary-label-base');
console.log(formatted); // "Button Primary Label Base"
```

## Auto-Generated Documentation

### Token Reference

The token reference documentation is automatically generated from CSS tokens:

```bash
npm run tokens:generate-docs
```

This generates `docs/tokens/reference.md` with:

- Overview and usage examples
- Foundation tokens (non-component-specific)
- Component tokens organized by component
- Token names and values in tables

### Viewing Documentation

The documentation is available in Storybook under the Docs section, or you can view it directly:

```bash
cat docs/tokens/reference.md
```

## Complete Workflow

### Full Token Generation

To generate all token artifacts (CSS, types, VS Code data, docs) and validate:

```bash
npm run tokens:full
```

This runs:
1. `tokens:build` - Generate CSS from tokens
2. `tokens:generate-types` - Generate TypeScript types
3. `tokens:generate-vscode` - Generate VS Code autocomplete
4. `tokens:generate-docs` - Generate documentation
5. `tokens:validate` - Validate token usage

### Development Workflow

1. **Modify tokens** in `tokens/**/*.json`
2. **Build tokens**: `npm run tokens:build`
3. **Generate types**: `npm run tokens:generate-types`
4. **Validate usage**: `npm run tokens:validate`
5. **Update VS Code data**: `npm run tokens:generate-vscode` (optional, only if needed)

### CI/CD Integration

Add token validation to your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Validate tokens
  run: npm run tokens:validate
```

## Best Practices

### Using Tokens in CSS

✅ **Good:**
```css
.my-component {
  color: var(--eui-button-primary-label-base);
  height: var(--eui-button-size-md-height);
}
```

❌ **Bad:**
```css
.my-component {
  color: oklch(100% 0 0); /* Literal value */
  height: 40px; /* Literal value */
}
```

### Using Tokens in TypeScript

✅ **Good:**
```typescript
import { tokenVar } from '@/generated/tsx/tokens.types';

const style = {
  color: tokenVar('eui-button-primary-label-base'),
  height: tokenVar('eui-button-size-md-height')
};
```

❌ **Bad:**
```typescript
const style = {
  color: 'var(--eui-button-wrong-name)', // No type checking
  height: '40px' // Literal value
};
```

### Runtime Token Access

✅ **Good:**
```typescript
import { getTokenValue, setTokenValue } from '@/utils/tokens';

// Get value
const color = getTokenValue('eui-button-primary-label-base');

// Set value (for theme switching)
setTokenValue('eui-button-primary-label-base', 'oklch(50% 0.1 200)');
```

## Troubleshooting

### Types Not Generated

If TypeScript types are missing:

1. Ensure `generated/css/tokens.css` exists (run `npm run tokens:build`)
2. Run `npm run tokens:generate-types`
3. Check that `generated/tsx/tokens.types.ts` was created

### VS Code Autocomplete Not Working

1. Run `npm run tokens:generate-vscode`
2. Reload VS Code window (Cmd/Ctrl + Shift + P → "Reload Window")
3. Check `.vscode/settings.json` has `css.customData` configured

### Validation Errors

If validation reports errors:

1. Check the error message for the specific token name
2. Verify the token exists in `generated/css/tokens.css`
3. If token is missing, ensure it's defined in `tokens/**/*.json`
4. Run `npm run tokens:build` to regenerate CSS

### TypeScript Errors

If TypeScript reports errors on token names:

1. Ensure types are generated: `npm run tokens:generate-types`
2. Check that the token name matches exactly (case-sensitive)
3. Verify the token exists in `generated/css/tokens.css`

## Use Cases

For detailed examples of how to use token utilities in real-world scenarios, see:

- **[Token Utilities Use Cases](./use-cases.md)** - Comprehensive guide with 10+ practical examples
  - Use cases for AI agents (generating components, validating tokens, finding tokens)
  - Use cases for human developers (theme switching, token explorer, consistency checks)
  - Code examples with explanations

### Quick Examples

**For AI Agents:**
- Generate new CSS components with correct tokens
- Validate token usage in generated code
- Find appropriate tokens for properties
- Create type-safe TypeScript styles

**For Developers:**
- Switch themes dynamically at runtime
- Explore tokens for a component
- Check design consistency across components
- Create interactive token editors

See [use-cases.md](./use-cases.md) for complete examples with code.

## Related Documentation

- [Token Usage Rules](../architecture/token-usage-rules.md) - Rules for using tokens
- [Token Reference](./reference.md) - Auto-generated token reference
- [Token Architecture](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) - Architecture overview

