/** @format */
/** @deprecated */
export default {
    Query: {
        entePK: async (parent, args, context, info) => {
        const sql = `
        select  id_ente,
                id_partita_iva_ente,
                nm_ente,
                tx_municipi_accreditati,
                tx_email_referente,
                js_dati_identificativi_ente,
                dt_inizio_val,
                dt_fine_val,
                ts_creazione
        from    ${context.tabelle.ente}
        where   id_ente = $[id_ente];
        `;
        context.logger.info(sql, args);
        return await context.db.oneOrNone(sql, args);
      },
    },

   
};
