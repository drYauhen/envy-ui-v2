import * as React from 'react';
import { buttonGroupContract } from './button-group.contract';

export type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical';
};

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { orientation = 'horizontal', className, children, ...rest },
  ref
) {
  const { classNames, dataAttributes } = buttonGroupContract;
  const orientationValue =
    orientation === 'vertical' ? dataAttributes.orientationValues.vertical : dataAttributes.orientationValues.horizontal;

  return (
    <div
      ref={ref}
      className={[classNames.root, className].filter(Boolean).join(' ')}
      {...(orientationValue !== undefined ? { [dataAttributes.orientation]: orientationValue } : {})}
      {...rest}
    >
      {children}
    </div>
  );
});
