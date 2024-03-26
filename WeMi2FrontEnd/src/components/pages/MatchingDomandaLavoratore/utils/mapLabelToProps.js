import { labelCalendario, labelCheckboxListDatiPersonali, labelCorsiTata, labelMadrelingua, labelCompetenzeTata, labelCompetenzeColf, labelCompetenzeBadante, labelFasceEta, labelAccudimento, labelStipendioProposto, labelAnniEsperienza, labelCheckboxListDisponibilita, labelAltriValori, labelSpaziLavoratore, labelCarattere, labelCorsiBadante, labelTipologiaOrario } from 'components/pages/MatchingDomandaLavoratore/labels';
import { convertObjectToBin } from 'components/ui2/WeekCalendarTimePicker/utils/converter';

export const mapFiltersTableToProps = (filtersTable) => {
  const { statoCandidatura, codiceFiscale, tipologiaServizio, cognome } = filtersTable;
  const filtroStatoCandidatura = statoCandidatura && statoCandidatura.hasOwnProperty('id') ? statoCandidatura.id : undefined;
  const filtroTipologiaServizio = tipologiaServizio && tipologiaServizio.hasOwnProperty('id') ? tipologiaServizio.id : undefined;

  return {
    statoCandidatura: filtroStatoCandidatura,
    codiceFiscale,
    tipologiaServizio: filtroTipologiaServizio,
    cognome,
  };
};


/**
 *
 * @param {Object} labels
 */
export const mapLabelToProps = (labels) => {
  const {
    [labelCheckboxListDatiPersonali.patente]: patente,
    [labelCheckboxListDatiPersonali.automunito]: automunito,
    [labelCheckboxListDatiPersonali.cani]: cani,
    [labelCheckboxListDatiPersonali.gatti]: gatti,
    [labelCheckboxListDatiPersonali.lavoratorePresenzaAnimali]: lavoratorePresenzaAnimali,
    [labelCheckboxListDatiPersonali.disponibilitaAnimali]: disponibilitaAnimali, 
    [labelCarattere]: carattere,
    [labelCorsiTata]: corsiTata,
    [labelCorsiBadante]: corsiBadante,
    [labelMadrelingua.madrelingua]: madrelingua,
    [labelMadrelingua.livelloConoscenzaLingua]: livelloConoscenza,
    [labelCompetenzeTata]: competenzeTata,
    [labelCompetenzeColf]: competenzeColf,
    [labelCompetenzeBadante]: competenzeBadante,
    [labelAccudimento]: accudimento,
    [labelTipologiaOrario]: tipologiaOrario,
    [labelStipendioProposto]: stipendioProposto,
    [labelAnniEsperienza.anniEsperienza]: anniEsperienza,
    [labelAnniEsperienza.workerType]: tipoLavoratore,
    [labelCheckboxListDisponibilita.vacanzaFamiglia]: vacanzaFamiglia,
    [labelCheckboxListDisponibilita.vacanzaAssistito]: vacanzaAssistito,
    [labelCheckboxListDisponibilita.trasferteBrevi]: trasferteBrevi,
    [labelCheckboxListDisponibilita.trasferteLunghe]: trasferteLunghe,
    [labelCheckboxListDisponibilita.lavorareFuoriMilano]: lavorareFuoriMi,
    [labelCheckboxListDisponibilita.straordinari]: straordinari,
    [labelAltriValori.genere]: genere,
    [labelAltriValori.superficie]: superficieCasa,
    [labelAltriValori.oraSettimanale]: oreSettimanali,
    [labelAltriValori.orarioLavoro]: oreLavoro,
    [labelAltriValori.tipologiaContratto]: tipologiaContratto,
    [labelAltriValori.municipio]: municipi,
    [labelAltriValori.maxBambini]: maxBambini,
    [labelAltriValori.votoOperatore]: votoOperatore,
    [labelSpaziLavoratore.mezzagiornata]: mezzaGiornataConvivente,
    [labelSpaziLavoratore.spazioConvivente]: spaziConvivente,
    [labelSpaziLavoratore.spazioConvivenzaRidotta]: spaziConvivenzaRidotta,
    [labelCalendario]: calendario,
    [labelMadrelingua.livelliLingua]: livelliLingua,
    [labelFasceEta]: fasceEta,
  } = labels;

  const parameters = {
    patente,
    automunito,
    cani,
    gatti,
    lavoratorePresenzaAnimali,
    disponibilitaAnimali,
    carattere,
    corsiTata,
    corsiBadante,
    madrelingua,
    livelloConoscenza,
    competenzeTata,
    fasceEta,
    competenzeColf,
    competenzeBadante,
    accudimento,
    tipologiaOrario: tipologiaOrario ? tipologiaOrario.id : undefined,
    stipendioProposto: stipendioProposto ? { max: stipendioProposto.value, min: stipendioProposto.min } : undefined,
    anniEsperienza,
    tipoLavoratore: tipoLavoratore ? tipoLavoratore.id : undefined,
    idServizio: tipoLavoratore ? tipoLavoratore.id + 999996 : undefined,
    vacanzaFamiglia,
    vacanzaAssistito,
    trasferteBrevi,
    trasferteLunghe,
    lavorareFuoriMi,
    straordinari,
    genere: genere ? genere.id : undefined,
    superficieCasa: superficieCasa ? { max: superficieCasa.value, min: superficieCasa.min } : undefined,
    oreSettimanali,
    oreLavoro,
    tipologiaContratto,
    municipi,
    maxBambini: parseInt(maxBambini, 10),
    mezzaGiornataConvivente,
    spaziConvivente,
    spaziConvivenzaRidotta,
    calendario: convertObjectToBin(calendario),
    livelliLingua,
    votoOperatore,
  };

  return parameters;
};
