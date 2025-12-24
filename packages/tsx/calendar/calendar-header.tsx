import React from 'react';
import { useCalendarState } from 'react-stately';
import { useLocale } from 'react-aria';
import { useButton, AriaButtonProps } from 'react-aria';
import { useRef } from 'react';

interface CalendarHeaderProps {
  state: ReturnType<typeof useCalendarState>;
  prevButtonProps: AriaButtonProps;
  nextButtonProps: AriaButtonProps;
}

export function CalendarHeader({ state, prevButtonProps, nextButtonProps }: CalendarHeaderProps) {
  const { locale } = useLocale();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  
  const { buttonProps: prevProps } = useButton(prevButtonProps, prevButtonRef);
  const { buttonProps: nextProps } = useButton(nextButtonProps, nextButtonRef);

  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const monthYear = monthFormatter.format(state.visibleRange.start.toDate(state.timeZone));

  return (
    <div className="eui-calendar__header">
      <button
        {...prevProps}
        ref={prevButtonRef}
        className="eui-calendar__header-button"
        aria-label="Previous month"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="eui-calendar__header-label">
        {monthYear}
      </div>
      <button
        {...nextProps}
        ref={nextButtonRef}
        className="eui-calendar__header-button"
        aria-label="Next month"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

