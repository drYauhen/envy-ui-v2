import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'HTML + CSS/Layout/Details Page',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const DetailsPage: Story = {
  name: 'Details Page Template',
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
              <div className="eui-page-header__breadcrumbs">Home / Projects / Project Alpha</div>
              <div className="eui-page-header__title-row">
                <div className="eui-page-header__title-section">
                  <h1 className="eui-page-header__title">Project Alpha</h1>
                  <p className="eui-page-header__description">Active project with multiple milestones and team members.</p>
                </div>
                <div className="eui-page-header__actions">
                  <div data-eui-slot="primary">
                    <button className="eui-button" data-eui-intent="primary" data-eui-size="md">Edit</button>
                  </div>
                  <div data-eui-slot="secondary">
                    <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Archive</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="eui-page__body">
          <div className="eui-container" data-eui-container="standard">
            <div className="eui-grid" data-eui-cols="3">
              {/* Main Content (2 columns) */}
              <div style={{ gridColumn: 'span 2' }}>
                <div className="eui-stack" data-eui-gap="lg">
                  <div className="eui-section">
                    <h2 className="eui-section__title">Overview</h2>
                    <div className="eui-section__content">
                      <p style={{ margin: 0, lineHeight: 1.6 }}>
                        Project Alpha is a comprehensive initiative focused on improving user experience
                        and system performance. The project includes multiple phases and involves cross-functional
                        teams working together to achieve common goals.
                      </p>
                    </div>
                  </div>
                  <div className="eui-section">
                    <h2 className="eui-section__title">Timeline</h2>
                    <div className="eui-section__content">
                      <div className="eui-stack" data-eui-gap="sm">
                        <div className="eui-inline" data-eui-gap="md" data-eui-justify="between">
                          <span>Start Date</span>
                          <span style={{ fontWeight: 600 }}>2024-01-15</span>
                        </div>
                        <div className="eui-inline" data-eui-gap="md" data-eui-justify="between">
                          <span>End Date</span>
                          <span style={{ fontWeight: 600 }}>2024-12-31</span>
                        </div>
                        <div className="eui-inline" data-eui-gap="md" data-eui-justify="between">
                          <span>Status</span>
                          <span style={{ fontWeight: 600 }}>On Track</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Rail - Metadata (1 column) */}
              <div>
                <div className="eui-section">
                  <h2 className="eui-section__title">Metadata</h2>
                  <div className="eui-section__content">
                    <div className="eui-stack" data-eui-gap="md">
                      <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)', marginBottom: '0.25rem' }}>Owner</div>
                        <div style={{ fontWeight: 600 }}>John Doe</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)', marginBottom: '0.25rem' }}>Team Size</div>
                        <div style={{ fontWeight: 600 }}>12 members</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)', marginBottom: '0.25rem' }}>Budget</div>
                        <div style={{ fontWeight: 600 }}>$250,000</div>
                      </div>
                    </div>
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

