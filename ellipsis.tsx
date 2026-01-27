import React, { useRef } from 'react';
import { Tooltip } from '../tooltip';
import { useIsTruncated } from './use-is-truncated';
import './ellipsis.css';

export interface EllipsisProps extends React.HTMLAttributes<HTMLElement> {
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
}

/**
 * Ellipsis component handles single-line text truncation and conditionally
 * renders a tooltip when overflow occurs.
 */
export const Ellipsis = ({
  children,
  tooltipOnTruncate = true,
  className,
  ...props
}: EllipsisProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isTruncated = useIsTruncated(ref, children);

  const component = (
    <span
      ref={ref}
      className={`eui-ellipsis ${className || ''}`}
      // Make focusable via keyboard if truncated so users can access the tooltip
      tabIndex={isTruncated ? 0 : undefined}
      {...props}
    >
      {children}
    </span>
  );

  if (tooltipOnTruncate && isTruncated) {
    // Delay matches eui.ellipsis.tooltip.delay (1500ms)
    return <Tooltip content={children} delay={1500}>{component}</Tooltip>;
  }

  return component;
};