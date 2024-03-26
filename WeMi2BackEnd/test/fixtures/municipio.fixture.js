import { gql } from "apollo-server";

export const fixtureMunicipio = [
  {
    idMunicipio: 1,
    nmMunicipio: { "it": "Municipio 1"},
  },
  {
    idMunicipio: 2,
    nmMunicipio: { "it": "Municipio 2"},
  },
  {
    idMunicipio: 3,
    nmMunicipio: { "it": "Municipio 3"},
  },
];

export const municipioAll =  gql`
    query {
      municipioAll{
        idMunicipio
        nmMunicipio
      }
    }
`;

export const typeMunicipio = gql`
    type Municipio {
        idMunicipio: Int!
        nmMunicipio: JSON
    }
`;