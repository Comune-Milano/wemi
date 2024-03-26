
import React from 'react';
import { Form } from 'libs/Form/components/Form';
import { StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { FadeInWrapper } from 'components/navigation/CandidaturaLavoratoreTCB/partials/FadeInWrapper';
import { getInitialDataset } from './utils/initialDataset';
import { validationSchema } from './utils/validationSchema';
import {
  InputNumberSection,
  Iscrizioni,
  StatoCandidatura,
  NotaOperatore,
  TempoInItalia,
  FeedbackEsperienze,
  DocumentiLavoratore,
  BottoneSalva,
} from './partials';

const DatiOperatore = ({
  locale,
  idLavoratore,
  idOperatore,
  response,
  saveData,
  estraiDocLavoratore,
  arrayInputValutazione,
  arrayInputAnniEsp,
  EsperienzeLavoratore,
  datiOperatoreDb,
}) => (
  <FadeInWrapper fluid>
    <StepTitle title="Area riservata agli amministratori WeMi" />
    <Form
      validateOnChange
      initialDataset={getInitialDataset(datiOperatoreDb)}
      validationSchema={validationSchema}
    >
      <TempoInItalia />
      {/* Sezione anni esperienza */}
      <InputNumberSection
        title="Anni esperienza"
        input={arrayInputAnniEsp()}
      />
      <Iscrizioni />
      {/* Sezione voto esperienza */}
      <InputNumberSection
        title="Valutazione operatore esperienza"
        input={arrayInputValutazione()}
      />
      <StatoCandidatura />
      <NotaOperatore />
      <FeedbackEsperienze
        idLavoratore={idLavoratore}
        esperienzeLav={EsperienzeLavoratore}
      />
      <DocumentiLavoratore
        idUtenteLav={idLavoratore}
      />
      <BottoneSalva
        idLavoratore={idLavoratore}
        idOperatore={idOperatore}
        response={response}
        estraiDocLavoratore={estraiDocLavoratore}
        saveData={saveData}
      />
    </Form>
  </FadeInWrapper>
  );

DatiOperatore.displayName = 'DatiOperatore';

export default DatiOperatore;
