/**
 * Title Case Utility
 * Converts text to proper English Title Case following typographic conventions
 */

/**
 * Common technical acronyms that should always be uppercase
 */
const ACRONYMS = new Set([
  // Web/Browser
  'ui', 'api', 'css', 'html', 'aria', 'dom', 'http', 'https', 'url', 'uri',
  'svg', 'xml', 'json', 'rest', 'ajax', 'cors',

  // JavaScript/TypeScript
  'js', 'jsx', 'ts', 'tsx', 'npm', 'cli', 'sdk',

  // React ecosystem
  'ssr', 'csr',

  // AI/ML
  'ai', 'ml',

  // Design/UX
  'ux', 'dx',

  // Other
  'id', 'ids', 'uuid', 'guid', 'rgb', 'rgba', 'hsl', 'hsla'
]);

/**
 * Small words that should be lowercase (unless first/last word)
 * Based on AP Stylebook and Chicago Manual of Style
 */
const SMALL_WORDS = new Set([
  // Articles
  'a', 'an', 'the',

  // Coordinating conjunctions
  'and', 'or', 'nor', 'but', 'yet', 'so', 'for',

  // Prepositions (common ones)
  'in', 'on', 'at', 'of', 'to', 'for', 'with', 'vs', 'from',
  'into', 'onto', 'by', 'as', 'via', 'per', 'up', 'out', 'off'
]);

/**
 * Capitalize the first letter of a word
 */
function capitalize(word) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Convert text to Title Case following typographic rules
 *
 * Rules:
 * 1. Always capitalize first and last word
 * 2. Preserve acronyms in uppercase (UI, API, CSS, etc.)
 * 3. Keep small words lowercase (and, or, the, of, in, etc.)
 * 4. Capitalize all other words
 *
 * @param {string} text - Text to convert to Title Case
 * @returns {string} - Title-cased text
 *
 * @example
 * toTitleCase('react aria as headless') // 'React ARIA as Headless'
 * toTitleCase('canonical ui namespace and reference') // 'Canonical UI Namespace and Reference'
 * toTitleCase('the quick brown fox') // 'The Quick Brown Fox'
 */
export function toTitleCase(text) {
  if (!text) return text;

  const words = text.split(/\s+/);

  return words
    .map((word, index) => {
      if (!word) return word;

      const lower = word.toLowerCase();
      const isFirst = index === 0;
      const isLast = index === words.length - 1;

      // Always capitalize first and last word
      if (isFirst || isLast) {
        return ACRONYMS.has(lower) ? lower.toUpperCase() : capitalize(word);
      }

      // Check for acronyms - always uppercase
      if (ACRONYMS.has(lower)) {
        return lower.toUpperCase();
      }

      // Check for small words - lowercase
      if (SMALL_WORDS.has(lower)) {
        return lower;
      }

      // Default: capitalize first letter
      return capitalize(word);
    })
    .join(' ');
}
