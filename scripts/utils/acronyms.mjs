/**
 * Single source of truth for technical acronyms used in docs tooling.
 * All values are stored in lowercase for case-insensitive matching.
 */
export const TECHNICAL_ACRONYMS = new Set([
  // Web/Browser
  'ui', 'api', 'css', 'html', 'aria', 'dom', 'http', 'https', 'url', 'uri',
  'svg', 'xml', 'json', 'rest', 'ajax', 'cors',

  // JavaScript/TypeScript
  'js', 'jsx', 'ts', 'tsx', 'npm', 'cli', 'sdk', 'ide',

  // React ecosystem
  'ssr', 'csr',

  // AI/ML
  'ai', 'ml',

  // Design/UX
  'ux', 'dx',

  // Other
  'id', 'ids', 'uuid', 'guid', 'rgb', 'rgba', 'hsl', 'hsla', 'dtcg', 'wcag', 'mcp'
]);

/**
 * Check if a word is a known technical acronym.
 *
 * @param {string} word
 * @returns {boolean}
 */
export function isTechnicalAcronym(word) {
  if (!word) return false;
  return TECHNICAL_ACRONYMS.has(word.toLowerCase());
}
