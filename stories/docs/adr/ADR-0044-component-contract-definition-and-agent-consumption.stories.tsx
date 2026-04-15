import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    ...getSectionParameters('Docs/ADR'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const componentContractDefinitionandAgentConsumption: Story = {
  name: 'ADR-0044 Component Contract Definition and Agent Consumption',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0044-component-contract-definition-and-agent-consumption.md"
      status="Accepted"
      lastUpdated="2026-04-07"
      fallback="Loading ADR-0044 Component Contract Definition and Agent Consumption..."
    />
  )
};
