import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Divider',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Divider'),
    layout: 'fullscreen',
    docs: {
      description: {
        component: `# Divider Component

Visual separators for organizing content and UI sections.

## When to Use

- **Content Separation**: Divide sections within cards, panels, or forms
- **Menu Sections**: Separate groups of menu items or navigation options
- **List Organization**: Break up long lists into logical groups
- **Layout Structure**: Define visual boundaries between interface regions

## When NOT to Use

- **Page Layout**: Use layout components (Grid, Stack) instead for page structure
- **Visual Borders**: Use border utilities or Card components for element borders
- **Whitespace**: Use spacing tokens and layout gaps for breathing room

## Semantic HTML

Dividers use the semantic \`<hr>\` element which represents a thematic break:

- **Horizontal dividers**: Standard \`<hr>\` with implicit \`role="separator"\`
- **Vertical dividers**: \`<hr>\` with \`aria-orientation="vertical"\` attribute

## Accessibility

- Dividers have an implicit \`role="separator"\` from the \`<hr>\` element
- Use \`aria-label\` only when the divider has specific semantic meaning
- Screen readers will announce dividers but they don't require user interaction
- Color contrast is handled automatically by design tokens

## Visual Variants

- **Default (Solid)**: Standard solid line for clear visual separation
- **Subtle (Dashed)**: Dashed line for lighter, less prominent separation

## Layout Integration

- **Horizontal**: Full width within its container, no explicit width needed
- **Vertical**: Needs explicit height context from parent container
- **Margin**: Default 0 (margin-less by default) - relies on parent layout spacing (gap, padding)
- **Flex/Grid**: Works naturally with flex/grid \`gap\` property

### Best Practices

- Don't overuse dividers - they add visual complexity
- Use subtle variant for related content grouping
- Use default variant for distinct section separation
- Pair with proper spacing using parent container gaps or padding
      `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const containerStyle: React.CSSProperties = {
  padding: '2rem',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const exampleStyle: React.CSSProperties = {
  marginBottom: '3rem',
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

const demoBoxStyle: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  background: '#fff',
};

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>Horizontal - Default (Solid)</h3>
            <div style={demoBoxStyle}>
              <p>Content above divider</p>
              <hr className="eui-divider" />
              <p>Content below divider</p>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Horizontal - Subtle (Dashed)</h3>
            <div style={demoBoxStyle}>
              <p>Content above divider</p>
              <hr className="eui-divider" data-eui-variant="subtle" />
              <p>Content below divider</p>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Vertical - Default (Solid)</h3>
            <div style={{ ...demoBoxStyle, display: 'flex', gap: '1rem', minHeight: '80px' }}>
              <div style={{ flex: 1 }}>
                <p>Content left</p>
              </div>
              <hr className="eui-divider" data-eui-orientation="vertical" />
              <div style={{ flex: 1 }}>
                <p>Content right</p>
              </div>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Vertical - Subtle (Dashed)</h3>
            <div style={{ ...demoBoxStyle, display: 'flex', gap: '1rem', minHeight: '80px' }}>
              <div style={{ flex: 1 }}>
                <p>Content left</p>
              </div>
              <hr
                className="eui-divider"
                data-eui-orientation="vertical"
                data-eui-variant="subtle"
              />
              <div style={{ flex: 1 }}>
                <p>Content right</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const HorizontalExamples: Story = {
  name: 'Horizontal Examples',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>In Card Section</h3>
            <div style={demoBoxStyle}>
              <h4 style={{ margin: '0 0 1rem 0' }}>Profile Information</h4>
              <p style={{ margin: '0 0 0.5rem 0' }}>Email: user@example.com</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>Phone: +1 (555) 000-0000</p>
              <hr className="eui-divider" />
              <h4 style={{ margin: '1rem 0 0.5rem 0' }}>Account Settings</h4>
              <p style={{ margin: 0 }}>Notifications enabled</p>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>In List</h3>
            <div style={demoBoxStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <div style={{ padding: '0.75rem 0' }}>Item 1</div>
                <hr className="eui-divider" />
                <div style={{ padding: '0.75rem 0' }}>Item 2</div>
                <hr className="eui-divider" />
                <div style={{ padding: '0.75rem 0' }}>Item 3</div>
              </div>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>In Form Section</h3>
            <div style={demoBoxStyle}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  First Name
                </label>
                <input type="text" placeholder="John" style={{ width: '100%', padding: '0.5rem' }} />
              </div>
              <hr className="eui-divider" />
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Last Name
                </label>
                <input type="text" placeholder="Doe" style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const VerticalExamples: Story = {
  name: 'Vertical Examples',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>In Flex Layout</h3>
            <div style={{ ...demoBoxStyle, display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Column 1</h4>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>Content for first column</p>
              </div>
              <hr className="eui-divider" data-eui-orientation="vertical" />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Column 2</h4>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>Content for second column</p>
              </div>
              <hr className="eui-divider" data-eui-orientation="vertical" />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Column 3</h4>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>Content for third column</p>
              </div>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>In Navigation</h3>
            <div
              style={{
                ...demoBoxStyle,
                display: 'flex',
                gap: '1rem',
                minHeight: '60px',
                alignItems: 'center',
              }}
            >
              <span style={{ flex: 'none', cursor: 'pointer' }}>Home</span>
              <hr className="eui-divider" data-eui-orientation="vertical" />
              <span style={{ flex: 'none', cursor: 'pointer' }}>About</span>
              <hr className="eui-divider" data-eui-orientation="vertical" />
              <span style={{ flex: 'none', cursor: 'pointer' }}>Contact</span>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const VariantComparison: Story = {
  name: 'Variant Comparison',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>Default vs Subtle</h3>
            <div style={demoBoxStyle}>
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem 0' }}>Default (Solid) - Prominent Separation</h4>
                <div>Related Item 1</div>
                <hr className="eui-divider" />
                <div>Related Item 2</div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 1rem 0' }}>Subtle (Dashed) - Light Separation</h4>
                <div>Related Item 1</div>
                <hr className="eui-divider" data-eui-variant="subtle" />
                <div>Related Item 2</div>
              </div>
            </div>
          </div>

          <div style={exampleStyle}>
            <h3 style={headingStyle}>Combined Vertical</h3>
            <div
              style={{
                ...demoBoxStyle,
                display: 'flex',
                gap: '1rem',
                minHeight: '100px',
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Distinct Section</p>
                <hr
                  className="eui-divider"
                  data-eui-orientation="vertical"
                  data-eui-variant="default"
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Related Content</p>
                <hr
                  className="eui-divider"
                  data-eui-orientation="vertical"
                  data-eui-variant="subtle"
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Adjacent Section</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const InMenu: Story = {
  name: 'In Menu/Navigation',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>Menu with Section Dividers</h3>
            <div style={{ ...demoBoxStyle, minWidth: '250px' }}>
              <div style={{ padding: '0.75rem' }}>New</div>
              <div style={{ padding: '0.75rem' }}>Open</div>
              <div style={{ padding: '0.75rem' }}>Save</div>
              <hr className="eui-divider" />
              <div style={{ padding: '0.75rem' }}>Copy</div>
              <div style={{ padding: '0.75rem' }}>Paste</div>
              <hr className="eui-divider" />
              <div style={{ padding: '0.75rem' }}>Settings</div>
              <div style={{ padding: '0.75rem' }}>Help</div>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const InForm: Story = {
  name: 'In Form',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={exampleStyle}>
            <h3 style={headingStyle}>Form with Sections</h3>
            <div style={{ ...demoBoxStyle, maxWidth: '500px' }}>
              <fieldset style={{ border: 'none', padding: 0, margin: 0, marginBottom: '1.5rem' }}>
                <legend style={{ fontWeight: 600, marginBottom: '1rem' }}>Personal Information</legend>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    Full Name
                  </label>
                  <input type="text" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    Email
                  </label>
                  <input type="email" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
              </fieldset>

              <hr className="eui-divider" />

              <fieldset style={{ border: 'none', padding: 0, margin: 0, marginTop: '1.5rem' }}>
                <legend style={{ fontWeight: 600, marginBottom: '1rem' }}>Address</legend>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    Street
                  </label>
                  <input type="text" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    City
                  </label>
                  <input type="text" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  ),
};

export const CodeExamples: Story = {
  name: 'Code Examples',
  parameters: {
    docs: {
      description: {
        story: 'HTML markup examples for divider usage',
      },
    },
  },
  render: () => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3 style={headingStyle}>Horizontal Divider (Default)</h3>
        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Expand to inspect code</summary>
          <pre style={codeStyle}>{`<div class="eui-card">
  <h3>Section 1</h3>
  <p>Content here...</p>

  <hr class="eui-divider" />

  <h3>Section 2</h3>
  <p>More content...</p>
</div>`}</pre>
        </details>
      </div>

      <div style={exampleStyle}>
        <h3 style={headingStyle}>Horizontal Divider (Subtle)</h3>
        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Expand to inspect code</summary>
          <pre style={codeStyle}>{`<div class="eui-card">
  <h3>Related Item 1</h3>
  <p>This is loosely related...</p>

  <hr class="eui-divider" data-eui-variant="subtle" />

  <h3>Related Item 2</h3>
  <p>This continues the thought...</p>
</div>`}</pre>
        </details>
      </div>

      <div style={exampleStyle}>
        <h3 style={headingStyle}>Vertical Divider</h3>
        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Expand to inspect code</summary>
          <pre style={codeStyle}>{`<div style="display: flex; gap: 1rem; min-height: 80px;">
  <div style="flex: 1;">
    <h3>Column 1</h3>
    <p>Content...</p>
  </div>

  <hr class="eui-divider"
      data-eui-orientation="vertical" />

  <div style="flex: 1;">
    <h3>Column 2</h3>
    <p>Content...</p>
  </div>
</div>`}</pre>
        </details>
      </div>

      <div style={exampleStyle}>
        <h3 style={headingStyle}>In Menu Navigation</h3>
        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Expand to inspect code</summary>
          <pre style={codeStyle}>{`<div class="eui-menu">
  <div class="eui-menu-item">New</div>
  <div class="eui-menu-item">Open</div>

  <hr class="eui-divider" />

  <div class="eui-menu-item">Settings</div>
  <div class="eui-menu-item">Help</div>
</div>`}</pre>
        </details>
      </div>

      <div style={exampleStyle}>
        <h3 style={headingStyle}>With Semantic ARIA Labels</h3>
        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Expand to inspect code</summary>
          <pre style={codeStyle}>{`<!-- For semantic meaning only when needed -->
<hr class="eui-divider"
    aria-label="Section break" />

<!-- For vertical dividers -->
<hr class="eui-divider"
    data-eui-orientation="vertical"
    aria-orientation="vertical" />`}</pre>
        </details>
      </div>
    </div>
  ),
};
