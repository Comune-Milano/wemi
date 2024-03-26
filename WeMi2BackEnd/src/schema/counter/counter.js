/** @format */

import { gql } from 'apollo-server-express';

export default gql`
  type CounterService {
    serviziOfferti: Int
    entiAccreditati: Int
    operatoriAccreditati: Int
    cittadiniIscritti: Int
  }

  extend type Query {
    EstraiDatiAccountability: CounterService #Libera
  }
  
`;
