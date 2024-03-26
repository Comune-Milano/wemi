/** @format */

import { gql } from 'apollo-server-express';
import { CITTADINO, LAVORATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`
    extend type Query {
      paymentAuthorizationToken(idRichiestaEnte: Int!): String! @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiestaEnte")
  }
`;
