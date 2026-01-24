import * as React from 'react';
import systemMeta from '../../../system.meta.json';
import type { InputSize, InputState } from './input';

export type InputGroupCleanProps = React.HTMLAttributes<HTMLDivElement> & {
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

export const InputGroupClean = React.forwardRef<HTMLDivElement, InputGroupCleanProps>(function InputGroupClean(
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
    console.warn('InputGroupClean expects a single input element as its child.');
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
