import * as React from 'react';
import systemMeta from '../../../system.meta.json';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export type CheckboxCleanProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: CheckboxSize;
  indeterminate?: boolean;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

export const CheckboxClean = React.forwardRef<HTMLInputElement, CheckboxCleanProps>(function CheckboxClean(
  {
    size = 'md',
    indeterminate,
    className,
    type = 'checkbox',
    ...rest
  },
  ref
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <input
      {...rest}
      ref={inputRef}
      type={type}
      className={[`${SYSTEM_PREFIX}-checkbox`, className].filter(Boolean).join(' ')}
      {...{
        [prefixedDataAttr('size')]: size,
        ...(indeterminate ? { 'aria-checked': 'mixed' } : null)
      }}
    />
  );
});
