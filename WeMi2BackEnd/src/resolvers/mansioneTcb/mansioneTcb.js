import { 
    estraiMansioniColfQuery,
    estraiMansioniTataQuery, 
    estraiMansioniBadanteQuery,
    estraiMansioniTataCandidaturaQuery
} from "./queries";

/** @format */

export default {
    Query: {
        mansioneTcbAll: async (parent, args, context, info) => {
            const sql = `
            SELECT ty_dominio_tcb as "tyDominioTcb", 
            cd_dominio_tcb as "cdDominioTcb", 
            pg_visualizzazione as "pgVisualizzazzione", 
            tl_valore_testuale as "txTitoloMansione", 
            nr_valore_min_rif as "minRif", 
            nr_valore_max_rif as "maxRif"
            FROM ${context.tabelle.dominio_tcb}
            WHERE ty_dominio_tcb = 40
            `;
            return await context.db.any(sql, args);
        },
        EstraiMansioniTata: async (parent, args, context, info) => {
            return await context.db.any(estraiMansioniTataQuery, args);
        },
        EstraiMansioniTataCandidatura: async (parent, args, context, info) => {
            return await context.db.any(estraiMansioniTataCandidaturaQuery, args);
        },
        EstraiMansioniColf: async (parent, args, context, info) => {
            return await context.db.any(estraiMansioniColfQuery, args);
        },
        EstraiMansioniBadante: async (parent, args, context, info) => {
            return await context.db.any(estraiMansioniBadanteQuery, args);
        },
        EstraiMansioniAnimali: async (parent, args, context, info) => {
            const sql = `
            SELECT ty_dominio_tcb as "tyDominioTcb", 
            cd_dominio_tcb as "cdDominioTcb", 
            pg_visualizzazione as "pgVisualizzazzione", 
            tl_valore_testuale as "txTitoloMansione", 
            nr_valore_min_rif as "minRif", 
            nr_valore_max_rif as "maxRif"
            FROM  ${context.tabelle.dominio_tcb}
            WHERE ty_dominio_tcb = 44 and fg_domanda = '1'
            `;
            return await context.db.any(sql, args);
        },
    },
};
