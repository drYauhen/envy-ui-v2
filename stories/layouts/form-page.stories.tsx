import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'HTML + CSS/Layout/Form Page',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const FormPage: Story = {
  name: 'Form Page Template',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    },
    layout: 'fullscreen'
  },
  render: () => (
    <div data-eui-context="app">
      <div className="eui-page">
        <div className="eui-page__header">
          <div className="eui-container" data-eui-container="standard">
            <div className="eui-page-header">
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
        <div className="eui-page__body">
          <div className="eui-container" data-eui-container="standard">
            <div className="eui-stack" data-eui-gap="lg">
              <div className="eui-section">
                <h2 className="eui-section__title">Basic Information</h2>
                <div className="eui-section__content">
                  <div className="eui-form-field">
                    <label data-eui-slot="label">Project Name</label>
                    <input data-eui-slot="input" className="eui-input" type="text" placeholder="Enter project name" />
                  </div>
                  <div className="eui-form-field">
                    <label data-eui-slot="label">Description</label>
                    <textarea data-eui-slot="input" className="eui-textarea" placeholder="Enter project description" rows={4} />
                  </div>
                </div>
              </div>
              <div className="eui-section">
                <h2 className="eui-section__title">Project Details</h2>
                <div className="eui-section__content">
                  <div className="eui-grid" data-eui-cols="2">
                    <div className="eui-form-field">
                      <label data-eui-slot="label">Start Date</label>
                      <input data-eui-slot="input" className="eui-input" type="date" />
                    </div>
                    <div className="eui-form-field">
                      <label data-eui-slot="label">End Date</label>
                      <input data-eui-slot="input" className="eui-input" type="date" />
                    </div>
                  </div>
                  <div className="eui-form-field">
                    <label data-eui-slot="label">Status</label>
                    <select data-eui-slot="input" className="eui-select">
                      <option>Pending</option>
                      <option>On Track</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

