
import { gql } from 'apollo-server-express';
import { CITTADINO, LAVORATORE, AMMINISTRATORE } from '../../constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`

type BeneficiarioTCB {
  idRichiestaTCB: Int
  pgBen: Int!
  relazione: AttributoTCB
  altroRelazione: String
  altroDeambulazione: String
  nomeBen: TextAttrTCB
  cognomeBen: TextAttrTCB
  sesso: AttributoTCB
  eta: NrAttrTCB
  fasciaEta: AttributoTCB
  patologieBambino: [AttributoTCB]
  patologieAnziano: [AttributoTCB]
  altroPatologie: String
  altreInfoPatologie: TextAttrTCB
  deambulazione: AttributoTCB
  altezza: AttributoTCB
  corporatura: AttributoTCB
  altreInfo: TextAttrTCB
  giornataTipo: TextAttrTCB
  italianoFlag: FlagTCB
  lingue: [AttributoTCB]
}
  
type AttributoBeneficiarioTCB {
  pgBen: Int
  cdAttributo: Float
  cdValAttributo: Float
  txVal: String
  dtVal: String
  txNota: String
  txNotaOp: String
  fgVal: String
  nrVal: String
  tsModifica:Timestamp!
  tsCreazione: Timestamp!
}
  extend type Query {
    EstraiAttributoBeneficiarioTCB(idRichiestaTcb: Int!, cdAttributo: Float!): [AttributoBeneficiarioTCB] @auth @protect(roles: [${CITTADINO},${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
  }

  extend type Mutation {
    InserisciModificaAttributoBeneficiarioTCB(input: AttributoBeneficiarioInput!): JSON @auth @protect(roles: [${CITTADINO},${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "input.idRichiestaTcb")
    InserisciBeneficiarioTCB(idRichiestaTcb: Int!, pgBen: Int!): JSON @auth @protect(roles: [${CITTADINO},${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EliminaBeneficiarioTCB(idRichiestaTcb: Int!, pgBen: Int!): JSON @auth @protect(roles: [${CITTADINO},${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    ModificaFasciaEtaBeneficiarioTCB(idRichiestaTcb: Int!, pgBen: Int!, fasciaEta: ArrayConfig!): JSON @auth @protect(roles: [${CITTADINO},${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
  }

  input AttributoBeneficiarioInput {
    idRichiestaTcb: Int!
    arrayBen: [ArrayBen]
  }

  input ArrayBen {
    pgBen: Int!
    arrayConfig: [ArrayConfig]
  }


`;