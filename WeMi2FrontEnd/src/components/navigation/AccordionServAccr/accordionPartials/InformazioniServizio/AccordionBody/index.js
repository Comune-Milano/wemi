import React from 'react';

import { Row, Column } from 'components/ui/Grid';
import { Categoria, Nome, Identificativo, Descrizione } from './partial';

const InformazioniBody = ({ Form }) => (
  <Row padding="0" fluid display="flex" justifycontent="space-between">
    <Column xs="12" sm="6" md="2">
      <Identificativo Value={Form.idServizio}></Identificativo>
    </Column>
    <Column xs="12" sm="6" md="3">
      <Nome Value={Form.nome}></Nome>
    </Column>
    <Column xs="12" sm="6" md="6">
      <Categoria Value={Form.categoriaAccreditamento}></Categoria>
    </Column>
    <Column xs="12">
      <Descrizione Value={Form.descrizione}></Descrizione>
    </Column>
  </Row>
    );

InformazioniBody.displayName = 'Body informazioni servizio';


export default InformazioniBody;
