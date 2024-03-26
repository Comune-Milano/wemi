import { DisponibilitaLavoratoreCandidaturaDAO } from "dao/disponibilitaCandidaturaLavoratore/disponibilitaCandidaturaLavoratoreDAO";
import { ID_SERVIZIO_TATA, ID_SERVIZIO_BADANTE } from "constants/db/servizio_riferimento_tcb";
import { getCalendarValuesObj } from "constants/db/functions"

export const estraiDatiDisponibilitaCandidaturaLavoratore = async (parent, args, context, info) => {
  const disponibilitaLavoratoreCandidaturaDAO = new DisponibilitaLavoratoreCandidaturaDAO(context, args);
  const [
    tipologieOrario,
    tipologieMezzaGiornataDiRiposo,
    convivenzaTipologieStipendioProposto,
    convivenzaTipologieSpaziAccettabili,
    [convivenzaTestoSpazioAccettabileAltro],
    convivenzaRidottaTipologieStipendioProposto,
    convivenzaRidottaTipologieSpaziAccettabili,
    [convivenzaRidottaTestoSpazioAccettabileAltro],
    [convivenzaRidottaCalendario],
    fullTimePartTimeAdOreStipendioProposto,
    [fullTimePartTimeAdOreCalendario],
    assistenzaNotturnaStipendioProposto,
    [assistenzaNotturnaCalendario],
    weekendStipendioProposto,
    [weekendCalendario],
    nrOreSettminali,
    tipologiaContratto,
    [breviTrasferte],
    [lungheTrasferte],
    [vacanzaConLaFamiglia],
    [vacanzaConAssistito],
    [straordinari],
    [lavorareACasaConAnimali],
    [prendereCuraAnimali],
    [lavorareInCasaDiFamiglieNumerose],
    grandezzaDellaCasa,
    accudirePersoneConPatologie,
    sedeDiLavoro,
    [lavoroFuoriMilano],
    [sostituzioniBrevi],
    [sostituzioniLunghe]
  ] = await disponibilitaLavoratoreCandidaturaDAO.estraiDatiDisponibilitaCandidaturaLavoratore();

  const result = {
    tipologieOrario,
    convivenza: {
      tipologieMezzaGiornataDiRiposo,
      tipologieStipendioProposto: convivenzaTipologieStipendioProposto,
      tipologieSpaziAccettabili: convivenzaTipologieSpaziAccettabili,
      testoSpazioAccettabileAltro: convivenzaTestoSpazioAccettabileAltro ? convivenzaTestoSpazioAccettabileAltro.testoAltro : null,
    },
    convivenzaRidotta: {
      tipologieStipendioProposto: convivenzaRidottaTipologieStipendioProposto,
      tipologieSpaziAccettabili: convivenzaRidottaTipologieSpaziAccettabili,
      testoSpazioAccettabileAltro: convivenzaRidottaTestoSpazioAccettabileAltro ? convivenzaRidottaTestoSpazioAccettabileAltro.testoAltro : null,
      calendario: getCalendarValuesObj(convivenzaRidottaCalendario)
    },
    fullTimePartTimeAdOre: {
      tipologieStipendioProposto: fullTimePartTimeAdOreStipendioProposto,
      calendario: getCalendarValuesObj(fullTimePartTimeAdOreCalendario)
    },
    assistenzaNotturna: {
      tipologieStipendioProposto: assistenzaNotturnaStipendioProposto,
      calendario: getCalendarValuesObj(assistenzaNotturnaCalendario)
    },
    weekend: {
      tipologieStipendioProposto: weekendStipendioProposto,
      calendario: getCalendarValuesObj(weekendCalendario)
    },
    nrOreSettminali,
    tipologiaContratto,
    breviTrasferte,
    lungheTrasferte,
    vacanzaConLaFamiglia,
    vacanzaConAssistito,
    straordinari,
    lavorareACasaConAnimali,
    prendereCuraAnimali,
    lavorareInCasaDiFamiglieNumerose,
    grandezzaDellaCasa,
    accudirePersoneConPatologie,
    sedeDiLavoro,
    lavoroFuoriMilano,
    sostituzioniBrevi,
    sostituzioniLunghe
  };

  if (args.input.idServizioRiferimento === ID_SERVIZIO_TATA) {
    const [
      presenzaNotturnaStipendioProposto,
      [presenzaNotturnaCalendario],
      preferenzeGenereAssistito,
      [svegliarsiDiNotte],
      [bambiniDaAccudire],
      fasceEtaBambini
    ] = await disponibilitaLavoratoreCandidaturaDAO.estraiDatiDisponibilitaCandidaturaLavoratoreTata();
    const tempPref = preferenzeGenereAssistito.map(
      el => ({ id: el.id, checked: el.checked, label: el.id === 1 ? 'bambine' : 'bambini' })
    );
    tempPref.push({
      id: 3, checked: !preferenzeGenereAssistito.find(el => el.checked), label: 'Indifferente'
    })
    result.presenzaNotturna = {
      tipologieStipendioProposto: presenzaNotturnaStipendioProposto,
      calendario: getCalendarValuesObj(presenzaNotturnaCalendario)
    };

    result.preferenzeGenereAssistito = tempPref;
    result.svegliarsiDiNotte = svegliarsiDiNotte;
    result.nrMaxBambiniDaAccudire = bambiniDaAccudire ? bambiniDaAccudire.nrMax : 0;
    result.fasceEtaBambini = fasceEtaBambini;
  }

  if (args.input.idServizioRiferimento === ID_SERVIZIO_BADANTE) {
    const [
      presenzaNotturnaStipendioProposto,
      [presenzaNotturnaCalendario],
      preferenzeGenereAssistito,
      [svegliarsiDiNotte],
      [occuparsiDiAnziani],
      [occuparsiDiCoppieDiAnziani]
    ] = await disponibilitaLavoratoreCandidaturaDAO.estraiDatiDisponibilitaCandidaturaLavoratoreBadante();

    result.presenzaNotturna = {
      tipologieStipendioProposto: presenzaNotturnaStipendioProposto,
      calendario: getCalendarValuesObj(presenzaNotturnaCalendario)
    };

    const tempPref = preferenzeGenereAssistito.map(
      el => ({ id: el.id, checked: el.checked, label: el.id === 1 ? 'donne' : 'uomini' })
    );
    tempPref.push({
      id: 3, checked: !preferenzeGenereAssistito.find(el => el.checked), label: 'Indifferente'
    })
    result.preferenzeGenereAssistito = tempPref;
    result.svegliarsiDiNotte = svegliarsiDiNotte;
    result.occuparsiDiAnziani = occuparsiDiAnziani;
    result.occuparsiDiCoppieDiAnziani = occuparsiDiCoppieDiAnziani;
  }

  return result;
};