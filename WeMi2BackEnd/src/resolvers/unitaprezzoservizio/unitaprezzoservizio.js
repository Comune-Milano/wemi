export default {
  Query: {
    EstraiUnitaPrezzo: async (parent, args, context, info) => {
      let risultato = [];
      const sql = `select * 
                  from ${context.tabelle.d_unita_prezzo_servizio}
                  order by pg_visualizzazione`;
      await context.db.any(sql, args)
                .then(result=> risultato = result).catch(error => {
                  throw new Error(error);
                });
      return risultato;
    },
    EstraiUnitaPrezzoAll: async (parent, args, context, info) => {
      let risultato = [];
      const sql = `select 
                    cd_unita_prezzo,
                    tl_testo_aggettivo ->> 'it' as "title"
                    from ${context.tabelle.d_unita_prezzo_servizio}
                    order by pg_visualizzazione`;
      await context.db.any(sql, args)
                  .then(result=> risultato = result).catch(error => {
                    throw new Error(error);
                  });
      return risultato;
    },
  },
};