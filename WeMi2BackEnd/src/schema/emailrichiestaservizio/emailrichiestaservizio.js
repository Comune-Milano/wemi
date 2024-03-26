/** @format */

import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation{
        InoltraEmailRichiesta(dati: datiEmailInput!): Boolean #Libera
    }
    input datiEmailInput{
        emailText: String 
        emailAddress: String
    }

`;