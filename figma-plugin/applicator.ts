// Applicator module: semantic role mapping UI wiring.
// Isolated from Variables and Structures paths.

type ApplicatorSelection = {
  status: 'ok' | 'empty' | 'error';
  message?: string;
  nodeType?: string;
  name?: string;
  id?: string;
  children?: Array<{
    id: string;
    name: string;
    type: string;
    visible: boolean;
    locked: boolean;
  }>;
  mapping?: Record<string, string>;
};

const PLUGIN_DATA_KEY = 'envy.semanticMapping';
const REQUIRED_ROLES = ['background', 'label'] as const;
const ROLES: Array<{ id: string; label: string; expected: string[]; required: boolean }> = [
  { id: 'background', label: 'Background', expected: ['RECTANGLE'], required: true },
  { id: 'label', label: 'Label', expected: ['TEXT'], required: true },
  { id: 'border', label: 'Border', expected: ['RECTANGLE'], required: false },
  { id: 'icon', label: 'Icon', expected: ['VECTOR', 'FRAME'], required: false }
];

export function applicatorHandleMessage(message: any) {
  if (message.type === 'request-selection') {
    const selectionInfo = readSelection();
    figma.ui.postMessage({ type: 'selection-data', payload: selectionInfo });
  } else if (message.type === 'save-mapping') {
    try {
      saveMapping(message.payload);
      figma.ui.postMessage({ type: 'mapping-saved' });
    } catch (error) {
      figma.ui.postMessage({ type: 'mapping-error', payload: formatError(error) });
    }
  } else if (message.type === 'preview-mapping') {
    try {
      const preview = previewMapping(message.payload);
      figma.ui.postMessage({ type: 'mapping-preview', payload: preview });
    } catch (error) {
      figma.ui.postMessage({ type: 'mapping-error', payload: formatError(error) });
    }
  } else if (message.type === 'expand-variants') {
    void expandVariants(message.payload);
  }
}

function readSelection(): ApplicatorSelection {
  const selection = figma.currentPage.selection;
  console.log('[Applicator][Selection]', `count=${selection?.length ?? 0}`);
  if (!selection || selection.length === 0) {
    return { status: 'empty', message: 'Select a Frame/Component in Figma to start.' };
  }
  if (selection.length > 1) {
    return { status: 'error', message: 'Please select exactly one node.' };
  }

  const node = selection[0];
  console.log('[Applicator][Selection]', `node={ id:${node.id}, name:${node.name}, type:${node.type} }`);
  if (node.type === 'COMPONENT_SET') {
    return {
      status: 'error',
      message: 'Select a specific variant (Component) inside the set, not the Component Set itself.'
    };
  }
  if (!['FRAME', 'COMPONENT', 'RECTANGLE'].includes(node.type)) {
    return { status: 'error', message: 'Selection must be a Rectangle, Frame or Component.' };
  }

  const children = 'children' in node && Array.isArray((node as any).children)
    ? (node as any).children.map((child: SceneNode) => ({
        id: child.id,
        name: child.name,
        type: child.type,
        visible: child.visible,
        locked: child.locked
      }))
    : [];

  const mapping = loadMapping(node);
  const collected = collectNodes(node);
  const typeList = collected.map((n) => n.type);
  console.log('[Applicator][Traversal]', `nodeCount=${collected.length}`);
  console.log('[Applicator][Traversal]', `types=[${typeList.join(', ')}]`);
  const bindings = detectVariableBindings(collected);
  const axes = Array.from(new Set(bindings.map((b) => b.axisId)));
  console.log('[Applicator][Axes]', `bindings=${bindings.length}`, `axes=[${axes.join(', ')}]`);

  return {
    status: 'ok',
    nodeType: node.type,
    name: node.name,
    id: node.id,
    children,
    mapping,
    bindings
  };
}

function loadMapping(node: BaseNode): Record<string, string> | undefined {
  try {
    const raw = node.getPluginData(PLUGIN_DATA_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.semanticMapping) {
      return parsed.semanticMapping;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function saveMapping(payload: any) {
  const nodeId = payload?.nodeId;
  const mapping = payload?.mapping;
  if (!nodeId || !mapping) throw new Error('Missing node or mapping.');
  const node = figma.getNodeById(nodeId);
  if (!node || !('setPluginData' in node)) throw new Error('Cannot find selected node.');

  // Basic validation: required roles present
  for (const role of REQUIRED_ROLES) {
    if (!mapping[role]) throw new Error(`Required role missing: ${role}`);
  }

  const payloadToStore = { semanticMapping: mapping };
  (node as BaseNode).setPluginData(PLUGIN_DATA_KEY, JSON.stringify(payloadToStore));
}

function previewMapping(payload: any) {
  const mapping = payload?.mapping;
  if (!mapping) throw new Error('No mapping provided');
  const entries = Object.entries(mapping).map(([role, id]) => `${role} → ${id || '—'}`);
  return entries.join(' | ');
}

function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}

type BindingEntry = {
  axisId: string;
  targetNodeId: string;
  property: string;
  index?: number;
  variableId: string;
  variableName: string;
  collectionId: string;
  collectionName: string;
};

function collectNodes(root: SceneNode): SceneNode[] {
  const result: SceneNode[] = [];
  const walk = (n: SceneNode) => {
    result.push(n);
    if ('children' in n && Array.isArray((n as any).children)) {
      for (const child of (n as any).children as SceneNode[]) {
        walk(child);
      }
    }
  };
  walk(root);
  return result;
}

function detectVariableBindings(nodes: SceneNode[]): BindingEntry[] {
  if (!figma.variables) return [];
  const bindings: BindingEntry[] = [];

  for (const node of nodes) {
    const targetId = node.id;
    const boundVars = (node as any).boundVariables || {};
    if (boundVars && Object.keys(boundVars).length) {
      console.log('[Applicator][BoundVariables]', `node=${node.id}`, `type=${node.type}`, 'boundVariables=', boundVars);
    }
    const paintProps = ['fills', 'strokes'];
    paintProps.forEach((prop) => {
      const entries = boundVars[prop];
      if (Array.isArray(entries)) {
        entries.forEach((entry, index) => {
          if (!entry || entry.type !== 'VARIABLE_ALIAS') return;
          const varId = (entry as any).id;
          if (!varId) return;
          const variable = figma.variables!.getVariableById(varId);
          if (!variable) return;
          const collection = figma.variables!.getVariableCollectionById(variable.variableCollectionId);
          bindings.push({
            axisId: `${prop}:${collection?.id ?? variable.variableCollectionId}`,
            targetNodeId: targetId,
            property: prop,
            index,
            variableId: varId,
            variableName: variable.name,
            collectionId: variable.variableCollectionId,
            collectionName: collection?.name ?? variable.variableCollectionId
          });
        });
      }
    });

    const numericProps = ['strokeWeight', 'cornerRadius', 'width', 'height', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'];
    numericProps.forEach((prop) => {
      const varEntry = boundVars[prop];
      const varId = typeof varEntry === 'string' ? varEntry : varEntry?.id;
      if (varId) {
        const variable = figma.variables!.getVariableById(varId);
        if (variable) {
          const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId);
          bindings.push({
            axisId: `${prop}:${collection?.id ?? variable.variableCollectionId}`,
            targetNodeId: targetId,
            property: prop,
            variableId: varId,
            variableName: variable.name,
            collectionId: variable.variableCollectionId,
            collectionName: collection?.name ?? variable.variableCollectionId
          });
        }
      }
    });
  }

  console.log('[Applicator][Bindings]', `count=${bindings.length}`, 'sample=', bindings[0] ?? null);
  return bindings;
}

async function expandVariants(payload: any) {
  const nodeId = payload?.nodeId;
  const axisBindings: BindingEntry[] = payload?.axisBindings || [];
  if (!nodeId || !axisBindings.length) {
    figma.ui.postMessage({ type: 'mapping-error', payload: 'Missing axis or node.' });
    return;
  }
  console.log(
    '[Applicator][Expand:start]',
    `nodeId=${nodeId}`,
    `bindings=${axisBindings.length}`,
    'axis=',
    axisBindings[0] ?? null
  );
  if (!figma.variables) {
    figma.ui.postMessage({ type: 'mapping-error', payload: 'Variables API not available.' });
    return;
  }
  const node = figma.getNodeById(nodeId) as SceneNode | null;
  if (!node) {
    figma.ui.postMessage({ type: 'mapping-error', payload: 'Node not found.' });
    return;
  }
  console.log('[Expand] node', node.id, node.type);
  if (node.type === 'COMPONENT_SET') {
    figma.ui.postMessage({
      type: 'mapping-error',
      payload: 'Select a single variant (Component) or base Frame/Rectangle.'
    });
    return;
  }
  if (!['RECTANGLE', 'FRAME', 'COMPONENT'].includes(node.type)) {
    figma.ui.postMessage({ type: 'mapping-error', payload: 'Selection must be Rectangle/Frame/Component.' });
    return;
  }

  const baseComponent =
    node.type === 'COMPONENT'
      ? node
      : (node as any).convertToComponent
      ? (node as any).convertToComponent()
      : null;
  if (!baseComponent) {
    console.error('[Expand] convertToComponent failed');
    figma.ui.postMessage({ type: 'mapping-error', payload: 'Cannot convert selection to component' });
    return;
  }
  console.log('[Expand] baseComponent', baseComponent?.id, baseComponent?.type);
  if (!baseComponent || baseComponent.type !== 'COMPONENT') {
    figma.ui.postMessage({ type: 'mapping-error', payload: 'Could not convert to component.' });
    return;
  }

  const axisSample = axisBindings[0];
  const collectionId = axisSample.collectionId as string;
  const collection = figma.variables.getVariableCollectionById(collectionId);
  if (!collection) {
    figma.ui.postMessage({ type: 'mapping-error', payload: 'Collection not found.' });
    return;
  }
  console.log('[Expand] axis collection', collection.name, collection.id);
  const localVars = figma.variables.getLocalVariablesAsync
    ? await figma.variables.getLocalVariablesAsync()
    : figma.variables.getLocalVariables();
  const variables = localVars.filter((v) => v.variableCollectionId === collectionId);
  if (!variables.length) {
    figma.ui.postMessage({ type: 'mapping-error', payload: 'No variables found in collection.' });
    return;
  }
  console.log('[Expand] variables count', variables.length);

  const variants: ComponentNode[] = [];
  variables.forEach((variable, idx) => {
    console.log('[Expand] creating variant', idx, variable.name);
    const variant = idx === 0 ? baseComponent : (baseComponent.clone() as ComponentNode);
    const appliedCount = applyAxisBindings(variant, baseComponent, axisBindings, variable.id);
    const leafName = variable.name.split('/').pop() ?? variable.name;
    variant.name = `${baseComponent.name} / ${leafName}`;
    console.log('[Applicator][Expand:apply]', `variable=${variable.name}`, `bindingsApplied=${appliedCount}`);
    variants.push(variant);
  });
  console.log('[Expand] variants total', variants.length);

  console.log('[Expand] combining variants');
  let componentSet: ComponentSetNode | null = null;
  try {
    componentSet = figma.combineAsVariants(variants, baseComponent.parent ?? figma.currentPage);
    console.log('[Expand] componentSet created', componentSet.id);
  } catch (e) {
    console.error(
      '[Expand] combineAsVariants failed',
      e,
      'variants length',
      variants.length,
      'variant ids',
      variants.map((v) => v.id),
      'parent',
      baseComponent.parent?.id
    );
    figma.ui.postMessage({ type: 'mapping-error', payload: 'Failed to combine variants.' });
    return;
  }

  const propName = (collection.name.split('/').pop() ?? collection.name).trim().toLowerCase();
  const values = variables.map((v) => v.name.split('/').pop() ?? v.name);
  componentSet.variantGroupProperties = { [propName]: { values } };
  variants.forEach((variant, idx) => (variant.variantProperties = { [propName]: values[idx] }));

  console.log('[Applicator][Expand:done]', `variants=${variants.length}`, `componentSet=${componentSet.id}`);
  figma.ui.postMessage({ type: 'mapping-preview', payload: `Expanded ${variants.length} variants by ${collection.name}` });
}

function applyAxisBindings(clone: ComponentNode, base: ComponentNode, axisBindings: BindingEntry[], variableId: string) {
  if (!axisBindings.length) return 0;
  if (!figma.variables) return 0;
  const baseNodes = collectNodes(base);
  const cloneNodes = collectNodes(clone);
  const indexMap = new Map<string, number>();
  baseNodes.forEach((n, idx) => indexMap.set(n.id, idx));

  let applied = 0;
  const variable = figma.variables.getVariableById(variableId);
  if (!variable) return 0;
  for (const binding of axisBindings) {
    const idx = indexMap.get(binding.targetNodeId);
    if (idx === undefined) {
      console.warn('Missing target in clone for binding', binding);
      continue;
    }
    const target = cloneNodes[idx];
    if (!target) {
      continue;
    }
    if (binding.property === 'fills' || binding.property === 'strokes') {
      const paints = (target as any)[binding.property];
      if (!Array.isArray(paints)) continue;
      const paintIndex = binding.index ?? 0;
      const paint = paints[paintIndex];
      if (!paint) continue;
      const updatedPaint = figma.variables.setBoundVariableForPaint(paint, 'color', variable);
      const copy = paints.slice();
      copy[paintIndex] = updatedPaint;
      (target as any)[binding.property] = copy;
      applied += 1;
    } else {
      figma.variables.setBoundVariable(target as any, binding.property as any, variable);
      applied += 1;
    }
  }
  return applied;
}
