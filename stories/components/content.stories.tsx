import type { Meta, StoryObj } from '@storybook/react';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/Content',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Content'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  }
};

export default meta;

type Story = StoryObj;

export const Content: Story = {
  name: 'Content',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div className="eui-container" data-eui-container="standard">
          <StoryStack>
            <StorySection title="Default">
              <div className="eui-card" data-eui-variant="elevated">
                <div className="eui-content">
                  <h1 className="eui-text-heading-5">Content Block</h1>
                  <p className="eui-text-body">
                    Use content blocks for markdown-like layouts and long-form copy.
                  </p>
                  <ul>
                    <li className="eui-text-body">Spacing between list items is token-driven.</li>
                    <li className="eui-text-body">Typography is provided by semantic text styles.</li>
                  </ul>
                  <p className="eui-text-body">
                    Inline{' '}
                    <code className="eui-code-block" data-eui-variant="inline">
                      eui-content
                    </code>{' '}
                    usage keeps rhythm consistent.
                  </p>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
