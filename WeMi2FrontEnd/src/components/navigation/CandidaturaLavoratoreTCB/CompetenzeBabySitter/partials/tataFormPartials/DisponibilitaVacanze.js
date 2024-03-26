/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { FieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import Checkbox from 'components/ui2/Checkbox';
import { StyledRow } from '../TataForm';


const DisponibilitaVacanze = ({ mansioniVacanze, mansioniSelezionate, setFormField, getMansioniTata, locale }) => (
  <Row fluid margin="0 0 2em">
    <Column xs="12" padding="0" justifycontent="space-between">
      <FieldTitle
        label="Accompagnamento in vacanza"
      />
    </Column>
    <Column xs="12" padding="0" justifycontent="space-between">
      <StyledRow fluid justifycontent="flex-start" padding=".5em 0 1em">
        {
          mansioniVacanze.map(mans => (
            <Row
              fluid
              key={mans.cdDominioTcb}

            >
              <Checkbox
                key={mans.cdDominioTcb}
                width="fit-content"
                value={mansioniSelezionate.find(el => el.idMans === mans.cdDominioTcb)}
                checkcolor="primary"
                label={mans.cdDominioTcb === 12 ? 'Con i bambini' : mans.cdDominioTcb === 13 ? 'Con la famiglia'
                : mans.tlValoreTestuale[locale]}
                fontSize="f7"
                onChange={() => { setFormField('mansioniSelezionateTata', getMansioniTata(null, mans.cdDominioTcb)); }}
              />
            </Row>
          ))
        }
      </StyledRow>
    </Column>

  </Row>
);

DisponibilitaVacanze.displayName = 'DisponibilitaVacanze';

export default DisponibilitaVacanze;
