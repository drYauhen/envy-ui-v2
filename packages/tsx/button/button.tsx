import * as React from 'react';
import type { ButtonIntent, ButtonShape, ButtonSize } from '../../../generated/contracts/button.contract';

export type ButtonCleanProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: ButtonIntent;
  size?: ButtonSize;
  shape?: ButtonShape;
  selected?: boolean;
};

const dataAttr = (value: boolean | undefined) => (value ? '' : undefined);

export const ButtonClean = React.forwardRef<HTMLButtonElement, ButtonCleanProps>(function ButtonClean(
  { intent = 'primary', size = 'md', shape = 'default', selected, className, disabled, children, ...rest },
  forwardedRef
) {
  return (
    <button
      ref={forwardedRef}
      className={['ui-button', className].filter(Boolean).join(' ')}
      data-intent={intent}
      data-size={size}
      data-shape={shape}
      data-selected={dataAttr(selected)}
      data-disabled={dataAttr(disabled)}
      // Legacy compatibility for existing CSS selectors
      data-ui-intent={intent}
      data-ui-size={size}
      data-ui-shape={shape}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});
