import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '../../src/ui/calendar.css';

const meta: Meta = {
  title: 'HTML + CSS/Components/Calendar',
  tags: ['autodocs']
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

export const Basic: Story = {
  render: () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
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
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
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
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
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

