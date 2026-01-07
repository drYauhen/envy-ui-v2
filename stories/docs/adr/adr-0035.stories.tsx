import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const CSSNamingConventionsClassNamesvsDataAttributes: Story = {
  name: 'ADR-0035 CSS Naming Conventions - Class Names vs Data Attributes',
  render: () => (
    <AdrViewer
      adrNumber="0035"
      title="CSS Naming Conventions - Class Names vs Data Attributes"
      status="Accepted"
      date="2026-01-07"
    />
  )
};
