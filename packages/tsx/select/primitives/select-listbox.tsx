import React, { forwardRef } from 'react';

export interface SelectListBoxProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Additional CSS class
   */
  className?: string;
}

export const SelectListBox = forwardRef<HTMLUListElement, SelectListBoxProps>(
  function SelectListBox(
    {
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <ul
        ref={ref}
        className={`eui-select-listbox ${className || ''}`}
        {...rest}
      >
        {children}
      </ul>
    );
  }
);


