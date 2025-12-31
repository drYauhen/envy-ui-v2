import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';

const meta: Meta = {
  title: 'Tokens/Contexts/Website/Themes/Default',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Website Context - Default Theme"
        description="Default theme tokens for website context. This structure is defined but currently empty. Tokens will be added when website context is developed."
      />
      <TokenSection
        title="Placeholder"
        description={
          <p style={{ fontStyle: 'italic', color: '#64748b' }}>
            This theme file exists in the token structure but contains no tokens yet. 
            When website context tokens are developed, they will appear here.
          </p>
        }
      />
    </TokenPage>
  )
};

