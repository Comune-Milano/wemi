import React from 'react';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useDepChange } from 'hooks/useDepChange';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import RadioCandidatura from '../RadioCandidatura';
import ButtonsNavigation from '../ButtonsNavigation';
import {
  inserisciModificaAttributoOffertaServizio as inserisciModificaAttributoOffertaServizioM,
} from './CompetenzeFormGraphql';
import { createArrayConfig } from './createArrayConfig';
import { useEffect } from 'react';

const CompetenzeForm = ({
  datiLogin,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  stepCandidate,
  locale,
  idServizioRiferimento,
  navigationTabs,
  setNavigationTabs,
  children,
  idOperatore
}) => {
  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  const flagCandidaturaChecked = dataset.candidatura.radioOptions.some(el => el.id === '1' && el.checked);

  useEffect(() => {
    enableDisableSteps(flagCandidaturaChecked);
  }, [flagCandidaturaChecked]);

  const enableDisableSteps = (enabled) => {
    const dataCopy = [...navigationTabs];
    let visibleDeps;
    dataCopy.forEach(el => {
      if (el.active) {
        visibleDeps = el.visibleDeps;
      }

      if (visibleDeps && visibleDeps.includes(el.code)) {
        el.disabled = !enabled;
      }
    });
    setNavigationTabs(dataCopy);
  };

  const AttributiOffertaServizioMutation = useStatelessGraphQLRequest(
    inserisciModificaAttributoOffertaServizioM,
  );

  const getDataSavingCallback = () => {
    if (isFormDirty) {
      return () => AttributiOffertaServizioMutation({
        idUtenteLav: datiLogin.idCittadino,
        idServizioRif: parseInt(idServizioRiferimento, 10),
        flagCandidatura: flagCandidaturaChecked,
        arrayAttrOffertaServizio: createArrayConfig(dataset, touched, idServizioRiferimento),
      });
    }
    return () => Promise.resolve();
  };

  /**
  * A callback to run when a step candidate mutation is detected.
  * @param {*} step
  */
  const onStepCandidateChange = (step) => {
    changeStep(step, isFormValid, getDataSavingCallback());
  };

  // React to any change to the step candidate.
  useDepChange(onStepCandidateChange, stepCandidate);

  return (
    <>
      <RadioCandidatura />
      {flagCandidaturaChecked ? children : null}
      <ButtonsNavigation
        onMoveBack={() => moveToPrevStep(isFormValid, getDataSavingCallback())}
        onMoveNext={moveToNextStep ? () => moveToNextStep(isFormValid, getDataSavingCallback()) : undefined}
      />
    </>
  );
};

CompetenzeForm.displayName = 'CompetenzeForm';
export default CompetenzeForm;
