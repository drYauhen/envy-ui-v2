#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  buildContextCoreResolver,
  listContextInventory,
  listPrimitiveFiles
} from './utils/resolver-inventory.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const resolverDir = path.join(repoRoot, 'tokens', 'knowledge', 'resolver');
const resolverPath = path.join(resolverDir, 'app-core.resolver.json');
const resolver = buildContextCoreResolver({ repoRoot, resolverDir, context: 'app' });
resolver.description =
  'Phase 1 resolver skeleton for app context. Mirrors current app source layering without changing generation behavior.';

fs.mkdirSync(resolverDir, { recursive: true });
fs.writeFileSync(resolverPath, `${JSON.stringify(resolver, null, 2)}\n`, 'utf8');

const primitives = listPrimitiveFiles(repoRoot);
const appInventory = listContextInventory(repoRoot, 'app');

console.log('✅ Generated resolver file:');
console.log(`   ${path.relative(repoRoot, resolverPath)}`);
console.log('');
console.log('📊 Source inventory:');
console.log(`   primitives:   ${primitives.length}`);
console.log(`   appRaw:       ${appInventory.raw.length}`);
console.log(`   appSemantics: ${appInventory.semantics.length}`);
console.log(`   appThemes:    ${appInventory.themes.length}`);
console.log(`   appComponents:${appInventory.components.length}`);
