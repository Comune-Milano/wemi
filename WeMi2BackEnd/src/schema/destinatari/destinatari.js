/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`
type Destinatario{
    idDestinatario: Int!
    txDestinatario: JSON
    destinatariSecondoLivello: [DestinatarioSecondoLivello]
}
type DestinatarioSecondoLivello{
    idDestinatario: Int!
    txDestinatario: JSON
    idDestinatarioPrimoLivello: Int
}


extend type Query {
    destinatari:[Destinatario] #Libera
    destinatariServizio(id_servizio: Int!):[Destinatario] #Libera
    destinatariPubblicati:[Destinatario] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
}
`;
