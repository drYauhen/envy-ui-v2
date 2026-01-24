import React from 'react';

export interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

export const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  function FormRow({ columns = 1, children, className, style, ...rest }, ref) {
    const mergedStyle = {
      ...style,
      '--eui-form-row-columns': columns
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={`eui-form-row ${className || ''}`}
        data-eui-columns={columns}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);




