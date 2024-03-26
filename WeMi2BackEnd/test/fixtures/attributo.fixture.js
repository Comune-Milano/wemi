import { gql } from "apollo-server";

export const fixtureAttributo = [
  {
    cdAttributo: 1,
    cdAlfAttributo:"CALENDARIO_ASSISTENZA",
    tyAttributo:7,
    tyDominioTcb:3,
    jsDatiAttributo:{}
  },
  {
    cdAttributo: 2,
    cdAlfAttributo:"CALENDARIO_ASSISTENZA",
    tyAttributo:7,
    tyDominioTcb:3,
    jsDatiAttributo:{}
  },
  {
    cdAttributo: 3,
    cdAlfAttributo:"CALENDARIO_ASSISTENZA",
    tyAttributo:7,
    tyDominioTcb:3,
    jsDatiAttributo:{}
  },
  {
    cdAttributo: 191,
    cdAlfAttributo:"TX_EMAIL",
    tyAttributo:0,
    tyDominioTcb:null,
    jsDatiAttributo:{}
  },
];

export const attributoAll =  gql`
    query {
        attributoAll{
        cdAttributo
        cdAlfAttributo
        tyAttributo
        tyDominioTcb
        jsDatiAttributo
      }
    }
`;

export const typeAttributo = gql`
    type Attributo {
        cdAttributo: Int!
        cdAlfAttributo: String!
        tyAttributo: Int!
        tyDominioTcb: Int
        jsDatiAttributo: JSON
    }
`;