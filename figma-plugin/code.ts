import uiHtml from './ui.html';
import { applicatorHandleMessage } from './applicator';

interface AdapterVariable {
  path: string;
  type: 'COLOR';
  value: string;
}

interface AdapterCollection {
  name: string;
  mode?: string;
  variables: AdapterVariable[];
}

interface AdapterPayload {
  system?: {
    id?: string;
    version?: string;
  };
  collections: AdapterCollection[];
}

interface ImportResult {
  summary: ImportSummary;
  debug: {
    collections: { name: string; id: string }[];
    colorVariablesCount: number;
  };
}

interface ImportSummary {
  totals: {
    collectionsToCreate: number;
    collectionsToReuse: number;
    variablesToCreate: number;
    variablesToUpdate: number;
  };
  collections: Array<{
    name: string;
    action: 'create' | 'reuse';
    variables: {
      create: number;
      update: number;
    };
  }>;
}

interface ExistingData {
  collectionsByName: Map<string, VariableCollection>;
  variablesByCollectionId: Map<string, Map<string, Variable>>;
}

figma.showUI(uiHtml, { width: 420, height: 520 });

figma.ui.onmessage = async (message) => {
  if (message.type === 'prepare-import') {
    try {
      const summary = calculateImportSummary(message.payload as AdapterPayload);
      figma.ui.postMessage({ type: 'import-summary', payload: summary });
    } catch (error) {
      figma.ui.postMessage({ type: 'import-error', payload: formatError(error) });
    }
  } else if (message.type === 'execute-import') {
    try {
      const payload = message.payload as AdapterPayload;
      const result = await importCollections(payload);
      figma.ui.postMessage({ type: 'import-complete', payload: result });
      figma.closePlugin();
    } catch (error) {
      figma.ui.postMessage({ type: 'import-error', payload: formatError(error) });
    }
  } else if (message.type === 'generate-structures') {
    try {
      await generateButtonStructure(message.payload);
      figma.ui.postMessage({ type: 'structures-complete' });
    } catch (error) {
      figma.ui.postMessage({ type: 'structures-error', payload: formatError(error) });
    }
  } else if (['request-selection', 'save-mapping', 'preview-mapping'].includes(message.type)) {
    applicatorHandleMessage(message);
  } else if (message.type === 'close-plugin') {
    figma.closePlugin();
  }
};

function calculateImportSummary(payload: AdapterPayload): ImportSummary {
  if (!payload || !payload.collections || !payload.collections.length) {
    throw new Error('No collections found in adapter payload.');
  }

  if (!figma.variables) {
    throw new Error('Figma Variables API not available.');
  }

  const existingData = gatherExistingData(figma.variables);
  return computeImportSummary(payload, existingData);
}

async function importCollections(payload: AdapterPayload): Promise<ImportResult> {
  if (!payload || !payload.collections || !payload.collections.length) {
    throw new Error('No collections found in adapter payload.');
  }

  if (!figma.variables) {
    throw new Error('Figma Variables API not available.');
  }

  const existingData = gatherExistingData(figma.variables);
  const summary = computeImportSummary(payload, existingData);

  for (const collectionData of payload.collections) {
    if (!collectionData || !collectionData.name || !collectionData.variables || !collectionData.variables.length) {
      continue;
    }

    console.log('Importing collection:', collectionData.name);
    console.log('Variables count:', collectionData.variables.length);

    let collection =
      existingData.collectionsByName.get(collectionData.name) ??
      figma.variables.createVariableCollection(collectionData.name);

    existingData.collectionsByName.set(collectionData.name, collection);

    if (collection.modes && collection.modes.length > 0) {
      const firstMode = collection.modes[0];
      firstMode.name = collectionData.mode || 'Default';
    }

    let variableMap = existingData.variablesByCollectionId.get(collection.id);
    if (!variableMap) {
      variableMap = new Map();
      existingData.variablesByCollectionId.set(collection.id, variableMap);
    }

    for (const variableData of collectionData.variables) {
      if (
        !variableData ||
        !variableData.path ||
        variableData.type !== 'COLOR' ||
        typeof variableData.value !== 'string'
      ) {
        continue;
      }

      const variableName = normalizeVariableName(variableData.path);
      const existingVariable = variableMap.get(variableName);

      if (existingVariable) {
        existingVariable.description = variableData.path;
        existingVariable.setValueForMode(collection.defaultModeId, hexToPaint(variableData.value));
        continue;
      }

      let variable: Variable;
      try {
        variable = figma.variables.createVariable(variableName, collection, 'COLOR');
      } catch (error) {
        throw new Error(`createVariable failed for ${variableName}: ${String(error)}`);
      }

      variable.description = variableData.path;
      variable.setValueForMode(collection.defaultModeId, hexToPaint(variableData.value));
      variableMap.set(variableName, variable);
    }
  }

  const localCollections = figma.variables.getLocalVariableCollections();
  const localColors = figma.variables.getLocalVariables('COLOR');

  console.log(
    'Local collections:',
    localCollections.map((collectionEntry) => ({ name: collectionEntry.name, id: collectionEntry.id }))
  );
  console.log('Local color variables count:', localColors.length);

  figma.notify('Figma variables imported', { timeout: 1200 });

  return {
    summary,
    debug: {
      collections: localCollections.map((collectionEntry) => ({ name: collectionEntry.name, id: collectionEntry.id })),
      colorVariablesCount: localColors.length
    }
  };
}

function computeImportSummary(payload: AdapterPayload, existingData: ExistingData): ImportSummary {
  const summary: ImportSummary = {
    totals: {
      collectionsToCreate: 0,
      collectionsToReuse: 0,
      variablesToCreate: 0,
      variablesToUpdate: 0
    },
    collections: []
  };

  for (const collectionData of payload.collections) {
    if (!collectionData || !collectionData.name || !collectionData.variables || !collectionData.variables.length) {
      continue;
    }

    const existingCollection = existingData.collectionsByName.get(collectionData.name);
    const action: 'create' | 'reuse' = existingCollection ? 'reuse' : 'create';
    const variableMap = existingCollection ? existingData.variablesByCollectionId.get(existingCollection.id) : undefined;

    let createCount = 0;
    let updateCount = 0;

    for (const variableData of collectionData.variables) {
      if (!variableData || !variableData.path || variableData.type !== 'COLOR') {
        continue;
      }

      const variableName = normalizeVariableName(variableData.path);
      if (action === 'reuse' && variableMap && variableMap.has(variableName)) {
        updateCount += 1;
      } else {
        createCount += 1;
      }
    }

    summary.collections.push({
      name: collectionData.name,
      action,
      variables: {
        create: createCount,
        update: updateCount
      }
    });

    if (action === 'create') {
      summary.totals.collectionsToCreate += 1;
    } else {
      summary.totals.collectionsToReuse += 1;
    }

    summary.totals.variablesToCreate += createCount;
    summary.totals.variablesToUpdate += updateCount;
  }

  return summary;
}

function gatherExistingData(api: VariablesAPI): ExistingData {
  const collections = api.getLocalVariableCollections();
  const collectionMap = new Map(collections.map((collectionEntry) => [collectionEntry.name, collectionEntry]));

  const variables = api.getLocalVariables('COLOR');
  const variablesMap = new Map<string, Map<string, Variable>>();
  for (const variable of variables) {
    const collectionId = variable.variableCollectionId;
    if (!variablesMap.has(collectionId)) {
      variablesMap.set(collectionId, new Map());
    }
    variablesMap.get(collectionId)!.set(variable.name, variable);
  }

  return {
    collectionsByName: collectionMap,
    variablesByCollectionId: variablesMap
  };
}

function normalizeVariableName(path: string): string {
  return path.replace(/\./g, '/');
}

function hexToPaint(value: string): RGBA {
  const normalized = value.trim().replace('#', '');
  if (![3, 6, 8].includes(normalized.length)) {
    throw new Error(`Unsupported color value: ${value}`);
  }

  const fullHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized.padEnd(8, 'F');

  const r = parseInt(fullHex.slice(0, 2), 16) / 255;
  const g = parseInt(fullHex.slice(2, 4), 16) / 255;
  const b = parseInt(fullHex.slice(4, 6), 16) / 255;
  const a = parseInt(fullHex.slice(6, 8), 16) / 255;

  return { r, g, b, a };
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error importing variables';
}

async function generateButtonStructure(payload: any) {
  const buttonTokens = payload?.ui?.button;
  if (!buttonTokens) {
    throw new Error('No ui.button data found in structures payload.');
  }
  const page = getOrCreatePage('Generated / Structures');
  figma.currentPage = page;
  await ensureTextFont();

  const rootFrame = figma.createFrame();
  rootFrame.name = 'ui.button';
  rootFrame.layoutMode = 'VERTICAL';
  rootFrame.itemSpacing = 12;
  rootFrame.paddingLeft = 12;
  rootFrame.paddingRight = 12;
  rootFrame.paddingTop = 12;
  rootFrame.paddingBottom = 12;
  rootFrame.counterAxisSizingMode = 'AUTO';
  rootFrame.primaryAxisSizingMode = 'AUTO';

  const groups = Object.entries(buttonTokens).filter(([key, value]) => value && typeof value === 'object');
  for (const [groupKey, groupValue] of groups) {
    const groupFrame = figma.createFrame();
    groupFrame.name = `ui.button.${groupKey}`;
    groupFrame.layoutMode = 'VERTICAL';
    groupFrame.itemSpacing = 8;
    groupFrame.paddingLeft = 8;
    groupFrame.paddingRight = 8;
    groupFrame.paddingTop = 8;
    groupFrame.paddingBottom = 8;
    groupFrame.counterAxisSizingMode = 'AUTO';
    groupFrame.primaryAxisSizingMode = 'AUTO';
    await renderTokenTree(groupFrame, groupValue as any, [`ui`, `button`, groupKey]);
    rootFrame.appendChild(groupFrame);
  }

  page.appendChild(rootFrame);
  rootFrame.x = 40;
  rootFrame.y = 40;
}

async function renderTokenTree(container: FrameNode, node: any, path: string[]) {
  if (!node || typeof node !== 'object') return;
  if ('$value' in node && '$type' in node) {
    const tokenName = path.join('.');
    if (node.$type === 'color') {
      const rect = figma.createRectangle();
      rect.name = tokenName;
      rect.resize(120, 32);
      rect.fills = [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.7 } }];
      container.appendChild(rect);
    } else {
      const text = figma.createText();
      text.name = tokenName;
      text.characters = `${tokenName}\n${String(node.$value)}`;
      text.fontSize = 12;
      container.appendChild(text);
    }
    return;
  }

  for (const [key, value] of Object.entries(node)) {
    if (!value || typeof value !== 'object') continue;
    await renderTokenTree(container, value, [...path, key]);
  }
}

let textFontLoaded = false;
async function ensureTextFont() {
  if (textFontLoaded) return;
  try {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    textFontLoaded = true;
  } catch {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
    textFontLoaded = true;
  }
}

function getOrCreatePage(name: string): PageNode {
  const existing = figma.root.children.find((page) => page.name === name);
  if (existing && existing.type === 'PAGE') return existing;
  const page = figma.createPage();
  page.name = name;
  return page;
}
