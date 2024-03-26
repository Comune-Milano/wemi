import { gql } from 'apollo-server-express';
import { AMMINISTRATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`
    
    type TipologiaContenuto {
        id: Int!
        ty_contenuto: String
      }

    extend type Query {
        tipologiaContenutoAll: [TipologiaContenuto] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        tipologiaContenutoPK (id: ID!): TipologiaContenuto @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    }

`;
