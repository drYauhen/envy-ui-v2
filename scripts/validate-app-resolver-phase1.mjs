#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildContextCoreResolver } from './utils/resolver-inventory.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const resolverDir = path.join(repoRoot, 'tokens', 'knowledge', 'resolver');
const resolverPath = path.join(resolverDir, 'app-core.resolver.json');

function getSetRefs(resolver, setName) {
  const set = resolver?.sets?.[setName];
  if (!set || !Array.isArray(set.sources)) return [];
  return set.sources.map((source) => source?.$ref).filter(Boolean);
}

function compareArrays(label, expected, actual, errors) {
  const expectedOnly = expected.filter((ref) => !actual.includes(ref));
  const actualOnly = actual.filter((ref) => !expected.includes(ref));

  if (expectedOnly.length > 0 || actualOnly.length > 0 || expected.length !== actual.length) {
    errors.push(`${label}: mismatch`);
    if (expectedOnly.length > 0) {
      errors.push(`  missing in resolver (${expectedOnly.length}):`);
      expectedOnly.forEach((ref) => errors.push(`    - ${ref}`));
    }
    if (actualOnly.length > 0) {
      errors.push(`  extra in resolver (${actualOnly.length}):`);
      actualOnly.forEach((ref) => errors.push(`    + ${ref}`));
    }
  }

  const orderMismatch =
    expected.length === actual.length && expected.some((value, index) => value !== actual[index]);

  if (orderMismatch) {
    errors.push(`${label}: order mismatch`);
    errors.push('  expected head:');
    expected.slice(0, 5).forEach((ref) => errors.push(`    - ${ref}`));
    errors.push('  actual head:');
    actual.slice(0, 5).forEach((ref) => errors.push(`    - ${ref}`));
  }
}

function validate() {
  if (!fs.existsSync(resolverPath)) {
    console.error(`❌ Resolver file not found: ${path.relative(repoRoot, resolverPath)}`);
    process.exit(1);
  }

  const resolver = JSON.parse(fs.readFileSync(resolverPath, 'utf8'));
  const expectedResolver = buildContextCoreResolver({ repoRoot, resolverDir, context: 'app' });
  const errors = [];

  if (resolver.version !== '2025.10') {
    errors.push(`version must be 2025.10, got: ${resolver.version}`);
  }

  compareArrays('set:primitives', getSetRefs(expectedResolver, 'primitives'), getSetRefs(resolver, 'primitives'), errors);
  compareArrays('set:appRaw', getSetRefs(expectedResolver, 'appRaw'), getSetRefs(resolver, 'appRaw'), errors);
  compareArrays(
    'set:appSemantics',
    getSetRefs(expectedResolver, 'appSemantics'),
    getSetRefs(resolver, 'appSemantics'),
    errors
  );
  compareArrays(
    'set:appComponents',
    getSetRefs(expectedResolver, 'appComponents'),
    getSetRefs(resolver, 'appComponents'),
    errors
  );

  const contexts = resolver?.modifiers?.appTheme?.contexts || {};
  const expectedThemeNames = Object.keys(expectedResolver?.modifiers?.appTheme?.contexts || {}).sort();
  const actualThemeNames = Object.keys(contexts).sort();

  compareArrays('modifier:appTheme contexts', expectedThemeNames, actualThemeNames, errors);

  expectedThemeNames.forEach((themeName) => {
    const actualRefs = Array.isArray(contexts[themeName])
      ? contexts[themeName].map((source) => source?.$ref).filter(Boolean)
      : [];
    const expectedRefs = Array.isArray(expectedResolver?.modifiers?.appTheme?.contexts?.[themeName])
      ? expectedResolver.modifiers.appTheme.contexts[themeName].map((source) => source?.$ref).filter(Boolean)
      : [];
    compareArrays(`modifier:appTheme.${themeName}`, expectedRefs, actualRefs, errors);
  });

  if (!resolver?.modifiers?.appTheme?.default) {
    errors.push('modifier:appTheme.default is missing');
  }

  const expectedResolutionOrder = Array.isArray(expectedResolver.resolutionOrder)
    ? expectedResolver.resolutionOrder.map((item) => item?.$ref).filter(Boolean)
    : [];
  const actualResolutionOrder = Array.isArray(resolver.resolutionOrder)
    ? resolver.resolutionOrder.map((item) => item?.$ref).filter(Boolean)
    : [];

  compareArrays('resolutionOrder', expectedResolutionOrder, actualResolutionOrder, errors);

  console.log('📊 Phase 1 resolver inventory (expected):');
  console.log(`   primitives:   ${getSetRefs(expectedResolver, 'primitives').length}`);
  console.log(`   appRaw:       ${getSetRefs(expectedResolver, 'appRaw').length}`);
  console.log(`   appSemantics: ${getSetRefs(expectedResolver, 'appSemantics').length}`);
  console.log(`   appThemes:    ${expectedThemeNames.length}`);
  console.log(`   appComponents:${getSetRefs(expectedResolver, 'appComponents').length}`);

  if (errors.length > 0) {
    console.error('\n❌ Resolver validation failed:\n');
    errors.forEach((line) => console.error(line));
    process.exit(1);
  }

  console.log('\n✅ Resolver validation passed (Phase 1, app-core).');
}

validate();
