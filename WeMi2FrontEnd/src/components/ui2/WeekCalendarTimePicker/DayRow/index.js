/** @format */

import React, { useState } from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import { colors } from 'theme';
import media from 'utils/media-queries';
import Text from 'components/ui/Text';
import RadioGroup from 'components/ui2/RadioGroup';
import Button from 'components/ui2/Button';
import HourRange from './HourRange';
import HourRangeView from './HourRangeView';
import * as helpers from '../utils/helpers';
import { CheckboxRange } from './CheckboxRange';

const Wrapper = styled.div`
  margin-bottom: 1rem;
  border-top: 1px solid ${colors.darkGrey};
  ${props => props.error ? css`
    border-top: 1px solid ${colors.red};
  ` : ''}
  .row {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    margin-top: 1em
    ${media.md`
      justify-content: space-between;
      flex-direction: row;
    `}
  }
  .column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ${media.md`
      align-items: flex-end;
    `}
  }

  .interval-explanation {
    margin-top: 1rem;
  }

  .add-container {
    margin-top: 0.5rem;
  }
`;

const ALL_DAY = 1;
const DISABLE = 2;

const DayRow = ({
  day,
  sizeLabelDay = 'f6',
  selectedIntervals,
  setSelectedIntervals,
  disabled,
  maxIntervals,
  hideRadio,
  bgColor,
  labelDisabilita = 'Disabilita',
  maxHours,
  calendar,
  error,
  disableTimeSlot,
  labelCheckDefaultTimeSlot,
  defaultInterval,
}) => {
  const radioItems = [
    {
      id: ALL_DAY,
      label: 'Tutto il giorno',
    },
    {
      id: DISABLE,
      label: labelDisabilita,
    },
  ];

  const [openNewInterval, setOpenNewInterval] = useState(false);
  const [radioSelected, setRadioSelected] = useState({});

  React.useEffect(() => {
    setRadioSelected(oldState =>
      helpers.isAllDaySelected(selectedIntervals) ? { id: ALL_DAY } : oldState);
  }, [selectedIntervals]);

  const showButton = !disabled && !openNewInterval && selectedIntervals.length < maxIntervals;
  const showIntervalsSection = (!radioSelected.id || hideRadio) && !disableTimeSlot;
  const handleRadio = (radio) => {
    if (radio.id === ALL_DAY) {
      setSelectedIntervals([{
        start: moment().startOf('day').set('minute', 0),
        end: moment().startOf('day').set('minute', 1440),
      }]);
    } else {
      setSelectedIntervals([]);
      setOpenNewInterval(false);
    }
    setRadioSelected(radio);
  };


  const isIntervalValid = (interval, index) => {
    let invalidStart = null;
    let invalidEnd = null;
    let invalidRange = null;
    const intervalsToCheck = [...selectedIntervals];
    if (index !== null) {
      intervalsToCheck.splice(index, 1);
    }
    for (let i = 0; i < intervalsToCheck.length; i += 1) {
      const startIsBetween = helpers.isBetween(
        interval.start,
        intervalsToCheck[i].start,
        intervalsToCheck[i].end
      );
      const endIsBetween = helpers.isBetween(
        interval.end,
        intervalsToCheck[i].start,
        intervalsToCheck[i].end
      );
      const otherDateBetween = helpers.isBetween(
        intervalsToCheck[i].start,
        interval.start,
        interval.end,
      ) || helpers.isBetween(
        intervalsToCheck[i].end,
        interval.start,
        interval.end,
      ) || (
          helpers.isEqual(interval.start, intervalsToCheck[i].start)
          && helpers.isEqual(interval.end, intervalsToCheck[i].end)
        );

      if (startIsBetween || endIsBetween || otherDateBetween) {
        if (startIsBetween) {
          invalidStart = 'Orario compreso già in altra fascia oraria';
        }
        if (endIsBetween) {
          invalidEnd = 'Orario compreso già in altra fascia oraria';
        }
        if (otherDateBetween) {
          invalidRange = 'Orario già selezionato in altra fascia oraria';
        }
        return [invalidStart, invalidEnd, invalidRange];
      }
    }
    return [invalidStart, invalidEnd, invalidRange];
  };

  const handleSave = (interval, index) => {
    const newIntervals = [...selectedIntervals];
    if (index === null) {
      newIntervals.push(interval);
    } else {
      newIntervals.splice(index, 1, interval);
    }
    setSelectedIntervals(newIntervals);
  };

  const handleRemove = (interval) => {
    const newIntervals = [...selectedIntervals];
    setSelectedIntervals(
      newIntervals.filter((el) => (
        !(el.start.format('HH:mm') === interval.start.format('HH:mm')
          && el.end.format('HH:mm') === interval.end.format('HH:mm'))
      ))
);
  };

  return (
    <Wrapper
      error={error}
    >
      <div
        className="row"
      >
        <Text
          tag="p"
          weight="bold"
          size={sizeLabelDay}
          value={day}
          transform="uppercase"
          letterSpacing="0.05em"
          padding="0 0 .5em"
        />
      </div>
      <div
        className="row"
      >
        <div
          className="column"
        >
          {
            !hideRadio ?
              (
                <RadioGroup
                  radioItems={radioItems}
                  selectedItem={radioSelected}
                  disabled={disabled}
                  onChange={handleRadio}
                  fontSize="f7"
                  checkcolor="primary"
                  display="inline-grid"
                />
              )
              : null
          }
        </div>
        {
          showIntervalsSection ?
            (
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
                          key={el.start.format('HH:mm') + el.end.format('HH:mm')}
                          range={el}
                          remove={() => handleRemove(el)}
                          disabled={disabled}
                          day={day}
                        />
                      ))
                  }
                </div>
                <div
                  className="column add-container"
                >
                  {
                    showIntervalsSection && showButton ?
                      (
                        <Button
                          onClick={() => setOpenNewInterval(true)}
                          label="Aggiungi fascia oraria"
                          autowidth
                          disabled={disabled}
                        />
                      )
                      : null
                  }
                  {
                    showIntervalsSection && openNewInterval ?
                      (
                        <>
                          <HourRange
                            isValid={(interval) => isIntervalValid(interval, null)}
                            save={(interval) => {
                              handleSave(interval, null);
                              setOpenNewInterval(false);
                            }}
                            disabled={disabled}
                            bgColor={bgColor}
                            maxHours={maxHours}
                            calendar={calendar}
                            day={day}
                          />
                        </>
                      )
                      : null
                  }
                </div>
              </div>
            )
            : null
        }
        {
          disableTimeSlot ? (
            <CheckboxRange
              error={error}
              disabled={disabled}
              disableTimeSlot={disableTimeSlot}
              labelCheckDefaultTimeSlot={labelCheckDefaultTimeSlot}
              defaultInterval={defaultInterval}
              selectedIntervals={selectedIntervals}
              setSelectedIntervals={setSelectedIntervals}
              calendar={calendar}
              maxHours={maxHours}
              day={day.toUpperCase()}
            />
          ) : null
        }
      </div>
    </Wrapper>
  );
};

DayRow.displayName = 'DayRow';
export default DayRow;
