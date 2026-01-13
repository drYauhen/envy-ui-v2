import type { Meta, StoryObj } from '@storybook/react';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/CodeBlock',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/CodeBlock'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  }
};

export default meta;

type Story = StoryObj;

export const CodeBlock: Story = {
  name: 'Code Block',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div className="eui-container" data-eui-container="standard">
          <StoryStack>
            <StorySection title="Inline">
              <p className="eui-text-body">
                Use{' '}
                <code className="eui-code-block" data-eui-variant="inline">
                  const id = 'doc-shell';
                </code>{' '}
                inside text.
              </p>
            </StorySection>
            <StorySection title="Block">
              <pre className="eui-code-block" data-eui-variant="block">
                <code className="language-json">
                  {`{
  "component": "CodeBlock",
  "variant": "block"
}`}
                </code>
              </pre>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
