import React, { forwardRef } from 'react';
import { useFloatingPosition } from '../../../../src/hooks/useFloatingPosition';

export interface SelectPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether popover is open
   */
  isOpen: boolean;
  /**
   * Callback when popover should close
   */
  onClose: () => void;
  /**
   * Reference element for positioning (can be RefObject or callback ref)
   */
  referenceRef?: React.RefObject<HTMLElement> | ((node: HTMLElement | null) => void);
  /**
   * Placement of popover relative to reference
   */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /**
   * Additional CSS class
   */
  className?: string;
}

export const SelectPopover = forwardRef<HTMLDivElement, SelectPopoverProps>(
  function SelectPopover(
    {
      isOpen,
      onClose,
      referenceRef,
      placement = 'bottom-start',
      className,
      children,
      ...rest
    },
    forwardedRef
  ) {
    // Use the existing useFloatingPosition hook with external referenceRef
    const { floatingRef, floatingStyles, getFloatingProps } = useFloatingPosition({
      isOpen,
      onOpenChange: (open) => {
        if (!open) {
          onClose();
        }
      },
      placement,
      offset: 4,
      clickOutsideToClose: true,
      escapeKeyToClose: true,
      clickToToggle: false, // Don't toggle on click, parent handles this
      referenceRef // Pass external referenceRef directly
    });


    if (!isOpen) return null;

    return (
      <div
        ref={(node) => {
          // Handle forwarded ref
          if (forwardedRef) {
            if (typeof forwardedRef === 'function') {
              forwardedRef(node);
            } else {
              (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
          }
          // Set Floating UI ref
          floatingRef(node);
        }}
        style={floatingStyles}
        className={`eui-select-popover ${className || ''}`}
        data-placement={placement}
        {...getFloatingProps()}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

