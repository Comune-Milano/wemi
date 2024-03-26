/** @format */

import React, { useState, useEffect } from 'react';
import { Row } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import { ID_SERVIZIO_COLF } from 'types/tcbConstants';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import {
  estraiDatiDisponibilitaCandidaturaLavoratore as estraiDatiDisponibilitaCandidaturaLavoratoreQ,
} from '../partials/graphql/estraiDatiDisponibilitaCandidaturaLavoratore';
import DisponibilitaLavoratoreForm from '../partials/DisponibilitaLavoratoreForm';
import schema from './validationschema';

const DisponibilitaColf = ({
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
        idServizioRiferimento: ID_SERVIZIO_COLF,
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
          sostituzioniBrevi: datiCandidaturaLavoratore.sostituzioniBrevi,
          sostituzioniLunghe: datiCandidaturaLavoratore.sostituzioniLunghe,
          accudirePersoneConPatologie: datiCandidaturaLavoratore.accudirePersoneConPatologie,
          sedeDiLavoro: datiCandidaturaLavoratore.sedeDiLavoro.filter(el => el.id !== 12),
          lavoroFuoriMilano: datiCandidaturaLavoratore.lavoroFuoriMilano,
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
          validationSchema={schema}
        >
          <DisponibilitaLavoratoreForm
            idServizioRiferimento={ID_SERVIZIO_COLF}
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

DisponibilitaColf.displayName = 'DisponibilitaColf';
export default DisponibilitaColf;
