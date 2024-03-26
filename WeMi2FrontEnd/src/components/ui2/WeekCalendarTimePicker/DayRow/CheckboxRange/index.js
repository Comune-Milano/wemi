import React from 'react';
import Checkbox from 'components/ui2/Checkbox';
import Tooltip from 'components/ui2/Tooltip';
import styled from 'styled-components';
import * as helpers from '../../utils/helpers';
import HourRangeView from '../HourRangeView';

const CheckboxContainer = styled.span`
  width: 100%;
`;

const CheckboxRangeComponent = ({
  labelCheckDefaultTimeSlot,
  selectedIntervals,
  defaultInterval,
  setSelectedIntervals,
  disabled,
  day,
  error = {},
}) => {
  const hasErrors = (error.end || error.range);
  const isSelected = selectedIntervals.length > 0;
  const isRightDayError = error.lastInteractedWith === day;
  const isVisible = hasErrors && isSelected && isRightDayError;
  return (
    <div className="row">
      <CheckboxContainer>
        <Tooltip
          fluid
          position="bottom"
          color="white"
          visibility={isVisible}
          bgcolor="red"
          posAdjustment="0"
          preventOnHover={isRightDayError ? (!error.end && !error.range) : true}
          value={isRightDayError ? (error.end || error.range) : undefined}
        >
          <Checkbox
            checkcolor={!(isRightDayError) ? 'primary' : 'red'}
            label={labelCheckDefaultTimeSlot}
            value={isSelected}
            onChange={() => {
              if (!(isSelected)) {
                setSelectedIntervals([defaultInterval]);
              } else {
                setSelectedIntervals([]);
              }
            }}
            disabled={disabled}
            width="fit-content"
          />
        </Tooltip>
      </CheckboxContainer>
      <div
        className="column"
      >
        <div
          className="intervals-container"
        >
          {
            selectedIntervals
              .sort((a, b) => helpers.sortDate(a.start, b.start))
              .map((el) => (
                <HourRangeView
                  key={el.start?.format('HH:mm') + el.end?.format('HH:mm')}
                  range={el}
                  disabled
                  day={day}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
};

CheckboxRangeComponent.displayName = 'Check Range component';

export const CheckboxRange = CheckboxRangeComponent;
