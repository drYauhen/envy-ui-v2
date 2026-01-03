import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/InputGroup',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/InputGroup'),
    docs: {
      description: {
        component: 'InputGroup allows adding prefix (left) and suffix (right) icons/elements inside the input border. The group uses flexbox layout where the container has border and background, the input field inside has no border, and prefix/suffix slots have fixed width.'
      }
    }
  }
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

export const WithPrefix: Story = {
  name: 'With Prefix Icon',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Search Input with Prefix Icon</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Search</span>
            <div className="eui-input-group" data-eui-size="md">
              <span className="eui-input-prefix" data-eui-slot="prefix">
                <span data-eui-icon="search"></span>
              </span>
              <input type="text" className="eui-input" placeholder="Search..." />
            </div>
          </label>
        </div>
      </div>
    </div>
  )
};

export const WithSuffix: Story = {
  name: 'With Suffix Icon',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Input with Clear Button (Suffix)</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">With Clear Button</span>
            <div className="eui-input-group" data-eui-size="md">
              <input type="text" className="eui-input" placeholder="Type to clear..." defaultValue="Some text" />
              <span className="eui-input-suffix" data-eui-slot="suffix">
                <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', lineHeight: 1, color: 'inherit' }}>
                  ×
                </button>
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
};

export const WithPrefixAndSuffix: Story = {
  name: 'With Both Prefix and Suffix',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Search Input with Clear Button</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Search with Clear</span>
            <div className="eui-input-group" data-eui-size="md">
              <span className="eui-input-prefix" data-eui-slot="prefix">
                <span data-eui-icon="search"></span>
              </span>
              <input type="text" className="eui-input" placeholder="Search..." defaultValue="Search term" />
              <span className="eui-input-suffix" data-eui-slot="suffix">
                <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', lineHeight: 1, color: 'inherit' }}>
                  ×
                </button>
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
};

export const States: Story = {
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
        <h3 style={sectionTitleStyle}>InputGroup States</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Disabled</span>
            <div className="eui-input-group" data-eui-size="md">
              <span className="eui-input-prefix" data-eui-slot="prefix">
                <span data-eui-icon="search"></span>
              </span>
              <input type="text" className="eui-input" placeholder="Disabled" disabled />
            </div>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Error State</span>
            <div className="eui-input-group" data-eui-state="error" data-eui-size="md">
              <span className="eui-input-prefix" data-eui-slot="prefix">
                <span data-eui-icon="search"></span>
              </span>
              <input type="text" className="eui-input" placeholder="Error input" data-eui-state="error" defaultValue="invalid@email" />
            </div>
          </label>
        </div>
      </div>
    </div>
  )
};

export const Sizes: Story = {
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
        <h3 style={sectionTitleStyle}>InputGroup Sizes</h3>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#64748b' }}>
          <strong>Note:</strong> Different sizes are provided for future compatibility and potential development needs (e.g., compact themes, button alignment). The standard and default size is <strong>medium</strong> - use it for all regular input fields.
        </p>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Small</span>
            <div className="eui-input-group" data-eui-size="sm">
              <span className="eui-input-prefix" data-eui-slot="prefix">
                <span data-eui-icon="search"></span>
              </span>
              <input type="text" className="eui-input" data-eui-size="sm" placeholder="Small input" />
            </div>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Medium (default)</span>
            <div className="eui-input-group" data-eui-size="md">
              <span className="eui-input-prefix" data-eui-slot="prefix">
                <span data-eui-icon="search"></span>
              </span>
              <input type="text" className="eui-input" data-eui-size="md" placeholder="Medium input" />
            </div>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Large</span>
            <div className="eui-input-group" data-eui-size="lg">
              <span className="eui-input-prefix" data-eui-slot="prefix">
                <span data-eui-icon="search"></span>
              </span>
              <input type="text" className="eui-input" data-eui-size="lg" placeholder="Large input" />
            </div>
          </label>
        </div>
      </div>
    </div>
  )
};


