import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';

const meta: Meta = {
  title: 'HTML + CSS/Components/Avatar',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const sectionParameters = getSectionParameters('HTML + CSS/Components/Avatar');

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem',
  padding: '2rem',
  backgroundColor: 'var(--eui-color-background-surface)',
  color: 'var(--eui-color-text-primary)'
};

const rowStyle = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap' as const,
  alignItems: 'center'
};

const helperTextStyle = {
  margin: '0 0 1rem 0',
  color: 'var(--eui-color-text-muted)'
};

const demoItemStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: '0.5rem'
};

const labelTextStyle = {
  fontSize: '0.875rem',
  color: 'var(--eui-color-text-muted)'
};

// Helper function to get initials from name
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const AvatarWithImages: Story = {
  name: 'With Images',
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
            <StorySection title="Avatar with Images">
              <p style={helperTextStyle}>
                Avatars display profile images. Images fill the avatar area and keep the token-driven border.
              </p>
              <div style={rowStyle}>
                <div className="eui-avatar" data-eui-size="sm">
                  <img src="https://i.pravatar.cc/150?img=1" alt="User" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=2" alt="User" />
                </div>
                <div className="eui-avatar" data-eui-size="lg">
                  <img src="https://i.pravatar.cc/150?img=3" alt="User" />
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const AvatarWithInitials: Story = {
  name: 'With Initials (Fallback)',
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
            <StorySection title="Avatar with Initials">
              <p style={helperTextStyle}>
                When no image is available, avatars display initials using fallback background and text tokens.
              </p>
              <div style={rowStyle}>
                <div className="eui-avatar" data-eui-size="sm">
                  <span className="eui-avatar-initials">{getInitials('John Doe')}</span>
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('Jane Smith')}</span>
                </div>
                <div className="eui-avatar" data-eui-size="lg">
                  <span className="eui-avatar-initials">{getInitials('Bob Johnson')}</span>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const AvatarSizes: Story = {
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
            <StorySection title="Sizes">
              <p style={helperTextStyle}>
                Avatars come in three sizes driven by the component tokens.
              </p>
              <div style={rowStyle}>
                <div style={demoItemStyle}>
                  <div className="eui-avatar" data-eui-size="sm">
                    <img src="https://i.pravatar.cc/150?img=1" alt="User" />
                  </div>
                  <span style={labelTextStyle}>Small</span>
                </div>
                <div style={demoItemStyle}>
                  <div className="eui-avatar" data-eui-size="md">
                    <img src="https://i.pravatar.cc/150?img=2" alt="User" />
                  </div>
                  <span style={labelTextStyle}>Medium</span>
                </div>
                <div style={demoItemStyle}>
                  <div className="eui-avatar" data-eui-size="lg">
                    <img src="https://i.pravatar.cc/150?img=3" alt="User" />
                  </div>
                  <span style={labelTextStyle}>Large</span>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const AvatarMixed: Story = {
  name: 'Mixed Examples',
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
            <StorySection title="Mixed Examples">
              <p style={helperTextStyle}>
                Real-world usage often mixes image avatars with initials fallbacks.
              </p>
              <div style={rowStyle}>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=4" alt="User" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('Sarah Connor')}</span>
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=5" alt="User" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('Mike Taylor')}</span>
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=6" alt="User" />
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const AvatarLeadRole: Story = {
  name: 'Lead Role',
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
            <StorySection title="Lead Role">
              <p style={helperTextStyle}>
                Mark a lead avatar with <code>data-eui-role="lead"</code> to use the accent border token.
              </p>
              <div style={rowStyle}>
                <div className="eui-avatar" data-eui-size="md" data-eui-role="lead">
                  <span className="eui-avatar-initials">{getInitials('Team Lead')}</span>
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('Team Member')}</span>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const AvatarContexts: Story = {
  name: 'Contexts',
  parameters: {
    ...sectionParameters,
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }, { context: 'website' }, { context: 'report' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Context Preview">
              <p style={helperTextStyle}>
                Avatars adapt to the active context and theme (app, website, report).
              </p>
              <div style={rowStyle}>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=7" alt="User" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <span className="eui-avatar-initials">{getInitials('Context User')}</span>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
