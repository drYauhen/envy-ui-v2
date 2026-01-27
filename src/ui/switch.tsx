import * as React from 'react';
import { useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';
import type { AriaSwitchProps } from '@react-types/switch';
import systemMeta from '../../system.meta.json';

export type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchProps = AriaSwitchProps & {
  size?: SwitchSize;
  className?: string;
  inputClassName?: string;
  isDisabled?: boolean;
  disabled?: boolean;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedClass = (name: string) => `${SYSTEM_PREFIX}-${name}`;
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;
const mergeClassNames = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(function Switch(
  {
    size = 'md',
    className,
    inputClassName,
    children,
    isDisabled,
    disabled,
    ...rest
  },
  ref
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const resolvedDisabled = Boolean(disabled ?? isDisabled);
  const ariaProps = { ...rest, children, isDisabled: resolvedDisabled };
  const state = useToggleState(ariaProps);
  const { labelProps, inputProps } = useSwitch(ariaProps, state, inputRef);

  return (
    <label
      ref={ref}
      {...labelProps}
      className={mergeClassNames(prefixedClass('switch-wrapper'), className)}
    >
      <input
        {...inputProps}
        ref={inputRef}
        className={mergeClassNames(prefixedClass('switch'), inputClassName)}
        {...{
          [prefixedDataAttr('size')]: size
        }}
      />
      {children ? <span className={prefixedClass('label')}>{children}</span> : null}
    </label>
  );
});
