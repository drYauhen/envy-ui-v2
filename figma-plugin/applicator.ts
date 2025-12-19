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
  }
}

function readSelection(): ApplicatorSelection {
  const selection = figma.currentPage.selection;
  if (!selection || selection.length === 0) {
    return { status: 'empty', message: 'Select a Frame/Component in Figma to start.' };
  }
  if (selection.length > 1) {
    return { status: 'error', message: 'Please select exactly one node.' };
  }

  const node = selection[0];
  if (!['FRAME', 'COMPONENT', 'COMPONENT_SET'].includes(node.type)) {
    return { status: 'error', message: 'Selection must be a Frame or Component.' };
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

  return {
    status: 'ok',
    nodeType: node.type,
    name: node.name,
    id: node.id,
    children,
    mapping
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
