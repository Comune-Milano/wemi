/** @format */

import React, { useState, useEffect } from 'react';
import { isNullOrUndefined } from 'util';
import { Form } from 'libs/Form/components/Form';
import yup from 'libs/Form/validation/yup';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import FadeInWrapper from '../partials/FadeInWrapper';
import StepTitle from '../partials/StepTitle';
import { getTCBServiceName } from '../utils';
import { EstraiDatiBase as EstraiDatiBaseQ } from './partials/graphQLTCBIRI007';
import PreferenzeAnagrafiche from './PreferenzeAnagrafiche';
import Carattere from './Carattere';
import Esperienza from './Esperienza';
import AnniEsperienza from './AnniEsperienza';
import Lingue from './Lingue';
import Fg from './Fg';
import AltrePreferenze from './AltrePreferenze';
import Buttons from './Buttons';
import { estraiDatiReferenzeLavoratore as estraiDatiReferenzeLavoratoreQ } from './InserisciDatiRichiesta007';
import { ATTRIBUTI_REF_LAV } from './utils/attributiReferenzeLavoratore';

const PreferenzeSulLavoratore = ({
  moveNext,
  moveBack,
  idRichiestaTcb,
  locale,
  servizioTCB,
  stepDomanda,
  changeStep,
  onChangeValidation,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const [initialForm, setInitialForm] = useState({
    lingueParlate: [],
  });

  const [estraiDatiBase] = useGraphQLRequest(
    undefined,
    EstraiDatiBaseQ,
    {},
    true
  );
  const [estraiDatiInizializzazione] = useGraphQLRequest(
    undefined,
    estraiDatiReferenzeLavoratoreQ,
    { idRichiestaTcb, arrayConfig: Object.values(ATTRIBUTI_REF_LAV) },
    true
  );

  const formvalidationSchema = yup.object().shape({
    altreEsperienzeFg: yup.boolean(),
    carattere_0: yup.boolean(),
    checkTextArea: yup
      .string()
      .when('altreEsperienzeFg', {
        is: true,
        then: yup.string().required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
        otherwise: yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
      }),
    esperienza_0: yup.boolean(),

    TextAreaAltro: yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    TextAreaAltroCarattere: yup
      .string()
      .when('carattere_0', {
        is: true,
        then: yup.string().required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
        otherwise: yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
      }),
    TextAreaAltroEsperienza: yup
      .string()
      .when('esperienza_0', {
        is: true,
        then: yup.string().required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
        otherwise: yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
      }),
  });
  const isLoadingEstraiDatiBase = !estraiDatiBase.isLoading && !estraiDatiBase.pristine && !estraiDatiBase.errored;
  const isLoadingEstraiDatiInizializzazione = !estraiDatiInizializzazione.isLoading && !estraiDatiInizializzazione.pristine && !estraiDatiInizializzazione.errored;
  const isLoading = isLoadingEstraiDatiBase && isLoadingEstraiDatiInizializzazione;

  useEffect(() => {
    if (isLoading) {
      const jsonInitialForm = {

      };
      const mapLingue = estraiDatiBase.data.EstraiLingueParlate;
      const mappingDataset = [];
      estraiDatiInizializzazione.data.forEach(element => {
        if (element.cd_attributo === 67) {
          mapLingue.forEach((ele) => {
            if (ele.cdDominioTcb === element.cd_val_attributo) {
              if (ele.cdDominioTcb === 0) {
                jsonInitialForm.altreLingue = element.tx_nota;
              }
              mappingDataset.push(ele);
            }
          });
        }
      });
      jsonInitialForm.lingueParlate = mappingDataset;
      setInitialForm(jsonInitialForm);
    }
  }, [isLoading]);

  return (
    !isNullOrUndefined(estraiDatiBase.data) && (
      <FadeInWrapper fluid>
        <StepTitle
          title="Preferenze sul lavoratore"
          description={`In questa sezione ti chiediamo di dirci se hai richieste specifiche riguardo le caratteristiche del/la ${getTCBServiceName(servizioTCB, locale)}.`}
        />
        {isLoading ? (
          <>
            <Form
              validateOnChange
              initialDataset={initialForm}
              validationSchema={formvalidationSchema}
            >

              {({ dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty }) => (
                <>
                  <PreferenzeAnagrafiche
                    sesso={estraiDatiBase.data.EstraiSessoBeneficiario}
                    dataset={dataset}
                    setFormField={setFormField}
                    eta={estraiDatiBase.data.EstraiEtaLavoratore}
                    locale={locale}
                    estraiDatiInizializzazione={estraiDatiInizializzazione.data}
                  />
                  <Carattere
                    carattere={estraiDatiBase.data.EstraiCarattereLavoratore}
                    locale={locale}
                    touched={touched}
                    errors={errors}
                    handleFieldBlur={handleFieldBlur}
                    dataset={dataset}
                    setFormField={setFormField}
                    estraiDatiInizializzazione={estraiDatiInizializzazione.data}
                  />
                  <Esperienza
                    servizioTCB={servizioTCB}
                    touched={touched}
                    errors={errors}
                    handleFieldBlur={handleFieldBlur}
                    esperienze={estraiDatiBase.data.EstraiTitoloStudioLavoratore}
                    locale={locale}
                    dataset={dataset}
                    setFormField={setFormField}
                    estraiDatiInizializzazione={estraiDatiInizializzazione.data}
                  />
                  <AnniEsperienza
                    servizioTCB={servizioTCB}
                    locale={locale}
                    dataset={dataset}
                    setFormField={setFormField}
                    estraiDatiInizializzazione={estraiDatiInizializzazione.data}
                  />

                  <Lingue
                    dataset={dataset}
                    servizioTCB={servizioTCB}
                    setFormField={setFormField}
                    locale={locale}
                    lingueSelect={estraiDatiBase.data.EstraiLingueParlate}
                    estraiDatiInizializzazione={estraiDatiInizializzazione.data}
                  />
                  <Fg
                    dataset={dataset}
                    locale={locale}
                    servizioTCB={servizioTCB}
                    setFormField={setFormField}
                    estraiDatiInizializzazione={estraiDatiInizializzazione.data}
                  />
                  <AltrePreferenze
                    dataset={dataset}
                    touched={touched}
                    errors={errors}
                    handleFieldBlur={handleFieldBlur}
                    locale={locale}
                    servizioTCB={servizioTCB}
                    setFormField={setFormField}
                    estraiDatiInizializzazione={estraiDatiInizializzazione.data}
                  />
                  <Buttons
                    isFormDirty={isFormDirty}
                    idRichiestaTcb={idRichiestaTcb}
                    dataset={dataset}
                    moveNext={moveNext}
                    moveBack={moveBack}
                    stepValidity={isFormValid}
                    stepDomanda={stepDomanda}
                    changeStep={changeStep}
                    onChangeValidation={onChangeValidation}
                    stepCheckValidity={stepCheckValidity}
                    sendRequestTCB={sendRequestTCB}
                  />
                </>
              )}
            </Form>
          </>
        )
          :
          null}
      </FadeInWrapper>
    )
  );
};

PreferenzeSulLavoratore.displayName = 'Preferenze Sul Lavoratore';

export default PreferenzeSulLavoratore;
