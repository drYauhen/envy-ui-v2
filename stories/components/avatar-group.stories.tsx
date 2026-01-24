import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';

const meta: Meta = {
  title: 'HTML + CSS/Components/AvatarGroup',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const sectionParameters = getSectionParameters('HTML + CSS/Components/AvatarGroup');

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem',
  padding: '2rem',
  backgroundColor: 'var(--eui-color-background-surface)',
  color: 'var(--eui-color-text-primary)'
};

const sectionBodyStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1rem'
};

const helperTextStyle = {
  margin: '0 0 1rem 0',
  color: 'var(--eui-color-text-muted)'
};

const noteStyle = {
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--eui-color-background-subtle)',
  borderRadius: '8px',
  border: '1px solid var(--eui-color-border-default)',
  color: 'var(--eui-color-text-muted)'
};

const inlineCodeStyle = {
  padding: '0.125rem 0.25rem',
  backgroundColor: 'var(--eui-color-background-subtle)',
  borderRadius: '4px',
  fontSize: '0.875rem'
};

// Helper function to get initials from name
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const BasicOverlap: Story = {
  name: 'Basic Overlap',
  parameters: {
    ...sectionParameters,
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Basic Overlap">
              <p style={helperTextStyle}>
                Avatars overlap using <code style={inlineCodeStyle}>--eui-avatar-group-layout-overlap</code>. Hovering spreads
                neighbors using <code style={inlineCodeStyle}>--eui-avatar-group-layout-hover-spread</code> in app and website
                contexts.
              </p>
              <div className="eui-avatar-group">
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=3" alt="User 3" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=4" alt="User 4" />
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const WithInitials: Story = {
  name: 'With Initials',
  parameters: {
    ...sectionParameters,
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Mixed: Images and Initials">
              <p style={helperTextStyle}>
                Avatar groups can contain a mix of images and initials fallback.
              </p>
              <div className="eui-avatar-group">
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=5" alt="User 1" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('John Doe')}</span>
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=6" alt="User 3" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('Jane Smith')}</span>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const WithCount: Story = {
  name: 'With Count Indicator',
  parameters: {
    ...sectionParameters,
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="With Count Indicator">
              <p style={helperTextStyle}>
                When there are more than 4 avatars, show the first 4 and a count indicator for the remaining.
              </p>
              <div style={sectionBodyStyle}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>10 avatars (4 + 6)</h4>
                <div className="eui-avatar-group">
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=11" alt="User 1" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=12" alt="User 2" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=13" alt="User 3" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=14" alt="User 4" />
                  </div>
                  <div className="eui-counter" data-eui-variant="text">+6</div>
                </div>
              </div>
              <div style={noteStyle}>
                <p style={{ margin: 0 }}>
                  Count spacing uses <code style={inlineCodeStyle}>--eui-avatar-group-counter-gap</code> and the counter uses
                  the text variant of the Counter component.
                </p>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    ...sectionParameters,
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Different Sizes">
              <p style={helperTextStyle}>
                Avatar groups support all avatar sizes. Overlap uses shared layout tokens across sizes.
              </p>
              <div style={sectionBodyStyle}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Small</h4>
                <div className="eui-avatar-group">
                  <div className="eui-avatar" data-eui-size="sm">
                    <img src="https://i.pravatar.cc/150?img=15" alt="User 1" />
                  </div>
                  <div className="eui-avatar" data-eui-size="sm">
                    <img src="https://i.pravatar.cc/150?img=16" alt="User 2" />
                  </div>
                  <div className="eui-avatar" data-eui-size="sm">
                    <img src="https://i.pravatar.cc/150?img=17" alt="User 3" />
                  </div>
                  <div className="eui-avatar" data-eui-size="sm">
                    <img src="https://i.pravatar.cc/150?img=18" alt="User 4" />
                  </div>
                </div>
              </div>
              <div style={sectionBodyStyle}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Medium (Default)</h4>
                <div className="eui-avatar-group">
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=3" alt="User 3" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=4" alt="User 4" />
                  </div>
                </div>
              </div>
              <div style={sectionBodyStyle}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Large</h4>
                <div className="eui-avatar-group">
                  <div className="eui-avatar" data-eui-size="lg">
                    <img src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                  </div>
                  <div className="eui-avatar" data-eui-size="lg">
                    <img src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                  </div>
                  <div className="eui-avatar" data-eui-size="lg">
                    <img src="https://i.pravatar.cc/150?img=3" alt="User 3" />
                  </div>
                  <div className="eui-avatar" data-eui-size="lg">
                    <img src="https://i.pravatar.cc/150?img=4" alt="User 4" />
                  </div>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const HoverAnimation: Story = {
  name: 'Hover Animation (Interactive)',
  parameters: {
    ...sectionParameters,
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Hover Animation">
              <p style={helperTextStyle}>
                <strong>Try hovering over any avatar!</strong> Hover interactions use
                <code style={inlineCodeStyle}>--eui-avatar-group-layout-hover-scale</code> and
                <code style={inlineCodeStyle}>--eui-avatar-group-layout-hover-spread</code>.
              </p>
              <div className="eui-avatar-group">
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=3" alt="User 3" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=4" alt="User 4" />
                </div>
              </div>
              <div style={noteStyle}>
                <p style={{ margin: 0 }}>
                  Hover effects are disabled in the report context for print-friendly output.
                </p>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const LargeGroup: Story = {
  name: 'Large Group with Count',
  parameters: {
    ...sectionParameters,
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Large Group with Count">
              <p style={helperTextStyle}>
                For large groups, only the first 4 avatars are shown, followed by a count indicator.
              </p>
              <div className="eui-avatar-group">
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=6" alt="User 1" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('Alice Brown')}</span>
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=7" alt="User 3" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('Bob Wilson')}</span>
                </div>
                <div className="eui-counter" data-eui-variant="text">+12</div>
              </div>
              <div style={noteStyle}>
                <p style={{ margin: 0 }}>
                  Hovering the count uses the same spread animation as avatars and can be paired with a tooltip in
                  product usage.
                </p>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const WithLead: Story = {
  name: 'With Lead Avatar',
  parameters: {
    ...sectionParameters,
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Lead Avatar Highlighting">
              <p style={helperTextStyle}>
                The first avatar can be marked as lead using <code style={inlineCodeStyle}>data-eui-role="lead"</code>.
                The gap after the lead uses <code style={inlineCodeStyle}>--eui-avatar-group-layout-overlap-lead</code>, and
                the rest of the group uses <code style={inlineCodeStyle}>--eui-avatar-group-layout-overlap-tight</code>.
              </p>
              <div style={sectionBodyStyle}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Lead + Contributors</h4>
                <div className="eui-avatar-group">
                  <div className="eui-avatar" data-eui-size="md" data-eui-role="lead">
                    <img src="https://i.pravatar.cc/150?img=1" alt="Lead" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=2" alt="Contributor 1" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=3" alt="Contributor 2" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=4" alt="Contributor 3" />
                  </div>
                </div>
              </div>
              <div style={sectionBodyStyle}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Lead + Contributors + Count</h4>
                <div className="eui-avatar-group">
                  <div className="eui-avatar" data-eui-size="md" data-eui-role="lead">
                    <img src="https://i.pravatar.cc/150?img=5" alt="Lead" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=6" alt="Contributor 1" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=7" alt="Contributor 2" />
                  </div>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=8" alt="Contributor 3" />
                  </div>
                  <div className="eui-counter" data-eui-variant="text">+8</div>
                </div>
              </div>
              <div style={noteStyle}>
                <p style={{ margin: 0 }}>
                  Lead borders use <code style={inlineCodeStyle}>--eui-avatar-border-color-lead</code> to stand out from the
                  rest of the group.
                </p>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
