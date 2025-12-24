import React, { useRef, Key, useMemo } from 'react';
import { useSelect, useListBox, useOption, AriaSelectProps, mergeProps, usePress } from 'react-aria';
import { useSelectState } from 'react-stately';
import { Item } from '@react-stately/collections';
import { filterDOMProps } from '@react-aria/utils';
import { SelectTrigger, SelectPopover, SelectListBox, SelectOption as SelectOptionPrimitive, SelectBadge } from './primitives';

export interface MultiSelectItem {
  key: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps extends Omit<AriaSelectProps<MultiSelectItem>, 'children' | 'items' | 'selectionMode'> {
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Placeholder text when no options are selected
   */
  placeholder?: string;
  /**
   * Array of select items
   */
  items: MultiSelectItem[];
  /**
   * Default selected keys (uncontrolled)
   */
  defaultSelectedKeys?: 'all' | Iterable<Key>;
  /**
   * Selected keys (controlled)
   */
  selectedKeys?: 'all' | Iterable<Key>;
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (keys: Set<Key>) => void;
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

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  function MultiSelect(
    {
      label,
      placeholder = 'Select options',
      items,
      defaultSelectedKeys,
      selectedKeys,
      onSelectionChange,
      isDisabled,
      error,
      size = 'md',
      className,
      ...rest
    },
    ref
  ) {
    // Convert items array to children with Item components
    const children = useMemo(() => {
      return items.map(item => (
        <Item key={item.key} textValue={item.label} isDisabled={item.disabled}>
          {item.label}
        </Item>
      ));
    }, [items]);
    
    // React Aria useSelectState with multiple selection
    const state = useSelectState({
      children,
      defaultSelectedKeys,
      selectedKeys,
      onSelectionChange: onSelectionChange as any,
      isDisabled,
      selectionMode: 'multiple',
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

    // Handle press events for trigger
    const originalOnPress = (triggerProps as any).onPress;
    const { pressProps } = usePress({
      onPress: (e: any) => {
        if (e.pointerType !== 'touch') {
          state.setOpen(!state.isOpen);
        } else {
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
    
    // Merge pressProps with other triggerProps
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

    // Get selected items for display
    const selectedItems = Array.from(state.selectedKeys || [])
      .map(key => {
        const item = state.collection.getItem(key);
        return item ? { key: item.key, label: item.textValue || String(item.key) } : null;
      })
      .filter(Boolean) as Array<{ key: Key; label: string }>;

    const hasSelection = selectedItems.length > 0;
    const selectedCount = selectedItems.length;

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
          {hasSelection ? (
            <div className="eui-select-badges">
              {selectedItems.slice(0, 3).map((item) => (
                <SelectBadge
                  key={item.key}
                  label={item.label}
                  onRemove={() => {
                    const newKeys = new Set(state.selectedKeys);
                    newKeys.delete(item.key);
                    state.setSelectedKeys(newKeys);
                  }}
                  isDisabled={isDisabled}
                />
              ))}
              {selectedCount > 3 && (
                <span className="eui-select-badge-count">+{selectedCount - 3}</span>
              )}
            </div>
          ) : (
            <span {...valueProps} className="eui-select-value" data-placeholder>
              {placeholder}
            </span>
          )}
        </SelectTrigger>

        <SelectPopover
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
          referenceRef={triggerRef}
          placement="bottom-start"
        >
          <SelectListBox {...listBoxProps} ref={listBoxRef}>
            {Array.from(state.collection).map((item) => (
              <MultiSelectOptionComponent
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

interface MultiSelectOptionComponentProps {
  item: any;
  state: any;
}

function MultiSelectOptionComponent({ item, state }: MultiSelectOptionComponentProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  return (
    <SelectOptionPrimitive
      {...optionProps}
      ref={ref}
      isSelected={isSelected}
      isFocused={isFocused}
      isDisabled={isDisabled}
      showCheckbox
    >
      <input
        type="checkbox"
        checked={isSelected}
        disabled={isDisabled}
        readOnly
        tabIndex={-1}
        style={{ marginRight: 'var(--eui-spacing-xs)' }}
      />
      {item.textValue || (typeof item.rendered === 'string' ? item.rendered : String(item.key))}
    </SelectOptionPrimitive>
  );
}

