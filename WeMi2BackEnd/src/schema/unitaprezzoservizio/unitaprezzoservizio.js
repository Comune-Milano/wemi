import { gql } from 'apollo-server-express';
import { AMMINISTRATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`

type UnitaPrezzoServizio {
    cd_unita_prezzo: Int!
    tl_testo_aggettivo: JSON
    title: String
    tl_testo_sostantivo: JSON
    pg_visualizzazione: Int
}

extend type Query {
    EstraiUnitaPrezzo: [UnitaPrezzoServizio]  @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
    EstraiUnitaPrezzoAll: [UnitaPrezzoServizio]  @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
}
`;