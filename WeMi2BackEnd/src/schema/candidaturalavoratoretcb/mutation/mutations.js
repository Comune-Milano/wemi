import { LAVORATORE, AMMINISTRATORE, CITTADINO } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export const mutations = ` extend type Mutation{
  inserisciModificaDati002(input : inputInserisciModificaDati002):Boolean @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.id_utente")
  aggiornaStepsLavoratoreTCB(idUtenteLav: Int!, steps: DatiStepsLavoratoreTCB!): DatiStepsLavoratoreTCBOut @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtenteLav")
  inizializzaUtenteLav: Boolean! @auth @protect(roles: [${AMMINISTRATORE},${LAVORATORE},${CITTADINO}])
  inizializzaUtenteLavImpersonificazione(idUtente: Int,jsImpersonificazione: JSON): Boolean! @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  inserisciDati003(input : inputInserisciDati003): Boolean! @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtente")
  inserisciItalianoIstruzioneFormazione(input : inputItalianoIstruzioneFormazione): Boolean @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtente")
  inserisciLingueEstere003(input : inputInserisciLingueEstere003):Boolean @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtente")
  deleteLingueEstere003(input : inputDeleteLingueEstere003): Boolean @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtente")
  inserisciModificaAttributoOffertaServizio(idUtenteLav: Int!, idServizioRif: Int!, flagCandidatura: Boolean!, arrayAttrOffertaServizio: [attrOffertaServizio]): Boolean @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtenteLav")
  inserisciDati005(input : inputInserisciDati005): Boolean @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtente")
  updateFlagsCandidatura(idUtente: Int!, flags: inputFlagsCandidatura!): FlagsCandidatura! @auth @protect(roles: [${LAVORATORE},${CITTADINO},${AMMINISTRATORE}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtente")
  
  inizializzaModificaEsperienzeLavoratore(input: esperienzaInput!): Int @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtenteLav")
  rimuoviEsperienzeLavoratore(idRichiesta: Int!): Boolean @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.RICHIESTA_TCB.code}", argsKey:"idRichiesta")
  
  #Deletes the candidacy of the Worker
  deleteCandidacy(idLavoratore: Int): Boolean @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idLavoratore")

  #Sends the candidacy of the Worker
  sendCandidacyRequest(idLavoratore: Int): Boolean @auth @protect(roles: [${LAVORATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idLavoratore") 

  inserisciDati0016(input: inputInserisciDati0016): Boolean @auth @protect(roles: [${LAVORATORE},${CITTADINO},${AMMINISTRATORE}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtente")
  inserisciModificaDisponibilitaCandidaturaLavoratore(input: inputInserisciModificaDisponibilitaCandidaturaLavoratore): Boolean @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idLavoratore")

  inserisciDatiOperatore(input: inputDatiOperatore): JSON @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  inserisciModificaFototessera(input : inputInserisciModificaFototessera): JSON @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtente")
}
`;