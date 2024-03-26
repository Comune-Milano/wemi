/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE_ENTE, OPERATORE_ENTE, AMMINISTRATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`
  type ServizioErogatoEnte {
    nomeServizio: String
    ulterioriInformazioni: String
    id_servizio_ente: Int!
    tl_procedura_attivazione:JSON
    tx_note_al_prezzo:String
    id_servizio_riferimento: Int!
    id_ente_erogatore: Int!
    tl_descrizione_serv_erog_ente: JSON
    im_prezzo_minimo: Float
    im_prezzo_minimo_offerta_calc: Float
    dt_inizio_val_offerta_prezzo: Date
    dt_fine_val_offerta_prezzo: Date
    qt_min_pers: Int
    qt_max_pers: Int
    qt_tempo_max_attivazione: Int
    dt_inizio_erog_serv: Date
    dt_fine_erog_serv: Date
    media_recensioni: Float
    numeroRecensioni: Int
    js_dati_prezzo: JsonDatiPrezzo
    js_info_personale: JSON
    tx_altre_mansioni: String
    tx_altra_sede: String
    fg_accompagnamento_altra_sede: String
    fg_accetta_preventivo: String
    pg_versione: Int
    ts_creazione: Timestamp!
    cd_tipo_offerta_srv: Int
    cd_tipo_servizio_erog:Int
    cd_modalita_erogazione: Int
    js_note_adminwemi_su_servizio: JSON 
    listaDestinatariPrimoLivello: [Destinatario]
    listaDestinatariSecondoLivello: [DestinatarioSecondoLivello]
    listaMunicipiServiti: [Municipio]
    listaMansioniSvolte:[Mansione]
    listaModalitaPagamento:[DTipoOfferta]
    listaPeriodiErogazione:[DFasciaOraria]
    listaSostegniEconomiciSupportati:[SostegniEconomiciSupportati]
    ultimoStato: StoriaStatiServizioErogatoEnte
    storiaStati: [StoriaStatiServizioErogatoEnte]
    sediErogatrici: [SedeEnte]
    service: Servizio!
    ente: Ente!
    spaziWeMi: [SpazioWeMi]
    qualifiche_interne: [Int]
    qualifiche_esterne: [Int]
    fg_0_18_anni: Boolean
    nm_descrittore_movimento: Int
    nm_descrittore_relazioni: Int
    nm_descrittore_competenze: Int
    nm_descrittore_creativita: Int
    nm_descrittore_autodeterm: Int
    sliderImg: JSON
    is_018: Boolean
  }

  type JsonDatiPrezzo {
    idPrezzo: Int
    idServizioEnte: Int
    cdTipoOffertaServizio: Int
    cdTipoServizioErog: Int
    dataInizio: Timestamp
    dataFine: Timestamp
    txTitoloFinanziamento: String
    qtMinimaUnita: Int
    imPrezzoMinimo: Float
    imPrezzoMinimoCond: Float
    txNoteAlPrezzo: String
    listinoPrezzi: [Listino]
  }

  type Listino {
    qtPersoneDa: Int
    qtPersoneA: Int
    offerta : [OffertaPersone]
  }

  type OffertaPersone {
    qtUnitaDa: Int
    qtUnitaA: Int
    valore: Float
  }

  type StoriaStatiServizioErogatoEnte {
    id_servizio_ente: Int!
    ts_variazione_stato: Timestamp
    cd_stato_dati_servizio_ente: String
    id_utente: Int
  }

  input EnteServizio {
    service: Int!
    tipologia: Int
    municipio: Int
    costo: Float
    mansione: [Int]
    orario: [Int]
    rating: Int
    destinatariLiv1: [Int]
    destinatariLiv2: [Int]
    offerta: [Int]
    order: Int
  }

  type EnteServizioTable {
        id_servizio_ente: Int
        id_servizio_riferimento: Int
        pg_versione: Int
        ptx_username: String
        ts_creazione: Timestamp
        nm_ente: String
        cat_accreditamento: String
        serv_offerto: String
        ts_variazione_stato: Timestamp
	      cd_stato_dati_servizio_ente: Int
        tl_valore_testuale:JSON
	      id_utente: Int
      }

  type DettaglioAmministrativoServizioEnte {
    desc_serv_erog: String
    id_servizio: Int
    cat_acc: String
    nm_ente: String
  }

  type ServizioAccreditamentoEnte {
    value: Int
    textValue: String
    catAccreditamento: String
  }
  
  input InserisciServizioEnteInput {
    id_servizio_riferimento: [Int]
    id_ente_erogatore: Int
  }

  input SedeErogazioneEnteInput {
    id: Int!
    checkAccompagnamento: Boolean
  }

  input InserisciDatiServizioEnteInput {
    qualifiche_interne: [Int]
    qualifiche_esterne: [Int]
    fg_0_18_anni: String
    tl_procedura_attivazione: JSON
    tl_descrizione_servizio_ente: JSON
    tx_note_al_prezzo: String
    id_destinatario_liv1: [Int]
    id_servizio_ente: Int
    cd_modalita_erogazione: Int
    id_ente: Int
    id_destinatario_liv2: [Int]
    js_primo_contatto: JSON
    js_info_personale:JSON
    qt_tempo_max_attivazione: Int
    qt_min_pers: Int
    qt_max_pers: Int
    dt_inizio_val_offerta_prezzo:Date,
    dt_fine_val_offerta_prezzo:Date,
    tx_altre_mansioni: String
    cd_municipio_servito: [Int]
    cd_fascia_oraria_erog_srv_ente: [Int]
    sedi_erogazione: [SedeErogazioneEnteInput]
    mansioni:[MansioneInput]
    id_contenuto_sostegno_econ: [Int]
    tx_altra_sede: String
    fg_accompagnamento_altra_sede: String
    cd_stato_dati_servizio_ente: Int
    js_note_adminwemi_su_servizio: JSON
    nomeServizio: String
    ulterioriInformazioni: String
    nm_descrittore_movimento: Int
    nm_descrittore_relazioni: Int
    nm_descrittore_competenze: Int
    nm_descrittore_creativita: Int
    nm_descrittore_autodeterm: Int
    slider_immagini: JSON
  }
  input MansioneInput {
    idMansione: Int
    order: Int
  }
   input InoltraCompilazioneEnteInput{
     cd_stato_dati_servizio_ente: Int
     id_utente: Int
     js_note_adminwemi_su_servizio: JSON
     id_servizio_ente: Int
   }

  extend type Query {
    RicercaEntiErogantiServizio(input: EnteServizio!): [ServizioErogatoEnte] #Libera
    RicercaEntiErogantiServizioSpaziWeMi(input: EnteServizio!): [ServizioErogatoEnte] #Libera
    EstraiDescrittoriBenessere(idServizioEnte: Int!): ServizioErogatoEnte #Libera
    EstraiListaServiziErogatiEnte(idEnte: Int!):[ServizioErogatoEnte] #Eliminare
    EstraiServizioErogatoEnte004(id_ente: Int): [EnteServizioTable] #Libera
    EstraiServizioErogatoEnte004Admin(id_ente: Int): [EnteServizioTable] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "id_ente")
    EstraiServizioErogatoEnte(idServizioErogato: Int!): ServizioErogatoEnte @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.SERVIZI_EROGATI_ENTE.code}, argsKey: "idServizioErogato")
    EstraiDettaglioAmministrativoServizioEnte(id_servizio_ente: Int): ServizioErogatoEnte 
    EstraiServiziPerCategoriediAccredidatmentoEnte(id_ente: Int!): [ServizioAccreditamentoEnte] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "id_ente")
  }

  extend type Mutation {
    InserisciServizioEnte004 (input: InserisciServizioEnteInput): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.id_ente_erogatore")
    InserisciDatiServizioEnte (input: InserisciDatiServizioEnteInput): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.SERVIZI_EROGATI_ENTE.code}, argsKey: "input.id_servizio_ente")
    InoltraCompilazioneEnte (input: InoltraCompilazioneEnteInput) : JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.SERVIZI_EROGATI_ENTE.code}, argsKey: "input.id_servizio_ente")
       
    }

`;
