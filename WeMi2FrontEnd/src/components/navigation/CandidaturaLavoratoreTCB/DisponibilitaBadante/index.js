/** @format */

import React, { useState, useEffect } from 'react';
import { Row } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import { ID_SERVIZIO_BADANTE } from 'types/tcbConstants';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import {
  estraiDatiDisponibilitaCandidaturaLavoratore as estraiDatiDisponibilitaCandidaturaLavoratoreQ,
} from '../partials/graphql/estraiDatiDisponibilitaCandidaturaLavoratore';
import DisponibilitaLavoratoreForm from '../partials/DisponibilitaLavoratoreForm';
import schema from './validationschema';

const DisponibilitaBadante = ({
  idLavoratore,
  idOperatore,
  changeStep,
  stepCandidate,
  locale,
  moveToNextStep,
  moveToPrevStep,
  saveCurrentStep,
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
        idServizioRiferimento: ID_SERVIZIO_BADANTE,
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
          fullTimePartTimeAdOreStipendioProposto: datiCandidaturaLavoratore.fullTimePartTimeAdOre.tipologieStipendioProposto,
          fullTimePartTimeAdOreCalendario: convertBinToObject(datiCandidaturaLavoratore.fullTimePartTimeAdOre.calendario),
          assistenzaNotturnaStipendioProposto: datiCandidaturaLavoratore.assistenzaNotturna.tipologieStipendioProposto,
          assistenzaNotturnaCalendario: convertBinToObject(datiCandidaturaLavoratore.assistenzaNotturna.calendario),
          weekendStipendioProposto: datiCandidaturaLavoratore.weekend.tipologieStipendioProposto,
          nrOreSettminali: datiCandidaturaLavoratore.nrOreSettminali,
          weekendCalendario: convertBinToObject(datiCandidaturaLavoratore.weekend.calendario),
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
          occuparsiDiAnziani: datiCandidaturaLavoratore.occuparsiDiAnziani,
          occuparsiDiCoppieDiAnziani: datiCandidaturaLavoratore.occuparsiDiCoppieDiAnziani,
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
            idServizioRiferimento={ID_SERVIZIO_BADANTE}
            idLavoratore={idLavoratore}
            idOperatore={idOperatore}
            changeStep={changeStep}
            stepCandidate={stepCandidate}
            moveToNextStep={moveToNextStep}
            moveToPrevStep={moveToPrevStep}
            saveCurrentStep={saveCurrentStep}
            navigationTabs={navigationTabs}
          />
        </Form>
      ) : null}
    </Row>
  );
};

DisponibilitaBadante.displayName = 'DisponibilitaBadante';
export default DisponibilitaBadante;
