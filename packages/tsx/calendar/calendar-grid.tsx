import React from 'react';
import { useCalendarState } from 'react-stately';
import { useCalendarGrid, useLocale } from 'react-aria';
import { CalendarDate, getLocalTimeZone, getWeeksInMonth } from '@internationalized/date';
import { CalendarCell } from './calendar-cell';

interface CalendarGridProps {
  state: ReturnType<typeof useCalendarState>;
}

export function CalendarGrid({ state }: CalendarGridProps) {
  const { locale } = useLocale();
  let { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);

  const weekdays = weekDays.map((day, index) => (
    <div
      key={index}
      className="eui-calendar__weekday"
      role="columnheader"
      aria-label={day}
    >
      {day}
    </div>
  ));

  // Use React Aria's state to get properly positioned dates
  let weeks: CalendarDate[][] = [];
  let date = state.visibleRange.start;

  // Calculate the start of the first week (including days from previous month)
  const startOfMonth = date;
  const endOfMonth = state.visibleRange.end;

  // Find the first day to display (start of week containing startOfMonth)
  const startOfWeek = startOfMonth.subtract({ days: (startOfMonth.toDate(getLocalTimeZone()).getDay() + 6) % 7 });

  // Generate 6 weeks (42 days) to ensure consistent grid
  date = startOfWeek;
  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    let week: CalendarDate[] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      week.push(date);
      date = date.add({ days: 1 });
    }
    weeks.push(week);

    // Stop if we've covered the month
    if (date.compare(endOfMonth) > 0) {
      break;
    }
  }

  return (
    <>
      <div {...headerProps} className="eui-calendar__weekdays">
        {weekdays}
      </div>
      <div {...gridProps} className="eui-calendar__grid" role="grid">
        {weeks.map((week, weekIndex) =>
          week.map((date, dayIndex) => {
            const cellDate = date;
            const isOutsideMonth = cellDate.compare(state.visibleRange.start) < 0 || cellDate.compare(state.visibleRange.end) > 0;
            const today = new Date();
            const isToday =
              cellDate.year === today.getFullYear() &&
              cellDate.month === today.getMonth() + 1 &&
              cellDate.day === today.getDate();

            return (
              <CalendarCell
                key={`${weekIndex}-${dayIndex}`}
                state={state}
                date={cellDate}
                isOutsideMonth={isOutsideMonth}
                isToday={isToday}
              />
            );
          })
        )}
      </div>
    </>
  );
}
