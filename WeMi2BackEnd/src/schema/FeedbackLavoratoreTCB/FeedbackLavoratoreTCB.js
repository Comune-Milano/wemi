/** @format */

import { gql } from 'apollo-server-express';
import { AMMINISTRATORE, CITTADINO, LAVORATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`

type InformazioniLavoratore {
  codiceLavoratore: Int
  nome: String
  cognome: String
  eta: Int 
  nazionalita: String
  statoAssociazione: String
  codiceDominioTcb: Int
  numeroDomandeRifiutate: Int
  numeroDomandeAccettate: Int
  notaRichiesta: String
  statoDisassociazione: JSON
}

type ListaMansioni {
    tl_valore_testuale: JSON
    id_servizio_erogato_ente: Int
    tx_nota: String
    js_dati_richiesta: JSON
    cd_attributo: Int
    cd_val_attributo: Int
    fg_mansione_svolta: Int
    cd_dominio_tcb: Int
}

type RecensioneLavoratore {
    id_rich_serv_rec: Int
    qt_media_singola_recensione: Int
    js_dati_recensione: JSON
    js_dati_recensione_wemi: JSON
    ts_creazione: JSON
    pg_rich_serv_rec: Int
    cd_stato_rec: Int
    cd_stato_rec_wemi: Int
    fg_mansione_svolta: Int
    maxProgressivo: Int
    tx_nota: String
    cd_val_attributo: Int
}

type RichiestaFeedback {
    nomeservizio: String
    id_servizio_erogato_ente: Int
}

extend type Query {
    ListaMansioni (id_richiesta_servizio_tcb:Int!): [ListaMansioni] @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "id_richiesta_servizio_tcb")
    ListaMansioniAdmin (id_richiesta_servizio_tcb:Int!): [ListaMansioni] @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
    ListaMansioniLavoratore (id_richiesta_servizio_tcb:Int!): [ListaMansioni] @auth @protect(roles: [${LAVORATORE}])
    EstraiRichiesta (id_richiesta_servizio_tcb:Int!) : [RichiestaFeedback] @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "id_richiesta_servizio_tcb")
    EstraiRichiestaAdmin (id_richiesta_servizio_tcb:Int!) : [RichiestaFeedback] @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
    EstraiRichiestaLavoratore (id_richiesta_servizio_tcb:Int!) : [RichiestaFeedback] @auth @protect(roles: [${LAVORATORE}])
    EstraiDatiLavoratore (locale: String!, codiceRichiesta: Int!) : InformazioniLavoratore @auth @protect(roles:[${AMMINISTRATORE},${LAVORATORE},${CITTADINO}]) 
    EstraiRecensione  (id_rich_serv_rec:Int!, pg_rich_serv_rec:Int) : RecensioneLavoratore @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "id_rich_serv_rec")
    EstraiRecensioneAdmin (id_rich_serv_rec:Int!, pg_rich_serv_rec:Int) : RecensioneLavoratore @auth @protect(roles: [${AMMINISTRATORE}]) @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
    EstraiRecensioneLavoratore (id_rich_serv_rec:Int!) : RecensioneLavoratore @auth @protect(roles: [${LAVORATORE}])
    EstraiAllFeedbacks (id_rich_serv_rec:Int!) : [RecensioneLavoratore] @auth @protect(roles: [${LAVORATORE},${CITTADINO},${AMMINISTRATORE}]) 
    EstraiRecensioniMultiple (idRecensioni : [Int]): [RecensioneLavoratore] @auth @protect(roles: [${AMMINISTRATORE}])
}

extend type Mutation {
    ConfermaRecensione (id_rich_serv_rec:Int!,
                        js_dati_recensione: JSON,
                        qt_media_singola_recensione: Int!,
                        JsonFiltro: JSON,
                        cd_stato_rec: Int,
                        id_richiesta_servizio_tcb: Int,
                        cd_attributo: Int,
                        ): Boolean @auth @protect(roles: [${AMMINISTRATORE},${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "id_rich_serv_rec")
UpdateCdStatoRec  (cd_stato_rec:Int!,
                            id_rich_serv_rec:Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE},${CITTADINO},${LAVORATORE}])  @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "id_rich_serv_rec") 
}
`;
