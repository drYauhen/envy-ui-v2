import React from 'react';

export interface FormFieldProps {
  label?: React.ReactNode;
  labelPosition?: 'top' | 'left' | 'inline';
  required?: boolean;
  error?: string | boolean;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  function FormField(
    {
      label,
      labelPosition = 'top',
      required,
      error,
      helperText,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const hasError = Boolean(error);
    const errorText = typeof error === 'string' ? error : undefined;

    return (
      <div
        ref={ref}
        className={`eui-form-field ${className || ''}`}
        data-eui-label-position={labelPosition}
        data-eui-error={hasError || undefined}
        {...rest}
      >
        {label && (
          <span data-eui-slot="label" className="eui-label">
            {label}
            {required && <span aria-label="required"> *</span>}
          </span>
        )}
        <div data-eui-slot="input">{children}</div>
        {helperText && !hasError && (
          <span data-eui-slot="helper-text">{helperText}</span>
        )}
        {errorText && (
          <span data-eui-slot="error-text" role="alert">{errorText}</span>
        )}
      </div>
    );
  }
);

