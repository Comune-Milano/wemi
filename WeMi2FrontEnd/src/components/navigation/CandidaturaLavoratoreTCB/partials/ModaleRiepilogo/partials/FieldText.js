/** @format */

import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import TextCampoObbligatorio from './TextCampoObbligatorio';

const StyledRow = styled(Row)`
  border-bottom: 1px solid ${props => props.colorBorder};
  padding: 0.2em 0;
  ${props => props.textarea ? 'min-height: 3em;' : ''}
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
`;

const FieldText = ({
  title,
  value,
  array,
  required,
  textarea,
  colorBorder = colors.grey,
  error,
}) => (
  <StyledRow
    fluid
    margin="0"
    alignitems="flex-start"
    textarea={textarea}
    colorBorder={colorBorder}
  >
    <Column xs="12" md="5" padding="0 2em 0 0">
      <Text
        value={title}
        size="f7"
        color="black"
        weight="bold"
      />
    </Column>
    <Column xs="12" md="7" padding="0">
      {(value !== undefined && value !== null) ? (
        <>
          <Text
            value={value}
            size="f7"
            color={"black"}
            fontStyle={textarea ? 'italic' : null}
            whitespace={textarea ? 'pre-line' : null}
          />
          &nbsp;
          <Text
            value={error}
            size="f7"
            color={error ? "red" : "black"}
            fontStyle={error ? 'italic' : null}
          />
        </>
        )
          : array && array.length ?
            array.map((el, i) => (
              <React.Fragment key={`tx_${i}`}>
                {(i > 0) ? ', ' : null}
                <>
                  <Text
                    value={el.label}
                    size="f7"
                    color="black"
                  />
                  {
                    el.error ?
                      (
                        <>
                          <Text
                            value=":"
                            size="f7"
                            color="black"
                          />
                          &nbsp;
                          <TextCampoObbligatorio
                            value="è obbligatorio specificare"
                          />
                        </>
                      )
                      :
                      el.nota && (
                        <>
                          <Text
                            value=":"
                            size="f7"
                            color="black"
                          />
                          &nbsp;
                          <Text
                            value={el.nota}
                            size="f7"
                            fontStyle="italic"
                            color="black"
                          />
                        </>
                      )
                  }
                </>
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
