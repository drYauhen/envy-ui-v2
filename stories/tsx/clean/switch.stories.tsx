import type { Meta, StoryObj } from '@storybook/react';
import { SwitchClean } from '../../../packages/tsx';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX (Clean)/Components/Switch',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Components/Switch'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const stackStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem'
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '1rem',
  alignItems: 'center' as const
};

export const States: Story = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <label className="eui-switch-wrapper">
          <SwitchClean aria-label="Off" />
          <span className="eui-label">Off</span>
        </label>
        <label className="eui-switch-wrapper">
          <SwitchClean defaultChecked aria-label="On" />
          <span className="eui-label">On</span>
        </label>
        <label className="eui-switch-wrapper">
          <SwitchClean disabled aria-label="Disabled" />
          <span className="eui-label">Disabled</span>
        </label>
        <label className="eui-switch-wrapper">
          <SwitchClean defaultChecked disabled aria-label="Disabled on" />
          <span className="eui-label">Disabled on</span>
        </label>
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <label className="eui-switch-wrapper">
          <SwitchClean size="sm" aria-label="Small" />
          <span className="eui-label">Small</span>
        </label>
        <label className="eui-switch-wrapper">
          <SwitchClean size="md" defaultChecked aria-label="Medium" />
          <span className="eui-label">Medium</span>
        </label>
        <label className="eui-switch-wrapper">
          <SwitchClean size="lg" defaultChecked aria-label="Large" />
          <span className="eui-label">Large</span>
        </label>
      </div>
    </div>
  )
};
