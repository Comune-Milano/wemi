
export const EstraiCandidatureLavoratoriTcb = [
  "",
  `query EstraiCandidatureLavoratoriTcb($numeroElementi: Int!, $locale: String!, $searchFilter: FilterCandidatureLavoratoriTcb) {
    EstraiCandidatureLavoratoriTcb(numeroElementi: $numeroElementi, locale: $locale, searchFilter: $searchFilter) {
      righeTotali
      results {
        idLavoratore
        dataIscrizione
        tipologiaServizio
        cognome 
        nome
        statoOccupazionale
        statoCandidatura
        ultimoOperatore
        dataCambioStato
        dataUltimoAggiornamento
        nomeUltimaModifica
      }
    }
  }`,
  "EstraiCandidatureLavoratoriTcb"
];

export const DominioTcbByTipoTcb = [
  "",
  `query dominioTcbByTipoTcb($ty_dominio_tcb: Float!) {
    dominioTcbByTipoTcb(ty_dominio_tcb: $ty_dominio_tcb) {
      value,
      textValue
    }
  }`,
  "dominioTcbByTipoTcb"
];
