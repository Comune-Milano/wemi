const getLavoratoriQueryName = 'EstraiMatchRicercaLavoratori';

export const getLavoratori = [
  '',
  `query ${getLavoratoriQueryName}($offset: Int!, $parameters: MatchingParameters, $idRichiesta: Int){
    ${getLavoratoriQueryName}(offset: $offset, parameters: $parameters, idRichiesta: $idRichiesta){
      idLavoratore
      tipoServizio
      idServizioRichiesta
      cognome
      nome
      statoOccupazionale
      statoCandidatura
      ultimoOperatore
      dataCambioStato
      count
      statoAssociazione  
      descrizioneAssociazione
      countLavoratoriAssociati
      lavoratoreAssociato
      }
    }
`,
  getLavoratoriQueryName,
];
