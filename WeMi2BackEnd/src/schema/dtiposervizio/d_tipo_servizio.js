/** @format */

import { gql } from 'apollo-server-express';

export default gql`
type DTipoServizio{
    cdServizio: Int!
    tl_valore_testuale: JSON
    pg_visualizzazione: String
}

extend type Query {
    dTipoServizioAll:[DTipoServizio] #Libera
}
`;
