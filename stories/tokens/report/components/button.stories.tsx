import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { getSectionParameters } from '../../../../.storybook/preview';

const meta: Meta = {
  title: 'Tokens/Report/Components/Button',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/Report/Components/Button'),
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const Button: Story = {
  name: 'Button',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Report Context - Button Component Tokens"
        description="This structure is defined but currently empty. Tokens will be added when report context is developed."
      />
      <TokenSection
        title="Placeholder"
        description={
          <p style={{ fontStyle: 'italic', color: '#64748b' }}>
            Button component tokens for report context will appear here when developed.
          </p>
        }
      />
    </TokenPage>
  )
};

