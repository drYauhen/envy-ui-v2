export type TokenRef = {
  path: string;
  ref: string;
  type?: string;
};

export type FlatToken = {
  value: string;
  type?: string;
};

export const flattenTokens = (
  node: unknown,
  path: string[] = [],
  acc: Record<string, FlatToken> = {}
): Record<string, FlatToken> => {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return acc;

  const obj = node as Record<string, unknown>;
  if (typeof obj.$value === 'string') {
    acc[path.join('.')] = { value: obj.$value, type: typeof obj.$type === 'string' ? obj.$type : undefined };
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value' || key === '$type') continue;
    flattenTokens(value, [...path, key], acc);
  }

  return acc;
};

export const collectRefs = (node: unknown, path: string[] = []): TokenRef[] => {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return [];

  const obj = node as Record<string, unknown>;
  const refs: TokenRef[] = [];

  if (typeof obj.$value === 'string') {
    refs.push({ path: path.join('.'), ref: obj.$value, type: typeof obj.$type === 'string' ? obj.$type : undefined });
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value' || key === '$type') continue;
    refs.push(...collectRefs(value, [...path, key]));
  }

  return refs;
};

export const resolveAlias = (ref: string, map: Record<string, FlatToken>, seen: Set<string> = new Set()): string | null => {
  // If this is an alias (starts with {)
  const match = ref.match(/^\{(.+)\}$/);
  const key = match ? match[1] : null;
  
  if (key) {
    // Check for circular references
    if (seen.has(key)) return null;
    seen.add(key);

    const target = map[key];
    if (!target) {
      // Alias not found in map - return null
      return null;
    }
    
    // If the value itself is an alias, resolve it recursively
    if (target.value.startsWith('{')) {
      return resolveAlias(target.value, map, seen);
    }
    
    // Return the resolved value
    return target.value;
  }
  
  // If this is not an alias, check if it's a valid value
  // Can be hex color, oklch, rgb, etc. - just return as is
  if (ref.trim().length > 0) {
    return ref.trim();
  }
  
  return null;
};

// Base height for all previews (except exceptions)
export const PREVIEW_BASE_HEIGHT = '28px';

// Exceptions - types that can exceed the base height
export const PREVIEW_FLEXIBLE_TYPES = ['fontSize'] as const;

/**
 * Parses a dimension value (e.g., "10px", "1rem", "auto")
 * Returns the value as is if valid, or null
 */
export function parseDimension(value: string | null): string | null {
  if (!value) return null;
  
  // Check if the value is a valid dimension
  // Supports: px, rem, em, %, auto, and unitless numbers
  const dimensionPattern = /^(\d+(?:\.\d+)?)(px|rem|em|%)?$|^auto$/;
  if (dimensionPattern.test(value.trim())) {
    return value.trim();
  }
  
  return null;
}

/**
 * Loads metadata from a .meta.json file
 * @param tokenFilePath - path to the token file (e.g., tokens/app/components/button/colors.json)
 * @returns metadata or null if file not found
 */
export function loadMetadata(tokenFilePath: string): Record<string, any> | null {
  try {
    // In browser/Storybook we cannot use fs, so we use dynamic import
    // Metadata will need to be loaded via fetch or another method
    // For now return null - metadata will be loaded in stories
    return null;
  } catch {
    return null;
  }
}

/**
 * Gets the resolved value from metadata by token path
 * @param metadata - metadata object
 * @param tokenPath - token path (e.g., ['eui', 'button', 'primary', 'background', 'base'])
 * @returns resolved value or null
 */
export function getResolvedFromMetadata(
  metadata: Record<string, any> | null,
  tokenPath: string[]
): string | null {
  console.log('[getResolvedFromMetadata] Looking for path:', tokenPath, 'in metadata:', !!metadata);
  
  if (!metadata) {
    console.log('[getResolvedFromMetadata] ❌ No metadata provided');
    return null;
  }
  
  let current = metadata;
  for (let i = 0; i < tokenPath.length; i++) {
    const segment = tokenPath[i];
    console.log(`[getResolvedFromMetadata] Step ${i + 1}/${tokenPath.length}: Looking for "${segment}" in`, Object.keys(current || {}));
    
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment];
      console.log(`[getResolvedFromMetadata] ✅ Found "${segment}", current keys:`, Object.keys(current || {}));
    } else {
      console.log(`[getResolvedFromMetadata] ❌ Segment "${segment}" not found`);
      return null;
    }
  }
  
  const resolved = current?.$resolved || null;
  console.log('[getResolvedFromMetadata] Final result:', resolved);
  return resolved;
}
