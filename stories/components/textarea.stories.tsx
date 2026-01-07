import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

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
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
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
      )}
    </MultiContextViewer>
  )
};

export const TextareaContexts: Story = {
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
                {context === 'app' ? 'Interactive textarea' : 'Static textarea (print)'}
              </span>
              <textarea
                className="eui-textarea"
                rows={4}
                placeholder={context === 'app' ? 'Type here' : undefined}
                defaultValue={context === 'report' ? 'Printed textarea content' : undefined}
                disabled={context === 'report'}
              />
            </label>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};





