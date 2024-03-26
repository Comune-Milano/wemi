export default {
    Query: {
      carrelloAll: async (parent, args, context, info) => {
        const sql = `
        select  id_carrello,
                js_dati_fatturazione,
                js_dati_pagamento,
                ts_creazione
        from    ${context.tabelle.carrello}`;
        context.logger.info(sql);
        return await context.db.any(sql, args);
      },
      
      carrelloPK: async (parent, args, context, info) => {
        const sql = `
        select  id_carrello,
                js_dati_fatturazione,
                js_dati_pagamento,
                ts_creazione
        from    ${context.tabelle.carrello}
        where   id_carrello = $[id_carrello]`;
        context.logger.info(sql, args);
        return await context.db.oneOrNone(sql, args);
      },
    },

    Mutation: {
      carrelloAdd: async (parent, args, context, info) => {
        const sql = `
        INSERT INTO ${context.tabelle.carrello}
        (id_carrello, js_dati_fatturazione, js_dati_pagamento, ts_creazione)
        VALUES (public.uuid_generate_v4(),
                $[js_dati_fatturazione],
                $[js_dati_pagamento],
                localtimestamp)
        RETURNING *`;
        context.logger.info(sql, args);
        return await context.db.one(sql, args.input);
      },

      carrelloUpd: async (parent, args, context, info) => {
        const sql = `
        UPDATE  ${context.tabelle.carrello}
        SET id_carrello = $[id_carrello],
            js_dati_fatturazione = $[js_dati_fatturazione],
            js_dati_pagamento = $[js_dati_pagamento],
            ts_creazione = localtimestamp
        where   id_carrello = $[id_carrello]`;
        context.logger.info(sql, args);
        return await context.db.none(sql, args.input);
      },

      carrelloDel: async (parent, args, context, info) => {
        const sql = `
        DELETE FROM ${context.tabelle.carrello}
        where id_carrello = $[id_carrello]`;
        context.logger.info(sql, args);
        return await context.db.none(sql, args);
      }

    }
};
