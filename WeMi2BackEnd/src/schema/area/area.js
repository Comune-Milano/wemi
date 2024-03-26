/** @format */

import { gql } from 'apollo-server-express';

export default gql`

type Area{
    idArea: Int!
    txTitoloArea: JSON
    nrOrdineVisualizzazione: Int!
}

extend type Query {
    allAree: [Area] #Libera 
    areaPK(idArea: Int!): Area #Eliminare
    Area(language: String!): [Area] #Eliminare
}

`;