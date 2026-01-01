import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '../../src/ui/calendar.css';

const meta: Meta = {
  title: 'HTML + CSS/Components/Calendar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Calendar component variants demonstrate different architectural approaches to calendar display.
All variants use the same token system from \`tokens/app/components/calendar/\`.

**Available Variants:**
- **Double-Faced (Range Picker)**: Two months displayed side-by-side with synchronized navigation. Single header controls both months for date range selection.
- **Week View**: Week as the navigation unit. Single row of 7 days with week-based navigation instead of month-based.
        `
      }
    }
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

const sectionTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

// Helper function to generate calendar days for current month
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const days: Array<{ day: number; outsideMonth: boolean }> = [];
  
  // Add days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const daysFromPrevMonth = (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); // Adjust for Monday start
  
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    days.push({ day: prevMonthLastDay - i, outsideMonth: true });
  }
  
  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, outsideMonth: false });
  }
  
  // Add days from next month to fill the grid
  const totalCells = days.length;
  const remainingCells = 42 - totalCells; // 6 weeks * 7 days = 42 cells
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ day: i, outsideMonth: true });
  }
  
  return days;
};

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Helper function to get week dates for a given date (Monday to Sunday)
const getWeekDates = (date: Date): Date[] => {
  const d = new Date(date);
  const day = d.getDay();
  // Convert Sunday (0) to 7, then adjust to Monday (1) as start
  const dayOfWeek = day === 0 ? 7 : day;
  const diff = d.getDate() - (dayOfWeek - 1); // Monday is day 1
  const monday = new Date(d.getFullYear(), d.getMonth(), diff);
  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    week.push(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i));
  }
  return week;
};

// Helper function to format week range
const formatWeekRange = (dates: Date[]): string => {
  if (dates.length === 0) return '';
  const first = dates[0];
  const last = dates[dates.length - 1];
  const firstMonth = monthNames[first.getMonth()].substring(0, 3);
  const lastMonth = monthNames[last.getMonth()].substring(0, 3);
  
  if (first.getMonth() === last.getMonth()) {
    return `${firstMonth} ${first.getDate()} - ${last.getDate()}`;
  }
  return `${firstMonth} ${first.getDate()} - ${lastMonth} ${last.getDate()}`;
};

export const Basic: Story = {
  render: () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    const days = generateCalendarDays(currentYear, currentMonth);
    
    return (
      <div data-eui-context="app" style={containerStyle}>
        <div className="eui-calendar">
          {/* Header */}
          <div className="eui-calendar__header">
            <button className="eui-calendar__header-button" aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="eui-calendar__header-label">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <button className="eui-calendar__header-button" aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Weekday Labels */}
          <div className="eui-calendar__weekdays">
            {weekdays.map((day, index) => (
              <div key={index} className="eui-calendar__weekday" role="columnheader" aria-label={day}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="eui-calendar__grid" role="grid">
            {days.map((item, index) => {
              const isToday = !item.outsideMonth && item.day === currentDay;
              const isSelected = !item.outsideMonth && item.day === 15; // Example selected day
              
              return (
                <button
                  key={index}
                  className="eui-calendar__day"
                  role="gridcell"
                  aria-selected={isSelected}
                  data-eui-today={isToday ? 'true' : undefined}
                  data-eui-selected={isSelected ? 'true' : undefined}
                  data-eui-outside-month={item.outsideMonth ? 'true' : undefined}
                  disabled={false}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export const States: Story = {
  render: () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    const days = generateCalendarDays(currentYear, currentMonth);
    
    return (
      <div data-eui-context="app" style={containerStyle}>
        <h3 style={sectionTitleStyle}>Calendar States</h3>
        
        <div className="eui-calendar">
          <div className="eui-calendar__header">
            <button className="eui-calendar__header-button" aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="eui-calendar__header-label">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <button className="eui-calendar__header-button" aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="eui-calendar__weekdays">
            {weekdays.map((day, index) => (
              <div key={index} className="eui-calendar__weekday" role="columnheader" aria-label={day}>
                {day}
              </div>
            ))}
          </div>
          
          <div className="eui-calendar__grid" role="grid">
            {days.map((item, index) => {
              const isToday = !item.outsideMonth && item.day === currentDay;
              const isSelected = !item.outsideMonth && item.day === 15;
              const isDisabled = !item.outsideMonth && item.day === 5;
              
              return (
                <button
                  key={index}
                  className="eui-calendar__day"
                  role="gridcell"
                  aria-selected={isSelected}
                  data-eui-today={isToday ? 'true' : undefined}
                  data-eui-selected={isSelected ? 'true' : undefined}
                  data-eui-disabled={isDisabled ? 'true' : undefined}
                  data-eui-outside-month={item.outsideMonth ? 'true' : undefined}
                  disabled={isDisabled}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
          <p><strong>Legend:</strong></p>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>Today: Bold font weight</li>
            <li>Selected: Blue background (15th)</li>
            <li>Disabled: Grayed out (5th)</li>
            <li>Outside Month: Lighter color (previous/next month days)</li>
          </ul>
        </div>
      </div>
    );
  }
};

export const DateRange: Story = {
  render: () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    const days = generateCalendarDays(currentYear, currentMonth);
    const rangeStart = 10;
    const rangeEnd = 20;
    
    return (
      <div data-eui-context="app" style={containerStyle}>
        <h3 style={sectionTitleStyle}>Date Range Selection</h3>
        
        <div className="eui-calendar">
          <div className="eui-calendar__header">
            <button className="eui-calendar__header-button" aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="eui-calendar__header-label">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <button className="eui-calendar__header-button" aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="eui-calendar__weekdays">
            {weekdays.map((day, index) => (
              <div key={index} className="eui-calendar__weekday" role="columnheader" aria-label={day}>
                {day}
              </div>
            ))}
          </div>
          
          <div className="eui-calendar__grid" role="grid">
            {days.map((item, index) => {
              if (item.outsideMonth) {
                return (
                  <button
                    key={index}
                    className="eui-calendar__day"
                    role="gridcell"
                    data-eui-outside-month="true"
                    disabled
                  >
                    {item.day}
                  </button>
                );
              }
              
              const isToday = item.day === currentDay;
              const isRangeStart = item.day === rangeStart;
              const isRangeEnd = item.day === rangeEnd;
              const isInRange = item.day > rangeStart && item.day < rangeEnd;
              
              return (
                <button
                  key={index}
                  className="eui-calendar__day"
                  role="gridcell"
                  aria-selected={isRangeStart || isRangeEnd}
                  data-eui-today={isToday ? 'true' : undefined}
                  data-eui-range-start={isRangeStart ? 'true' : undefined}
                  data-eui-range-end={isRangeEnd ? 'true' : undefined}
                  data-eui-in-range={isInRange ? 'true' : undefined}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
          <p><strong>Range:</strong> {rangeStart} - {rangeEnd}</p>
        </div>
      </div>
    );
  }
};

// ============================================
// VARIANTS SECTION
// ============================================

export const DoubleFaced: Story = {
  render: () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    // Calculate next month
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    
    const currentDays = generateCalendarDays(currentYear, currentMonth);
    const nextDays = generateCalendarDays(nextYear, nextMonth);
    
    // Format month range for header
    const currentMonthName = monthNames[currentMonth];
    const nextMonthName = monthNames[nextMonth];
    const monthRange = `${currentMonthName} - ${nextMonthName} ${currentYear === nextYear ? currentYear : `${currentYear} / ${nextYear}`}`;
    
    // Range selection across months: starts in current month, ends in next month
    const rangeStart = 25; // Start date in current month
    const rangeEnd = 7; // End date in next month
    
    // Find the first non-outsideMonth index in nextDays to distinguish between
    // days from previous month (currentMonth) and days from month after next
    const firstCurrentMonthIndex = nextDays.findIndex(item => !item.outsideMonth);
    
    return (
      <div data-eui-context="app" style={containerStyle}>
        <h3 style={sectionTitleStyle}>Double-Faced Calendar (Range Picker)</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
          Two months displayed side-by-side with synchronized navigation. Single header controls both months for date range selection.
          Example range: {rangeStart} {currentMonthName} - {rangeEnd} {nextMonthName}
        </p>
        
        {/* Single calendar component with two months */}
        <div className="eui-calendar" style={{ width: 'auto', maxWidth: '600px' }}>
          {/* Single header for both months */}
          <div className="eui-calendar__header">
            <button className="eui-calendar__header-button" aria-label="Previous months">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="eui-calendar__header-label">
              {monthRange}
            </div>
            <button className="eui-calendar__header-button" aria-label="Next months">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Two months container */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* First month */}
            <div style={{ flex: 1 }}>
              <div className="eui-calendar__weekdays">
                {weekdays.map((day, index) => (
                  <div key={index} className="eui-calendar__weekday" role="columnheader" aria-label={day}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="eui-calendar__grid" role="grid">
                {currentDays.map((item, index) => {
                  if (item.outsideMonth) {
                    // Days from next month - empty cells but may be in range for visual continuity
                    // All days from next month in left calendar are in range (after rangeStart)
                    return (
                      <button
                        key={index}
                        className="eui-calendar__day"
                        role="gridcell"
                        data-eui-outside-month="true"
                        data-eui-in-range="true"
                        disabled
                        aria-hidden="true"
                      >
                        {/* Empty - no text, but cell exists for grid structure and range highlighting */}
                      </button>
                    );
                  }
                  
                  const isToday = item.day === currentDay;
                  const isRangeStart = item.day === rangeStart;
                  // All days after rangeStart in current month are in range
                  const isInRange = item.day > rangeStart;
                  
                  return (
                    <button
                      key={index}
                      className="eui-calendar__day"
                      role="gridcell"
                      aria-selected={isRangeStart}
                      data-eui-today={isToday ? 'true' : undefined}
                      data-eui-range-start={isRangeStart ? 'true' : undefined}
                      data-eui-in-range={isInRange ? 'true' : undefined}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Second month */}
            <div style={{ flex: 1 }}>
              <div className="eui-calendar__weekdays">
                {weekdays.map((day, index) => (
                  <div key={index} className="eui-calendar__weekday" role="columnheader" aria-label={day}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="eui-calendar__grid" role="grid">
                {nextDays.map((item, index) => {
                  if (item.outsideMonth) {
                    // Days from previous month (currentMonth) - empty cells
                    // Only highlight those that are in range (>= rangeStart)
                    // The first outsideMonth block (before firstCurrentMonthIndex) contains days from currentMonth
                    // item.day contains the actual day number from currentMonth
                    // Only days >= rangeStart should be highlighted
                    const isFromPreviousMonth = index < firstCurrentMonthIndex;
                    const isInRange = isFromPreviousMonth && item.day >= rangeStart;
                    
                    return (
                      <button
                        key={index}
                        className="eui-calendar__day"
                        role="gridcell"
                        data-eui-outside-month="true"
                        data-eui-in-range={isInRange ? 'true' : undefined}
                        disabled
                        aria-hidden="true"
                      >
                        {/* Empty - no text, only highlighted if in range (>= rangeStart) */}
                      </button>
                    );
                  }
                  
                  const isRangeEnd = item.day === rangeEnd;
                  // All days before rangeEnd in next month are in range
                  const isInRange = item.day < rangeEnd;
                  
                  return (
                    <button
                      key={index}
                      className="eui-calendar__day"
                      role="gridcell"
                      aria-selected={isRangeEnd}
                      data-eui-range-end={isRangeEnd ? 'true' : undefined}
                      data-eui-in-range={isInRange ? 'true' : undefined}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const Weekly: Story = {
  render: () => {
    const today = new Date();
    const weekDates = getWeekDates(new Date(today));
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    return (
      <div data-eui-context="app" style={containerStyle}>
        <h3 style={sectionTitleStyle}>Week View Calendar</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
          Week as the navigation unit. Single row of 7 days with week-based navigation instead of month-based.
        </p>
        <div className="eui-calendar">
          {/* Header with week range */}
          <div className="eui-calendar__header">
            <button className="eui-calendar__header-button" aria-label="Previous week">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="eui-calendar__header-label">
              Week of {formatWeekRange(weekDates)}
            </div>
            <button className="eui-calendar__header-button" aria-label="Next week">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Weekday labels */}
          <div className="eui-calendar__weekdays">
            {weekdays.map((day, index) => (
              <div key={index} className="eui-calendar__weekday" role="columnheader" aria-label={day}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Single row with 7 days (uses standard flex layout, 7 items = 1 row) */}
          <div className="eui-calendar__grid" role="grid">
            {weekDates.map((date, index) => {
              const isToday = date.getDate() === currentDay && 
                             date.getMonth() === currentMonth && 
                             date.getFullYear() === currentYear;
              return (
                <button
                  key={index}
                  className="eui-calendar__day"
                  role="gridcell"
                  data-eui-today={isToday ? 'true' : undefined}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};


