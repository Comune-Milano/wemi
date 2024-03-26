import React, { useEffect } from 'react';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { ID_SERVIZIO_TATA } from 'types/tcbConstants';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useDepChange } from 'hooks/useDepChange';
import { functionSort } from 'utils/functions/functionSort';
import {
  isFlagCandidaturaChecked,
  enableDisableSteps,
  createArrayConfig,
} from '../partials/CompetenzeForm/utils';
import ButtonsNavigation from '../partials/ButtonsNavigation';
import RadioCandidatura from '../partials/RadioCandidatura';
import { TataForm } from './partials';
import { FaccendeDomesticheForm } from '../partials/CompetenzeForm/FaccendeDomesticheForm';
import { inserisciModificaAttributoOffertaServizio } from '../partials/CompetenzeForm/CompetenzeFormGraphql';

const CompetenzeBabySitterForm = ({
  idLavoratore,
  idOperatore,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  locale,
  navigationTabs,
  setNavigationTabs,
  stepCandidate,
  formData,
}) => {
  const { dataset, validateForm, touched, isFormDirty } = useFormContext();

  const flagCandidaturaChecked = isFlagCandidaturaChecked(dataset.candidatura.radioOptions);

  useEffect(() => {
    enableDisableSteps(flagCandidaturaChecked, navigationTabs, setNavigationTabs);
  }, [flagCandidaturaChecked]);

  const data = {
    idUtenteLav: idLavoratore,
    idServizioRif: ID_SERVIZIO_TATA,
    flagCandidatura: flagCandidaturaChecked,
    arrayAttrOffertaServizio: createArrayConfig(dataset, touched, ID_SERVIZIO_TATA),
  };

  /**
  * A callback to run when a step candidate mutation is detected.
  * @param {*} step
  */
  const onStepCandidateChange = (step) => {
    changeStep(step, validateForm, getDataSavingCallback(isFormDirty, data));
  };

  // React to any change to the step candidate.
  useDepChange(onStepCandidateChange, stepCandidate);

  const attributiOffertaServizioMutation = useStatelessGraphQLRequest(
    inserisciModificaAttributoOffertaServizio,
  );

  const getDataSavingCallback = (isFormDirty, data) => {
    if (isFormDirty) {
      return () => attributiOffertaServizioMutation(data);
    }
    return () => Promise.resolve();
  };

  useBusSubscribe(
    'SALVA_ADMIN',
    getDataSavingCallback(isFormDirty, data),
    isNullOrUndefined(idOperatore)
  );

  return (
    <>
      <RadioCandidatura />
      {flagCandidaturaChecked ? (
        <>
          <TataForm
            mansioniTata={functionSort(formData.mansioniTata.data, 'cdDominioTcb')}
            fasceEta={formData.fasceEta.data}
            locale={locale}
          />
          <FaccendeDomesticheForm
            faccendeDomesticheFlag
            title="SEI DISPONIBILE A SVOLGERE LE FACCENDE DOMESTICHE?"
            mansioniColf={formData.mansioniColf.data}
            locale={locale}
            required
          />
        </>
      ) : null}
      <ButtonsNavigation
        onMoveBack={() => moveToPrevStep(validateForm, getDataSavingCallback(isFormDirty, data))}
        onMoveNext={
          moveToNextStep ? () => moveToNextStep(validateForm, getDataSavingCallback(isFormDirty, data)) : undefined
        }
      />
    </>
  );
};

CompetenzeBabySitterForm.displayName = 'CompetenzeBabySitterForm';
export default CompetenzeBabySitterForm;
