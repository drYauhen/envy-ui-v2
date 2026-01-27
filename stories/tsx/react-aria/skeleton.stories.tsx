import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonGroup } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Skeleton',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Skeleton'),
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
        <Skeleton variant="text" style={{ width: '160px' }} />
        <Skeleton variant="rectangular" style={{ width: '120px', height: '60px' }} />
        <Skeleton variant="circular" style={{ width: '40px', height: '40px' }} />
      </div>
    </div>
  )
};

export const ShimmerGroup: Story = {
  render: () => (
    <SkeletonGroup animation="wave" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Skeleton variant="circular" style={{ width: '48px', height: '48px' }} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" style={{ width: '70%', marginTop: '0.5rem' }} />
      </div>
      <Skeleton variant="rectangular" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
    </SkeletonGroup>
  )
};

export const NoAnimation: Story = {
  render: () => (
    <div style={stackStyle}>
      <Skeleton variant="text" animation="none" style={{ width: '200px' }} />
      <Skeleton variant="text" animation="none" style={{ width: '150px' }} />
      <Skeleton variant="rectangular" animation="none" style={{ width: '220px', height: '80px' }} />
    </div>
  )
};
