import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxClean } from '../../../packages/tsx';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX (Clean)/Components/Checkbox',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Components/Checkbox'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
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

const IndeterminateClean = ({ disabled, size }: { disabled?: boolean; size?: 'sm' | 'md' | 'lg' }) => (
  <CheckboxClean disabled={disabled} indeterminate size={size} />
);

export const States: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <label className="eui-checkbox-wrapper">
          <CheckboxClean aria-label="Unchecked" />
          <span className="eui-label">Unchecked</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <CheckboxClean defaultChecked aria-label="Checked" />
          <span className="eui-label">Checked</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <CheckboxClean disabled aria-label="Disabled" />
          <span className="eui-label">Disabled</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <CheckboxClean defaultChecked disabled aria-label="Checked disabled" />
          <span className="eui-label">Checked & disabled</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <IndeterminateClean />
          <span className="eui-label">Indeterminate</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <IndeterminateClean disabled />
          <span className="eui-label">Indeterminate & disabled</span>
        </label>
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <label className="eui-checkbox-wrapper">
          <CheckboxClean size="sm" aria-label="Small" />
          <span className="eui-label">Small</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <CheckboxClean size="md" defaultChecked aria-label="Medium" />
          <span className="eui-label">Medium</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <CheckboxClean size="lg" defaultChecked aria-label="Large" />
          <span className="eui-label">Large</span>
        </label>
      </div>
    </div>
  )
};

export const Indeterminate: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <label className="eui-checkbox-wrapper">
          <IndeterminateClean size="sm" />
          <span className="eui-label">Small indeterminate</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <IndeterminateClean size="md" />
          <span className="eui-label">Medium indeterminate</span>
        </label>
        <label className="eui-checkbox-wrapper">
          <IndeterminateClean size="lg" />
          <span className="eui-label">Large indeterminate</span>
        </label>
      </div>
    </div>
  )
};
