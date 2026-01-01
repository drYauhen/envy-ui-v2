import React from 'react';

export interface FormRowProps {
  columns?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  function FormRow({ columns = 1, children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={`eui-form-row ${className || ''}`}
        data-eui-columns={columns}
        style={{ '--eui-form-row-columns': columns } as React.CSSProperties}
        {...rest}
      >
        {children}
      </div>
    );
  }
);






