import type { Meta, StoryObj } from '@storybook/react';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/Callout',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Callout'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  }
};

export default meta;

type Story = StoryObj;

export const Callout: Story = {
  name: 'Callout',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div className="eui-container" data-eui-container="standard">
          <StoryStack>
            <StorySection title="Subtle">
              <div className="eui-stack" data-eui-gap="sm">
                <div className="eui-callout" data-eui-tone="info" data-eui-variant="subtle">
                  Info callout for guidance or context.
                </div>
                <div className="eui-callout" data-eui-tone="success" data-eui-variant="subtle">
                  Success callout for confirmations.
                </div>
                <div className="eui-callout" data-eui-tone="warning" data-eui-variant="subtle">
                  Warning callout for important notices.
                </div>
                <div className="eui-callout" data-eui-tone="error" data-eui-variant="subtle">
                  Error callout for blocking issues.
                </div>
                <div className="eui-callout" data-eui-tone="neutral" data-eui-variant="subtle">
                  Neutral callout for general notes.
                </div>
              </div>
            </StorySection>
            <StorySection title="Solid">
              <div className="eui-stack" data-eui-gap="sm">
                <div className="eui-callout" data-eui-tone="info" data-eui-variant="solid">
                  Solid info callout for high emphasis.
                </div>
                <div className="eui-callout" data-eui-tone="success" data-eui-variant="solid">
                  Solid success callout for achievements.
                </div>
                <div className="eui-callout" data-eui-tone="warning" data-eui-variant="solid">
                  Solid warning callout for urgent notice.
                </div>
                <div className="eui-callout" data-eui-tone="error" data-eui-variant="solid">
                  Solid error callout for critical issues.
                </div>
                <div className="eui-callout" data-eui-tone="neutral" data-eui-variant="solid">
                  Solid neutral callout for focus.
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
