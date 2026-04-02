import type { Meta, StoryObj } from '@storybook/react';
import { Ellipsis } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../../utils/story-layout';

const meta: Meta<typeof Ellipsis> = {
  title: 'TSX + React Aria/Components/Ellipsis',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Ellipsis'),
    layout: 'padded'
  },
  argTypes: {
    children: { control: 'text' },
    tooltipOnTruncate: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof Ellipsis>;

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
  flexDirection: 'column' as const,
  gap: '0.75rem'
};

const boundedStyle = {
  maxWidth: 240,
  padding: '0.5rem 0.75rem',
  borderRadius: '0.5rem',
  border: '1px dashed var(--eui-color-border-muted)'
};

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Default">
              <div style={rowStyle}>
                <div style={boundedStyle}>
                  <Ellipsis>This text fits within the container.</Ellipsis>
                </div>
                <div style={boundedStyle}>
                  <Ellipsis>
                    This text is too long for the container and will truncate with an ellipsis.
                  </Ellipsis>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const StatesAndInteraction: Story = {
  name: 'States & Interaction',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Tooltip on Truncate">
              <div style={rowStyle}>
                <div style={boundedStyle}>
                  <Ellipsis tooltipOnTruncate>
                    Tooltip enabled: hover or focus to read the full text in the tooltip.
                  </Ellipsis>
                </div>
                <div style={boundedStyle}>
                  <Ellipsis tooltipOnTruncate={false}>
                    Tooltip disabled: truncation only without the tooltip.
                  </Ellipsis>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const ComprehensiveMultiContext: Story = {
  name: 'Comprehensive Multi-Context',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }, { context: 'website' }, { context: 'report' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Cross-context Truncation">
              <div style={rowStyle}>
                <div style={boundedStyle}>
                  <Ellipsis>
                    The same truncated string should behave consistently across contexts.
                  </Ellipsis>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
