import React from 'react';
import { Row } from 'components/ui/Grid';
import Loader from 'components/ui2/Loader';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getTransazioniDetail as getTransazioniDetailQ } from '../TransazioniManagement/graphql/graphql';
import VoucherSection from './partials/VoucherSection';
import TransactionSection from './partials/TransactionSection';
import { dataMapperTransactionDetail } from './graphql/dataMappers';


const DettaglioTransazione = (idTransaction) => {
  const [detailTransaction] = useGraphQLRequest(
    undefined,
    getTransazioniDetailQ,
    idTransaction,
    true,
    // create JSON with totalRows and list
    dataMapperTransactionDetail
  );

  return (
    <>
      {
        // loading VoucherList:
        detailTransaction.isLoading || detailTransaction.pristine ?
          <Loader size="4em" margin="auto" overlay />
          : (
            <>
              <Row fluid>
                <VoucherSection voucherDetails={detailTransaction?.data?.voucherDetails} />
              </Row>
              <Row fluid>
                <TransactionSection transactionDetails={detailTransaction?.data?.transactionDetails} />
              </Row>
            </>
          )
      }
    </>
  );
};

DettaglioTransazione.displayName = 'DettaglioTransazione';

export default DettaglioTransazione;
