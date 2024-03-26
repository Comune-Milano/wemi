import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { AMMINISTRATORE_ENTE, OPERATORE_ENTE, AMMINISTRATORE } from 'constants/usercode';

export const mutation = ` 
extend type Mutation {
  forwardNotesInstitutionCard(input: InputForwardNotes!, others: InputInstitutionCard!): ForwardNotes @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT}])
  saveInstitutionCardAdmin(input: InputInstitutionCard!, notes: InputNotes): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT}]) 
  saveInstitutionCard(input: InputInstitutionCard!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) 
  validateInstitutionCard(input: InputInstitutionCard!, notes: InputNotes): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT}]) 
  forwardInstitutionCard(input: InputInstitutionCard!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) 
  deactivateInstitutionCard(input: InputInstitutionCard!, notes: InputNotes): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT}])
}
`;