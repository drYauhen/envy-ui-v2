import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { MarkdownViewer } from '../../../viewers/tokens/MarkdownViewer';

const meta: Meta = {
  title: 'Tokens/Website/Themes',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const Themes: Story = {
  name: 'Themes Overview',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Themes"
        description={<MarkdownViewer markdownPath="/tokens/website/themes/README.md" fallback="Loading documentation..." />}
      />
    </TokenPage>
  )
};

