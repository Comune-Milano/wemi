/** @format */

import { gql } from 'apollo-server-express';

export default gql`

type Indennita{
    annoRiferimento: Int!
    indennitaPranzo: Float
    indennitaCena: Float 
    indennitaAlloggio: Float
}
extend type Query {
    EstraiIndennita(annoRiferimento: Int!): Indennita #Libera
}
`;
