import * as React from 'react';

export type FormLayout = 'horizontal' | 'stacked';
export type FormDensity = 'comfortable' | 'compact';

export type FormContextValue = {
  layout: FormLayout;
  density: FormDensity;
};

export const FormContext = React.createContext<FormContextValue | null>(null);

export const useFormContext = () => React.useContext(FormContext);
