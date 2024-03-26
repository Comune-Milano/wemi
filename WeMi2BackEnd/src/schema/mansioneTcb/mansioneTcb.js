/** @format */

import { gql } from 'apollo-server-express';

export default gql`

type MansioneTcb{
    tyDominioTcb: Float!
    cdDominioTcb: Float
    txVal: String
    txNota: String
    pgVisualizzazione: Int
    txTitoloMansione: JSON
    attributoTcb: [AttributoTCB]
    arrayBen: [Int]
    maxRif: Int
    minRif: Int
}
extend type Query {
    mansioneTcbAll: [MansioneTcb] #Libera
    EstraiMansioniTata:[MansioneTcb] #Libera
    EstraiMansioniTataCandidatura:[MansioneTcb] #Libera
    EstraiMansioniColf:[MansioneTcb] #Libera
    EstraiMansioniBadante:[MansioneTcb] #Libera
    EstraiMansioniAnimali:[MansioneTcb] #Libera
}
`;
