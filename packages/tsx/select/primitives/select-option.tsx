import React, { forwardRef } from 'react';

export interface SelectOptionProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * Whether option is selected
   */
  isSelected?: boolean;
  /**
   * Whether option is focused
   */
  isFocused?: boolean;
  /**
   * Whether option is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether to show checkbox (for MultiSelect)
   */
  showCheckbox?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

export const SelectOption = forwardRef<HTMLLIElement, SelectOptionProps>(
  function SelectOption(
    {
      isSelected,
      isFocused,
      isDisabled,
      showCheckbox = false,
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <li
        ref={ref}
        className={`eui-select-option ${className || ''}`}
        data-eui-selected={isSelected || undefined}
        data-eui-focused={isFocused || undefined}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        {showCheckbox && (
          <span className="eui-select-option-checkbox" aria-hidden="true">
            <input
              type="checkbox"
              checked={isSelected}
              disabled={isDisabled}
              readOnly
              tabIndex={-1}
            />
          </span>
        )}
        {children}
      </li>
    );
  }
);


