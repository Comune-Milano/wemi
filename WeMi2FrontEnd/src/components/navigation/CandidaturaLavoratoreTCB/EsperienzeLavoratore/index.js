/** @format */

import React, { useState, useEffect } from 'react';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { Row } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { Form } from 'libs/Form/components/Form';
import { useDepChange } from 'hooks/useDepChange';
import { createCheckboxArray } from 'components/navigation/ConfigurazioneRichiestaTCB/utils';
import TextAccordion from 'components/ui2/TextAccordion';
import moment from 'moment';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { FadeInWrapper } from '../partials/FadeInWrapper';
import {
  estraiServiziTCB as estraiServiziTCBQ,
  estraiEsperienzeLavoratore as estraiEsperienzeLavoratoreQ,
  inserisciModificaAttributoUtente as inserisciModificaAttributoUtenteQ,
  estraiValAttributiUtente as estraiValAttributiUtenteQ,
} from './partials/graphQLEsperienzeLavoratore';
import {
  AggiungiFamiglie,
  EsperienzaForm,
  EsperienzaWeMi,
} from './partials';
import { formValidationSchema } from './partials/formPartials/validationSchema';
import { getArrayFamiglie } from './partials/formPartials/initialDatasets';
import ButtonsNavigation from '../partials/ButtonsNavigation';
import { codiciAttributo } from '../constants/CodiciAttributo';
import { codiciAttributoEsperienzaLavoratore } from './codiciAttributoEsperienzaLavoratore';
import { ENUM_TYPE } from './constants';

const EsperienzeLavoratore = ({
  locale,
  idOperatore,
  idLavoratore,
  changeStep,
  stepCandidate,
  moveToNextStep,
  moveToPrevStep,
}) => {
  const [altreEsperienze, setAltreEsperienze] = React.useState({});
  const [serviziTCB] = useGraphQLRequest(
    undefined,
    estraiServiziTCBQ,
    undefined,
    true
  );

  const [EsperienzeLavoratore, getEsperienzeLavoratore] = useGraphQLRequest(
    undefined,
    estraiEsperienzeLavoratoreQ,
    { idUtenteLav: idLavoratore },
    true
  );
  const [altraMansione] = useGraphQLRequest(
    undefined,
    estraiValAttributiUtenteQ,
    {
      idUtente: idLavoratore,
      arrayCdAttr: codiciAttributoEsperienzaLavoratore,
    },
    true,
    res => {
      const altro = res[0];
      return altro && altro.txVal;
    }
  );

  const loaded = !serviziTCB.pristine &&
    !serviziTCB.isLoading &&
    !EsperienzeLavoratore.pristine &&
    !EsperienzeLavoratore.isLoading;

  const [famiglie, setFamiglie] = useState([]);

  useEffect(() => {
    if (EsperienzeLavoratore.data) {
      const arrayFamiglie = getArrayFamiglie(EsperienzeLavoratore.data, famiglie, locale);
      arrayFamiglie.sort((a, b) => !a.finePeriodo ?
        !b.finePeriodo ?
          moment(a.inizioPeriodo).isAfter(moment(b.inizioPeriodo)) ? -1 :
            moment(a.inizioPeriodo).isBefore(moment(b.inizioPeriodo)) ? 1 :
              0 : -1 : !b.finePeriodo ? 1 :
          moment(a.finePeriodo).isAfter(moment(b.finePeriodo)) ? -1 :
            moment(a.finePeriodo).isBefore(moment(b.finePeriodo)) ? 1 :
              0);
      setFamiglie(arrayFamiglie);
    }
  }, [EsperienzeLavoratore.data]);

  useEffect(() => {
    if (altraMansione.data) {
      setAltreEsperienze({
        check: !!altraMansione.data,
        TextArea: altraMansione.data,
      });
    }
  }, [altraMansione.data]);

  const serviziTCBCheckbox = (loaded && createCheckboxArray(serviziTCB.data, locale)) || [];

  const inserisciAttributi = useStatelessGraphQLRequest(
    inserisciModificaAttributoUtenteQ,
  );
  const createArrayConfig = () => {
    const arr = [{
      cd_attributo: codiciAttributo.TX_ESPERIENZE_ALTRE,
      cd_val_attributo: altreEsperienze.check ? 1 : -1,
      tx_val: altreEsperienze.TextArea,
    }];
    return arr;
  };

  const getDataSavingCallback = () =>
    // return () => Promise.resolve();
    () => inserisciAttributi({
      input: {
        idUtente: parseInt(idLavoratore, 10),
        arrayConfig: createArrayConfig(),
      },
    });

  /**
 * A callback to run when a step candidate mutation is detected.
 * @param {*} step
 */
  const onStepCandidateChange = (step) => {
    changeStep(step, () => true, getDataSavingCallback());
  };
  // React to any change to the step candidate.
  useDepChange(onStepCandidateChange, stepCandidate);

  useBusSubscribe(
    'SALVA_ADMIN',
    getDataSavingCallback(),
    isNullOrUndefined(idOperatore)
  );

  return (
    <FadeInWrapper fluid>
      <StepTitle
        title="Esperienze lavorative"
      />
      <AggiungiFamiglie
        famiglie={famiglie}
        setFamiglie={setFamiglie}
      />
      <Row fluid direction="column" margin="2em 0 0 0">
        {famiglie.length ? famiglie.map((el, index) => {
          const initialDataset = {
            id: el.id,
            nome: el.nome,
            new: el.new,
            order: el.order,
            serviziPrestati: el.serviziPrestati || [],
            inCorsoFlag: el.inCorsoFlag,
            inizioPeriodo: el.inizioPeriodo,
            finePeriodo: el.finePeriodo,
            sedeLavoroProvincia: el.sedeLavoroProvincia,
            sedeLavoroComune: el.sedeLavoroComune,
            emailFamiglia: el.emailFamiglia,
            telefonoFamiglia: el.telefonoFamiglia,
            descrizioneEsp: el.descrizioneEsp,
            tipologiaServizio: el.nomeServizioAltro,
          };
          if (el.type === ENUM_TYPE.VALIDATA) {
            return (
              <Form
                key={el.order}
                validateOnChange
                initialDataset={initialDataset}
                validationSchema={formValidationSchema}
              >
                <Row fluid margin="0 0 1em">
                  <TextAccordion
                    label={`${el.nome} (${el.id})`}
                    size="f7"
                    color="primary"
                    visible={index === famiglie.length - 1}
                  >
                    <EsperienzaWeMi
                      infoFamiglia={el}
                      idOperatore={idOperatore}
                      idLavoratore={idLavoratore}
                      famiglie={famiglie}
                      setFamiglie={setFamiglie}
                      serviziTCBCheckbox={serviziTCBCheckbox}
                      getEsperienzeLavoratore={getEsperienzeLavoratore}
                      locale={locale}
                    />

                  </TextAccordion>
                </Row>
              </Form>
            );
          }
          if (el.type === ENUM_TYPE.INSERITA) {
            return (
              <Form
                key={el.order}
                validateOnChange
                initialDataset={initialDataset}
                validationSchema={formValidationSchema}
              >
                <Row fluid margin="0 0 1em">
                  <TextAccordion
                    label={el.nome}
                    size="f7"
                    color="primary"
                    visible={index === 0}
                  >
                    <EsperienzaForm
                      infoFamiglia={el}
                      idOperatore={idOperatore}
                      idLavoratore={idLavoratore}
                      famiglie={famiglie}
                      setFamiglie={setFamiglie}
                      serviziTCBCheckbox={serviziTCBCheckbox}
                      getEsperienzeLavoratore={getEsperienzeLavoratore}
                      locale={locale}
                    />

                  </TextAccordion>
                </Row>
              </Form>
            );
          }
          return null;
        })
          : null
        }
      </Row>
      <ButtonsNavigation
        moveNextValid
        onMoveNext={() => moveToNextStep(() => true, getDataSavingCallback())}
        onMoveBack={() => moveToPrevStep(() => true, getDataSavingCallback())}
      />
    </FadeInWrapper>
  );
};

EsperienzeLavoratore.displayName = 'EsperienzeLavoratore';

export default EsperienzeLavoratore;
