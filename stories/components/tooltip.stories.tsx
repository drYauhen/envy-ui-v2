import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../.storybook/preview';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';

const meta: Meta = {
  title: 'HTML + CSS/Components/Tooltip',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem',
  padding: '2rem',
  backgroundColor: 'var(--eui-color-background-surface)',
  color: 'var(--eui-color-text-primary)'
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

type TooltipExampleProps = {
  label: string;
  content: string;
  placement: 'top' | 'right' | 'bottom' | 'left';
};

const TooltipExample = ({ label, content, placement }: TooltipExampleProps) => (
  <div className="eui-tooltip-anchor" style={{ minWidth: '120px', justifyContent: 'center' }}>
    <button
      className="eui-button"
      data-eui-intent="secondary"
      data-eui-size="sm"
      aria-describedby={`tooltip-${placement}`}
    >
      {label}
    </button>
    <div
      id={`tooltip-${placement}`}
      className="eui-tooltip"
      data-eui-open="true"
      data-eui-placement={placement}
      data-eui-positioning="css"
      role="tooltip"
    >
      {content}
    </div>
  </div>
);

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/Tooltip'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Default Tooltip">
              <p style={helperTextStyle}>
                Tooltips are positioned with <code>data-eui-placement</code> and shown with
                <code> data-eui-open</code> in the HTML layer.
              </p>
              <TooltipExample label="Hover me" content="Tooltip text" placement="top" />
            </StorySection>

            <StorySection title="Placements">
              <div style={rowStyle}>
                <TooltipExample label="Top" content="Top tooltip" placement="top" />
                <TooltipExample label="Right" content="Right tooltip" placement="right" />
                <TooltipExample label="Bottom" content="Bottom tooltip" placement="bottom" />
                <TooltipExample label="Left" content="Left tooltip" placement="left" />
              </div>
            </StorySection>

            <StorySection title="Multiline Content">
              <p style={helperTextStyle}>
                Long content wraps based on the tooltip max-width token.
              </p>
              <div className="eui-tooltip-anchor">
                <span className="eui-badge" data-eui-variant="outline" data-eui-tone="neutral">
                  Hover details
                </span>
                <div
                  className="eui-tooltip"
                  data-eui-open="true"
                  data-eui-placement="bottom"
                  data-eui-positioning="css"
                  role="tooltip"
                  style={{ maxWidth: '220px', textAlign: 'left' }}
                >
                  Tooltip content can wrap to multiple lines when additional context is needed.
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
