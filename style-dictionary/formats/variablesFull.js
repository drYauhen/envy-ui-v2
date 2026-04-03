import { isVisualToken } from '../utils/token-filters.js';
import {
  getSystemMeta,
  mapVariableType,
  resolveCollectionName,
  resolveNumericValue,
  resolveRawColorValue
} from '../utils/figma-format-utils.js';

const systemMeta = getSystemMeta();

export default function registerFullVariablesFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'figma/variables-full',
    format({ dictionary }) {
      const collectionsMap = new Map();

      dictionary.allTokens.forEach((token) => {
        const filePath = token.filePath || '';
        
        // Skip non-visual tokens (behavior/, metadata/, etc.)
        if (!isVisualToken(filePath)) {
          return;
        }
        
        const variableType = mapVariableType(token);
        if (!variableType) return;

        const value =
          variableType === 'COLOR'
            ? resolveRawColorValue(token)
            : resolveNumericValue(token);

        if (value === null || value === undefined) return;

        const collectionName = resolveCollectionName(token, variableType, {
          systemId: systemMeta?.system?.id ?? 'envy-ui'
        });
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
}
