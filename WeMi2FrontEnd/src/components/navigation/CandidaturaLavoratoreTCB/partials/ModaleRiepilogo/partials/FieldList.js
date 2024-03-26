/** @format */

import React, { useState } from 'react';
import styled from "styled-components";
import { colors } from 'theme';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import TextCampoObbligatorio from './TextCampoObbligatorio';

const StyledRow = styled(Row)`
  border-bottom: 1px solid ${props => props.colorBorder};
  padding: 0.2em 0;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
`;

const FieldList = ({
  title,
  array,
  required,
  colorBorder = colors.grey
}) => (
    <StyledRow fluid margin="0" alignitems="flex-start" colorBorder={colorBorder}>
      <Column xs="12" md="5" padding="0 2em 0 0">
        <Text
          value={title}
          size="f7"
          color="black"
          weight="bold"
        />
      </Column>
      <Column xs="12" md="7" padding="0">
        {array && array.length ?
          array.map((el, i) => (
            <React.Fragment key={"list_" + i}>
              {'- '}
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
              <br />
            </React.Fragment>
          ))
          : required ?
            <TextCampoObbligatorio
              value="Campo obbligatorio non ancora compilato"
            />
            :
            <Text
              value="Non indicato"
              size="f7"
              color="grey"
            />
        }
      </Column>
    </StyledRow>
  );

FieldList.displayName = 'FieldList';

export default FieldList;