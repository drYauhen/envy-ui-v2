import React from 'react';
import { useFormContext } from './form-context';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  labelPosition?: 'auto' | 'top' | 'left' | 'inline';
  required?: boolean;
  error?: string | boolean;
  helperText?: string;
  children: React.ReactNode;
  id?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: React.HTMLAttributes<HTMLElement>;
  helperTextProps?: React.HTMLAttributes<HTMLSpanElement>;
  errorTextProps?: React.HTMLAttributes<HTMLSpanElement>;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  function FormField(
    {
      label,
      labelPosition = 'auto',
      required,
      error,
      helperText,
      children,
      className,
      id,
      labelProps,
      inputProps,
      helperTextProps,
      errorTextProps,
      ...rest
    },
    ref
  ) {
    const formContext = useFormContext();
    const hasError = Boolean(error);
    const errorText = typeof error === 'string' ? error : undefined;
    const childElement = React.isValidElement(children) ? children : null;
    const childProps = (childElement?.props ?? {}) as Record<string, unknown>;

    const baseId = React.useId();
    const inputId = String(
      id ??
        (inputProps?.id as string | undefined) ??
        (typeof childProps.id === 'string' ? childProps.id : undefined) ??
        `${baseId}-input`
    );
    const helperId = helperTextProps?.id ?? `${baseId}-helper`;
    const errorId = errorTextProps?.id ?? `${baseId}-error`;

    const describedBy = new Set<string>();
    const existingDescribedBy =
      (inputProps?.['aria-describedby'] as string | undefined) ??
      (childProps['aria-describedby'] as string | undefined);

    if (existingDescribedBy) {
      existingDescribedBy.split(/\s+/).filter(Boolean).forEach((value) => describedBy.add(value));
    }

    if (hasError && errorText) {
      describedBy.add(errorId);
    } else if (!hasError && helperText) {
      describedBy.add(helperId);
    }

    const isInlineControl = () => {
      if (!childElement) return false;
      const type = childProps.type;
      return type === 'checkbox' || type === 'radio';
    };

    const resolvedLabelPosition = (() => {
      if (labelPosition !== 'auto') return labelPosition;
      if (isInlineControl()) return 'inline';
      return formContext?.layout === 'stacked' ? 'top' : 'left';
    })();

    const inputClassName = [
      childProps.className as string | undefined,
      inputProps?.className
    ]
      .filter(Boolean)
      .join(' ') || undefined;
    const inputStyle = {
      ...(childProps.style as React.CSSProperties | undefined),
      ...(inputProps?.style as React.CSSProperties | undefined)
    };

    const resolvedInputProps = {
      ...(childElement ? (childElement.props as Record<string, unknown>) : {}),
      ...(inputProps ?? {}),
      ...(inputClassName ? { className: inputClassName } : null),
      ...(Object.keys(inputStyle).length ? { style: inputStyle } : null),
      id: inputId,
      'aria-describedby': describedBy.size ? Array.from(describedBy).join(' ') : undefined,
      'aria-invalid':
        inputProps?.['aria-invalid'] ??
        (hasError ? true : undefined),
      'aria-required':
        inputProps?.['aria-required'] ??
        (required ? true : undefined),
      ...(hasError && childProps['data-eui-state'] == null ? { 'data-eui-state': 'error' } : null)
    } as React.HTMLAttributes<HTMLElement>;

    const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
    const labelNode = label ? (
      <label
        className={['eui-label', labelClassName].filter(Boolean).join(' ')}
        data-eui-slot="label"
        htmlFor={labelProps?.htmlFor ?? inputId}
        {...restLabelProps}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
    ) : null;

    const inputNode = childElement ? (
      <div data-eui-slot="input">
        {React.cloneElement(childElement as React.ReactElement<any>, resolvedInputProps)}
      </div>
    ) : (
      <div data-eui-slot="input">{children}</div>
    );

    return (
      <div
        ref={ref}
        className={`eui-form-field ${className || ''}`}
        data-eui-label-position={resolvedLabelPosition}
        data-eui-error={hasError || undefined}
        {...rest}
      >
        {resolvedLabelPosition === 'inline' ? inputNode : labelNode}
        {resolvedLabelPosition === 'inline' ? labelNode : inputNode}
        {helperText && !hasError && (
          <span
            data-eui-slot="helper-text"
            {...helperTextProps}
            id={helperTextProps?.id ?? helperId}
          >
            {helperText}
          </span>
        )}
        {errorText && (
          <span
            data-eui-slot="error-text"
            role="alert"
            {...errorTextProps}
            id={errorTextProps?.id ?? errorId}
          >
            {errorText}
          </span>
        )}
      </div>
    );
  }
);
