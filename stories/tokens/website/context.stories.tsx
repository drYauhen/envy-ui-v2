import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { MarkdownViewer } from '../../viewers/tokens/MarkdownViewer';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'Tokens/Website',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/Website'),
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const Website: Story = {
  name: 'Website',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Website Context"
        description={<MarkdownViewer markdownPath="/tokens/website/README.md" fallback="Loading documentation..." />}
      />
    </TokenPage>
  )
};

