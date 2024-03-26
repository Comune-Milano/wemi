/** @format */

import { gql } from 'apollo-server-express';
import { CITTADINO, LAVORATORE, AMMINISTRATORE, OPERATORE_ENTE, AMMINISTRATORE_ENTE } from '../../constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`
  type Conversazione {
    id_richiesta_servizio_ente: Int!
    id_conversazione_ut_ente: Int!
    tx_testo_messaggio: String
    id_utente_autore_msg: Int
    fg_msg_ente: String
    ts_creazione: Timestamp
  }
  input InputChat{
    id_richiesta_servizio_ente: Int!
    tx_testo_messaggio: String
  }
  extend type Query {
    retrieveMessages(id_richiesta_servizio: Int!): [Conversazione] @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "id_richiesta_servizio")
    getAttachment(id_richiesta_servizio: Int!): Media @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "id_richiesta_servizio")
  }
  extend type Mutation {
    sendMessage(input: InputChat!): Conversazione @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "input.id_richiesta_servizio_ente")
    deleteAttachment(id_media: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}])
  }
`;
