import { gql } from 'apollo-server-express';
import { AMMINISTRATORE, AMMINISTRATORE_ENTE, OPERATORE_ENTE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`
    type Media {
        id_media: Int
        ty_mime_type_media: String
        ty_allegato: String
        nm_nome_media: String
        oj_media: String
        iw_path_media1: String
        iw_path: String
        tl_valore_testuale: JSON
        ts_creazione: Timestamp
      }

    extend type Query {
        mediaAll: [SelectUI] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "")
        EstraiMedia(idMedia: Int!): Media #Eliminare
        mediaPK (id_media: ID!): Media! #Libera
        EstraiAllegatiEnte (id_ente: Int!): [Media] #Libera
        EstraiAllegatiServizioEnte (idServizioEnte: Int!): [Media] #Libera
        EstraiMediaBase64 (id_media: Int!): Media #Libera
        

        
    }

    extend type Mutation {
        DeleteMediaWithContenuto(idMedia: Int!, idContenuto: Int!): Boolean #Eliminare
        mediaADD(input: mediaADDInput!): Boolean @auth @protect(roles: [${AMMINISTRATORE}, ${OPERATORE_ENTE}, ${AMMINISTRATORE_ENTE}])
        mediaUPD (input: mediaInput!): Boolean #Eliminare
    }

    input mediaADDInput {
        id_media: Int
        ty_mime_type_media: String
        nm_nome_media: String
        oj_media: String
    }

    input mediaInput {
        id_media: Int
        ty_mime_type_media: String
        nm_nome_media: String
        oj_media: String
        ts_creazione: Timestamp
    }

`;
