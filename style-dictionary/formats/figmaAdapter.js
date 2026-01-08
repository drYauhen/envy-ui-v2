import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { isVisualToken } from '../utils/token-filters.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const systemMeta = JSON.parse(readFileSync(resolve(__dirname, '../../system.meta.json'), 'utf8'));

const toTitleCase = (value = '') =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());

export default function registerFigmaAdapterFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'figma/adapter',
    format({ dictionary }) {
      const collectionsMap = new Map();

      dictionary.allTokens
        .filter((token) => {
          // Skip non-visual tokens (behavior/, metadata/, etc.)
          if (!isVisualToken(token.filePath)) {
            return false;
          }
          return token?.path?.[0] === 'eui' && token?.path?.[1] === 'color';
        })
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
}
