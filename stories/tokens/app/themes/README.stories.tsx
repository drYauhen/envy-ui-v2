import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { MarkdownViewer } from '../../../viewers/tokens/MarkdownViewer';
import { getSectionParameters } from '../../../../.storybook/preview';

const meta: Meta = {
  title: 'Tokens/App/Themes',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Themes'),
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
        description={<MarkdownViewer markdownPath="/tokens/app/themes/README.md" fallback="Loading documentation..." />}
      />
    </TokenPage>
  )
};

