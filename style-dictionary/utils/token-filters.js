/**
 * Token filtering utilities
 * Centralized logic for filtering tokens in Style Dictionary formats
 */

/**
 * List of subdirectories that contain non-visual metadata tokens
 * These should be excluded from visual token generation (CSS, Figma, etc.)
 * 
 * To add a new excluded directory, simply add it to this array.
 * All Style Dictionary formats will automatically exclude tokens from these directories.
 */
const EXCLUDED_SUBDIRECTORIES = ['behavior', 'metadata'];

/**
 * Check if a token file path is a visual token (should be processed)
 * 
 * Visual tokens are those in component root directories.
 * Non-visual tokens (metadata, behavior, etc.) are in subdirectories and should be excluded.
 * 
 * @param {string} filePath - Token file path from Style Dictionary
 * @returns {boolean} - true if token is visual and should be processed, false if it should be excluded
 * 
 * @example
 * isVisualToken('tokens/app/components/button/colors.json') // true
 * isVisualToken('tokens/app/components/button/behavior/accessibility.meta.json') // false
 */
function isVisualToken(filePath) {
  if (!filePath) return true; // If no path, assume it's visual (safety fallback)
  
  // Skip .meta.json files (metadata files)
  if (filePath.endsWith('.meta.json')) {
    return false;
  }
  
  // Skip tokens from excluded subdirectories
  // Structure: tokens/{context}/components/{component}/(behavior|metadata)/...
  const excludedPattern = new RegExp(
    `/components/[^/]+/(${EXCLUDED_SUBDIRECTORIES.join('|')})/`
  );
  
  return !excludedPattern.test(filePath);
}

/**
 * Filter tokens to only include visual tokens
 * 
 * @param {Array} tokens - Array of tokens to filter
 * @returns {Array} - Filtered array of visual tokens only
 * 
 * @example
 * const visualTokens = filterVisualTokens(dictionary.allTokens);
 */
function filterVisualTokens(tokens) {
  return tokens.filter(token => {
    const filePath = token.filePath || '';
    return isVisualToken(filePath);
  });
}

module.exports = {
  isVisualToken,
  filterVisualTokens,
  EXCLUDED_SUBDIRECTORIES
};

