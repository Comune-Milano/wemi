/** @format */

import React, { useEffect, useState } from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import { isNullOrUndefined } from 'util';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import yup from 'libs/Form/validation/yup';
import moment from 'moment';
import withAuthentication from 'hoc/withAuthentication';
import { fiscalCodeRegex, telefonoRegex, capRegex } from 'libs/Form/validation/regex';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { dateTransformer } from 'libs/trasformers/date';
import Inizializzazione from './Inizializzazione';
import ATTRIBUTI_CONTATTI from './partials/Attributi';
import Buttons from './Buttons';
import SedeLavoro from './SedeLavoro';
import DatiAnagrafici from './DatiAnagrafici';
import {
  estraiDatiRichiesta008 as estraiDatiRichiesta008Q,
  EstraiStatoNascia as EstraiStatoNasciaQ,
  EstraiInfoUtente as EstraiInfoUtenteQ,
} from './partials/graphQLTCBIRI008';
import StepTitle from '../partials/StepTitle';
import FadeInWrapper from '../partials/FadeInWrapper';

const SedeLavoroEContatti = ({
  locale,
  idRichiestaTcb,
  openSummary,
  moveBack,
  userProfile,
  stepDomanda,
  changeStep,
  onChangeValidation,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const [initialForm, setInitialForm] = useState();
  const { datiLogin } = userProfile;
  const [EstraiStato] = useGraphQLRequest(
    undefined,
    EstraiStatoNasciaQ,
    {},
    true
  );
  const [DatiUtente] = useGraphQLRequest(
    undefined,
    EstraiInfoUtenteQ,
    { idUtente: datiLogin.idCittadino },
    true
  );
  const estraiDatiInizializzazione = useStatelessGraphQLRequest(
    estraiDatiRichiesta008Q,
  );

  const datiInizializzazione = async () => {
    const response = await estraiDatiInizializzazione({
      datiRichiesta: { idRichiestaTcb, arrayConfig: Object.values(ATTRIBUTI_CONTATTI) },
    });
    const statoUtente = Inizializzazione(response, ATTRIBUTI_CONTATTI.CD_STATO_DI_NASCITA_CONTATTO, 'cd_val_attributo');
    const dataUtente = Inizializzazione(response, ATTRIBUTI_CONTATTI.DT_NASCITA_CONTATTO, 'dt_val');

    setInitialForm({
      usaDatiAnagrafici: Inizializzazione(response, ATTRIBUTI_CONTATTI.FG_CONTATTO_EQ_RICHIEDENTE, 'fg_val') === '1',
      usaDatiAccount: Inizializzazione(response, ATTRIBUTI_CONTATTI.FG_SEDE_CONTATTO_EQ_RESIDENZA, 'fg_val') === '1',
      nome_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.TX_NOME_CONTATTO, 'tx_val'),
      cognome_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.TX_COGNOME_CONTATTO, 'tx_val'),
      codice_fiscale_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.TX_CODICE_FISCALE_CONTATTO, 'tx_val'),
      luogo_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.TX_LUOGO_DI_NASCITA_CONTATTO, 'tx_val'),
      stato_utente: statoUtente ? { id: statoUtente } : undefined,
      data_utente: dataUtente && moment(dataUtente).isValid() ? new Date(dataUtente)
      : undefined,
      telefono_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.TX_TELEFONO_CONTATTO, 'tx_val'),
      email_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.TX_EMAIL_CONTATTO, 'tx_val'),
      indirizzo_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.TX_INDIRIZZO_SEDE_DI_LAVORO, 'tx_val'),
      comune_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.TX_COMUNE_SEDE_DI_LAVORO, 'tx_val'),
      cap_utente: Inizializzazione(response, ATTRIBUTI_CONTATTI.FIX_CAP, 'tx_val'),
    });
  };

  useEffect(() => {
    datiInizializzazione();
  }, []);

  const formvalidationSchema = yup.object().shape({
    cap_utente: yup
      .string()
      .nullable()
      .typeError('inserire un cap valido')
      .matches(capRegex, 'inserire un cap valido')
      .required()
      .max(5, 'inserire un cap valido')
      .min(5, 'inserire un cap valido'),
    codice_fiscale_utente: yup
      .string()
      .nullable()
      .typeError('Codice fiscale non valido.')
      .required()
      .matches(fiscalCodeRegex, 'Codice fiscale non valido.'),
    cognome_utente: yup
      .string()
      .nullable()
      .required()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    comune_utente: yup
      .string()
      .nullable()
      .required()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    data_utente: yup
      .date()
      .transform(dateTransformer)
      .typeError('Formato data non corretto.')
      .max(moment().startOf('day').toDate(), 'La data di nascita deve precedere la data odierna.')
      .nullable()
      .required(),
    email_utente: yup
      .string()
      .nullable()
      .typeError('Inserire un e-mail.')
      .email('inserire un e-mail valida.')
      .required()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    indirizzo_utente: yup
      .string()
      .nullable()
      .required()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    luogo_utente: yup
      .string()
      .nullable()
      .required()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    nome_utente: yup
      .string()
      .nullable()
      .required()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    stato_utente: yup
      .string()
      .nullable()
      .required(),
    telefono_utente: yup
      .string()
      .nullable()
      .matches(telefonoRegex, 'inserire un numero di telefono valido')
      .required(),
  });


  return (
    !isNullOrUndefined(DatiUtente.data) && (
      <FadeInWrapper fluid>
        <StepTitle
          title="Sede di lavoro e contatti"
          description={'In questa sezione ti chiediamo di indicare i tuoi contatti e l\'indirizzo della sede di lavoro.'}
        />
        {!isNullOrUndefined(DatiUtente.data) && !isNullOrUndefined(EstraiStato.data) && !estraiDatiInizializzazione.isLoading && !estraiDatiInizializzazione.pristine &&
          initialForm && (
            <>
              <Form
                validateOnChange
                initialDataset={initialForm}
                validationSchema={formvalidationSchema}
              >
                {({ dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty, setFormFields }) => (
                  <>
                    <DatiAnagrafici
                      dataset={dataset}
                      setFormField={setFormField}
                      datiUtente={DatiUtente.data.datiUtente}
                      datiLogin={datiLogin}
                      errors={errors}
                      touched={touched}
                      handleFieldBlur={handleFieldBlur}
                      Stati={EstraiStato.data}
                      locale={locale}
                      setFormFields={setFormFields}
                    />
                    <SedeLavoro
                      dataset={dataset}
                      setFormField={setFormField}
                      datiUtente={DatiUtente.data.datiUtente}
                      datiLogin={datiLogin}
                      errors={errors}
                      touched={touched}
                      handleFieldBlur={handleFieldBlur}
                    />
                    <Buttons
                      idRichiestaTcb={idRichiestaTcb}
                      isFormDirty={isFormDirty}
                      dataset={dataset}
                      openSummary={openSummary}
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
          )}
      </FadeInWrapper>
    )
  );
};

SedeLavoroEContatti.displayName = 'Sede Lavoro E Contatti';


export default withAuthentication(SedeLavoroEContatti);
