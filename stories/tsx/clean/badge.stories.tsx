import type { Meta, StoryObj } from '@storybook/react';
import { BadgeClean } from '../../../packages/tsx';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX (Clean)/Components/Badge',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Components/Badge'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '0.75rem',
  alignItems: 'center'
};

const labelStyle = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#0f172a',
  minWidth: '110px'
} as const;

const badgeVariants = ['subtle', 'solid', 'outline'] as const;
const badgeTones = ['neutral', 'success', 'warning', 'error', 'info'] as const;
const badgeSizes = ['default', 'small'] as const;
const badgeShapes = ['rectangular', 'pill', 'circle'] as const;

export const Default: Story = {
  render: () => (
    <div style={rowStyle}>
      <BadgeClean tone="neutral">Neutral</BadgeClean>
      <BadgeClean tone="success">Success</BadgeClean>
      <BadgeClean tone="warning">Warning</BadgeClean>
      <BadgeClean tone="error">Error</BadgeClean>
      <BadgeClean tone="info">Info</BadgeClean>
    </div>
  )
};

export const Clickable: Story = {
  render: () => (
    <div style={rowStyle}>
      <BadgeClean as="button" variant="subtle" tone="success" onClick={() => console.log('Badge clicked')}>
        Clickable
      </BadgeClean>
      <BadgeClean as="a" href="#info" variant="solid" tone="info" onClick={(e) => e.preventDefault()}>
        Link badge
      </BadgeClean>
    </div>
  )
};

export const Dismissible: Story = {
  render: () => (
    <div style={rowStyle}>
      <BadgeClean tone="neutral" onDismiss={() => console.log('Dismissed neutral')}>
        Neutral
      </BadgeClean>
      <BadgeClean tone="success" variant="solid" onDismiss={() => console.log('Dismissed success')}>
        Success
      </BadgeClean>
      <BadgeClean tone="warning" size="small" onDismiss={() => console.log('Dismissed warning')}>
        Warning
      </BadgeClean>
      <BadgeClean tone="info" shape="pill" onDismiss={() => console.log('Dismissed info')}>
        Pill
      </BadgeClean>
    </div>
  )
};

export const Matrix: Story = {
  name: 'Matrix',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {badgeVariants.map((variant) => (
        <div key={`clean-${variant}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ ...labelStyle, minWidth: 'auto' }}>Variant: {variant}</div>
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-rect`} style={rowStyle}>
              <span style={labelStyle}>{size} / rect</span>
              {badgeTones.map((tone) => (
                <BadgeClean key={`clean-${variant}-${size}-rect-${tone}`} tone={tone} variant={variant} size={size} shape="rectangular">
                  {tone}
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-pill`} style={rowStyle}>
              <span style={labelStyle}>{size} / pill</span>
              {badgeTones.map((tone) => (
                <BadgeClean key={`clean-${variant}-${size}-pill-${tone}`} tone={tone} variant={variant} size={size} shape="pill">
                  {tone}
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-circle`} style={rowStyle}>
              <span style={labelStyle}>{size} / circle</span>
              {badgeTones.map((tone) => (
                <BadgeClean
                  key={`clean-${variant}-${size}-circle-${tone}`}
                  tone={tone}
                  variant={variant}
                  size={size}
                  shape="circle"
                  aria-label={`${tone} status`}
                >
                  +
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-disabled-rect`} style={rowStyle}>
              <span style={labelStyle}>{size} / disabled rect</span>
              {badgeTones.map((tone) => (
                <BadgeClean
                  key={`clean-${variant}-${size}-disabled-rect-${tone}`}
                  tone={tone}
                  variant={variant}
                  size={size}
                  shape="rectangular"
                  as="button"
                  disabled
                >
                  {tone}
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-disabled-pill`} style={rowStyle}>
              <span style={labelStyle}>{size} / disabled pill</span>
              {badgeTones.map((tone) => (
                <BadgeClean
                  key={`clean-${variant}-${size}-disabled-pill-${tone}`}
                  tone={tone}
                  variant={variant}
                  size={size}
                  shape="pill"
                  as="button"
                  disabled
                >
                  {tone}
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-disabled-circle`} style={rowStyle}>
              <span style={labelStyle}>{size} / disabled circle</span>
              {badgeTones.map((tone) => (
                <BadgeClean
                  key={`clean-${variant}-${size}-disabled-circle-${tone}`}
                  tone={tone}
                  variant={variant}
                  size={size}
                  shape="circle"
                  as="button"
                  aria-label={`${tone} status`}
                  disabled
                >
                  +
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-dismiss-rect`} style={rowStyle}>
              <span style={labelStyle}>{size} / dismiss rect</span>
              {badgeTones.map((tone) => (
                <BadgeClean
                  key={`clean-${variant}-${size}-dismiss-rect-${tone}`}
                  tone={tone}
                  variant={variant}
                  size={size}
                  shape="rectangular"
                  onDismiss={() => console.log(`Dismissed ${tone}`)}
                >
                  {tone}
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-dismiss-pill`} style={rowStyle}>
              <span style={labelStyle}>{size} / dismiss pill</span>
              {badgeTones.map((tone) => (
                <BadgeClean
                  key={`clean-${variant}-${size}-dismiss-pill-${tone}`}
                  tone={tone}
                  variant={variant}
                  size={size}
                  shape="pill"
                  onDismiss={() => console.log(`Dismissed ${tone}`)}
                >
                  {tone}
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-dismiss-disabled-rect`} style={rowStyle}>
              <span style={labelStyle}>{size} / dismiss disabled rect</span>
              {badgeTones.map((tone) => (
                <BadgeClean
                  key={`clean-${variant}-${size}-dismiss-disabled-rect-${tone}`}
                  tone={tone}
                  variant={variant}
                  size={size}
                  shape="rectangular"
                  onDismiss={() => console.log(`Dismissed ${tone}`)}
                  dismissDisabled
                >
                  {tone}
                </BadgeClean>
              ))}
            </div>
          ))}
          {badgeSizes.map((size) => (
            <div key={`clean-${variant}-${size}-dismiss-disabled-pill`} style={rowStyle}>
              <span style={labelStyle}>{size} / dismiss disabled pill</span>
              {badgeTones.map((tone) => (
                <BadgeClean
                  key={`clean-${variant}-${size}-dismiss-disabled-pill-${tone}`}
                  tone={tone}
                  variant={variant}
                  size={size}
                  shape="pill"
                  onDismiss={() => console.log(`Dismissed ${tone}`)}
                  dismissDisabled
                >
                  {tone}
                </BadgeClean>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};
