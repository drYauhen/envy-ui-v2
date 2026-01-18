import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { MarkdownViewer } from '../../viewers/tokens/MarkdownViewer';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'Tokens/App',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App'),
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const App: Story = {
  name: 'App',
  render: () => (
    <TokenPage>
      <TokenSection
        title="App Context"
        description={<MarkdownViewer markdownPath="/tokens/app/README.md" fallback="Loading documentation..." />}
      />
    </TokenPage>
  )
};

