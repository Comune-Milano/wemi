import React, { useEffect } from 'react';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { ID_SERVIZIO_BADANTE } from 'types/tcbConstants';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useDepChange } from 'hooks/useDepChange';
import {
  isFlagCandidaturaChecked,
  enableDisableSteps,
  createArrayConfig,
  NotFlagCandidaturaChecked,
} from '../partials/CompetenzeForm/utils';
import ButtonsNavigation from '../partials/ButtonsNavigation';
import RadioCandidatura from '../partials/RadioCandidatura';
import { FaccendeDomesticheForm } from '../partials/CompetenzeForm/FaccendeDomesticheForm';
import { BadanteForm } from './partials';
import { inserisciModificaAttributoOffertaServizio } from '../partials/CompetenzeForm/CompetenzeFormGraphql';
import EsperienzeBadante from '../EsperienzeBadante';
import { inserisciDatiEsperienzeBadante } from '../EsperienzeBadante/EsperienzeBadanteGraphQL';

const CompetenzeBadanteForm = ({
  idOperatore,
  idLavoratore,
  changeStep,
  patologie,
  moveToNextStep,
  moveToPrevStep,
  saveStepAndTabsStatus,
  locale,
  codiciAttributo,
  navigationTabs,
  setNavigationTabs,
  stepCandidate,
  formData,
}) => {
  const {
    dataset,
    validateForm,
    touched,
    isFormDirty,
  } = useFormContext();

  const flagCandidaturaChecked = isFlagCandidaturaChecked(dataset.candidatura.radioOptions);
  const isNegativeFlagCandidaturaChecked = NotFlagCandidaturaChecked(dataset.candidatura.radioOptions);

  useEffect(() => {
    enableDisableSteps(flagCandidaturaChecked, navigationTabs, setNavigationTabs);
  }, [flagCandidaturaChecked]);

  const data = {
    idUtenteLav: idLavoratore,
    idServizioRif: ID_SERVIZIO_BADANTE,
    flagCandidatura: flagCandidaturaChecked,
    arrayAttrOffertaServizio: createArrayConfig(dataset, touched, ID_SERVIZIO_BADANTE),
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
  const inserisciDati = useStatelessGraphQLRequest(inserisciDatiEsperienzeBadante);


  const getDataSavingCallback = (isFormDirty, data) => {
    const cdAttributoPatologieGeneriche = codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_GENERICHE;
    const cdAttributoPatologieAnziani = codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_ANZIANI;
    const patologieGeneriche = dataset.esperienzePatologieGeneriche;
    const patologieAnziani = dataset.esperienzePatologie;
    const { altroPatologie } = dataset;
    const servizioRiferimento = ID_SERVIZIO_BADANTE;
    if (isFormDirty) {
      return () => attributiOffertaServizioMutation(data)
        .then(() => inserisciDati({
          input: {
            idUtente: idLavoratore,
            servizioRiferimento,
            cdAttributoPatologieGeneriche,
            cdAttributoPatologieAnziani,
            patologieGeneriche,
            altroPatologie,
            patologieAnziani,
          },
        }));
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
          <BadanteForm
            mansioniBadante={formData.mansioniBadante.data}
            mansioniColf={formData.mansioniColf.data}
            locale={locale}
          />
          <EsperienzeBadante
            locale={locale}
            patologie={patologie}
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
          moveToNextStep && flagCandidaturaChecked ? () => moveToNextStep(validateForm, getDataSavingCallback(isFormDirty, data)) : undefined
        }
        onSave={saveStepAndTabsStatus && isNegativeFlagCandidaturaChecked ? () => saveStepAndTabsStatus(validateForm, getDataSavingCallback(isFormDirty, data)) : undefined}
      />
    </>
  );
};

CompetenzeBadanteForm.displayName = 'CompetenzeBadanteForm';
export default CompetenzeBadanteForm;
