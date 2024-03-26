
import { gql } from 'apollo-server-express';
import { AMMINISTRATORE, OPERATORE_ENTE, AMMINISTRATORE_ENTE } from '../../constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`
type ContenutoCompleto{
  id_contenuto: Int!
  ty_contenuto: Int
  id_contenuto_rif: Int
  ty_sottotipo_contenuto: Int
  nr_ordine_visualizzazione: Int
  pg_versione: Int
  tl_testo_1: JSON
  tl_testo_2: JSON
  tl_testo_3: JSON
  tl_testo_4: JSON
  tl_testo_5: JSON
  ln_link_1: String
  ln_link_2: String
  id_media1: Int
  id_media2: Int
  id_media3: Int
  dt_inizio_val: Timestamp
  dt_fine_val: Timestamp
  js_dati_contenuto: JSON
  ts_creazione: Timestamp
  unitaPrezzo: Int
  tagsRicerca: String
  idCategoriaAccreditamento: Int
  media1: Media
  media2: Media
  media3: Media
  associati: [ContenutoAssociatoCompleto]
  associates: [JSON]
}

type ContenutoAssociatoCompleto{
  id_contenuto: Int
  ty_contenuto: Int
  id_contenuto_rif: Int
  ty_sottotipo_contenuto: Int
  nr_ordine_visualizzazione: Int
  pg_versione: Int
  tl_testo_1: JSON
  tl_testo_2: JSON
  tl_testo_3: JSON
  tl_testo_4: JSON
  tl_testo_5: JSON
  ln_link_1: String
  ln_link_2: String
  id_media1: Int
  id_media2: Int
  id_media3: Int
  dt_inizio_val: Date
  dt_fine_val: Date
  js_dati_contenuto: JSON
  ts_creazione: Timestamp
  media1: Media
  media2: Media
  media3: Media
}


    type Contenuto {
        id_contenuto: Int!
        ty_contenuto: Int
        id_contenuto_rif: Int
        ty_sottotipo_contenuto: Int
        nr_ordine_visualizzazione: Int
        pg_versione: Int
        tl_testo_1: JSON
        tl_testo_2: JSON
        tl_testo_3: JSON
        tl_testo_4: JSON
        tl_testo_5: JSON
        ln_link_1: String
        ln_link_2: String
        id_media1: Int
        id_media2: Int
        id_media3: Int
        dt_inizio_val: Date
        dt_fine_val: Date
        js_dati_contenuto: JSON
        ts_creazione: Timestamp
      }

      type ContenutoTY {
        id_contenuto_rif:Int
        id_contenuto: Int!
        nr_ordine_visualizzazione: Int
        ty_sottotipo_contenuto: Int
        pg_versione: Int
        tl_testo_1: JSON
        tl_testo_2: JSON
        tl_testo_3: JSON
        tl_testo_4: JSON
        tl_testo_5: JSON
        count: Int
        cd_stato_contenuto: Int
        cd_stato_contenuto_desc: String
        js_dati_contenuto: JSON
      }

      type ContenutoMedia {
        id_contenuto: Int!
        ty_contenuto: Int
        id_contenuto_rif: Int
        ty_sottotipo_contenuto: Int
        nr_ordine_visualizzazione: Int
        pg_versione: Int
        tl_testo_1: JSON
        tl_testo_2: JSON
        tl_testo_3: JSON
        tl_testo_4: JSON
        tl_testo_5: JSON
        ln_link_1: String
        ln_link_2: String
        id_media1: Int
        id_media2: Int
        id_media3: Int
        dt_inizio_val: Date
        dt_fine_val: Date
        js_dati_contenuto: JSON
        ts_creazione: Timestamp

        id_contenuto_primario: Int,
        id_contenuto_associato: Int,
        nm_relazione: String,
        ts_creazioneASS: Timestamp,

       # id_contenutoSTT: Int,
        ts_variazione_stato: Timestamp,
        cd_stato_contenuto: Int,
        id_utente: Int,

        ty_mime_type_media1: String
        nm_nome_media1: String
        oj_media1: String
        iw_path_media1: String
        ty_mime_type_media2: String
        nm_nome_media2: String
        oj_media2: String,
        ty_mime_type_media3: String
        nm_nome_media3: String
        oj_media3: String
      }
      type Footer{
        col1:[ContenutoMedia]
        col2:[ContenutoMedia]
      }
      type Menu{
        idLiv1: Int!
        txLiv1: JSON
        linkLiv1: String
        footerColDx: JSON
        liv2: [MenuLiv2]
      }

      type MenuLiv2 {
        idLiv2: Int!
        txLiv2: JSON
        linkLiv2: String
        sottotipo: Int
        media1: Media
      }

      type CategorieAccreditamento {
        id_contenuto: Int
        tl_testo_1 : JSON
      }
      
    extend type Query {
        estraiVociMenu: [Menu] #Libera
        estraiVociMenuPreviewLivello1 : [Menu] #Libera
        estraiVociMenuPreviewLivello2 : [Menu] #Libera
        estraiSpaziWeMiPubblicati: [Contenuto] #Libera
        estraiContenutoPrivacy: Contenuto #Libera
        EstraiTag(string: String!): [String] #Libera
        queryFooter (stt:Int) : Footer #Libera
        contenutoAll: [Contenuto] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        contenutoPK (id_contenuto: ID!): Contenuto #Libera
        contenutoTy (ty_contenuto: Int!, cd_stato_contenuto: Int, offset: Int, ricerca: String): [ContenutoTY] @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        contenutoByTy (ty_contenuto: Int!): [Contenuto]
        contenutoById (idContenuto: Int!): ContenutoMedia #Libera
        contenutoPubblicatoByTy (ty_contenuto: Int!): [Contenuto] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        contenutoPerQualifiche: [Contenuto] #Libera
        contenutoMediaPK (id_contenuto: ID!): ContenutoMedia #Libera
        #Query to split for admin and corporations
        contenutoByTyS (ty_contenuto: Int!): [SelectUI] @auth @protect(roles: [${AMMINISTRATORE_ENTE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}, ${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT}])
        contenutoTestoCarousel(ty_contenuto: Int!, stt:Boolean ):[ContenutoMedia] #Libera
        contenutoCards(ty_contenuto: Int!, stt:Boolean):[ContenutoMedia] #Libera
        contenutoTestoSchedaIntrod(ty_contenuto:Int!, stt:Boolean):[ContenutoMedia] #Libera
        contenutoSpazioSingoloWemi(ty_contenuto: Int!,stt:Boolean ):[ContenutoMedia] #Libera
        EstraiContenutoCompleto(idContenuto: Int!) : ContenutoCompleto @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        EstraiListaCategorieAccreditamento : [CategorieAccreditamento] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        EstraiListaCategorieAccreditamentoPubblicate: [CategorieAccreditamento] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    }


    extend type Mutation {
        ModificaContenuto(input: contenutoInputModifica!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        InserimentoContenuto(input: contenutoInput!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        statoContenutoUPD (input: statoContenutoUpdInput!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
        contenutoMediaADD (input: contenutoMediaADDinput!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT}])
    }
    input contenutoInputModifica{
      idContenuto: Int!
      js_dati_contenuto: JSON
      subtypeContenuto: Int
      ordineVisualizzazione: Int
      validitaDal: Date
      validitaAl: Date
      txTesto1: JSON
      txTesto2: JSON
      txTesto3: JSON
      txTesto4: JSON
      txTesto5: JSON
      link1: String
      link2: String
      versione: Int
      media1: mediaADDInput
      media2: mediaADDInput
      media3: mediaADDInput
      idUtente: Int!
      statoContenuto: Int!
      txTagsRicerca:String
      unitaPrezzo:Int
      categoriaAccreditamento:Int
      associati: [contenutoAssociatoInput]
      associatiCatLiv2: [Int]
      associatiMansioni: [Int]
      associatiDestinatari: [Int]
      associatesSections: [Int]
    }
    input contenutoInput{
      typeContenuto: Int
      js_dati_contenuto: JSON
      subtypeContenuto: Int
      ordineVisualizzazione: Int
      validitaDal: Date
      validitaAl: Date
      txTesto1: JSON
      txTesto2: JSON
      txTesto3: JSON
      txTesto4: JSON
      txTesto5: JSON
      link1: String
      link2: String
      versione: Int
      media1: mediaADDInput
      media2: mediaADDInput
      media3: mediaADDInput
      idUtente: Int
      statoContenuto: Int
      idCategoriaAccreditamento:Int
      txTagsRicerca:String
      unitaPrezzo:Int
      associati: [contenutoAssociatoInput]
      associatiCatLiv2: Int
      associatiMansioni: Int
      associatiDestinatari: Int
    }

    input statoContenutoUpdInput {
        id_contenuto: ID!
        cd_stato_contenuto: Int!
        id_utente: Int!
    }

    input contenutoMediaADDinput {
        ty_contenuto: Int!,
        ty_sottotipo_contenuto: Int,
        nr_ordine_visualizzazione: Int,
        tl_testo_1: JSON!,
        tl_testo_2: JSON,
        tl_testo_3: JSON,
        tl_testo_4: JSON,
        tl_testo_5: JSON,
        ln_link_1: String,
        ln_link_2: String,       
        dt_fine_val: Date,
        js_dati_contenuto: JSON,
        txTagsRicerca:String
        unitaPrezzo:Int
        categoriaAccreditamento:Int
        associati: [contenutoAssociatoInput]        
        associatesSections: [Int]

        cd_stato_contenuto: Int,
        ty_mime_type_media1: String,
        nm_nome_media1: String,
        oj_media1: String,

        ty_mime_type_media2: String
        nm_nome_media2: String
        oj_media2: String

        ty_mime_type_media3: String,
        nm_nome_media3: String,
        oj_media3: String
        associatiCatLiv2: [Int]
        associatiMansioni: [Int]
        associatiDestinatari: [Int]
    }

    # input contenutoMediaUPDinput {
    #    id_contenuto: Int!
    #     ty_contenuto: Int!
    #     id_contenuto_rif: Int
    #     ty_sottotipo_contenuto: Int
    #     nr_ordine_visualizzazione: Int
    #     tl_testo_1: JSON!
    #     tl_testo_2: JSON
    #     tl_testo_3: JSON
    #     tl_testo_4: JSON
    #     tl_testo_5: JSON
    #     ln_link_1: String
    #     ln_link_2: String
    #     id_media1: Int
    #     id_media2: Int
    #     id_media3: Int
    #     dt_fine_val: Date
    #     js_dati_contenuto: JSON

    #     id_contenuto_associato: Int
    #     nm_relazione: String

    #     id_utente: Int!

    #     ty_mime_type_media1: String
    #     nm_nome_media1: String
    #     oj_media1: String

    #     ty_mime_type_media2: String
    #     nm_nome_media2: String
    #     oj_media2: String
        
    #     ty_mime_type_media3: String
    #     nm_nome_media3: String
    #     oj_media3: String
    # }

`;
