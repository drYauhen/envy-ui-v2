import type { Meta, StoryObj } from '@storybook/react';
import neutral from '../../../tokens/foundations/colors/neutral.json';
import brand from '../../../tokens/foundations/colors/brand.json';
import accent from '../../../tokens/foundations/colors/accent.json';
import { ColorScaleViewer } from '../../viewers/tokens/ColorScaleViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Tokens/Foundations/Colors',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

export default meta;

const scales: Record<string, Record<string, { $value: string }>> = {
  neutral: (neutral as any).ui.color.neutral,
  brand: (brand as any).ui.color.brand,
  accent: (accent as any).ui.color.accent
};

const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

const renderFamily = (family: string) => (
  <ColorScaleViewer
    family={family}
    tokens={scales[family] ?? {}}
    steps={steps}
    title={`Foundations / Colors — ${family}`}
    description="Inspection-only. Base tones (50-900) projected directly from tokens/foundations/colors."
  />
);

export const Neutral: Story = {
  name: 'Neutral',
  render: () => renderFamily('neutral')
};

export const Brand: Story = {
  name: 'Brand',
  render: () => renderFamily('brand')
};

export const Accent: Story = {
  name: 'Accent',
  render: () => renderFamily('accent')
};
