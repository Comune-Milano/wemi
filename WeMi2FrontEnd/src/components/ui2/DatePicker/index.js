
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/it';
import { useClickOutside } from 'hooks/useClickOutside';
import { colors } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';
import TooltipBox from 'components/ui2/Tooltip/tooltip';
import { isRequiredErrorType } from 'libs/Form/validation/requiredErrorChecker';
import YearMonthSelect from './YearMonthSelect';
import DatePickerNavbar from './Navbar';
import DayPickerCustomInput from './Input';

const StyledOverlay = styled.div`
  width: auto;
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: right;
  animation-name: fadeIn;
  animation-duration: 0.2s;
  outline: none;
  background-color: transparent;

  @keyframse fadeIn {
    0% {opacity: 0};
    100% {opacity: 1}
  }

  transition: all .2s ease-in-out;
  * {
    transition: all .2s ease-in-out;
  }

  button {
    &.DayPicker-TodayButton {
      color: ${colors.primary};
      font-weight:  ${({ theme }) => theme.fonts.weight.bold};
      &:focus {
        outline: none ;
      }
    }
  }
 
  div {
    &.DayPicker {
      cursor: default;
      position: absolute;
      border-radius: 0;
      left: 0;
      z-index: 2;
      background-color: ${hexToRgba(colors.greyInput, 0.90)};

      .DayPicker-Weekdays {
        .DayPicker-Weekday {
          color: ${colors.darkGrey};
          font-weight:  ${({ theme }) => theme.fonts.weight.semiBold};
        }
      }
    };

    &.DayPicker-wrapper {
      outline: none;
      padding-bottom: 3em;

      &:focus {
        outline: none ;}
      };

      .DayPicker-Months {
        .DayPicker-Month {
          margin-top: 0;
        }
      }

      .DayPicker-NavBar {
        cursor: default;
      }

      &.DayPicker-Footer {
        text-align: center;
      };

      &.DayPicker-Day {
        min-width: 2.5em;
        height: 2.5em;
        &:hover {
          background-color: ${({ theme }) => theme.colors.grey} !important;
        };
        &--selected {
          &:not(.DayPicker-Day--disabled) {
            &:not(.DayPicker-Day--outside) {
              background-color: ${colors.primary};
            }
          }
        };
        &--today{
          color: ${colors.primary};
        }
        &:focus {
          background-color: ${colors.primary};
          color: ${({ theme }) => theme.colors.white};
        }
        &--disabled {
          color: ${colors.grey};

          &:hover, &:focus {
            color: ${colors.grey};
            background-color: transparent !important;
          }
        }
      }
    }

  span {
    &.DayPicker-NavButton {
      &:focus {
        outline: none ;
      }
    }
  }
`;

// Some utility constants to show the available months in the picker.
const currentYear = new Date().getFullYear();
const currentMonth = new Date();
const fromMonthDefault = new Date(1920, 0);
const toMonthDefault = new Date(currentYear + 10, 12);

/**
 * A date picker component.
 * @param {*} param0
 */
const DatePicker = ({
  onChange,
  required,
  label,
  onBlur,
  locale,
  placeholder,
  intlPlaceholder,
  initialSelectedMonth = currentMonth.getMonth(),
  selectedDate,
  dateFormat = 'DD/MM/YYYY',
  id,
  disabled,
  name,
  error,
  emTooltipWidth,
  pickerBgColor,
  disabledDays,
  fromMonth = fromMonthDefault,
  toMonth = toMonthDefault,
  color,
  hoverColor,
  marginTooltip,
  positionTooltip = 'bottom',
}) => {
  // The locale (italian is used as default).
  const currentLocale = locale || 'it';

  // The current month index.
  const currentMonthIndex = initialSelectedMonth;

  // A state storing the selected month.
  const [selectedMonth, setSelectedMonth] = useState({
    id: currentMonthIndex,
    value: MomentLocaleUtils.getMonths(currentLocale)[currentMonthIndex],
  });

  // A state storing the selected year.
  const [selectedYear, setSelectedYear] = useState({
    id: currentYear,
    value: currentYear,
  });

  // A reference to the day picker instance.
  const dayPickerRef = useRef();
  // A reference to the element wrapping the picker.
  const [containerRef] = useClickOutside(() => dayPickerRef.current.hideDayPicker());

  /**
   * Resets internal picker state when the provided selected date is null.
   */
  useEffect(
    () => {
      if (selectedDate === null && dayPickerRef.current && dayPickerRef.current.setState) {
        dayPickerRef.current.setState({ value: '', typedValue: '' });
      }
    },
    [selectedDate]
  );

  const CaptionElement = ({ date, classNames, localeUtils }) =>
  (
    <YearMonthSelect
      selectedDate={date}
      fromMonth={fromMonth}
      toMonth={toMonth}
      onMonthChange={setSelectedMonth}
      onYearChange={setSelectedYear}
      classNames={classNames}
      locale={currentLocale}
      localeUtils={localeUtils}
    />
  );
  CaptionElement.displayName = 'The caption element';

  /**
   * The configuration props to be provided to the day picker.
   */
  const dayPickerProps = {
    disabledDays,
    showWeekNumbers: false,
    fixedWeeks: true,
    canChangeMonth: true,
    locale: currentLocale,
    localeUtils: MomentLocaleUtils,
    month: new Date(selectedYear.id, selectedMonth.id),
    fromMonth,
    toMonth,
    navbarElement: <DatePickerNavbar />,
    captionElement: CaptionElement,
  };

  const onDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    onChange(selectedDay, input?.value);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '3.5em', letterSpacing: '0.05em' }}>
      <DayPickerInput
        style={{ width: '100%' }}
        onDayChange={onDayChange}
        onDayPickerHide={onBlur}
        value={selectedDate}
        formatDate={formatDate}
        format={dateFormat}
        parseDate={parseDate}
        component={DayPickerCustomInput}
        ref={el => { dayPickerRef.current = el; }}
        inputProps={{
          id,
          name,
          required,
          placeholder: placeholder || dateFormat,
          intlPlaceholder,
          label,
          disabled,
          error,
          color,
          hoverColor,
        }}
        overlayComponent={props => (
          <StyledOverlay
            {...props}
            pickerBgColor={pickerBgColor}
          />
        )}
        dayPickerProps={dayPickerProps}
      />
      {
        error && !isRequiredErrorType(error) ? (
          <TooltipBox
            position={positionTooltip}
            visibility="true"
            value={error}
            posAdjustment="0px"
            margin={marginTooltip}
            emWidth={emTooltipWidth}
          />
        )
          : null
      }
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

const mapStoreToProps = (store) => ({
  locale: store.locale,
});

export default connect(mapStoreToProps)(DatePicker);