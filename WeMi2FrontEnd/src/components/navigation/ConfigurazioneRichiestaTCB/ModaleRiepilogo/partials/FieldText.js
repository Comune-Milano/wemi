/** @format */

import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { TextCampoObbligatorio } from '../utils';

const StyledRow = styled(Row)`
  border-bottom: 1px solid ${colors.grey};
  padding: 0.2em 0;
  ${props => props.textarea ? 'min-height: 3em;' : ''}
  @media print {
    break-inside: avoid;
    display: table;
  }
`;

const FieldText = ({
  title,
  value,
  array,
  required,
  textarea,
  valueBold,
  requiredAfterValue,
  requiredAfterValueText = '* Campo obbligatorio non ancora compilato',
}) => (
  <StyledRow
    fluid
    margin="0"
    alignitems="flex-start"
    textarea={textarea}
  >
    <Column xs="12" md="4" padding="0">
      <Text
        value={title}
        size="f7"
        color="black"
        weight="bold"
      />
    </Column>
    <Column xs="12" md="8" padding="0">
      {(value !== undefined && value !== null) ? (
        <>
          <Text
            value={value}
            size="f7"
            color="black"
            weight={valueBold ? 'bold' : null}
            fontStyle={textarea ? 'italic' : null}
            whitespace={textarea ? 'pre-line' : null}
          />
          &nbsp;
          <TextCampoObbligatorio
            value={requiredAfterValue ? requiredAfterValueText : null}
          />
        </>
      )
        : array && array.length ?
          array.map((el, i) => (
            <React.Fragment key={`tx_${i}`}>
              {(i > 0) ? ', ' : null}

              {el.other ?
                parseInt(el.cdDominioTcb) === 0 ? (
                  <>
                    <Text
                      value={el.label}
                      size="f7"
                      color="black"
                    />
                      :
                      &nbsp;
                    {
                      el.error ?
                        <TextCampoObbligatorio
                          value="è obbligatorio specificare"
                        />
                        :
                        <Text
                          value={el.value}
                          size="f7"
                          fontStyle="italic"
                          color="black"
                        />
                    }
                  </>
                )
                  : (
                    <>
                      <Text
                        value={el.label}
                        size="f7"
                        color="black"
                      />
                        (
                      <Text
                        value={el.value}
                        size="f7"
                        fontStyle="italic"
                        color="black"
                      />
                        )
                    </>
                  )
                : (
                  <Text
                    value={el.value}
                    size="f7"
                    color="black"
                  />
                )}
            </React.Fragment>
          ))
          : required ? (
            <TextCampoObbligatorio
              value="Campo obbligatorio non ancora compilato"
            />
          )
            : (
              <Text
                value="Non indicato"
                size="f7"
                color="grey"
              />
            )}
    </Column>
  </StyledRow>
);

FieldText.displayName = 'FieldText';

export default FieldText;