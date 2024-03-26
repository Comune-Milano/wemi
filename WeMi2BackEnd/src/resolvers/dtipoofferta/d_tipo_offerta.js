/** @format */

export default {
    Query: {
     
        dTipoOffertaAll: async (parent, args, context, info) => {
            const sql = `
                select  cd_tipo_offerta_srv as "cdOfferta", tl_valore_testuale,pg_visualizzazione
                from    ${context.tabelle.d_tipo_offerta}`;
            context.logger.info(sql);
            return await context.db.any(sql, args);
          },
  
  }
}
  
