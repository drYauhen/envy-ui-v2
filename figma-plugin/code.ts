import uiHtml from './ui.html';
import { applicatorHandleMessage } from './applicator';

interface AdapterVariable {
  path: string;
  type: 'COLOR' | 'FLOAT';
  value?: string | number | RGBA; // Old format: single value (can be RGB object for colors)
  valuesByMode?: Record<string, string | number | RGBA>; // New format: values per mode (can be RGB objects for colors)
}

interface AdapterCollection {
  name: string;
  mode?: string; // Old format: single mode
  modes?: string[]; // New format: array of modes
  variables: AdapterVariable[];
}

interface AdapterPayload {
  system?: {
    id?: string;
    version?: string;
    context?: string; // Context identifier: 'app', 'website', 'report', or undefined (general)
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
    modesToCreate?: number;
  };
  collections: Array<{
    name: string;
    action: 'create' | 'reuse';
    variables: {
      create: number;
      update: number;
    };
    modes?: string[];
  }>;
}

interface ExistingData {
  collectionsByName: Map<string, VariableCollection>;
  variablesByCollectionId: Map<string, Map<string, Variable>>;
}

interface SnapshotVariable {
  id: string;
  name: string;
  path: string; // Из description или name
  collection: string;
  collectionId: string;
  type: 'COLOR' | 'FLOAT';
  valuesByMode: Record<string, any>;
  usages: Array<{
    nodeId: string;
    nodeName: string;
    nodeType: string;
    property: string;
    index?: number;
  }>;
}

interface SnapshotCollection {
  id: string;
  name: string;
  modes: Array<{ id: string; name: string }>;
}

interface SnapshotPayload {
  timestamp: string;
  version: string;
  collections: SnapshotCollection[];
  variables: SnapshotVariable[];
  summary: {
    totalCollections: number;
    totalVariables: number;
    totalUsages: number;
    variablesWithUsages: number;
  };
}

interface RestoreSummary {
  collections: {
    create: number;
    update: number;
    reuse: number;
  };
  variables: {
    create: number;
    update: number;
    delete: number; // Variables в Figma, которых нет в snapshot
  };
  bindings: {
    restore: number;
    skipped: number; // Ноды не найдены
  };
  warnings: string[];
}

interface RestoreResult {
  summary: RestoreSummary;
  debug: {
    collectionsCreated: number;
    variablesCreated: number;
    bindingsRestored: number;
    bindingsSkipped: number;
  };
}

interface MigrationFile {
  version: string;
  timestamp: string;
  snapshot: string;
  snapshotTimestamp: string;
  summary: {
    totalChanges: number;
    deleted: number;
    moved: number;
    added: number;
    totalUsagesAffected: number;
  };
  mappings: any[];
  deleted: Array<{
    old: {
      path: string;
      collection: string;
      variableId: string;
      name: string;
      type: string;
    };
    fallback: {
      path: string;
      collection: string;
      reason: string;
    } | null;
    usages: number;
    action: string;
    requiresManualReview: boolean;
  }>;
  moved: Array<{
    path: string;
    oldCollection: string;
    newCollection: string;
    usages: number;
    action: string;
  }>;
}

interface MigrationSummary {
  totalChanges: number;
  deleted: number;
  moved: number;
  totalUsagesAffected: number;
  requiresReview: number;
}

interface MigrationResult {
  summary: MigrationSummary;
  debug: {
    variablesReplaced: number;
    bindingsUpdated: number;
    bindingsSkipped: number;
    variablesMoved: number;
  };
}

figma.showUI(uiHtml, { width: 520, height: 520 });
figma.ui.postMessage({ type: 'PLUGIN_RELOADED', payload: { timestamp: formatReloadTimestamp(new Date()) } });

figma.ui.onmessage = async (message) => {
  console.log('[code.ts][onmessage]', message.type);
  if (message.type === 'prepare-import') {
    try {
      const payload = message.payload as AdapterPayload;
      
      // Validate context match
      const existingContext = detectExistingContext();
      const importContext = payload.system?.context;
      
      if (existingContext && importContext && existingContext !== importContext) {
        figma.ui.postMessage({ 
          type: 'import-error', 
          payload: `Context mismatch! This Figma file contains "${existingContext}" context variables, but you're trying to import "${importContext}" context. Please use the correct JSON file for this context.` 
        });
        return;
      }
      
      // Warning if importing general file into context-specific file
      if (existingContext && !importContext) {
        figma.ui.postMessage({ 
          type: 'import-warning', 
          payload: `Warning: This Figma file contains "${existingContext}" context variables, but you're importing a general file without context. This may cause conflicts.` 
        });
      }
      
      const summary = calculateImportSummary(payload);
      figma.ui.postMessage({ type: 'import-summary', payload: summary });
    } catch (error) {
      figma.ui.postMessage({ type: 'import-error', payload: formatError(error) });
    }
  } else if (message.type === 'execute-import') {
    try {
      const payload = message.payload as AdapterPayload;
      const defaultMode = (message as any).defaultMode as string | null;
      const result = await importCollections(payload, defaultMode);
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
  } else if (['request-selection', 'save-mapping', 'preview-mapping', 'expand-variants'].includes(message.type)) {
    applicatorHandleMessage(message);
  } else if (message.type === 'export-snapshot') {
    try {
      const snapshot = await exportSnapshot();
      figma.ui.postMessage({ type: 'snapshot-ready', payload: snapshot });
    } catch (error) {
      figma.ui.postMessage({ type: 'snapshot-error', payload: formatError(error) });
    }
  } else if (message.type === 'prepare-restore') {
    try {
      const snapshot = message.payload as SnapshotPayload;
      const summary = calculateRestoreSummary(snapshot);
      figma.ui.postMessage({ type: 'restore-summary', payload: summary });
    } catch (error) {
      figma.ui.postMessage({ type: 'restore-error', payload: formatError(error) });
    }
  } else if (message.type === 'execute-restore') {
    try {
      const snapshot = message.payload as SnapshotPayload;
      const result = await restoreFromSnapshot(snapshot);
      figma.ui.postMessage({ type: 'restore-complete', payload: result });
      figma.closePlugin();
    } catch (error) {
      figma.ui.postMessage({ type: 'restore-error', payload: formatError(error) });
    }
  } else if (message.type === 'prepare-migration') {
    try {
      const migration = message.payload as MigrationFile;
      const summary = calculateMigrationSummary(migration);
      figma.ui.postMessage({ type: 'migration-summary', payload: summary });
    } catch (error) {
      figma.ui.postMessage({ type: 'migration-error', payload: formatError(error) });
    }
  } else if (message.type === 'execute-migration') {
    try {
      const migration = message.payload as MigrationFile;
      const result = await applyMigration(migration);
      figma.ui.postMessage({ type: 'migration-complete', payload: result });
      figma.closePlugin();
    } catch (error) {
      figma.ui.postMessage({ type: 'migration-error', payload: formatError(error) });
    }
  } else if (message.type === 'request-timestamp') {
    figma.ui.postMessage({ type: 'PLUGIN_RELOADED', payload: { timestamp: formatReloadTimestamp(new Date()) } });
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

async function importCollections(payload: AdapterPayload, defaultMode: string | null = null): Promise<ImportResult> {
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

    // Handle modes: support both old format (mode) and new format (modes[])
    let modesToCreate = collectionData.modes || (collectionData.mode ? [collectionData.mode] : ['default']);
    
    // Если указан дефолтный мод, переупорядочить массив так, чтобы он был первым
    if (defaultMode && modesToCreate.includes(defaultMode)) {
      modesToCreate = [defaultMode, ...modesToCreate.filter(m => m !== defaultMode)];
    }
    
    // Create or update modes in collection
    const modeMap = new Map<string, { modeId: string; name: string }>();
    for (const modeName of modesToCreate) {
      // Find existing mode with this name
      let mode = collection.modes.find(m => m.name === modeName);
      if (!mode) {
        // Create new mode
        mode = collection.addMode(modeName) as unknown as { modeId: string; name: string };
      }
      if (mode) {
        modeMap.set(modeName, mode);
      }
    }
    
    // If collection has no modes yet, ensure at least one exists
    if (collection.modes.length === 0 && modesToCreate.length > 0) {
      const firstMode = collection.addMode(modesToCreate[0]) as unknown as { modeId: string; name: string };
      modeMap.set(modesToCreate[0], firstMode);
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
        !['COLOR', 'FLOAT'].includes(variableData.type)
      ) {
        continue;
      }

      const variableName = normalizeVariableName(variableData.path);
      const existingVariable = variableMap.get(variableName);

      const isColor = variableData.type === 'COLOR';
      const targetType: VariableResolvedDataType = isColor ? 'COLOR' : 'FLOAT';

      // Support both old format (value) and new format (valuesByMode)
      const valuesByMode = variableData.valuesByMode || 
        (variableData.value !== undefined ? { [modesToCreate[0] || 'default']: variableData.value } : {});

      if (Object.keys(valuesByMode).length === 0) {
        continue;
      }

      // Create variable if it doesn't exist
      let variable: Variable;
      if (existingVariable) {
        variable = existingVariable;
        variable.description = variableData.path;
      } else {
        try {
          variable = figma.variables.createVariable(variableName, collection, targetType);
          variable.description = variableData.path;
          variableMap.set(variableName, variable);
        } catch (error) {
          throw new Error(`createVariable failed for ${variableName}: ${String(error)}`);
        }
      }

      // Set values for each mode
      for (const [modeName, rawValue] of Object.entries(valuesByMode)) {
        const mode = modeMap.get(modeName);
        if (!mode) {
          console.warn(`Mode "${modeName}" not found in collection "${collectionData.name}", skipping value for variable "${variableData.path}"`);
          continue;
        }

        try {
          let value: RGBA | number;
          if (isColor) {
            // Check if value is already an RGB object (from Style Dictionary conversion)
            if (typeof rawValue === 'object' && rawValue !== null && 'r' in rawValue && 'g' in rawValue && 'b' in rawValue) {
              // Already converted to RGB by Style Dictionary
              // Explicitly create RGBA object to ensure correct format for Figma API
              // JSON parsing may return values as numbers or strings, so we normalize them
              const r = typeof rawValue.r === 'number' ? rawValue.r : parseFloat(String(rawValue.r));
              const g = typeof rawValue.g === 'number' ? rawValue.g : parseFloat(String(rawValue.g));
              const b = typeof rawValue.b === 'number' ? rawValue.b : parseFloat(String(rawValue.b));
              const a = rawValue.a !== undefined 
                ? (typeof rawValue.a === 'number' ? rawValue.a : parseFloat(String(rawValue.a)))
                : 1;
              
              // Ensure values are in [0, 1] range
              value = {
                r: Math.max(0, Math.min(1, r)),
                g: Math.max(0, Math.min(1, g)),
                b: Math.max(0, Math.min(1, b)),
                a: Math.max(0, Math.min(1, a))
              };
              
              // Debug logging (can be removed after testing)
              if (variableData.path.includes('error') || variableData.path.includes('brand')) {
                console.log(`Setting color for ${variableData.path} in mode ${modeName}:`, value);
              }
            } else if (typeof rawValue === 'string') {
              // Fallback: convert from string (OKLCH, HEX, RGB string)
              value = convertColorToRGB(rawValue);
            } else {
              console.warn(`Invalid color value for variable "${variableData.path}" in mode "${modeName}": ${rawValue}`);
              continue;
            }
          } else {
            if (typeof rawValue === 'number') {
              value = rawValue;
            } else if (typeof rawValue === 'string') {
              const parsed = parseFloat(rawValue);
              if (isNaN(parsed)) {
                console.warn(`Invalid numeric value for variable "${variableData.path}" in mode "${modeName}": ${rawValue}`);
                continue;
              }
              value = parsed;
            } else {
              console.warn(`Invalid value type for variable "${variableData.path}" in mode "${modeName}": ${typeof rawValue}`);
              continue;
            }
          }

          variable.setValueForMode(mode.modeId, value as any);
        } catch (error) {
          console.warn(`Failed to set value for variable "${variableData.path}" in mode "${modeName}":`, error);
          // Continue with other modes instead of failing completely
        }
      }
    }
  }

  const localCollections = figma.variables.getLocalVariableCollections();
  const localColors = figma.variables.getLocalVariables();

  console.log(
    'Local collections:',
    localCollections.map((collectionEntry) => ({ name: collectionEntry.name, id: collectionEntry.id }))
  );
  console.log('Local variables count:', localColors.length);

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
      variablesToUpdate: 0,
      modesToCreate: 0
    },
    collections: []
  };

  const allModes = new Set<string>();

  for (const collectionData of payload.collections) {
    if (!collectionData || !collectionData.name || !collectionData.variables || !collectionData.variables.length) {
      continue;
    }

    const existingCollection = existingData.collectionsByName.get(collectionData.name);
    const action: 'create' | 'reuse' = existingCollection ? 'reuse' : 'create';
    const variableMap = existingCollection ? existingData.variablesByCollectionId.get(existingCollection.id) : undefined;

    // Collect modes from this collection
    const modes = collectionData.modes || (collectionData.mode ? [collectionData.mode] : ['default']);
    modes.forEach(mode => allModes.add(mode));

    let createCount = 0;
    let updateCount = 0;

    for (const variableData of collectionData.variables) {
      if (!variableData || !variableData.path || !['COLOR', 'FLOAT'].includes(variableData.type)) {
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
      },
      modes: modes
    });

    if (action === 'create') {
      summary.totals.collectionsToCreate += 1;
    } else {
      summary.totals.collectionsToReuse += 1;
    }

    summary.totals.variablesToCreate += createCount;
    summary.totals.variablesToUpdate += updateCount;
  }

  // Count unique modes that need to be created
  summary.totals.modesToCreate = allModes.size;

  return summary;
}

function gatherExistingData(api: VariablesAPI): ExistingData {
  const collections = api.getLocalVariableCollections();
  const collectionMap = new Map(collections.map((collectionEntry) => [collectionEntry.name, collectionEntry]));

  const variables = api.getLocalVariables();
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

/**
 * Detects the context of existing Variables in Figma by analyzing mode names
 * Returns the context if all modes belong to the same context, null otherwise
 */
function detectExistingContext(): string | null {
  if (!figma.variables) return null;
  
  const collections = figma.variables.getLocalVariableCollections();
  const allModes = new Set<string>();
  
  collections.forEach(collection => {
    collection.modes.forEach(mode => {
      allModes.add(mode.name);
    });
  });
  
  if (allModes.size === 0) return null;
  
  // Extract context prefixes from mode names (e.g., "app-default" -> "app")
  const contexts = new Set<string>();
  allModes.forEach(mode => {
    const match = mode.match(/^([^-]+)-/);
    if (match) {
      contexts.add(match[1]);
    }
  });
  
  // If all modes are from the same context, return it
  if (contexts.size === 1) {
    return Array.from(contexts)[0];
  }
  
  // If mixed contexts or no prefix - return null (general/legacy file)
  return null;
}

function normalizeVariableName(path: string): string {
  return path.replace(/\./g, '/');
}

async function exportSnapshot(): Promise<SnapshotPayload> {
  if (!figma.variables) {
    throw new Error('Figma Variables API not available.');
  }

  const collections = figma.variables.getLocalVariableCollections();
  const variables = figma.variables.getLocalVariables();
  const allPages = figma.root.children.filter(p => p.type === 'PAGE') as PageNode[];
  
  // Найти все bindings для каждой переменной
  const variableUsages = new Map<string, Array<{
    nodeId: string;
    nodeName: string;
    nodeType: string;
    property: string;
    index?: number;
  }>>();
  
  // Собрать все ноды из всех страниц
  const allNodes: SceneNode[] = [];
  for (const page of allPages) {
    allNodes.push(...findAllNodesInPage(page));
  }
  
  // Найти все bindings
  for (const node of allNodes) {
    const bindings = detectVariableBindingsForSnapshot([node]);
    for (const binding of bindings) {
      if (!variableUsages.has(binding.variableId)) {
        variableUsages.set(binding.variableId, []);
      }
      variableUsages.get(binding.variableId)!.push({
        nodeId: binding.targetNodeId,
        nodeName: node.name,
        nodeType: node.type,
        property: binding.property,
        index: binding.index
      });
    }
  }
  
  // Собрать snapshot данных
  const snapshotVariables: SnapshotVariable[] = [];
  let totalUsages = 0;
  
  for (const variable of variables) {
    const collection = collections.find(c => c.id === variable.variableCollectionId);
    if (!collection) continue;
    
    // Получить path из description или из name
    const path = variable.description || variable.name.replace(/\//g, '.');
    
    // Получить значения для всех modes
    const valuesByMode: Record<string, any> = {};
    for (const mode of collection.modes) {
      const value = variable.valuesByMode[mode.modeId];
      if (value !== undefined) {
        // Сохранить значение как есть (RGB объект или число)
        valuesByMode[mode.name] = value;
      }
    }
    
    const usages = variableUsages.get(variable.id) || [];
    totalUsages += usages.length;
    
    snapshotVariables.push({
      id: variable.id,
      name: variable.name,
      path,
      collection: collection.name,
      collectionId: collection.id,
      type: variable.resolvedType,
      valuesByMode,
      usages
    });
  }
  
  const snapshot: SnapshotPayload = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    collections: collections.map(c => ({
      id: c.id,
      name: c.name,
      modes: c.modes.map(m => ({ id: m.modeId, name: m.name }))
    })),
    variables: snapshotVariables,
    summary: {
      totalCollections: collections.length,
      totalVariables: variables.length,
      totalUsages,
      variablesWithUsages: snapshotVariables.filter(v => v.usages.length > 0).length
    }
  };
  
  return snapshot;
}

// Вспомогательная функция для поиска всех нод на странице
function findAllNodesInPage(page: PageNode): SceneNode[] {
  const result: SceneNode[] = [];
  const walk = (node: SceneNode) => {
    result.push(node);
    if ('children' in node && Array.isArray((node as any).children)) {
      for (const child of (node as any).children as SceneNode[]) {
        walk(child);
      }
    }
  };
  walk(page);
  return result;
}

// Упрощенная версия detectVariableBindings для snapshot
function detectVariableBindingsForSnapshot(nodes: SceneNode[]): Array<{
  variableId: string;
  targetNodeId: string;
  property: string;
  index?: number;
}> {
  if (!figma.variables) return [];
  const bindings: Array<{
    variableId: string;
    targetNodeId: string;
    property: string;
    index?: number;
  }> = [];

  for (const node of nodes) {
    const boundVars = (node as any).boundVariables || {};
    
    // Проверить fills/strokes
    ['fills', 'strokes'].forEach(prop => {
      const entries = boundVars[prop];
      if (Array.isArray(entries)) {
        entries.forEach((entry, index) => {
          if (entry?.type === 'VARIABLE_ALIAS') {
            bindings.push({
              variableId: entry.id,
              targetNodeId: node.id,
              property: prop,
              index
            });
          }
        });
      }
    });
    
    // Проверить numeric properties
    const numericProps = ['strokeWeight', 'cornerRadius', 'width', 'height', 
                         'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'];
    numericProps.forEach(prop => {
      const varEntry = boundVars[prop];
      const varId = typeof varEntry === 'string' ? varEntry : varEntry?.id;
      if (varId) {
        bindings.push({
          variableId: varId,
          targetNodeId: node.id,
          property: prop
        });
      }
    });
  }
  
  return bindings;
}

function calculateRestoreSummary(snapshot: SnapshotPayload): RestoreSummary {
  if (!figma.variables) {
    throw new Error('Figma Variables API not available.');
  }

  const existingCollections = figma.variables.getLocalVariableCollections();
  const existingVariables = figma.variables.getLocalVariables();
  const existingData = gatherExistingData({ getLocalVariableCollections: () => existingCollections, getLocalVariables: () => existingVariables } as VariablesAPI);

  // Анализ Collections
  const collectionsToCreate: string[] = [];
  const collectionsToUpdate: string[] = [];
  const collectionsToReuse: string[] = [];

  for (const snapshotCollection of snapshot.collections) {
    const existing = existingData.collectionsByName.get(snapshotCollection.name);
    if (!existing) {
      collectionsToCreate.push(snapshotCollection.name);
    } else {
      // Проверить, нужно ли обновить modes
      const existingModes = existing.modes.map(m => m.name).sort();
      const snapshotModes = snapshotCollection.modes.map(m => m.name).sort();
      if (JSON.stringify(existingModes) !== JSON.stringify(snapshotModes)) {
        collectionsToUpdate.push(snapshotCollection.name);
      } else {
        collectionsToReuse.push(snapshotCollection.name);
      }
    }
  }

  // Анализ Variables
  const variablesToCreate: string[] = [];
  const variablesToUpdate: string[] = [];
  const variablesToDelete: string[] = [];

  // Создать map существующих переменных по path
  const existingVarsByPath = new Map<string, Variable>();
  for (const variable of existingVariables) {
    const path = variable.description || variable.name.replace(/\//g, '.');
    existingVarsByPath.set(path, variable);
  }

  // Проверить переменные из snapshot
  for (const snapshotVar of snapshot.variables) {
    const existing = existingVarsByPath.get(snapshotVar.path);
    if (!existing) {
      variablesToCreate.push(snapshotVar.path);
    } else {
      // Проверить, нужно ли обновить значения
      const collection = existingCollections.find(c => c.id === existing.variableCollectionId);
      if (collection) {
        let needsUpdate = false;
        for (const mode of collection.modes) {
          const snapshotValue = snapshotVar.valuesByMode[mode.name];
          const existingValue = existing.valuesByMode[mode.modeId];
          if (JSON.stringify(snapshotValue) !== JSON.stringify(existingValue)) {
            needsUpdate = true;
            break;
          }
        }
        if (needsUpdate) {
          variablesToUpdate.push(snapshotVar.path);
        }
      }
    }
  }

  // Найти переменные в Figma, которых нет в snapshot
  for (const [path, variable] of existingVarsByPath.entries()) {
    const inSnapshot = snapshot.variables.some(v => v.path === path);
    if (!inSnapshot) {
      variablesToDelete.push(path);
    }
  }

  // Анализ Bindings
  const allPages = figma.root.children.filter(p => p.type === 'PAGE') as PageNode[];
  const allNodes: SceneNode[] = [];
  for (const page of allPages) {
    allNodes.push(...findAllNodesInPage(page));
  }

  let bindingsToRestore = 0;
  let bindingsToSkip = 0;

  for (const snapshotVar of snapshot.variables) {
    if (snapshotVar.usages.length === 0) continue;

    // Проверить, существует ли переменная (или будет создана)
    const willExist = variablesToCreate.includes(snapshotVar.path) || 
                     variablesToUpdate.includes(snapshotVar.path) ||
                     existingVarsByPath.has(snapshotVar.path);

    if (willExist) {
      // Проверить, существуют ли ноды
      for (const usage of snapshotVar.usages) {
        try {
          const node = figma.getNodeById(usage.nodeId);
          if (node) {
            bindingsToRestore++;
          } else {
            bindingsToSkip++;
          }
        } catch {
          bindingsToSkip++;
        }
      }
    } else {
      bindingsToSkip += snapshotVar.usages.length;
    }
  }

  const warnings: string[] = [];
  if (variablesToDelete.length > 0) {
    warnings.push(`${variablesToDelete.length} variables will be deleted (not in snapshot)`);
  }
  if (bindingsToSkip > 0) {
    warnings.push(`${bindingsToSkip} bindings will be skipped (nodes not found)`);
  }

  return {
    collections: {
      create: collectionsToCreate.length,
      update: collectionsToUpdate.length,
      reuse: collectionsToReuse.length
    },
    variables: {
      create: variablesToCreate.length,
      update: variablesToUpdate.length,
      delete: variablesToDelete.length
    },
    bindings: {
      restore: bindingsToRestore,
      skipped: bindingsToSkip
    },
    warnings
  };
}

async function restoreFromSnapshot(snapshot: SnapshotPayload): Promise<RestoreResult> {
  if (!figma.variables) {
    throw new Error('Figma Variables API not available.');
  }

  const existingCollections = figma.variables.getLocalVariableCollections();
  const existingVariables = figma.variables.getLocalVariables();
  const existingData = gatherExistingData({ getLocalVariableCollections: () => existingCollections, getLocalVariables: () => existingVariables } as VariablesAPI);

  let collectionsCreated = 0;
  let variablesCreated = 0;
  let bindingsRestored = 0;
  let bindingsSkipped = 0;

  // 1. Создать/обновить Collections
  const collectionMap = new Map<string, VariableCollection>(); // snapshot name -> Figma collection

  for (const snapshotCollection of snapshot.collections) {
    let collection = existingData.collectionsByName.get(snapshotCollection.name);
    
    if (!collection) {
      // Создать новую коллекцию
      collection = figma.variables.createVariableCollection(snapshotCollection.name);
      collectionsCreated++;
    }

    // Обновить modes
    const existingModes = collection.modes.map(m => m.name);
    const snapshotModes = snapshotCollection.modes.map(m => m.name);

    // Добавить недостающие modes
    for (const snapshotMode of snapshotModes) {
      if (!existingModes.includes(snapshotMode)) {
        collection.addMode(snapshotMode);
      }
    }

    // Удалить лишние modes (опционально, можно пропустить для безопасности)
    // for (const existingMode of existingModes) {
    //   if (!snapshotModes.includes(existingMode)) {
    //     // Удаление mode может быть опасным, пропускаем
    //   }
    // }

    collectionMap.set(snapshotCollection.name, collection);
  }

  // 2. Создать/обновить Variables
  const variableMap = new Map<string, Variable>(); // snapshot path -> Figma variable

  for (const snapshotVar of snapshot.variables) {
    const collection = collectionMap.get(snapshotVar.collection);
    if (!collection) continue;

    // Найти существующую переменную по path
    const existingVar = existingVariables.find(v => {
      const path = v.description || v.name.replace(/\//g, '.');
      return path === snapshotVar.path;
    });

    let variable: Variable;

    if (existingVar) {
      variable = existingVar;
    } else {
      // Создать новую переменную
      const variableName = normalizeVariableName(snapshotVar.path);
      variable = figma.variables.createVariable(
        variableName,
        collection,
        snapshotVar.type
      );
      variable.description = snapshotVar.path; // Сохранить path в description
      variablesCreated++;
    }

    // Установить значения для всех modes
    for (const [modeName, value] of Object.entries(snapshotVar.valuesByMode)) {
      const mode = collection.modes.find(m => m.name === modeName);
      if (!mode) continue;

      try {
        if (snapshotVar.type === 'COLOR') {
          let colorValue: RGBA;
          if (typeof value === 'object' && 'r' in value && 'g' in value && 'b' in value) {
            colorValue = {
              r: value.r,
              g: value.g,
              b: value.b,
              a: value.a !== undefined ? value.a : 1
            };
          } else {
            continue; // Пропустить невалидные значения
          }
          variable.setValueForMode(mode.modeId, colorValue);
        } else {
          const numValue = typeof value === 'number' ? value : parseFloat(String(value));
          if (!isNaN(numValue)) {
            variable.setValueForMode(mode.modeId, numValue);
          }
        }
      } catch (error) {
        console.warn(`Failed to set value for ${snapshotVar.path} in mode ${modeName}:`, error);
      }
    }

    variableMap.set(snapshotVar.path, variable);
  }

  // 3. Восстановить bindings
  const allPages = figma.root.children.filter(p => p.type === 'PAGE') as PageNode[];
  const allNodes: SceneNode[] = [];
  for (const page of allPages) {
    allNodes.push(...findAllNodesInPage(page));
  }

  for (const snapshotVar of snapshot.variables) {
    if (snapshotVar.usages.length === 0) continue;

    const variable = variableMap.get(snapshotVar.path);
    if (!variable) continue;

    for (const usage of snapshotVar.usages) {
      try {
        const node = figma.getNodeById(usage.nodeId);
        if (!node) {
          bindingsSkipped++;
          continue;
        }

        // Восстановить binding
        try {
          if (usage.property === 'fills' || usage.property === 'strokes') {
            const paints = (node as any)[usage.property];
            if (Array.isArray(paints) && paints[usage.index ?? 0]) {
              const paint = paints[usage.index ?? 0];
              const updatedPaint = figma.variables.setBoundVariableForPaint(
                paint,
                'color',
                variable
              );
              const copy = paints.slice();
              copy[usage.index ?? 0] = updatedPaint;
              (node as any)[usage.property] = copy;
              bindingsRestored++;
            } else {
              bindingsSkipped++;
            }
          } else {
            // Numeric property
            figma.variables.setBoundVariable(
              node as any,
              usage.property as any,
              variable
            );
            bindingsRestored++;
          }
        } catch (error) {
          console.warn(`Failed to restore binding for ${snapshotVar.path} on ${usage.nodeId}:`, error);
          bindingsSkipped++;
        }
      } catch (error) {
        bindingsSkipped++;
      }
    }
  }

  const summary = calculateRestoreSummary(snapshot);

  figma.notify('Snapshot restored', { timeout: 1200 });

  return {
    summary,
    debug: {
      collectionsCreated,
      variablesCreated,
      bindingsRestored,
      bindingsSkipped
    }
  };
}

/**
 * Convert color string to RGB (fallback for old formats)
 * 
 * NOTE: New format already includes RGB objects from Style Dictionary.
 * This function is only for backward compatibility with:
 * - HEX values (#fff, #ffffff)
 * - RGB/RGBA strings (rgb(255, 0, 0))
 * - OKLCH strings (oklch(50% 0.20 220)) - simplified conversion
 * 
 * For production, all colors should be pre-converted to RGB objects
 * during token generation (see figmaVariablesScoped.js format).
 */
function convertColorToRGB(colorValue: string): RGBA {
  if (!colorValue || typeof colorValue !== 'string') {
    throw new Error(`Invalid color value: ${colorValue}`);
  }

  const trimmed = colorValue.trim();

  // If already HEX, use existing hexToPaint
  if (trimmed.startsWith('#')) {
    return hexToPaint(trimmed);
  }

  // If already RGB/RGBA, parse it
  const rgbMatch = trimmed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10) / 255,
      g: parseInt(rgbMatch[2], 10) / 255,
      b: parseInt(rgbMatch[3], 10) / 255,
      a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1
    };
  }

  // Parse OKLCH format: oklch(L% C H) or oklch(L% C H / A)
  const oklchMatch = trimmed.match(/^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/i);
  if (!oklchMatch) {
    // Fallback: try to parse as HEX without #
    if (/^[0-9a-fA-F]{3,8}$/.test(trimmed)) {
      return hexToPaint('#' + trimmed);
    }
    throw new Error(`Unsupported color format: ${colorValue}`);
  }

  const l = parseFloat(oklchMatch[1]) / 100; // Lightness: 0-1
  const c = parseFloat(oklchMatch[2]); // Chroma
  const h = parseFloat(oklchMatch[3]); // Hue: 0-360
  const alpha = oklchMatch[4] ? parseFloat(oklchMatch[4]) : 1;

  // Convert OKLCH to RGB
  // This is a simplified conversion - for production, consider using culori library
  // OKLCH → OKLab → Linear RGB → sRGB
  const rgb = oklchToRgb(l, c, h);

  return {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
    a: alpha
  };
}

/**
 * Convert OKLCH to RGB (simplified implementation)
 * For accurate conversion, this should use culori library or proper color space math
 * This is a basic implementation that should work for most cases
 */
function oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
  // Convert OKLCH to OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b_lab = c * Math.sin(hRad);

  // Convert OKLab to Linear RGB (simplified - uses approximate matrix)
  // This is a basic approximation - for production use proper color space conversion
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b_lab;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b_lab;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b_lab;

  const l_3 = l_ * l_ * l_;
  const m_3 = m_ * m_ * m_;
  const s_3 = s_ * s_ * s_;

  const r_linear = +4.0767416621 * l_3 - 3.3077115913 * m_3 + 0.2309699292 * s_3;
  const g_linear = -1.2684380046 * l_3 + 2.6097574011 * m_3 - 0.3413193965 * s_3;
  const b_linear = -0.0041960863 * l_3 - 0.7034186147 * m_3 + 1.7076147010 * s_3;

  // Convert linear RGB to sRGB (gamma correction)
  const gamma = (c: number) => {
    const abs = Math.abs(c);
    if (abs > 0.0031308) {
      return (c > 0 ? 1 : -1) * (1.055 * Math.pow(abs, 1.0 / 2.4) - 0.055);
    }
    return 12.92 * c;
  };

  let r = gamma(r_linear);
  let g = gamma(g_linear);
  let b = gamma(b_linear);

  // Clamp to [0, 1]
  r = Math.max(0, Math.min(1, r));
  g = Math.max(0, Math.min(1, g));
  b = Math.max(0, Math.min(1, b));

  return { r, g, b };
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

function calculateMigrationSummary(migration: MigrationFile): MigrationSummary {
  const deleted = migration.deleted.length;
  const moved = migration.moved.length;
  const totalChanges = deleted + moved;
  const totalUsagesAffected = migration.summary.totalUsagesAffected;
  const requiresReview = migration.deleted.filter(d => d.requiresManualReview).length;

  return {
    totalChanges,
    deleted,
    moved,
    totalUsagesAffected,
    requiresReview
  };
}

async function applyMigration(migration: MigrationFile): Promise<MigrationResult> {
  if (!figma.variables) {
    throw new Error('Figma Variables API not available.');
  }

  const existingVariables = figma.variables.getLocalVariables();
  const allPages = figma.root.children.filter(p => p.type === 'PAGE') as PageNode[];
  const allNodes: SceneNode[] = [];
  for (const page of allPages) {
    allNodes.push(...findAllNodesInPage(page));
  }

  // Создать map переменных по ID и по path
  const variablesById = new Map<string, Variable>();
  const variablesByPath = new Map<string, Variable>();
  for (const variable of existingVariables) {
    variablesById.set(variable.id, variable);
    const path = variable.description || variable.name.replace(/\//g, '.');
    variablesByPath.set(path, variable);
  }

  let variablesReplaced = 0;
  let bindingsUpdated = 0;
  let bindingsSkipped = 0;
  let variablesMoved = 0;

  // 1. Обработать удаленные переменные (заменить на fallback)
  for (const deletedVar of migration.deleted) {
    const oldVariable = variablesById.get(deletedVar.old.variableId);
    if (!oldVariable) continue; // Переменная уже удалена или не найдена

    // Найти fallback переменную
    let fallbackVariable: Variable | null = null;
    if (deletedVar.fallback) {
      fallbackVariable = variablesByPath.get(deletedVar.fallback.path);
    }

    if (!fallbackVariable) {
      console.warn(`[Migration] No fallback found for ${deletedVar.old.path}, skipping`);
      continue;
    }

    // Найти все bindings старой переменной и заменить на fallback
    for (const node of allNodes) {
      const boundVars = (node as any).boundVariables || {};
      
      // Проверить fills/strokes
      ['fills', 'strokes'].forEach(prop => {
        const entries = boundVars[prop];
        if (Array.isArray(entries)) {
          entries.forEach((entry: any, index: number) => {
            if (entry?.type === 'VARIABLE_ALIAS' && entry.id === oldVariable.id) {
              try {
                const paints = (node as any)[prop];
                if (Array.isArray(paints) && paints[index]) {
                  const paint = paints[index];
                  const updatedPaint = figma.variables.setBoundVariableForPaint(paint, 'color', fallbackVariable!);
                  const copy = paints.slice();
                  copy[index] = updatedPaint;
                  (node as any)[prop] = copy;
                  bindingsUpdated++;
                }
              } catch (error) {
                console.warn(`[Migration] Failed to update binding for ${prop}[${index}] on ${node.name}:`, error);
                bindingsSkipped++;
              }
            }
          });
        }
      });
      
      // Проверить numeric properties
      const numericProps = ['strokeWeight', 'cornerRadius', 'width', 'height', 
                           'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'];
      numericProps.forEach(prop => {
        const varEntry = boundVars[prop];
        const varId = typeof varEntry === 'string' ? varEntry : varEntry?.id;
        if (varId === oldVariable.id) {
          try {
            figma.variables.setBoundVariable(node as any, prop as any, fallbackVariable!);
            bindingsUpdated++;
          } catch (error) {
            console.warn(`[Migration] Failed to update binding for ${prop} on ${node.name}:`, error);
            bindingsSkipped++;
          }
        }
      });
    }

    // Удалить старую переменную
    try {
      oldVariable.remove();
      variablesReplaced++;
    } catch (error) {
      console.warn(`[Migration] Failed to remove variable ${deletedVar.old.path}:`, error);
    }
  }

  // 2. Обработать перемещенные переменные (обновить коллекцию)
  for (const movedVar of migration.moved) {
    const variable = variablesByPath.get(movedVar.path);
    if (!variable) continue;

    // Найти старую и новую коллекции
    const oldCollection = figma.variables.getLocalVariableCollections()
      .find(c => c.name === movedVar.oldCollection);
    const newCollection = figma.variables.getLocalVariableCollections()
      .find(c => c.name === movedVar.newCollection);

    if (!oldCollection || !newCollection) {
      console.warn(`[Migration] Collections not found for ${movedVar.path}`);
      continue;
    }

    // Переместить переменную в новую коллекцию
    // Note: Figma API не поддерживает прямое перемещение, нужно создать новую переменную
    // Для упрощения, просто обновим description/name
    try {
      // Обновить описание, чтобы отразить новую коллекцию
      variable.description = movedVar.path;
      variablesMoved++;
    } catch (error) {
      console.warn(`[Migration] Failed to move variable ${movedVar.path}:`, error);
    }
  }

  return {
    summary: calculateMigrationSummary(migration),
    debug: {
      variablesReplaced,
      bindingsUpdated,
      bindingsSkipped,
      variablesMoved
    }
  };
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error importing variables';
}

function formatReloadTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
}

async function generateButtonStructure(payload: any) {
  const buttonTokens = payload?.eui?.button;
  if (!buttonTokens) {
    throw new Error('No eui.button data found in structures payload.');
  }
  const page = getOrCreatePage('Generated / Structures');
  figma.currentPage = page;
  await ensureTextFont();

  const rootFrame = figma.createFrame();
  rootFrame.name = 'eui.button';
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
    groupFrame.name = `eui.button.${groupKey}`;
    groupFrame.layoutMode = 'VERTICAL';
    groupFrame.itemSpacing = 8;
    groupFrame.paddingLeft = 8;
    groupFrame.paddingRight = 8;
    groupFrame.paddingTop = 8;
    groupFrame.paddingBottom = 8;
    groupFrame.counterAxisSizingMode = 'AUTO';
    groupFrame.primaryAxisSizingMode = 'AUTO';
    await renderTokenTree(groupFrame, groupValue as any, [`eui`, `button`, groupKey]);
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
