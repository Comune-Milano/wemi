
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import { Row, Column } from 'components/ui/Grid';
import Select from 'components/ui2/Select';

const StyledRow = styled(Row)`
  border-bottom: 1px solid ${colors.darkGrey};
`;

const StyledSelect = styled(Select)`
  button {
    div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const currentYear = new Date().getFullYear();


const toYear = new Date(currentYear + 10, 11);

/**
 * Allows to select a year/month in the date picker.
 * @param {*} param0
 */
const YearMonthSelect = ({
  selectedDate,
  classNames,
  onMonthChange,
  onYearChange,
  localeUtils,
  locale,
  fromMonth,
  toMonth,
}) => {
  const fromYear = fromMonth || new Date(1920, 0);
  /**
   * Gets the list of available months.
   * We use a memoized version because the returned value
   * of this callback changes only when locale mutates.
   */
  const getMonthOptions = useCallback(
    () => {
      let months = [];

      if (fromMonth.getFullYear() === selectedDate.getFullYear()) {
        months = localeUtils.getMonths(locale).slice(fromMonth.getMonth());
      } else if (toMonth.getFullYear() === selectedDate.getFullYear()) {
        months = localeUtils.getMonths(locale).slice(0, toMonth.getMonth());
      } else {
        months = localeUtils.getMonths(locale);
      }
      return months.map((month, index) => ({ id: index, value: month }));
    },
    [locale, selectedDate]
  );

  /**
   * Gets the list of available years.
   * We use a memoized version because the returned value
   * of this callback does not changes.
   */
  const getYears = useCallback(
    () => {
      const years = [];
      for (let year = fromYear.getFullYear(); year <= toYear.getFullYear(); year += 1) {
        years.push({
          id: year,
          value: year,
        });
      }
      return years;
    },
    []
  );

  /**
   * The set of available months.
   */
  const monthOptions = getMonthOptions();

  // The selected month.
  const selectedMonth = selectedDate.getMonth();
  // The selected year.
  const selectedYear = selectedDate.getFullYear();

  return (
    <div className={classNames.caption}>
      <StyledRow
        fluid
        margin="0"
      >
        <Column
          xs="7"
          padding="0"
        >
          <StyledSelect
            name="month"
            hideBorder
            textAlign="right"
            bgColor="white"
            capitalizeFirst
            items={monthOptions}
            selectedValue={monthOptions[selectedMonth]}
            clickedItem={onMonthChange}
            selectedOptAutofocus
          />
        </Column>
        <Column
          xs="5"
          padding="0"
        >
          <StyledSelect
            name="year"
            hideBorder
            bgColor="white"
            textAlign="right"
            items={getYears()}
            selectedValue={{ id: selectedYear, value: selectedYear }}
            clickedItem={onYearChange}
            selectedOptAutofocus
          />
        </Column>
      </StyledRow>
    </div>
  );
};

YearMonthSelect.displayName = 'YearMonthSelect';

export default YearMonthSelect;
