import React from 'react';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useDepChange } from 'hooks/useDepChange';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import {
  inserisciModificaDatiRichiesta002 as inserisciModificaDatiRichiesta002M,
} from './graphQLTCBIRI002';
import BottoniNavigazione from '../../partials/BottoniNavigazione';

const ButtonsComponent = ({
  sendRequestTCB,
  stepCheckValidity,
  isStepValid,
  stepDomanda,
  changeStep,
  moveNext,
  servizioTCB,
  idRichiestaTcb,
}) => {
  const inserisciDatiRichiesta002 = useStatelessGraphQLRequest(
    inserisciModificaDatiRichiesta002M,
  );

  const createArrayConfig = (values) => {
    let arrConf;
    // se è tata inserisce il primo
    // se è badante il secondo
    if (servizioTCB.cd_dominio_tcb === 1) {
      arrConf = [
        { cd_attributo: cdAttributo.FG_PRESENZA_ALTRI_FRATELLI, cd_val_attributo: 1, fg_val: values.altriFratelli ? '1' : '0' },
        { cd_attributo: cdAttributo.FG_PRESENZA_NONNI, cd_val_attributo: 1, fg_val: values.nonni ? '1' : '0' },
        { cd_attributo: cdAttributo.FG_PRESENZA_ALTRI_PARENTI, cd_val_attributo: 1, fg_val: values.altri ? '1' : '0', tx_nota: values.altri ? values.altriValue : '' },
      ];
    } else {
      arrConf = [

        { cd_attributo: cdAttributo.FG_PRESENZA_ALTRI_PARENTI, cd_val_attributo: 1, fg_val: values.altri ? '1' : '0', tx_nota: values.altri ? values.altriValue : '' },
      ];
    }

    return arrConf;
  };

  const inserisciAttributiRichiesta002 = async (selectedValues) => {
    inserisciDatiRichiesta002({
      input: {
        idRichiestaTcb,
        arrayConfig: createArrayConfig(selectedValues),
      },
    });
  };

  const { isFormDirty, isFormValid, dataset, validateForm } = useFormContext();
  /**
* Gets the callback trigger the saving of step-related data.
*/
  const getSaveDataCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }
    return async () => {
      inserisciAttributiRichiesta002(dataset);
    };
  };

  /**
   * A callback to run when a step request is detected.
   * @param {*} step
   */
  const onStepRequestChange = step => {
    const validationCallback = isStepValid ? validateForm : undefined;

    changeStep(step, validationCallback, getSaveDataCallback());
  };
  // React to any change to the step request.
  useDepChange(onStepRequestChange, stepDomanda);

  const checkStepValidity = (checkingValidation) => {
    if (checkingValidation) {
      const validationCallback = isStepValid ? validateForm : undefined;
      sendRequestTCB(validationCallback, getSaveDataCallback());
    }
  };

  // React to any change to the step request.
  useDepChange(checkStepValidity, stepCheckValidity);

  useBusSubscribe(
    'SAVE_APPLICATION_ADMIN',
    getSaveDataCallback(),
  );

  return (
    <BottoniNavigazione
      moveNextValid={isStepValid}
      moveBack={null}
      moveNext={() => {
        const validationCallback = isStepValid ? validateForm : undefined;

        moveNext(
          validationCallback, getSaveDataCallback()
        );
      }}
      isFormDirty={isFormDirty}
      stepValidity={isStepValid && isFormValid}
    />
  );
};

ButtonsComponent.displayName = 'Bottoni step 1';

export const Buttons = ButtonsComponent;
