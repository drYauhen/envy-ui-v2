import fs from 'fs';
import path from 'path';

const REF_SET_PREFIX = '#/sets/';
const REF_MODIFIER_PREFIX = '#/modifiers/';

function normalizeSourceRef(source) {
  if (!source) return null;
  if (typeof source === 'string') return source;
  if (typeof source === 'object' && typeof source.$ref === 'string') return source.$ref;
  return null;
}

function parseRef(ref) {
  if (typeof ref !== 'string') return { kind: 'unknown', name: null };
  if (ref.startsWith(REF_SET_PREFIX)) {
    return { kind: 'set', name: ref.slice(REF_SET_PREFIX.length) };
  }
  if (ref.startsWith(REF_MODIFIER_PREFIX)) {
    return { kind: 'modifier', name: ref.slice(REF_MODIFIER_PREFIX.length) };
  }
  return { kind: 'unknown', name: null };
}

function getSetSources(resolver, setName) {
  const set = resolver?.sets?.[setName];
  if (!set || !Array.isArray(set.sources)) {
    throw new Error(`Resolver set "${setName}" is missing or has invalid sources.`);
  }

  return set.sources
    .map(normalizeSourceRef)
    .filter(Boolean)
    .map((sourceRef) => ({
      sourceRef,
      via: `set:${setName}`
    }));
}

function getModifierSources(resolver, modifierName, selections = {}) {
  const modifier = resolver?.modifiers?.[modifierName];
  if (!modifier || typeof modifier !== 'object') {
    throw new Error(`Resolver modifier "${modifierName}" is missing.`);
  }

  const contexts = modifier.contexts || {};
  const available = Object.keys(contexts);
  if (available.length === 0) {
    throw new Error(`Resolver modifier "${modifierName}" has no contexts.`);
  }

  const selectedContext = selections[modifierName] || modifier.default || available[0];
  const selectedSources = contexts[selectedContext];

  if (!Array.isArray(selectedSources)) {
    throw new Error(
      `Resolver modifier "${modifierName}" has no context "${selectedContext}". Available: ${available.join(', ')}`
    );
  }

  return {
    selectedContext,
    availableContexts: available,
    sources: selectedSources
      .map(normalizeSourceRef)
      .filter(Boolean)
      .map((sourceRef) => ({
        sourceRef,
        via: `modifier:${modifierName}.${selectedContext}`
      }))
  };
}

export function flattenResolverSources(resolver, selections = {}) {
  if (!resolver || typeof resolver !== 'object') {
    throw new Error('Resolver payload is required.');
  }

  if (!Array.isArray(resolver.resolutionOrder)) {
    throw new Error('Resolver "resolutionOrder" must be an array.');
  }

  const resolvedSelections = {};
  const entries = [];

  resolver.resolutionOrder.forEach((orderItem, index) => {
    const orderRef = normalizeSourceRef(orderItem);
    const { kind, name } = parseRef(orderRef);

    if (!orderRef || kind === 'unknown' || !name) {
      throw new Error(`Unsupported resolutionOrder entry at index ${index}: ${JSON.stringify(orderItem)}`);
    }

    if (kind === 'set') {
      entries.push(...getSetSources(resolver, name));
      return;
    }

    const modifierResult = getModifierSources(resolver, name, selections);
    resolvedSelections[name] = modifierResult.selectedContext;
    entries.push(...modifierResult.sources);
  });

  return {
    entries,
    resolvedSelections
  };
}

export function loadResolverFile(resolverPath) {
  const absolutePath = path.resolve(resolverPath);
  const payload = fs.readFileSync(absolutePath, 'utf8');
  return {
    path: absolutePath,
    dir: path.dirname(absolutePath),
    resolver: JSON.parse(payload)
  };
}

export function resolveSourcePathFromRef(resolverDir, sourceRef) {
  return path.resolve(resolverDir, sourceRef);
}
