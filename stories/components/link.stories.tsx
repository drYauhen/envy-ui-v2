import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Link',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1.5rem',
  maxWidth: '760px'
} as const;

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
} as const;

const titleStyle = {
  margin: 0,
  fontSize: '1rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const textStyle = {
  margin: 0,
  color: '#334155'
} as const;

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Link'),
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
            <h3 style={titleStyle}>Inline in paragraph</h3>
            <p style={textStyle}>
              Link primitive inherits surrounding typography, so{' '}
              <a className="eui-link" href="#inline-link" onClick={(event) => event.preventDefault()}>
                this inline link
              </a>{' '}
              stays aligned with text size and line-height.
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}>Inside heading</h3>
            <h2 style={{ margin: 0, fontSize: '1.75rem', lineHeight: 1.2, fontWeight: 600 }}>
              Read the{' '}
              <a className="eui-link" href="#heading-link" onClick={(event) => event.preventDefault()}>
                architecture reference
              </a>
            </h2>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}>Standalone links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a className="eui-link" href="#default-link" onClick={(event) => event.preventDefault()}>
                Internal link
              </a>
              <a
                className="eui-link"
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.preventDefault()}
              >
                External link
              </a>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}>Direct child in stretch container</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '0.75rem',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem'
              }}
            >
              <p style={{ ...textStyle, marginBottom: 0 }}>
                Parent is a column flex container with stretch defaults.
              </p>
              <a className="eui-link" href="#stretch-link" onClick={(event) => event.preventDefault()}>
                This link should keep text-width focus ring
              </a>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};
