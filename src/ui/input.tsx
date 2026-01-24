import * as React from 'react';
import { useTextField } from 'react-aria';
import type { AriaTextFieldProps } from '@react-types/textfield';
import systemMeta from '../../system.meta.json';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'error';

export type InputProps = Omit<AriaTextFieldProps<HTMLInputElement>, 'inputElementType'> & {
  size?: InputSize;
  state?: InputState;
  className?: string;
  isDisabled?: boolean;
  disabled?: boolean;
  isReadOnly?: boolean;
  readOnly?: boolean;
};

export type InputGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: InputSize;
  state?: InputState;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children: React.ReactElement;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedClass = (name: string) => `${SYSTEM_PREFIX}-${name}`;
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

const mergeClassNames = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    state,
    className,
    isDisabled,
    disabled,
    isReadOnly,
    readOnly,
    isInvalid,
    validationState,
    ...rest
  },
  forwardedRef
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

  const resolvedDisabled = Boolean(disabled ?? isDisabled);
  const resolvedReadOnly = Boolean(readOnly ?? isReadOnly);
  const resolvedState = state ?? ((isInvalid || validationState === 'invalid') ? 'error' : undefined);

  const { inputProps } = useTextField(
    {
      ...rest,
      isDisabled: resolvedDisabled,
      isReadOnly: resolvedReadOnly,
      isInvalid,
      validationState
    },
    inputRef
  );

  return (
    <input
      {...inputProps}
      ref={inputRef}
      className={mergeClassNames(prefixedClass('input'), className)}
      {...{
        [prefixedDataAttr('size')]: size,
        ...(resolvedState ? { [prefixedDataAttr('state')]: resolvedState } : null)
      }}
    />
  );
});

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(
  { size = 'md', state, prefix, suffix, className, children, ...rest },
  ref
) {
  const sizeAttr = prefixedDataAttr('size');
  const stateAttr = prefixedDataAttr('state');

  let inputNode = children;

  if (React.isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>;
    inputNode = React.cloneElement(children, {
      className: mergeClassNames(prefixedClass('input'), childProps.className as string | undefined),
      [sizeAttr]: size,
      ...(state ? { [stateAttr]: state } : null)
    });
  } else {
    console.warn('InputGroup expects a single input element as its child.');
  }

  return (
    <div
      ref={ref}
      className={mergeClassNames(prefixedClass('input-group'), className)}
      {...{
        [sizeAttr]: size,
        ...(state ? { [stateAttr]: state } : null)
      }}
      {...rest}
    >
      {prefix ? (
        <span className={prefixedClass('input-prefix')} data-eui-slot="prefix">
          {prefix}
        </span>
      ) : null}
      {inputNode}
      {suffix ? (
        <span className={prefixedClass('input-suffix')} data-eui-slot="suffix">
          {suffix}
        </span>
      ) : null}
    </div>
  );
});
