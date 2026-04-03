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

function expectedInventory() {
  const primitives = listJsonFiles(path.join(repoRoot, 'tokens', 'primitives')).map(toRef);
  const appRaw = listJsonFiles(path.join(repoRoot, 'tokens', 'contexts', 'app', 'raw')).map(toRef);
  const appSemantics = listJsonFilesRecursive(path.join(repoRoot, 'tokens', 'contexts', 'app', 'semantics')).map(toRef);
  const appThemes = listJsonFiles(path.join(repoRoot, 'tokens', 'contexts', 'app', 'themes')).map(toRef);

  const componentsPath = path.join(repoRoot, 'tokens', 'contexts', 'app', 'components.json');
  const appComponents = fs.existsSync(componentsPath) ? [toRef(componentsPath)] : [];

  return { primitives, appRaw, appSemantics, appThemes, appComponents };
}

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
  const expected = expectedInventory();
  const errors = [];

  if (resolver.version !== '2025.10') {
    errors.push(`version must be 2025.10, got: ${resolver.version}`);
  }

  compareArrays('set:primitives', expected.primitives, getSetRefs(resolver, 'primitives'), errors);
  compareArrays('set:appRaw', expected.appRaw, getSetRefs(resolver, 'appRaw'), errors);
  compareArrays('set:appSemantics', expected.appSemantics, getSetRefs(resolver, 'appSemantics'), errors);
  compareArrays('set:appComponents', expected.appComponents, getSetRefs(resolver, 'appComponents'), errors);

  const contexts = resolver?.modifiers?.appTheme?.contexts || {};
  const expectedThemeNames = expected.appThemes.map((ref) => path.basename(ref, '.json')).sort();
  const actualThemeNames = Object.keys(contexts).sort();

  compareArrays('modifier:appTheme contexts', expectedThemeNames, actualThemeNames, errors);

  expectedThemeNames.forEach((themeName) => {
    const actualRefs = Array.isArray(contexts[themeName])
      ? contexts[themeName].map((source) => source?.$ref).filter(Boolean)
      : [];
    const expectedRef = expected.appThemes.find((ref) => path.basename(ref, '.json') === themeName);
    compareArrays(`modifier:appTheme.${themeName}`, expectedRef ? [expectedRef] : [], actualRefs, errors);
  });

  if (!resolver?.modifiers?.appTheme?.default) {
    errors.push('modifier:appTheme.default is missing');
  }

  const expectedResolutionOrder = [
    '#/sets/primitives',
    '#/sets/appRaw',
    '#/sets/appSemantics',
    '#/modifiers/appTheme',
    '#/sets/appComponents'
  ];
  const actualResolutionOrder = Array.isArray(resolver.resolutionOrder)
    ? resolver.resolutionOrder.map((item) => item?.$ref).filter(Boolean)
    : [];

  compareArrays('resolutionOrder', expectedResolutionOrder, actualResolutionOrder, errors);

  console.log('📊 Phase 1 resolver inventory (expected):');
  console.log(`   primitives:   ${expected.primitives.length}`);
  console.log(`   appRaw:       ${expected.appRaw.length}`);
  console.log(`   appSemantics: ${expected.appSemantics.length}`);
  console.log(`   appThemes:    ${expected.appThemes.length}`);
  console.log(`   appComponents:${expected.appComponents.length}`);

  if (errors.length > 0) {
    console.error('\n❌ Resolver validation failed:\n');
    errors.forEach((line) => console.error(line));
    process.exit(1);
  }

  console.log('\n✅ Resolver validation passed (Phase 1, app-core).');
}

validate();
