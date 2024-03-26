/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE_ENTE, OPERATORE_ENTE, AMMINISTRATORE } from 'constants/usercode';

export default gql`
  type SostegniEconomiciSupportati{
    idSostegno: Int!
    txSostegno: JSON
  }
  extend type Query{
    EstraiSostegniEconomici: [SostegniEconomiciSupportati] #Libera
    EstraiSostegniEconomiciPubblicati: [SostegniEconomiciSupportati] @auth @protect(roles: [${AMMINISTRATORE_ENTE},${OPERATORE_ENTE}, ${AMMINISTRATORE}])
  }

`;
