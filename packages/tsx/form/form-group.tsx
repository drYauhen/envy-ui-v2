import React from 'react';

export interface FormGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

export const FormGroup = React.forwardRef<HTMLFieldSetElement, FormGroupProps>(
  function FormGroup(
    { label, orientation = 'vertical', children, className, ...rest },
    ref
  ) {
    return (
      <fieldset
        ref={ref}
        className={`eui-form-group ${className || ''}`}
        data-eui-orientation={orientation}
        {...rest}
      >
        {label && (
          <legend className="eui-form-group-label" data-eui-slot="label">
            {label}
          </legend>
        )}
        <div className="eui-form-group-items" data-eui-slot="items">
          {children}
        </div>
      </fieldset>
    );
  }
);




