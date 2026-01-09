import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    ...getSectionParameters('Docs/Architecture'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const AdrValidationAndImplementation: Story = {
  name: 'ADR Validation and Implementation',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/adr-validation-and-implementation.md"
      fallback="Loading ADR Validation and Implementation..."
    />
  )
};
