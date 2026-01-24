import type { Meta, StoryObj } from '@storybook/react';
import { ButtonClean, TooltipClean } from '../../../packages/tsx';
import type { TooltipPlacement } from '../../../packages/tsx';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX (Clean)/Components/Tooltip',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Components/Tooltip'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem',
  padding: '2rem'
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '2rem',
  alignItems: 'center'
};

const placements: TooltipPlacement[] = ['top', 'right', 'bottom', 'left'];

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <div style={containerStyle}>
      <TooltipClean
        content="Tooltip text"
        placement="top"
        isOpen
      >
        <ButtonClean intent="secondary" size="sm">Trigger</ButtonClean>
      </TooltipClean>
    </div>
  )
};

export const Placements: Story = {
  name: 'Placements',
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        {placements.map((placement) => (
          <TooltipClean
            key={placement}
            content={`${placement} tooltip`}
            placement={placement}
            isOpen
          >
            <ButtonClean intent="secondary" size="sm">
              {placement.toUpperCase()}
            </ButtonClean>
          </TooltipClean>
        ))}
      </div>
    </div>
  )
};
