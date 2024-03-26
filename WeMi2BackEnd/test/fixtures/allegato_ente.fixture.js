import { gql } from "apollo-server";

export const fixtureAllegatoEnte = [
  {
    idEnte: 1,
    idMedia:1,
    tyAllegato: "PRIVACY_POLICY",
  },
  {
    idEnte: 2,
    idMedia:2,
    tyAllegato: "CONDIZIONI_UTILIZZO",
  },
  {
    idEnte: 3,
    idMedia:3,
    tyAllegato: "MODULO_RECESSO",
  },
];

export const allegatiAll =  gql`
    query {
        allegatiAll{
        idEnte
        idMedia
        tyAllegato
      }
    }
`;

export const typeAllegato = gql`
    type Allegato {
        idEnte: Int!
        idMedia: Int!
        tyAllegato: String!
    }
`;