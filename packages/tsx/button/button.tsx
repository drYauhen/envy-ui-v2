import * as React from 'react';
import type { ButtonIntent, ButtonShape, ButtonSize } from '../../../generated/tsx/button.contract';
import systemMeta from '../../../system.meta.json';

export type ButtonCleanProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: ButtonIntent;
  size?: ButtonSize;
  shape?: ButtonShape;
  selected?: boolean;
};

const dataAttr = (value: boolean | undefined) => (value ? '' : undefined);
const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

export const ButtonClean = React.forwardRef<HTMLButtonElement, ButtonCleanProps>(function ButtonClean(
  { intent = 'primary', size = 'md', shape = 'default', selected, className, disabled, children, ...rest },
  forwardedRef
) {
  return (
    <button
      ref={forwardedRef}
      className={[`${SYSTEM_PREFIX}-button`, className].filter(Boolean).join(' ')}
      {...{
        [prefixedDataAttr('intent')]: intent,
        [prefixedDataAttr('size')]: size,
        [prefixedDataAttr('shape')]: shape,
        [prefixedDataAttr('selected')]: dataAttr(selected),
        [prefixedDataAttr('disabled')]: dataAttr(disabled)
      }}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});
