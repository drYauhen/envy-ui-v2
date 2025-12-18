import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import textTokens from '../../../tokens/semantic/colors/text.json';
import backgroundTokens from '../../../tokens/semantic/colors/background.json';
import borderTokens from '../../../tokens/semantic/colors/border.json';
import focusTokens from '../../../tokens/semantic/colors/focus.json';
import foundationBrand from '../../../tokens/foundations/colors/brand.json';
import foundationNeutral from '../../../tokens/foundations/colors/neutral.json';
import foundationAccent from '../../../tokens/foundations/colors/accent.json';
import foundationSignal from '../../../tokens/foundations/colors/signal.json';
import foundationStatus from '../../../tokens/foundations/colors/status.json';

type Story = StoryObj;

type TokenRef = {
  path: string;
  ref: string;
};

type FlatToken = {
  value: string;
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

const flattenTokens = (node: unknown, path: string[] = [], acc: Record<string, FlatToken> = {}): Record<string, FlatToken> => {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return acc;

  const obj = node as Record<string, unknown>;
  if (typeof obj.$value === 'string') {
    acc[path.join('.')] = { value: obj.$value };
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value' || key === '$type') continue;
    flattenTokens(value, [...path, key], acc);
  }

  return acc;
};

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(foundationBrand, [], flatTokenMap);
flattenTokens(foundationNeutral, [], flatTokenMap);
flattenTokens(foundationAccent, [], flatTokenMap);
flattenTokens(foundationSignal, [], flatTokenMap);
flattenTokens(foundationStatus, [], flatTokenMap);
flattenTokens(textTokens, [], flatTokenMap);
flattenTokens(backgroundTokens, [], flatTokenMap);
flattenTokens(borderTokens, [], flatTokenMap);
flattenTokens(focusTokens, [], flatTokenMap);

const resolveAlias = (ref: string, seen: Set<string> = new Set()): string | null => {
  const match = ref.match(/^\{(.+)\}$/);
  const key = match ? match[1] : null;
  if (!key) return ref.startsWith('#') ? ref : null;
  if (seen.has(key)) return null;
  seen.add(key);

  const target = flatTokenMap[key];
  if (!target) return null;
  if (target.value.startsWith('{')) {
    return resolveAlias(target.value, seen);
  }
  return target.value;
};

const collectRefs = (node: unknown, path: string[] = []): TokenRef[] => {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return [];

  const obj = node as Record<string, unknown>;
  const refs: TokenRef[] = [];

  if (typeof obj.$value === 'string') {
    refs.push({ path: path.join('.'), ref: obj.$value });
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value' || key === '$type') continue;
    refs.push(...collectRefs(value, [...path, key]));
  }

  return refs;
};

const categories: { id: string; label: string; refs: TokenRef[] }[] = [
  { id: 'text', label: 'Text', refs: collectRefs((textTokens as any)?.ui?.color?.text ?? {}, ['ui', 'color', 'text']) },
  {
    id: 'background',
    label: 'Background',
    refs: collectRefs((backgroundTokens as any)?.ui?.color ?? {}, ['ui', 'color'])
  },
  { id: 'border', label: 'Border', refs: collectRefs((borderTokens as any)?.ui?.color?.border ?? {}, ['ui', 'color', 'border']) },
  { id: 'focus', label: 'Focus', refs: collectRefs((focusTokens as any)?.ui?.color ?? {}, ['ui', 'color']) }
];

const ColorSwatch = ({ reference }: { reference: string }) => {
  const resolved = resolveAlias(reference);
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

const Table = ({ title, refs }: { title: string; refs: TokenRef[] }) => (
  <div style={sectionStyle}>
    <p style={headingStyle}>{title}</p>
    {refs.length === 0 ? (
      <p style={textStyle}>No tokens found for this category.</p>
    ) : (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>Reference</th>
            <th style={thStyle}>Preview</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const meta: Meta = {
  title: 'Tokens/Semantic/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

export const Text: Story = {
  name: 'Text',
  render: () => (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <p style={headingStyle}>Semantic Text Colors</p>
        <p style={textStyle}>Projection of tokens/semantic/colors/text.json. Values resolve through foundations.</p>
      </div>
      <Table title="Text" refs={categories.find((c) => c.id === 'text')?.refs ?? []} />
    </div>
  )
};

export const Background: Story = {
  name: 'Background',
  render: () => (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <p style={headingStyle}>Semantic Background Colors</p>
        <p style={textStyle}>Projection of tokens/semantic/colors/background.json (includes brand.primary alias).</p>
      </div>
      <Table title="Background" refs={categories.find((c) => c.id === 'background')?.refs ?? []} />
    </div>
  )
};

export const Border: Story = {
  name: 'Border',
  render: () => (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <p style={headingStyle}>Semantic Border Colors</p>
        <p style={textStyle}>Projection of tokens/semantic/colors/border.json.</p>
      </div>
      <Table title="Border" refs={categories.find((c) => c.id === 'border')?.refs ?? []} />
    </div>
  )
};

export const Focus: Story = {
  name: 'Focus',
  render: () => (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <p style={headingStyle}>Semantic Focus Colors</p>
        <p style={textStyle}>Projection of tokens/semantic/colors/focus.json including system compatibility alias.</p>
      </div>
      <Table title="Focus" refs={categories.find((c) => c.id === 'focus')?.refs ?? []} />
    </div>
  )
};
