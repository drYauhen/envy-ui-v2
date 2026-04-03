#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SUPPORTED_CONTEXTS,
  buildContextCoreResolver,
  buildStorybookResolver,
  listContextInventory
} from './utils/resolver-inventory.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const resolverDir = path.join(repoRoot, 'tokens', 'knowledge', 'resolver');

function writeResolverFile(fileName, resolver) {
  const targetPath = path.join(resolverDir, fileName);
  fs.writeFileSync(targetPath, `${JSON.stringify(resolver, null, 2)}\n`, 'utf8');
  return targetPath;
}

function printInventory(context) {
  const inventory = listContextInventory(repoRoot, context);
  console.log(`📊 ${context} inventory:`);
  console.log(`   raw:        ${inventory.raw.length}`);
  console.log(`   semantics:  ${inventory.semantics.length}`);
  console.log(`   themes:     ${inventory.themes.length}`);
  console.log(`   components: ${inventory.components.length}`);
}

function main() {
  fs.mkdirSync(resolverDir, { recursive: true });

  const files = [];

  files.push({
    name: 'website-core.resolver.json',
    resolver: buildContextCoreResolver({ repoRoot, resolverDir, context: 'website' })
  });
  files.push({
    name: 'report-core.resolver.json',
    resolver: buildContextCoreResolver({ repoRoot, resolverDir, context: 'report' })
  });
  files.push({
    name: 'storybook.resolver.json',
    resolver: buildStorybookResolver({ repoRoot, resolverDir, contexts: SUPPORTED_CONTEXTS })
  });

  console.log('✅ Generated resolver files (Phase 4):');
  files.forEach(({ name, resolver }) => {
    const absolutePath = writeResolverFile(name, resolver);
    console.log(`   - ${path.relative(repoRoot, absolutePath)}`);
  });

  console.log('');
  SUPPORTED_CONTEXTS.forEach((context) => printInventory(context));
}

main();
