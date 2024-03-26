import { gql } from 'apollo-server-express';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { AMMINISTRATORE } from 'constants/usercode';

export default gql`

  type ServiceState {
    id: Int 
    description: String
  }

  type ServiceImage {
    id: Int 
    path: String
    name: String
    mime: String
  }

  type AssociateContent {
    id: Int
    title: String
    type: Int
  }

  type ServiceContent {
    id: Int
    title: String
    description: String
    version: Int
    associates: [AssociateContent]
    catAccreditamento: String
    tags: String
    state: ServiceState 	
    progressive: Int
    priceUnit: Int
    accreditationCategory: Int
    color: String
    image: ServiceImage 	
    link: String
    code: String
    startDate: Timestamp 
    endDate: Timestamp
  }

  type Services {
    list: [ServiceContent]
    total: Int 
  }

  input FiltersService {
    description: String
    state: Int 
    order: Int
    code: String
  }

  input ContentService {
    page: Int!
    elementsPerPage: Int! 
    filters: FiltersService
  }

  input ServizioInput {
    id: Int
    title: String
    description: String
    categoriaAccreditamento: Int
    unitaPrezzo: Int
    txTagsRicerca: String
    progressive: Int
    associates: [JSON]
    code: String
  }

  extend type Query {
    getContentServices(params: ContentService!): Services! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getContentService(id: Int!): ServiceContent @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getMaxOrderService: Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

  extend type Mutation {
    disableServiceContent(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    publishServiceContent(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    saveContentService(service: ServizioInput!): ServiceContent @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }
`;