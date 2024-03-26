/** @format */

import { gql } from 'apollo-server-express';
import {
  AMMINISTRATORE_ENTE,
  OPERATORE_ENTE,
  CITTADINO,
  LAVORATORE,
  AMMINISTRATORE,
} from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`
  type Nomi {
    nm_ente : String 
    tl_testo_1: JSON
  }
  type Cliente{
    ptx_username : String
    tx_nome_utente: String
    tx_cognome_utente: String
  }
  type RecensioneEnte {
    id_rich_serv_rec: Int!
    qt_media_singola_recensione: Int
    js_dati_recensione: JSON
    js_dati_recensione_wemi: JSON
    ultimoStato: StatoRecensioneEnte
    storiaStati: [StatoRecensioneEnte]
    ts_creazione: Timestamp!
  }


  type Recensioni{
    id_rich_serv_rec: Int!
    qt_media_singola_recensione: Int
    js_dati_recensione: JSON
    js_dati_recensione_wemi: JSON
    ultimoStato: StatoRecensioneEnte
    storiaStati: [StatoRecensioneEnte]
    utente: String
    nm_ente: String
    tl_testo_1: JSON
    ts_creazione: Timestamp
    tx_nome_utente: String
  }
  type StatoRecensioneEnte {
    id_rich_serv_rec: Int!
    ts_variazione_stato: Timestamp!
    cd_stato_recensione:String
    id_utente:Int
  }
  extend type Query {
    EstraiRecensioneRichiestaServizioEnte(idRichiestaEnte: Int!): RecensioneEnte @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${CITTADINO}, ${LAVORATORE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: "${ENUM_VALIDATOR.RICHIESTA_ENTE.code}", argsKey:"idRichiestaEnte")
    EstraiEnteServizio(idRichiestaEnte: Int!):Nomi @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: "${ENUM_VALIDATOR.RICHIESTA_ENTE.code}", argsKey:"idRichiestaEnte")
    EstraiNomeUtente (idRichiestaEnte: Int!): Cliente @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}, ${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: "${ENUM_VALIDATOR.RICHIESTA_ENTE.code}", argsKey:"idRichiestaEnte")
    EstraiRecensioni(idServizioRiferimento: Int!,idEnte: Int!):[Recensioni] #Libera
  }
  extend type Mutation {
    InserisciRecensioneServizioEnte(feedBack: inputFeedBack): Boolean #Eliminare
    RichiediFeedBackConMailRichiestaServizioEnte(idRichiestaEnte: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: "${ENUM_VALIDATOR.RICHIESTA_ENTE.code}", argsKey:"idRichiestaEnte")
    #scriviFeedBack(feedBack: inputFeedBack): Boolean
    ConfermaRecensioneServizioEnte(idRichiestaEnte: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: "${ENUM_VALIDATOR.RICHIESTA_ENTE.code}", argsKey:"idRichiestaEnte")
    inserisciFeedbackServizioEnte (input: inserisciFeedbackServizioEnteInput!): Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: "${ENUM_VALIDATOR.RICHIESTA_ENTE.code}", argsKey:"input.id_rich_serv_rec")
    RichiediRecensioneServizioEnte(idRichiestaEnte: Int!) : Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE},${OPERATORE_ENTE}]) @validate(type: "${ENUM_VALIDATOR.RICHIESTA_ENTE.code}", argsKey:"idRichiestaEnte")
  }
  input inputFeedBack {
    idRichiestaEnte: Int!
    noteRecensione: String
    velocita: Int
    professionalita: Int
    puntualita: Int
    mediaRecensione: Int
    idUtente: Int
  },

  input inserisciFeedbackServizioEnteInput {
    id_rich_serv_rec: Int!
    qt_media_singola_recensione: Float!
    js_dati_recensione: JSON!
  }
`;
