#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import { flattenResolverSources, loadResolverFile } from './utils/resolver-order.mjs';
import { buildContextCoreResolver } from './utils/resolver-inventory.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const resolverPath = path.join(repoRoot, 'tokens', 'knowledge', 'resolver', 'app-core.resolver.json');

function parseTheme(argv) {
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--theme') return argv[i + 1] || null;
  }
  return null;
}

function computeLegacyOrder(themeName) {
  const expectedResolver = buildContextCoreResolver({
    repoRoot,
    resolverDir: path.dirname(resolverPath),
    context: 'app'
  });
  return flattenResolverSources(expectedResolver, { appTheme: themeName }).entries.map((entry) => entry.sourceRef);
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
