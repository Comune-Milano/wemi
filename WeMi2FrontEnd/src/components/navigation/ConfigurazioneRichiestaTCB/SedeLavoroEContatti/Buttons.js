/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import BottoniNavigazione from 'components/navigation/ConfigurazioneRichiestaTCB/partials/BottoniNavigazione';
import { Row } from 'components/ui/Grid';
import { useDepChange } from 'hooks/useDepChange';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import arrayConfigurazone from './partials/arrayConfigurazione';
import {
  inserisciModificaDatiRichiesta008 as inserisciModificaDatiRichiesta008Q,
} from './partials/graphQLTCBIRI008';

const Buttons = ({
  dataset,
  idRichiestaTcb,
  openSummary,
  moveBack,
  isFormDirty,
  stepDomanda,
  changeStep,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const { validateForm, errors } = useFormContext();
  const [, inserisciDati] = useGraphQLRequest(
    undefined,
    inserisciModificaDatiRichiesta008Q,
  );

  const Salva = async () => {
    inserisciDati({ input: { idRichiestaTcb, arrayConfig: arrayConfigurazone(dataset, errors) } });
  };

/**
* Gets the callback trigger the saving of step-related data.
*/
  const getSaveDataCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }
    return async () => {
      Salva();
    };
  };

  /**
   * A callback to run when a step request mutation is detected.
   * @param {*} step
   */
  const onStepRequestChange = step => {
    changeStep(step, validateForm, getSaveDataCallback());
  };

  // React to any change to the step of the request.
  useDepChange(onStepRequestChange, stepDomanda);

  const checkStepValidity = (checkingValidation) => {
    if (checkingValidation) {
      sendRequestTCB(validateForm, getSaveDataCallback());
    }
  };

  // React to any change to the step request.
  useDepChange(checkStepValidity, stepCheckValidity);

  useBusSubscribe(
    'SAVE_APPLICATION_ADMIN',
    getSaveDataCallback(),
  );

  return (
    <Row fluid margin="4em 0 0 0 ">
      <BottoniNavigazione
        moveNextValid
        moveBack={() => moveBack(validateForm, getSaveDataCallback())}
        moveNext={null}
        isFormDirty={isFormDirty}
        openSummary={() => openSummary(validateForm, getSaveDataCallback())}
      />
    </Row>
  );
};

Buttons.displayName = 'Buttons';

export default (Buttons);
