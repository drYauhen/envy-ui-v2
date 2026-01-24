import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

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
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
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
      )}
    </MultiContextViewer>
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
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
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
      )}
    </MultiContextViewer>
  )
};

export const InputDate: Story = {
  name: 'Date (native + segmented)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Date Inputs</h3>
            <div style={formGroupStyle}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="eui-label">Native date input</span>
                <input type="date" className="eui-input" style={{ width: '180px' }} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="eui-label">Segmented date field (non-native)</span>
                <div
                  className="eui-input"
                  data-eui-input-kind="date"
                  role="textbox"
                  aria-label="Date"
                  style={{ width: '180px' }}
                >
                  <span className="eui-input-segment" data-eui-placeholder="">
                    MM
                  </span>
                  <span className="eui-input-segment" aria-hidden="true">
                    /
                  </span>
                  <span className="eui-input-segment" data-eui-placeholder="">
                    DD
                  </span>
                  <span className="eui-input-segment" aria-hidden="true">
                    /
                  </span>
                  <span className="eui-input-segment" data-eui-placeholder="">
                    YYYY
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const InputWithIcons: Story = {
  name: 'With icons',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Input with icons (visual only)</h3>
            <div style={formGroupStyle}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="eui-label">Search (leading icon)</span>
                <div className="eui-input-group" data-eui-size="md">
                  <span className="eui-input-prefix" data-eui-slot="prefix" aria-hidden="true">
                    <span data-eui-icon="search" data-eui-size="sm" />
                  </span>
                  <input
                    type="text"
                    className="eui-input"
                    data-eui-size="md"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="eui-label">Date (trailing icon)</span>
                <div className="eui-input-group" data-eui-size="md" style={{ width: '220px' }}>
                  <input
                    type="text"
                    className="eui-input"
                    data-eui-size="md"
                    placeholder="MM/DD/YYYY"
                    aria-label="Date"
                  />
                  <span className="eui-input-suffix" data-eui-slot="suffix" aria-hidden="true">
                    <span data-eui-icon="calendar-alt" data-eui-size="sm" />
                  </span>
                </div>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="eui-label">Clearable (trailing action)</span>
                <div className="eui-input-group" data-eui-size="md">
                  <input
                    type="text"
                    className="eui-input"
                    data-eui-size="md"
                    defaultValue="Clear me"
                    aria-label="Clearable"
                  />
                  <span className="eui-input-suffix" data-eui-slot="suffix">
                    <button type="button" aria-label="Clear">
                      <span data-eui-icon="trash" data-eui-size="sm" />
                    </button>
                  </span>
                </div>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="eui-label">Leading + trailing icons</span>
                <div className="eui-input-group" data-eui-size="md">
                  <span className="eui-input-prefix" data-eui-slot="prefix" aria-hidden="true">
                    <span data-eui-icon="search" data-eui-size="sm" />
                  </span>
                  <input
                    type="text"
                    className="eui-input"
                    data-eui-size="md"
                    placeholder="Search query"
                    aria-label="Search query"
                  />
                  <span className="eui-input-suffix" data-eui-slot="suffix">
                    <button type="button" aria-label="Clear search">
                      <span data-eui-icon="trash" data-eui-size="sm" />
                    </button>
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const InputContexts: Story = {
  name: 'Contexts (App vs Report)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer
      contexts={[
        { context: 'app' },
        { context: 'report' }
      ]}
    >
      {(context) => (
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>
            {context === 'app' ? 'Application Context (Interactive)' : 'Report Context (Print Style)'}
          </h3>
          <div style={formGroupStyle}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="eui-label">
                {context === 'app' ? 'Interactive input' : 'Static input (print)'}
              </span>
              <input
                type="text"
                className="eui-input"
                placeholder={context === 'app' ? 'Type here' : undefined}
                defaultValue={context === 'report' ? 'Printed value' : undefined}
                disabled={context === 'report'}
              />
            </label>
          </div>
        </div>
      )}
    </MultiContextViewer>
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
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
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
      )}
    </MultiContextViewer>
  )
};
