import React from 'react';
import { useCalendarState } from 'react-stately';
import { useCalendarGrid, useLocale } from 'react-aria';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
import { CalendarCell } from './calendar-cell';

interface CalendarGridProps {
  state: ReturnType<typeof useCalendarState>;
}

export function CalendarGrid({ state }: CalendarGridProps) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);

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

  const startDate = state.visibleRange.start;
  const endDate = state.visibleRange.end;
  
  // Get the start of the first week (may include days from previous month)
  // dayOfWeek: 0 = Sunday, 1 = Monday, etc.
  // We want Monday = 0, so we adjust
  const firstDayOfWeekIndex = startDate.dayOfWeek === 0 ? 6 : startDate.dayOfWeek - 1;
  const gridStartDate = startDate.subtract({ days: firstDayOfWeekIndex });
  
  // Generate 6 weeks (42 days) for consistent grid
  const dates: CalendarDate[] = [];
  let current = gridStartDate;
  for (let i = 0; i < 42; i++) {
    dates.push(current);
    current = current.add({ days: 1 });
  }

  // Group dates by week (7 days)
  const weeks: CalendarDate[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
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
            const isOutsideMonth = cellDate.compare(startDate) < 0 || cellDate.compare(endDate) > 0;
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

