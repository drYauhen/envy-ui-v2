import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';

const meta: Meta = {
  title: 'Tokens/Contexts/Website',
  tags: ['autodocs'],
  parameters: {
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
        description="Website context tokens. This structure is defined but currently empty. Tokens will be added when website context is developed."
      />
      <TokenSection
        title="Structure"
        description={
          <div>
            <p>The Website context structure includes:</p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li><strong>Foundations:</strong> Base color scales, spacing, typography, shape tokens (empty)</li>
              <li><strong>Semantic:</strong> Semantic tokens (text, background, border, focus, shadow, shape) (empty)</li>
              <li><strong>Components:</strong> Component-specific tokens (empty)</li>
              <li><strong>Themes:</strong> Default and Dark themes (empty)</li>
            </ul>
            <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#64748b' }}>
              This context is planned for future development. The structure is in place to support website-specific tokens when needed.
            </p>
          </div>
        }
      />
    </TokenPage>
  )
};

