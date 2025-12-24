import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import '../../packages/web-components/button'; // Registers the custom element
// TypeScript declarations are automatically picked up from button.d.ts

const meta: Meta = {
  title: 'Web Components/Components/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Framework-agnostic button component using W3C Web Components standards. Integrates with the token system via CSS custom properties that penetrate Shadow DOM boundaries.'
      }
    }
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '2rem',
  padding: '1.5rem'
};

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1rem',
  padding: '1rem',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap' as const,
  alignItems: 'center'
};

export const Button: Story = {
  name: 'Button (Web Components)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    useEffect(() => {
      // Component is registered when the module is imported
      // This effect ensures it's available in the Storybook environment
    }, []);

    return (
      <div style={containerStyle} data-eui-context="application">
        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Primary Buttons</h3>
          <div style={buttonGroupStyle}>
            <eui-button data-eui-intent="primary">Primary</eui-button>
            <eui-button data-eui-intent="primary" disabled>Disabled</eui-button>
            <eui-button data-eui-intent="primary" data-eui-selected>Selected</eui-button>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Secondary Buttons</h3>
          <div style={buttonGroupStyle}>
            <eui-button data-eui-intent="secondary">Secondary</eui-button>
            <eui-button data-eui-intent="secondary" disabled>Disabled</eui-button>
            <eui-button data-eui-intent="secondary" data-eui-selected>Selected</eui-button>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Accent Buttons</h3>
          <div style={buttonGroupStyle}>
            <eui-button data-eui-intent="accent">Accent</eui-button>
            <eui-button data-eui-intent="accent" disabled>Disabled</eui-button>
            <eui-button data-eui-intent="accent" data-eui-selected>Selected</eui-button>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Sizes</h3>
          <div style={buttonGroupStyle}>
            <eui-button data-eui-intent="primary" data-eui-size="sm">Small</eui-button>
            <eui-button data-eui-intent="primary" data-eui-size="md">Medium</eui-button>
            <eui-button data-eui-intent="primary" data-eui-size="lg">Large</eui-button>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Shapes</h3>
          <div style={buttonGroupStyle}>
            <eui-button data-eui-intent="primary" data-eui-shape="default">Default</eui-button>
            <eui-button data-eui-intent="primary" data-eui-shape="round">Round</eui-button>
            <eui-button data-eui-intent="primary" data-eui-shape="circle">○</eui-button>
          </div>
        </div>
      </div>
    );
  }
};

export const States: Story = {
  name: 'Button States',
  render: () => {
    return (
      <div style={containerStyle} data-eui-context="application">
        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Interactive States</h3>
          <p style={{ margin: '0 0 1rem', color: '#64748b', fontSize: '14px' }}>
            Hover, focus, and active states are handled by CSS. Disabled state prevents interaction.
          </p>
          <div style={buttonGroupStyle}>
            <eui-button data-eui-intent="primary">Normal</eui-button>
            <eui-button data-eui-intent="primary" disabled>Disabled</eui-button>
            <eui-button data-eui-intent="primary" data-eui-selected>Selected</eui-button>
          </div>
        </div>
      </div>
    );
  }
};

export const WithContent: Story = {
  name: 'Button with Content',
  render: () => {
    return (
      <div style={containerStyle} data-eui-context="application">
        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Text Content</h3>
          <div style={buttonGroupStyle}>
            <eui-button data-eui-intent="primary">Click me</eui-button>
            <eui-button data-eui-intent="secondary">Save changes</eui-button>
            <eui-button data-eui-intent="accent">Delete item</eui-button>
          </div>
        </div>
      </div>
    );
  }
};

