/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui/Button';


const PagamentoButtons = () => (
  <Row fluid justifycontent="space-between" margin="20px 0">
    <Column padding="0 5px 0 0" xs="6" md="4"> 
      <Button fontSize="f8" value="Annulla pagamento" onClick={()=>window.history.go(-1)}/>
    </Column>
    <Column padding="0" xs="6" md="4">

      <Button type="primary" fontSize="f8" value="Conferma pagamento" />

    </Column>
  </Row>
);

PagamentoButtons.displayName = 'PagamentoButtons';
export default PagamentoButtons;
