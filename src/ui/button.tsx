import * as React from 'react';
import { mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import type { AriaButtonProps, PressEvent } from 'react-aria';
import type { ButtonIntent, ButtonShape, ButtonSize } from '../../generated/tsx/button.contract';
export type { ButtonIntent, ButtonShape, ButtonSize } from '../../generated/tsx/button.contract';

type HostButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type HostLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

type BaseProps = {
  intent?: ButtonIntent;
  size?: ButtonSize;
  shape?: ButtonShape;
  isDisabled?: boolean;
  /**
   * When true, press interactions are blocked and aria-busy is set.
   */
  isLoading?: boolean;
  /**
   * React Aria press handler. onClick is passed through for compatibility.
   */
  onPress?: (event: PressEvent) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Optional leading/trailing icons. Styling is up to consumers/CSS.
   */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /**
   * Render behavior/attributes onto a child element instead of creating a host.
   * Must be a single element that can accept refs and DOM props.
   */
  asChild?: boolean;
  className?: string;
};

type LinkHostProps = {
  href: string;
  target?: HostLinkProps['target'];
  rel?: HostLinkProps['rel'];
  asChild?: false;
  type?: undefined;
} & HostLinkProps;

type ButtonHostProps =
  | ({
      href?: undefined;
      asChild?: false;
      type?: HostButtonProps['type'];
    } & HostButtonProps)
  | LinkHostProps;

type AsChildProps = {
  asChild: true;
  /**
   * href is allowed only if the child is anchor-like; we do a best-effort warning.
   */
  href?: string;
  target?: HostLinkProps['target'];
  rel?: HostLinkProps['rel'];
  type?: HostButtonProps['type'];
  children: React.ReactElement;
};

export type ButtonProps = BaseProps & (ButtonHostProps | AsChildProps);

const dataAttr = (value: boolean) => (value ? '' : undefined);

const isAnchorLike = (el: React.ReactElement) => {
  const tag = typeof el.type === 'string' ? el.type : null;
  return tag === 'a';
};

export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(props, forwardedRef) {
  const {
    intent = 'primary',
    size = 'md',
    shape = 'default',
    isDisabled,
    disabled,
    isLoading,
    onPress,
    onClick,
    startIcon,
    endIcon,
    asChild,
    className,
    children,
    ...rest
  } = props as ButtonProps & Record<string, unknown>;

  const hostRef = React.useRef<HTMLElement>(null);
  React.useImperativeHandle(forwardedRef, () => hostRef.current as HTMLElement);

  const hostIsLink = Boolean('href' in props && props.href);
  const resolvedType = !hostIsLink ? (props as ButtonHostProps).type ?? 'button' : undefined;
  const resolvedDisabled = Boolean(disabled ?? isDisabled ?? isLoading);

  const elementType = (hostIsLink ? 'a' : 'button') as AriaButtonProps['elementType'];

  if (asChild && React.Children.count(children) !== 1) {
    console.warn('Button asChild expects a single React element child.');
  }

  if (asChild && hostIsLink) {
    const onlyChild = React.Children.only(children) as React.ReactElement;
    if (!isAnchorLike(onlyChild)) {
      console.warn('Button: href + asChild used with a non-anchor child. Verify semantics manually.');
    }
  }

  const linkPropsSafe = hostIsLink ? (props as LinkHostProps) : null;

  const ariaProps: AriaButtonProps = {
    elementType,
    isDisabled: resolvedDisabled,
    onPress,
    href: linkPropsSafe?.href,
    target: linkPropsSafe?.target,
    rel: linkPropsSafe?.rel,
    type: resolvedType as AriaButtonProps['type']
  };

  const { buttonProps, isPressed } = useButton(ariaProps, hostRef);
  const { hoverProps, isHovered } = useHover({ isDisabled: resolvedDisabled });
  const { focusProps, isFocusVisible, isFocused } = useFocusRing();

  const dataAttributes = {
    'data-intent': intent,
    'data-size': size,
    'data-shape': shape,
    'data-hovered': dataAttr(isHovered),
    'data-pressed': dataAttr(isPressed),
    'data-focus-visible': dataAttr(isFocusVisible),
    'data-disabled': dataAttr(resolvedDisabled),
    'data-loading': dataAttr(Boolean(isLoading)),
    // Backward compatibility with existing CSS selectors
    'data-ui-intent': intent,
    'data-ui-size': size,
    'data-ui-shape': shape,
    'data-ui-hovered': dataAttr(isHovered),
    'data-ui-pressed': dataAttr(isPressed),
    'data-ui-focused': dataAttr(isFocused),
    'data-ui-focus-visible': dataAttr(isFocusVisible)
  };

  const baseProps = mergeProps(buttonProps, hoverProps, focusProps, {
    className: ['ui-button', className].filter(Boolean).join(' '),
    'aria-busy': isLoading ? 'true' : undefined,
    ...(resolvedType && elementType === 'button' ? { type: resolvedType } : null),
    ...(onClick ? { onClick } : null),
    ...dataAttributes
  });

  const content = (
    <>
      {startIcon ? <span data-slot="start-icon">{startIcon}</span> : null}
      <span data-slot="label">{children}</span>
      {endIcon ? <span data-slot="end-icon">{endIcon}</span> : null}
    </>
  );

  if (asChild && React.isValidElement(children)) {
    const onlyChild = React.Children.only(children) as React.ReactElement;
    return React.cloneElement(onlyChild, mergeProps(baseProps as any, onlyChild.props, { ref: hostRef }));
  }

  if (hostIsLink) {
    const linkProps = rest as HostLinkProps;
    return (
      <a
        {...mergeProps(baseProps as any, linkProps)}
        ref={hostRef as React.RefObject<HTMLAnchorElement>}
        href={linkPropsSafe?.href}
      >
        {content}
      </a>
    );
  }

  const buttonHostProps = rest as HostButtonProps;
  return (
    <button
      {...mergeProps(baseProps, buttonHostProps)}
      ref={hostRef as React.RefObject<HTMLButtonElement>}
      disabled={resolvedDisabled}
    >
      {content}
    </button>
  );
});
