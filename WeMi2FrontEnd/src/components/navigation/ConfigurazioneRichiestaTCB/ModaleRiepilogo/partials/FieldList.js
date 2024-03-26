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
`;

const FieldList = ({
  title,
  array,
  required,
  calendarioEliminaParentesi,
}) => (
  <StyledRow className="fieldList" fluid margin="0" alignitems="flex-start">
    <Column xs="12" md="4" padding="0">
      <Text
        value={title}
        size="f7"
        color="black"
        weight="bold"
      />
    </Column>
    <Column xs="12" md="8" padding="0">
      {array && array.length ?
        array.map((el, i) => (
          <React.Fragment key={`list_${i}`}>
            {'- '}
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
                    { !calendarioEliminaParentesi ?
                      <> : </>
                      : null
                    }
                    &nbsp;
                    <Text
                      value={el.value}
                      size="f7"
                      fontStyle="italic"
                      color="black"
                    />
                  &nbsp;
                    { !calendarioEliminaParentesi ?
                      <>  </>
                      : null
                    }
                  </>
                )
              : (
                <Text
                  value={el.value}
                  size="f7"
                  color="black"
                />
              )}
            <br />
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

FieldList.displayName = 'FieldList';

export default FieldList;
