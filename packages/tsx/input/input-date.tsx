import * as React from 'react';
import type { InputCleanProps } from './input';
import { InputClean } from './input';

export type InputDateCleanProps = Omit<InputCleanProps, 'type'>;

export const InputDateClean = React.forwardRef<HTMLInputElement, InputDateCleanProps>(function InputDateClean(
  props,
  ref
) {
  return <InputClean ref={ref} type="date" {...props} />;
});
