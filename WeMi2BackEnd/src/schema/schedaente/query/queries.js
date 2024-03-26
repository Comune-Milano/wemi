import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { AMMINISTRATORE, OPERATORE_ENTE, AMMINISTRATORE_ENTE } from 'constants/usercode';

export const queries = `

extend type Query {
  checkDeleteSecondaryOfficeCard(offices: [InputOffice], institutionId: Int): [Location] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}])
  checkInsertOperatorCard(users: [InputUser], institutionId: Int): [User] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}])
  checkDeleteOperatorCard(users: [InputUser], institutionId: Int): [User] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}])
  getInstitutionCard: SchedaEnte @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}])
  getInstitutionCardAdmin(institutionId: Int!): SchedaEnte @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT}])
}

`;