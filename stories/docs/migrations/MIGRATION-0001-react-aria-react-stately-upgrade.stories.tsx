import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Migrations',
  parameters: {
    ...getSectionParameters('Docs/Migrations'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const reactAriaAndReactStatelyUpgrade: Story = {
  name: 'Migration-0001 React Aria and React Stately Upgrade',
  render: () => (
    <DocViewer
      markdownPath="/docs/migrations/2026-04-08-react-aria-react-stately-upgrade.md"
      status="Completed"
      lastUpdated="2026-04-08"
      fallback="Loading Migration-0001 React Aria and React Stately Upgrade..."
    />
  )
};
