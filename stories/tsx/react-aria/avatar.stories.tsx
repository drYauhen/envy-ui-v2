import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../../src/ui';
import type { AvatarSize } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../../utils/story-layout';

const meta: Meta<typeof Avatar> = {
  title: 'TSX + React Aria/Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Avatar'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj<typeof Avatar>;

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

const sizeLabelStyle = {
  fontSize: '0.875rem',
  color: 'var(--eui-color-text-muted)'
};

const sizes: AvatarSize[] = ['sm', 'md', 'lg'];

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="With Images">
              <p style={helperTextStyle}>
                React Aria layer wraps the same HTML + CSS tokens, so images and borders match the base layer.
              </p>
              <div style={rowStyle}>
                <Avatar size="sm" src="https://i.pravatar.cc/150?img=1" alt="User" />
                <Avatar size="md" src="https://i.pravatar.cc/150?img=2" alt="User" />
                <Avatar size="lg" src="https://i.pravatar.cc/150?img=3" alt="User" />
              </div>
            </StorySection>

            <StorySection title="With Initials">
              <p style={helperTextStyle}>
                When no image is provided, the component renders initials fallback using token-driven colors.
              </p>
              <div style={rowStyle}>
                <Avatar size="sm" name="John Doe" />
                <Avatar size="md" name="Jane Smith" />
                <Avatar size="lg" initials="BZ" />
              </div>
            </StorySection>

            <StorySection title="Sizes">
              <div style={rowStyle}>
                {sizes.map((size) => (
                  <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <Avatar size={size} name="Size Sample" />
                    <span style={sizeLabelStyle}>{size.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </StorySection>

            <StorySection title="Lead Role">
              <p style={helperTextStyle}>
                Lead avatars use the accent border token via <code>avatarRole="lead"</code>.
              </p>
              <div style={rowStyle}>
                <Avatar size="md" avatarRole="lead" name="Team Lead" />
                <Avatar size="md" name="Contributor" />
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const Contexts: Story = {
  name: 'Contexts',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }, { context: 'website' }, { context: 'report' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Context Preview">
              <p style={helperTextStyle}>
                Avatar styles follow the active context theme (app, website, report).
              </p>
              <div style={rowStyle}>
                <Avatar size="md" src="https://i.pravatar.cc/150?img=7" alt="User" />
                <Avatar size="md" name="Context User" />
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
