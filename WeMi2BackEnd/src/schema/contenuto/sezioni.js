import { gql } from 'apollo-server-express';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { AMMINISTRATORE } from 'constants/usercode';

export default gql`

  type State {
    id: Int 
    description: String
  }

  type Image {
    id: Int 
    path: String
    name: String
    mime: String
  }

  type Section {
    id: Int
    title: String
    description: String
    version: Int
    state: State 	
    progressive: Int
    color: String
    image: Image 	
    link: String
    code: String
    startDate: Timestamp 
    endDate: Timestamp
  }

  type Sections {
    list: [Section]
    total: Int 
  }

  input FiltersSection {
    description: String
    state: Int 
    order: Int
    code: String
  }

  input ContentSection {
    page: Int!
    elementsPerPage: Int! 
    filters: FiltersSection
  }

  input ImageInput {
    id: Int 
    mime: String
    name: String
    blob: String
  }

  input SectionInput {
    id: Int
    title: String
    description: String
    progressive: Int
    image: ImageInput 	
    link: String
    code: String
  }

  extend type Query {
    getMaxOrderSection: Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getContentSections(params: ContentSection!): Sections! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getAllSections: Sections! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getContentAllSections: Sections!
    getContentSection(id: Int!): Section @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

  extend type Mutation {
    disableSection(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    publishSection(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    saveSection(section: SectionInput!): Section @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

`;