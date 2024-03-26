/** @format */

export default {
    Query: {
     
        dFasciaOrariaAll: async (parent, args, context, info) => {
            const sql = `
                select  cd_fascia_oraria as id_periodo, tl_valore_testuale,pg_visualizzazione
                from    ${context.tabelle.d_fascia_oraria}
                order by pg_visualizzazione`;
            context.logger.info(sql);
            return await context.db.any(sql, args);
          },
  
  }
}
  
