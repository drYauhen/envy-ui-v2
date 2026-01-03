import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/AlertBanner',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/AlertBanner'),
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <div className="eui-alert-banner" data-eui-variant="info" data-eui-dismissible="true" data-eui-id="info-1">
        <div className="eui-alert-banner-content">
          <span className="eui-alert-banner-icon" aria-hidden="true">
            <span data-eui-icon="info-circle" data-eui-size="md"></span>
          </span>
          <div className="eui-alert-banner-message">
            <p className="eui-alert-banner-text">New feature available! Check out our updated dashboard.</p>
            <a href="#" className="eui-alert-banner-link">Learn more</a>
          </div>
        </div>
        <div className="eui-alert-banner-actions">
          <button className="eui-alert-banner-dismiss" aria-label="Dismiss">
            <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
          </button>
        </div>
      </div>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This is your application content. The alert banner appears above everything.</p>
      </div>
    </div>
  )
};

export const Warning: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <div className="eui-alert-banner" data-eui-variant="warning" data-eui-dismissible="true" data-eui-id="warning-1">
        <div className="eui-alert-banner-content">
          <span className="eui-alert-banner-icon" aria-hidden="true">
            <span data-eui-icon="exclamation-circle" data-eui-size="md"></span>
          </span>
          <div className="eui-alert-banner-message">
            <p className="eui-alert-banner-text">Database migration in progress for Australia region</p>
            <a href="#" className="eui-alert-banner-link">Learn more</a>
          </div>
        </div>
        <div className="eui-alert-banner-actions">
          <button className="eui-alert-banner-dont-show">Don't show again</button>
          <button className="eui-alert-banner-dismiss" aria-label="Dismiss">
            <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
          </button>
        </div>
      </div>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This warning banner indicates a system-wide announcement.</p>
      </div>
    </div>
  )
};

export const Error: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <div className="eui-alert-banner" data-eui-variant="error" data-eui-dismissible="true" data-eui-id="error-1">
        <div className="eui-alert-banner-content">
          <span className="eui-alert-banner-icon" aria-hidden="true">
            <span data-eui-icon="exclamation-circle" data-eui-size="md"></span>
          </span>
          <div className="eui-alert-banner-message">
            <p className="eui-alert-banner-text">Service outage expected tonight at 2 AM</p>
          </div>
        </div>
        <div className="eui-alert-banner-actions">
          <button className="eui-alert-banner-dismiss" aria-label="Dismiss">
            <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
          </button>
        </div>
      </div>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This error banner indicates a critical system issue.</p>
      </div>
    </div>
  )
};

export const Success: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <div className="eui-alert-banner" data-eui-variant="success" data-eui-dismissible="true" data-eui-id="success-1">
        <div className="eui-alert-banner-content">
          <span className="eui-alert-banner-icon" aria-hidden="true">
            <span data-eui-icon="check-circle" data-eui-size="md"></span>
          </span>
          <div className="eui-alert-banner-message">
            <p className="eui-alert-banner-text">System update completed successfully</p>
          </div>
        </div>
        <div className="eui-alert-banner-actions">
          <button className="eui-alert-banner-dismiss" aria-label="Dismiss">
            <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
          </button>
        </div>
      </div>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This success banner confirms a positive system update.</p>
      </div>
    </div>
  )
};

export const WithDontShowAgain: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <div className="eui-alert-banner" data-eui-variant="warning" data-eui-dismissible="true" data-eui-id="persistent-1">
        <div className="eui-alert-banner-content">
          <span className="eui-alert-banner-icon" aria-hidden="true">
            <span data-eui-icon="exclamation-circle" data-eui-size="md"></span>
          </span>
          <div className="eui-alert-banner-message">
            <p className="eui-alert-banner-text">Scheduled maintenance tonight at 2 AM for Australia region</p>
            <a href="#" className="eui-alert-banner-link">View maintenance window</a>
          </div>
        </div>
        <div className="eui-alert-banner-actions">
          <button className="eui-alert-banner-dont-show">Don't show again</button>
          <button className="eui-alert-banner-dismiss" aria-label="Dismiss">
            <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
          </button>
        </div>
      </div>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This banner includes "Don't show again" option for persistent dismissal.</p>
      </div>
    </div>
  )
};

export const NonDismissible: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <div className="eui-alert-banner" data-eui-variant="info" data-eui-dismissible="false" data-eui-id="non-dismissible-1">
        <div className="eui-alert-banner-content">
          <span className="eui-alert-banner-icon" aria-hidden="true">
            <span data-eui-icon="info-circle" data-eui-size="md"></span>
          </span>
          <div className="eui-alert-banner-message">
            <p className="eui-alert-banner-text">This banner cannot be dismissed and will remain visible</p>
          </div>
        </div>
      </div>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This banner has no dismiss button and remains visible.</p>
      </div>
    </div>
  )
};

