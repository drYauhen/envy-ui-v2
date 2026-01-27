import * as React from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import type { AriaCheckboxProps } from '@react-types/checkbox';
import systemMeta from '../../system.meta.json';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export type CheckboxProps = AriaCheckboxProps & {
  size?: CheckboxSize;
  className?: string;
  inputClassName?: string;
  isDisabled?: boolean;
  disabled?: boolean;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedClass = (name: string) => `${SYSTEM_PREFIX}-${name}`;
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;
const mergeClassNames = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(function Checkbox(
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
  const { labelProps, inputProps } = useCheckbox(ariaProps, state, inputRef);

  return (
    <label
      ref={ref}
      {...labelProps}
      className={mergeClassNames(prefixedClass('checkbox-wrapper'), className)}
    >
      <input
        {...inputProps}
        ref={inputRef}
        className={mergeClassNames(prefixedClass('checkbox'), inputClassName)}
        {...{
          [prefixedDataAttr('size')]: size
        }}
      />
      {children ? <span className={prefixedClass('label')}>{children}</span> : null}
    </label>
  );
});
