import type { Meta, StoryObj } from '@storybook/react';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '../../../src/ui';
import type { TooltipPlacement } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Tooltip',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Tooltip'),
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

const helperTextStyle = {
  margin: '0 0 1rem 0',
  color: 'var(--eui-color-text-muted)'
};

const placements: TooltipPlacement[] = ['top', 'right', 'bottom', 'left'];

export const Interactive: Story = {
  name: 'Interactive',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <p style={helperTextStyle}>Hover or focus the trigger to see the tooltip.</p>
          <Tooltip placement="top">
            <TooltipTrigger asChild>
              <Button intent="secondary" size="sm">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Helpful tooltip content</TooltipContent>
          </Tooltip>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const Placements: Story = {
  name: 'Placements',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <div style={rowStyle}>
            {placements.map((placement) => (
              <Tooltip
                key={placement}
                placement={placement}
                isOpen={true}
                onOpenChange={() => {}}
              >
                <TooltipTrigger asChild>
                  <Button intent="secondary" size="sm">
                    {placement.toUpperCase()}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{placement} tooltip</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const LongContent: Story = {
  name: 'Long Content',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <Tooltip placement="bottom" isOpen={true} onOpenChange={() => {}}>
            <TooltipTrigger asChild>
              <Button intent="secondary" size="sm">Details</Button>
            </TooltipTrigger>
            <TooltipContent style={{ maxWidth: '220px', textAlign: 'left' }}>
              Tooltips can wrap across multiple lines to provide short explanatory guidance without overwhelming the UI.
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </MultiContextViewer>
  )
};
