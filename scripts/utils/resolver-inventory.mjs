import fs from 'fs';
import path from 'path';

export const SUPPORTED_CONTEXTS = ['app', 'website', 'report'];

const readDirSorted = (dir) => fs.readdirSync(dir).sort((a, b) => a.localeCompare(b));

export const toPosix = (value) => value.split(path.sep).join('/');

export function toResolverRef(resolverDir, absolutePath) {
  return toPosix(path.relative(resolverDir, absolutePath));
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

function toSources(resolverDir, absolutePaths) {
  return absolutePaths.map((absolutePath) => ({
    $ref: toResolverRef(resolverDir, absolutePath)
  }));
}

function contextRawSetName(context) {
  return `${context}Raw`;
}

function contextSemanticsSetName(context) {
  return `${context}Semantics`;
}

function contextThemesSetName(context) {
  return `${context}Themes`;
}

function contextComponentsSetName(context) {
  return `${context}Components`;
}

function contextThemeModifierName(context) {
  return `${context}Theme`;
}

function contextLabel(context) {
  return `${context[0].toUpperCase()}${context.slice(1)}`;
}

export function listPrimitiveFiles(repoRoot) {
  return listJsonFiles(path.join(repoRoot, 'tokens', 'primitives'));
}

export function listContextInventory(repoRoot, context) {
  const contextDir = path.join(repoRoot, 'tokens', 'contexts', context);
  const raw = listJsonFiles(path.join(contextDir, 'raw'));
  const semantics = listJsonFilesRecursive(path.join(contextDir, 'semantics'));
  const themes = listJsonFiles(path.join(contextDir, 'themes'));
  const componentsPath = path.join(contextDir, 'components.json');
  const components = fs.existsSync(componentsPath) ? [componentsPath] : [];

  return { raw, semantics, themes, components };
}

export function buildContextCoreResolver({ repoRoot, resolverDir, context }) {
  const label = contextLabel(context);
  const primitives = listPrimitiveFiles(repoRoot);
  const inventory = listContextInventory(repoRoot, context);
  const modifierName = contextThemeModifierName(context);
  const themeContexts = Object.fromEntries(
    inventory.themes.map((themePath) => {
      const themeName = path.basename(themePath, '.json');
      return [themeName, [{ $ref: toResolverRef(resolverDir, themePath) }]];
    })
  );

  const sets = {
    primitives: {
      description: 'Design token primitives shared across contexts.',
      sources: toSources(resolverDir, primitives)
    },
    [contextRawSetName(context)]: {
      description: `${label} raw aliases to primitives.`,
      sources: toSources(resolverDir, inventory.raw)
    },
    [contextSemanticsSetName(context)]: {
      description: `${label} semantic tokens.`,
      sources: toSources(resolverDir, inventory.semantics)
    },
    [contextComponentsSetName(context)]: {
      description: `${label} component contract tokens.`,
      sources: toSources(resolverDir, inventory.components)
    }
  };

  const resolutionOrder = [
    { $ref: '#/sets/primitives' },
    { $ref: `#/sets/${contextRawSetName(context)}` },
    { $ref: `#/sets/${contextSemanticsSetName(context)}` }
  ];

  if (Object.keys(themeContexts).length > 0) {
    const modifiers = {
      [modifierName]: {
        description: `${label} theme selection.`,
        contexts: themeContexts,
        default: themeContexts.default ? 'default' : Object.keys(themeContexts)[0]
      }
    };
    resolutionOrder.push({ $ref: `#/modifiers/${modifierName}` });
    resolutionOrder.push({ $ref: `#/sets/${contextComponentsSetName(context)}` });

    return {
      $schema: 'https://www.designtokens.org/schemas/2025.10/resolver.json',
      name: `Envy UI ${label} Core Resolver`,
      version: '2025.10',
      description: `Phase 4 resolver for ${context} context. Mirrors current filesystem inventory and ordering.`,
      sets,
      modifiers,
      resolutionOrder
    };
  }

  resolutionOrder.push({ $ref: `#/sets/${contextComponentsSetName(context)}` });
  return {
    $schema: 'https://www.designtokens.org/schemas/2025.10/resolver.json',
    name: `Envy UI ${label} Core Resolver`,
    version: '2025.10',
    description: `Phase 4 resolver for ${context} context. Mirrors current filesystem inventory and ordering.`,
    sets,
    resolutionOrder
  };
}

export function buildStorybookResolver({ repoRoot, resolverDir, contexts = SUPPORTED_CONTEXTS }) {
  const primitives = listPrimitiveFiles(repoRoot);
  const sets = {
    primitives: {
      description: 'Design token primitives shared across contexts.',
      sources: toSources(resolverDir, primitives)
    }
  };
  const resolutionOrder = [{ $ref: '#/sets/primitives' }];

  contexts.forEach((context) => {
    const inventory = listContextInventory(repoRoot, context);
    const rawSet = contextRawSetName(context);
    const semanticsSet = contextSemanticsSetName(context);
    const themesSet = contextThemesSetName(context);
    const componentsSet = contextComponentsSetName(context);

    sets[rawSet] = {
      description: `${contextLabel(context)} raw aliases to primitives.`,
      sources: toSources(resolverDir, inventory.raw)
    };
    sets[semanticsSet] = {
      description: `${contextLabel(context)} semantic tokens.`,
      sources: toSources(resolverDir, inventory.semantics)
    };
    sets[themesSet] = {
      description: `${contextLabel(context)} theme token files included for multi-theme Storybook docs.`,
      sources: toSources(resolverDir, inventory.themes)
    };
    sets[componentsSet] = {
      description: `${contextLabel(context)} component contract tokens.`,
      sources: toSources(resolverDir, inventory.components)
    };

    resolutionOrder.push(
      { $ref: `#/sets/${rawSet}` },
      { $ref: `#/sets/${semanticsSet}` },
      { $ref: `#/sets/${themesSet}` },
      { $ref: `#/sets/${componentsSet}` }
    );
  });

  return {
    $schema: 'https://www.designtokens.org/schemas/2025.10/resolver.json',
    name: 'Envy UI Storybook Resolver',
    version: '2025.10',
    description:
      'Phase 4 resolver for Storybook aggregation. Includes all discovered context files in deterministic order.',
    sets,
    resolutionOrder
  };
}
