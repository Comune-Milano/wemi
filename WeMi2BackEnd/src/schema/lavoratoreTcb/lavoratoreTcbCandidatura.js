/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE } from 'constants/usercode';

export default gql`

extend type Mutation {
    InserisciUtente(input:InserisciUtente!): JSON @auth @protect(roles:[${AMMINISTRATORE}])
}

input InserisciUtente {
    ptx_codice_fiscale: String!
    ptx_username: String!
    tx_nome_utente: String!
    tx_cognome_utente: String!
}

`;