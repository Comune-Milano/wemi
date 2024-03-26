/** @format */

import React, { useState } from 'react';
import { getIdServizio } from 'utils/functions/getIdServizio';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { ModaleSimulatoreCosto } from 'components/shared';
import { Form } from 'libs/Form/components/Form';
import yup from 'libs/Form/validation/yup';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { getObjectValue, isObjectEmpty } from 'utils/extensions/objectExtensions';
import { WEEKEND, CONVIVENZA, CONVIVENZA_RIDOTTA } from 'types/tipologiaOrario';
import { TIPOLOGIA_ORARIO } from 'components/pages/MatchingDomandaLavoratore/constants/tipologiaorario';
import { ID_SERVIZIO_TATA, ID_SERVIZIO_BADANTE } from 'types/tcbConstants';
import EtaBambini from 'components/shared/domanda-tcb/EtaBambini';
import PersoneAutoSufficienti from 'components/shared/domanda-tcb/PersoneAutoSufficienti';
import { getCheckboxOptionsEtaBambini, radioItemsPersoneAutoSufficienti, idEtaBambini, idPersoneAutoSufficienti as idLabelPersoneAutoSufficienti } from 'components/shared/domanda-tcb/costants';
import { idLivelloContrattuale } from 'types/idLivelloContrattuale';
import { idLibrettoDiFamiglia } from 'types/idLibrettoDiFamiglia';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import moment from 'moment';
import { dateTransformer } from 'libs/trasformers/date';
import FadeInWrapper from '../partials/FadeInWrapper';
import StepTitle from '../partials/StepTitle';
import { getTCBServiceName } from '../utils';
import {
  estraiDati as estraiDatiQ,
} from './EstraiDomini';
import {
  RetribuzioneProposta, FormDisponibilita, SpaziPrevisti, OreSettimana, MezzaGiornata,
  TipologiaContratto, AltreDisponibilita, Buttons, DisponibilitaSettimanale,
} from './partials';
import { cdAttributo } from '../CodiciAttributi';
import { arrayAttributi } from './utils/arrayAttributi';
import { findFasceStipendio } from './utils/findFasceStipendio';
import { findRetribuzione } from './utils/findRetribuzione';

import { mergeHoursBetween } from './partials/utils';
import { INTERVALS } from './partials/constants';

const DisponibilitaRichiesta = ({
  idRichiestaTcb,
  servizioTCB,
  livelliContrattuali,
  locale,
  moveNext,
  moveBack,
  updateAttributiDomanda,
  userProfile,
  changeStep,
  stepDomanda,
  onChangeValidation,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const [openSimulatore, setOpenSimulatore] = useState(false);
  const [importiMinimi, setimportiMinimi] = useState({});

  const idServizioTCB = getIdServizio(servizioTCB.cd_dominio_tcb);

  const [allDatiDisponibilita] = useGraphQLRequest(
    undefined,
    estraiDatiQ,
    {
      idRichiestaTcb,
      datiDisponibilita: {
        idRichiestaTcb,
        arrayConfig: arrayAttributi,
      },
      idServizio: idServizioTCB,
    },
    true
  );

  const trasformaCalendario = (calendarioTCB) => {
    let interval;
    if (orario.id === TIPOLOGIA_ORARIO.ASSISTENZA_NOTTURNA) {
      interval = INTERVALS.ASSISTENZA_NOTTURNA;
    }
    if (orario.id === TIPOLOGIA_ORARIO.PRESENZA_NOTTURNA) {
      interval = INTERVALS.PRESENZA_NOTTURNA;
    }
    const arr = calendarioTCB && calendarioTCB.filter(ele => (ele.txValue));
    const objectCalendar = convertBinToObject(arr);
    if (interval) {
      return mergeHoursBetween(objectCalendar, interval);
    }
    return objectCalendar;
  };
  const loaded =
    !livelliContrattuali.pristine
    && !livelliContrattuali.isLoading
    && !allDatiDisponibilita.isLoading
    && !allDatiDisponibilita.pristine;


  if (loaded && isObjectEmpty(importiMinimi)) {
    const impMinimi = {};
    loaded && livelliContrattuali.data.estraiConfigurazioniLivelliContrattuali.forEach(el => {
      impMinimi[el.cd_tipo_orario_lavoro] = {
        ...impMinimi[el.cd_tipo_orario_lavoro],
        [el.LivelloContrattuale.cdLivelloContrattuale]: el.paga_minima_contrattuale,
        imImportoIndennitaTata: el.im_importo_indennita_tata,
        imImportoIndennitaBadante: el.im_importo_indennita_badante,
      };
    });
    setimportiMinimi(impMinimi);
  }

  const tipologiaAssunzione = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el => el.cd_attributo === 98) ? {
    id: allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el => el.cd_attributo === 98).cd_val_attributo,
  } : {};
  const orario = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el => el.cd_attributo === 14) ? {
    id: (tipologiaAssunzione.id === idLibrettoDiFamiglia) ? idLibrettoDiFamiglia : (allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el => el.cd_attributo === 14).cd_val_attributo),
  } : {};
  const livelloContrattuale = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el => el.cd_attributo === 96) ? {
    id: allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el => el.cd_attributo === 96).cd_val_attributo,
  } : {};
  const mezzaGiornataRiposo = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.LS_MEZZA_GIORNATA_CONVIVENTE) ?
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.filter(el =>
      el.cd_attributo === cdAttributo.LS_MEZZA_GIORNATA_CONVIVENTE).map(el => ({
        id: el.cd_val_attributo,
        value: allDatiDisponibilita.data.EstraiGiorniSettimana
          .find(el2 => el2.cd_dominio_tcb === el.cd_val_attributo).tl_valore_testuale[locale],
      }
      )) : [];
  const sistemazione = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.LS_SPAZI_CONVIVENTE) ?
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.filter(el =>
      el.cd_attributo === cdAttributo.LS_SPAZI_CONVIVENTE).map(el => el.cd_val_attributo) : [];
  const altroSistemazione = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.LS_SPAZI_CONVIVENTE && el.cd_val_attributo === 0) ?
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.LS_SPAZI_CONVIVENTE && el.cd_val_attributo === 0).tx_nota : '';
  const fasciaStipendioDb = findFasceStipendio(orario, true);
  const retribuzione = loaded && findRetribuzione(allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita, fasciaStipendioDb);
  const oreSettimanali = allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.calendarioTCB ? allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.calendarioTCB[allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.calendarioTCB.length - 1] && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.calendarioTCB[allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.calendarioTCB.length - 1].nr_ore_totali : 0;
  const disponibilitaSettimanale = trasformaCalendario(allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.calendarioTCB);
  const tipologiaContratto = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.CD_TIPOLOGIA_CONTRATTO) ?
  {
    id: allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
        el.cd_attributo === cdAttributo.CD_TIPOLOGIA_CONTRATTO).cd_val_attributo,
  }
    : {};
  const contrattoDa = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.DT_DATA_CONTRATTO_DA) ?
    new Date(allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.DT_DATA_CONTRATTO_DA).dt_val)
    : new Date();
  const contrattoAl = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.DT_DATA_CONTRATTO_A) ?
    new Date(allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.DT_DATA_CONTRATTO_A).dt_val)
    : new Date();
  const noteContratto = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.TX_NOTE_SU_CONTRATTO) ?
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.TX_NOTE_SU_CONTRATTO).tx_val : '';
  const disponibilitaStraordinariCheck = !!(loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.FG_DISPONIBILITA_STRAORDINARI) &&
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.FG_DISPONIBILITA_STRAORDINARI).fg_val === '1');
  const notaDisponibilitaStraordinari = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.FG_DISPONIBILITA_STRAORDINARI) &&
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.FG_DISPONIBILITA_STRAORDINARI).fg_val === '1' ?
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.FG_DISPONIBILITA_STRAORDINARI).tx_nota : '';
  const disponibilitaTrasferteCheck = !!(loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.FG_DISP_TRASFERTE_BREVI) &&
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.FG_DISP_TRASFERTE_BREVI).fg_val === '1');
  const disponibilitaTrasferte = loaded && allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
    el.cd_attributo === cdAttributo.FG_DISP_TRASFERTE_BREVI) &&
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.FG_DISP_TRASFERTE_BREVI).fg_val === '1' ?
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.FG_DISP_TRASFERTE_BREVI).tx_nota : '';

  const idPersoneAutoSufficienti = loaded &&
    allDatiDisponibilita.data?.EstraiDatiConfigurazioneRichiestaDisponibilita.disponibilita.find(el =>
      el.cd_attributo === cdAttributo.FL_PIU_PERSONE_NON_AUTOSUFFICIENTI)?.fg_val;
  const personeAutoSufficienti = idPersoneAutoSufficienti ? radioItemsPersoneAutoSufficienti[idPersoneAutoSufficienti] : null;

  const initialFormDataset = {
    orario,
    livelloContrattuale,
    oreSettimanali,
    mezzaGiornataRiposo,
    sistemazione,
    altroSistemazione,
    retribuzione,
    disponibilitaSettimanale,
    tipologiaContratto,
    contrattoDa,
    contrattoAl,
    noteContratto,
    disponibilitaStraordinariCheck,
    notaDisponibilitaStraordinari,
    disponibilitaTrasferte,
    disponibilitaTrasferteCheck,
    personeAutoSufficienti,
  };
  // costanti con il tipo di servizio selezionato
  const isTata = getIdServizio(servizioTCB.cd_dominio_tcb) === ID_SERVIZIO_TATA;
  const isBadante = getIdServizio(servizioTCB.cd_dominio_tcb) === ID_SERVIZIO_BADANTE;

  const etaBambiniState = {
    etaBambini: getCheckboxOptionsEtaBambini(allDatiDisponibilita.data?.EstraiEtaBeneficiari),
  };
  const etaBeneficiari = isTata ? allDatiDisponibilita.data?.EstraiEtaBeneficiari : null;

  const isLibrettoDiFamiglia = tipologiaAssunzione.id === idLibrettoDiFamiglia;

  const isMinoreDiSeiAnni = isTata && etaBambiniState.etaBambini?.filter(el => el.id === idEtaBambini.idMinoreDiSei && el.checked).length;

  const getTariffaBase = (orarioId, livelloContrattualeId, isPiuDiUnaPersonaNonAutosufficiente) => {
    const tariffaMinima = getObjectValue(importiMinimi, `${orarioId}.${livelloContrattualeId}`, 0);
    const imImportoIndennitaTata = getObjectValue(importiMinimi, `${orarioId}.imImportoIndennitaTata`, 0);
    const imImportoIndennitaBadante = getObjectValue(importiMinimi, `${orarioId}.imImportoIndennitaBadante`, 0);

    if (isMinoreDiSeiAnni && isTata) {
      const value = Number.parseFloat(imImportoIndennitaTata + tariffaMinima).toFixed(2);
      return value;
    }
    if (isPiuDiUnaPersonaNonAutosufficiente && isBadante) {
      const value = Number.parseFloat(imImportoIndennitaBadante + tariffaMinima).toFixed(2);
      return value;
    }
    return tariffaMinima;
  };

  const formValidationSchema = yup.object().shape({
    altroSistemazione: yup
      .string()
      .when(
        ['sistemazione'],
        (sistemazione, schema) =>
        sistemazione.includes(0) ?
            schema
              .required()
              .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
            :
            schema
              .nullable()
              .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
      ),
    contrattoAl: yup
    .date()
    .typeError('Formato data non corretto.')
    .when(
      ['tipologiaContratto.id', 'contrattoDa'],
      (idTipologiaContratto, contrattoDa, schema) =>
        idTipologiaContratto === 2 && contrattoDa && moment(contrattoDa).isValid() ?
          schema
            .required()
            .min(contrattoDa, 'Inserire una data maggiore della precedente') :
          schema
    ),
    contrattoDa: yup
      .date()
      .when('tipologiaContratto.id', {
        is: 1 || 2,
        then: yup
          .date()
          .transform(dateTransformer)
          .typeError('Formato data non corretto.')
          .required(),
        otherwise: yup
          .date()
          .transform(dateTransformer)
          .typeError('Formato data non corretto.')
          .required(),
      }).required(),

    disponibilitaTrasferte: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    livelloContrattuale: yup
      .object().shape({
        id: yup.number().integer().required(),
      }).required(),
    notaDisponibilitaStraordinari: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    noteContratto: yup
      .string()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
      .nullable(),
    orario: yup
      .object().shape({
        id: yup.number().integer().required(),
      }).required(),
    oreSettimanali: yup
      .number().integer().min(1, 'ore alla settimana maggiore di 0'),
    personeAutoSufficienti: yup.object()
      .when('livelloContrattuale', (livelloContrattuale, schema) => (
        (
          isBadante && !isLibrettoDiFamiglia &&
          (
            livelloContrattuale?.id === idLivelloContrattuale.livelloDs ||
            livelloContrattuale?.id === idLivelloContrattuale.livelloCs
          )
        ) ?
          schema.shape({ id: yup.number().required('inserire una opzione'), label: yup.string() })
          :
          schema.nullable()
      )),
    retribuzione: yup
      .number()
      .max(999999, "Superato l'importo massimo di 999.999,00 ")
      .when(['orario', 'livelloContrattuale', 'personeAutoSufficienti'], (orario, livelloContrattuale, personeAutoSufficienti, schema) => schema.min(getTariffaBase(orario.id, livelloContrattuale.id, personeAutoSufficienti?.id === idLabelPersoneAutoSufficienti.piuDiUna), 'Inserire una retribuzione valida'))
      .required('Inserire una retribuzione valida')
      .typeError('Inserire una retribuzione valida'),
    sistemazione: yup
      .array()
      .when(
        ['orario.id'],
        (idOrario, schema) =>
          idOrario === CONVIVENZA || idOrario === CONVIVENZA_RIDOTTA ?
            schema
              .of(
                yup.number().integer().min(0)
              )
              .required()
            :
            schema
              .nullable()
      ),
    tipologiaContratto: yup
      .object().shape({
        id: yup.number().integer().required(),
      }).required(),
  });

  const calcolaMaxOre = (ore, id) => {
    let oreMax = null;
    for (let i = 0; i < ore.length; i += 1) {
      if (ore[i].cd_dominio_tcb === id) {
        oreMax = ore[i].nr_valore_max_rif;
        break;
      }
    }
    return oreMax;
  };

  return (
    loaded && (
      <FadeInWrapper fluid>
        <StepTitle
          title="Disponibilità richiesta"
          description={`In questa sezione ti chiediamo di confermare il livello contrattuale che corrisponde alle tue
        esigenze e di dettagliare le informazioni relative alla disponibilità oraria che richiedi al/la
        ${getTCBServiceName(servizioTCB, locale)}.`}
        />
        {loaded ? (
          <Form
            initialDataset={initialFormDataset}
            validationSchema={formValidationSchema}
            validateOnChange
          >
            {
              ({ dataset, isFormValid, touched, setFormField, handleFieldBlur, errors, isFormDirty, setFormFields }) => (
                <>
                  <FormDisponibilita
                    livelliContrattuali={livelliContrattuali.data.estraiConfigurazioniLivelliContrattuali}
                    orariTCB={allDatiDisponibilita.data.tipoOrarioLavoroAll}
                    orario={dataset.orario}
                    livelloContrattuale={dataset.livelloContrattuale}
                    tipologiaAssunzione={tipologiaAssunzione}
                    setFormField={setFormField}
                    servizioTCB={servizioTCB}
                    locale={locale}
                    idServizioTCB={idServizioTCB}
                    setFormFields={setFormFields}
                    maxOre={allDatiDisponibilita.data.EstraiMaxOre}
                  />
                  {(dataset.orario.id === WEEKEND || dataset.orario.id === CONVIVENZA) && (
                    <OreSettimana
                      servizioTCB={servizioTCB}
                      orario={dataset.orario.id}
                      setFormField={setFormField}
                      maxHours={calcolaMaxOre(allDatiDisponibilita.data.EstraiMaxOre, dataset.orario.id)}
                      oreSettimanali={dataset.oreSettimanali}
                      handleFieldBlur={handleFieldBlur}
                      locale={locale}
                      maxOre={allDatiDisponibilita.data.EstraiMaxOre}
                    />
                  )}
                  {
                    dataset.orario.id === CONVIVENZA ? (
                      <MezzaGiornata
                        servizioTCB={servizioTCB}
                        setFormField={setFormField}
                        giorniSettimana={allDatiDisponibilita.data.EstraiGiorniSettimana}
                        mezzaGiornataRiposo={dataset.mezzaGiornataRiposo}
                        handleFieldBlur={handleFieldBlur}
                        locale={locale}
                      />
                    )
                      : null}
                  {
                    dataset.orario.id === CONVIVENZA ||
                      dataset.orario.id === CONVIVENZA_RIDOTTA ? (
                        <SpaziPrevisti
                          spaziPrevisti={allDatiDisponibilita.data.EstraiSistemazione}
                          sistemazione={dataset.sistemazione}
                          altroSistemazione={dataset.altroSistemazione}
                          servizioTCB={servizioTCB}
                          setFormField={setFormField}
                          handleFieldBlur={handleFieldBlur}
                          locale={locale}
                          touched={touched}
                          errors={errors}
                        />
                      )
                      : null}
                  {
                    isTata &&
                      dataset.livelloContrattuale?.id !== idLivelloContrattuale.livelloUnico
                      && !isLibrettoDiFamiglia ? (
                        <EtaBambini
                          disabled
                          state={etaBambiniState}
                          colorTitle="primary"
                          marginTitle="2em 0 1em 0"
                        />
                    )
                      : null
                  }

                  {
                    isBadante && !isLibrettoDiFamiglia &&
                      (
                        dataset.livelloContrattuale?.id === idLivelloContrattuale.livelloDs ||
                        dataset.livelloContrattuale?.id === idLivelloContrattuale.livelloCs
                      ) ? (
                        <PersoneAutoSufficienti
                          handleState={setFormField}
                          state={dataset}
                          colorTitle="primary"
                          marginTitle="2em 0 1em 0"
                        />
                    )
                      : null
                  }

                  { !isLibrettoDiFamiglia ? (
                    <RetribuzioneProposta
                      retribuzione={dataset.retribuzione}
                      orario={dataset.orario}
                      livelloContrattuale={dataset.livelloContrattuale}
                      servizioTCB={servizioTCB}
                      setFormField={setFormField}
                      handleFieldBlur={handleFieldBlur}
                      touched={touched}
                      errors={errors}
                      importiMinimi={importiMinimi}
                      locale={locale}
                      isMinoreDiSeiAnni={isMinoreDiSeiAnni}
                      personeAutoSufficienti={dataset.personeAutoSufficienti}
                      isBadante={isBadante}
                      isLivelloUnico={dataset.livelloContrattuale?.id === idLivelloContrattuale.livelloUnico}
                      getTariffaBase={getTariffaBase}
                      callback={() => { setOpenSimulatore(true); }}
                    />
                  )
                    : null}
                  {
                    dataset.orario.id !== CONVIVENZA &&
                      dataset.orario.id !== WEEKEND ? (
                        <DisponibilitaSettimanale
                          maxHours={calcolaMaxOre(allDatiDisponibilita.data.EstraiMaxOre, dataset.orario.id)}
                          disponibilitaSettimanale={dataset.disponibilitaSettimanale}
                          oreSettimanali={dataset.oreSettimanali}
                          servizioTCB={servizioTCB}
                          orariTCB={allDatiDisponibilita.data.tipoOrarioLavoroAll}
                          orario={dataset.orario}
                          setFormField={setFormField}
                          handleFieldBlur={handleFieldBlur}
                          locale={locale}
                          maxOre={allDatiDisponibilita.data.EstraiMaxOre}
                        />
                      )
                      : null}
                  <TipologiaContratto
                    tipologieContratto={allDatiDisponibilita.data?.EstraiTipologiaContratto}
                    tipologiaContratto={dataset.tipologiaContratto}
                    contrattoDa={dataset.contrattoDa}
                    contrattoAl={dataset.contrattoAl}
                    noteContratto={dataset.noteContratto}
                    servizioTCB={servizioTCB}
                    setFormField={setFormField}
                    handleFieldBlur={handleFieldBlur}
                    touched={touched}
                    errors={errors}
                    locale={locale}
                  />
                  <AltreDisponibilita
                    notaDisponibilitaStraordinari={dataset.notaDisponibilitaStraordinari}
                    disponibilitaTrasferteCheck={dataset.disponibilitaTrasferteCheck}
                    disponibilitaTrasferte={dataset.disponibilitaTrasferte}
                    disponibilitaStraordinariCheck={dataset.disponibilitaStraordinariCheck}
                    idServizioTCB={idServizioTCB}
                    setFormField={setFormField}
                    handleFieldBlur={handleFieldBlur}
                    locale={locale}
                    touched={touched}
                    errors={errors}
                  />
                  <Buttons
                    tipologiaAssunzione={tipologiaAssunzione}
                    dataset={dataset}
                    isFormDirty={isFormDirty}
                    errors={errors}
                    idRichiestaTcb={idRichiestaTcb}
                    moveNext={moveNext}
                    moveBack={moveBack}
                    updateAttributiDomanda={updateAttributiDomanda}
                    stepValidity={isFormValid}
                    stepDomanda={stepDomanda}
                    changeStep={changeStep}
                    onChangeValidation={onChangeValidation}
                    stepCheckValidity={stepCheckValidity}
                    sendRequestTCB={sendRequestTCB}
                    isBadante={isBadante}
                  />
                  <ModaleSimulatoreCosto
                    open={openSimulatore}
                    setOpen={setOpenSimulatore}
                    idServizio={getIdServizio(servizioTCB.cd_dominio_tcb)}
                    tipologiaOrario={dataset.orario ? { id: dataset.orario.id } : null}
                    livelloInquadramento={dataset.livelloContrattuale ? { id: dataset.livelloContrattuale.id } : null}
                    tipologiaContratto={dataset.tipologiaContratto}
                    oreSettimanali={parseInt(parseFloat(dataset.oreSettimanali) + 0.5, 10)} // così perchè deve essere arrotondato per eccesso
                    retribuzioneProposta={dataset.retribuzione}
                    personeAutoSufficienti={dataset.personeAutoSufficienti}
                    userProfile={userProfile}
                    servizioTCB={servizioTCB}
                    etaBeneficiari={dataset.livelloContrattuale?.id !== idLivelloContrattuale.livelloUnico ? etaBeneficiari : null} // se è livello unico non viene passata l'età dei beneficiari
                    locale={locale}
                  />
                </>
              )
            }
          </Form>
        )
          : null}
      </FadeInWrapper>
    )
  );
};

DisponibilitaRichiesta.displayName = 'Disponibilita Richiesta';

export default DisponibilitaRichiesta;
