import * as React from 'react';
import systemMeta from '../../../system.meta.json';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export type TooltipCleanProps = {
  /** Tooltip text or custom content. */
  content: React.ReactNode;
  /**
   * Tooltip placement relative to the trigger.
   * @default 'top'
   */
  placement?: TooltipPlacement;
  /**
   * Controls visibility. Use with CSS-only positioning.
   */
  isOpen?: boolean;
  /**
   * Optional class for the tooltip element.
   */
  tooltipClassName?: string;
  /**
   * Optional class for the anchor container.
   */
  anchorClassName?: string;
  /**
   * Trigger element that receives aria-describedby.
   */
  children: React.ReactElement<any>;
} & React.HTMLAttributes<HTMLSpanElement>;

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedClass = (name: string) => `${SYSTEM_PREFIX}-${name}`;
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;
const dataAttr = (value: boolean | undefined) => (value ? '' : undefined);

export const TooltipClean = React.forwardRef<HTMLSpanElement, TooltipCleanProps>(function TooltipClean(
  {
    content,
    placement = 'top',
    isOpen = false,
    tooltipClassName,
    anchorClassName,
    className,
    children,
    ...rest
  },
  ref
) {
  const tooltipId = React.useId();

  const trigger = React.isValidElement<any>(children) ? (children as React.ReactElement<any>) : null;
  if (!trigger) {
    console.warn('TooltipClean expects a single React element as its child.');
  }

  const describedBy = [
    trigger?.props?.['aria-describedby'],
    tooltipId
  ]
    .filter(Boolean)
    .join(' ');

  const triggerNode = trigger
    ? React.cloneElement(trigger, {
        ...trigger.props,
        'aria-describedby': describedBy,
        [prefixedDataAttr('tooltip-trigger')]: ''
      })
    : children;

  return (
    <span
      ref={ref}
      className={[prefixedClass('tooltip-anchor'), anchorClassName, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {triggerNode}
      <span
        id={tooltipId}
        className={[prefixedClass('tooltip'), tooltipClassName].filter(Boolean).join(' ')}
        data-eui-open={dataAttr(isOpen)}
        data-eui-placement={placement}
        data-eui-positioning="css"
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
});

TooltipClean.displayName = 'TooltipClean';
