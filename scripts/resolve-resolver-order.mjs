#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { flattenResolverSources, loadResolverFile, resolveSourcePathFromRef } from './utils/resolver-order.mjs';

function parseArgs(argv) {
  const args = {
    resolver: null,
    modifiers: {},
    asJson: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === '--resolver') {
      args.resolver = argv[i + 1] || null;
      i += 1;
      continue;
    }

    if (token === '--modifier') {
      const pair = argv[i + 1] || '';
      const [key, value] = pair.split('=');
      if (key && value) args.modifiers[key] = value;
      i += 1;
      continue;
    }

    if (token === '--json') {
      args.asJson = true;
    }
  }

  return args;
}

function usage() {
  console.log('Usage: node scripts/resolve-resolver-order.mjs --resolver <path> [--modifier key=value] [--json]');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.resolver) {
    usage();
    process.exit(1);
  }

  const { path: resolverPath, dir: resolverDir, resolver } = loadResolverFile(args.resolver);
  const flattened = flattenResolverSources(resolver, args.modifiers);

  const output = {
    resolver: path.relative(process.cwd(), resolverPath),
    resolvedSelections: flattened.resolvedSelections,
    sources: flattened.entries.map((entry, index) => ({
      index: index + 1,
      sourceRef: entry.sourceRef,
      sourcePath: path.relative(process.cwd(), resolveSourcePathFromRef(resolverDir, entry.sourceRef)),
      exists: fs.existsSync(resolveSourcePathFromRef(resolverDir, entry.sourceRef)),
      via: entry.via
    }))
  };

  if (args.asJson) {
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  console.log(`Resolver: ${output.resolver}`);
  console.log(`Resolved modifiers: ${Object.keys(output.resolvedSelections).length ? '' : '(none)'}`);
  Object.entries(output.resolvedSelections).forEach(([name, selected]) => {
    console.log(`  - ${name}=${selected}`);
  });
  console.log('');
  output.sources.forEach((source) => {
    const marker = source.exists ? '✓' : '✗';
    console.log(`${String(source.index).padStart(2, '0')}. ${marker} ${source.sourceRef}  (${source.via})`);
  });
}

main();
