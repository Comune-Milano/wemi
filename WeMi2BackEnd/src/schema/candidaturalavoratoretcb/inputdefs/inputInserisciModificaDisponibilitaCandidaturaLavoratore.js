export const inputInserisciModificaDisponibilitaCandidaturaLavoratore =  `
input inputInserisciModificaDisponibilitaCandidaturaLavoratore {
  idLavoratore: Int!
  idServizioRiferimento: Int!
  checkboxesTipologieOrario: [JSON]
  convivenzaMezzaGiornataDiRiposo: [JSON]
  convivenzaStipendioProposto: [JSON]
  convivenzaSpaziAccettabili: [JSON]
  convivenzaTestoSpazioAccettabileAltro: String
  convivenzaRidottaStipendioProposto: [JSON]
  convivenzaRidottaSpaziAccettabili: [JSON]
  convivenzaRidottaTestoSpazioAccettabileAltro: String
  convivenzaRidottaCalendario: [JSON]
  fullTimePartTimeAdOreStipendioProposto: [JSON]
  fullTimePartTimeAdOreCalendario: [JSON]
  assistenzaNotturnaStipendioProposto: [JSON]
  assistenzaNotturnaCalendario: [JSON]
  weekendStipendioProposto: [JSON]
  weekendCalendario: [JSON]
  presenzaNotturnaStipendioProposto: [JSON]
  presenzaNotturnaCalendario: [JSON]
  nrOreSettminali: [JSON]
  tipologiaContratto: [JSON]
  breviTrasferte: JSON
  lungheTrasferte: JSON
  vacanzaConLaFamiglia: JSON
  vacanzaConAssistito: JSON
  straordinari: JSON
  lavorareACasaConAnimali: JSON
  prendereCuraAnimali: JSON
  lavorareInCasaDiFamiglieNumerose: JSON
  grandezzaDellaCasa: [JSON]
  accudirePersoneConPatologie: [JSON]
  sedeDiLavoro: [JSON]
  lavoroFuoriMilano: JSON
  sostituzioniBrevi: JSON
  sostituzioniLunghe: JSON
  preferenzeGenereAssistito: [JSON]
  svegliarsiDiNotte: JSON
  nrMaxBambiniDaAccudire: Int
  fasceEtaBambini: [JSON]
  occuparsiDiAnziani: JSON
  occuparsiDiCoppieDiAnziani: JSON
}
`;
