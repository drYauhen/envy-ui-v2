import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonClean, SkeletonGroupClean } from '../../../packages/tsx';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX (Clean)/Components/Skeleton',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Components/Skeleton'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const stackStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.25rem'
};

const rowStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center' as const,
  flexWrap: 'wrap' as const
};

export const Variants: Story = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <SkeletonClean variant="text" style={{ width: '160px' }} />
        <SkeletonClean variant="rectangular" style={{ width: '120px', height: '60px' }} />
        <SkeletonClean variant="circular" style={{ width: '40px', height: '40px' }} />
      </div>
    </div>
  )
};

export const ShimmerGroup: Story = {
  render: () => (
    <SkeletonGroupClean animation="wave" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <SkeletonClean variant="circular" style={{ width: '48px', height: '48px' }} />
      <div style={{ flex: 1 }}>
        <SkeletonClean variant="text" />
        <SkeletonClean variant="text" style={{ width: '70%', marginTop: '0.5rem' }} />
      </div>
      <SkeletonClean variant="rectangular" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
    </SkeletonGroupClean>
  )
};

export const NoAnimation: Story = {
  render: () => (
    <div style={stackStyle}>
      <SkeletonClean variant="text" animation="none" style={{ width: '200px' }} />
      <SkeletonClean variant="text" animation="none" style={{ width: '150px' }} />
      <SkeletonClean variant="rectangular" animation="none" style={{ width: '220px', height: '80px' }} />
    </div>
  )
};
