/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE, AMMINISTRATORE_ENTE, OPERATORE_ENTE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`

type Mansione{
    idMansione: Int!
    txTitoloMansione: JSON
    order: Int
    nrOrdineVisualizzazione: Int
}
extend type Query {
    mansioneAll: [Mansione] #Libera
    mansioniPubblicateAll: [Mansione] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
    mansioneByService(id_servizio_ente: Int!):[Mansione] #Libera
    mansioniPubblicate(id_servizio_ente: Int!):[Mansione] @auth @protect(roles: [${AMMINISTRATORE_ENTE},${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.SERVIZI_EROGATI_ENTE.code}, argsKey: "id_servizio_ente")
}
`;
