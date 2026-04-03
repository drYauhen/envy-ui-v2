#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const resolverDir = path.join(repoRoot, 'tokens', 'knowledge', 'resolver');
const resolverPath = path.join(resolverDir, 'app-core.resolver.json');

const toPosix = (value) => value.split(path.sep).join('/');
const toRef = (absolutePath) => toPosix(path.relative(resolverDir, absolutePath));

const readDirSorted = (dir) => fs.readdirSync(dir).sort((a, b) => a.localeCompare(b));

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return readDirSorted(dir)
    .filter((name) => name.endsWith('.json') && !name.endsWith('.meta.json'))
    .map((name) => path.join(dir, name));
}

function listJsonFilesRecursive(dir) {
  if (!fs.existsSync(dir)) return [];

  const result = [];

  const walk = (currentDir) => {
    const entries = readDirSorted(currentDir);
    entries.forEach((entry) => {
      const absolute = path.join(currentDir, entry);
      const stat = fs.statSync(absolute);
      if (stat.isDirectory()) {
        walk(absolute);
        return;
      }
      if (!entry.endsWith('.json') || entry.endsWith('.meta.json')) {
        return;
      }
      result.push(absolute);
    });
  };

  walk(dir);
  return result;
}

function toSources(paths) {
  return paths.map((absolutePath) => ({ $ref: toRef(absolutePath) }));
}

const primitives = listJsonFiles(path.join(repoRoot, 'tokens', 'primitives'));
const appRaw = listJsonFiles(path.join(repoRoot, 'tokens', 'contexts', 'app', 'raw'));
const appSemantics = listJsonFilesRecursive(path.join(repoRoot, 'tokens', 'contexts', 'app', 'semantics'));
const appThemes = listJsonFiles(path.join(repoRoot, 'tokens', 'contexts', 'app', 'themes'));
const appComponentsPath = path.join(repoRoot, 'tokens', 'contexts', 'app', 'components.json');
const appComponents = fs.existsSync(appComponentsPath) ? [appComponentsPath] : [];

const themeContexts = Object.fromEntries(
  appThemes.map((themePath) => {
    const themeName = path.basename(themePath, '.json');
    return [themeName, [{ $ref: toRef(themePath) }]];
  })
);

const resolver = {
  $schema: 'https://www.designtokens.org/schemas/2025.10/resolver.json',
  name: 'Envy UI App Core Resolver',
  version: '2025.10',
  description:
    'Phase 1 resolver skeleton for app context. Mirrors current app source layering without changing generation behavior.',
  sets: {
    primitives: {
      description: 'Design token primitives shared across contexts.',
      sources: toSources(primitives)
    },
    appRaw: {
      description: 'App raw aliases to primitives.',
      sources: toSources(appRaw)
    },
    appSemantics: {
      description: 'App semantic tokens.',
      sources: toSources(appSemantics)
    },
    appComponents: {
      description: 'App component contract tokens.',
      sources: toSources(appComponents)
    }
  },
  modifiers: {
    appTheme: {
      description: 'App theme selection.',
      contexts: themeContexts,
      default: themeContexts.default ? 'default' : Object.keys(themeContexts)[0]
    }
  },
  resolutionOrder: [
    { $ref: '#/sets/primitives' },
    { $ref: '#/sets/appRaw' },
    { $ref: '#/sets/appSemantics' },
    { $ref: '#/modifiers/appTheme' },
    { $ref: '#/sets/appComponents' }
  ]
};

fs.mkdirSync(resolverDir, { recursive: true });
fs.writeFileSync(resolverPath, `${JSON.stringify(resolver, null, 2)}\n`, 'utf8');

console.log('✅ Generated resolver file:');
console.log(`   ${path.relative(repoRoot, resolverPath)}`);
console.log('');
console.log('📊 Source inventory:');
console.log(`   primitives:   ${primitives.length}`);
console.log(`   appRaw:       ${appRaw.length}`);
console.log(`   appSemantics: ${appSemantics.length}`);
console.log(`   appThemes:    ${appThemes.length}`);
console.log(`   appComponents:${appComponents.length}`);
