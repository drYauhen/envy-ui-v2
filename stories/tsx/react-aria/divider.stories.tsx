import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../../../src/ui/divider';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';

const meta: Meta<typeof Divider> = {
  title: 'TSX + React Aria/Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Divider'),
  },
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      description: 'Visual orientation of the divider',
    },
    variant: {
      options: ['default', 'subtle'],
      control: { type: 'radio' },
      description: 'Visual style variant (solid or dashed)',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class names',
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

const containerStyle: React.CSSProperties = {
  padding: '2rem',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const exampleStyle: React.CSSProperties = {
  marginBottom: '2rem',
};

const demoBoxStyle: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  background: '#fff',
};

const codeStyle: React.CSSProperties = {
  background: '#f5f5f5',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '1rem',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  overflow: 'auto',
  lineHeight: '1.5',
};

const headingStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#64748b',
  margin: '0 0 1rem 0',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export const Interactive: Story = {
  name: 'Interactive',
  parameters: {
    docs: {
      description: {
        story: 'Playground with interactive props controls for the Divider component',
      },
    },
  },
  render: (args) => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={demoBoxStyle}>
            <p>Content above divider</p>
            <Divider {...args} />
            <p>Content below divider</p>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const HorizontalUsage: Story = {
  name: 'Horizontal Usage',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>Default Variant</h3>
            <div style={demoBoxStyle}>
              <p>Section heading</p>
              <Divider />
              <p>Following content</p>

              <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<div>
  <p>Section heading</p>
  <Divider />
  <p>Following content</p>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Subtle Variant</h3>
            <div style={demoBoxStyle}>
              <p>Related item 1</p>
              <Divider variant="subtle" />
              <p>Related item 2</p>

              <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<div>
  <p>Related item 1</p>
  <Divider variant="subtle" />
  <p>Related item 2</p>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>In Flex Gap Layout</h3>
            <div style={{ ...demoBoxStyle, display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ padding: '0.75rem 0' }}>Item 1</div>
              <Divider />
              <div style={{ padding: '0.75rem 0' }}>Item 2</div>
              <Divider />
              <div style={{ padding: '0.75rem 0' }}>Item 3</div>

              <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
  <div>Item 1</div>
  <Divider />
  <div>Item 2</div>
  <Divider />
  <div>Item 3</div>
</div>`}</pre>
              </details>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const VerticalUsage: Story = {
  name: 'Vertical Usage',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>Default Variant</h3>
            <div style={{ ...demoBoxStyle, display: 'flex', gap: '1rem', minHeight: '80px' }}>
              <div style={{ flex: 1 }}>
                <p>Left content</p>
              </div>
              <Divider orientation="vertical" />
              <div style={{ flex: 1 }}>
                <p>Right content</p>
              </div>

              <details style={{ marginTop: '1rem', cursor: 'pointer', width: '100%' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<div style={{ display: 'flex', gap: '1rem' }}>
  <div>Left content</div>
  <Divider orientation="vertical" />
  <div>Right content</div>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Subtle Variant</h3>
            <div style={{ ...demoBoxStyle, display: 'flex', gap: '1rem', minHeight: '80px' }}>
              <div style={{ flex: 1 }}>
                <p>Section A</p>
              </div>
              <Divider orientation="vertical" variant="subtle" />
              <div style={{ flex: 1 }}>
                <p>Section B</p>
              </div>

              <details style={{ marginTop: '1rem', cursor: 'pointer', width: '100%' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<div style={{ display: 'flex', gap: '1rem' }}>
  <div>Section A</div>
  <Divider orientation="vertical" variant="subtle" />
  <div>Section B</div>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Multi-Column Layout</h3>
            <div style={{ ...demoBoxStyle, display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Column 1</h4>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>Content</p>
              </div>
              <Divider orientation="vertical" />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Column 2</h4>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>Content</p>
              </div>
              <Divider orientation="vertical" />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Column 3</h4>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>Content</p>
              </div>

              <details style={{ marginTop: '1rem', cursor: 'pointer', width: '100%' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<div style={{ display: 'flex', gap: '1rem' }}>
  <div style={{ flex: 1 }}>
    <h4>Column 1</h4>
    <p>Content</p>
  </div>
  <Divider orientation="vertical" />
  <div style={{ flex: 1 }}>
    <h4>Column 2</h4>
    <p>Content</p>
  </div>
  <Divider orientation="vertical" />
  <div style={{ flex: 1 }}>
    <h4>Column 3</h4>
    <p>Content</p>
  </div>
</div>`}</pre>
              </details>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const WithComponents: Story = {
  name: 'Component Integration',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>In Card Component</h3>
            <div style={demoBoxStyle}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Profile Card</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <div style={{ padding: '0.75rem 0' }}>
                  <strong>Email:</strong> user@example.com
                </div>
                <Divider />
                <div style={{ padding: '0.75rem 0' }}>
                  <strong>Phone:</strong> +1 (555) 000-0000
                </div>
                <Divider />
                <div style={{ padding: '0.75rem 0' }}>
                  <strong>Status:</strong> Active
                </div>
              </div>

              <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<div className="card">
  <h3>Profile Card</h3>
  <div>
    <strong>Email:</strong> user@example.com
  </div>
  <Divider />
  <div>
    <strong>Phone:</strong> +1 (555) 000-0000
  </div>
  <Divider />
  <div>
    <strong>Status:</strong> Active
  </div>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>In Menu/Navigation</h3>
            <div style={{ ...demoBoxStyle, minWidth: '250px' }}>
              <div style={{ padding: '0.75rem', cursor: 'pointer' }}>New</div>
              <div style={{ padding: '0.75rem', cursor: 'pointer' }}>Open</div>
              <Divider />
              <div style={{ padding: '0.75rem', cursor: 'pointer' }}>Settings</div>
              <div style={{ padding: '0.75rem', cursor: 'pointer' }}>Help</div>

              <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<div className="menu">
  <MenuItem>New</MenuItem>
  <MenuItem>Open</MenuItem>
  <Divider />
  <MenuItem>Settings</MenuItem>
  <MenuItem>Help</MenuItem>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>In Form Section</h3>
            <div style={{ ...demoBoxStyle, maxWidth: '400px' }}>
              <fieldset style={{ border: 'none', padding: 0, margin: 0, marginBottom: '1rem' }}>
                <legend style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Personal Info</legend>
                <div style={{ marginBottom: '0.75rem' }}>
                  <input type="text" placeholder="Name" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </fieldset>

              <Divider />

              <fieldset style={{ border: 'none', padding: 0, margin: 0, marginTop: '1rem' }}>
                <legend style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Address</legend>
                <div style={{ marginBottom: '0.75rem' }}>
                  <input type="text" placeholder="Street" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div>
                  <input type="text" placeholder="City" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
              </fieldset>

              <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<form>
  <fieldset>
    <legend>Personal Info</legend>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
  </fieldset>

  <Divider />

  <fieldset>
    <legend>Address</legend>
    <input type="text" placeholder="Street" />
    <input type="text" placeholder="City" />
  </fieldset>
</form>`}</pre>
              </details>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const Accessibility: Story = {
  name: 'Accessibility',
  parameters: {
    docs: {
      description: {
        story:
          'Dividers use semantic HTML and ARIA attributes for proper accessibility. The <hr> element has an implicit role="separator".',
      },
    },
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>Semantic HTML (No ARIA needed)</h3>
            <div style={demoBoxStyle}>
              <p>
                By default, dividers use the semantic <code>&lt;hr&gt;</code> element which has an
                implicit <code>role="separator"</code>. Screen readers will announce it, but no
                additional ARIA attributes are needed.
              </p>
              <Divider />
              <p>This is sufficient for most use cases where the divider is purely decorative.</p>

              <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<!-- Simple case - no ARIA needed -->
<div>
  <p>Content before</p>
  <Divider />
  <p>Content after</p>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Vertical Orientation Announcement</h3>
            <div style={{ ...demoBoxStyle, display: 'flex', gap: '1rem', minHeight: '80px' }}>
              <div style={{ flex: 1 }}>
                <p>Left section</p>
              </div>
              <Divider orientation="vertical" />
              <div style={{ flex: 1 }}>
                <p>Right section</p>
              </div>

              <details style={{ marginTop: '1rem', cursor: 'pointer', width: '100%' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<!-- Vertical dividers include aria-orientation -->
<div style={{ display: 'flex', gap: '1rem' }}>
  <div>Left section</div>
  <Divider orientation="vertical" />
  <div>Right section</div>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>With Semantic Meaning (Optional aria-label)</h3>
            <div style={demoBoxStyle}>
              <p>Use aria-label only when the divider has specific semantic meaning for screen readers.</p>
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>Section 1 content</div>
                <Divider aria-label="Transition to related content" />
                <div style={{ marginTop: '0.75rem' }}>Section 2 content</div>
              </div>

              <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600 }}>Show code</summary>
                <pre style={codeStyle}>{`<!-- Only use aria-label when meaningful -->
<div>
  <p>Section 1 content</p>
  <Divider aria-label="Transition to related content" />
  <p>Section 2 content</p>
</div>`}</pre>
              </details>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Accessibility Best Practices</h3>
            <div style={demoBoxStyle}>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>Dividers are primarily decorative - no ARIA needed in most cases</li>
                <li>
                  The <code>&lt;hr&gt;</code> element automatically provides <code>
                    role="separator"
                  </code>
                </li>
                <li>Use aria-label only when the divider has semantic meaning</li>
                <li>Vertical dividers automatically include aria-orientation="vertical"</li>
                <li>Color contrast is handled by design tokens</li>
                <li>Dividers are not focusable (correct behavior for separators)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};
