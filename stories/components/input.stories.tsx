import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/Input',
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

export const InputStates: Story = {
  name: 'States',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Input'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Input States</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Default input</span>
            <input type="text" className="eui-input" placeholder="Enter text" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Disabled input</span>
            <input type="text" className="eui-input" placeholder="Cannot type" disabled />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Error state</span>
            <input type="text" className="eui-input" placeholder="Invalid input" data-eui-state="error" defaultValue="wrong@email" />
          </label>
        </div>
      </div>
    </div>
  )
};

export const InputTypes: Story = {
  name: 'Input Types',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Different Input Types</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Text</span>
            <input type="text" className="eui-input" placeholder="Enter text" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Email</span>
            <input type="email" className="eui-input" placeholder="your.email@example.com" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Password</span>
            <input type="password" className="eui-input" placeholder="Enter password" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Number</span>
            <input type="number" className="eui-input" placeholder="Enter number" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Tel</span>
            <input type="tel" className="eui-input" placeholder="+1 234 567 8900" />
          </label>
        </div>
      </div>
    </div>
  )
};

export const InputContexts: Story = {
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
            <span className="eui-label">Interactive input</span>
            <input type="text" className="eui-input" placeholder="Type here" />
          </label>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Report Context (Print Style)</h3>
        <div data-eui-context="report" style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Static input (print)</span>
            <input type="text" className="eui-input" defaultValue="Printed value" disabled />
          </label>
        </div>
      </div>
    </div>
  )
};

export const InputSizes: Story = {
  name: 'Sizes (Future Compatibility)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Different sizes are provided for future compatibility and potential use cases (e.g., compact themes, button alignment). The standard and default size is **medium** - use it for all regular input fields.'
      }
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Input Sizes</h3>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#64748b' }}>
          <strong>Note:</strong> Different sizes are provided for future compatibility and potential development needs (e.g., compact themes, button alignment). The standard and default size is <strong>medium</strong> - use it for all regular input fields.
        </p>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Small</span>
            <input type="text" className="eui-input" data-eui-size="sm" placeholder="Small input" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Medium (default)</span>
            <input type="text" className="eui-input" data-eui-size="md" placeholder="Medium input" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Large</span>
            <input type="text" className="eui-input" data-eui-size="lg" placeholder="Large input" />
          </label>
        </div>
      </div>
    </div>
  )
};

