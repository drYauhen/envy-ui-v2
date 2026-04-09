import type { Meta, StoryObj } from '@storybook/react';
import { DocListViewer } from '../../viewers/docs/DocListViewer';
import { migrations } from '../../viewers/docs/migration-data';
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

export const Overview: Story = {
  name: 'Migrations Overview',
  render: () => <DocListViewer docs={migrations} category="migration" />
};
