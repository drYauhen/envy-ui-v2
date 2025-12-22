import * as React from 'react';
import { useMenuTrigger, useMenu, useMenuItem } from 'react-aria';
import { useMenuTriggerState, useTreeState } from 'react-stately';
import { useButton } from 'react-aria';
import { useFocusRing } from 'react-aria';
import { useHover } from 'react-aria';
import { mergeProps } from 'react-aria';
import type { TreeState } from 'react-stately';
import { useFloatingPosition } from '../../../src/hooks/useFloatingPosition';
import systemMeta from '../../../system.meta.json';

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;
const dataAttr = (value: boolean | undefined) => (value ? '' : undefined);

// Menu Context
interface MenuContextValue {
  menuTriggerState: ReturnType<typeof useMenuTriggerState>;
  treeState: TreeState<object>;
  placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  triggerRef: React.RefObject<HTMLElement>;
  listRef: React.RefObject<HTMLUListElement>;
  triggerCallbackRef: (node: HTMLElement | null) => void;
  referenceRef: ((node: HTMLElement | null) => void) | null;
  floatingRef: ((node: HTMLElement | null) => void) | null;
  floatingStyles: React.CSSProperties;
  getFloatingProps: (props?: React.HTMLAttributes<HTMLElement>) => React.HTMLAttributes<HTMLElement>;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu component');
  }
  return context;
}

// Menu Component (Wrapper)
export interface MenuProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

export function Menu({ children, isOpen: controlledIsOpen, onOpenChange, placement = 'bottom-start' }: MenuProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = React.useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  const handleOpenChange = onOpenChange || setUncontrolledIsOpen;

  const triggerRef = React.useRef<HTMLElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const menuTriggerState = useMenuTriggerState({
    isOpen,
    onOpenChange: handleOpenChange
  });

  // Create tree state for menu items
  // For simple menu, we create a minimal tree state
  // Items are managed manually via MenuItem components
  const treeState = useTreeState<object>({
    children: [],
    selectionMode: 'none'
  });

  // Use Floating UI for positioning (called at Menu level to share refs)
  const { referenceRef, floatingRef, floatingStyles, getFloatingProps } = useFloatingPosition({
    isOpen: menuTriggerState.isOpen,
    onOpenChange: menuTriggerState.setOpen,
    placement: placement,
    offset: 8,
    clickOutsideToClose: true,
    escapeKeyToClose: true,
    clickToToggle: false // MenuList doesn't toggle, trigger does
  });

  // Connect trigger ref to Floating UI reference
  // Use callback ref to ensure referenceRef is called when trigger mounts
  const triggerCallbackRef = React.useCallback((node: HTMLElement | null) => {
    if (node) {
      triggerRef.current = node;
      if (referenceRef) {
        referenceRef(node);
      }
    }
  }, [referenceRef]);

  const contextValue: MenuContextValue = {
    menuTriggerState,
    treeState,
    placement,
    triggerRef,
    listRef,
    triggerCallbackRef,
    referenceRef,
    floatingRef,
    floatingStyles,
    getFloatingProps
  };

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
}

// MenuTrigger Component
export interface MenuTriggerProps {
  children: React.ReactElement;
  /**
   * When true, menu trigger behavior is merged onto the child element instead of wrapping it.
   * Similar to Button's asChild pattern - allows using Card, Button, or any other element as trigger.
   */
  asChild?: boolean;
}

export function MenuTrigger({ children, asChild = false }: MenuTriggerProps) {
  const context = useMenuContext();
  const triggerRef = context.triggerRef;
  const triggerCallbackRef = context.triggerCallbackRef;

  const { menuTriggerProps } = useMenuTrigger({}, context.menuTriggerState, triggerRef);

  // Combine refs: use callback ref to connect both triggerRef and Floating UI referenceRef
  const combinedRef = React.useCallback((node: HTMLElement | null) => {
    triggerCallbackRef(node);
    if (node && triggerRef) {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  }, [triggerCallbackRef, triggerRef]);

  // Merge menu trigger props with child props (asChild pattern)
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(menuTriggerProps, children.props),
      ref: combinedRef
    } as any);
  }

  // Default: wrap in button
  const { buttonProps } = useButton(menuTriggerProps, triggerRef);
  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      ref={combinedRef as React.RefObject<HTMLButtonElement>}
      className={`${SYSTEM_PREFIX}-button`}
      data-eui-intent="secondary"
      data-eui-hovered={dataAttr(isHovered)}
      data-eui-focus-visible={dataAttr(isFocusVisible)}
    >
      {children}
    </button>
  );
}

// MenuList Component
export interface MenuListProps {
  children: React.ReactNode;
  className?: string;
}

export function MenuList({ children, className }: MenuListProps) {
  const context = useMenuContext();
  const listRef = context.listRef;

  // Connect list ref to Floating UI floating (refs come from Menu context)
  React.useEffect(() => {
    if (listRef.current && context.floatingRef) {
      context.floatingRef(listRef.current);
    }
  }, [context.floatingRef, listRef]);

  // Use menu with tree state
  // Note: useMenu requires treeState with proper structure
  // For simple menu, we pass minimal tree state configuration
  // disabledBehavior: 'all' means all items can be disabled
  const { menuProps } = useMenu(
    {
      'aria-label': 'Menu',
      disabledBehavior: 'all' as const
    },
    context.treeState,
    listRef
  );

  if (!context.menuTriggerState.isOpen) {
    return null;
  }

  return (
    <ul
      ref={listRef}
      className={[`${SYSTEM_PREFIX}-menu-list`, className].filter(Boolean).join(' ')}
      role="menu"
      style={context.floatingStyles}
      {...mergeProps(menuProps, context.getFloatingProps())}
    >
      {children}
    </ul>
  );
}

// MenuItem Component
export interface MenuItemProps {
  children: React.ReactNode;
  onAction?: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export function MenuItem({ children, onAction, isSelected, isDisabled, className }: MenuItemProps) {
  const context = useMenuContext();
  const itemRef = React.useRef<HTMLLIElement>(null);

  // Generate a unique key for this item (stable across renders)
  const itemKeyRef = React.useRef(React.useId());
  const itemKey = itemKeyRef.current;

  // Use menuItem with tree state
  // Note: useMenuItem requires treeState, but for simple menu we use minimal tree state
  const { menuItemProps } = useMenuItem(
    {
      key: itemKey,
      onAction,
      isSelected,
      isDisabled
    },
    context.treeState,
    itemRef
  );

  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <li
      ref={itemRef}
      role="menuitem"
      className={[`${SYSTEM_PREFIX}-menu-item`, className].filter(Boolean).join(' ')}
      data-eui-selected={dataAttr(isSelected)}
      data-eui-disabled={dataAttr(isDisabled)}
      data-eui-hovered={dataAttr(isHovered)}
      data-eui-focus-visible={dataAttr(isFocusVisible)}
      {...mergeProps(menuItemProps, hoverProps, focusProps)}
    >
      <button className={`${SYSTEM_PREFIX}-menu-item`}>
        {children}
      </button>
    </li>
  );
}
