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
  const childArray = React.Children.toArray(children);
  const validCount = childArray.filter(React.isValidElement).length;
  let currentIndex = 0;

  const enhancedChildren = childArray.map((child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const typedChild = child as React.ReactElement<any>;

    const position =
      validCount <= 1
        ? 'first'
        : currentIndex === 0
          ? 'first'
          : currentIndex === validCount - 1
            ? 'last'
            : 'middle';
    currentIndex += 1;

    const existingPosition = typedChild.props['data-eui-group-position'];
    const existingOrientation = typedChild.props['data-eui-group-orientation'];

    return React.cloneElement(child, {
      ...(existingPosition == null ? { 'data-eui-group-position': position } : null),
      ...(existingOrientation == null && orientation === 'vertical'
        ? { 'data-eui-group-orientation': 'vertical' }
        : null)
    });
  });

  return (
    <div
      ref={ref}
      className={[classNames.root, className].filter(Boolean).join(' ')}
      {...(orientationValue !== undefined ? { [dataAttributes.orientation]: orientationValue } : {})}
      {...rest}
    >
      {enhancedChildren}
    </div>
  );
});
