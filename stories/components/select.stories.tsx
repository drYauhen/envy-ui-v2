import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/Select',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem',
  maxWidth: '600px'
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

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
} as const;

export const SelectStates: Story = {
  name: 'States',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Select'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Select States</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Default select</span>
            <select className="eui-select">
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">With selected value</span>
            <select className="eui-select" defaultValue="option2">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Disabled select</span>
            <select className="eui-select" disabled>
              <option value="option1">Option 1</option>
              <option value="option2" selected>Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Error state</span>
            <select className="eui-select" data-eui-state="error" defaultValue="invalid">
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
};

export const SelectSizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Select Sizes</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Small</span>
            <select className="eui-select" data-eui-size="sm">
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Medium (default)</span>
            <select className="eui-select" data-eui-size="md">
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Large</span>
            <select className="eui-select" data-eui-size="lg">
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
};

export const SelectContexts: Story = {
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
        <div data-eui-context="app" style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Interactive select</span>
            <select className="eui-select">
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </label>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Report Context (Print Style)</h3>
        <div data-eui-context="report" style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Static select (print)</span>
            <select className="eui-select" disabled>
              <option value="option1">Option 1</option>
              <option value="option2" selected>Option 2</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
};

