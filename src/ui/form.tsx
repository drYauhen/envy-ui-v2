import * as React from 'react';
import { useField } from 'react-aria';
import {
  Form as FormBase,
  FormActions,
  FormField as FormFieldBase,
  FormGroup,
  FormRow,
  FormSection,
  type FormActionsAlign,
  type FormActionsProps,
  type FormFieldProps as FormFieldBaseProps,
  type FormGroupProps,
  type FormRowProps,
  type FormSectionProps,
  type FormLayoutMode,
  type FormProps
} from '../../packages/tsx/form';

export type {
  FormActionsAlign,
  FormActionsProps,
  FormGroupProps,
  FormLayoutMode,
  FormProps,
  FormRowProps,
  FormSectionProps
};
export { FormActions, FormGroup, FormRow, FormSection };

export interface FormFieldProps
  extends Omit<
    FormFieldBaseProps,
    'labelProps' | 'inputProps' | 'helperTextProps' | 'errorTextProps' | 'error' | 'required'
  > {
  error?: string | boolean;
  helperText?: string;
  required?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

export const Form = FormBase;

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {
    label,
    helperText,
    error,
    errorMessage,
    required,
    isRequired,
    isInvalid,
    ...rest
  },
  ref
) {
  const resolvedError = errorMessage ?? error;
  const hasError = Boolean(isInvalid ?? resolvedError);
  const errorText = typeof resolvedError === 'string' ? resolvedError : undefined;
  const requiredState = isRequired ?? required;

  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    label,
    description: helperText,
    errorMessage: errorText,
    isInvalid: hasError,
    isRequired: requiredState
  });

  return (
    <FormFieldBase
      ref={ref}
      label={label}
      helperText={helperText}
      error={errorText ?? (hasError ? true : undefined)}
      required={requiredState}
      labelProps={labelProps}
      inputProps={fieldProps}
      helperTextProps={descriptionProps}
      errorTextProps={errorMessageProps}
      {...rest}
    />
  );
});
