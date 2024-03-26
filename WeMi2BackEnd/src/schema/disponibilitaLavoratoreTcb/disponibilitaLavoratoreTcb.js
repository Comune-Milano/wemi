/** @format */

import { gql } from "apollo-server-express";
import { LAVORATORE } from "constants/usercode";
import { ENUM_VALIDATOR } from "constants/authorization/validator";

export default gql`

input InputAggiornaStatoOccupazionale {
  codiceStatoOccupazionale: Int
  dataDisponibileDa: String
}

input InputLavoratore {
  idServizioRiferimento: Int
}

input InputConfermaDisponibilitaOraria {
  idServizioRiferimento: Int!
  checkboxesTipologiaOrarioChecked: [Int!]
  checkboxesTipologiaOrarioUnchecked: [Int!]
  convivenza: JSON,
  convivenzaRidotta: JSON,
  nonConviventi: JSON,
  presenzaNotturna: JSON,
  weekend: JSON,
  assistenzaNotturna: JSON,
  checkboxesTipologiaOrario: JSON
}

extend type Query {
  EstraiTipologieOrarioLavoratore(input: InputLavoratore!): JSON @auth @protect(roles: [${LAVORATORE}])
  EstraiDatiStatoOccupazionaleLavoratore(input: InputLavoratore!): JSON @auth @protect(roles: [${LAVORATORE}])
  EstraiDatiDisponibilitaOraria(input: InputLavoratore!): JSON @auth @protect(roles: [${LAVORATORE}])
}

extend type Mutation {
  AggiornaStatoOccupazionale(input: InputAggiornaStatoOccupazionale!): Boolean @auth @protect(roles: [${LAVORATORE}])
  ConfermaDisponibilitaOrariaLavoratore(input: InputConfermaDisponibilitaOraria!): Boolean @auth @protect(roles: [${LAVORATORE}])
}
`;
