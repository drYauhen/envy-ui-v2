import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Switch',
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
  gap: '0.75rem'
} as const;

const rowStyle = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap',
  alignItems: 'center'
} as const;

export const SwitchStates: Story = {
  name: 'States',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Switch'),
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
            <h3 style={sectionTitleStyle}>Switch States</h3>
            <div style={formGroupStyle}>
              <label className="eui-switch-wrapper">
                <input type="checkbox" className="eui-switch" />
                <span className="eui-label">Off (unchecked)</span>
              </label>

              <label className="eui-switch-wrapper">
                <input type="checkbox" className="eui-switch" defaultChecked />
                <span className="eui-label">On (checked)</span>
              </label>

              <label className="eui-switch-wrapper">
                <input type="checkbox" className="eui-switch" disabled />
                <span className="eui-label">Disabled (off)</span>
              </label>

              <label className="eui-switch-wrapper">
                <input type="checkbox" className="eui-switch" defaultChecked disabled />
                <span className="eui-label">Disabled (on)</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const SwitchSizes: Story = {
  name: 'Sizes',
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
            <h3 style={sectionTitleStyle}>Switch Sizes</h3>
            <div style={formGroupStyle}>
              <div style={rowStyle}>
                <label className="eui-switch-wrapper">
                  <input type="checkbox" className="eui-switch" data-eui-size="sm" />
                  <span className="eui-label">Small</span>
                </label>

                <label className="eui-switch-wrapper">
                  <input type="checkbox" className="eui-switch" data-eui-size="sm" defaultChecked />
                  <span className="eui-label">Small (on)</span>
                </label>
              </div>

              <div style={rowStyle}>
                <label className="eui-switch-wrapper">
                  <input type="checkbox" className="eui-switch" data-eui-size="md" />
                  <span className="eui-label">Medium (default)</span>
                </label>

                <label className="eui-switch-wrapper">
                  <input type="checkbox" className="eui-switch" data-eui-size="md" defaultChecked />
                  <span className="eui-label">Medium (on)</span>
                </label>
              </div>

              <div style={rowStyle}>
                <label className="eui-switch-wrapper">
                  <input type="checkbox" className="eui-switch" data-eui-size="lg" />
                  <span className="eui-label">Large</span>
                </label>

                <label className="eui-switch-wrapper">
                  <input type="checkbox" className="eui-switch" data-eui-size="lg" defaultChecked />
                  <span className="eui-label">Large (on)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const SwitchExample: Story = {
  name: 'Example Usage',
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
            <h3 style={sectionTitleStyle}>Settings Example</h3>
            <div style={formGroupStyle}>
              <label className="eui-switch-wrapper">
                <input type="checkbox" className="eui-switch" defaultChecked />
                <span className="eui-label">Email notifications</span>
              </label>

              <label className="eui-switch-wrapper">
                <input type="checkbox" className="eui-switch" defaultChecked />
                <span className="eui-label">Push notifications</span>
              </label>

              <label className="eui-switch-wrapper">
                <input type="checkbox" className="eui-switch" />
                <span className="eui-label">SMS notifications</span>
              </label>

              <label className="eui-switch-wrapper">
                <input type="checkbox" className="eui-switch" disabled />
                <span className="eui-label">Beta features (disabled)</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const SwitchContexts: Story = {
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
            <label className="eui-switch-wrapper">
              <input
                type="checkbox"
                className="eui-switch"
                disabled={context === 'report'}
              />
              <span className="eui-label">
                {context === 'app' ? 'Interactive switch' : 'Static switch (off)'}
              </span>
            </label>

            <label className="eui-switch-wrapper">
              <input
                type="checkbox"
                className="eui-switch"
                defaultChecked
                disabled={context === 'report'}
              />
              <span className="eui-label">
                {context === 'app' ? 'Interactive switch (on)' : 'Static switch (on)'}
              </span>
            </label>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};





