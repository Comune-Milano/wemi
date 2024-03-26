/** @format */

export default {
  Query: {
    periodoErogazioneAll: async (parent, args, context, info) => {
      const sql = `
          select  cd_periodo_erogazione as id_periodo, tl_valore_testuale,pg_visualizzazione
          from    ${context.tabelle.periodo_erogazione}`;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    dominioAll: async (parent, args, context, info) => {
      const sql = `
          select  cd_dominio,
                  tl_valore_testuale,
                  coalesce(tl_valore_testuale ->> $[language], tl_valore_testuale ->> 'it') 
              as tl_valore_testuale_lingua,
                  ty_dominio,
                  pg_visualizzazione
          from    ${context.tabelle.dominio}`;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    dominioPK: async (parent, args, context, info) => {
      const sql = `
          select  cd_dominio,
                  tl_valore_testuale,
                  coalesce(tl_valore_testuale ->> $[language], tl_valore_testuale ->> 'it') 
              as tl_valore_testuale_lingua,
                  ty_dominio,
                  pg_visualizzazione
          from    ${context.tabelle.dominio}
          where   ty_dominio = $[ty_dominio] AND cd_dominio = $[cd_dominio]`;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args);
    },
    
    dominioByTipo: async (parent, args, context, info) => {
      const sql = `
      select  cd_dominio,
              coalesce(tl_valore_testuale ->> $[language], tl_valore_testuale ->> 'it') 
              as tl_valore_testuale_lingua,
              tl_valore_testuale,
              ty_dominio,
              pg_visualizzazione
      from    ${context.tabelle.dominio}
      where   ty_dominio = $[ty_dominio]`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    dominioByTipoS: async (parent, args, context, info) => {
      args.language = args.language || 'it';
      const sql = `
      SELECT
        cd_dominio AS "value",
        tl_valore_testuale,
        coalesce(tl_valore_testuale ->> $[language], tl_valore_testuale ->> 'it') AS "textValue",
        ty_dominio,
        pg_visualizzazione
      FROM    ${context.tabelle.dominio}
      WHERE   ty_dominio = $[ty_dominio]`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    Categoria: async (parent, args, context, info) => {
      const sql = `
      select  id_contenuto as "idCategoria",
              coalesce(tl_testo_1 ->> $[language], tl_testo_1 ->> 'it') 
              as "txTitoloCategoria"
      from    ${context.tabelle.contenuto}
      where ty_contenuto=4 `;
      context.logger.info(sql, args);
      return await context.db.many(sql, args);
    },

  }


};
