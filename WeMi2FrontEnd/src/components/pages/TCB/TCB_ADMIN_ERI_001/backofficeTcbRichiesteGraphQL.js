/** @format */

export const EstraiRichiesteTcb = [
  "",
  `query EstraiRichiesteTcb($numeroElementi: Int!, $locale: String!, $searchFilter: FilterRichiesteTcb) {
    EstraiRichiesteTcb(numeroElementi: $numeroElementi, locale: $locale, searchFilter: $searchFilter) {
      righeTotali
      results {
        codiceRichiestaBase
        codiceRichiesta
        idServizio
        dataRichiesta
        nomeFamiglia
        statoRichiestaFamiglia
        lavoratoriAssociati
        ultimoOperatore
        ultimoAggiornamento
        codiceDominioTcb
        statoChiusuraRichiesta
        notaChiusuraRichiesta
        recensioniEnte
        statoDisassociazione
        jsImpersonificazione
        tsVariazioneStato
      }
    }
  }`,
  "EstraiRichiesteTcb"
];

export const InserisciChiusuraNegativa = [
  "",
  `mutation InserisciChiusuraNegativa($input: InputChiusuraRichiestaTcb!) {
    InserisciChiusuraNegativa(input: $input)
  }`,
  "InserisciChiusuraNegativa"
];

export const InserisciChiusuraPositiva = [
  "",
  `mutation InserisciChiusuraPositiva($input: InputChiusuraRichiestaTcb!) {
    InserisciChiusuraPositiva(input: $input)
  }`,
  "InserisciChiusuraPositiva"
];

export const DisassociaLavoratoriDomanda = [
  "",
  `mutation DisassociaLavoratoriDomanda($input: InputDisassociaLavoratoriDomanda!) {
    DisassociaLavoratoriDomanda(input: $input)
  }`,
  "DisassociaLavoratoriDomanda"
];

export const InvioEmailValutazioneWemiCittadino = [
  "",
  `mutation InvioEmailValutazioneWemiCittadino($codiceRichiesta: Int!) {
    InvioEmailValutazioneWemiCittadino(codiceRichiesta: $codiceRichiesta)
  }`,
  "InvioEmailValutazioneWemiCittadino"
];

export const InvioEmailValutazioneLavoratoreCittadino = [
  "",
  `mutation InvioEmailValutazioneLavoratoreCittadino($codiceRichiesta: Int!, $idLavoratore: Int!) {
    InvioEmailValutazioneLavoratoreCittadino(codiceRichiesta: $codiceRichiesta, idLavoratore: $idLavoratore)
  }`,
  "InvioEmailValutazioneLavoratoreCittadino"
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

export const AssociaLavoratoreStatoDomanda = [
  "",
  `mutation AssociaLavoratoreStatoDomanda($input: InputAssociaLavoratoreStatoDomanda!) {
    AssociaLavoratoreStatoDomanda(input: $input)
  }`,
  "AssociaLavoratoreStatoDomanda"
];

export const AttivitaInPending = [
  "",
  `query AttivitaInPending {
    AttivitaInPending
  }`,
  "AttivitaInPending"
];
