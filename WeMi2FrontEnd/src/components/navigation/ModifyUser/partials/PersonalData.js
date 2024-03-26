import React from 'react';
import { Row } from 'components/ui/Grid';
import TextData from './TextData';

const PersonalData = React.memo(({
  data = {},
}) => (
  <Row fluid margin="0 0 3em 0">
    <TextData
      title="Nome"
      value={data.nome || '-'}
    />
    <TextData
      title="Cognome"
      value={data.cognome || '-'}
    />
    <TextData
      title="E-mail"
      value={data.email || '-'}
    />
    <TextData
      title="Id utente"
      value={data.idUtente || '-'}
    />
    <TextData
      title="Codice profilo"
      value={data.codiceProfilo || '-'}
    />
    <TextData
      title="Descrizione profilo"
      value={data.descProfilo || '-'}
    />
    <TextData
      title="Utente ultima modifica"
      value={data.usernameUltimaMod || '-'}
    />
    <TextData
      title="Data ultima modifica"
      value={data.dataUltimaMod || '-'}
    />
  </Row>
  ));

PersonalData.displayName = 'ModificaUtenzaNavigation - PersonalData';

export default PersonalData;
