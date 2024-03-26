
import React, { useEffect, useState } from 'react';
import { Row } from 'components/ui/Grid';
import moment from 'moment';
import yup from 'libs/Form/validation/yup';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import { StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { codiciAttributo } from '../constants/CodiciAttributo';
import {
  EstraiStatoOccupazionale as EstraiStatoOccupazionaleQ,
  estraiDatiStatoOccupazionale as estraiDatiStatoOccupazionaleQ,
} from './StatoOccupazionaleGraphQL';
import { FormStatoOccupazionale } from './partials';

/**
 * Candidatura lavoratore - STEP 2.
 */
const StatoOccupazionale = ({
  locale,
  idOperatore,
  idLavoratore,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  stepCandidate,
}) => {
  const [statoOccupazionale] = useGraphQLRequest(
    undefined,
    EstraiStatoOccupazionaleQ,
    undefined,
    true
  );

  const [storedDataset] = useGraphQLRequest(
    undefined,
    estraiDatiStatoOccupazionaleQ,
    { idUtente: idLavoratore, cdAttributo: codiciAttributo.CD_STATO_OCCUPAZIONALE },
    true
  );
  // Initial form dataset.
  const [initialDataset, setInitialDataset] = useState();

  // Form validation schema.
  const formvalidationSchema = yup.object().shape({
    disponibile: yup
      .date()
      .min(moment().format('YYYY-MM-DD'), 'La data deve essere maggiore di quella corrente.')
      .typeError('Inserire una data valida')
      .when('stato', {
        is: (value) => value && value.id !== 3,
        then: yup.date().required(),
        otherwise: yup.date(),
      }),
    stato: yup
      .object()
      .required(),
  });

  useEffect(() => {
    // Interrompi se:
    // - non è ancora stato recuperato il dataset memorizzato o lo stato occupazionale lato backend oppure
    // - il dataset iniziale del form è stato già inizializzato.
    if (!storedDataset.data || !statoOccupazionale.data || initialDataset) {
      return;
    }

    const valoreTestuale = storedDataset.data.estraiDati002 ?
        statoOccupazionale.data.EstraiStatoOccupazionale.filter(
          ele => ele.cdDominioTcb === storedDataset.data.estraiDati002.cd_val_attributo
        ) :
        [];

    setInitialDataset({
      disponibile: storedDataset.data.estraiDati002 && storedDataset.data.estraiDati002.dt_disponibile_dal ?
        moment(storedDataset.data.estraiDati002.dt_disponibile_dal).toDate() :
        undefined,
      stato: storedDataset.data.estraiDati002 && storedDataset.data.estraiDati002.cd_val_attributo ?
        { id: storedDataset.data.estraiDati002.cd_val_attributo, value: valoreTestuale[0].tlValoreTestuale[locale] } :
        undefined,
    });
  }, [storedDataset.data, statoOccupazionale.data, initialDataset]);

  return (
    <>
      {!isNullOrUndefined(statoOccupazionale.data) && !storedDataset.pristine && !storedDataset.isLoading && initialDataset &&
        (
          <>
            <Row fluid>
              <StepTitle title="Stato occupazionale" />
            </Row>
            <Form
              validateOnChange
              initialDataset={initialDataset}
              validationSchema={formvalidationSchema}
            >
              {({ dataset, touched, setFormField, validateForm, errors, handleFieldBlur, isFormDirty }) => (
                <>
                  <Row fluid>
                    <FormStatoOccupazionale
                      dataset={dataset}
                      setFormField={setFormField}
                      handleFieldBlur={handleFieldBlur}
                      touched={touched}
                      dominio={statoOccupazionale.data.EstraiStatoOccupazionale}
                      locale={locale}
                      errors={errors}
                      isFormDirty={isFormDirty}
                      validateForm={validateForm}
                      changeStep={changeStep}
                      moveToNextStep={moveToNextStep}
                      moveToPrevStep={moveToPrevStep}
                      idLavoratore={idLavoratore}
                      idOperatore={idOperatore}
                      stepCandidate={stepCandidate}
                    />
                  </Row>
                </>
              )}

            </Form>
          </>
        )
      }
    </>
  );
};

StatoOccupazionale.displayName = 'StatoOccupazionale';

export default (StatoOccupazionale);
