import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import semanticButton from '../../tokens/ui/color/semantic.button.json';
import focusTokens from '../../tokens/ui/button/focus.json';
import sizeTokens from '../../tokens/ui/button/size.json';
import shapeTokens from '../../tokens/ui/button/shape.json';
import colorPrimitives from '../../tokens/ui/color/primitives.json';
import colorBrand from '../../tokens/ui/color/brand.json';
import colorNeutral from '../../tokens/ui/color/neutral.json';
import colorSystem from '../../tokens/ui/color/system.json';

type Story = StoryObj;

type TokenRef = {
  path: string;
  ref: string;
  type?: string;
};

type FlatToken = {
  value: string;
  type?: string;
};

const pageStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem',
  background: '#f8fafc',
  color: '#0f172a'
};

const sectionStyle: CSSProperties = {
  padding: '1rem',
  border: '1px solid #e2e8f0',
  borderRadius: '0.75rem',
  background: '#ffffff',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)'
};

const headingStyle: CSSProperties = {
  margin: '0 0 0.35rem',
  fontSize: '1rem',
  fontWeight: 700
};

const textStyle: CSSProperties = {
  margin: 0,
  fontSize: '0.92rem',
  color: '#475569',
  lineHeight: 1.5
};

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.92rem'
};

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem',
  background: '#f1f5f9',
  color: '#0f172a',
  borderBottom: '1px solid #e2e8f0',
  fontWeight: 700
};

const tdStyle: CSSProperties = {
  padding: '0.5rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#0f172a'
};

const ColorSwatch = ({ reference }: { reference: string }) => {
  const resolved = resolveAlias(reference, flatColorMap);
  const size = 28;

  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    background:
      resolved && resolved.startsWith('#')
        ? resolved
        : 'repeating-linear-gradient(45deg, #e2e8f0, #e2e8f0 8px, #ffffff 8px, #ffffff 16px)'
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={style} aria-label={resolved ?? 'Unresolved color'} />
      <span style={{ fontSize: '0.82rem', color: '#475569' }}>{resolved ?? '—'}</span>
    </div>
  );
};

const flattenTokens = (node: unknown, path: string[] = [], acc: Record<string, FlatToken> = {}): Record<string, FlatToken> => {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return acc;

  const obj = node as Record<string, unknown>;
  if (typeof obj.$value === 'string') {
    acc[path.join('.')] = { value: obj.$value, type: typeof obj.$type === 'string' ? obj.$type : undefined };
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value' || key === '$type') continue;
    flattenTokens(value, [...path, key], acc);
  }

  return acc;
};

const flatColorMap: Record<string, FlatToken> = flattenTokens(colorPrimitives);
flattenTokens(colorBrand, [], flatColorMap);
flattenTokens(colorNeutral, [], flatColorMap);
flattenTokens(colorSystem, [], flatColorMap);
flattenTokens(semanticButton, [], flatColorMap);
flattenTokens(focusTokens, [], flatColorMap);
flattenTokens(sizeTokens, [], flatColorMap);
flattenTokens(shapeTokens, [], flatColorMap);

const resolveAlias = (ref: string, map: Record<string, FlatToken>, seen: Set<string> = new Set()): string | null => {
  const match = ref.match(/^\{(.+)\}$/);
  const key = match ? match[1] : null;
  if (!key) return ref.startsWith('#') ? ref : null;
  if (seen.has(key)) return null;
  seen.add(key);

  const target = map[key];
  if (!target) return null;
  if (target.value.startsWith('{')) {
    return resolveAlias(target.value, map, seen);
  }
  return target.value;
};

const collectRefs = (node: unknown, path: string[] = []): TokenRef[] => {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return [];

  const obj = node as Record<string, unknown>;
  const refs: TokenRef[] = [];

  if (typeof obj.$value === 'string') {
    refs.push({ path: path.join('.'), ref: obj.$value, type: typeof obj.$type === 'string' ? obj.$type : undefined });
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value' || key === '$type') continue;
    refs.push(...collectRefs(value, [...path, key]));
  }

  return refs;
};

const allRefs: TokenRef[] = [
  ...collectRefs((semanticButton as any)?.ui?.button ?? {}, ['ui', 'button']),
  ...collectRefs((focusTokens as any)?.ui?.button ?? {}, ['ui', 'button']),
  ...collectRefs((sizeTokens as any)?.ui?.button ?? {}, ['ui', 'button']),
  ...collectRefs((shapeTokens as any)?.ui?.button ?? {}, ['ui', 'button'])
];

const byPrefix = (prefix: string) => allRefs.filter((token) => token.path.startsWith(prefix));
const colorRefs = byPrefix('ui.button.').filter(
  (token) =>
    !token.path.startsWith('ui.button.states') &&
    !token.path.startsWith('ui.button.focus') &&
    !token.path.startsWith('ui.button.size') &&
    !token.path.startsWith('ui.button.shape')
);
const stateRefs = byPrefix('ui.button.states');
const focusRefs = byPrefix('ui.button.focus');
const sizeRefs = byPrefix('ui.button.size');
const shapeRefs = byPrefix('ui.button.shape');

const meta: Meta = {
  title: 'Tokens/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const Table = ({ title, refs, emptyMessage }: { title: string; refs: TokenRef[]; emptyMessage: string }) => (
  <div style={sectionStyle}>
    <p style={headingStyle}>{title}</p>
    {refs.length === 0 ? (
      <p style={textStyle}>{emptyMessage}</p>
    ) : (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Token path</th>
            <th style={thStyle}>References</th>
            <th style={thStyle}>Preview</th>
            <th style={thStyle}>Type</th>
          </tr>
        </thead>
        <tbody>
          {refs.map((token) => (
            <tr key={token.path}>
              <td style={tdStyle}>{token.path}</td>
              <td style={tdStyle}>{token.ref}</td>
              <td style={tdStyle}>
                <ColorSwatch reference={token.ref} />
              </td>
              <td style={tdStyle}>{token.type ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export const Button: Story = {
  name: 'Button',
  render: () => (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <p style={headingStyle}>Overview</p>
        <p style={textStyle}>
          Button token slice (v0.1) aggregated from existing semantic files. Values shown are aliases/references only; no new
          tokens were added. Categories without explicit tokens are shown as placeholders.
        </p>
      </div>

      <Table
        title="Colors"
        refs={colorRefs.filter((token) => token.path.startsWith('ui.button'))}
        emptyMessage="No Button color tokens found."
      />

      <Table
        title="States"
        refs={stateRefs.filter((token) => token.path.startsWith('ui.button.states'))}
        emptyMessage="No explicit state tokens defined yet."
      />

      <Table
        title="Focus"
        refs={focusRefs.filter((token) => token.path.startsWith('ui.button.focus'))}
        emptyMessage="No focus tokens found."
      />

      <Table title="Size" refs={sizeRefs} emptyMessage="No size tokens found." />

      <Table title="Shape" refs={shapeRefs} emptyMessage="No button-specific shape tokens defined yet." />
    </div>
  )
};
