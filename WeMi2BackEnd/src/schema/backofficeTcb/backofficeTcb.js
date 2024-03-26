/** @format */

import { gql } from "apollo-server-express";
import { AMMINISTRATORE } from "constants/usercode";
import { ENUM_VALIDATOR } from "constants/authorization/validator";
import { UNDER_AUTHORIZATIONS_LIST } from "constants/authorization";

export default gql`

type EstraiRichiesteTcbResult {
  righeTotali: Int!
  results: [RichiesteTcb]
}

type RichiesteTcb {
  codiceRichiestaBase: Int
  codiceRichiesta: Int
  idServizio: Int
  dataRichiesta: Timestamp 
  nomeFamiglia: String
  statoRichiestaFamiglia: String
  lavoratoriAssociati: JSON
  ultimoOperatore: String
  ultimoAggiornamento: Timestamp
  codiceDominioTcb: Int
  statoChiusuraRichiesta: JSON
  notaChiusuraRichiesta: String
  recensioniEnte: [JSON]
  statoDisassociazione: JSON
  jsImpersonificazione: JSON
  isLavoratoreAssociato: Boolean
  tsVariazioneStato: Timestamp
}

input FilterRichiesteTcb {
  richiedente: String
  dataRichiestaDal: String
  dataRichiestaAl: String
  statoRichiesta: String
  idServizio: Int,
  idDomandaBase: String,
  lavoratoreAssociato: String
  idRichiesteAttivitaPending: [Int]
}

type EstraiLavoratoriAssociatiRichiestaTcbResult {
  codiceLavoratore: Int
  nome: String
  cognome: String
  eta: Int 
  nazionalita: String
  statoAssociazione: String
  codiceDominioTcb: Int
  numeroDomandeRifiutate: Int
  numeroDomandeAccettate: Int
  notaRichiesta: String
  statoDisassociazione: JSON
  idServizio: Int
}

type EstraiCandidatureLavoratoriTcbResult {
  righeTotali: Int
  results: [CandidatureLavoratoriTcb]
}

type CandidatureLavoratoriTcb {
  idLavoratore: Int
  dataIscrizione: String
  tipologiaServizio: String
  cognome: String 
  nome: String
  statoOccupazionale: String
  statoCandidatura: String
  ultimoOperatore: String
  dataCambioStato: String
  dataUltimoAggiornamento: Timestamp
  nomeUltimaModifica: String
}

input FilterCandidatureLavoratoriTcb {
  codiceFiscale: String
  cognome: String
  dataCambioStatoDal: String
  dataCambioStatoAl: String
  statoCandidatura: Int
  tipologiaServizio: Int
  statoOccupazionale: Int
  dataAggiornamentoDal: String
  dataAggiornamentoAl: String
}

#The type of the returned for the match with the workers
type DatiMatchRicercaLavoratore{
  id: Int!
  value: String
  type: Int
  pgVisualizzazione: Int
  nrValoreMaxRif: Int
  nrValoreMinRif: Int
}

input MansioneTata {
  idMans: Int
  fasceEtaSelezionate: [Int]
}

input Range {
  min: Int
  max: Int
}

#The input parameters for matching
input MatchingParameters {
  idServizio: Int!
  codiceFiscale: String
  cognome: String
  statoCandidatura: Int
  tipologiaServizio: Int
  patente: Boolean
  automunito: Boolean
  cani: Boolean
  gatti: Boolean
  lavoratorePresenzaAnimali: Boolean
  carattere: [Int]
  corsiTata: [Int]
  corsiBadante: [Int]
  madrelingua: Boolean
  livelloConoscenza: Int
  competenzeTata: [MansioneTata]
  competenzeColf: [Int]
  competenzeBadante: [Int]
  accudimento: [Int]
  tipologiaOrario: Int
  stipendioProposto: Range
  anniEsperienza: Int
  tipoLavoratore: Int
  vacanzaFamiglia: Boolean
  vacanzaAssistito: Boolean
  trasferteBrevi: Boolean
  trasferteLunghe: Boolean
  lavorareFuoriMi: Boolean
  straordinari: Boolean
  # genere: [Int]
  genere: Int
  superficieCasa: Range
  oreSettimanali: [Int]
  oreLavoro: [Int]
  tipologiaContratto: [Int]
  municipi: [Int]
  maxBambini: Int
  mezzaGiornataConvivente: [Int]
  spaziConvivente: [Int]
  spaziConvivenzaRidotta: [Int]
  calendario: [JSON]
  livelliLingua: [JSON]
  votoOperatore: Int
  disponibilitaAnimali: Boolean
}


#The type of return for the matching
type Lavoratori {
  idLavoratore: Int
  count: Int
  tipoServizio: String
  idServizioRichiesta: Int
  cognome: String
  nome: String
  statoOccupazionale: String
  statoCandidatura: String
  ultimoOperatore: String
  dataCambioStato: String
  statoAssociazione: Int
  descrizioneAssociazione: String
  countLavoratoriAssociati: Int
  lavoratoreAssociato: Int
}


extend type Query {
  #Extract all the worker for the matching with domanda
  EstraiMatchRicercaLavoratori(parameters: MatchingParameters, offset: Int!, idRichiesta: Int): [Lavoratori] @auth @protect( roles: [${AMMINISTRATORE}] ) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  #Extract all the data for the filters of the popup for matching the workers 
  EstraiDatiMatchRicercaLavoratore: [DatiMatchRicercaLavoratore] @auth @protect( roles: [${AMMINISTRATORE}] ) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  #Extract all the data for the filter of the table for matching the workers 
  EstraiFiltersMatchingDomandaLavoratore: [DatiMatchRicercaLavoratore] @auth @protect( roles: [${AMMINISTRATORE}] ) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  
  EstraiRichiesteTcb(numeroElementi: Int!, locale: String!, searchFilter: FilterRichiesteTcb): EstraiRichiesteTcbResult @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  EstraiLavoratoriAssociatiRichiestaTcb(locale: String!, codiceRichiesta: Int!): [EstraiLavoratoriAssociatiRichiestaTcbResult] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  EstraiCandidatureLavoratoriTcb(numeroElementi: Int!, locale: String!, searchFilter: FilterCandidatureLavoratoriTcb): EstraiCandidatureLavoratoriTcbResult @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  InvioEmailPromemoriaDisponibilita(idLavoratore: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  EstraiDatiAssociaLavoratoriRichiesta(idRichiesta: Int!, locale: String!): RichiesteTcb @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  AttivitaInPending: JSON @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
}

input InputChiusuraRichiestaTcb {
  codiceRichiestaBase: Int!
  codiceRichiesta: Int!
  codiceMotivoChiusura: Int!
  descrizioneMotivoChiusura: String
}

input InputOffertaLavoratore {
  codiceRichiesta: Int!
  codiceLavoratore: Int!
}

input InputAssociaLavoratoreDomanda {
  codiceRichiestaBase: Int!
  codiceRichiesta: Int!
  codiceLavoratore: Int!
  idServizio: Int!
}


input InputDisassociaLavoratoriDomanda {
  codiceRichiesta: Int!
  codiceMotivoDisassociazione: Int!
  descrizioneMotivoDisassociazione: String
}

input InputAssociaLavoratoreStatoDomanda {
  codiceRichiestaBase: Int!
  codiceRichiesta: Int!
}

input InputDisassociaLavoratore {
  codiceRichiesta: Int!
  codiceLavoratore: Int!
  codiceMotivoDisassociazione: Int!
  descrizioneMotivoDisassociazione: String
}

extend type Mutation {
  #Match the worker to the request TCB
  matchLavoratore(idRichiesta: Int!, idLavoratore: Int!): Boolean @auth @protect( roles: [${AMMINISTRATORE}] ) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])

  #Unmatch the worker to the request TCB
  unmatchLavoratore(idRichiesta: Int!, idLavoratore: Int!): Boolean @auth @protect( roles: [${AMMINISTRATORE}] ) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  
  #Send an email to the worker
  sendPromemoriaDisponibilita(idLavoratore: Int!): Boolean @auth @protect( roles: [${AMMINISTRATORE}] ) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
  
  #Generate a complete pdf of the worker's cv
  saveCompletePdf(idUtenteLav: Int!, pdfBase64: String!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  
  #Generate an anonymous pdf of the worker's cv
  saveAnonymousPdf(idUtenteLav: Int!, pdfBase64: String!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  InserisciChiusuraNegativa(input: InputChiusuraRichiestaTcb!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  InserisciChiusuraPositiva(input: InputChiusuraRichiestaTcb!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}]) 
  DisassociaLavoratore(input: InputDisassociaLavoratore!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  AccettaOffertaLavoratore(input: InputOffertaLavoratore!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  AssociaLavoratoreDomanda(input: InputAssociaLavoratoreDomanda!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  ConfermaAssociazioneLavoratoriDomande(codiceRichiesta: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  DisassociaLavoratoriDomanda(input: InputDisassociaLavoratoriDomanda!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  AssociaLavoratoreStatoDomanda(input: InputAssociaLavoratoreStatoDomanda!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  InvioEmailValutazioneWemiCittadino(codiceRichiesta: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  InvioEmailValutazioneLavoratoreCittadino(codiceRichiesta: Int!, idLavoratore: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
}
`;
