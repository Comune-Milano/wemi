import { gql } from 'apollo-server-express';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { AMMINISTRATORE } from 'constants/usercode';

export default gql`

  type Area {
    id: Int!
    title: String
    description: String
    version: Int
    state: State 	
    progressive: Int
    categorie: [CategoryService]
    image: Image 	
    link: String
    code: String
    startDate: Timestamp 
    endDate: Timestamp
    associates: [Section]
  }

  type Areas {
    list: [Area]
    total: Int 
  }

  input FiltersArea {
    description: String
    state: Int 
    order: Int
    code: String
  }

  input ContentArea {
    page: Int!
    elementsPerPage: Int! 
    filters: FiltersArea
  }

  input ImageInput {
    id: Int 
    mime: String
    name: String
    blob: String
  }

  input AreaInput {
    id: Int
    title: String
    description: String
    progressive: Int
    sections: [Int]
    code: String
  }

  extend type Query {
    getMaxOrderArea: Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getContentAreas(params: ContentArea!): Areas! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getAllAreas: Areas! 
    getContentArea(id: Int!): Area @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

  extend type Mutation {
    disableArea(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    publishArea(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    saveArea(area: AreaInput!): Area @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

`;