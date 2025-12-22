/**
 * Floating UI positioning hook for popovers, dropdowns, and tooltips
 * 
 * This hook provides positioning logic using Floating UI, with automatic
 * collision detection, click-outside handling, and common positioning options.
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * const { referenceRef, floatingRef, floatingStyles, getReferenceProps, getFloatingProps } = 
 *   useFloatingPosition({
 *     isOpen,
 *     onOpenChange: setIsOpen,
 *     placement: 'bottom-start',
 *     offset: 8
 *   });
 * ```
 */

import { useFloating, autoUpdate, offset, flip, shift, Placement } from '@floating-ui/react';
import { useClick, useDismiss, useInteractions } from '@floating-ui/react';
import { useRef, useEffect } from 'react';

export interface UseFloatingPositionOptions {
  /** Whether the floating element is open */
  isOpen: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Placement of the floating element relative to reference */
  placement?: Placement;
  /** Offset in pixels between reference and floating element */
  offset?: number;
  /** Whether clicking outside closes the floating element */
  clickOutsideToClose?: boolean;
  /** Whether pressing Escape closes the floating element */
  escapeKeyToClose?: boolean;
  /** Whether clicking the reference toggles the floating element */
  clickToToggle?: boolean;
}

export interface UseFloatingPositionReturn {
  /** Ref to attach to the reference element (trigger) */
  referenceRef: (node: HTMLElement | null) => void;
  /** Ref to attach to the floating element (popover/dropdown) */
  floatingRef: (node: HTMLElement | null) => void;
  /** Styles to apply to the floating element */
  floatingStyles: React.CSSProperties;
  /** Props to spread on the reference element */
  getReferenceProps: (props?: React.HTMLAttributes<HTMLElement>) => React.HTMLAttributes<HTMLElement>;
  /** Props to spread on the floating element */
  getFloatingProps: (props?: React.HTMLAttributes<HTMLElement>) => React.HTMLAttributes<HTMLElement>;
  /** Floating UI context (for advanced usage) */
  context: ReturnType<typeof useFloating>['context'];
}

/**
 * Hook for positioning floating elements (popovers, dropdowns, tooltips)
 * using Floating UI with common interactions (click, dismiss, etc.)
 */
export function useFloatingPosition(
  options: UseFloatingPositionOptions
): UseFloatingPositionReturn {
  const {
    isOpen,
    onOpenChange,
    placement = 'bottom-start',
    offset: offsetValue = 8,
    clickOutsideToClose = true,
    escapeKeyToClose = true,
    clickToToggle = true
  } = options;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: onOpenChange,
    placement: placement,
    middleware: [
      offset(offsetValue),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift({
        padding: 8
      })
    ],
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context, {
    enabled: clickToToggle
  });

  const dismiss = useDismiss(context, {
    enabled: clickOutsideToClose || escapeKeyToClose,
    outsidePress: clickOutsideToClose,
    escapeKey: escapeKeyToClose
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss
  ]);

  return {
    referenceRef: refs.setReference,
    floatingRef: refs.setFloating,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    context
  };
}

