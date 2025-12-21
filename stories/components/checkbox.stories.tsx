import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'HTML + CSS/Components/Checkbox',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

// Helper component for indeterminate checkbox
const IndeterminateCheckbox: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const ref = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = true;
    }
  }, []);
  
  return (
    <input
      ref={ref}
      type="checkbox"
      className="eui-checkbox"
      disabled={disabled}
    />
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
} as const;

const sectionTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const rowStyle = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap',
  alignItems: 'center'
} as const;

export const CheckboxStates: Story = {
  name: 'States',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Checkbox States</h3>
        <div style={rowStyle}>
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" />
            <span className="eui-label">Unchecked</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" defaultChecked />
            <span className="eui-label">Checked</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" disabled />
            <span className="eui-label">Disabled</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" defaultChecked disabled />
            <span className="eui-label">Checked & Disabled</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <IndeterminateCheckbox />
            <span className="eui-label">Indeterminate</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <IndeterminateCheckbox disabled />
            <span className="eui-label">Indeterminate & Disabled</span>
          </label>
        </div>
      </div>
    </div>
  )
};

export const CheckboxContexts: Story = {
  name: 'Contexts (App vs Report)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Application Context (Interactive)</h3>
        <div data-eui-context="app" style={rowStyle}>
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" />
            <span className="eui-label">Unchecked</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" defaultChecked />
            <span className="eui-label">Checked</span>
          </label>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Report Context (Print Style)</h3>
        <div data-eui-context="report" style={rowStyle}>
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" disabled />
            <span className="eui-label">Unchecked (brackets)</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" defaultChecked disabled />
            <span className="eui-label">Checked (brackets + checkmark)</span>
          </label>
        </div>
      </div>
    </div>
  )
};

export const CheckboxExample: Story = {
  name: 'Example Usage',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Checkbox Group Example</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" defaultChecked />
            <span className="eui-label">Accept terms and conditions</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" />
            <span className="eui-label">Subscribe to newsletter</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" />
            <span className="eui-label">Enable notifications</span>
          </label>
        </div>
      </div>
    </div>
  )
};

export const CheckboxSizes: Story = {
  name: 'Sizes (Architecture Demo)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Checkbox size variants are available in the architecture for future theme customization. In application context, typically only one size (default) is used.'
      }
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Checkbox Sizes (Architecture Demo)</h3>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#64748b' }}>
          Size variants are available for future theme customization. In application context, typically only default size is used.
        </p>
        <div style={rowStyle}>
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" data-eui-size="sm" />
            <span className="eui-label">Small checkbox</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" data-eui-size="md" defaultChecked />
            <span className="eui-label">Medium checkbox (default)</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" data-eui-size="lg" defaultChecked />
            <span className="eui-label">Large checkbox</span>
          </label>
        </div>
      </div>
    </div>
  )
};

