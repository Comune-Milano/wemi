/** @format */

import React, { useState, useEffect } from 'react';
import { Row } from 'components/ui/Grid';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import { ID_SERVIZIO_TATA } from 'types/tcbConstants';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import yup from 'libs/Form/validation/yup';
import DisponibilitaLavoratoreForm from '../partials/DisponibilitaLavoratoreForm';
import { estraiDatiDisponibilitaCandidaturaLavoratore as estraiDatiDisponibilitaCandidaturaLavoratoreQ } from '../partials/graphql/estraiDatiDisponibilitaCandidaturaLavoratore';
import { formValidationSchema } from './partials/validationSchema';

const DisponibilitaTata = ({
  idLavoratore,
  idOperatore,
  changeStep,
  stepCandidate,
  locale,
  moveToNextStep,
  moveToPrevStep,
  navigationTabs,
}) => {
  const [formData, setFormData] = useState({
    checkboxesTipologieOrario: null,
  });

  const performRequestEstraiDatiCandidaturaLavoratore = useStatelessGraphQLRequest(
    estraiDatiDisponibilitaCandidaturaLavoratoreQ
  );

  useEffect(() => {
    const inputLavoratore = {
      input: {
        idLavoratore,
        idServizioRiferimento: ID_SERVIZIO_TATA,
        locale: `{${locale}}`,
      },
    };

    performRequestEstraiDatiCandidaturaLavoratore(inputLavoratore).then(
      datiCandidaturaLavoratore => {
        setFormData({
          checkboxesTipologieOrario: datiCandidaturaLavoratore.tipologieOrario,
          convivenzaMezzaGiornataDiRiposo: datiCandidaturaLavoratore.convivenza.tipologieMezzaGiornataDiRiposo,
          convivenzaStipendioProposto: datiCandidaturaLavoratore.convivenza.tipologieStipendioProposto,
          convivenzaSpaziAccettabili: datiCandidaturaLavoratore.convivenza.tipologieSpaziAccettabili,
          convivenzaTestoSpazioAccettabileAltro: datiCandidaturaLavoratore.convivenza.testoSpazioAccettabileAltro,
          convivenzaRidottaStipendioProposto: datiCandidaturaLavoratore.convivenzaRidotta.tipologieStipendioProposto,
          convivenzaRidottaSpaziAccettabili: datiCandidaturaLavoratore.convivenzaRidotta.tipologieSpaziAccettabili,
          convivenzaRidottaTestoSpazioAccettabileAltro: datiCandidaturaLavoratore.convivenzaRidotta.testoSpazioAccettabileAltro,
          convivenzaRidottaCalendario: convertBinToObject(datiCandidaturaLavoratore.convivenzaRidotta.calendario),
          weekendCalendario: convertBinToObject(datiCandidaturaLavoratore.weekend.calendario),
          fullTimePartTimeAdOreStipendioProposto: datiCandidaturaLavoratore.fullTimePartTimeAdOre.tipologieStipendioProposto,
          fullTimePartTimeAdOreCalendario: convertBinToObject(datiCandidaturaLavoratore.fullTimePartTimeAdOre.calendario),
          assistenzaNotturnaStipendioProposto: datiCandidaturaLavoratore.assistenzaNotturna.tipologieStipendioProposto,
          assistenzaNotturnaCalendario: convertBinToObject(datiCandidaturaLavoratore.assistenzaNotturna.calendario),
          weekendStipendioProposto: datiCandidaturaLavoratore.weekend.tipologieStipendioProposto,
          nrOreSettminali: datiCandidaturaLavoratore.nrOreSettminali,
          tipologiaContratto: datiCandidaturaLavoratore.tipologiaContratto,
          breviTrasferte: datiCandidaturaLavoratore.breviTrasferte,
          lungheTrasferte: datiCandidaturaLavoratore.lungheTrasferte,
          vacanzaConLaFamiglia: datiCandidaturaLavoratore.vacanzaConLaFamiglia,
          vacanzaConAssistito: datiCandidaturaLavoratore.vacanzaConAssistito,
          straordinari: datiCandidaturaLavoratore.straordinari,
          lavorareACasaConAnimali: datiCandidaturaLavoratore.lavorareACasaConAnimali,
          prendereCuraAnimali: datiCandidaturaLavoratore.prendereCuraAnimali,
          lavorareInCasaDiFamiglieNumerose: datiCandidaturaLavoratore.lavorareInCasaDiFamiglieNumerose,
          grandezzaDellaCasa: datiCandidaturaLavoratore.grandezzaDellaCasa,
          accudirePersoneConPatologie: datiCandidaturaLavoratore.accudirePersoneConPatologie,
          sedeDiLavoro: datiCandidaturaLavoratore.sedeDiLavoro.filter(el => el.id !== 12),
          lavoroFuoriMilano: datiCandidaturaLavoratore.lavoroFuoriMilano,
          sostituzioniBrevi: datiCandidaturaLavoratore.sostituzioniBrevi,
          sostituzioniLunghe: datiCandidaturaLavoratore.sostituzioniLunghe,
          presenzaNotturnaStipendioProposto: datiCandidaturaLavoratore.presenzaNotturna.tipologieStipendioProposto,
          presenzaNotturnaCalendario: convertBinToObject(datiCandidaturaLavoratore.presenzaNotturna.calendario),
          preferenzeGenereAssistito: datiCandidaturaLavoratore.preferenzeGenereAssistito,
          svegliarsiDiNotte: datiCandidaturaLavoratore.svegliarsiDiNotte,
          nrMaxBambiniDaAccudire: datiCandidaturaLavoratore.nrMaxBambiniDaAccudire,
          fasceEtaBambini: datiCandidaturaLavoratore.fasceEtaBambini,
        });
      }
    );
  }, []);

  return (
    <Row fluid>
      {formData.checkboxesTipologieOrario ? (
        <Form
          initialDataset={formData}
          validateOnChange
          validationSchema={formValidationSchema}
        >
          <DisponibilitaLavoratoreForm
            idServizioRiferimento={ID_SERVIZIO_TATA}
            idLavoratore={idLavoratore}
            idOperatore={idOperatore}
            changeStep={changeStep}
            stepCandidate={stepCandidate}
            moveToNextStep={moveToNextStep}
            moveToPrevStep={moveToPrevStep}
            navigationTabs={navigationTabs}
          />
        </Form>
      ) : null}
    </Row>
  );
};

DisponibilitaTata.displayName = 'DisponibilitaTata';
export default DisponibilitaTata;
