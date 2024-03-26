import { gql } from 'apollo-server-express';

export default gql`
    type ContenutoAssociato {
        id_contenuto_primario: Int!
        id_contenuto_associato: Int!
        nm_relazione: String!
        ts_creazione: Timestamp
      }

    extend type Query {
        ContenutoAssociatoPK (id_contenuto_primario: Int!, id_contenuto_associato: Int!): ContenutoAssociato! #Eliminare
    }
    input contenutoAssociatoInput{
        id: Int!
        nmRelazione: String
    }
`;
