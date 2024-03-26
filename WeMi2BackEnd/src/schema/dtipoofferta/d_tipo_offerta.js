/** @format */

import { gql } from 'apollo-server-express';

export default gql`
type DTipoOfferta{
    cdOfferta: Int!
    tl_valore_testuale: JSON
    pg_visualizzazione: String
}

extend type Query {
    dTipoOffertaAll:[DTipoOfferta] #Libera
}
`;
