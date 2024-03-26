/** @format */

import { gql } from 'apollo-server-express';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { AMMINISTRATORE } from 'constants/usercode';

export default gql`

type Lavoratore {
  id_utente: Int
  id_richiesta: Int
  id_richiesta_servizio_base: Int
  cd_stato_associazione: Int
  stato_associazione: String
  stato_candidatura: String
  tx_tags_ricerca: String
  id_servizio: Int
  ts_creazione: Timestamp
  cognome: String
  nome: String
  cd_stato_dati_lav: Int
  ptx_codice_fiscale: String
  ptx_username: String
  ptx_email: String
  recensioniEnte: [JSON]
  nota_richiesta: String
  tipoServizio: String
}

extend type Query {
  RecuperaUtente(username: String, codicefiscale: String): Lavoratore @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
}

`;