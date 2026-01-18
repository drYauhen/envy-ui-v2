import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { getSectionParameters } from '../../../../.storybook/preview';

const meta: Meta = {
  title: 'Tokens/Report/Semantic/Colors',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/Report/Semantic/Colors'),
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
        title="Report Context - Semantic Colors"
        description="This structure is defined but currently empty. Tokens will be added when report context is developed."
      />
      <TokenSection
        title="Placeholder"
        description={
          <p style={{ fontStyle: 'italic', color: '#64748b' }}>
            Semantic color tokens for report context (optimized for print and screen) will appear here when developed.
          </p>
        }
      />
    </TokenPage>
  )
};

