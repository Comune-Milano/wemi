/** @format */

import { gql } from 'apollo-server-express';
import { LAVORATORE, CITTADINO } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`

type StoriaStati{
  id_richiesta_servizio: Int!
  ts_variazione_stato: Timestamp!
  cd_stato_richiesta_servizio: String
  id_utente: Int
}

type StoriaStatiEnte {
  id_richiesta_servizio_ente: Int!
  ts_variazione_stato: Timestamp!
  cd_stato_ric_serv_ente: String
  id_utente: Int
}

type Utente{
  id_utente: Int!
  cd_profilo_utente: String
  fg_accettazione_privacy_wemi: String
  ptx_codice_fiscale: String
  ptx_username: String
  ptx_codana: String
  ty_operatore_ente: Int
  fg_lavoratore: String
  ts_creazione: Timestamp!
}

  type RichiestaServizioBase {
    idServizioEnte: Int
    messaggi: Int
    serviziAcquistabili: Int
    recensioni: Int
    stato: String
    idRichiestaBase: Int!
    dt_periodo_richiesto_dal: String
    dt_periodo_richiesto_al: String
    serviceName: JSON
    municipioName: JSON
    costo: Float
    count: Int
    id_utente_richiedente: Int!
    js_dati_richiesta:JSON
    dt_inizio_val:String
    dt_fine_val:String
    user: Utente!
    richiestaEnte: [RichiestaServizioEnte]
    ultimoStato: StoriaStati
    storiaStati: [StoriaStati]
    storiaStatiEnte: [StoriaStatiEnte]
    ts_creazione: Timestamp
    ts_variazione_stato: String
    ts_creazione_inoltro: Timestamp
    requestType: String
    statoRecensione: Int
    tipologiaAssuzione: String
  }

  type RichiestaTCB {
    idRichiestaTCB: Int
    nomeServizio: String 
    statoRichiestaTCB: String
    prezzo: Float
    conteggioLavoratoriAssociati: Int
    idLavoratore: Int
    nomeLavoratore: String
    cognomeLavoratore: String
    dataInizio: Timestamp
    dataFine: Timestamp
    curriculum: String
    idServizio: Int
  }

  extend type Query{
    EstraiListaRichiesteServizio_Base(from: String, to: String,numeroElementi: Int!, 
      statoRichiesta: [String], tipologia: String): [RichiestaServizioBase] @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}])
    EstraiListaRichiesteServizioEntePerIdRichiesta_Cittadino(idRichiestaServizioBase: Int!): [RichiestaServizioEnte] @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_BASE_CITTADINO.code}, argsKey: "idRichiestaServizioBase")
    getMaxServizioEnte : [NumeroServizi] #Eliminare
    EstraiRichiestaTCBPerIdRichiesta_Cittadino(idRichiestaServizioBase: Int!): RichiestaTCB @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_BASE_CITTADINO.code}, argsKey: "idRichiestaServizioBase")
    CountRichiesteEnteByIdUtente: JSON
  }

  type NumeroServizi{
    max_servizio_ente : Int
  }



  extend type Mutation {
    InserisciModificaRichiestaServizioEnte(input: ServizioBaseInput!): JSON @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}])
  }
  input inputEnte{
    id_servizio_erogato_ente: Int,
                  ts_scadenza_acquisto: Date,
                  im_costo_totale_calcolato: Float,
                  im_costo_totale_ente: Float,
  }
  input ServizioBaseInput {
    dt_periodo_dal: Date
    enti: [JSON]
    dt_periodo_al: Date
    js_dati_richiesta:JSON
    dt_inizio_val:Date
    dt_fine_val:Date
    id_servizio_erogato_ente: Int
    ts_scadenza_acquisto : Date
    id_richiesta_servizio_ente:Int
    id_interno_trans_pag: Int
    im_costo_totale_calcolato: Float
    im_costo_totale_ente : Float
    js_dati_lavoratore :JSON
    dt_periodo_proposto_dal: Date
    dt_periodo_proposto_al: Date
    cd_fascia_oraria_proposta: Int
     tx_note_ente: String
     id_preventivo_ente: Int
    id_periodo: Int
    id_municipio: Int
    ty_richiesta: Int
  }

  
`;
