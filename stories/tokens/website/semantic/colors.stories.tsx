import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';

const meta: Meta = {
  title: 'Tokens/Website/Semantic/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const Colors: Story = {
  name: 'Colors',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Website Context - Semantic Colors"
        description="This structure is defined but currently empty. Tokens will be added when website context is developed."
      />
      <TokenSection
        title="Placeholder"
        description={
          <p style={{ fontStyle: 'italic', color: '#64748b' }}>
            Semantic color tokens for website context will appear here when developed.
          </p>
        }
      />
    </TokenPage>
  )
};

