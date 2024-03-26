import { gql } from 'apollo-server-express';
import { AMMINISTRATORE } from 'constants/usercode';

export default gql`
    
    type TipologiaContenuto {
        id: Int!
        ty_contenuto: String
      }

    extend type Query {
        tipologiaContenutoAll: [TipologiaContenuto] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
        tipologiaContenutoPK (id: ID!): TipologiaContenuto @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
    }

`;
