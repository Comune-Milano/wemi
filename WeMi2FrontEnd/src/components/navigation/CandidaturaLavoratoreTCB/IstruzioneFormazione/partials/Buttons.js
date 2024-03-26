
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useDepChange } from 'hooks/useDepChange';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import ButtonsNavigation from '../../partials/ButtonsNavigation';
import { codiciAttributo } from '../../constants/CodiciAttributo';
import { inserisciDatiIstruzioneFormazione as inserisciDatiIstruzioneFormazioneQ } from '../IstruzioneFormazioneGraphQL';

const Buttons = ({
  dataset,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  validateForm,
  isFormDirty,
  idLavoratore,
  idOperatore,
  stepCandidate,
}) => {
  const inserisciDati = useStatelessGraphQLRequest(inserisciDatiIstruzioneFormazioneQ);

  const getDataSavingCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }

    const cdAttributoTata = codiciAttributo.LS_CORSI_TATA;
    const nomeCorsoDaFrequentare = dataset.nomeCorsoDaFrequentare || '';
    const tata = dataset.tata || [];
    const altroTata = dataset.altroTata || '';
    const altroBadante = dataset.altroBadante || '';
    const nomeLaurea = dataset.nomeLaurea || '';
    const cdAttributoBadante = codiciAttributo.LS_CORSI_BADANTE;
    const badante = dataset.badante || [];
    const cdAttributoBadanteInteresse = codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_SA;
    const interesseAfrequentareCorsi = dataset.interesseAfrequentareCorsi || false;
    const cdAttributoConoscenzaItaliano = codiciAttributo.LIV_CONOSCENZA_ITALIANO;
    const livelloConoscenzaItaliano = dataset.madrelingua ? 6 : (dataset.livelloConoscenzaItaliano || undefined);
    const cdAttributoCorsiItaliano = codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_DI_ITALIANO;
    const corsiItaliano = !!dataset.corsiItaliano;

    return () => inserisciDati({
      input: {
        idUtente: idLavoratore,
        cdAttributoTata,
        tata,
        altroTata,
        altroBadante,
        nomeCorsoDaFrequentare,
        nomeLaurea,
        cdAttributoBadante,
        badante,
        cdAttributoBadanteInteresse,
        interesseAfrequentareCorsi,
        cdAttributoConoscenzaItaliano,
        livelloConoscenzaItaliano,
        corsiItaliano,
        cdAttributoCorsiItaliano,
      },
    });
  };

  const onStepCandidateChange = step => {
    changeStep(step, validateForm, getDataSavingCallback());
  };

  useDepChange(onStepCandidateChange, stepCandidate);

  useBusSubscribe(
    'SALVA_ADMIN',
    getDataSavingCallback(),
    isNullOrUndefined(idOperatore)
  );

  return (
    <Column xs={12} padding="0">
      <Row fluid justifycontent="center">
        <ButtonsNavigation
          onMoveNext={() => moveToNextStep(validateForm, getDataSavingCallback())}
          onMoveBack={() => moveToPrevStep(validateForm, getDataSavingCallback())}
        />
      </Row>
    </Column>
  );
};

export default Buttons;

Buttons.displayName = 'Buttons';
