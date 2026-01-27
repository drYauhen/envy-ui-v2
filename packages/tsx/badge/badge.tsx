import * as React from 'react';
import systemMeta from '../../../system.meta.json';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';
export type BadgeVariant = 'subtle' | 'solid' | 'outline';
export type BadgeSize = 'default' | 'small';
export type BadgeShape = 'rectangular' | 'pill' | 'circle';

export type BadgeCleanProps = React.HTMLAttributes<HTMLElement> & {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  /**
   * When true, sets data-eui-interactive for hover/focus styles.
   * Defaults to true for button/anchor hosts.
   */
  interactive?: boolean;
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
  /**
   * Underlying element type for non-dismissible badges.
   * Dismissible badges always render as a span host.
   */
  as?: 'span' | 'button' | 'a';
  href?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

const resolveDismissLabel = (label: string | undefined, children: React.ReactNode) => {
  if (label) return label;
  if (typeof children === 'string') return `Remove ${children}`;
  return 'Remove badge';
};

export const BadgeClean = React.forwardRef<HTMLElement, BadgeCleanProps>(function BadgeClean(
  {
    tone = 'neutral',
    variant = 'subtle',
    size = 'default',
    shape = 'rectangular',
    interactive,
    onDismiss,
    dismissDisabled,
  dismissLabel,
  as = 'span',
    href,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref
) {
  const isDismissible = Boolean(onDismiss);
  const dismissIsDisabled = Boolean(dismissDisabled);
  const Component = (isDismissible ? 'span' : as) as 'span' | 'button' | 'a';
  const defaultInteractive = Component === 'button' || Component === 'a';
  const wantsInteractive = interactive ?? defaultInteractive;
  const resolvedInteractive = !isDismissible && wantsInteractive;

  if (isDismissible && as !== 'span') {
    console.warn('BadgeClean: dismissible badges render as a <span> host.');
  }

  if (isDismissible && wantsInteractive) {
    console.warn('BadgeClean: interactive and dismissible modes are mutually exclusive.');
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

  const content = isDismissible ? (
    <>
      <span data-eui-slot="content">{children}</span>
      <button
        type="button"
        data-eui-slot="dismiss"
        aria-label={resolveDismissLabel(dismissLabel, children)}
        disabled={dismissIsDisabled}
        onClick={(event) => {
          event.stopPropagation();
          onDismiss?.();
        }}
      >
        ×
      </button>
    </>
  ) : (
    children
  );

  const mergedClassName = [`${SYSTEM_PREFIX}-badge`, className].filter(Boolean).join(' ');

  if (Component === 'a') {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={mergedClassName}
        href={href}
        {...dataAttributes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  if (Component === 'button') {
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={mergedClassName}
        type={type}
        {...dataAttributes}
        {...rest}
      >
        {content}
      </button>
    );
  }

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={mergedClassName} {...dataAttributes} {...rest}>
      {content}
    </span>
  );
});
