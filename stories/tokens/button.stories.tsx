import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import semanticButton from '../../tokens/ui/color/semantic.button.json';
import focusTokens from '../../tokens/ui/button/focus.json';

type Story = StoryObj;

type TokenRef = {
  path: string;
  ref: string;
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
  ...collectRefs((focusTokens as any)?.ui?.button ?? {}, ['ui', 'button'])
];

const byPrefix = (prefix: string) => allRefs.filter((token) => token.path.startsWith(prefix));
const colorRefs = byPrefix('ui.button.').filter(
  (token) => !token.path.startsWith('ui.button.states') && !token.path.startsWith('ui.button.focus')
);
const stateRefs = byPrefix('ui.button.states');
const focusRefs = byPrefix('ui.button.focus');

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
            <th style={thStyle}>Type</th>
          </tr>
        </thead>
        <tbody>
          {refs.map((token) => (
            <tr key={token.path}>
              <td style={tdStyle}>{token.path}</td>
              <td style={tdStyle}>{token.ref}</td>
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
        refs={colorRefs.filter((token) => token.path.startsWith('ui.button.states'))}
        emptyMessage="No explicit state tokens defined yet."
      />

      <Table
        title="Focus"
        refs={focusRefs.filter((token) => token.path.startsWith('ui.button.focus'))}
        emptyMessage="No focus tokens found."
      />

      <div style={sectionStyle}>
        <p style={headingStyle}>Shape</p>
        <p style={textStyle}>No button-specific shape tokens defined yet.</p>
      </div>
    </div>
  )
};
