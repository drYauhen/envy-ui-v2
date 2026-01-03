#!/usr/bin/env node

/**
 * Generates TypeScript types from CSS custom properties
 * Reads generated/css/tokens.css and creates type-safe token references
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Read generated CSS tokens file
const tokensCssPath = join(repoRoot, 'generated', 'css', 'tokens.css');

let tokensCss;
try {
  tokensCss = readFileSync(tokensCssPath, 'utf-8');
} catch (error) {
  console.error(`❌ Error: Could not read ${tokensCssPath}`);
  console.error(`   Make sure to run 'npm run tokens:build' first`);
  process.exit(1);
}

// Extract all CSS variable names using regex
// Pattern: --token-name: value;
const cssVarRegex = /--([\w-]+):/g;
const tokens = new Set();
let match;

while ((match = cssVarRegex.exec(tokensCss)) !== null) {
  tokens.add(match[1]);
}

if (tokens.size === 0) {
  console.warn('⚠️  Warning: No tokens found in CSS file');
  process.exit(0);
}

// Sort tokens for consistent output
const sortedTokens = Array.from(tokens).sort();

// Generate TypeScript file content
const typeDefinition = `// AUTO-GENERATED - Do not edit manually
// Generated from: generated/css/tokens.css
// Run: npm run tokens:generate-types
// Last updated: ${new Date().toISOString()}

/**
 * All available CSS custom property names (without -- prefix)
 * Use with: var(--\${TokenName})
 * 
 * @example
 * \`\`\`css
 * color: var(--eui-button-primary-label-base);
 * \`\`\`
 * 
 * @example
 * \`\`\`typescript
 * import { tokenVar } from '@/generated/tsx/tokens.types';
 * const color = tokenVar('eui-button-primary-label-base');
 * \`\`\`
 */
export type TokenName = 
${sortedTokens.map(token => `  | '${token}'`).join('\n')};

/**
 * Helper type for CSS var() function
 * 
 * @example
 * \`\`\`typescript
 * const color: TokenVar = 'var(--eui-button-primary-label-base)';
 * \`\`\`
 */
export type TokenVar = \`var(--\${TokenName})\`;

/**
 * Get all token names as array
 * 
 * @example
 * \`\`\`typescript
 * import { TOKEN_NAMES } from '@/generated/tsx/tokens.types';
 * 
 * // Check if a token exists
 * if (TOKEN_NAMES.includes('eui-button-primary-label-base')) {
 *   // Token exists
 * }
 * \`\`\`
 */
export const TOKEN_NAMES: readonly TokenName[] = [
${sortedTokens.map(token => `  '${token}'`).join(',\n')}
] as const;

/**
 * Helper function to create CSS variable reference
 * 
 * @param name - Token name (without -- prefix)
 * @returns CSS variable reference string
 * 
 * @example
 * \`\`\`typescript
 * import { tokenVar } from '@/generated/tsx/tokens.types';
 * 
 * // TypeScript will validate the token name
 * const color = tokenVar('eui-button-primary-label-base'); // ✅ OK
 * const wrong = tokenVar('eui-button-wrong-name'); // ❌ TypeScript error
 * 
 * // Use in styles
 * const style = {
 *   color: tokenVar('eui-button-primary-label-base'),
 *   height: tokenVar('eui-button-size-md-height')
 * };
 * \`\`\`
 */
export function tokenVar(name: TokenName): TokenVar {
  return \`var(--\${name})\` as TokenVar;
}

/**
 * Type-safe token name validator
 * 
 * @param name - String to validate
 * @returns True if name is a valid token name
 * 
 * @example
 * \`\`\`typescript
 * import { isValidTokenName, tokenVar } from '@/generated/tsx/tokens.types';
 * 
 * function useToken(name: string) {
 *   if (isValidTokenName(name)) {
 *     // TypeScript now knows name is TokenName
 *     const value = tokenVar(name); // ✅ Type-safe
 *     return value;
 *   }
 *   throw new Error(\`Invalid token name: \${name}\`);
 * }
 * \`\`\`
 */
export function isValidTokenName(name: string): name is TokenName {
  return TOKEN_NAMES.includes(name as TokenName);
}
`;

// Ensure output directory exists
const outputDir = join(repoRoot, 'generated', 'tsx');
try {
  mkdirSync(outputDir, { recursive: true });
} catch (error) {
  // Directory might already exist, ignore
}

// Write TypeScript file
const outputPath = join(outputDir, 'tokens.types.ts');
writeFileSync(outputPath, typeDefinition, 'utf-8');

console.log(`✅ Generated TypeScript types: ${outputPath}`);
console.log(`   Found ${sortedTokens.length} tokens`);

