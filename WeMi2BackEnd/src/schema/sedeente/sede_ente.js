/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE_ENTE, OPERATORE_ENTE, AMMINISTRATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`

  type SedeEnte {
    id_sede: Int!
    id_ente_rif: Int
    fg_accompagnamento_sede: String
    ty_sede: Int
    js_sede: JSON
    ts_creazione: Timestamp
  }

  type altraSede {
    id_sede: Int
    js_sede: JSON
  }

  extend type Query {
    AltraSedeEntePK (id_ente: Int!): [altraSede] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "id_ente")

  }

  extend type Mutation {      
        sedeRemove (id_sede: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}])
        sedeInsert (input: sedeInsertInput!): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.id_ente_rif")
        sedeUpdate (input: sedeUpdateInput!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}])
    }

  input sedeInsertInput {
    id_ente_rif: Int
    ty_sede: Int
    js_sede: JSON
  }

  input sedeUpdateInput {
    id_sede: Int
    js_sede: JSON
  }
   
`;
