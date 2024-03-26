/** @format */

import { gql } from 'apollo-server-express';
import { CITTADINO, LAVORATORE, AMMINISTRATORE, AMMINISTRATORE_ENTE, OPERATORE_ENTE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`

type ResultTabellaRichiestaServizioEnte {
  count: Int,
  countDaRichiedere: Int
  countDaConfermare: Int 
  countConfermati: Int
  result: [TabellaRichiestaServizioEnte]
}

type TabellaRichiestaServizioEnte{
  idRichiestaServizioEnte: Int!
  nomeUtente:String
  cognomeUtente: String
  idServizioErogatoEnte: Int 
  idRichiestaServizioBase: Int
  idUtente: Int
  timestampCreazione: Timestamp
  username: String
  js_impersonificazione: JSON
  anagraficaUtente: JSON
  dataNascitaUtente: Date
  codiceFiscaleUtente: String
  isYoung: Boolean
  datiLavoratore: JSON
  datiRichiesta:JSON
  idEnte: Int
  nmEnte: String
  nomeServizio: JSON
  statoRecensione: String
  statoRichiestaBase: String
  statoRichiestaEnte: String
  statoChat: String
  periodoRichiestoDal: Timestamp
  periodoRichiestoAl: Timestamp
  prezzoProposto: Float
  prezzoFinale: Float
  DatiPrezzo: JSON
  tipoOfferta: Int
  TipoServizioErog: Int
  PrezzoMinimo: Float
  jsDatiRichiesta: JSON
  inizioValOffertaPrezzo: Date
  fineValOffertaPrezzo: Date
  servizioEnte: ServizioErogatoEnte
  periodoPropostoDal: Timestamp
  periodoPropostoAl: Timestamp
}
  type RichiestaServizioEnte{
    id_richiesta_servizio_ente: Int!
    id_richiesta_servizio_base: Int
    id_servizio_erogato_ente:Int
    id_interno_trans_pag: Int
    ptx_username: String
    cd_stato_recensione: Int
    im_costo_totale_calcolato: Float
    im_costo_totale_ente: Float 
    im_prezzo_minimo: Float
    im_prezzo_minimo_offerta_calc: Float
    cd_tipo_offerta_srv: Int
    cd_tipo_servizio_erog: Int
    id_utente_richiedente: Int
    js_dati_lavoratore: JSON 
    js_dati_prezzo: JSON
    dt_periodo_proposto_dal: String
    dt_periodo_proposto_al: String
    cd_fascia_oraria_proposta: Int
    tx_note_ente: String
    id_preventivo_ente: Int
    ts_scadenza_acquisto: Timestamp
    ts_creazione: Timestamp!
    allegato: Media
    richiestaServizioBase: RichiestaServizioBase
    servizioEnte: ServizioErogatoEnte
    recensione: RecensioneEnte
    datiPagamento: Pagamento
    ultimoStato: StoriaStatiRichiestaEnte
    storiaStati: [StoriaStatiRichiestaEnte]
  }
  type StoriaStatiRichiestaEnte{
    id_richiesta_servizio_ente: Int!
    ts_variazione_stato: Timestamp
    cd_stato_ric_serv_ente:String
    cd_stato_chat: String
    id_utente: Int
  }
  type RichiestaServizioEntePerOrdine {
    idEnte: Int!
    nomeEnte: String
    nomeEnteCompleto: String
    idRichiestaServizioEnte: Int!
    idRichiestaServizioBase: Int!
    idServizioErogatoEnte: Int!
    costoTotaleCalcolato: Float
    costoTotaleEnte: Float
    periodoPropostoDal: String
    periodoPropostoAl: String
    scadenzaAcquisto: Timestamp
    noteEnte: String
    descrizioneServizioErogatoEnte: JSON
    altraModalitaPagamento: Boolean
    logoEnte: String
    nomeServizioEnte: JSON
    jsonDatiRichiesta: JSON
    jsonDatiLavoratore: JSON
  }
  extend type Query{
    EstraiCarrello(idUtente: Int!): [RichiestaServizioEnte] #Eliminare
    EstraiRichiestaEnte(idRichiestaEnte: Int!): RichiestaServizioEnte @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiestaEnte")
    EstraiRichiesteServizioEntePerIdEnte(input: inputEstraiRichiesteEnte!): ResultTabellaRichiestaServizioEnte @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.idEnteErogatore")
    estraiRichiesteEnte(input: inputEstraiRichiesteEnte): ResultTabellaRichiestaServizioEnte @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_REQUEST_SERVICES}])
    EstraiRichiestaServizioEntePerOrdine(idRichiestaServizioEnte: Int!): RichiestaServizioEntePerOrdine @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiestaServizioEnte")
  }
  extend type Mutation{
    AllegaFileRichiestaServizioEnte(idRichiestaEnte: Int!, media: mediaADDInput): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiestaEnte")
    ChiudiRichiestaServizioEnte(idRichiestaEnte: Int!, txNote:String!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiestaEnte")
    AccettaRichiestaServizioCittadino(datiUpdate: DatiRichiestaServizioEnte): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "datiUpdate.idRichiestaEnte")
    DisattivaChatRichiestaServizioEnte(idRichiestaEnte: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiestaEnte")
    updateStatoChat(idRichiestaEnte: Int!,statoChat: Int!, previousState: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiestaEnte")
  }
  input DatiRichiestaServizioEnte{
    idRichiestaEnte: Int!
    nominativoOperatore:String
    validita: Timestamp
    importoTotale: Float
    disponibilitaDa: Date
    disponibilitaA: Date
    fasciaOraria: Int
    infoAggiuntive: String
    fgAltreModPagamento: String
  }
  input inputEstraiRichiesteEnte {
    idEnteErogatore: Int
    numeroElementi: Int!
    dataRichiesta: Date
    tipoServizio: Int
    statoImp: Boolean
    statoRichiestaBase: String
    statoFeedback: String
    statoChat: String
    richiedente: String
    nomeEnte: String
  }

`;
