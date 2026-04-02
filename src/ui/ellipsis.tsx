import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { useIsTruncated } from '../hooks/useIsTruncated';

const DEFAULT_TOOLTIP_DELAY_MS = 1500;

const parseDuration = (value: string, fallback: number) => {
  const trimmed = value.trim();
  if (!trimmed) return fallback;

  const parsed = Number.parseFloat(trimmed);
  if (Number.isNaN(parsed)) return fallback;

  if (trimmed.endsWith('ms')) return parsed;
  if (trimmed.endsWith('s')) return parsed * 1000;

  return parsed;
};

const getTooltipDelay = (element: HTMLElement | null) => {
  if (!element || typeof window === 'undefined') return DEFAULT_TOOLTIP_DELAY_MS;
  const raw = getComputedStyle(element).getPropertyValue('--eui-ellipsis-tooltip-delay');
  return parseDuration(raw, DEFAULT_TOOLTIP_DELAY_MS);
};

export interface EllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The text content to display. Must be a string to ensure the tooltip
   * can render the full accessible text.
   */
  children: string;
  /**
   * Whether to show a tooltip when the text is truncated.
   * @default true
   */
  tooltipOnTruncate?: boolean;
  /**
   * Tooltip rendering strategy.
   * - custom: uses the Tooltip component (default)
   * - native: uses the native title attribute when truncated
   */
  tooltipStrategy?: 'custom' | 'native';
  /**
   * Whether the element should become focusable when truncated (for tooltip access).
   * @default true
   */
  focusOnTruncate?: boolean;
}

/**
 * Ellipsis component handles single-line text truncation and conditionally
 * renders a tooltip when overflow occurs.
 */
export const Ellipsis = ({
  children,
  tooltipOnTruncate = true,
  tooltipStrategy = 'custom',
  focusOnTruncate = true,
  className,
  title: titleProp,
  ...props
}: EllipsisProps) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isTruncated = useIsTruncated(ref, children);
  const [tooltipDelay, setTooltipDelay] = React.useState(DEFAULT_TOOLTIP_DELAY_MS);

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    setTooltipDelay(getTooltipDelay(ref.current));
  }, [isTruncated]);

  const resolvedTitle =
    tooltipStrategy === 'native'
      ? (tooltipOnTruncate && isTruncated ? (titleProp ?? children) : undefined)
      : titleProp;

  const component = (
    <span
      ref={ref}
      className={['eui-ellipsis', className].filter(Boolean).join(' ')}
      // Make focusable via keyboard if truncated so users can access the tooltip
      tabIndex={tooltipOnTruncate && isTruncated && focusOnTruncate ? 0 : undefined}
      title={resolvedTitle}
      {...props}
    >
      {children}
    </span>
  );

  if (tooltipStrategy === 'custom' && tooltipOnTruncate && isTruncated) {
    return (
      <Tooltip delay={tooltipDelay}>
        <TooltipTrigger asChild>{component}</TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    );
  }

  return component;
};
