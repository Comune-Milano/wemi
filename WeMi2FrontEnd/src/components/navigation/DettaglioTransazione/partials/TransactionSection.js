/** @format */

import React from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { withRouter } from 'react-router-dom';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';

// import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
// import { SendCandidacyRequest } from './graphql/SendCandidacyRequest';

const TransactionSection = React.memo(({
  transactionDetails,
}) => (
  <React.Fragment>
    <Row fluid>
      <Column md="12" sm="12" padding="1.5em 0.5em 1em 1em">
        <Text
          tag="strong"
          size="f6"
          weight="bold"
          color="primary"
          transform="uppercase"
          letterSpacing="0.05em"
          value="Dati della transazione"
        />
      </Column>
      <Column md="4" sm="6" padding="1em">
        <Input
          material
          disabled
          label="Transazione nr"
          name="numeroTransazione"
          inputValue={transactionDetails?.numeroTransazione}
        />
      </Column>
      <Column md="4" sm="6" padding="1em">
        <Input
          material
          disabled
          label="Data utilizzo"
          name="dataUtilizzo"
          inputValue={transactionDetails?.dataUtilizzo}
        />
      </Column>
      <Column md="4" sm="6" padding="1em">
        <Input
          material
          disabled
          label="Data contabilizzazione"
          name="dataContabilizzazione"
          inputValue={transactionDetails?.dataContabilizzazione}
        />
      </Column>
      <Column md="4" sm="6" padding="1em">
        <Input
          material
          disabled
          label="Importo spesa (€)"
          name="importoSpesa"
          inputValue={transactionDetails?.importoSpesa ? moneyFormat(transactionDetails.importoSpesa) : ''}
        />
      </Column>
      <Column md="4" sm="6" padding="1em">
        <Input
          material
          disabled
          label="Data Storno"
          name="dataStorno"
          inputValue={transactionDetails?.dataStorno}
        />
      </Column>
      <Column md="4" sm="6" padding="1em">
        <Input
          material
          disabled
          label="ID richiesta"
          name="idRichiesta"
          inputValue={transactionDetails?.idRichiesta}
        />
      </Column>
    </Row>
    <Row fluid>
      <Column md="8" sm="6" padding="1em">
        <Input
          material
          disabled
          label="Servizio acquistato"
          name="servizioAcquistato"
          inputValue={transactionDetails?.servizioAcquistato}
        />
      </Column>
      <Column md="4" sm="6" padding="1em">
        <Input
          material
          disabled
          label="Presso l'ente"
          name="ente"
          inputValue={transactionDetails?.ente}
        />
      </Column>
    </Row>
  </React.Fragment>
));

TransactionSection.displayName = 'TransactionSection';

export default withRouter(TransactionSection);
