/** @format */

import React from 'react';
import styled from "styled-components";
import { colors } from 'theme';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui2/FaIcon';
import AccessibilityReadingFaIcon from 'components/ui2/FaIcon/AccessibilityReadingFaIcon';
import { Row } from 'components/ui/Grid';

const StyledRow = styled(Row)`
  border-bottom: 1px solid ${colors.grey};
  padding: 0.2em 0;

  div.icon {
    flex-shrink: 0;
    width: 2em;
    text-align: left;
    display: inline-block;
  }
  div.text {
    flex-grow: 1;
    display: inline-block;
  }
  @media print {
    break-inside: avoid;
    overflow: hidden;
    display: inline-block;
  }
`;

const FieldCheck = ({
  title,
  checked,
  note,
}) => {
  const checkedVal = checked === true || parseInt(checked, 10) === 1;
  return (
    <StyledRow className="fieldCheck" fluid margin="0" alignitems="flex-start" flexwrap="nowrap">
      <div className="icon">
        {
          checkedVal ?
            null
            : <AccessibilityReadingFaIcon text="la seguente voce non è selezionata:" />
        }
        <FaIcon
          fontSize="f8"
          padding="0.4em 1.5em 0 0"
          ariaHidden="false"
          icon={checkedVal ? 'check' : 'times'}
          color={checkedVal ? 'primary' : 'red'}
        />
      </div>
      <div className="text">
        <Text
          value={title}
          tag="div"
          size="f7"
          color="black"
          weight={checkedVal ? 'bold' : 'normal'}
        />
        {note && (
          <Text
            value={note}
            tag="div"
            size="f7"
            color="black"
            fontStyle="italic"
            weight="normal"
          />
        )}
      </div>
    </StyledRow>
  );
};

FieldCheck.displayName = 'FieldCheck';

export default FieldCheck;
