import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useCalendar, useDateField, useDatePicker, useDateSegment, useDialog, useLocale, mergeProps } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { useDateFieldState, useDatePickerState } from '@react-stately/datepicker';
import type { DateSegment as DateSegmentType } from '@react-stately/datepicker';
import type { AriaDatePickerProps, DateValue } from '@react-types/datepicker';
import type { CalendarProps } from '@react-types/calendar';
import { createCalendar, getLocalTimeZone, today } from '@internationalized/date';
import { Calendar } from '../../../packages/tsx/calendar';
import { CalendarGrid } from '../../../packages/tsx/calendar/calendar-grid';
import { CalendarHeader } from '../../../packages/tsx/calendar/calendar-header';
import { useFloatingPosition } from '../../../src/hooks/useFloatingPosition';
import '../../../src/ui/calendar.css';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Calendar',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX + React Aria/Components/Calendar'),
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

type DatePickerProps = AriaDatePickerProps<DateValue> & {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

type DateSegmentProps = {
  segment: DateSegmentType;
  state: ReturnType<typeof useDateFieldState>;
};

const dateFieldStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0
};

const datePickerLayoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  maxWidth: '320px'
};

const datePickerFieldStyle: React.CSSProperties = {
  width: '180px'
};

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
      className={['eui-input-segment', segmentProps.className].filter(Boolean).join(' ')}
      data-eui-placeholder={segment.isPlaceholder ? '' : undefined}
      style={mergedStyle}
    >
      {segment.text}
    </span>
  );
};

const DateField = (props: AriaDatePickerProps<DateValue> & { size?: 'sm' | 'md' | 'lg'; hasError?: boolean }) => {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className="eui-input"
      data-eui-input-kind="date"
      data-eui-size={props.size ?? 'md'}
      data-eui-state={props.hasError ? 'error' : undefined}
      style={{
        ...(fieldProps.style as React.CSSProperties | undefined),
        ...dateFieldStyle,
      }}
    >
      {state.segments.map((segment, index) => (
        <DateSegment key={index} segment={segment} state={state} />
      ))}
    </div>
  );
};

const DatePickerCalendar = (props: CalendarProps<DateValue>) => {
  const { locale } = useLocale();
  const [focusedValue, setFocusedValue] = React.useState<DateValue | null>(
    props.value ?? props.defaultFocusedValue ?? null
  );

  React.useEffect(() => {
    if (props.value) {
      setFocusedValue(props.value);
    }
  }, [props.value]);

  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
    focusedValue: focusedValue ?? undefined,
    onFocusChange: setFocusedValue
  });
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(props, state);

  return (
    <div
      ref={calendarRef}
      {...calendarProps}
      className="eui-calendar"
      data-eui-surface="floating"
    >
      <CalendarHeader state={state} prevButtonProps={prevButtonProps} nextButtonProps={nextButtonProps} />
      <CalendarGrid state={state} />
    </div>
  );
};

const DatePicker = ({ label, size = 'sm', ...props }: DatePickerProps) => {
  const groupRef = React.useRef<HTMLDivElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const resolvedProps = {
    ...props,
    shouldForceLeadingZeros: props.shouldForceLeadingZeros ?? true,
    shouldCloseOnSelect: props.shouldCloseOnSelect ?? false
  };
  const state = useDatePickerState({
    ...resolvedProps,
    createCalendar
  });
  const { groupProps, labelProps, fieldProps, dialogProps, calendarProps } = useDatePicker(
    resolvedProps,
    state,
    groupRef
  );
  const { dialogProps: dialogOverlayProps } = useDialog(dialogProps, dialogRef);
  const hasError = state.isInvalid;
  const openOnFocus = React.useCallback(() => {
    if (!resolvedProps.isDisabled && !resolvedProps.isReadOnly) {
      state.setOpen(true);
    }
  }, [resolvedProps.isDisabled, resolvedProps.isReadOnly, state]);

  const { floatingRef, floatingStyles, getFloatingProps } = useFloatingPosition({
    isOpen: state.isOpen,
    onOpenChange: state.setOpen,
    placement: 'bottom-start',
    offset: 8,
    clickOutsideToClose: true,
    escapeKeyToClose: true,
    clickToToggle: false,
    referenceRef: groupRef
  });

  const mergedDialogProps = mergeProps(dialogProps, dialogOverlayProps);
  const mergedGroupProps = mergeProps(groupProps, {
    onFocus: openOnFocus,
    onClick: openOnFocus
  });

  return (
    <div style={datePickerLayoutStyle}>
      {label ? (
        <span {...labelProps} className="eui-label">
          {label}
        </span>
      ) : null}
      <div
        {...mergedGroupProps}
        ref={groupRef}
        className="eui-input-group"
        data-eui-size={size}
        data-eui-state={hasError ? 'error' : undefined}
        style={datePickerFieldStyle}
      >
        <DateField {...fieldProps} size={size} hasError={hasError} />
        <span className="eui-input-suffix" data-eui-slot="suffix" aria-hidden="true">
          <span data-eui-icon="calendar-alt" data-eui-size={size} />
        </span>
      </div>
      {state.isOpen ? (
        <div
          {...getFloatingProps(mergedDialogProps)}
          ref={(node) => {
            if (node) {
              dialogRef.current = node;
            }
            floatingRef(node);
          }}
          style={{ ...floatingStyles, zIndex: 20 }}
        >
          <DatePickerCalendar {...calendarProps} />
        </div>
      ) : null}
    </div>
  );
};

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);

    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Calendar
              value={value}
              onChange={setValue}
            />
            {value && (
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Selected: {value.toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </MultiContextViewer>
    );
  }
};

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());

    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Calendar
              value={value}
              onChange={setValue}
            />
            {value && (
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Selected: {value.toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </MultiContextViewer>
    );
  }
};

export const Disabled: Story = {
  render: () => {
    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <>
            <Calendar
              defaultValue={new Date()}
              isDisabled
            />
          </>
        )}
      </MultiContextViewer>
    );
  }
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <>
            <Calendar
              defaultValue={new Date()}
              isReadOnly
            />
          </>
        )}
      </MultiContextViewer>
    );
  }
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7); // 7 days ago
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); // 30 days from now

    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Calendar
              value={value}
              onChange={setValue}
              minValue={minDate}
              maxValue={maxDate}
            />
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              <p>Min date: {minDate.toLocaleDateString()}</p>
              <p>Max date: {maxDate.toLocaleDateString()}</p>
              {value && <p>Selected: {value.toLocaleDateString()}</p>}
            </div>
          </div>
        )}
      </MultiContextViewer>
    );
  }
};

export const WithInputField: Story = {
  name: 'Date picker (input + calendar)',
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);
    const timeZone = getLocalTimeZone();

    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DatePicker
              label="Select date"
              value={value}
              onChange={setValue}
              placeholderValue={today(timeZone)}
              shouldForceLeadingZeros
            />
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Selected: {value ? value.toString() : 'None'}
            </div>
          </div>
        )}
      </MultiContextViewer>
    );
  }
};
