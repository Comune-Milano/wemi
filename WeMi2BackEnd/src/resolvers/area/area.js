export default {
  Query: {
    allAree: async (parent, args, context) => {
      const sql = `
            select  id_contenuto as "idArea", tl_testo_1 
                    as "txTitoloArea"
            from    ${context.tabelle.contenuto}
            where ty_contenuto=3`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },
    areaPK: async (parent, args, context) => {
      const sql = `
            select  id_contenuto as "idArea", tl_testo_1 
                    as "txTitoloArea"
            from    ${context.tabelle.contenuto}
            where id_contenuto = $[idArea]`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },
  },
};