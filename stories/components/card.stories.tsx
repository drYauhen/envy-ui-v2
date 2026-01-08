import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Card',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

const cardContentStyle = {
  padding: '1.5rem'
} as const;

const cardTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#1e293b'
} as const;

const cardTextStyle = {
  margin: 0,
  fontSize: '0.875rem',
  color: '#64748b',
  lineHeight: 1.6
} as const;

const variantsRowStyle = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap'
} as const;

export const Card: Story = {
  name: 'Card (HTML + CSS)',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Card'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      {/* Variants comparison */}
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>
          Card Variants
        </h3>
        <MultiContextViewer
          shellContext="app"
          contexts={[{ context: 'app' }]}
        >
          {(context, theme) => (
            <div style={variantsRowStyle}>
              {/* Elevated (default) */}
              <div className="eui-card" data-eui-variant="elevated" style={{ width: '280px' }}>
                <div style={cardContentStyle}>
                  <h4 style={cardTitleStyle}>Elevated Card</h4>
                  <p style={cardTextStyle}>
                    Standard card with elevation shadow. This is the default variant.
                  </p>
                </div>
              </div>

              {/* Flat */}
              <div className="eui-card" data-eui-variant="flat" style={{ width: '280px' }}>
                <div style={cardContentStyle}>
                  <h4 style={cardTitleStyle}>Flat Card</h4>
                  <p style={cardTextStyle}>
                    Card without shadow, using border for separation.
                  </p>
                </div>
              </div>

              {/* Muted */}
              <div className="eui-card" data-eui-variant="muted" style={{ width: '280px' }}>
                <div style={cardContentStyle}>
                  <h4 style={cardTitleStyle}>Muted Card</h4>
                  <p style={cardTextStyle}>
                    Low-emphasis card for inactive or background content.
                  </p>
                </div>
              </div>

              {/* Strong */}
              <div className="eui-card" data-eui-variant="strong" style={{ width: '280px' }}>
                <div style={cardContentStyle}>
                  <h4 style={cardTitleStyle}>Strong Card</h4>
                  <p style={cardTextStyle}>
                    Card with prominent shadow for emphasis.
                  </p>
                </div>
              </div>
            </div>
          )}
        </MultiContextViewer>
      </div>

      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>
          Muted Content State
        </h3>
        <MultiContextViewer
          shellContext="app"
          contexts={[{ context: 'app' }]}
        >
          {(context, theme) => (
            <div style={variantsRowStyle}>
              <div className="eui-card" data-eui-variant="muted" data-eui-state="muted" style={{ width: '280px' }}>
                <div style={cardContentStyle}>
                  <h4 style={cardTitleStyle}>Muted Card + Content</h4>
                  <p style={cardTextStyle}>
                    Surface and content are muted to indicate inactive state.
                  </p>
                </div>
              </div>
              <div className="eui-card" data-eui-variant="elevated" style={{ width: '280px' }}>
                <div data-eui-state="muted" style={cardContentStyle}>
                  <h4 style={cardTitleStyle}>Muted Content Only</h4>
                  <p style={cardTextStyle}>
                    Normal surface with muted content to de-emphasize details.
                  </p>
                </div>
              </div>
            </div>
          )}
        </MultiContextViewer>
      </div>

    </div>
  )
};

export const WithStatusIndicators: Story = {
  name: 'Card with Status Indicators (Compositional)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const statuses = ['pending', 'onTrack', 'completed', 'minorDisruption', 'majorDisruption', 'upcoming', 'discontinued'];
    const statusLabels: Record<string, string> = {
      pending: 'Pending',
      onTrack: 'On Track',
      completed: 'Completed',
      minorDisruption: 'Minor Disruption',
      majorDisruption: 'Major Disruption',
      upcoming: 'Upcoming',
      discontinued: 'Discontinued'
    };

    return (
      <div style={containerStyle}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>
            Compositional: Variant + Status
          </h3>
          <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
            Status indicators are orthogonal to elevation variants. Any status can be combined with any variant.
            The status indicator appears as a colored bar on the left side of the card.
          </p>

          {/* All statuses with elevated variant */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
              All Statuses with Elevated Variant
            </h4>
            <MultiContextViewer
              shellContext="app"
              contexts={[{ context: 'app' }]}
            >
              {(context, theme) => (
                <div style={variantsRowStyle}>
                  {statuses.map((status) => (
                    <div
                      key={status}
                      className="eui-card"
                      data-eui-variant="elevated"
                      data-eui-status={status}
                      style={{ width: '280px' }}
                    >
                      <div style={cardContentStyle}>
                        <h4 style={cardTitleStyle}>Elevated + {statusLabels[status]}</h4>
                        <p style={cardTextStyle}>
                          Status indicator on left side. Combines elevation with application status.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </MultiContextViewer>
          </div>

          {/* Examples of different combinations */}
          <div>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
              Example Combinations
            </h4>
            <MultiContextViewer
              shellContext="app"
              contexts={[{ context: 'app' }]}
            >
              {(context, theme) => (
                <div style={variantsRowStyle}>
                  <div
                    className="eui-card"
                    data-eui-variant="flat"
                    data-eui-status="onTrack"
                    style={{ width: '280px' }}
                  >
                    <div style={cardContentStyle}>
                      <h4 style={cardTitleStyle}>Flat + On Track</h4>
                      <p style={cardTextStyle}>
                        No shadow, but with status indicator. Good for subtle UI.
                      </p>
                    </div>
                  </div>

                  <div
                    className="eui-card"
                    data-eui-variant="strong"
                    data-eui-status="majorDisruption"
                    style={{ width: '280px' }}
                  >
                    <div style={cardContentStyle}>
                      <h4 style={cardTitleStyle}>Strong + Major Disruption</h4>
                      <p style={cardTextStyle}>
                        Prominent shadow with attention-grabbing status. For critical items.
                      </p>
                    </div>
                  </div>

                  <div
                    className="eui-card"
                    data-eui-variant="elevated"
                    data-eui-status="upcoming"
                    style={{ width: '280px' }}
                  >
                    <div style={cardContentStyle}>
                      <h4 style={cardTitleStyle}>Elevated + Upcoming</h4>
                      <p style={cardTextStyle}>
                        Standard elevation with future status. For scheduled items.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </MultiContextViewer>
          </div>
        </div>
      </div>
    );
  }
};

export const MultiContextCard: Story = {
  name: 'Card Across Contexts (Multi-Context Viewer)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'Demonstrates how the card component adapts across different contexts (app, website, report) using the MultiContextViewer.'
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
      {(context, theme) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Card Variants */}
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 600 }}>
              Card Variants in {context} context
            </h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="eui-card" data-eui-variant="elevated" style={{ width: '240px' }}>
                <div style={cardContentStyle}>
                  <h5 style={{ ...cardTitleStyle, fontSize: '1rem' }}>Elevated</h5>
                  <p style={cardTextStyle}>
                    Standard card with elevation shadow.
                  </p>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="flat" style={{ width: '240px' }}>
                <div style={cardContentStyle}>
                  <h5 style={{ ...cardTitleStyle, fontSize: '1rem' }}>Flat</h5>
                  <p style={cardTextStyle}>
                    Card without shadow, using border.
                  </p>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="muted" style={{ width: '240px' }}>
                <div style={cardContentStyle}>
                  <h5 style={{ ...cardTitleStyle, fontSize: '1rem' }}>Muted</h5>
                  <p style={cardTextStyle}>
                    Low-emphasis card styling.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 600 }}>
              Status Indicators in {context} context
            </h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="eui-card" data-eui-variant="elevated" data-eui-status="onTrack" style={{ width: '240px' }}>
                <div style={cardContentStyle}>
                  <h5 style={{ ...cardTitleStyle, fontSize: '1rem' }}>On Track</h5>
                  <p style={cardTextStyle}>
                    Status indicator with green accent.
                  </p>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="elevated" data-eui-status="completed" style={{ width: '240px' }}>
                <div style={cardContentStyle}>
                  <h5 style={{ ...cardTitleStyle, fontSize: '1rem' }}>Completed</h5>
                  <p style={cardTextStyle}>
                    Success status indicator.
                  </p>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="elevated" data-eui-status="majorDisruption" style={{ width: '240px' }}>
                <div style={cardContentStyle}>
                  <h5 style={{ ...cardTitleStyle, fontSize: '1rem' }}>Major Disruption</h5>
                  <p style={cardTextStyle}>
                    Attention-grabbing red indicator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};
