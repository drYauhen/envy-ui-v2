/**
 * Runtime utilities for working with design tokens
 * Provides helper functions to get, set, and search CSS custom properties
 */

import { tokenVar, type TokenName, TOKEN_NAMES } from '../../generated/tsx/tokens.types';

/**
 * Get token value from CSS variable at runtime
 * 
 * @param tokenName - Token name (without -- prefix)
 * @returns The computed value of the CSS custom property, or empty string if not available
 * 
 * @example
 * ```typescript
 * import { getTokenValue } from '@/utils/tokens';
 * 
 * // Get token value
 * const buttonColor = getTokenValue('eui-button-primary-label-base');
 * console.log(buttonColor); // e.g., "oklch(100% 0 0)"
 * ```
 */
export function getTokenValue(tokenName: TokenName): string {
  if (typeof document === 'undefined') {
    return '';
  }
  
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${tokenName}`)
    .trim();
  
  return value;
}

/**
 * Set token value dynamically (useful for theme switching)
 * 
 * @param tokenName - Token name (without -- prefix)
 * @param value - New value for the token
 * 
 * @example
 * ```typescript
 * import { setTokenValue } from '@/utils/tokens';
 * 
 * // Change button color dynamically
 * setTokenValue('eui-button-primary-label-base', 'oklch(50% 0.1 200)');
 * ```
 */
export function setTokenValue(tokenName: TokenName, value: string): void {
  if (typeof document === 'undefined') {
    return;
  }
  
  document.documentElement.style.setProperty(`--${tokenName}`, value);
}

/**
 * Get all tokens for a specific component
 * 
 * @param componentName - Component name (e.g., 'button', 'input')
 * @returns Array of token names for the component
 * 
 * @example
 * ```typescript
 * import { getComponentTokens } from '@/utils/tokens';
 * 
 * // Get all button tokens
 * const buttonTokens = getComponentTokens('button');
 * console.log(buttonTokens);
 * // ['eui-button-primary-label-base', 'eui-button-size-md-height', ...]
 * ```
 */
export function getComponentTokens(componentName: string): TokenName[] {
  const prefix = `eui-${componentName}-`;
  return TOKEN_NAMES.filter(name => name.startsWith(prefix));
}

/**
 * Search tokens by pattern
 * 
 * @param pattern - String or RegExp pattern to search for
 * @returns Array of matching token names
 * 
 * @example
 * ```typescript
 * import { searchTokens } from '@/utils/tokens';
 * 
 * // Find all color tokens
 * const colorTokens = searchTokens(/color/);
 * 
 * // Find all button size tokens
 * const sizeTokens = searchTokens('button.*size');
 * ```
 */
export function searchTokens(pattern: string | RegExp): TokenName[] {
  const regex = typeof pattern === 'string' 
    ? new RegExp(pattern, 'i') 
    : pattern;
  
  return TOKEN_NAMES.filter(name => regex.test(name));
}

/**
 * Format token name for display (human-readable)
 * 
 * @param tokenName - Token name to format
 * @returns Formatted token name
 * 
 * @example
 * ```typescript
 * import { formatTokenName } from '@/utils/tokens';
 * 
 * const formatted = formatTokenName('eui-button-primary-label-base');
 * console.log(formatted); // "Button Primary Label Base"
 * ```
 */
export function formatTokenName(tokenName: TokenName): string {
  return tokenName
    .replace(/^eui-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Get token CSS variable reference (type-safe)
 * 
 * @param tokenName - Token name (without -- prefix)
 * @returns CSS variable reference string
 * 
 * @example
 * ```typescript
 * import { getTokenVar } from '@/utils/tokens';
 * 
 * // Get CSS variable reference
 * const colorVar = getTokenVar('eui-button-primary-label-base');
 * // Use in inline styles or CSS
 * element.style.color = colorVar;
 * ```
 */
export function getTokenVar(tokenName: TokenName): string {
  return tokenVar(tokenName);
}

/**
 * Check if a string is a valid token name
 * 
 * @param name - String to check
 * @returns True if the string is a valid token name
 * 
 * @example
 * ```typescript
 * import { isValidToken } from '@/utils/tokens';
 * 
 * if (isValidToken(userInput)) {
 *   const value = getTokenValue(userInput);
 * }
 * ```
 */
export function isValidToken(name: string): name is TokenName {
  return TOKEN_NAMES.includes(name as TokenName);
}

