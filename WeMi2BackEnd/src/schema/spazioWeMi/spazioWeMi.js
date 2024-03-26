import { gql } from 'apollo-server-express';

export default gql`
  type SpazioWeMi {
    idSpazioWeMi: Int!
    tlValoreTestuale: JSON
  }

  type ServiceTCB {
    idHourType: Int 
    idService: Int
    idTechnicalService: Int
    prezzoMinimo: Float
  }

  type PayloadTCBData {
    services: [ServiceTCB]
  }

  extend type Query {
    getSpaziTCBData(idTCB: Int!): PayloadTCBData 
  }
`;
