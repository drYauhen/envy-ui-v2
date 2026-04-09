import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { size } from '@floating-ui/react';
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
  referenceRef?: React.RefObject<HTMLElement | null> | ((node: HTMLElement | null) => void);
  /**
   * Placement of popover relative to reference
   */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /**
   * Max width of the dropdown. Number values are treated as pixels.
   */
  maxWidth?: number | string;
  /**
   * Max height of the dropdown. Number values are treated as pixels.
   */
  maxHeight?: number | string;
  /**
   * Render popover in a portal to avoid clipping inside scroll containers.
   */
  usePortal?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

const DEFAULT_DROPDOWN_OFFSET_PX = 5;

function readCssLengthNumber(styles: CSSStyleDeclaration, variableName: string): number | null {
  const parsed = Number.parseFloat(styles.getPropertyValue(variableName));
  return Number.isFinite(parsed) ? parsed : null;
}

export const SelectPopover = forwardRef<HTMLDivElement, SelectPopoverProps>(
  function SelectPopover(
    {
      isOpen,
      onClose,
      referenceRef,
      placement = 'bottom-start',
      maxWidth,
      maxHeight,
      usePortal = true,
      className,
      style: styleProp,
      children,
      ...rest
    },
    forwardedRef
  ) {
    // Use the existing useFloatingPosition hook with external referenceRef
    const sizeMiddleware = React.useMemo(
      () =>
        size({
          padding: 8,
          apply({ availableHeight, elements }) {
            elements.floating.style.setProperty('--eui-select-popover-available-height', `${availableHeight}px`);
          }
        }),
      []
    );

    const offsetValue = React.useCallback(({ elements }: { elements: { reference?: unknown } }) => {
      if (typeof window === 'undefined') {
        return { mainAxis: DEFAULT_DROPDOWN_OFFSET_PX, crossAxis: 0 };
      }

      const referenceElement =
        elements.reference && elements.reference instanceof Element ? (elements.reference as HTMLElement) : null;
      if (!referenceElement) {
        return { mainAxis: DEFAULT_DROPDOWN_OFFSET_PX, crossAxis: 0 };
      }

      const styles = window.getComputedStyle(referenceElement);
      const componentOffset = readCssLengthNumber(styles, '--eui-select-primitive-popover-spacing-offset');
      const overlayOffset = readCssLengthNumber(styles, '--eui-overlay-offset-dropdown');
      const mainAxis = componentOffset ?? overlayOffset ?? DEFAULT_DROPDOWN_OFFSET_PX;

      return { mainAxis, crossAxis: 0 };
    }, []);

    const { floatingRef, floatingStyles, getFloatingProps } = useFloatingPosition({
      isOpen,
      onOpenChange: (open) => {
        if (!open) {
          onClose();
        }
      },
      placement,
      offset: offsetValue,
      strategy: usePortal ? 'fixed' : 'absolute',
      clickOutsideToClose: true,
      escapeKeyToClose: true,
      clickToToggle: false, // Don't toggle on click, parent handles this
      middleware: [sizeMiddleware],
      middlewarePosition: 'beforeFlip',
      referenceRef // Pass external referenceRef directly
    });

    const [portalHost, setPortalHost] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
      if (!usePortal || !isOpen || typeof document === 'undefined') {
        setPortalHost(null);
        return;
      }

      const host = document.createElement('div');
      const referenceElement =
        typeof referenceRef === 'function' ? null : referenceRef?.current ?? null;
      const contextElement = referenceElement?.closest('[data-eui-context]') as HTMLElement | null;
      const focusPolicyElement = referenceElement?.closest('[data-eui-focus-policy]') as HTMLElement | null;

      if (contextElement) {
        const contextValue = contextElement.getAttribute('data-eui-context');
        if (contextValue) {
          host.setAttribute('data-eui-context', contextValue);
        }

        const themeValue = contextElement.getAttribute('data-eui-theme');
        if (themeValue) {
          host.setAttribute('data-eui-theme', themeValue);
        }

        const classNameFromContext = contextElement.getAttribute('class');
        if (classNameFromContext) {
          host.setAttribute('class', classNameFromContext);
        } else {
          host.classList.add('eui-theme');
        }
      } else {
        host.classList.add('eui-theme');
      }

      if (focusPolicyElement) {
        const focusPolicy = focusPolicyElement.getAttribute('data-eui-focus-policy');
        if (focusPolicy) {
          host.setAttribute('data-eui-focus-policy', focusPolicy);
        }
      }

      document.body.appendChild(host);
      setPortalHost(host);

      return () => {
        host.remove();
        setPortalHost(null);
      };
    }, [isOpen, referenceRef, usePortal]);

    if (!isOpen) return null;

    const popoverStyle: React.CSSProperties = {
      ...floatingStyles,
      ...(styleProp || {})
    };

    const referenceElement =
      typeof referenceRef === 'function' ? null : referenceRef?.current ?? null;
    const referenceWidth = referenceElement?.getBoundingClientRect().width;
    const minimumWidthPx = 100;
    const minWidthPx =
      typeof referenceWidth === 'number' && Number.isFinite(referenceWidth)
        ? Math.max(referenceWidth, minimumWidthPx)
        : minimumWidthPx;

    (popoverStyle as React.CSSProperties & Record<string, string>)['--eui-select-popover-min-width'] =
      `${minWidthPx}px`;

    if (maxWidth !== undefined) {
      const maxWidthValue = typeof maxWidth === 'number' ? maxWidth : maxWidth.trim();
      const parsedMaxWidth =
        typeof maxWidthValue === 'number'
          ? maxWidthValue
          : (() => {
              const match = maxWidthValue.match(/^(\d+(?:\.\d+)?)px$/);
              return match ? Number(match[1]) : null;
            })();
      const resolvedMaxWidth =
        typeof parsedMaxWidth === 'number' ? Math.max(parsedMaxWidth, minWidthPx) : maxWidthValue;
      (popoverStyle as React.CSSProperties & Record<string, string>)['--eui-select-popover-max-width'] =
        typeof resolvedMaxWidth === 'number' ? `${resolvedMaxWidth}px` : resolvedMaxWidth;
    }
    if (maxHeight !== undefined) {
      (popoverStyle as React.CSSProperties & Record<string, string>)['--eui-select-primitive-popover-size-max-height'] =
        typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
    }

    const popoverContent = (
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
        style={popoverStyle}
        className={`eui-select-popover ${className || ''}`}
        data-placement={placement}
        {...getFloatingProps()}
        {...rest}
      >
        {children}
      </div>
    );

    if (usePortal && portalHost) {
      return createPortal(popoverContent, portalHost);
    }

    return popoverContent;
  }
);
