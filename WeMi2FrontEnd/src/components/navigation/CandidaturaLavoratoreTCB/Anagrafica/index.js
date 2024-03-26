/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import { Form } from 'libs/Form/components/Form';
import { StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { FormAnagrafica } from './partials';
import {
  estraiValAttributiUtente as estraiValAttributiUtenteQ,
} from './AnagraficaGraphql';
import { codiciAttributoAnagrafica } from './partials/utils/codiciAttributoAnagrafica';
import { getInitialDataset } from './partials/utils/initialDataset';
import { formValidationSchema } from './partials/utils/validationSchema';
import { FadeInWrapper } from '../partials/FadeInWrapper';

const Anagrafica = ({
  idOperatore,
  userInfo,
  changeStep,
  moveToNextStep,
  locale,
  stepCandidate,
}) => {
  /**
   *  Estraggo dati eventualmente già inseriti su DB
   */
  const [dbAnagrafica] = useGraphQLRequest(
    undefined,
    estraiValAttributiUtenteQ,
    {
      idUtente: userInfo.idLavoratore,
      arrayCdAttr: codiciAttributoAnagrafica,
    },
    true
  );

  const loaded = !dbAnagrafica.isLoading &&
    !dbAnagrafica.pristine;
  /** Definisco il mio dataset iniziale utilizzando potenzialmente i dati da DB
  */
  const initialDataset = loaded && getInitialDataset(dbAnagrafica.data, userInfo);

  return (
    <FadeInWrapper fluid>
      <StepTitle title="Dati anagrafici" />
      <Row fluid>
        {loaded ?
          (
            <Form
              validateOnChange
              initialDataset={initialDataset}
              validationSchema={formValidationSchema}
            >
              <FormAnagrafica
                idOperatore={idOperatore}
                userInfo={userInfo}
                changeStep={changeStep}
                moveToNextStep={moveToNextStep}
                locale={locale}
                stepCandidate={stepCandidate}
              />
            </Form>
          ) : null}
      </Row>
    </FadeInWrapper>
  );
};

Anagrafica.displayName = 'Anagrafica';

export default Anagrafica;
