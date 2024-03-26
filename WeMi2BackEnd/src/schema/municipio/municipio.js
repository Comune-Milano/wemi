/** @format */

import { gql } from 'apollo-server-express';

export default gql`
    type Municipio{
      idMunicipio: Int!
      nmMunicipio: JSON
    }
    type Via{
      pointX: Float
      pointY: Float
      name: String
      idcCode: Int
    }
    input Coordinate{
      pointX: Float
      pointY: Float
    }

    extend type Query {
      municipioAll: [Municipio] #Libera
      cercaVia(via: String!, resultLimit: Int!): [Via] #Libera
      cercaMunicipio(coordinate: Coordinate!):Municipio #Libera
  }
`;
