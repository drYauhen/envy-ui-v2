import * as React from 'react';
import { useDateField, useDateSegment, useLocale } from 'react-aria';
import { useDateFieldState } from '@react-stately/datepicker';
import type { DateSegment as DateSegmentType } from '@react-stately/datepicker';
import type { AriaDateFieldProps, DateValue } from '@react-types/datepicker';
import { createCalendar } from '@internationalized/date';
import systemMeta from '../../system.meta.json';
import type { InputSize, InputState } from './input';

export type InputDateProps = AriaDateFieldProps<DateValue> & {
  size?: InputSize;
  state?: InputState;
  className?: string;
  style?: React.CSSProperties;
};

type DateSegmentProps = {
  segment: DateSegmentType;
  state: ReturnType<typeof useDateFieldState>;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedClass = (name: string) => `${SYSTEM_PREFIX}-${name}`;
const mergeClassNames = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');

const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  const mergedStyle = {
    ...(segmentProps.style as React.CSSProperties | undefined)
  };

  return (
    <span
      {...segmentProps}
      ref={ref}
      className={mergeClassNames(prefixedClass('input-segment'), segmentProps.className)}
      data-eui-placeholder={segment.isPlaceholder ? '' : undefined}
      style={mergedStyle}
    >
      {segment.text}
    </span>
  );
};

export const InputDate = React.forwardRef<HTMLDivElement, InputDateProps>(function InputDate(
  { size = 'md', state, className, style, shouldForceLeadingZeros, ...rest },
  forwardedRef
) {
  const { locale } = useLocale();
  const resolvedProps = {
    ...rest,
    shouldForceLeadingZeros: shouldForceLeadingZeros ?? true
  };
  const fieldState = useDateFieldState({
    ...resolvedProps,
    locale,
    createCalendar
  });
  const fieldRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(forwardedRef, () => fieldRef.current as HTMLDivElement);

  const { fieldProps } = useDateField(resolvedProps, fieldState, fieldRef);
  const hasError = state === 'error' || fieldState.isInvalid;

  return (
    <div
      {...fieldProps}
      ref={fieldRef}
      className={[prefixedClass('input'), className].filter(Boolean).join(' ')}
      data-eui-size={size}
      data-eui-input-kind="date"
      data-eui-state={hasError ? 'error' : undefined}
      style={{
        ...(fieldProps.style as React.CSSProperties | undefined),
        ...style
      }}
    >
      {fieldState.segments.map((segment, index) => (
        <DateSegment key={`${segment.type}-${index}`} segment={segment} state={fieldState} />
      ))}
    </div>
  );
});
