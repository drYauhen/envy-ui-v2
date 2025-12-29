import type { Meta, StoryObj } from '@storybook/react';
import neutral from '../../../tokens/foundations/colors/neutral.json';
import brand from '../../../tokens/foundations/colors/brand.json';
import accent from '../../../tokens/foundations/colors/accent.json';
import { ColorScaleViewer } from '../../viewers/tokens/ColorScaleViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Tokens/Foundations/Colors',
  tags: ['autodocs'],
  parameters: { 
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Base color scales (foundations) are **context-agnostic** and shared across all contexts (app, website, report).

Semantic tokens reference these scales and are optimized for **app-default** context/theme by default. 
Other contexts/themes may override semantic values as needed.

**Current Context/Theme:** Use the Storybook toolbar to switch between contexts and themes.
The default view shows colors in **app-default** context/theme.

**Anchor Colors:**
- **Brand-700** is the canonical brand anchor color (perceptually dark, suitable for primary actions)
- **Accent-600** is the canonical accent anchor color (Viking Blue, suitable for interactive elements)
        `
      }
    }
  }
};

export default meta;

const scales: Record<string, Record<string, { $value: string }>> = {
  neutral: (neutral as any).eui.color.neutral,
  brand: (brand as any).eui.color.brand,
  accent: (accent as any).eui.color.accent
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
