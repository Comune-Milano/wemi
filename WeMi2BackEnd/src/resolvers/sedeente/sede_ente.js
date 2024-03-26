export default {

  Query: {
    AltraSedeEntePK: async (parent, args, context, info) => {
      const sql = `
        SELECT  
              id_sede, js_sede
        FROM    ${context.tabelle.sede_ente}
        WHERE id_ente_rif = $[id_ente] AND ty_sede>1`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    
  },

  Mutation: {

    sedeRemove: async (parent, args, context, info) => {
      const sql = `
      DELETE 
      FROM 
            ${context.tabelle.sede_ente} 
      WHERE 
            id_sede=$[id_sede]
         `;
      context.logger.info(sql, args);
      return await context.db.none(sql, args);
    },

    sedeInsert: async (parent, args, context, info) => {
      const sql = `
      INSERT INTO ${context.tabelle.sede_ente} 
            (id_sede,
             id_ente_rif,
             ty_sede,
             js_sede,
             ts_creazione)
      VALUES
            (nextval('wemi2.seq_sede_ente'),
            $[id_ente_rif],
            $[ty_sede],
            $[js_sede],
            localtimestamp
      )
      RETURNING id_sede,ty_sede,js_sede`;
      context.logger.info(sql, args.input);
      return await context.db.one(sql, args.input);
    },

    sedeUpdate: async (parent, args, context, info) => {
      const sql = `
      UPDATE ${context.tabelle.sede_ente}
      SET js_sede=$[js_sede]
      WHERE id_sede=$[id_sede]`;
      context.logger.info(sql, args.input);
      return await context.db.none(sql, args.input);
    },
  },

  datiPropriEnte: {
    sedeEnte: async (parent, args, context, info) => {
      const sql = `
          SELECT id_sede, id_ente_rif, ty_sede, js_sede, ts_creazione
          FROM ${context.tabelle.sede_ente}
          WHERE id_ente_rif =$[id_ente_rif]
          ORDER BY ty_sede asc`;
      context.logger.info(sql, parent);
      return await context.db.any(sql, parent);
    },
  }
}