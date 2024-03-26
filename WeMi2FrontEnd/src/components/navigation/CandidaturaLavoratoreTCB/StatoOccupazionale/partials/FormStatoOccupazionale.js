
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import moment from 'moment';
import { useDepChange } from 'hooks/useDepChange';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { inserisciModificaDatiStatoOccupazionale as inserisciModificaDatiStatoOccupazionaleQ } from '../StatoOccupazionaleGraphQL';
import { Disponibilita, StatoOccupazionale } from './formpartials';
import ButtonsNavigation from '../../partials/ButtonsNavigation';
import { codiciAttributo } from '../../constants/CodiciAttributo';

const FormStatoOccupazionale = ({
  dataset,
  setFormField,
  handleFieldBlur,
  touched,
  dominio,
  locale,
  errors,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  validateForm,
  isFormDirty,
  idOperatore,
  idLavoratore,
  stepCandidate,
}) => {
  const inserisciDati = useStatelessGraphQLRequest(inserisciModificaDatiStatoOccupazionaleQ);

  const getDataSavingCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }

    const id_utente = idLavoratore;
    const attributo = codiciAttributo.CD_STATO_OCCUPAZIONALE;
    const val_attributo = dataset.stato ? dataset.stato.id : undefined;
    const disponibile = dataset.disponibile ? moment(dataset.disponibile, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined;
    return () => inserisciDati({
      input: {
        id_utente,
        attributo,
        val_attributo,
        disponibile,
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
      <Row fluid margin="0 0 3em 0">
        <StatoOccupazionale
          dataset={dataset}
          setFormField={setFormField}
          handleFieldBlur={handleFieldBlur}
          touched={touched}
          dominio={dominio}
          locale={locale}
          errors={errors}
        />
      </Row>
      <Row fluid>
        <Disponibilita
          dataset={dataset}
          setFormField={setFormField}
          handleFieldBlur={handleFieldBlur}
          touched={touched}
          errors={errors}
        />
      </Row>
      <Row fluid justifycontent="center">
        <ButtonsNavigation
          onMoveNext={() => moveToNextStep(validateForm, getDataSavingCallback())}
          onMoveBack={() => moveToPrevStep(validateForm, getDataSavingCallback())}
        />
      </Row>
    </Column>
  );
};

export default FormStatoOccupazionale;

FormStatoOccupazionale.displayName = 'FormStatoOccupazionale';
