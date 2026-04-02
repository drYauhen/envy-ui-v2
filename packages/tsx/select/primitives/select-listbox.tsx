import React, { forwardRef, useCallback } from 'react';
import { useFocusVisible } from 'react-aria';
import { useOverlayScrollbar } from '../../scrollbar';

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
    const { isFocusVisible } = useFocusVisible();
    const { contentRef, trackRef, thumbRef, containerProps } = useOverlayScrollbar();

    const setListboxRef = useCallback(
      (node: HTMLUListElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLUListElement | null>).current = node;
        }
      },
      [ref]
    );

    const containerClassName = [containerProps.className, 'eui-select-listbox-container']
      .filter(Boolean)
      .join(' ');

    return (
      <div {...containerProps} className={containerClassName} style={containerProps.style}>
        <div ref={contentRef} className="eui-select-listbox-scroll eui-scrollbar-content">
          <ul
            ref={setListboxRef}
            className={`eui-select-listbox ${className || ''}`}
            {...rest}
            data-eui-focus-visible={isFocusVisible || undefined}
          >
            {children}
          </ul>
        </div>
        <div ref={trackRef} className="eui-scrollbar-track">
          <div ref={thumbRef} className="eui-scrollbar-thumb" />
        </div>
      </div>
    );
  }
);
