#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { flattenResolverSources, loadResolverFile } from './utils/resolver-order.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const resolverPath = path.join(repoRoot, 'tokens', 'knowledge', 'resolver', 'app-core.resolver.json');
const resolverDir = path.dirname(resolverPath);

const toPosix = (value) => value.split(path.sep).join('/');
const toRef = (absolutePath) => toPosix(path.relative(resolverDir, absolutePath));
const readDirSorted = (dir) => fs.readdirSync(dir).sort((a, b) => a.localeCompare(b));

function parseTheme(argv) {
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--theme') return argv[i + 1] || null;
  }
  return null;
}

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
    readDirSorted(currentDir).forEach((entry) => {
      const absolute = path.join(currentDir, entry);
      const stat = fs.statSync(absolute);
      if (stat.isDirectory()) {
        walk(absolute);
        return;
      }
      if (!entry.endsWith('.json') || entry.endsWith('.meta.json')) return;
      result.push(absolute);
    });
  };

  walk(dir);
  return result;
}

function computeLegacyOrder(themeName) {
  const primitives = listJsonFiles(path.join(repoRoot, 'tokens', 'primitives')).map(toRef);
  const raw = listJsonFiles(path.join(repoRoot, 'tokens', 'contexts', 'app', 'raw')).map(toRef);
  const semantics = listJsonFilesRecursive(path.join(repoRoot, 'tokens', 'contexts', 'app', 'semantics')).map(toRef);
  const themePath = path.join(repoRoot, 'tokens', 'contexts', 'app', 'themes', `${themeName}.json`);
  const theme = fs.existsSync(themePath) ? [toRef(themePath)] : [];
  const componentsPath = path.join(repoRoot, 'tokens', 'contexts', 'app', 'components.json');
  const components = fs.existsSync(componentsPath) ? [toRef(componentsPath)] : [];

  return [...primitives, ...raw, ...semantics, ...theme, ...components];
}

function findFirstMismatch(expected, actual) {
  const len = Math.max(expected.length, actual.length);
  for (let i = 0; i < len; i += 1) {
    if (expected[i] !== actual[i]) {
      return {
        index: i,
        expected: expected[i] || null,
        actual: actual[i] || null
      };
    }
  }
  return null;
}

function main() {
  const themeArg = parseTheme(process.argv.slice(2));
  const { resolver } = loadResolverFile(resolverPath);
  const resolvedTheme = themeArg || resolver?.modifiers?.appTheme?.default || 'default';

  const flattened = flattenResolverSources(resolver, { appTheme: resolvedTheme });
  const resolverOrder = flattened.entries.map((entry) => entry.sourceRef);
  const legacyOrder = computeLegacyOrder(resolvedTheme);

  const mismatch = findFirstMismatch(legacyOrder, resolverOrder);

  console.log(`Theme: ${resolvedTheme}`);
  console.log(`Legacy count:   ${legacyOrder.length}`);
  console.log(`Resolver count: ${resolverOrder.length}`);

  if (!mismatch) {
    console.log('✅ Resolver order matches legacy order (Phase 2 read-only check).');
    return;
  }

  console.error('❌ Resolver order mismatch (Phase 2 read-only check).');
  console.error(`First mismatch at index ${mismatch.index + 1}:`);
  console.error(`  legacy:   ${mismatch.expected || '(none)'}`);
  console.error(`  resolver: ${mismatch.actual || '(none)'}`);
  process.exit(1);
}

main();
