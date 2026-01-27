import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';

const meta: Meta = {
  title: 'HTML + CSS/Components/Badge',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const gridStyle = {
  display: 'flex',
  flexDirection: 'column',
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

const sizeLabelStyle = {
  ...labelStyle,
  minWidth: '80px'
} as const;

const badgeVariants = [
  { value: 'subtle', label: 'Subtle' },
  { value: 'solid', label: 'Solid' },
  { value: 'outline', label: 'Outline' }
] as const;

const badgeTones = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
  { value: 'info', label: 'Info' }
] as const;

const badgeShapes = [
  { value: 'rectangular', label: 'Rectangular' },
  { value: 'pill', label: 'Pill' },
  { value: 'circle', label: 'Circle' }
] as const;

export const Overview: Story = {
  name: 'Overview',
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
          <StoryStack>
            <StorySection title="Default">
              <div style={rowStyle}>
                <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="neutral">
                  Neutral
                </span>
              </div>
            </StorySection>
            <StorySection title="Typical Usage">
              <div style={rowStyle}>
                <span style={labelStyle}>Status</span>
                <span className="eui-badge" data-eui-variant="solid" data-eui-tone="success">
                  On Track
                </span>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

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
          <StoryStack>
            {badgeVariants.map((variant) => (
              <StorySection key={variant.value} title={`Variant: ${variant.label}`}>
                <div style={rowStyle}>
                  {badgeTones.map((tone) => (
                    <span
                      key={`${variant.value}-${tone.value}`}
                      className="eui-badge"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      {tone.label}
                    </span>
                  ))}
                </div>
              </StorySection>
            ))}
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const Sizes: Story = {
  name: 'Sizes',
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
          <StoryStack>
            {badgeVariants.map((variant) => (
              <StorySection key={variant.value} title={`Variant: ${variant.label}`}>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Default</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`${variant.value}-${tone.value}-default`}
                      className="eui-badge"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      {tone.label}
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Small</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`${variant.value}-${tone.value}-small`}
                      className="eui-badge"
                      data-eui-size="small"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      {tone.label}
                    </span>
                  ))}
                </div>
              </StorySection>
            ))}
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const Shapes: Story = {
  name: 'Shapes',
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
          <StoryStack>
            {badgeShapes.map((shape) => (
              <StorySection key={shape.value} title={`Shape: ${shape.label}`}>
                <div style={rowStyle}>
                  <span
                    className="eui-badge"
                    data-eui-shape={shape.value}
                    data-eui-variant="subtle"
                    data-eui-tone="neutral"
                  >
                    {shape.value === 'circle' ? '1' : shape.label}
                  </span>
                </div>
              </StorySection>
            ))}
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const DismissibleBadges: Story = {
  name: 'Dismissible',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Badge'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Dismissible badges render an integrated close action. Clickable and dismissible modes are mutually exclusive.'
      }
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={gridStyle}>
          <StoryStack>
            <StorySection title="Default size (subtle)">
              <div style={rowStyle}>
                {badgeTones.map((tone) => (
                  <span
                    key={`dismissible-default-${tone.value}`}
                    className="eui-badge"
                    data-eui-dismissible="true"
                    data-eui-variant="subtle"
                    data-eui-tone={tone.value}
                  >
                    <span data-eui-slot="content">{tone.label}</span>
                    <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </StorySection>
            <StorySection title="Small size (solid)">
              <div style={rowStyle}>
                {badgeTones.map((tone) => (
                  <span
                    key={`dismissible-small-${tone.value}`}
                    className="eui-badge"
                    data-eui-dismissible="true"
                    data-eui-size="small"
                    data-eui-variant="solid"
                    data-eui-tone={tone.value}
                  >
                    <span data-eui-slot="content">{tone.label}</span>
                    <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </StorySection>
            <StorySection title="Pill shape">
              <div style={rowStyle}>
                {badgeTones.map((tone) => (
                  <span
                    key={`dismissible-pill-${tone.value}`}
                    className="eui-badge"
                    data-eui-dismissible="true"
                    data-eui-shape="pill"
                    data-eui-variant="subtle"
                    data-eui-tone={tone.value}
                  >
                    <span data-eui-slot="content">{tone.label}</span>
                    <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const DismissibleMatrix: Story = {
  name: 'Dismissible Matrix',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Badge'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Expanded dismissible matrix across variants, sizes, and shapes for visual QA.'
      }
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={gridStyle}>
          <StoryStack>
            {badgeVariants.map((variant) => (
              <StorySection key={`dismissible-${variant.value}`} title={`Variant: ${variant.label}`}>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Default / Rect</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`dismissible-${variant.value}-${tone.value}-default-rect`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Default / Pill</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`dismissible-${variant.value}-${tone.value}-default-pill`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Small / Rect</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`dismissible-${variant.value}-${tone.value}-small-rect`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-size="small"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Small / Pill</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`dismissible-${variant.value}-${tone.value}-small-pill`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-size="small"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </StorySection>
            ))}
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const VariantGroups: Story = {
  name: 'Variant Groups (Full)',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Badge'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Grouped by variant. Each group shows sizes, shapes, and dismissible combinations (circle excluded from dismissible).'
      }
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={gridStyle}>
          <StoryStack>
            {badgeVariants.map((variant) => (
              <StorySection key={`variant-group-${variant.value}`} title={`Variant: ${variant.label}`}>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Default / Rect</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-default-rect`}
                      className="eui-badge"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      {tone.label}
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Small / Rect</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-small-rect`}
                      className="eui-badge"
                      data-eui-size="small"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      {tone.label}
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Default / Pill</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-default-pill`}
                      className="eui-badge"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      {tone.label}
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Small / Pill</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-small-pill`}
                      className="eui-badge"
                      data-eui-size="small"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      {tone.label}
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Default / Circle</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-default-circle`}
                      className="eui-badge"
                      data-eui-shape="circle"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                      aria-label={`${tone.label} status`}
                    >
                      +
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Small / Circle</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-small-circle`}
                      className="eui-badge"
                      data-eui-size="small"
                      data-eui-shape="circle"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                      aria-label={`${tone.label} status`}
                    >
                      +
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Disabled / Default Rect</span>
                  {badgeTones.map((tone) => (
                    <button
                      key={`group-${variant.value}-${tone.value}-disabled-default-rect`}
                      className="eui-badge"
                      data-eui-interactive="true"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                      type="button"
                      disabled
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Disabled / Small Rect</span>
                  {badgeTones.map((tone) => (
                    <button
                      key={`group-${variant.value}-${tone.value}-disabled-small-rect`}
                      className="eui-badge"
                      data-eui-interactive="true"
                      data-eui-size="small"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                      type="button"
                      disabled
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Disabled / Default Pill</span>
                  {badgeTones.map((tone) => (
                    <button
                      key={`group-${variant.value}-${tone.value}-disabled-default-pill`}
                      className="eui-badge"
                      data-eui-interactive="true"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                      type="button"
                      disabled
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Disabled / Small Pill</span>
                  {badgeTones.map((tone) => (
                    <button
                      key={`group-${variant.value}-${tone.value}-disabled-small-pill`}
                      className="eui-badge"
                      data-eui-interactive="true"
                      data-eui-size="small"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                      type="button"
                      disabled
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Disabled / Default Circle</span>
                  {badgeTones.map((tone) => (
                    <button
                      key={`group-${variant.value}-${tone.value}-disabled-default-circle`}
                      className="eui-badge"
                      data-eui-interactive="true"
                      data-eui-shape="circle"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                      type="button"
                      aria-label={`${tone.label} status`}
                      disabled
                    >
                      +
                    </button>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Disabled / Small Circle</span>
                  {badgeTones.map((tone) => (
                    <button
                      key={`group-${variant.value}-${tone.value}-disabled-small-circle`}
                      className="eui-badge"
                      data-eui-interactive="true"
                      data-eui-size="small"
                      data-eui-shape="circle"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                      type="button"
                      aria-label={`${tone.label} status`}
                      disabled
                    >
                      +
                    </button>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Dismiss / Default Rect</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-dismiss-default-rect`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Dismiss Disabled / Default Rect</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-dismiss-disabled-default-rect`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-disabled="true"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`} disabled>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Dismiss / Small Rect</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-dismiss-small-rect`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-size="small"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Dismiss Disabled / Small Rect</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-dismiss-disabled-small-rect`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-disabled="true"
                      data-eui-size="small"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`} disabled>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Dismiss / Default Pill</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-dismiss-default-pill`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Dismiss Disabled / Default Pill</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-dismiss-disabled-default-pill`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-disabled="true"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`} disabled>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Dismiss / Small Pill</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-dismiss-small-pill`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-size="small"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={rowStyle}>
                  <span style={sizeLabelStyle}>Dismiss Disabled / Small Pill</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`group-${variant.value}-${tone.value}-dismiss-disabled-small-pill`}
                      className="eui-badge"
                      data-eui-dismissible="true"
                      data-eui-disabled="true"
                      data-eui-size="small"
                      data-eui-shape="pill"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      <span data-eui-slot="content">{tone.label}</span>
                      <button type="button" data-eui-slot="dismiss" aria-label={`Remove ${tone.label}`} disabled>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </StorySection>
            ))}
          </StoryStack>
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
  name: 'States & Interaction',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Badge'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Badges become interactive only with data-eui-interactive="true". Focusability comes from markup (button/a/tabindex), while CSS handles visual states. Dismissible badges are a separate mode and should not be combined with interactive roots.'
      }
    }
  },
  render: () => (
    <>
      <p style={descriptionStyle}>
        <strong>Pattern:</strong> Add <code>data-eui-interactive="true"</code> to enable hover/active/cursor/focus visuals.
        Choose the element based on semantics (<code>&lt;button&gt;</code> for actions, <code>&lt;a&gt;</code> for navigation, or a focusable span with <code>tabindex</code>).
        CSS does not assume element type; markup controls focusability.
      </p>

      <pre style={codeBlockStyle}>
{`<!-- As Button (for actions) -->
<button class="eui-badge" data-eui-interactive="true" data-eui-variant="subtle" data-eui-tone="success" type="button">
  Clickable Badge
</button>

<!-- As Link (for navigation) -->
<a class="eui-badge" data-eui-interactive="true" data-eui-variant="solid" data-eui-tone="info" href="/tags/info">
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
              data-eui-interactive="true"
              data-eui-variant="subtle"
              data-eui-tone="neutral"
              type="button"
              onClick={() => console.log('Badge clicked: Neutral')}
            >
              Neutral
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="subtle"
              data-eui-tone="success"
              type="button"
              onClick={() => console.log('Badge clicked: Success')}
            >
              Success
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="subtle"
              data-eui-tone="warning"
              type="button"
              onClick={() => console.log('Badge clicked: Warning')}
            >
              Warning
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="subtle"
              data-eui-tone="error"
              type="button"
              onClick={() => console.log('Badge clicked: Error')}
            >
              Error
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
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
              data-eui-interactive="true"
              data-eui-variant="solid"
              data-eui-tone="neutral"
              type="button"
              onClick={() => console.log('Badge clicked: Neutral')}
            >
              Neutral
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="solid"
              data-eui-tone="success"
              type="button"
              onClick={() => console.log('Badge clicked: Success')}
            >
              Success
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="solid"
              data-eui-tone="warning"
              type="button"
              onClick={() => console.log('Badge clicked: Warning')}
            >
              Warning
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="solid"
              data-eui-tone="error"
              type="button"
              onClick={() => console.log('Badge clicked: Error')}
            >
              Error
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
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
              data-eui-interactive="true"
              data-eui-variant="outline"
              data-eui-tone="neutral"
              type="button"
              onClick={() => console.log('Badge clicked: Neutral')}
            >
              Neutral
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="outline"
              data-eui-tone="success"
              type="button"
              onClick={() => console.log('Badge clicked: Success')}
            >
              Success
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="outline"
              data-eui-tone="warning"
              type="button"
              onClick={() => console.log('Badge clicked: Warning')}
            >
              Warning
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="outline"
              data-eui-tone="error"
              type="button"
              onClick={() => console.log('Badge clicked: Error')}
            >
              Error
            </button>
            <button
              className="eui-badge"
              data-eui-interactive="true"
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
              data-eui-interactive="true"
              data-eui-variant="subtle"
              data-eui-tone="neutral"
              href="#neutral"
              onClick={(e) => { e.preventDefault(); console.log('Badge link clicked: Neutral'); }}
            >
              Neutral
            </a>
            <a
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="subtle"
              data-eui-tone="success"
              href="#success"
              onClick={(e) => { e.preventDefault(); console.log('Badge link clicked: Success'); }}
            >
              Success
            </a>
            <a
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="solid"
              data-eui-tone="warning"
              href="#warning"
              onClick={(e) => { e.preventDefault(); console.log('Badge link clicked: Warning'); }}
            >
              Warning
            </a>
            <a
              className="eui-badge"
              data-eui-interactive="true"
              data-eui-variant="outline"
              data-eui-tone="error"
              href="#error"
              onClick={(e) => { e.preventDefault(); console.log('Badge link clicked: Error'); }}
            >
              Error
            </a>
            <a
              className="eui-badge"
              data-eui-interactive="true"
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
      All focus rings are 2px wide and match badge shape (border-radius). Works with any focusable element when <code>data-eui-interactive="true"</code> is set.
    </p>
  </>
  )
};

export const MultiContextBadge: Story = {
  name: 'Comprehensive Multi-Context',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Full matrix snapshot across app, website, and report contexts.'
      }
    }
  },
  render: () => (
    <MultiContextViewer
      contexts={[
        { context: 'app', label: 'App Context' },
        { context: 'website', label: 'Website Context' },
        { context: 'report', label: 'Report Context' }
      ]}
    >
      {(context) => (
        <StoryStack>
          <StorySection title={`Variants in ${context} context`}>
            <StoryStack>
              {badgeVariants.map((variant) => (
                <div key={`${context}-${variant.value}`} style={rowStyle}>
                  <span style={sizeLabelStyle}>{variant.label}</span>
                  {badgeTones.map((tone) => (
                    <span
                      key={`${context}-${variant.value}-${tone.value}`}
                      className="eui-badge"
                      data-eui-variant={variant.value}
                      data-eui-tone={tone.value}
                    >
                      {tone.label}
                    </span>
                  ))}
                </div>
              ))}
            </StoryStack>
          </StorySection>
          <StorySection title={`Shapes in ${context} context`}>
            <StoryStack>
              {badgeShapes.map((shape) => (
                <div key={`${context}-${shape.value}`} style={rowStyle}>
                  <span
                    className="eui-badge"
                    data-eui-shape={shape.value}
                    data-eui-variant="subtle"
                    data-eui-tone="neutral"
                  >
                    {shape.value === 'circle' ? '1' : shape.label}
                  </span>
                </div>
              ))}
            </StoryStack>
          </StorySection>
        </StoryStack>
      )}
    </MultiContextViewer>
  )
};
