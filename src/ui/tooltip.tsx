import * as React from 'react';
import { mergeProps, useTooltip, useTooltipTrigger } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';
import { useFloatingPosition } from '../hooks/useFloatingPosition';
import systemMeta from '../../system.meta.json';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export type TooltipProps = {
  children: React.ReactNode;
  /**
   * Tooltip placement relative to the trigger.
   * @default 'top'
   */
  placement?: TooltipPlacement;
  /** Controlled open state. */
  isOpen?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Change handler for controlled usage. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Delay (ms) before opening on hover or focus. */
  delay?: number;
  /** Delay (ms) before closing after hover out. */
  closeDelay?: number;
};

export type TooltipTriggerProps = {
  children: React.ReactElement;
  /** Apply trigger props to the child instead of wrapping. */
  asChild?: boolean;
  className?: string;
};

export type TooltipContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedClass = (name: string) => `${SYSTEM_PREFIX}-${name}`;
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;
const dataAttr = (value: boolean | undefined) => (value ? '' : undefined);

const mergeRefs = <T,>(...refs: Array<React.Ref<T> | undefined>) => (node: T | null) => {
  refs.forEach((ref) => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(node);
    } else {
      (ref as React.MutableRefObject<T | null>).current = node;
    }
  });
};

type TooltipContextValue = {
  state: ReturnType<typeof useTooltipTriggerState>;
  placement: TooltipPlacement;
  triggerRef: React.RefObject<HTMLElement>;
  tooltipRef: React.RefObject<HTMLDivElement>;
  triggerCallbackRef: (node: HTMLElement | null) => void;
  triggerProps: React.HTMLAttributes<HTMLElement>;
  tooltipProps: React.HTMLAttributes<HTMLElement>;
  floatingRef: ((node: HTMLElement | null) => void) | null;
  floatingStyles: React.CSSProperties;
  getFloatingProps: (props?: React.HTMLAttributes<HTMLElement>) => React.HTMLAttributes<HTMLElement>;
};

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip components must be used within a Tooltip provider.');
  }
  return context;
}

export function Tooltip({
  children,
  placement = 'top',
  isOpen,
  defaultOpen,
  onOpenChange,
  delay,
  closeDelay
}: TooltipProps) {
  const state = useTooltipTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange,
    delay,
    closeDelay
  });

  const triggerRef = React.useRef<HTMLElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(
    { delay, closeDelay },
    state,
    triggerRef
  );

  const { tooltipProps: ariaTooltipProps } = useTooltip({}, state);

  const { referenceRef, floatingRef, floatingStyles, getFloatingProps } = useFloatingPosition({
    isOpen: state.isOpen,
    onOpenChange: state.setOpen,
    placement: placement,
    offset: 0,
    clickOutsideToClose: false,
    escapeKeyToClose: true,
    clickToToggle: false
  });

  const triggerCallbackRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        triggerRef.current = node;
      }
      if (referenceRef) {
        referenceRef(node);
      }
    },
    [referenceRef]
  );

  const mergedTooltipProps = mergeProps(triggerTooltipProps, ariaTooltipProps);

  const value: TooltipContextValue = {
    state,
    placement,
    triggerRef,
    tooltipRef,
    triggerCallbackRef,
    triggerProps,
    tooltipProps: mergedTooltipProps,
    floatingRef,
    floatingStyles,
    getFloatingProps
  };

  return (
    <TooltipContext.Provider value={value}>
      {children}
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, asChild = false, className }: TooltipTriggerProps) {
  const { triggerProps, triggerRef, triggerCallbackRef } = useTooltipContext();

  const combinedRef = React.useCallback(
    (node: HTMLElement | null) => {
      triggerCallbackRef(node);
      if (node) {
        triggerRef.current = node;
      }
    },
    [triggerCallbackRef, triggerRef]
  );

  if (asChild && React.isValidElement(children)) {
    const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
    const mergedRef = mergeRefs(childRef, combinedRef);
    return React.cloneElement(children, {
      ...mergeProps(triggerProps, children.props, {
        [prefixedDataAttr('tooltip-trigger')]: ''
      }),
      ref: mergedRef
    } as any);
  }

  return (
    <span
      ref={combinedRef}
      className={[prefixedClass('tooltip-trigger'), className].filter(Boolean).join(' ')}
      {...{ [prefixedDataAttr('tooltip-trigger')]: '' }}
      {...triggerProps}
    >
      {children}
    </span>
  );
}

export function TooltipContent({ children, className, style, ...rest }: TooltipContentProps) {
  const {
    state,
    placement,
    tooltipRef,
    tooltipProps,
    floatingRef,
    floatingStyles,
    getFloatingProps
  } = useTooltipContext();

  React.useEffect(() => {
    if (tooltipRef.current && floatingRef) {
      floatingRef(tooltipRef.current);
    }
  }, [floatingRef, tooltipRef]);

  if (!state.isOpen) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className={[prefixedClass('tooltip'), className].filter(Boolean).join(' ')}
      data-eui-open={dataAttr(state.isOpen)}
      data-eui-placement={placement}
      data-eui-positioning="floating"
      role="tooltip"
      style={{ ...floatingStyles, ...style }}
      {...mergeProps(tooltipProps, getFloatingProps(), rest)}
    >
      {children}
    </div>
  );
}
