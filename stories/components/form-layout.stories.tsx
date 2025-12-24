import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'HTML + CSS/Components/FormLayout',
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

// FormField Examples
export const FormFieldBasic: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-field">
        <span className="eui-label" data-eui-slot="label">First Name</span>
        <input type="text" className="eui-input" data-eui-slot="input" placeholder="Enter your first name" />
        <span data-eui-slot="helper-text">This is your given name</span>
      </div>

      <div className="eui-form-field">
        <span className="eui-label" data-eui-slot="label">Email Address</span>
        <input type="email" className="eui-input" data-eui-slot="input" placeholder="your@email.com" />
        <span data-eui-slot="helper-text">We'll never share your email</span>
      </div>
    </div>
  )
};

export const FormFieldWithError: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-field" data-eui-error="true">
        <span className="eui-label" data-eui-slot="label">Email Address</span>
        <input type="email" className="eui-input" data-eui-slot="input" placeholder="your@email.com" value="invalid-email" />
        <span data-eui-slot="error-text">Please enter a valid email address</span>
      </div>
    </div>
  )
};

export const FormFieldLabelPositions: Story = {
  render: () => (
    <div data-eui-context="app" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="eui-form-field" data-eui-label-position="top">
        <span className="eui-label" data-eui-slot="label">Top Label</span>
        <input type="text" className="eui-input" data-eui-slot="input" placeholder="Label on top" />
      </div>

      <div className="eui-form-field" data-eui-label-position="left">
        <span className="eui-label" data-eui-slot="label">Left Label</span>
        <input type="text" className="eui-input" data-eui-slot="input" placeholder="Label on left" />
      </div>

      <div className="eui-form-field" data-eui-label-position="inline">
        <input type="checkbox" className="eui-checkbox" data-eui-slot="input" id="inline-checkbox" />
        <label className="eui-label" data-eui-slot="label" htmlFor="inline-checkbox">Inline Label</label>
      </div>
    </div>
  )
};

// FormSection Examples
export const FormSectionBasic: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-section">
        <div className="eui-form-section-header" data-eui-slot="header">
          <h3 className="eui-form-section-title">Personal Information</h3>
        </div>
        <div className="eui-form-section-content" data-eui-slot="content">
          <div data-eui-slot="content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="eui-form-field">
              <span className="eui-label" data-eui-slot="label">First Name</span>
              <input type="text" className="eui-input" data-eui-slot="input" />
            </div>
            <div className="eui-form-field">
              <span className="eui-label" data-eui-slot="label">Last Name</span>
              <input type="text" className="eui-input" data-eui-slot="input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const FormSectionCollapsible: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-section" data-eui-collapsible="true" data-eui-expanded="false">
        <button className="eui-form-section-header" data-eui-slot="header" aria-expanded="false">
          <div className="eui-form-section-header-content" data-eui-slot="header-content">
            <h3 className="eui-form-section-title">Collapsed Section</h3>
          </div>
          <span className="eui-form-section-chevron" data-eui-slot="header-chevron" aria-hidden="true">
            <span data-eui-icon="chevron-down"></span>
          </span>
        </button>
        <div className="eui-form-section-content" data-eui-slot="content" hidden>
          <div data-eui-slot="content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="eui-form-field">
              <span className="eui-label" data-eui-slot="label">Field 1</span>
              <input type="text" className="eui-input" data-eui-slot="input" />
            </div>
          </div>
        </div>
      </div>

      <div className="eui-form-section" data-eui-collapsible="true" data-eui-expanded="true" style={{ marginTop: '1.5rem' }}>
        <button className="eui-form-section-header" data-eui-slot="header" aria-expanded="true">
          <div className="eui-form-section-header-content" data-eui-slot="header-content">
            <h3 className="eui-form-section-title">Expanded Section</h3>
          </div>
          <span className="eui-form-section-chevron" data-eui-slot="header-chevron" aria-hidden="true">
            <span data-eui-icon="chevron-down"></span>
          </span>
        </button>
        <div className="eui-form-section-content" data-eui-slot="content">
          <div data-eui-slot="content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="eui-form-field">
              <span className="eui-label" data-eui-slot="label">Field 1</span>
              <input type="text" className="eui-input" data-eui-slot="input" />
            </div>
            <div className="eui-form-field">
              <span className="eui-label" data-eui-slot="label">Field 2</span>
              <input type="text" className="eui-input" data-eui-slot="input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const FormSectionWithHeaderContent: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-section" data-eui-collapsible="true" data-eui-expanded="true">
        <button className="eui-form-section-header" data-eui-slot="header" aria-expanded="true">
          <div className="eui-form-section-header-content" data-eui-slot="header-content">
            <h3 className="eui-form-section-title">Team Members</h3>
            <div className="eui-form-section-header-extra" data-eui-slot="header-extra">
              <img src="https://i.pravatar.cc/40?img=1" alt="" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
              <span style={{ 
                fontSize: '0.75rem', 
                padding: '0.125rem 0.5rem', 
                background: 'var(--eui-color-accent-100)', 
                borderRadius: '999px',
                color: 'var(--eui-color-accent-900)'
              }}>5 members</span>
            </div>
          </div>
          <span className="eui-form-section-chevron" data-eui-slot="header-chevron" aria-hidden="true">
            <span data-eui-icon="chevron-down"></span>
          </span>
        </button>
        <div className="eui-form-section-content" data-eui-slot="content">
          <div data-eui-slot="content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="eui-form-field">
              <span className="eui-label" data-eui-slot="label">Team Name</span>
              <input type="text" className="eui-input" data-eui-slot="input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// FormRow Examples
export const FormRowTwoColumns: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-row" data-eui-columns="2">
        <div className="eui-form-field">
          <span className="eui-label" data-eui-slot="label">First Name</span>
          <input type="text" className="eui-input" data-eui-slot="input" />
        </div>
        <div className="eui-form-field">
          <span className="eui-label" data-eui-slot="label">Last Name</span>
          <input type="text" className="eui-input" data-eui-slot="input" />
        </div>
      </div>
    </div>
  )
};

export const FormRowThreeColumns: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-row" data-eui-columns="3">
        <div className="eui-form-field">
          <span className="eui-label" data-eui-slot="label">Day</span>
          <input type="text" className="eui-input" data-eui-slot="input" placeholder="DD" />
        </div>
        <div className="eui-form-field">
          <span className="eui-label" data-eui-slot="label">Month</span>
          <input type="text" className="eui-input" data-eui-slot="input" placeholder="MM" />
        </div>
        <div className="eui-form-field">
          <span className="eui-label" data-eui-slot="label">Year</span>
          <input type="text" className="eui-input" data-eui-slot="input" placeholder="YYYY" />
        </div>
      </div>
    </div>
  )
};

// FormGroup Examples
export const FormGroupVertical: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-group" data-eui-orientation="vertical">
        <div className="eui-form-group-label" data-eui-slot="label">Notification Preferences</div>
        <div className="eui-form-group-items" data-eui-slot="items">
          <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" className="eui-checkbox" />
            <span>Email notifications</span>
          </label>
          <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" className="eui-checkbox" />
            <span>SMS notifications</span>
          </label>
          <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" className="eui-checkbox" />
            <span>Push notifications</span>
          </label>
        </div>
      </div>
    </div>
  )
};

export const FormGroupHorizontal: Story = {
  render: () => (
    <div data-eui-context="app">
      <div className="eui-form-group" data-eui-orientation="horizontal">
        <div className="eui-form-group-label" data-eui-slot="label">Payment Method</div>
        <div className="eui-form-group-items" data-eui-slot="items">
          <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" name="payment" className="eui-radio" />
            <span>Credit Card</span>
          </label>
          <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" name="payment" className="eui-radio" />
            <span>PayPal</span>
          </label>
          <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" name="payment" className="eui-radio" />
            <span>Bank Transfer</span>
          </label>
        </div>
      </div>
    </div>
  )
};

// Complex Form Example
export const ComplexFormExample: Story = {
  render: () => (
    <div data-eui-context="app" style={{ maxWidth: '600px' }}>
      <div className="eui-form-section" data-eui-collapsible="true" data-eui-expanded="true">
        <button className="eui-form-section-header" data-eui-slot="header" aria-expanded="true">
          <div className="eui-form-section-header-content" data-eui-slot="header-content">
            <h3 className="eui-form-section-title">Personal Information</h3>
          </div>
          <span className="eui-form-section-chevron" data-eui-slot="header-chevron" aria-hidden="true">
            <span data-eui-icon="chevron-down"></span>
          </span>
        </button>
        <div className="eui-form-section-content" data-eui-slot="content">
          <div data-eui-slot="content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="eui-form-row" data-eui-columns="2">
              <div className="eui-form-field">
                <span className="eui-label" data-eui-slot="label">First Name</span>
                <input type="text" className="eui-input" data-eui-slot="input" />
              </div>
              <div className="eui-form-field">
                <span className="eui-label" data-eui-slot="label">Last Name</span>
                <input type="text" className="eui-input" data-eui-slot="input" />
              </div>
            </div>
            <div className="eui-form-field">
              <span className="eui-label" data-eui-slot="label">Email</span>
              <input type="email" className="eui-input" data-eui-slot="input" />
              <span data-eui-slot="helper-text">We'll never share your email</span>
            </div>
          </div>
        </div>
      </div>

      <div className="eui-form-section" data-eui-collapsible="true" data-eui-expanded="false" style={{ marginTop: '1.5rem' }}>
        <button className="eui-form-section-header" data-eui-slot="header" aria-expanded="false">
          <div className="eui-form-section-header-content" data-eui-slot="header-content">
            <h3 className="eui-form-section-title">Preferences</h3>
          </div>
          <span className="eui-form-section-chevron" data-eui-slot="header-chevron" aria-hidden="true">
            <span data-eui-icon="chevron-down"></span>
          </span>
        </button>
        <div className="eui-form-section-content" data-eui-slot="content" hidden>
          <div data-eui-slot="content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="eui-form-group" data-eui-orientation="vertical">
              <div className="eui-form-group-label" data-eui-slot="label">Notification Types</div>
              <div className="eui-form-group-items" data-eui-slot="items">
                <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" className="eui-checkbox" />
                  <span>Email</span>
                </label>
                <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" className="eui-checkbox" />
                  <span>SMS</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


