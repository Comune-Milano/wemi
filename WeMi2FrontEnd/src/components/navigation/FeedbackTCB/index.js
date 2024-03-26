/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'libs/Form/components/Form';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import { FEEDBACK_WEMI_RILASCIATO } from 'types/stati-richieste/feedback';
import Wrapper from './partials/Wrapper';
import { FormRecensioneTcb } from './partials/FormRecensioneTCB';
import {
  EstraiRecensioneTCB as EstraiRecensioneTCBQ,
} from './graphql/estrairecensioneTCB';
import { mapRecensione } from './util/mapperRecensione';


const FeedbackTCB = ({
  datiLogin,
  isAdmin,
  idRichiesta,
}) => {
  const [recensione, getRecensione] = useGraphQLRequest(
    undefined,
    EstraiRecensioneTCBQ,
    { id_rich_serv_rec: idRichiesta },
    true,
    (response) => mapRecensione(response)
  );

  const initialDataset = {

  };

  const validationSchema = {

  };

  const dataReady = !recensione.isLoading && !recensione.errored && !recensione.pristine;

  const dataErrored = !recensione.isLoading && recensione.errored && !recensione.pristine;

  if (dataErrored) {
    return null;
  }

  return (
    <Wrapper fluid>
      <Form
        validationSchema={validationSchema}
        initialDataset={initialDataset}
        validateOnBlur
      >
        {dataReady ? (
          <FormRecensioneTcb
            isAdmin={isAdmin}
            datiLogin={datiLogin}
            isRilasciato={recensione.data.statoRecensione === FEEDBACK_WEMI_RILASCIATO}
            idRichiesta={idRichiesta}
            recensione={recensione.data}
            getRecensione={getRecensione}
          />
        ) : <Loader />}
      </Form>
    </Wrapper>
  );
};
const mapDispatchToProps = ({
});
const mapStoreToProps = store => ({
  locale: store.locale,
});

FeedbackTCB.displayName = 'FeedbackTCB';
export default connect(mapStoreToProps, mapDispatchToProps)(FeedbackTCB);
