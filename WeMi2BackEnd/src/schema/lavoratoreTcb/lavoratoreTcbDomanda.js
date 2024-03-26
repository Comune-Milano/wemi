/** @format */

import { gql } from 'apollo-server-express';
import { LAVORATORE, AMMINISTRATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`

extend type Query {
  DatiLavoratoreCandidatura(id_utente:Int): Lavoratore @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.CANDIDATURA_TCB.code}, argsKey: "id_utente")
  StoricoLavoratoreFiltro(
    id_utente: Int,
    cd_stato_ric_serv_ente: String,
    cd_stato_associazione: String,
    dataOfferta: String,
    locale: String
  ): [Lavoratore] @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.CANDIDATURA_TCB.code}, argsKey: "id_utente")
}

`;