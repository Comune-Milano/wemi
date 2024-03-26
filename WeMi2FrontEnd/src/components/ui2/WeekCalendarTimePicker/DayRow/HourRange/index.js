import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import media from 'utils/media-queries';
import Select from 'components/ui2/Select';
import Tooltip from 'components/ui2/Tooltip';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui2/FaIcon';
import { Row } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { countMinutes } from '../../utils/functions';
import { selectHourItems } from '../../utils/constants';

export const SelectContainer = styled.span`
  width: 100%;

  ${media.md`
    width: 100px;
  `}
`;

const IconRemoveContainer = styled.div`
  & i:hover {
    transform: scale(1.7);
  }
`;

const HourRangeRow = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: left;

  .add-button {
    margin-bottom: 0.5rem;
  }

  ${media.md`
    width: auto;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    .add-button {
    margin-bottom: 0;
  }
  `}
`;

const ConfirmRangeRow = styled(Row)`
  padding: 1em 0 0 0;
  justify-content: flex-start;

  ${media.md`
    padding: 1em 0 1em 1em;
    justify-content: flex-end;
  `}
`;

const createValueStart = (start, end) => (
  {
    id: (start.hour() * 60) + start.minute(),
    value: end && start.dayOfYear() > end.dayOfYear() ? '24:00' : start.format('HH:mm'),
  }
);

const createValueEnd = (end, start) => (
  {
    id: (end.hour() * 60) + end.minute(),
    value: start && end.dayOfYear() > start.dayOfYear() ? '24:00' : end.format('HH:mm'),
  }
);

const StyledText = styled(Text)`
 ${media.md`
    margin: 0 0.5rem;
  `}
`;

const HourRange = ({
  range = {},
  isValid,
  disabled,
  save,
  labelHourRange = 'Conferma la fascia oraria',
  remove,
  onlyDisplay,
  bgColor,
  maxHours,
  calendar,
  day,
}) => {
  const [touched, setTouched] = React.useState({});
  const [start, setStart] = React.useState(range.start);
  const [end, setEnd] = React.useState(range.end);

  const [errors, setErrors] = React.useState({});

  const handleStartClick = (value) => {
    const time = moment().startOf('day').set('minute', value.id);
    setStart(time);
    let errors = {};
    if (touched.start && end) {
      errors = checkErrors(time, end);
    }
    setTouched(old => ({ ...old, start: true }));
    setErrors(errors);
  };

  const handleEndClick = (value) => {
    const time = moment().startOf('day').set('minute', value.id);
    setEnd(time);
    let errors = {};
    if (touched.end && start) {
      errors = checkErrors(start, time);
    }
    setTouched(old => ({ ...old, end: true }));
    setErrors(errors);
  };

  const checkErrors = (startTime, endTime) => {
    const [startError, endError, rangeError] = isValid({
      start: startTime,
      end: endTime,
    });

    let errors = {
      start: startError,
      end: endError,
      range: rangeError,
    };
    if (!startTime.isBefore(endTime) || startError || endError || rangeError) {
      if (endTime.isSameOrBefore(startTime)) {
        errors = {
          end: "L'orario di fine non può essere precedente all'orario di inizio",
        };
      }
    } else {
      const newIntervals = { [day]: [{ start: startTime, end: endTime }] };
      const newObj = {
        ...calendar,
        ...newIntervals,
      };
      const selectedHours = countMinutes(newObj);

      if (!maxHours) {
        // se non abbiamo il massimo ore
        errors = {
          start: startError,
          end: endError,
          range: rangeError,
        };
      } else if (selectedHours > maxHours) {
        // controlliamo se le ora selezionate sono <= di maxHours
        errors = {
          end: 'Le ore inserite superano quelle massime',
        };
      }
    }
    return errors;
  };

  const labelButtonError = "Fascia oraria non valida";

  const handleSave = () => {
    if (end && start) {
      saveData(start, end);
    } else {
      const errors = {};
      if (!end) {
        errors.end = 'Selezionare un valore';
      }
      if (!start) {
        errors.start = 'Selezionare un valore';
      }
      setErrors(errors);
    }
  };

  const saveData = (startTime, endTime) => {
    const { start, end, range } = checkErrors(startTime, endTime);
    if (start || end || range) {
      setErrors({
        start,
        end,
        range,
      });
    } else {
      save({
        start: startTime,
        end: endTime,
      });
    }
  };

  return (
    <>
      <HourRangeRow>
        {
          remove && !disabled ?
            (
              <IconRemoveContainer>
                <FaIcon
                  icon="minus"
                  fontSize="f7"
                  color="red"
                  onClick={remove}
                />
              </IconRemoveContainer>
            )
            : null
        }
        <StyledText value="Disponibile dalle" size="f6" color="darkGrey" />
        <SelectContainer>
          <Tooltip
            fluid
            position="bottom"
            color="white"
            bgcolor="red"
            posAdjustment="20%"
            preventOnHover={!errors.start && !errors.range}
            value={errors.start || errors.range}
          >
            <Select
              name={start ? `Orario selezionato ${createValueStart(start, end)?.value}` : "Seleziona orario dalle"}
              placeholder="ore"
              maxWidth="100px"
              error={errors.start || errors.range}
              items={selectHourItems}
              selectedValue={start ? createValueStart(start, end) : null}
              clickedItem={handleStartClick}
              disabled={disabled || onlyDisplay}
              bgColor={bgColor}
            />
          </Tooltip>
        </SelectContainer>
        <StyledText value="alle" size="f6" color="darkGrey" />
        <SelectContainer>
          <Tooltip
            fluid
            position="bottom"
            color="white"
            bgcolor="red"
            posAdjustment="20%"
            preventOnHover={!errors.end && !errors.range}
            value={errors.end || errors.range}
          >
            <Select
              name={end ? `Orario selezionato ${createValueEnd(end, start)?.value}` : "Seleziona orario alle"}
              placeholder="ore"
              maxWidth="150px"
              error={errors.end || errors.range}
              items={selectHourItems}
              selectedValue={end ? createValueEnd(end, start) : null}
              clickedItem={handleEndClick}
              disabled={disabled || onlyDisplay}
              bgColor={bgColor}
            />
          </Tooltip>
        </SelectContainer>
      </HourRangeRow>
      {
        !onlyDisplay && !disabled ?
          (
            <ConfirmRangeRow fluid xs="12" sm="12" md="5" lg="5" xl="5">
              <Button
                color="primary"
                onClick={handleSave}
                label={labelHourRange}
                autowidth
                ariaLabel={(errors.end || errors.range || errors.start) ? labelButtonError : labelHourRange}
              />
            </ConfirmRangeRow>
          )
          : null
      }
    </>
  );
};

HourRange.displayName = 'Hour range';

export default HourRange;
