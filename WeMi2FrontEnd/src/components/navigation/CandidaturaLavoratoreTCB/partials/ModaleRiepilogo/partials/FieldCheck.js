/** @format */

import React from 'react';
import styled from "styled-components";
import { colors } from 'theme';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui2/FaIcon';
import AccessibilityReadingFaIcon from 'components/ui2/FaIcon/AccessibilityReadingFaIcon';
import { Row } from 'components/ui/Grid';
import TextCampoObbligatorio from './TextCampoObbligatorio';

const StyledRow = styled(Row)`
  border-bottom: 1px solid ${props => props.colorBorder};
  padding: 0.2em 0;

  div.icon {
    flex-shrink: 0;
    width: 2em;
    text-align: left;
  }
  div.text {
    flex-grow: 1;
  }
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
`;

const FieldCheck = ({
  title,
  checked,
  note,
  colorBorder = colors.grey,
  required,
  requiredNote
}) => {

  const checkedVal = checked === true || parseInt(checked, 10) === 1;
  return (
    <StyledRow fluid margin="0" alignitems="flex-start" flexwrap="nowrap" colorBorder={colorBorder}>
      <div className="icon">
        {
          checkedVal ?
            null
            : <AccessibilityReadingFaIcon text="la seguente voce non è selezionata:" />
        }
        <FaIcon
          fontSize="f8"
          padding="0.4em 1.5em 0 0"
          role="checkbox"
          aria-checked={checkedVal}
          icon={checkedVal ? 'check' : 'times'}
          color={checkedVal ? 'primary' : 'red'}
        />
      </div>
      <div className="text">
        <Text
          value={title}
          tag="span"
          size="f7"
          color="black"
          weight={checkedVal ? 'bold' : 'normal'}
        />
        {note ?
          <Text
            value={note}
            tag="div"
            size="f7"
            color="black"
            fontStyle="italic"
            weight="normal"
          />
          : null
        }
        {
          requiredNote && !note && checkedVal ?
            (
              <>
                &nbsp;
                <TextCampoObbligatorio
                  value="è obbligatorio specificare"
                />
              </>
            )
            : null
        }
        {
          required && !checkedVal ?
            (
              <>
                &nbsp;
                <TextCampoObbligatorio
                  value="Campo obbligatorio non ancora compilato"
                />
              </>
            )
            : null
        }
      </div>
    </StyledRow>
  );
};

FieldCheck.displayName = 'FieldCheck';

export default FieldCheck;