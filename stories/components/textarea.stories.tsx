import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/Textarea',
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

export const TextareaStates: Story = {
  name: 'States',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Textarea'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Textarea States</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Default textarea</span>
            <textarea className="eui-textarea" placeholder="Enter multi-line text" rows={3} />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">With content</span>
            <textarea className="eui-textarea" rows={4} defaultValue="This is a sample textarea with some content. It can contain multiple lines of text and will resize vertically as needed." />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Disabled textarea</span>
            <textarea className="eui-textarea" placeholder="Cannot type" disabled rows={3} />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Error state</span>
            <textarea className="eui-textarea" placeholder="Invalid input" data-eui-state="error" rows={3} defaultValue="This field has an error" />
          </label>
        </div>
      </div>
    </div>
  )
};

export const TextareaContexts: Story = {
  name: 'Contexts (App vs Report)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Application Context (Interactive)</h3>
        <div data-eui-context="app" style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Interactive textarea</span>
            <textarea className="eui-textarea" placeholder="Type here" rows={4} />
          </label>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Report Context (Print Style)</h3>
        <div data-eui-context="report" style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Static textarea (print)</span>
            <textarea className="eui-textarea" rows={4} defaultValue="Printed textarea content" disabled />
          </label>
        </div>
      </div>
    </div>
  )
};






