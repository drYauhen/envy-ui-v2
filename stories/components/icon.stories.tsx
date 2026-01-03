import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '../../src/ui/icons/_icons.css';
import { Icon } from '../../packages/tsx/icon';
import { Button } from '../../src/ui';
import iconMetadata from '../../assets/icons/icon-metadata.json';
import { IconGrid } from '../viewers/components/IconGrid';

const meta: Meta = {
  title: 'HTML + CSS/Components/Icon',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Icon'),
    docs: {
      description: {
        component: `
Icons are organized into two main categories:

- **UI Icons**: General-purpose icons for navigation and actions (search, menu, close, etc.)
- **Semantic Icons**: Application-specific icons representing entities and states (project, plan, warning, etc.)

Use the category sections below to browse icons by purpose.
        `
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
  padding: '1.5rem'
} as const;

const exampleStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  border: '1px solid var(--eui-color-border-default, #e0e0e0)',
  borderRadius: '8px'
} as const;

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
} as const;

/**
 * Overview
 * All available icons in the system displayed in a grid
 */
export const Overview: Story = {
  name: 'Overview',
  render: () => {
    const uiIcons = Object.entries(iconMetadata)
      .filter(([_, meta]: [string, any]) => meta.category === 'ui')
      .map(([name]) => name);
    
    const semanticIcons = Object.entries(iconMetadata)
      .filter(([_, meta]: [string, any]) => meta.category === 'semantic')
      .map(([name]) => name);

    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Icon Library Overview
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
              Icons are categorized by purpose. Use the category sections below to browse specific icon types.
            </p>
          </div>

          {uiIcons.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  UI Icons ({uiIcons.length})
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  General-purpose icons for navigation and actions
                </p>
              </div>
              <IconGrid category="ui" size={48} />
            </div>
          )}

          {semanticIcons.length > 0 && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Semantic Icons ({semanticIcons.length})
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Application-specific icons representing entities and states
                </p>
              </div>
              <IconGrid category="semantic" size={48} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

/**
 * UI Icons
 * General-purpose icons for navigation and actions
 */
export const UIIcons: Story = {
  name: 'UI Icons',
  parameters: {
    docs: {
      description: {
        story: 'General-purpose icons for navigation, actions, and controls. These icons have universal meaning and are used for UI interactions.'
      }
    }
  },
  render: () => {
    const uiIcons = Object.entries(iconMetadata)
      .filter(([_, meta]: [string, any]) => meta.category === 'ui')
      .map(([name, meta]: [string, any]) => ({ name, ...meta }));

    const navigationIcons = uiIcons.filter(icon => icon.subcategory === 'navigation');
    const actionIcons = uiIcons.filter(icon => icon.subcategory === 'actions');
    const controlIcons = uiIcons.filter(icon => icon.subcategory === 'controls');
    const statusIcons = uiIcons.filter(icon => icon.subcategory === 'status');

    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          {navigationIcons.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Navigation
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Icons for navigation and search functionality
                </p>
              </div>
              <IconGrid category="ui" subcategory="navigation" size={48} />
            </div>
          )}

          {actionIcons.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Actions
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Icons for actions and menu controls
                </p>
              </div>
              <IconGrid category="ui" subcategory="actions" size={48} />
            </div>
          )}

          {controlIcons.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Controls
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Icons for form controls and toggles
                </p>
              </div>
              <IconGrid category="ui" subcategory="controls" size={48} />
            </div>
          )}

          {statusIcons.length > 0 && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Status & Time
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Icons for status indicators and time-related information
                </p>
              </div>
              <IconGrid category="ui" subcategory="status" size={48} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

/**
 * Semantic Icons
 * Application-specific icons representing entities and states
 */
export const SemanticIcons: Story = {
  name: 'Semantic Icons',
  parameters: {
    docs: {
      description: {
        story: 'Application-specific icons representing entities, states, and categories. These icons carry semantic meaning within the application context.'
      }
    }
  },
  render: () => {
    const semanticIcons = Object.entries(iconMetadata)
      .filter(([_, meta]: [string, any]) => meta.category === 'semantic')
      .map(([name, meta]: [string, any]) => ({ name, ...meta }));

    if (semanticIcons.length === 0) {
      return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem' }}>
          <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>
            <p style={{ fontSize: '1rem', margin: 0 }}>No semantic icons available yet.</p>
            <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
              Semantic icons will appear here as they are added to the system.
            </p>
          </div>
        </div>
      );
    }

    const entityIcons = semanticIcons.filter(icon => icon.subcategory === 'entity');
    const stateIcons = semanticIcons.filter(icon => icon.subcategory === 'state');
    const categoryIcons = semanticIcons.filter(icon => icon.subcategory === 'category');

    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          {entityIcons.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Entities
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Icons representing application entities (projects, plans, reports, etc.)
                </p>
              </div>
              <IconGrid category="semantic" subcategory="entity" size={48} />
            </div>
          )}

          {stateIcons.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  States
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Icons representing entity states (warning, outdated, active, etc.)
                </p>
              </div>
              <IconGrid category="semantic" subcategory="state" size={48} />
            </div>
          )}

          {categoryIcons.length > 0 && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Categories
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Icons for custom application categories
                </p>
              </div>
              <IconGrid category="semantic" subcategory="category" size={48} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

/**
 * HTML + CSS Layer
 * Icons using data-eui-icon attribute with CSS mask-image
 */
export const HTMLCSS: Story = {
  name: 'HTML + CSS Layer',
  render: () => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3>Basic Usage</h3>
        <div style={rowStyle}>
          <span data-eui-icon="search"></span>
          <span>Search icon (default size)</span>
        </div>
      </div>

      <div style={exampleStyle}>
        <h3>Size Variants</h3>
        <div style={rowStyle}>
          <span data-eui-icon="search" data-eui-size="xs"></span>
          <span>Extra Small (0.75em)</span>
        </div>
        <div style={rowStyle}>
          <span data-eui-icon="search" data-eui-size="sm"></span>
          <span>Small (0.875em)</span>
        </div>
        <div style={rowStyle}>
          <span data-eui-icon="search" data-eui-size="md"></span>
          <span>Medium (1em) - Default</span>
        </div>
        <div style={rowStyle}>
          <span data-eui-icon="search" data-eui-size="lg"></span>
          <span>Large (1.25em)</span>
        </div>
        <div style={rowStyle}>
          <span data-eui-icon="search" data-eui-size="xl"></span>
          <span>Extra Large (1.5em)</span>
        </div>
      </div>

      <div style={exampleStyle}>
        <h3>With currentColor (inherits text color)</h3>
        <div style={rowStyle}>
          <span data-eui-icon="search" style={{ color: 'var(--eui-color-accent-primary, #0066cc)' }}></span>
          <span style={{ color: 'var(--eui-color-accent-primary, #0066cc)' }}>Accent color</span>
        </div>
        <div style={rowStyle}>
          <span data-eui-icon="search" style={{ color: 'var(--eui-color-text-default, #333)' }}></span>
          <span>Default text color</span>
        </div>
      </div>

      <div style={exampleStyle}>
        <h3>In Buttons (HTML + CSS)</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 1rem 0' }}>
          Using <code>data-eui-slot="start-icon"</code> and <code>data-eui-slot="end-icon"</code> slots
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="primary">
              <span data-eui-slot="start-icon">
                <span data-eui-icon="search"></span>
              </span>
              <span data-eui-slot="label">Search</span>
            </button>
            <button className="eui-button" data-eui-intent="primary">
              <span data-eui-slot="label">Search</span>
              <span data-eui-slot="end-icon">
                <span data-eui-icon="search"></span>
              </span>
            </button>
            <button className="eui-button" data-eui-intent="primary">
              <span data-eui-slot="start-icon">
                <span data-eui-icon="search"></span>
              </span>
              <span data-eui-slot="label">Search</span>
              <span data-eui-slot="end-icon">
                <span data-eui-icon="search"></span>
              </span>
            </button>
          </div>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="secondary">
              <span data-eui-slot="start-icon">
                <span data-eui-icon="search"></span>
              </span>
              <span data-eui-slot="label">Search</span>
            </button>
            <button className="eui-button" data-eui-intent="accent">
              <span data-eui-slot="start-icon">
                <span data-eui-icon="search"></span>
              </span>
              <span data-eui-slot="label">Search</span>
            </button>
          </div>
        </div>
      </div>

      <details style={{ marginTop: '1rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '1rem' }}>
          Expand to inspect code
        </summary>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`<!-- Basic usage -->
<span data-eui-icon="search"></span>

<!-- With size variant -->
<span data-eui-icon="search" data-eui-size="lg"></span>

<!-- In button with slots -->
<button class="eui-button" data-eui-intent="primary">
  <span data-eui-slot="start-icon">
    <span data-eui-icon="search"></span>
  </span>
  <span data-eui-slot="label">Search</span>
</button>

<!-- Button with end icon -->
<button class="eui-button" data-eui-intent="primary">
  <span data-eui-slot="label">Search</span>
  <span data-eui-slot="end-icon">
    <span data-eui-icon="search"></span>
  </span>
</button>`}
        </pre>
      </details>
    </div>
  )
};

/**
 * TSX + React Aria Layer
 * Icons using React components
 */
export const TSXReactAria: Story = {
  name: 'TSX + React Aria Layer',
  render: () => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3>Direct Component Usage</h3>
        <div style={rowStyle}>
          <Icon name="search" />
          <span>Default size (16px)</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={20} />
          <span>Custom size (20px)</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={24} color="var(--eui-color-accent-primary, #0066cc)" />
          <span>Custom color</span>
        </div>
      </div>

      <div style={exampleStyle}>
        <h3>Via Icon Component</h3>
        <div style={rowStyle}>
          <Icon name="search" />
          <span>Using Icon component</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={20} />
          <span>With custom size</span>
        </div>
      </div>

      <div style={exampleStyle}>
        <h3>In Buttons (TSX + React Aria)</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 1rem 0' }}>
          Using <code>startIcon</code> and <code>endIcon</code> props
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={rowStyle}>
            <Button intent="primary" startIcon={<Icon name="plus-circle" size={16} />}>
              Add
            </Button>
            <Button intent="primary" endIcon={<Icon name="external-link" size={16} />}>
              Open
            </Button>
            <Button intent="primary" startIcon={<Icon name="plus-circle" size={16} />} endIcon={<Icon name="external-link" size={16} />}>
              Add & Open
            </Button>
          </div>
          <div style={rowStyle}>
            <Button intent="secondary" startIcon={<Icon name="plus-circle" size={16} />}>
              Add
            </Button>
            <Button intent="accent" startIcon={<Icon name="plus-circle" size={16} />}>
              Add
            </Button>
          </div>
        </div>
      </div>

      <details style={{ marginTop: '1rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '1rem' }}>
          Expand to inspect code
        </summary>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`// Direct component usage
// Universal Icon component
import { Icon } from '@envy-ui/tsx/icon';
import { getSectionParameters } from '../../.storybook/preview';

// Basic usage
<Icon name="search" />
<Icon name="search" size={20} />
<Icon name="search" size={24} color="var(--eui-color-accent-primary)" />

// Different icons
<Icon name="search" size={16} />
<Icon name="ellipsis-v" size={16} />

// In button with startIcon prop
<Button intent="primary" startIcon={<Icon name="plus-circle" size={16} />}>
  Add
</Button>

// Button with endIcon prop
<Button intent="primary" endIcon={<Icon name="external-link" size={16} />}>
  Open
</Button>

// Button with both icons
<Button intent="primary" startIcon={<Icon name="plus-circle" size={16} />} endIcon={<Icon name="external-link" size={16} />}>
  Add & Open
</Button>`}
        </pre>
      </details>
    </div>
  )
};

