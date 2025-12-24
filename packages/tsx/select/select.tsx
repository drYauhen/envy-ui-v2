import React, { useRef, Key, useMemo } from 'react';
import { useSelect, useListBox, useOption, AriaSelectProps, mergeProps, usePress } from 'react-aria';
import { useSelectState } from 'react-stately';
import { Item } from '@react-stately/collections';
import { filterDOMProps } from '@react-aria/utils';
import { SelectTrigger, SelectPopover, SelectListBox, SelectOption as SelectOptionPrimitive } from './primitives';

export interface SelectItem {
  key: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<AriaSelectProps<SelectItem>, 'children' | 'items'> {
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  /**
   * Array of select items
   */
  items: SelectItem[];
  /**
   * Default selected key (uncontrolled)
   */
  defaultSelectedKey?: Key;
  /**
   * Selected key (controlled)
   */
  selectedKey?: Key;
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (key: Key) => void;
  /**
   * Whether select is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether select has error state
   */
  error?: boolean;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS class
   */
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  function Select(
    {
      label,
      placeholder = 'Select an option',
      items,
      defaultSelectedKey,
      selectedKey,
      onSelectionChange,
      isDisabled,
      error,
      size = 'md',
      className,
      ...rest
    },
    ref
  ) {
    // React Aria useSelectState expects children with Item components, not items array
    // Convert items array to children with Item components
    const children = useMemo(() => {
      return items.map(item => (
        <Item key={item.key} textValue={item.label} isDisabled={item.disabled}>
          {item.label}
        </Item>
      ));
    }, [items]);
    
    // React Aria useSelectState - pass children (Item components)
    const state = useSelectState({
      children,
      defaultSelectedKey,
      selectedKey,
      onSelectionChange: onSelectionChange as any,
      isDisabled,
      ...rest
    } as any);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const listBoxRef = useRef<HTMLUListElement>(null);

    const {
      labelProps,
      triggerProps,
      valueProps,
      menuProps
    } = useSelect(
      {
        label,
        isDisabled,
        ...rest
      } as any,
      state,
      triggerRef
    );

    // Debug: log what's in triggerProps (can be removed later)
    // React.useEffect(() => {
    //   console.log('=== Select Debug ===');
    //   console.log('triggerProps keys:', Object.keys(triggerProps));
    //   console.log('triggerProps.onClick:', (triggerProps as any).onClick);
    //   console.log('triggerProps.onPress:', (triggerProps as any).onPress);
    //   console.log('state.isOpen:', state.isOpen);
    // }, [triggerProps, state.isOpen]);

    // React Aria's triggerProps includes onPress which only works for touch events
    // We need to use usePress to handle all event types (mouse, touch, keyboard)
    // But triggerProps.onPress has a condition: if (e.pointerType === "touch")
    // So we need to wrap it to work for all event types
    const originalOnPress = (triggerProps as any).onPress;
    const { pressProps } = usePress({
      onPress: (e: any) => {
        // Toggle state: if open, close; if closed, open
        if (e.pointerType !== 'touch') {
          // For mouse clicks, toggle state directly
          state.setOpen(!state.isOpen);
        } else {
          // For touch events, call original onPress
          if (originalOnPress) {
            originalOnPress(e);
          }
        }
      },
      isDisabled
    });
    
    // Extract event handlers and filter non-DOM props
    const {
      onKeyDown,
      onKeyUp,
      onFocus,
      onBlur,
      ...restTriggerProps
    } = triggerProps as any;
    
    // Filter out non-DOM props
    const filteredProps = filterDOMProps(restTriggerProps, { labelable: true });
    
    // Merge pressProps (handles all event types) with other triggerProps
    const domTriggerProps = mergeProps(
      filteredProps,
      pressProps,
      {
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur
      }
    );

    // Use useListBox for proper listbox behavior
    const { listBoxProps } = useListBox(
      menuProps as any,
      state,
      listBoxRef
    );


    const selectedItem = state.selectedItem;
    const selectedText = selectedItem ? (selectedItem.textValue || selectedItem.rendered) : placeholder;
    const isPlaceholder = !selectedItem;


    return (
      <div ref={ref} className={`eui-select-wrapper ${className || ''}`}>
        {label && (
          <label {...labelProps} className="eui-label">
            {label}
          </label>
        )}

        <SelectTrigger
          {...mergeProps(domTriggerProps, {
            ref: triggerRef,
            size,
            isDisabled,
            isOpen: state.isOpen,
            'data-eui-state': error ? 'error' : undefined
          })}
        >
          <span {...valueProps} className="eui-select-value" data-placeholder={isPlaceholder}>
            {selectedText}
          </span>
        </SelectTrigger>

        <SelectPopover
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
          referenceRef={triggerRef}
          placement="bottom-start"
        >
          <SelectListBox {...listBoxProps} ref={listBoxRef}>
            {Array.from(state.collection).map((item) => (
              <SelectOptionComponent
                key={item.key}
                item={item}
                state={state}
              />
            ))}
          </SelectListBox>
        </SelectPopover>
      </div>
    );
  }
);

interface SelectOptionComponentProps {
  item: any;
  state: any;
}

function SelectOptionComponent({ item, state }: SelectOptionComponentProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  // Close dropdown when option is selected
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    optionProps.onClick?.(e as any);
    // Close dropdown after selection
    if (!isDisabled) {
      state.setOpen(false);
    }
  }, [optionProps, isDisabled, state]);

  return (
    <SelectOptionPrimitive
      {...optionProps}
      ref={ref}
      isSelected={isSelected}
      isFocused={isFocused}
      isDisabled={isDisabled}
      onClick={handleClick}
    >
      {item.textValue || (typeof item.rendered === 'string' ? item.rendered : String(item.key))}
    </SelectOptionPrimitive>
  );
}

