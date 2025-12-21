import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroupViewer } from '../viewers/components/ButtonGroupViewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Button Group',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

export const ButtonGroup: Story = {
  name: 'Button Group (HTML + CSS)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      {/* Horizontal Groups */}
      <ButtonGroupViewer
        config={{
          orientation: 'horizontal',
          intent: 'primary',
          size: 'md',
          shape: 'default'
        }}
        title="Horizontal Group - Primary"
        description="Primary buttons in horizontal group (2, 3, 4 buttons)"
      />

      <ButtonGroupViewer
        config={{
          orientation: 'horizontal',
          intent: 'accent',
          size: 'md',
          shape: 'default'
        }}
        title="Horizontal Group - Accent"
        description="Accent buttons in horizontal group (2, 3, 4 buttons)"
      />

      <ButtonGroupViewer
        config={{
          orientation: 'horizontal',
          intent: 'secondary',
          size: 'md',
          shape: 'default'
        }}
        title="Horizontal Group - Secondary"
        description="Secondary buttons in horizontal group (2, 3, 4 buttons)"
      />

      {/* Vertical Groups */}
      <ButtonGroupViewer
        config={{
          orientation: 'vertical',
          intent: 'primary',
          size: 'md',
          shape: 'default'
        }}
        title="Vertical Group - Primary"
        description="Primary buttons in vertical group (2, 3, 4 buttons)"
      />

      <ButtonGroupViewer
        config={{
          orientation: 'vertical',
          intent: 'accent',
          size: 'md',
          shape: 'default'
        }}
        title="Vertical Group - Accent"
        description="Accent buttons in vertical group (2, 3, 4 buttons)"
      />

      <ButtonGroupViewer
        config={{
          orientation: 'vertical',
          intent: 'secondary',
          size: 'md',
          shape: 'default'
        }}
        title="Vertical Group - Secondary"
        description="Secondary buttons in vertical group (2, 3, 4 buttons)"
      />
    </div>
  )
};

