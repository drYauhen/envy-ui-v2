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
import React, { useRef, useEffect } from 'react';

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
  /** External reference ref (if provided, will be used instead of internal ref) */
  referenceRef?: React.RefObject<HTMLElement> | ((node: HTMLElement | null) => void);
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
    clickToToggle = true,
    referenceRef: externalReferenceRef
  } = options;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: onOpenChange,
    placement: placement,
    middleware: [
      offset(offsetValue),
      flip({
        fallbackAxisSideDirection: 'start',
        fallbackPlacements: ['top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'right-start']
      }),
      shift({
        padding: 8,
        crossAxis: true
      })
    ]
  });

  // Sync external referenceRef with Floating UI's internal ref
  // Use useLayoutEffect to sync synchronously before paint
  React.useLayoutEffect(() => {
    if (externalReferenceRef && typeof externalReferenceRef !== 'function') {
      // If it's a RefObject, sync its current value with Floating UI
      if (externalReferenceRef.current) {
        refs.setReference(externalReferenceRef.current);
      }
    }
  }, [externalReferenceRef, refs.setReference, isOpen]);

  // Create a callback ref that syncs both external and internal refs
  // This is used when externalReferenceRef is provided as a callback or RefObject
  const syncReferenceRef = React.useCallback((node: HTMLElement | null) => {
    // Set Floating UI's internal ref
    refs.setReference(node);
    
    // Also sync with external ref if provided
    if (externalReferenceRef) {
      if (typeof externalReferenceRef === 'function') {
        externalReferenceRef(node);
      } else {
        // For RefObject, update its current value
        (externalReferenceRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    }
  }, [externalReferenceRef, refs.setReference]);

  // Enable autoUpdate when both refs are available
  useEffect(() => {
    if (!isOpen || !refs.reference.current || !refs.floating.current) {
      return;
    }

    const cleanup = autoUpdate(refs.reference.current, refs.floating.current, () => {
      context.update();
    });

    return cleanup;
  }, [isOpen, refs.reference, refs.floating, context]);

  // Enable interactions
  const click = useClick(context, {
    enabled: clickToToggle
  });

  const dismiss = useDismiss(context, {
    enabled: clickOutsideToClose || escapeKeyToClose,
    escapeKey: escapeKeyToClose
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss
  ]);

  return {
    referenceRef: externalReferenceRef ? syncReferenceRef : refs.setReference,
    floatingRef: refs.setFloating,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    context
  };
}

