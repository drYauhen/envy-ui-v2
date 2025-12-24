import React from 'react';

export interface FormGroupProps {
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  children: React.ReactNode;
  className?: string;
}

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  function FormGroup(
    { label, orientation = 'vertical', children, className, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={`eui-form-group ${className || ''}`}
        data-eui-orientation={orientation}
        {...rest}
      >
        {label && (
          <div className="eui-form-group-label" data-eui-slot="label">
            {label}
          </div>
        )}
        <div className="eui-form-group-items" data-eui-slot="items">
          {children}
        </div>
      </div>
    );
  }
);



