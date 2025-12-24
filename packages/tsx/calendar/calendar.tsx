import React, { useRef } from 'react';
import { useCalendar, AriaCalendarProps } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { useLocale } from 'react-aria';
import { CalendarDate, createCalendar } from '@internationalized/date';
import { CalendarGrid } from './calendar-grid';
import { CalendarHeader } from './calendar-header';

export interface CalendarProps extends Omit<AriaCalendarProps<Date>, 'value' | 'defaultValue' | 'onChange'> {
  /**
   * Selected date value (controlled)
   */
  value?: Date | null;
  /**
   * Default selected date (uncontrolled)
   */
  defaultValue?: Date | null;
  /**
   * Callback when date selection changes
   */
  onChange?: (date: Date | null) => void;
  /**
   * Minimum selectable date
   */
  minValue?: Date;
  /**
   * Maximum selectable date
   */
  maxValue?: Date;
  /**
   * Whether calendar is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether calendar is read-only
   */
  isReadOnly?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    {
      value,
      defaultValue,
      onChange,
      minValue,
      maxValue,
      isDisabled,
      isReadOnly,
      className,
      ...rest
    },
    ref
  ) {
    const { locale } = useLocale();
    const state = useCalendarState({
      locale,
      createCalendar,
      value: value ? new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate()) : undefined,
      defaultValue: defaultValue ? new CalendarDate(defaultValue.getFullYear(), defaultValue.getMonth() + 1, defaultValue.getDate()) : undefined,
      onChange: (date: CalendarDate | null) => {
        if (onChange) {
          onChange(date ? new Date(date.year, date.month - 1, date.day) : null);
        }
      },
      minValue: minValue ? new CalendarDate(minValue.getFullYear(), minValue.getMonth() + 1, minValue.getDate()) : undefined,
      maxValue: maxValue ? new CalendarDate(maxValue.getFullYear(), maxValue.getMonth() + 1, maxValue.getDate()) : undefined,
      isDisabled,
      isReadOnly,
      ...rest
    });

    const calendarRef = useRef<HTMLDivElement>(null);
    const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
      {
        ...rest,
        isDisabled,
        isReadOnly
      },
      state
    );

    return (
      <div
        ref={ref || calendarRef}
        {...calendarProps}
        className={['eui-calendar', className].filter(Boolean).join(' ')}
        data-eui-context="app"
      >
        <CalendarHeader
          state={state}
          prevButtonProps={prevButtonProps}
          nextButtonProps={nextButtonProps}
        />
        <CalendarGrid state={state} />
      </div>
    );
  }
);

