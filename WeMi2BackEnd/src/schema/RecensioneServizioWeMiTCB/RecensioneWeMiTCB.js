/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE, CITTADINO, LAVORATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`
type RecensioneWemi {
  id_rich_serv_rec: Int
  qt_media_singola_recensione: Int
  js_dati_recensione: JSON
  js_dati_recensione_wemi : JSON,
  ts_creazione: Timestamp,
  cd_stato_rec: Int
  cd_stato_rec_wemi: Int
}


extend type Query {
  EstraiRecensioneTCB (id_rich_serv_rec: Int!): RecensioneWemi @auth @protect(roles: [${LAVORATORE},${CITTADINO}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "id_rich_serv_rec")
}

  extend type Mutation {
    InserisciFeedbackTCB (input: InserisciFeedbackTCBInput!): Int @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "input.id_rich_serv_rec")
  }

  input InserisciFeedbackTCBInput {
    id_rich_serv_rec: Int!
    js_dati_recensione: JSON!
  }
`;
