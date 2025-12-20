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
  const match = ref.match(/^\{(.+)\}$/);
  const key = match ? match[1] : null;
  if (!key) return ref.startsWith('#') ? ref : null;
  if (seen.has(key)) return null;
  seen.add(key);

  const target = map[key];
  if (!target) return null;
  if (target.value.startsWith('{')) {
    return resolveAlias(target.value, map, seen);
  }
  return target.value;
};
