#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { flattenResolverSources, loadResolverFile } from './utils/resolver-order.mjs';
import {
  SUPPORTED_CONTEXTS,
  buildContextCoreResolver,
  buildStorybookResolver
} from './utils/resolver-inventory.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const resolverDir = path.join(repoRoot, 'tokens', 'knowledge', 'resolver');

const resolverSpecs = [
  {
    fileName: 'app-core.resolver.json',
    buildExpected: () => buildContextCoreResolver({ repoRoot, resolverDir, context: 'app' })
  },
  {
    fileName: 'website-core.resolver.json',
    buildExpected: () => buildContextCoreResolver({ repoRoot, resolverDir, context: 'website' })
  },
  {
    fileName: 'report-core.resolver.json',
    buildExpected: () => buildContextCoreResolver({ repoRoot, resolverDir, context: 'report' })
  },
  {
    fileName: 'storybook.resolver.json',
    buildExpected: () => buildStorybookResolver({ repoRoot, resolverDir, contexts: SUPPORTED_CONTEXTS })
  }
];

function compareArrays(label, expected, actual, errors) {
  const expectedOnly = expected.filter((item) => !actual.includes(item));
  const actualOnly = actual.filter((item) => !expected.includes(item));

  if (expectedOnly.length || actualOnly.length || expected.length !== actual.length) {
    errors.push(`${label}: mismatch`);
    if (expectedOnly.length) {
      errors.push(`  missing in actual (${expectedOnly.length}):`);
      expectedOnly.forEach((value) => errors.push(`    - ${value}`));
    }
    if (actualOnly.length) {
      errors.push(`  extra in actual (${actualOnly.length}):`);
      actualOnly.forEach((value) => errors.push(`    + ${value}`));
    }
  }

  if (expected.length === actual.length && expected.some((item, index) => item !== actual[index])) {
    errors.push(`${label}: order mismatch`);
    errors.push(`  expected head: ${expected.slice(0, 5).join(', ') || '(empty)'}`);
    errors.push(`  actual head:   ${actual.slice(0, 5).join(', ') || '(empty)'}`);
  }
}

function getSetRefs(resolver, setName) {
  const set = resolver?.sets?.[setName];
  if (!set || !Array.isArray(set.sources)) return [];
  return set.sources.map((source) => source?.$ref).filter(Boolean);
}

function getModifierContextRefs(resolver, modifierName, contextName) {
  const contexts = resolver?.modifiers?.[modifierName]?.contexts || {};
  const sources = Array.isArray(contexts[contextName]) ? contexts[contextName] : [];
  return sources.map((source) => source?.$ref).filter(Boolean);
}

function assertSourceArrayDeterministic(label, refs, errors) {
  const sorted = [...refs].sort((a, b) => a.localeCompare(b));
  if (refs.some((value, index) => value !== sorted[index])) {
    errors.push(`${label}: sources are not sorted lexicographically`);
  }

  const unique = new Set(refs);
  if (unique.size !== refs.length) {
    errors.push(`${label}: duplicate source refs detected`);
  }
}

function assertSourceRefsExist(fileName, refs, errors) {
  refs.forEach((ref) => {
    const absolute = path.resolve(resolverDir, ref);
    if (!fs.existsSync(absolute)) {
      errors.push(`${fileName}: source file does not exist -> ${ref}`);
    }
  });
}

function validateStructure(fileName, resolver, errors) {
  if (resolver.version !== '2025.10') {
    errors.push(`${fileName}: version must be 2025.10, got ${resolver.version}`);
  }

  const setEntries = Object.entries(resolver?.sets || {});
  if (setEntries.length === 0) {
    errors.push(`${fileName}: resolver must contain at least one set`);
  }

  setEntries.forEach(([setName, setValue]) => {
    if (!Array.isArray(setValue?.sources)) {
      errors.push(`${fileName}: set "${setName}" must have a sources array`);
      return;
    }
    const refs = setValue.sources.map((source) => source?.$ref).filter(Boolean);
    assertSourceArrayDeterministic(`${fileName} set:${setName}`, refs, errors);
    assertSourceRefsExist(fileName, refs, errors);
  });

  Object.entries(resolver?.modifiers || {}).forEach(([modifierName, modifierValue]) => {
    const contexts = modifierValue?.contexts || {};
    const contextNames = Object.keys(contexts);
    if (contextNames.length === 0) {
      errors.push(`${fileName}: modifier "${modifierName}" has no contexts`);
      return;
    }

    if (!modifierValue.default || !contexts[modifierValue.default]) {
      errors.push(`${fileName}: modifier "${modifierName}" has invalid default`);
    }

    contextNames.forEach((contextName) => {
      if (!Array.isArray(contexts[contextName])) {
        errors.push(`${fileName}: modifier "${modifierName}" context "${contextName}" must be an array`);
        return;
      }
      const refs = contexts[contextName].map((source) => source?.$ref).filter(Boolean);
      assertSourceArrayDeterministic(`${fileName} modifier:${modifierName}.${contextName}`, refs, errors);
      assertSourceRefsExist(fileName, refs, errors);
    });
  });

  if (!Array.isArray(resolver.resolutionOrder) || resolver.resolutionOrder.length === 0) {
    errors.push(`${fileName}: resolutionOrder must be a non-empty array`);
  } else {
    resolver.resolutionOrder.forEach((entry, index) => {
      const ref = entry?.$ref;
      if (typeof ref !== 'string') {
        errors.push(`${fileName}: resolutionOrder[${index}] must be a string $ref`);
        return;
      }
      if (ref.startsWith('#/sets/')) {
        const setName = ref.slice('#/sets/'.length);
        if (!resolver?.sets?.[setName]) {
          errors.push(`${fileName}: resolutionOrder[${index}] references missing set "${setName}"`);
        }
        return;
      }
      if (ref.startsWith('#/modifiers/')) {
        const modifierName = ref.slice('#/modifiers/'.length);
        if (!resolver?.modifiers?.[modifierName]) {
          errors.push(`${fileName}: resolutionOrder[${index}] references missing modifier "${modifierName}"`);
        }
        return;
      }
      errors.push(`${fileName}: resolutionOrder[${index}] has unsupported ref "${ref}"`);
    });
  }

  try {
    const flattened = flattenResolverSources(resolver);
    const flattenedRefs = flattened.entries.map((entry) => entry.sourceRef);
    const unique = new Set(flattenedRefs);
    if (unique.size !== flattenedRefs.length) {
      errors.push(`${fileName}: flattened resolution order contains duplicate source refs`);
    }
    assertSourceRefsExist(fileName, flattenedRefs, errors);
  } catch (error) {
    errors.push(`${fileName}: flattenResolverSources failed -> ${error.message}`);
  }
}

function validateAgainstExpected(fileName, resolver, expected, errors) {
  const actualSetNames = Object.keys(resolver?.sets || {}).sort();
  const expectedSetNames = Object.keys(expected?.sets || {}).sort();
  compareArrays(`${fileName} set names`, expectedSetNames, actualSetNames, errors);

  expectedSetNames.forEach((setName) => {
    compareArrays(
      `${fileName} set:${setName}`,
      getSetRefs(expected, setName),
      getSetRefs(resolver, setName),
      errors
    );
  });

  const actualModifierNames = Object.keys(resolver?.modifiers || {}).sort();
  const expectedModifierNames = Object.keys(expected?.modifiers || {}).sort();
  compareArrays(`${fileName} modifier names`, expectedModifierNames, actualModifierNames, errors);

  expectedModifierNames.forEach((modifierName) => {
    const actualContexts = Object.keys(resolver?.modifiers?.[modifierName]?.contexts || {}).sort();
    const expectedContexts = Object.keys(expected?.modifiers?.[modifierName]?.contexts || {}).sort();
    compareArrays(`${fileName} modifier:${modifierName} contexts`, expectedContexts, actualContexts, errors);

    expectedContexts.forEach((contextName) => {
      compareArrays(
        `${fileName} modifier:${modifierName}.${contextName}`,
        getModifierContextRefs(expected, modifierName, contextName),
        getModifierContextRefs(resolver, modifierName, contextName),
        errors
      );
    });

    const expectedDefault = expected?.modifiers?.[modifierName]?.default || null;
    const actualDefault = resolver?.modifiers?.[modifierName]?.default || null;
    if (expectedDefault !== actualDefault) {
      errors.push(
        `${fileName} modifier:${modifierName} default mismatch: expected "${expectedDefault}", got "${actualDefault}"`
      );
    }
  });

  const expectedOrder = Array.isArray(expected?.resolutionOrder)
    ? expected.resolutionOrder.map((entry) => entry?.$ref).filter(Boolean)
    : [];
  const actualOrder = Array.isArray(resolver?.resolutionOrder)
    ? resolver.resolutionOrder.map((entry) => entry?.$ref).filter(Boolean)
    : [];
  compareArrays(`${fileName} resolutionOrder`, expectedOrder, actualOrder, errors);
}

function validateResolverSpec({ fileName, buildExpected }, errors) {
  const resolverPath = path.join(resolverDir, fileName);
  if (!fs.existsSync(resolverPath)) {
    errors.push(`${fileName}: missing resolver file`);
    return;
  }

  const { resolver } = loadResolverFile(resolverPath);
  const expected = buildExpected();

  validateStructure(fileName, resolver, errors);
  validateAgainstExpected(fileName, resolver, expected, errors);
}

function main() {
  const errors = [];

  resolverSpecs.forEach((spec) => validateResolverSpec(spec, errors));

  if (errors.length > 0) {
    console.error('❌ Resolver phase-4 validation failed:\n');
    errors.forEach((line) => console.error(line));
    process.exit(1);
  }

  console.log('✅ Resolver validation passed for app/website/report/storybook.');
  resolverSpecs.forEach(({ fileName }) => {
    console.log(`   - ${path.join('tokens', 'knowledge', 'resolver', fileName)}`);
  });
}

main();
