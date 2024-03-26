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

  type Slider {
    id: Int!
    title: String
    subtitle: String
    version: Int
    state: State 	
    progressive: Int
    image: Image 	
    link: String
    code: String
    startDate: Timestamp 
    endDate: Timestamp
  }

  type SliderList {
    id: Int!
    title: String
    description: String
    version: Int
    state: State 	
    progressive: Int
    image: Image 	
    link: String
    code: String
    startDate: Timestamp 
    endDate: Timestamp
  }

  type Sliders {
    list: [SliderList]
    total: Int 
  }

  input FiltersSliderContent {
    description: String
    state: Int 
    order: Int
    code: String
  }

  input ContentSlider018 {
    page: Int!
    elementsPerPage: Int! 
    filters: FiltersSliderContent
  }

  input SliderInput018 {
    id: Int
    title: String
    subtitle: String
    progressive: Int
    image: ImageInput 	
    link: String
    code: String
  }

  extend type Query {
    getContentListSlider(params: ContentSlider018!): Sliders! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getAllListSlider: Sliders! 
    getContentSlider(id: Int!): Slider @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    getMaxOrderContentSlider: Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

  extend type Mutation {
    publishContentSlider(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    disableContentSlider(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    saveContentSlider(section: SliderInput018!): Slider @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
  }

`;