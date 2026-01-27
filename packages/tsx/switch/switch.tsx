import * as React from 'react';
import systemMeta from '../../../system.meta.json';

export type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchCleanProps = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: SwitchSize;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

export const SwitchClean = React.forwardRef<HTMLInputElement, SwitchCleanProps>(function SwitchClean(
  { size = 'md', className, type = 'checkbox', ...rest },
  ref
) {
  return (
    <input
      {...rest}
      ref={ref}
      type={type}
      className={[`${SYSTEM_PREFIX}-switch`, className].filter(Boolean).join(' ')}
      {...{
        [prefixedDataAttr('size')]: size
      }}
    />
  );
});
