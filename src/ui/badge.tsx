import * as React from 'react';
import { mergeProps, useButton } from 'react-aria';
import type { AriaButtonProps, PressEvent } from 'react-aria';
import systemMeta from '../../system.meta.json';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';
export type BadgeVariant = 'subtle' | 'solid' | 'outline';
export type BadgeSize = 'default' | 'small';
export type BadgeShape = 'rectangular' | 'pill' | 'circle';

type HostButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type HostLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type BadgeProps = React.HTMLAttributes<HTMLElement> & {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  /**
   * Set to true to force data-eui-interactive when no handlers are provided.
   */
  interactive?: boolean;
  /**
   * React Aria press handler for interactive badges.
   */
  onPress?: (event: PressEvent) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  target?: HostLinkProps['target'];
  rel?: HostLinkProps['rel'];
  type?: HostButtonProps['type'];
  isDisabled?: boolean;
  disabled?: boolean;
  /**
   * Optional dismiss handler. When provided, renders the dismiss button.
   */
  onDismiss?: () => void;
  /**
   * Whether the dismiss button is disabled.
   */
  dismissDisabled?: boolean;
  /**
   * Accessible label for the dismiss button.
   */
  dismissLabel?: string;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

const resolveDismissLabel = (label: string | undefined, children: React.ReactNode) => {
  if (label) return label;
  if (typeof children === 'string') return `Remove ${children}`;
  return 'Remove badge';
};

type BadgeRenderProps = {
  className: string;
  dataAttributes: Record<string, string | undefined>;
  children: React.ReactNode;
};

type BadgeDismissibleProps = React.HTMLAttributes<HTMLSpanElement> & BadgeRenderProps & {
  onDismiss: () => void;
  dismissLabel?: string;
  isDisabled: boolean;
};

const BadgeDismissible = React.forwardRef<HTMLSpanElement, BadgeDismissibleProps>(function BadgeDismissible(
  { className, dataAttributes, onDismiss, dismissLabel, isDisabled, children, ...rest },
  ref
) {
  const dismissRef = React.useRef<HTMLButtonElement>(null);
  const { buttonProps: dismissButtonProps } = useButton(
    { onPress: () => onDismiss?.(), isDisabled },
    dismissRef
  );

  return (
    <span ref={ref} className={className} {...dataAttributes} {...rest}>
      <span data-eui-slot="content">{children}</span>
      <button
        ref={dismissRef}
        type="button"
        data-eui-slot="dismiss"
        aria-label={resolveDismissLabel(dismissLabel, children)}
        disabled={isDisabled}
        {...dismissButtonProps}
      >
        ×
      </button>
    </span>
  );
});

type BadgeInteractiveProps = React.HTMLAttributes<HTMLElement> & BadgeRenderProps & {
  onPress?: (event: PressEvent) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  target?: HostLinkProps['target'];
  rel?: HostLinkProps['rel'];
  type?: HostButtonProps['type'];
  isDisabled: boolean;
};

const BadgeInteractive = React.forwardRef<HTMLElement, BadgeInteractiveProps>(function BadgeInteractive(
  { className, dataAttributes, onPress, onClick, href, target, rel, type, isDisabled, children, ...rest },
  forwardedRef
) {
  const hostRef = React.useRef<HTMLElement>(null);
  React.useImperativeHandle(forwardedRef, () => hostRef.current as HTMLElement);

  const hostIsLink = Boolean(href);
  const elementType = (hostIsLink ? 'a' : 'button') as AriaButtonProps['elementType'];
  const resolvedType = !hostIsLink ? type ?? 'button' : undefined;

  const ariaProps: AriaButtonProps = {
    elementType,
    isDisabled,
    onPress,
    href,
    target,
    rel,
    type: resolvedType as AriaButtonProps['type']
  };

  const { buttonProps } = useButton(ariaProps, hostRef);

  const baseProps = mergeProps(buttonProps, {
    className,
    ...(resolvedType && elementType === 'button' ? { type: resolvedType } : null),
    ...(onClick ? { onClick } : null),
    ...dataAttributes
  });

  if (hostIsLink) {
    const linkProps = rest as HostLinkProps;
    return (
      <a
        {...mergeProps(baseProps as any, linkProps)}
        ref={hostRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  const buttonHostProps = rest as HostButtonProps;
  return (
    <button
      {...mergeProps(baseProps as any, buttonHostProps)}
      ref={hostRef as React.RefObject<HTMLButtonElement>}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
});

type BadgeStaticProps = React.HTMLAttributes<HTMLSpanElement> & BadgeRenderProps;

const BadgeStatic = React.forwardRef<HTMLSpanElement, BadgeStaticProps>(function BadgeStatic(
  { className, dataAttributes, children, ...rest },
  ref
) {
  return (
    <span ref={ref} className={className} {...dataAttributes} {...rest}>
      {children}
    </span>
  );
});

export const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(
  {
    tone = 'neutral',
    variant = 'subtle',
    size = 'default',
    shape = 'rectangular',
    interactive,
    onPress,
    onClick,
    href,
    target,
    rel,
    type = 'button',
    isDisabled,
    disabled,
    onDismiss,
    dismissDisabled,
    dismissLabel,
    className,
    children,
    ...rest
  },
  forwardedRef
) {
  const isDismissible = Boolean(onDismiss);
  const resolvedDisabled = Boolean(disabled ?? isDisabled);
  const dismissIsDisabled = Boolean(dismissDisabled ?? resolvedDisabled);
  const wantsInteractive = Boolean(onPress || onClick || href || interactive);
  const resolvedInteractive = !isDismissible && wantsInteractive;

  if (isDismissible && wantsInteractive) {
    console.warn('Badge: interactive and dismissible modes are mutually exclusive.');
  }

  const dataAttributes = {
    [prefixedDataAttr('tone')]: tone,
    [prefixedDataAttr('variant')]: variant,
    [prefixedDataAttr('size')]: size,
    [prefixedDataAttr('shape')]: shape,
    ...(resolvedInteractive ? { [prefixedDataAttr('interactive')]: 'true' } : null),
    ...(isDismissible ? { [prefixedDataAttr('dismissible')]: 'true' } : null),
    ...(isDismissible && dismissIsDisabled ? { [prefixedDataAttr('disabled')]: 'true' } : null)
  };

  const mergedClassName = [`${SYSTEM_PREFIX}-badge`, className].filter(Boolean).join(' ');

  if (isDismissible) {
    return (
      <BadgeDismissible
        ref={forwardedRef as React.RefObject<HTMLSpanElement>}
        className={mergedClassName}
        dataAttributes={dataAttributes}
        onDismiss={onDismiss as () => void}
        dismissLabel={dismissLabel}
        isDisabled={dismissIsDisabled}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </BadgeDismissible>
    );
  }

  if (resolvedInteractive && (onPress || onClick || href)) {
    return (
      <BadgeInteractive
        ref={forwardedRef}
        className={mergedClassName}
        dataAttributes={dataAttributes}
        onPress={onPress}
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        type={type}
        isDisabled={resolvedDisabled}
        {...rest}
      >
        {children}
      </BadgeInteractive>
    );
  }

  return (
    <BadgeStatic
      ref={forwardedRef as React.RefObject<HTMLSpanElement>}
      className={mergedClassName}
      dataAttributes={dataAttributes}
      {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {children}
    </BadgeStatic>
  );
});
