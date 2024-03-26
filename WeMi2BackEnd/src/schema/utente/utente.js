/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE_ENTE, OPERATORE_ENTE, CITTADINO, LAVORATORE, AMMINISTRATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`
# directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    OPERATORE
    ENTE
    OPERATORE_ENTE
    CITTADINO
  }
   type usersAddedEnte {
    email: String,
    username: String
  }
  type usersCollegati {
    username: String,
    email: String,
    id_utente:Int
  }
  # type User  @auth(requires: CITTADINO){
  #   username: String
  #   applicationCode: String
  #   groups: [JSON]
  #   fullname: String
  #   token: String 
  #   errorCode: String
  #   codana: String
  #   email: String
  #   description: String
  # }
  type User {
    idCittadino: String
    username: String
    Profilo: String
    Nome: String
    Ruolo: String
    token: String 
  }


  input InputLogin{
    username: String
    password: String
    applicationCode: String
  }
  
  type AttributoUtente {
    idUtente: Int!
    cdAttributo: Float!
    cdValAttributo: Float!
    txVal: String
    dtVal: Timestamp
    txNota: String
    txNotaOp: String
    fgVal: String
    nrVal: String
    tsModifica: Timestamp
    tsCreazione: Timestamp
  }

  extend type Query {
    identificaUtente(input: InputLogin!): User #Eliminare
    usersAddedEntePK(id_ente: Int!): [usersAddedEnte] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "id_ente")
    datiUtente(idUtente: Int!): JSON @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}])
    estraiDatiUtente(email: String!): JSON #Libera
    usersCollegatiEnte(idEnte:Int!):[usersCollegati] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "idEnte")
    datiEnte(idEnte: Int!): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "idEnte")
    EstraiValAttributiUtente(idUtente: Int!, arrayCdAttr: [Int]): [AttributoUtente] @auth @protect(roles: [${LAVORATORE}, ${AMMINISTRATORE},${CITTADINO}]) @validate(type: ${ENUM_VALIDATOR.CANDIDATURA_TCB.code}, argsKey: "idUtente")
  }

  extend type Mutation {
        utenteAdd (input: utenteInput!): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.id_ente")
        utenteRemove (input: utenteInput!): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.id_ente")
        InserisciModificaAttributoUtente(input: AttributoUtenteInput!): String @auth @protect(roles: [${LAVORATORE},${AMMINISTRATORE},${CITTADINO}]) @validate(type: ${ENUM_VALIDATOR.CANDIDATURA_TCB.code}, argsKey: "input.idUtente")
    }

  extend type Subscription {
    sessionExpirationNotify: Boolean
  }

  input utenteInput {
      ptx_username: String!
      id_ente: Int!
  } 

  input AttributoUtenteInput {
    idUtente: Int!
    arrayConfig: [ArrayConfig]
  }

`;