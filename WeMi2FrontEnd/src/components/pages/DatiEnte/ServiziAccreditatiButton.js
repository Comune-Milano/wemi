/** @format */

import React from 'react';
import MultiSelect from 'components/ui/MultiSelect';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import styled from 'styled-components';

const BtnAnnulla = styled(Button)`
  background: white;
  min-width: 122px;
  max-width:144px;
  color: black;
  border-color: #707070;
  &:hover {
    background: none;
    border-color: #0099ab;
    color: black;
  }
`;
const BtnSalva = styled(Button)`
  width: 9rem;
`;

const MyColumn = styled(Column)`
display:flex;
justify-content:flex-end;
`;

const itemServizi = [
  { value: 'Servizio 1', label: 'Servizio 1', id: 1 },
  { value: 'Servizio 2', label: 'Servizio 2', id: 2 },
  { value: 'Servizio 3', label: 'Servizio 3', id: 3 },
];

const ServiziAccreditatiButton = () => (
  <div>
    <Text position="fixed" size="f4" value="Seleziona Servizi" />

    <Row division={12}>
      <Column xs={12}>
        <MultiSelect
          material
          name="Servizi Accreditati"
          items={itemServizi}
          intlFormatter
          intlPlaceholder="Servizi"
        />
      </Column>
    </Row>

    <Row>
      <MyColumn lg="6" md="6" sm="6" xs="6">
        <BtnAnnulla value="Annulla" />
      </MyColumn>
      <Column lg="6" md="6" sm="6" xs="6">
        <BtnSalva value="Conferma" />
      </Column>
    </Row>
  </div>
  );

ServiziAccreditatiButton.displayName = 'ServiziAccreditatiButton';

export default ServiziAccreditatiButton;
