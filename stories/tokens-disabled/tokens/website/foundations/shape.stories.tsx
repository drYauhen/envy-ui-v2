import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { getSectionParameters } from '../../../../.storybook/preview';

const meta: Meta = {
  title: 'Tokens/Website/Foundations/Shape',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/Website/Foundations/Shape'),
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const Shape: Story = {
  name: 'Shape',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Website Context - Foundation Shape Tokens"
        description="This structure is defined but currently empty. Tokens will be added when website context is developed."
      />
      <TokenSection
        title="Placeholder"
        description={
          <p style={{ fontStyle: 'italic', color: '#64748b' }}>
            Foundation shape tokens for website context will appear here when developed.
          </p>
        }
      />
    </TokenPage>
  )
};

