import { gql } from 'apollo-server-express';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { AMMINISTRATORE } from 'constants/usercode';

export default gql`

input FiltersUserListInput {
  surname: String
  name: String
  startValidDate: Date 
  endValidDate: Date 
  username: String
  email: String
  profile: String 
  order: Int 
  elementsNumber: Int! 
  page: Int! 
}

type Profile {
  code: String
  description: String
}

type Authorization {
  code: Int 
  description: String
}

type UsersManagerRow {
  idUtente: Int
  profile: Profile
  privacy: String
  fiscalCode: String
  username: String
  codana: String
  operatoreEnte: Int
  flag: String
  email: String
  name: String
  surname: String
  personalData: JSON
  authorizations: [Authorization]
  startValidDate: Date
  endValidDate: Date
  dateLastModified: Timestamp
  userLastModified: UsersManagerRow
}

type UsersManager {
  data: [UsersManagerRow]
  totalRows: Int
}

input UserAuthorizationInput {
  code: Int!
}

input UserAuthorizationsInput {
  userId: Int!
  profileCode: String!
  startValidityDate: Date
  endValidityDate: Date
  authorizations: [UserAuthorizationInput]
}

input UserDeleteAuthorizationsInput {
  userId: Int!
  authorization: UserAuthorizationInput
}


type Profile {
  code: String
  description: String
}

extend type Query {
  getUserList(filters: FiltersUserListInput): UsersManager @auth @protect(roles: [${AMMINISTRATORE}])  @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT}])
  getUserDetail(userId: Int!): UsersManagerRow @auth @protect(roles: [${AMMINISTRATORE}])  @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT}])
  getUserAuthorizations(userId: Int!): [Authorization] @auth @protect(roles: [${AMMINISTRATORE}])  @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT}])
  getProfiles: [Profile] @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT}])
}

extend type Mutation {
  deleteUserAuthorization(userAuthorizations: UserDeleteAuthorizationsInput!): UsersManagerRow @auth @protect(roles: [${AMMINISTRATORE}])  @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT}])
  saveUserAuthorization(userAuthorizations: UserAuthorizationsInput!): UsersManagerRow @auth @protect(roles: [${AMMINISTRATORE}])  @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT}])
}
`;
