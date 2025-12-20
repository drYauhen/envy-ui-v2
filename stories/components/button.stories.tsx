import type { Meta, StoryObj } from '@storybook/react';
import { ButtonStatesViewer } from '../viewers/components/ButtonStatesViewer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Button',
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

export const Button: Story = {
  name: 'Button (HTML + CSS)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <ButtonStatesViewer
        config={{ intent: 'primary', size: 'md', shape: 'default', label: 'Button' }}
        title="Primary"
        description="Primary button with all states"
      />
      <ButtonStatesViewer
        config={{ intent: 'secondary', size: 'md', shape: 'default', label: 'Button' }}
        title="Secondary"
        description="Secondary button with all states"
      />
      <ButtonStatesViewer
        config={{ intent: 'primary', size: 'md', shape: 'round', label: 'Button' }}
        title="Primary Round"
        description="Primary button with round shape"
      />
    </div>
  )
};
