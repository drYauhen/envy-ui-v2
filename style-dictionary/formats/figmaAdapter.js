const systemMeta = require('../../system.meta.json');

const toTitleCase = (value = '') =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());

module.exports = function registerFigmaAdapterFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'figma/adapter',
    format({ dictionary }) {
      const collectionsMap = new Map();

      dictionary.allTokens
        .filter((token) => token?.path?.[0] === 'ui' && token?.path?.[1] === 'color')
        .forEach((token) => {
          const groupId = token.path[2] || 'base';
          const collectionName = `${systemMeta?.system?.id ?? 'System'} • Colors / ${toTitleCase(groupId)}`;

          if (!collectionsMap.has(collectionName)) {
            collectionsMap.set(collectionName, {
              name: collectionName,
              mode: 'default',
              variables: []
            });
          }

          collectionsMap.get(collectionName).variables.push({
            path: token.path.join('.'),
            type: 'COLOR',
            value: token.$value ?? token.value ?? token.original?.value ?? ''
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
