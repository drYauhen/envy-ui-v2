import * as React from 'react';
import systemMeta from '../../../system.meta.json';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'error';

export type InputCleanProps = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: InputSize;
  state?: InputState;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

export const InputClean = React.forwardRef<HTMLInputElement, InputCleanProps>(function InputClean(
  { size = 'md', state, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={[`${SYSTEM_PREFIX}-input`, className].filter(Boolean).join(' ')}
      {...{
        [prefixedDataAttr('size')]: size,
        ...(state ? { [prefixedDataAttr('state')]: state } : null)
      }}
      {...rest}
    />
  );
});
