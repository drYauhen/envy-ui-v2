import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const CSSLayerStrategyforContextPriority: Story = {
  name: 'ADR-0024 CSS Layer Strategy for Context Priority',
  render: () => (
    <AdrViewer
      adrNumber="0024"
      title="CSS Layer Strategy for Context Priority"
      status="Superseded by [ADR-0038](./ADR-0038-canonical-token-css-output-contract.md)"
      date="2025-12-26"
    />
  )
};
