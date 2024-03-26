
import { gql } from 'apollo-server-express';
import { AMMINISTRATORE, AMMINISTRATORE_ENTE, OPERATORE_ENTE } from 'constants/usercode';

export default gql`
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
        id_contenuto: Int!
        nr_ordine_visualizzazione: Int
        pg_versione: Int
        tl_testo_1: JSON
        cd_stato_contenuto: Int
        cd_stato_contenuto_desc: String
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
        ty_mime_type_media2: String
        nm_nome_media2: String
        oj_media2: String,
        ty_mime_type_media3: String
        nm_nome_media3: String
        oj_media3: String
      }

    extend type Query {
        contenutoAll: [Contenuto] #Libera
        contenutoPK (id_contenuto: ID!): Contenuto #Libera
        contenutoTy (ty_contenuto: Int!, cd_stato_contenuto: Int): [ContenutoTY] @auth @protect(roles: [${AMMINISTRATORE}])
        contenutoByTy (ty_contenuto: Int!): [Contenuto] #Libera
        contenutoMediaPK (id_contenuto: ID!): ContenutoMedia! #Libera
        contenutoByTyS (ty_contenuto: Int!): [SelectUI] @auth @protect(roles: [${AMMINISTRATORE_ENTE},${OPERATORE_ENTE}])
    }

    extend type Mutation {
        statoContenutoUPD (input: statoContenutoUpdInput!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
        contenutoMediaADD (input: contenutoMediaADDinput!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
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

        id_contenuto_associato: Int,
        nm_relazione: String,

        cd_stato_contenuto: Int,
        id_utente: Int,

        ty_mime_type_media1: String,
        nm_nome_media1: String,
        oj_media1: String,

        ty_mime_type_media2: String
        nm_nome_media2: String
        oj_media2: String

        ty_mime_type_media3: String,
        nm_nome_media3: String,
        oj_media3: String
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
