import type { Meta, StoryObj } from '@storybook/react';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';

const meta: Meta = {
  title: 'Tokens/App',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const App: Story = {
  name: 'App',
  render: () => (
    <TokenPage>
      <TokenSection
        title="App Context"
        description="Application context tokens. This context contains all foundations, semantic, and component tokens for the application interface. All token categories (Foundations, Semantic, Components) shown in other sections belong to the App context."
      />
      <TokenSection
        title="Structure"
        description={
          <div>
            <p>The App context includes:</p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li><strong>Foundations:</strong> Base color scales, spacing, typography, shape tokens</li>
              <li><strong>Semantic:</strong> Semantic tokens (text, background, border, focus, shadow, shape)</li>
              <li><strong>Components:</strong> Component-specific tokens (button, menu, modal, etc.)</li>
              <li><strong>Themes:</strong> Default and Accessibility themes</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              See individual sections for detailed token listings:
            </p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Tokens/Foundations - Foundation tokens</li>
              <li>Tokens/Semantic - Semantic tokens</li>
              <li>Tokens/Components - Component tokens</li>
              <li>Tokens/Contexts/App/Themes - Theme-specific tokens</li>
            </ul>
          </div>
        }
      />
    </TokenPage>
  )
};

