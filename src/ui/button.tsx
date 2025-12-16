import * as React from 'react';
import { mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import type { PressEvent } from 'react-aria';

export type ButtonIntent = 'primary' | 'secondary';
export type ButtonShape = 'round' | 'circle';
export type ButtonSize = 'md';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: ButtonIntent;
  shape?: ButtonShape;
  size?: ButtonSize;
  isDisabled?: boolean;
  onPress?: (event: PressEvent) => void;
};

const dataAttr = (value: boolean) => (value ? '' : undefined);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    intent = 'primary',
    shape = 'round',
    size = 'md',
    disabled,
    isDisabled,
    onPress,
    className,
    type = 'button',
    children,
    ...domProps
  },
  forwardedRef
) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useImperativeHandle(forwardedRef, () => ref.current as HTMLButtonElement);

  const resolvedDisabled = disabled ?? isDisabled ?? false;

  const { buttonProps, isPressed } = useButton(
    {
      ...(domProps as Record<string, unknown>),
      type,
      isDisabled: resolvedDisabled,
      onPress
    },
    ref
  );

  const { hoverProps, isHovered } = useHover({ isDisabled: resolvedDisabled });
  const { focusProps, isFocusVisible, isFocused } = useFocusRing();

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      ref={ref}
      type={type}
      className={['ui-button', className].filter(Boolean).join(' ')}
      data-ui-intent={intent}
      data-ui-size={size}
      data-ui-shape={shape}
      data-ui-hovered={dataAttr(isHovered)}
      data-ui-pressed={dataAttr(isPressed)}
      data-ui-focused={dataAttr(isFocused)}
      data-ui-focus-visible={dataAttr(isFocusVisible)}
      disabled={resolvedDisabled}
    >
      {children}
    </button>
  );
});

