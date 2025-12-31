import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { MarkdownViewer } from '../../viewers/tokens/MarkdownViewer';

const meta: Meta = {
  title: 'Tokens/Report',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const Report: Story = {
  name: 'Report',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Report Context"
        description={<MarkdownViewer markdownPath="/tokens/report/README.md" fallback="Loading documentation..." />}
      />
    </TokenPage>
  )
};

