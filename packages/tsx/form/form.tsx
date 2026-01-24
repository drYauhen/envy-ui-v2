import * as React from 'react';
import { FormContext, type FormDensity, type FormLayout } from './form-context';

export type FormLayoutMode = FormLayout | 'auto';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  layout?: FormLayoutMode;
  density?: FormDensity;
}

export type FormActionsAlign = 'start' | 'end' | 'between';

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: FormActionsAlign;
}

const DEFAULT_STACKED_BREAKPOINT = 480;

const parseLengthToPx = (value: string, rootFontSize: number) => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^(-?\d*\.?\d+)(px|rem|em)?$/);
  if (!match) return null;

  const amount = Number.parseFloat(match[1]);
  const unit = match[2] ?? 'px';

  if (Number.isNaN(amount)) return null;
  if (unit === 'px') return amount;
  if (unit === 'rem' || unit === 'em') {
    return amount * rootFontSize;
  }
  return null;
};

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  { layout = 'horizontal', density = 'comfortable', className, style, ...rest },
  ref
) {
  const formRef = React.useRef<HTMLFormElement>(null);
  React.useImperativeHandle(ref, () => formRef.current as HTMLFormElement);

  const [autoLayout, setAutoLayout] = React.useState<FormLayout>(
    layout === 'auto' ? 'horizontal' : layout
  );

  React.useEffect(() => {
    if (layout !== 'auto') {
      setAutoLayout(layout);
      return;
    }

    const node = formRef.current;
    if (!node) return;

    const updateLayout = () => {
      const computed = getComputedStyle(node).getPropertyValue('--eui-form-layout-breakpoint-stacked');
      const rootFontSize = Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize || '16'
      );
      const breakpoint =
        parseLengthToPx(computed, rootFontSize) ?? DEFAULT_STACKED_BREAKPOINT;
      const width = node.getBoundingClientRect().width;
      setAutoLayout(width <= breakpoint ? 'stacked' : 'horizontal');
    };

    updateLayout();

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(updateLayout);
    observer.observe(node);

    return () => observer.disconnect();
  }, [layout]);

  const resolvedLayout = layout === 'auto' ? autoLayout : layout;
  const resolvedDensity = density ?? 'comfortable';

  return (
    <FormContext.Provider value={{ layout: resolvedLayout, density: resolvedDensity }}>
      <form
        ref={formRef}
        className={['eui-form', className].filter(Boolean).join(' ')}
        data-eui-layout={resolvedLayout}
        data-eui-layout-mode={layout === 'auto' ? 'auto' : undefined}
        data-eui-density={resolvedDensity === 'compact' ? 'compact' : undefined}
        style={style}
        {...rest}
      />
    </FormContext.Provider>
  );
});

export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(function FormActions(
  { align = 'end', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={['eui-form-actions', className].filter(Boolean).join(' ')}
      data-eui-align={align}
      {...rest}
    />
  );
});
