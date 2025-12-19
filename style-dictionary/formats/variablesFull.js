const systemMeta = require('../../system.meta.json');

const toTitleCase = (value = '') =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());

function mapVariableType(token) {
  const t = token.$type || token.type || token.attributes?.category;
  if (!t) return null;
  if (t === 'color') return 'COLOR';
  if (['dimension', 'number', 'float', 'integer'].includes(t)) return 'FLOAT';
  return null;
}

function resolveNumericValue(token) {
  const raw = token.value ?? token.$value ?? token.original?.value;
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const parsed = parseFloat(raw);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

function resolveColorValue(token) {
  const raw = token.value ?? token.$value ?? token.original?.value;
  return typeof raw === 'string' ? raw : null;
}

function resolveCollectionName(token, variableType) {
  const systemId = systemMeta?.system?.id ?? 'envy-ui';
  if (variableType === 'COLOR') {
    const groupId = token.path[2] || token.path[1] || 'base';
    return `${systemId} • Colors / ${toTitleCase(groupId)}`;
  }

  const seg = token.path[1] || 'general';
  let category = 'Dimensions';
  if (seg.includes('radius') || seg.includes('shape')) category = 'Shape';
  else if (seg.includes('border')) category = 'Border';
  else if (seg.includes('focus')) category = 'Focus';
  else if (seg.includes('spacing') || seg.includes('gap') || seg.includes('padding') || seg.includes('size') || seg.includes('layout'))
    category = 'Size';

  return `${systemId} • ${category} / ${toTitleCase(seg || 'Base')}`;
}

module.exports = function registerFullVariablesFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'figma/variables-full',
    format({ dictionary }) {
      const collectionsMap = new Map();

      dictionary.allTokens.forEach((token) => {
        const variableType = mapVariableType(token);
        if (!variableType) return;

        const value =
          variableType === 'COLOR'
            ? resolveColorValue(token)
            : resolveNumericValue(token);

        if (value === null || value === undefined) return;

        const collectionName = resolveCollectionName(token, variableType);
        if (!collectionsMap.has(collectionName)) {
          collectionsMap.set(collectionName, {
            name: collectionName,
            mode: 'default',
            variables: []
          });
        }

        collectionsMap.get(collectionName).variables.push({
          path: token.path.join('.'),
          type: variableType,
          value
        });
      });

      const collections = Array.from(collectionsMap.values()).map((collection) => ({
        ...collection,
        variables: collection.variables.sort((a, b) => a.path.localeCompare(b.path))
      }));

      return JSON.stringify(
        {
          system: {
            id: systemMeta?.system?.id ?? 'envy-ui',
            version: systemMeta?.system?.version ?? '0.0.0'
          },
          collections
        },
        null,
        2
      );
    }
  });
};
