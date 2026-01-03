import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { getSectionParameters } from '../../../../.storybook/preview';

const meta: Meta = {
  title: 'Tokens/Website/Themes/Dark',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/Website/Themes/Dark'),
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const Dark: Story = {
  name: 'Dark',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Website Context - Dark Theme"
        description="Dark theme tokens for website context. This structure is defined but currently empty. Tokens will be added when website context is developed."
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

