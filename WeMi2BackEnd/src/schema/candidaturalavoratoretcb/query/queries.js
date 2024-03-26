import { LAVORATORE, AMMINISTRATORE, CITTADINO } from "constants/usercode";
import { ENUM_VALIDATOR } from "constants/authorization/validator";
import { UNDER_AUTHORIZATIONS_LIST } from "constants/authorization";

export const queries = ` extend type Query {
  EstraiDatiAnagraficiFormFieldsValues: DatiAnagraficiFormFieldsValues @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}])
  estraiDati002(idUtente: Int!, cdAttributo: Int): Dati002 @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtente")
  estraiStepsLavoratoreTCB(idUtenteLav: Int!): DatiStepsLavoratoreTCBOut  @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE},${CITTADINO}])
  estraiStatoCandidatura(idUtenteLav: Int!): StatoCandidatura #Libera
  estraiDati003(input : inputEstraiDati003) : [Dati003] @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtente")
  estraiDatiCompetenzeTata(idUtenteLav: Int!): DatiCompetenzeTata @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtenteLav")
  estraiDatiCompetenzeColf(idUtenteLav: Int!): DatiCompetenzeColf @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtenteLav") 
  estraiDatiCompetenzeBadante(idUtenteLav: Int!): DatiCompetenzeBadante @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtenteLav")
  estraiDati005 (input: inputEstraiDati005): [Dati005] @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtente")
  estraiDatiSummary(idUtente: Int): [DatiSummary] @auth @protect(roles: [${LAVORATORE},${CITTADINO},${AMMINISTRATORE}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtente")
  estraiDatiPartials: JSON @auth @protect(roles: [${LAVORATORE},${CITTADINO}, ${AMMINISTRATORE}])
  estraiDati0016(input: inputEstraiDati0016): [Dati0016] @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idUtente")
  estraiDatiDisponibilitaCandidaturaLavoratore(input: inputEstraiDatiDisponibilitaCandidaturaLavoratore!): JSON @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"input.idLavoratore")
  estraiEsperienzeLavoratore(idUtenteLav: Int!): [EsperienzeLavoratore] @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtenteLav")
  estraiFlagsCandidatura(idUtente: Int!): FlagsCandidatura @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtente")
  estraiDatiOperatore(idUtenteLav: Int!, arrayIdServizi: [Int]!): DatiOperatore @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  estraiDocumentiLavoratore(idUtenteLav: Int!): DatiOperatore @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  estraiFileLavoratore(idUtenteLav: Int!, idAllegato: Int!): String @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")  @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
  estraiCurriculumLavoratore(idUtenteLav: Int!, idServizio: Int!, brandColor: String, anonymous: Boolean, logoWemi: Boolean): JSON! @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtenteLav")
  estraiServiziTcbCandidaturaLavoratore(idUtenteLav: Int!): JSON! @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: "${ENUM_VALIDATOR.CANDIDATURA_TCB.code}", argsKey:"idUtenteLav")
}`;