/// <reference path="../../packages/web-components/button/button.d.ts" />

import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentPropsWithoutRef } from 'react';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { useEffect } from 'react';
import '../../packages/web-components/button'; // Registers the custom element

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

const tokenBridgeStyles = `
  eui-button.eui-button {
    --eui-button-primary-background-base: var(--eui-button-colors-background);
    --eui-button-primary-label-base: var(--eui-button-colors-text);
    --eui-button-primary-border-base: var(--eui-button-colors-border);
    --eui-button-secondary-background-base: var(--eui-button-colors-background);
    --eui-button-secondary-label-base: var(--eui-button-colors-text);
    --eui-button-secondary-border-base: var(--eui-button-colors-border);
    --eui-button-accent-background-base: var(--eui-button-colors-background);
    --eui-button-accent-label-base: var(--eui-button-colors-text);
    --eui-button-accent-border-base: var(--eui-button-colors-border);
    --eui-button-primary-background-selected: var(--eui-button-colors-background);
    --eui-button-primary-label-selected: var(--eui-button-colors-text);
    --eui-button-secondary-background-selected: var(--eui-button-colors-background);
    --eui-button-secondary-label-selected: var(--eui-button-colors-text);
    --eui-button-accent-background-selected: var(--eui-button-colors-background);
    --eui-button-accent-label-selected: var(--eui-button-colors-text);
    --eui-button-layout-default-flex-grow: var(--eui-button-layout-flex-grow);
    --eui-button-layout-default-flex-shrink: var(--eui-button-layout-flex-shrink);
    --eui-button-layout-default-flex-basis: var(--eui-button-layout-flex-basis);
    --eui-button-layout-default-white-space: var(--eui-button-layout-whiteSpace);
  }
`;

const EuiButton = (props: ComponentPropsWithoutRef<'eui-button'>) => (
  <eui-button className="eui-button" {...props} />
);

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
      <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
        <style>{tokenBridgeStyles}</style>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Primary Buttons</h3>
          <div style={buttonGroupStyle}>
            <EuiButton data-eui-intent="primary">Primary</EuiButton>
            <EuiButton data-eui-intent="primary" disabled>Disabled</EuiButton>
            <EuiButton data-eui-intent="primary" data-eui-selected>Selected</EuiButton>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Secondary Buttons</h3>
          <div style={buttonGroupStyle}>
            <EuiButton data-eui-intent="secondary">Secondary</EuiButton>
            <EuiButton data-eui-intent="secondary" disabled>Disabled</EuiButton>
            <EuiButton data-eui-intent="secondary" data-eui-selected>Selected</EuiButton>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Accent Buttons</h3>
          <div style={buttonGroupStyle}>
            <EuiButton data-eui-intent="accent">Accent</EuiButton>
            <EuiButton data-eui-intent="accent" disabled>Disabled</EuiButton>
            <EuiButton data-eui-intent="accent" data-eui-selected>Selected</EuiButton>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Sizes</h3>
          <div style={buttonGroupStyle}>
            <EuiButton data-eui-intent="primary" data-eui-size="sm">Small</EuiButton>
            <EuiButton data-eui-intent="primary" data-eui-size="md">Medium</EuiButton>
            <EuiButton data-eui-intent="primary" data-eui-size="lg">Large</EuiButton>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Shapes</h3>
          <div style={buttonGroupStyle}>
            <EuiButton data-eui-intent="primary" data-eui-shape="default">Default</EuiButton>
            <EuiButton data-eui-intent="primary" data-eui-shape="round">Round</EuiButton>
            <EuiButton data-eui-intent="primary" data-eui-shape="circle">○</EuiButton>
          </div>
        </div>
      
        </div>
      )}
    </MultiContextViewer>
    );
  }
};

export const States: Story = {
  name: 'Button States',
  render: () => {
    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
        <style>{tokenBridgeStyles}</style>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Interactive States</h3>
          <p style={{ margin: '0 0 1rem', color: '#64748b', fontSize: '14px' }}>
            Hover, focus, and active states are handled by CSS. Disabled state prevents interaction.
          </p>
          <div style={buttonGroupStyle}>
            <EuiButton data-eui-intent="primary">Normal</EuiButton>
            <EuiButton data-eui-intent="primary" disabled>Disabled</EuiButton>
            <EuiButton data-eui-intent="primary" data-eui-selected>Selected</EuiButton>
          </div>
        </div>
      
        </div>
      )}
    </MultiContextViewer>
    );
  }
};

export const WithContent: Story = {
  name: 'Button with Content',
  render: () => {
    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
        <style>{tokenBridgeStyles}</style>

        <div style={sectionStyle}>
          <h3 style={{ margin: 0 }}>Text Content</h3>
          <div style={buttonGroupStyle}>
            <EuiButton data-eui-intent="primary">Click me</EuiButton>
            <EuiButton data-eui-intent="secondary">Save changes</EuiButton>
            <EuiButton data-eui-intent="accent">Delete item</EuiButton>
          </div>
        </div>
      
        </div>
      )}
    </MultiContextViewer>
    );
  }
};
