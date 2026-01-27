import * as React from 'react';
import systemMeta from '../../../system.meta.json';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular';
export type SkeletonAnimation = 'shimmer' | 'none';
export type SkeletonGroupAnimation = 'wave' | 'none';

export type SkeletonCleanProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
};

export type SkeletonGroupCleanProps = React.HTMLAttributes<HTMLDivElement> & {
  animation?: SkeletonGroupAnimation;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

export const SkeletonClean = React.forwardRef<HTMLDivElement, SkeletonCleanProps>(function SkeletonClean(
  { variant = 'rectangular', animation = 'shimmer', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={[`${SYSTEM_PREFIX}-skeleton`, className].filter(Boolean).join(' ')}
      {...{
        [prefixedDataAttr('variant')]: variant,
        ...(animation ? { [prefixedDataAttr('animation')]: animation } : null)
      }}
      {...rest}
    />
  );
});

export const SkeletonGroupClean = React.forwardRef<HTMLDivElement, SkeletonGroupCleanProps>(
  function SkeletonGroupClean(
    { animation, className, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={[`${SYSTEM_PREFIX}-skeleton-group`, className].filter(Boolean).join(' ')}
        {...(animation ? { [prefixedDataAttr('animation')]: animation } : null)}
        {...rest}
      />
    );
  }
);
