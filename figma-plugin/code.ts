import uiHtml from './ui.html';

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
