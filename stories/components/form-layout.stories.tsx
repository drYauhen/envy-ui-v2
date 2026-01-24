import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/FormLayout',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/FormLayout'),
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  maxWidth: '640px'
} as const;

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
} as const;

const constrainedStyle = {
  maxWidth: '320px',
  border: '1px dashed var(--eui-color-border-subtle)',
  padding: '1rem',
  borderRadius: '8px'
} as const;

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
} as const;

export const HorizontalDefault: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <form className="eui-form" data-eui-layout="horizontal">
            <div className="eui-form-section">
              <div className="eui-form-section-header" data-eui-slot="header">
                <h3 className="eui-form-section-title">Profile</h3>
                <p className="eui-form-section-subtitle">Basic account details</p>
              </div>
              <div className="eui-form-section-content" data-eui-slot="content">
                <div data-eui-slot="content">
                  <div className="eui-form-row" data-eui-columns="2">
                    <div className="eui-form-field" data-eui-label-position="left">
                      <label className="eui-label" data-eui-slot="label" htmlFor="first-name-html">
                        First name
                      </label>
                      <div data-eui-slot="input">
                        <input className="eui-input" id="first-name-html" placeholder="Ada" />
                      </div>
                    </div>
                    <div className="eui-form-field" data-eui-label-position="left">
                      <label className="eui-label" data-eui-slot="label" htmlFor="last-name-html">
                        Last name
                      </label>
                      <div data-eui-slot="input">
                        <input className="eui-input" id="last-name-html" placeholder="Lovelace" />
                      </div>
                    </div>
                  </div>

                  <div className="eui-form-field" data-eui-label-position="left">
                    <label className="eui-label" data-eui-slot="label" htmlFor="email-html">
                      Email
                    </label>
                    <div data-eui-slot="input">
                      <input className="eui-input" id="email-html" placeholder="name@company.com" />
                    </div>
                    <span data-eui-slot="helper-text">We will only use this for account updates.</span>
                  </div>

                  <fieldset className="eui-form-group" data-eui-orientation="vertical">
                    <legend className="eui-form-group-label" data-eui-slot="label">
                      Notifications
                    </legend>
                    <div className="eui-form-group-items" data-eui-slot="items">
                      <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" className="eui-checkbox" defaultChecked />
                        <span>Email updates</span>
                      </label>
                      <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" className="eui-checkbox" />
                        <span>Product news</span>
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="eui-form-actions" data-eui-align="end">
              <button className="eui-button" data-eui-size="md" data-eui-intent="secondary" style={buttonStyle}>
                Cancel
              </button>
              <button className="eui-button" data-eui-size="md" data-eui-intent="primary" style={buttonStyle}>
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const StackedLayout: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <form className="eui-form" data-eui-layout="stacked">
            <div style={sectionStyle}>
              <div className="eui-form-field" data-eui-label-position="top">
                <label className="eui-label" data-eui-slot="label" htmlFor="company-html">
                  Company name
                </label>
                <div data-eui-slot="input">
                  <input className="eui-input" id="company-html" placeholder="Envy" />
                </div>
              </div>

              <div className="eui-form-field" data-eui-label-position="top" data-eui-error="true">
                <label className="eui-label" data-eui-slot="label" htmlFor="domain-html">
                  Workspace domain
                </label>
                <div data-eui-slot="input">
                  <input className="eui-input" id="domain-html" placeholder="envy-ui" data-eui-state="error" />
                </div>
                <span data-eui-slot="error-text">This domain is already taken.</span>
              </div>

              <div className="eui-form-field" data-eui-label-position="top">
                <label className="eui-label" data-eui-slot="label" htmlFor="timezone-html">
                  Timezone
                </label>
                <div data-eui-slot="input">
                  <input className="eui-input" id="timezone-html" placeholder="UTC" />
                </div>
                <span data-eui-slot="helper-text">Used for scheduling and reports.</span>
              </div>
            </div>
          </form>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const MixedLayout: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <form className="eui-form" data-eui-layout="horizontal">
            <div style={sectionStyle}>
              <div className="eui-form-field" data-eui-label-position="left">
                <label className="eui-label" data-eui-slot="label" htmlFor="project-html">
                  Project
                </label>
                <div data-eui-slot="input">
                  <input className="eui-input" id="project-html" placeholder="Launch" />
                </div>
              </div>

              <div className="eui-form-field" data-eui-label-position="top">
                <label className="eui-label" data-eui-slot="label" htmlFor="notes-html">
                  Notes (stacked override)
                </label>
                <div data-eui-slot="input">
                  <input className="eui-input" id="notes-html" placeholder="Optional" />
                </div>
              </div>

              <div className="eui-form-field" data-eui-label-position="inline">
                <div data-eui-slot="input">
                  <input type="checkbox" className="eui-checkbox" id="archive-html" />
                </div>
                <label className="eui-label" data-eui-slot="label" htmlFor="archive-html">
                  Archive after publish (inline override)
                </label>
              </div>
            </div>
          </form>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const ConstrainedContainer: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={constrainedStyle}>
            <form className="eui-form" data-eui-layout="stacked" data-eui-layout-mode="auto">
              <div style={sectionStyle}>
                <div className="eui-form-field" data-eui-label-position="top">
                  <label className="eui-label" data-eui-slot="label" htmlFor="street-html">
                    Street
                  </label>
                  <div data-eui-slot="input">
                    <input className="eui-input" id="street-html" placeholder="12 Main St" />
                  </div>
                </div>
                <div className="eui-form-row" data-eui-columns="2">
                  <div className="eui-form-field" data-eui-label-position="top">
                    <label className="eui-label" data-eui-slot="label" htmlFor="city-html">
                      City
                    </label>
                    <div data-eui-slot="input">
                      <input className="eui-input" id="city-html" placeholder="Paris" />
                    </div>
                  </div>
                  <div className="eui-form-field" data-eui-label-position="top">
                    <label className="eui-label" data-eui-slot="label" htmlFor="zip-html">
                      ZIP
                    </label>
                    <div data-eui-slot="input">
                      <input className="eui-input" id="zip-html" placeholder="75001" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};
