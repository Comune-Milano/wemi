/** @format */

import { gql } from 'apollo-server-express';

export default gql`
type DFasciaOraria{
    id_periodo: Int!
    tl_valore_testuale: JSON
    pg_visualizzazione: String
}

extend type Query {
    dFasciaOrariaAll:[DFasciaOraria] #Libera
}
`;
