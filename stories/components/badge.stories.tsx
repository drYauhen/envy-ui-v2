import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Badge',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const gridStyle = {
  display: 'grid',
  gap: '1rem',
  padding: '2rem',
  backgroundColor: '#ffffff'
} as const;

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center'
} as const;

const labelStyle = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#0f172a',
  minWidth: '100px'
} as const;

export const Variants: Story = {
  name: 'Variants',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Badge'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={gridStyle}>
          <div style={rowStyle}>
            <span style={labelStyle}>Subtle</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="neutral">Neutral</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="success">Success</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="warning">Warning</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="error">Error</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="info">Info</span>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>Solid</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="neutral">Neutral</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="success">Success</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="warning">Warning</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="error">Error</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="info">Info</span>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>Outline</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="neutral">Neutral</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="success">Success</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="warning">Warning</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="error">Error</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="info">Info</span>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};
