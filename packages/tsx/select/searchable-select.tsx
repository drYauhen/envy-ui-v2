import React, { useRef, Key, useMemo } from 'react';
import { useComboBox, useListBox, useOption, AriaComboBoxProps, mergeProps } from 'react-aria';
import { useComboBoxState } from 'react-stately';
import { Item } from '@react-stately/collections';
import { SelectPopover, SelectListBox, SelectOption as SelectOptionPrimitive } from './primitives';

export interface SearchableSelectItem {
  key: string;
  label: string;
  disabled?: boolean;
}

export interface SearchableSelectProps extends Omit<AriaComboBoxProps<SearchableSelectItem>, 'children' | 'items'> {
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
  items: SearchableSelectItem[];
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

export const SearchableSelect = React.forwardRef<HTMLDivElement, SearchableSelectProps>(
  function SearchableSelect(
    {
      label,
      placeholder = 'Type to search...',
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
    // Convert items array to children with Item components
    const children = useMemo(() => {
      return items.map(item => (
        <Item key={item.key} textValue={item.label} isDisabled={item.disabled}>
          {item.label}
        </Item>
      ));
    }, [items]);
    
    // Custom filter function: search by contains (not just startsWith)
    // This allows searching anywhere in the text, not just at the beginning
    const filterFunction = React.useCallback((textValue: string, inputValue: string) => {
      if (!inputValue) return true; // Show all items when input is empty
      // Case-insensitive search by contains
      return textValue.toLowerCase().includes(inputValue.toLowerCase());
    }, []);
    
    // React Aria useComboBoxState with custom filter
    const state = useComboBoxState({
      children,
      defaultSelectedKey,
      selectedKey,
      onSelectionChange: onSelectionChange as any,
      isDisabled,
      defaultFilter: filterFunction, // Use contains filter instead of default startsWith
      allowsEmptyCollection: true, // Allow showing "No results" message
      ...rest
    } as any);

    const inputRef = useRef<HTMLInputElement>(null);
    const listBoxRef = useRef<HTMLUListElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const {
      labelProps,
      inputProps,
      listBoxProps,
      popoverProps
    } = useComboBox(
      {
        label,
        isDisabled,
        inputRef,
        listBoxRef,
        popoverRef,
        ...rest
      } as any,
      state
    );
    
    // Handle click on input to open dropdown even when empty
    const handleInputClick = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {
      // Open dropdown if it's not already open
      if (!state.isOpen && !isDisabled) {
        state.setOpen(true);
      }
    }, [state, isDisabled]);

    // Handle focus on input to open dropdown even when empty
    const handleInputFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      // Open dropdown if it's not already open and input is empty or has value
      if (!state.isOpen && !isDisabled) {
        state.setOpen(true);
      }
    }, [state, isDisabled]);
    
    // Merge our handlers with React Aria's inputProps
    const mergedInputProps = mergeProps(inputProps, {
      onClick: handleInputClick,
      onFocus: handleInputFocus
    });

    return (
      <div ref={ref} className={`eui-select-wrapper ${className || ''}`}>
        {label && (
          <label {...labelProps} className="eui-label">
            {label}
          </label>
        )}

        <input
          {...mergedInputProps}
          ref={inputRef}
          className="eui-input"
          data-eui-size={size}
          data-eui-state={error ? 'error' : undefined}
          placeholder={placeholder}
          disabled={isDisabled}
        />

        <SelectPopover
          {...(popoverProps as Omit<any, 'ref'>)}
          ref={popoverRef}
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
          referenceRef={inputRef}
          placement="bottom-start"
        >
          <SelectListBox {...listBoxProps} ref={listBoxRef}>
            {state.collection.size === 0 ? (
              <li className="eui-select-option" data-eui-state="empty" role="option" aria-disabled="true">
                No results found
              </li>
            ) : (
              Array.from(state.collection).map((item) => (
                <SearchableSelectOptionComponent
                  key={item.key}
                  item={item}
                  state={state}
                />
              ))
            )}
          </SelectListBox>
        </SelectPopover>
      </div>
    );
  }
);

interface SearchableSelectOptionComponentProps {
  item: any;
  state: any;
}

function SearchableSelectOptionComponent({ item, state }: SearchableSelectOptionComponentProps) {
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

