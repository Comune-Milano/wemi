import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useDepChange } from 'hooks/useDepChange';
import ButtonsNavigation from '../../partials/ButtonsNavigation';
import { codiciAttributo } from '../../constants/CodiciAttributo';
import { useBusSubscribe } from "hooks/eventBus/useBusSubscribe";
import { inserisciDatiEsperienzeBadante as inserisciDatiEsperienzeBadanteQ } from '../EsperienzeBadanteGraphQL';

const Buttons = ({
  dataset,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  isFormValid,
  isFormDirty,
  idUtente,
  stepCandidate,
  skipSubscription,
}) => {

  const inserisciDati = useStatelessGraphQLRequest(inserisciDatiEsperienzeBadanteQ);
  const getDataSavingCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }

    const cdAttributoPatologieGeneriche = codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_GENERICHE;
    const cdAttributoPatologieAnziani = codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_ANZIANI;
    const patologieGeneriche = dataset.esperienzePatologieGeneriche;
    const patologieAnziani = dataset.esperienzePatologie;
    const altroPatologie = dataset.altroPatologie;
    const servizioRiferimento = 999999;

    return () => inserisciDati({
      input: {
        idUtente,
        servizioRiferimento,
        cdAttributoPatologieGeneriche,
        cdAttributoPatologieAnziani,
        patologieGeneriche,
        altroPatologie,
        patologieAnziani,
      },
    });
  };

  const onStepCandidateChange = step => {
    changeStep(step, isFormValid, getDataSavingCallback());
  };

  useDepChange(onStepCandidateChange, stepCandidate);

  useBusSubscribe(
    'SALVA_ADMIN',
    getDataSavingCallback(),
    skipSubscription
  );

  return (
    <Column xs={12} padding="0">
      <Row fluid justifycontent="center">
        <ButtonsNavigation
          onMoveNext={() => moveToNextStep(isFormValid, getDataSavingCallback())}
          onMoveBack={() => moveToPrevStep(isFormValid, getDataSavingCallback())}
        />
      </Row>
    </Column>
  );
};

export default Buttons;

Buttons.displayName = 'Buttons';
