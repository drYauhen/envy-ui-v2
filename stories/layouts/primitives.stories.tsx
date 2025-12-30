import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'HTML + CSS/Layout/Primitives',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

export const Container: Story = {
  name: 'Container Variants',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div data-eui-context="app" style={containerStyle}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Container Variants</h3>
        <div className="eui-stack" data-eui-gap="lg">
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Standard (960px max-width)</h4>
            <div className="eui-container" data-eui-container="standard" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ margin: 0 }}>This container has a max-width of 960px, optimized for forms and detail pages.</p>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Wide (100% width)</h4>
            <div className="eui-container" data-eui-container="wide" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ margin: 0 }}>This container takes full width, optimized for tables and dashboards.</p>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Fluid (no max-width)</h4>
            <div className="eui-container" data-eui-container="fluid" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ margin: 0 }}>This container has no max-width constraint.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Stack: Story = {
  name: 'Stack (Vertical Layout)',
  render: () => (
    <div data-eui-context="app" style={containerStyle}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Stack - Gap Variants</h3>
        <div className="eui-stack" data-eui-gap="md">
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>xs gap</h4>
            <div className="eui-stack" data-eui-gap="xs" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 1</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 2</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 3</div>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>md gap</h4>
            <div className="eui-stack" data-eui-gap="md" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 1</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 2</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 3</div>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>lg gap</h4>
            <div className="eui-stack" data-eui-gap="lg" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 1</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 2</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Inline: Story = {
  name: 'Inline (Horizontal Layout)',
  render: () => (
    <div data-eui-context="app" style={containerStyle}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Inline - Gap and Justify Variants</h3>
        <div className="eui-stack" data-eui-gap="lg">
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>sm gap, start justify</h4>
            <div className="eui-inline" data-eui-gap="sm" data-eui-justify="start" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 1</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 2</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 3</div>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>md gap, between justify</h4>
            <div className="eui-inline" data-eui-gap="md" data-eui-justify="between" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Left</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Right</div>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>md gap, wrap enabled</h4>
            <div className="eui-inline" data-eui-gap="md" data-eui-wrap="true" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px', maxWidth: '400px' }}>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 1</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 2</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 3</div>
              <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '4px' }}>Item 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Grid: Story = {
  name: 'Grid',
  render: () => (
    <div data-eui-context="app" style={containerStyle}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Grid - Column Presets</h3>
        <div className="eui-stack" data-eui-gap="lg">
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>2 columns</h4>
            <div className="eui-grid" data-eui-cols="2" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 1</div>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 2</div>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 3</div>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 4</div>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>3 columns</h4>
            <div className="eui-grid" data-eui-cols="3" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 1</div>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 2</div>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 3</div>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>4 columns</h4>
            <div className="eui-grid" data-eui-cols="4" style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 1</div>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 2</div>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 3</div>
              <div style={{ background: '#cbd5e1', padding: '1rem', borderRadius: '4px' }}>Item 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Toolbar: Story = {
  name: 'Toolbar',
  render: () => (
    <div data-eui-context="app" style={containerStyle}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Toolbar with Left, Center, Right Sections</h3>
        <div className="eui-stack" data-eui-gap="lg">
          <div className="eui-toolbar" style={{ background: '#f1f5f9', borderRadius: '8px' }}>
            <div className="eui-toolbar__left">
              <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Left Action</button>
            </div>
            <div className="eui-toolbar__center">
              <span style={{ color: '#64748b' }}>Center Content</span>
            </div>
            <div className="eui-toolbar__right">
              <button className="eui-button" data-eui-intent="primary" data-eui-size="md">Right Action</button>
            </div>
          </div>
          <div className="eui-toolbar" style={{ background: '#f1f5f9', borderRadius: '8px' }}>
            <div className="eui-toolbar__left">
              <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Filter</button>
              <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Sort</button>
            </div>
            <div className="eui-toolbar__right">
              <button className="eui-button" data-eui-intent="primary" data-eui-size="md">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const PageHeader: Story = {
  name: 'Page Header',
  render: () => (
    <div data-eui-context="app" style={containerStyle}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Page Header with Title, Description, and Actions</h3>
        <div className="eui-stack" data-eui-gap="lg">
          <div className="eui-page-header">
            <div className="eui-page-header__title-row">
              <div className="eui-page-header__title-section">
                <h1 className="eui-page-header__title">Page Title</h1>
                <p className="eui-page-header__description">This is a description of the page content and purpose.</p>
              </div>
              <div className="eui-page-header__actions">
                <div data-eui-slot="primary">
                  <button className="eui-button" data-eui-intent="primary" data-eui-size="md">Primary Action</button>
                </div>
                <div data-eui-slot="secondary">
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Secondary</button>
                </div>
              </div>
            </div>
          </div>
          <div className="eui-page-header">
            <div className="eui-page-header__breadcrumbs">Home / Projects / Create</div>
            <div className="eui-page-header__title-row">
              <div className="eui-page-header__title-section">
                <h1 className="eui-page-header__title">Create New Project</h1>
                <p className="eui-page-header__description">Fill in the form below to create a new project in the system.</p>
              </div>
              <div className="eui-page-header__actions">
                <div data-eui-slot="primary">
                  <button className="eui-button" data-eui-intent="primary" data-eui-size="md">Save</button>
                </div>
                <div data-eui-slot="secondary">
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Section: Story = {
  name: 'Section',
  render: () => (
    <div data-eui-context="app" style={containerStyle}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Section with Title and Content</h3>
        <div className="eui-section" style={{ background: '#f1f5f9', borderRadius: '8px' }}>
          <h2 className="eui-section__title">Section Title</h2>
          <div className="eui-section__content">
            <p style={{ margin: 0 }}>This is section content. Sections provide consistent spacing and structure for grouping related content.</p>
            <p style={{ margin: 0 }}>Multiple paragraphs or elements can be placed in the section content area.</p>
          </div>
        </div>
      </div>
    </div>
  )
};

