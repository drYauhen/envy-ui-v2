import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../../utils/story-layout';

const meta: Meta<typeof Badge> = {
  title: 'TSX + React Aria/Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Badge'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj<typeof Badge>;

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
  gap: '0.75rem',
  alignItems: 'center'
};

const helperTextStyle = {
  margin: '0 0 1rem 0',
  color: 'var(--eui-color-text-muted)'
};

const badgeTones = ['neutral', 'success', 'warning', 'error', 'info'] as const;
const badgeVariants = ['subtle', 'solid', 'outline'] as const;
const badgeSizes = ['default', 'small'] as const;
const badgeShapes = ['rectangular', 'pill', 'circle'] as const;

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Default">
              <div style={rowStyle}>
                {badgeTones.map((tone) => (
                  <Badge key={`default-${tone}`} tone={tone}>
                    {tone}
                  </Badge>
                ))}
              </div>
            </StorySection>

            <StorySection title="Clickable">
              <p style={helperTextStyle}>
                Clickable badges set <code>data-eui-interactive</code> automatically when <code>onPress</code> or <code>href</code> is provided.
              </p>
              <div style={rowStyle}>
                <Badge tone="success" onPress={() => console.log('Badge pressed')}>
                  Press me
                </Badge>
                <Badge tone="info" variant="solid" href="#info" onClick={(e) => e.preventDefault()}>
                  Link badge
                </Badge>
              </div>
            </StorySection>

            <StorySection title="Dismissible">
              <p style={helperTextStyle}>
                Dismissible badges render a dedicated close button. Interactive roots are intentionally not combined.
              </p>
              <div style={rowStyle}>
                <Badge tone="neutral" onDismiss={() => console.log('Dismissed neutral')}>
                  Neutral
                </Badge>
                <Badge tone="warning" variant="solid" onDismiss={() => console.log('Dismissed warning')}>
                  Warning
                </Badge>
                <Badge tone="info" size="small" onDismiss={() => console.log('Dismissed info')}>
                  Info
                </Badge>
                <Badge tone="success" shape="pill" onDismiss={() => console.log('Dismissed pill')}>
                  Pill
                </Badge>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};

export const Matrix: Story = {
  name: 'Matrix',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            {badgeVariants.map((variant) => (
              <StorySection key={`aria-${variant}`} title={`Variant: ${variant}`}>
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-rect`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / rect</span>
                    {badgeTones.map((tone) => (
                      <Badge key={`aria-${variant}-${size}-rect-${tone}`} tone={tone} variant={variant} size={size} shape="rectangular">
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-pill`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / pill</span>
                    {badgeTones.map((tone) => (
                      <Badge key={`aria-${variant}-${size}-pill-${tone}`} tone={tone} variant={variant} size={size} shape="pill">
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-circle`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / circle</span>
                    {badgeTones.map((tone) => (
                      <Badge
                        key={`aria-${variant}-${size}-circle-${tone}`}
                        tone={tone}
                        variant={variant}
                        size={size}
                        shape="circle"
                        aria-label={`${tone} status`}
                      >
                        +
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-disabled-rect`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / disabled rect</span>
                    {badgeTones.map((tone) => (
                      <Badge
                        key={`aria-${variant}-${size}-disabled-rect-${tone}`}
                        tone={tone}
                        variant={variant}
                        size={size}
                        shape="rectangular"
                        onPress={() => console.log(`Pressed ${tone}`)}
                        isDisabled
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-disabled-pill`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / disabled pill</span>
                    {badgeTones.map((tone) => (
                      <Badge
                        key={`aria-${variant}-${size}-disabled-pill-${tone}`}
                        tone={tone}
                        variant={variant}
                        size={size}
                        shape="pill"
                        onPress={() => console.log(`Pressed ${tone}`)}
                        isDisabled
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-disabled-circle`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / disabled circle</span>
                    {badgeTones.map((tone) => (
                      <Badge
                        key={`aria-${variant}-${size}-disabled-circle-${tone}`}
                        tone={tone}
                        variant={variant}
                        size={size}
                        shape="circle"
                        aria-label={`${tone} status`}
                        onPress={() => console.log(`Pressed ${tone}`)}
                        isDisabled
                      >
                        +
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-dismiss-rect`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / dismiss rect</span>
                    {badgeTones.map((tone) => (
                      <Badge
                        key={`aria-${variant}-${size}-dismiss-rect-${tone}`}
                        tone={tone}
                        variant={variant}
                        size={size}
                        shape="rectangular"
                        onDismiss={() => console.log(`Dismissed ${tone}`)}
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-dismiss-pill`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / dismiss pill</span>
                    {badgeTones.map((tone) => (
                      <Badge
                        key={`aria-${variant}-${size}-dismiss-pill-${tone}`}
                        tone={tone}
                        variant={variant}
                        size={size}
                        shape="pill"
                        onDismiss={() => console.log(`Dismissed ${tone}`)}
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-dismiss-disabled-rect`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / dismiss disabled rect</span>
                    {badgeTones.map((tone) => (
                      <Badge
                        key={`aria-${variant}-${size}-dismiss-disabled-rect-${tone}`}
                        tone={tone}
                        variant={variant}
                        size={size}
                        shape="rectangular"
                        onDismiss={() => console.log(`Dismissed ${tone}`)}
                        dismissDisabled
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
                {badgeSizes.map((size) => (
                  <div key={`aria-${variant}-${size}-dismiss-disabled-pill`} style={rowStyle}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--eui-color-text-muted)' }}>{size} / dismiss disabled pill</span>
                    {badgeTones.map((tone) => (
                      <Badge
                        key={`aria-${variant}-${size}-dismiss-disabled-pill-${tone}`}
                        tone={tone}
                        variant={variant}
                        size={size}
                        shape="pill"
                        onDismiss={() => console.log(`Dismissed ${tone}`)}
                        dismissDisabled
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
              </StorySection>
            ))}
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
