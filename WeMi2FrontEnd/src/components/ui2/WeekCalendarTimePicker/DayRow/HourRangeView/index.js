import React from 'react';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconRemoveContainer = styled.div`
  & i:hover, & i:active, & i:focus {
    transform: scale(1.7);
  },
`;

const createValueStart = (start, end) => (
  {
    id: (start?.hour() * 60) + start?.minute(),
    value: end && start.dayOfYear() > end.dayOfYear() ? '24:00' : start?.format('HH:mm'),
  }
);

const createValueEnd = (end, start) => (
  {
    id: (end?.hour() * 60) + end?.minute(),
    value: start && end.dayOfYear() > start.dayOfYear() ? '24:00' : end?.format('HH:mm'),
  }
);

const HourRangeView = ({
  range = {},
  remove,
  disabled,
  day,
}) => {
  const start = createValueStart(range.start, range.end).value;
  const end = createValueEnd(range.end, range.start).value;

  const startLabel = (start === '00:30') ? 'mezzanotte e 30' : (start === '00:00') ? 'mezzanotte' : start; // NVDA legge erroneamente "00:30" 

  return (
    <Row>
      <Text value="Dalle" size="f6" color="darkGrey" margin="0 0.5rem 0 0" />
      <Text value={start} size="f6" color="darkGrey" margin="0 0.5rem 0 0" />
      <Text value="alle" size="f6" color="darkGrey" margin="0 0.5rem 0 0" />
      <Text value={end} size="f6" color="darkGrey" margin="0 0.5rem 0 0" />

      {
        !disabled ?
          (
            <IconRemoveContainer>
              <ButtonIcon
                fontSize="f7"
                noBorder
                noHover
                color="red"
                icon="minus"
                label={`elimina orario ${day} dalle ${startLabel} alle ${end}`}
                onClick={remove}
              />
            </IconRemoveContainer>
          )
          : null
      }
    </Row>
  );
};

HourRangeView.displayName = 'Hour range';

export default HourRangeView;