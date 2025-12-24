import React, { useRef } from 'react';
import { useCalendarState } from 'react-stately';
import { useCalendarCell, useLocale } from 'react-aria';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
import { mergeProps } from 'react-aria';

interface CalendarCellProps {
  state: ReturnType<typeof useCalendarState>;
  date: CalendarDate;
  isOutsideMonth: boolean;
  isToday: boolean;
}

export function CalendarCell({ state, date, isOutsideMonth, isToday }: CalendarCellProps) {
  const { locale } = useLocale();
  const cellRef = useRef<HTMLButtonElement>(null);
  
  const {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    formattedDate
  } = useCalendarCell(
    {
      date,
      isDisabled: isOutsideMonth
    },
    state,
    cellRef
  );

  const mergedProps = mergeProps(cellProps, buttonProps);

  return (
    <button
      {...mergedProps}
      ref={cellRef}
      className="eui-calendar__day"
      data-eui-today={isToday ? 'true' : undefined}
      data-eui-selected={isSelected ? 'true' : undefined}
      data-eui-disabled={isDisabled ? 'true' : undefined}
      data-eui-outside-month={isOutsideMonth ? 'true' : undefined}
      disabled={isDisabled}
    >
      {formattedDate}
    </button>
  );
}

