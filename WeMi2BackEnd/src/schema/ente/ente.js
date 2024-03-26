/** @format */

import { gql } from 'apollo-server-express';
import { OPERATORE_ENTE, AMMINISTRATORE_ENTE, AMMINISTRATORE, CITTADINO } from '../../constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`

  type Ente {
    id_spazio_wemi:Int
    cd_stato_ente:Int
    ptx_email: String
    id_ente: Int!
    id_partita_iva_ente: String
    nm_ente: String
    nm_ente_completo: String
    id_utente_admin: Int
    js_dati_identificativi_ente: JSON
    dt_inizio_val: Date 
    dt_fine_val: Date
    ts_creazione:Timestamp!
    categorie: [Int]
    spaziWeMi: [Int]
    listamunicipiAccreditati: [Municipio]
    serviziAccreditati: [Servizio]
    datiEnte: datiPropriEnte
    storiaStati: StoriaStatiEnte
  }

  type StoriaStatiEnte {
    id_ente: Int!
    ts_variazione_stato: Timestamp
    cd_stato_ente: String
    cd_stato_dati_propri: String
    id_utente: Int
  }


  type datiPropriEnte {
    id_ente_rif: Int! 
    tl_descrizione_ente: JSON
    oj_media_logo: String
    nm_nome_media: String
    ty_mime_type_media: String
    id_img_logo: Int
    js_referente: JSON
    js_primo_contatto: JSON
    note_per_cittadino: String
    js_altre_info: JSON    
    js_note_adminwemi: JSON
    sede_principale: JSON
    sede_secondarie: JSON
    sedeEnte: [SedeEnte]
    media:Media
    allegatiEnte: [AllegatoEnte]
    iw_path_logo: String
  }

  type AllegatoEnte {
    id_media: Int
    cd_dominio: String
    tl_valore_testuale: String
    ty_mime_type_media: String
    nm_nome_media: String
    iw_path: String
  }
 
  type EnteInfo {
        id_ente: Int!
        id_partita_iva_ente: String
        nm_ente: String
        nr_operatori_servizi_wemi: Int
        nm_ente_completo: String
        pg_versione: Int
        idStt: Int
        ptx_email: String
        cd_stato_ente: String
        tl_valore_testuale:JSON
        accreditato: Boolean
        id_utente: Int
        ptx_username:String
        ts_variazione_stato: Timestamp    
        id_spazio_wemi:[Int]
        id_cat_accreditamento:[Int]
        datiMerchant: Merchant
      }
  type Merchant {
    idEnte: Int
    merchantId: String
    publicKey: String
    privateKey: String
    dataInizio: Timestamp
    dataFine: Timestamp
  }

  type CategorieAccreditamentoEnte {
    value: Int
    textValue: String
  }

  type CategoriaAccreditamento {
    id_cat_accreditamento:Int
    tl_testo_1:String
}

  extend type Query {
    entePK(id_ente: Int!): Ente #Libera
    altreInfoEnte(id_ente: Int!): datiPropriEnte #Libera
    enteAll: [Ente] #Eliminare
    getValidDataMerchant(id_ente: Int!): Merchant #Libera
    enteDatiPK(id_ente_rif:Int!): datiPropriEnte #Libera
    EstraiListaEnte: [EnteInfo] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}])
    EstraiDatiPropriEnte (id_ente: Int!): EnteInfo @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "id_ente")
    EstraiCategorieAccreditamento(id_ente: Int!): [CategorieAccreditamentoEnte] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "id_ente")
    EstraiAllegatoEnte(id_media: Int!, id_ente: Int!): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE},${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "id_ente")
  }

  input MediaEnteInput {
    ty_mime_type_media: String
    nm_nome_media: String
    oj_media: String
  }

  extend type Mutation {
        ModificaDatiPropriEnte (input: ModificaDatiPropriEnteInput!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.id_ente")
        InserisciDatiIdentificativiEnte (input: InserisciDatiIdentificativiEnteInput): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE},${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.idCittadino")
        ModificaDatiIdentificativiEnte (input: ModificaDatiIdentificativiEnteInput): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE},${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.id_ente")
        modificaNoteEnte (input: ModificaNoteEnteInput!): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.id_ente_rif")
        InserisciDatiIPropriEnte (input: InserisciDatiIPropriEnteInput!): JSON @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "input.id_ente_rif")
        setDatiMerchant(merchant: InputMerchant!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.DATI_ENTE.code}, argsKey: "merchant.idEnte")
        setDatiPrezzo(input: DatiPrezzo!): Boolean @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.SERVIZI_EROGATI_ENTE.code}, argsKey: "input.idServizioEnte")
  }



  input DatiPrezzo {
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
    listinoPrezzi: [ListinoPrezzi]
  }

  input ListinoPrezzi {
    qtPersoneDa: Int
    qtPersoneA: Int
    offerta : [Offerta]
  }

  input Offerta {
    qtUnitaDa: Int
    qtUnitaA: Int
    valore: Float
  }

  input InputMerchant {
    idEnte: Int!
    merchantId: String!
    publicKey: String!
    privateKey: String!
    dataInizio: Timestamp!
    dataFine: Timestamp
    idUtente: Int
  }

    input ModificaDatiPropriEnteInput {
        id_ente: ID!
        cd_stato_ente: String!
        id_utente: Int!
    } 

    input InserisciDatiIdentificativiEnteInput {
      #### Colonne per tabella Utente
      ptx_email: String!
      #### Colonne per tabella Ente
      id_partita_iva_ente: String!
      nm_ente: String
      nr_operatori_servizi_wemi: Int
      nm_ente_completo: String
      cd_stato_ente: String!
      #### Colonne per tabella r_spazio_wemi_ente
      id_spazio_wemi: [Int]
      #### Colonne per tabella r_spazio_wemi_ente
      id_cat_accreditamento: [Int]
       #### Colonne per tabella sedi_ente
      js_sede: JSON
      idCittadino: Int!
  }

  input ModificaDatiIdentificativiEnteInput {
    ptx_email: String!
    id_ente: Int
    nr_operatori_servizi_wemi: Int
    id_partita_iva_ente: String
    nm_ente: String
    nm_ente_completo: String
    cd_stato_ente: String!
    id_spazio_wemi: [Int]
    id_cat_accreditamento: [Int]
}

  input ModificaNoteEnteInput {
    id_ente_rif: Int!
    js_note_adminwemi: JSON
    cd_stato_ente: Int
    id_utente: Int
  }

  input InserisciDatiIPropriEnteInput {
        
        js_note:JSON
        #### Colonne per tabella media
        gestisciMedia: [JSON]
        #### Colonne per tabella DatiPropriEnte
        id_ente_rif: Int
        tl_descrizione_ente: JSON
        js_referente: JSON
        js_primo_contatto: JSON
        js_altre_info: JSON
        note_per_cittadino: String
        #### Colonne per tabella sede_ente
        js_sede: JSON
        js_sede_secondaria: [JSON]
        eliminaSedi:[Int]
        #### Colonne per tabella ente_stt
        cd_stato_ente: Int
        #### parametri aggiuntivi
        operazione: Boolean
        operatori: [Operatore]
        eliminaUsers:[Operatore]
  }

  input Operatore{
    idEnte: Int
    email:String
    userName: String
    idUtente:Int
  }
   
`;
