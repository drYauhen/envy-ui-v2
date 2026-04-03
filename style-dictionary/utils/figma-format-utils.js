import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const systemMeta = JSON.parse(readFileSync(resolve(__dirname, '../../system.meta.json'), 'utf8'));

export function getSystemMeta() {
  return systemMeta;
}

export function toTitleCase(value = '') {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export function mapVariableType(token) {
  const type = token.$type || token.type || token.attributes?.category;
  if (!type) return null;
  if (type === 'color') return 'COLOR';
  if (['dimension', 'number', 'float', 'integer'].includes(type)) return 'FLOAT';
  return null;
}

export function resolveNumericValue(token) {
  const raw = token.value ?? token.$value ?? token.original?.value;
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const parsed = parseFloat(raw);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

export function resolveRawColorValue(token) {
  const raw = token.value ?? token.$value ?? token.original?.value;
  return typeof raw === 'string' ? raw : null;
}

export function resolveCollectionName(token, variableType, options = {}) {
  const { systemId = systemMeta?.system?.id ?? 'envy-ui' } = options;

  if (variableType === 'COLOR') {
    const groupId = token.path?.[2] || token.path?.[1] || 'base';
    return `${systemId} • Colors / ${toTitleCase(groupId)}`;
  }

  const segment = token.path?.[1] || 'general';
  let category = 'Dimensions';
  if (segment.includes('radius') || segment.includes('shape')) category = 'Shape';
  else if (segment.includes('border')) category = 'Border';
  else if (segment.includes('focus')) category = 'Focus';
  else if (
    segment.includes('spacing')
    || segment.includes('gap')
    || segment.includes('padding')
    || segment.includes('size')
    || segment.includes('layout')
  ) {
    category = 'Size';
  }

  return `${systemId} • ${category} / ${toTitleCase(segment || 'Base')}`;
}
