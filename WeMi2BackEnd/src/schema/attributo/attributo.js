
import { gql } from 'apollo-server-express';
import { CITTADINO, LAVORATORE, AMMINISTRATORE } from '../../constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`


type AttributoTCB {
    cdAttributo: Float
    tlValoreTestuale: JSON
    dominioTcb: Float
    cdValAttributo: Float
    tx_val: String
    txNota: String
    tsModifica:Timestamp!
    tsCreazione: Timestamp!
  }
  
  type FlagTCB {
    cdAttributo: Float
    flag: String
    nrVal: String
    txNota: String
    dominioTcb: Float
    cdValAttributo: Float
    tsModifica:Timestamp!
    tsCreazione: Timestamp!
  }
  
  type TextAttrTCB {
    cdAttributo: Float
    txVal: String
    dominioTcb: Float
    cdValAttributo: Float
    tsModifica:Timestamp!
    tsCreazione: Timestamp!
  }
  
  type NrAttrTCB {
    cdAttributo: Float
    nrVal: Int
    dominioTcb: Float
    cdValAttributo: Float
    tsModifica:Timestamp!
    tsCreazione: Timestamp!
  }
  
  
  type DtAttrTCB {
    cdAttributo: Float
    dtVal: String
    dominioTcb: Float
    cdValAttributo: Float
    tsModifica:Timestamp!
    tsCreazione: Timestamp!
  }


type AttributoDisponibilitaTCB{
    cd_attributo: Int
    cd_val_attributo: Int
    tx_val: String
    dt_val: Timestamp
    tx_nota: String
    tx_nota_op: String
    nr_val: Int
    fg_val: String
    fg_mansione_svolta: String
    tl_valore_testuale: JSON
    dc_val: Float 
  }

  extend type Mutation {
    InserisciModificaAttributo(input: AttributoInput!): JSON @auth @protect(roles: [${CITTADINO},${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "input.idRichiestaTcb")
    EliminaDatiRichiestaByAttributo(input: EliminaDatiInput!): JSON @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "input.idRichiestaTcb")
  }


  input AttributoInput {
    idRichiestaTcb: Int!
    disponibilitaJson: DisponibilitaJson
    arrayConfig: [ArrayConfig]
  }

  input DisponibilitaJson {
    lunedi: String
    martedi: String
    mercoledi: String
    giovedi: String
    venerdi: String
    sabato: String
    domenica: String
    nr_ore_totali: Float
  }

  input EliminaDatiInput {
    idRichiestaTcb: Int!
    arrayAttributi: [Float]
  }

`;