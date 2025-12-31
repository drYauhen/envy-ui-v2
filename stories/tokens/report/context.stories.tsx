import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';

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
        description="Report context tokens. This structure is defined but currently empty. Tokens will be added when report context is developed."
      />
      <TokenSection
        title="Structure"
        description={
          <div>
            <p>The Report context structure includes:</p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li><strong>Foundations:</strong> Base color scales, spacing, typography, shape tokens (empty)</li>
              <li><strong>Semantic:</strong> Semantic tokens (text, background, border, focus, shadow, shape) (empty)</li>
              <li><strong>Components:</strong> Component-specific tokens (empty)</li>
              <li><strong>Themes:</strong> Print and Screen themes (empty)</li>
            </ul>
            <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#64748b' }}>
              This context is planned for future development. The structure is in place to support report-specific tokens (optimized for print and screen outputs) when needed.
            </p>
          </div>
        }
      />
    </TokenPage>
  )
};

