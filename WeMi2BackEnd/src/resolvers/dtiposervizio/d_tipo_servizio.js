/** @format */

export default {
    Query: {
     
        dTipoServizioAll: async (parent, args, context, info) => {
            const sql = `
                select  cd_tipo_servizio as "cdServizio", tl_valore_testuale,pg_visualizzazione
                from    ${context.tabelle.d_tipo_servizio}`;
            context.logger.info(sql);
            return await context.db.any(sql, args);
          },
  
  }
}
  
