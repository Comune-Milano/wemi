import { gql } from 'apollo-server-express';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { AMMINISTRATORE } from 'constants/usercode';

export default gql`

  type SliderState {
    id: Int 
    description: String
  }

  type SliderImage {
    id: Int 
    path: String
    name: String
    mime: String
  }

  type SliderFinancialEducation {
    id: Int!
    title: String
    description: String
    version: Int
    order: Int
    state: State 	
    progressive: Int
    image: SliderImage 	
    link: String
    code: String
    startDate: Timestamp 
    endDate: Timestamp
  }

  type SlidersFinancialEducation {
    list: [SliderFinancialEducation]
    total: Int 
  }

  input FiltersSlider {
    description: String
    state: Int 
    order: Int
    code: String
  }

  input ContentSlider {
    page: Int!
    elementsPerPage: Int! 
    filters: FiltersSlider
  }

  input PublishContentSlider {
    filters: FiltersSlider
  }

  input SliderImageInput {
    id: Int 
    mime: String
    name: String
    blob: String
  }

  input SliderInput {
    id: Int
    title: String
    description: String
    progressive: Int
    image: SliderImageInput 	
    link: String
    code: String
  }

  extend type Query {
    getMaxOrderTextualValuesSlider: SliderFinancialEducation @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getSlidersFinancialEducation(params: ContentSlider!): SlidersFinancialEducation! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    EstraiSliderEducazioneFinanziaria(params: PublishContentSlider!): SlidersFinancialEducation! #Libera
    getSliderFinancialEducation(id: Int!): SliderFinancialEducation @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

  extend type Mutation {
    disableSlider(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    publishSlider(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    saveSlider(content: SliderInput!): SliderFinancialEducation @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

`;