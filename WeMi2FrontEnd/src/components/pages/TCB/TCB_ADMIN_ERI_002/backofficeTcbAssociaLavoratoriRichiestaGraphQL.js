/** @format */

export const EstraiLavoratoriAssociatiRichiestaTcb = [
  "",
  `query EstraiLavoratoriAssociatiRichiestaTcb($locale: String!, $codiceRichiesta: Int!) {
    EstraiLavoratoriAssociatiRichiestaTcb(locale: $locale, codiceRichiesta: $codiceRichiesta) {
      codiceLavoratore
      nome
      cognome
      eta 
      nazionalita
      statoAssociazione
      codiceDominioTcb
      numeroDomandeRifiutate
      numeroDomandeAccettate
      notaRichiesta
      statoDisassociazione
      idServizio
    }
  }`,
  "EstraiLavoratoriAssociatiRichiestaTcb"
];

export const DisassociaLavoratore = [
  "",
  `mutation DisassociaLavoratore($input: InputDisassociaLavoratore!) {
    DisassociaLavoratore(input: $input)
  }`,
  "DisassociaLavoratore"
];

export const AccettaOffertaLavoratore = [
  "",
  `mutation AccettaOffertaLavoratore($input: InputOffertaLavoratore!) {
    AccettaOffertaLavoratore(input: $input)
  }`,
  "AccettaOffertaLavoratore"
];

export const AssociaLavoratoreDomanda = [
  "",
  `mutation AssociaLavoratoreDomanda($input: InputAssociaLavoratoreDomanda!) {
    AssociaLavoratoreDomanda(input: $input)
  }`,
  "AssociaLavoratoreDomanda"
];

export const ConfermaAssociazioneLavoratoriDomande = [
  "",
  `mutation ConfermaAssociazioneLavoratoriDomande($codiceRichiesta: Int!) {
    ConfermaAssociazioneLavoratoriDomande(codiceRichiesta: $codiceRichiesta)
  }`,
  "ConfermaAssociazioneLavoratoriDomande"
];

export const saveCompletePdf = [
  '',
  `mutation saveCompletePdf($idUtenteLav: Int!, $pdfBase64: String!)
  {
    saveCompletePdf(idUtenteLav: $idUtenteLav, pdfBase64: $pdfBase64)
   }`,
];

export const saveAnonymousPdf = [
  '',
  `mutation saveAnonymousPdf($idUtenteLav: Int!, $pdfBase64: String!)
  {
    saveAnonymousPdf(idUtenteLav: $idUtenteLav, pdfBase64: $pdfBase64)
   }`,
];

export const EstraiDatiAssociaLavoratoriRichiesta = [
  '',
  `query EstraiDatiAssociaLavoratoriRichiesta($idRichiesta: Int!, $locale: String!) {
    EstraiDatiAssociaLavoratoriRichiesta(idRichiesta: $idRichiesta, locale: $locale) {
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
      isLavoratoreAssociato
    }
  }`,
  'EstraiDatiAssociaLavoratoriRichiesta',
];
