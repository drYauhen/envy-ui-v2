import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Badge',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const gridStyle = {
  display: 'grid',
  gap: '1rem',
  padding: '2rem',
  backgroundColor: '#ffffff'
} as const;

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center'
} as const;

const labelStyle = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#0f172a',
  minWidth: '100px'
} as const;

export const Variants: Story = {
  name: 'Variants',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Badge'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={gridStyle}>
          <div style={rowStyle}>
            <span style={labelStyle}>Subtle</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="neutral">Neutral</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="success">Success</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="warning">Warning</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="error">Error</span>
            <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="info">Info</span>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>Solid</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="neutral">Neutral</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="success">Success</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="warning">Warning</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="error">Error</span>
            <span className="eui-badge" data-eui-variant="solid" data-eui-tone="info">Info</span>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>Outline</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="neutral">Neutral</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="success">Success</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="warning">Warning</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="error">Error</span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="info">Info</span>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};

const descriptionStyle = {
  fontSize: '0.875rem',
  color: '#64748b',
  margin: '0 0 1rem 0',
  lineHeight: 1.5
} as const;

const codeBlockStyle = {
  backgroundColor: '#f1f5f9',
  padding: '1rem',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  fontFamily: 'monospace',
  color: '#334155',
  overflowX: 'auto',
  marginBottom: '1.5rem'
} as const;

export const InteractiveBadges: Story = {
  name: 'Interactive Badges',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Badge'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Badges can be made interactive by using a button element with badge classes. The focus ring automatically matches the badge shape, providing perfect visual alignment.'
      }
    }
  },
  render: () => (
    <>
      <p style={descriptionStyle}>
        <strong>Pattern:</strong> Use <code>&lt;button class="eui-badge"&gt;</code> for actions or <code>&lt;a class="eui-badge"&gt;</code> for navigation.
        The badge element becomes the interactive element itself, ensuring the focus ring perfectly matches the badge shape.
        This follows patterns from Material UI Chips, Polaris Tags, and Shadcn Badges.
      </p>

      <pre style={codeBlockStyle}>
{`<!-- As Button (for actions) -->
<button class="eui-badge" data-eui-variant="subtle" data-eui-tone="success" type="button">
  Clickable Badge
</button>

<!-- As Link (for navigation) -->
<a class="eui-badge" data-eui-variant="solid" data-eui-tone="info" href="/tags/info">
  Info Tag
</a>`}
      </pre>

      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={gridStyle}>
            <div style={rowStyle}>
            <span style={labelStyle}>Subtle (Interactive)</span>
            <button
              className="eui-badge"
              data-eui-variant="subtle"
              data-eui-tone="neutral"
              type="button"
              onClick={() => console.log('Badge clicked: Neutral')}
            >
              Neutral
            </button>
            <button
              className="eui-badge"
              data-eui-variant="subtle"
              data-eui-tone="success"
              type="button"
              onClick={() => console.log('Badge clicked: Success')}
            >
              Success
            </button>
            <button
              className="eui-badge"
              data-eui-variant="subtle"
              data-eui-tone="warning"
              type="button"
              onClick={() => console.log('Badge clicked: Warning')}
            >
              Warning
            </button>
            <button
              className="eui-badge"
              data-eui-variant="subtle"
              data-eui-tone="error"
              type="button"
              onClick={() => console.log('Badge clicked: Error')}
            >
              Error
            </button>
            <button
              className="eui-badge"
              data-eui-variant="subtle"
              data-eui-tone="info"
              type="button"
              onClick={() => console.log('Badge clicked: Info')}
            >
              Info
            </button>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>Solid (Interactive)</span>
            <button
              className="eui-badge"
              data-eui-variant="solid"
              data-eui-tone="neutral"
              type="button"
              onClick={() => console.log('Badge clicked: Neutral')}
            >
              Neutral
            </button>
            <button
              className="eui-badge"
              data-eui-variant="solid"
              data-eui-tone="success"
              type="button"
              onClick={() => console.log('Badge clicked: Success')}
            >
              Success
            </button>
            <button
              className="eui-badge"
              data-eui-variant="solid"
              data-eui-tone="warning"
              type="button"
              onClick={() => console.log('Badge clicked: Warning')}
            >
              Warning
            </button>
            <button
              className="eui-badge"
              data-eui-variant="solid"
              data-eui-tone="error"
              type="button"
              onClick={() => console.log('Badge clicked: Error')}
            >
              Error
            </button>
            <button
              className="eui-badge"
              data-eui-variant="solid"
              data-eui-tone="info"
              type="button"
              onClick={() => console.log('Badge clicked: Info')}
            >
              Info
            </button>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>Outline (Interactive)</span>
            <button
              className="eui-badge"
              data-eui-variant="outline"
              data-eui-tone="neutral"
              type="button"
              onClick={() => console.log('Badge clicked: Neutral')}
            >
              Neutral
            </button>
            <button
              className="eui-badge"
              data-eui-variant="outline"
              data-eui-tone="success"
              type="button"
              onClick={() => console.log('Badge clicked: Success')}
            >
              Success
            </button>
            <button
              className="eui-badge"
              data-eui-variant="outline"
              data-eui-tone="warning"
              type="button"
              onClick={() => console.log('Badge clicked: Warning')}
            >
              Warning
            </button>
            <button
              className="eui-badge"
              data-eui-variant="outline"
              data-eui-tone="error"
              type="button"
              onClick={() => console.log('Badge clicked: Error')}
            >
              Error
            </button>
            <button
              className="eui-badge"
              data-eui-variant="outline"
              data-eui-tone="info"
              type="button"
              onClick={() => console.log('Badge clicked: Info')}
            >
              Info
            </button>
          </div>

          <div style={{ ...rowStyle, marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
            <span style={labelStyle}>As Links</span>
            <a
              className="eui-badge"
              data-eui-variant="subtle"
              data-eui-tone="neutral"
              href="#neutral"
              onClick={(e) => { e.preventDefault(); console.log('Badge link clicked: Neutral'); }}
            >
              Neutral
            </a>
            <a
              className="eui-badge"
              data-eui-variant="subtle"
              data-eui-tone="success"
              href="#success"
              onClick={(e) => { e.preventDefault(); console.log('Badge link clicked: Success'); }}
            >
              Success
            </a>
            <a
              className="eui-badge"
              data-eui-variant="solid"
              data-eui-tone="warning"
              href="#warning"
              onClick={(e) => { e.preventDefault(); console.log('Badge link clicked: Warning'); }}
            >
              Warning
            </a>
            <a
              className="eui-badge"
              data-eui-variant="outline"
              data-eui-tone="error"
              href="#error"
              onClick={(e) => { e.preventDefault(); console.log('Badge link clicked: Error'); }}
            >
              Error
            </a>
            <a
              className="eui-badge"
              data-eui-variant="solid"
              data-eui-tone="info"
              href="#info"
              aria-disabled="true"
              onClick={(e) => { e.preventDefault(); }}
            >
              Disabled Link
            </a>
          </div>
        </div>
      )}
    </MultiContextViewer>

    <p style={{ ...descriptionStyle, marginTop: '2rem' }}>
      <strong>Focus Behavior:</strong> Interactive badges use a two-layer focus system:
    </p>
    <ul style={{ ...descriptionStyle, marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
      <li><strong>Theme-dependent (default):</strong> Default theme uses accent-300 (brand-aligned), accessibility theme uses accent-700 (WCAG 2.2 AA compliant)</li>
      <li><strong>System override (optional):</strong> Switch Focus Policy to "System" in Storybook toolbar to see bright orange focus for keyboard users</li>
    </ul>
    <p style={{...descriptionStyle, marginTop: '0.5rem', fontSize: '0.8125rem', fontStyle: 'italic'}}>
      All focus rings are 2px wide and perfectly match badge shape (border-radius). Works with both <code>&lt;button&gt;</code> (actions) and <code>&lt;a&gt;</code> (navigation).
    </p>
  </>
  )
};
