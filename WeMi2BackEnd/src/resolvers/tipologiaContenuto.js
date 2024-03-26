
export default {
    Query: {
      
      tipologiaContenutoAll: async (parent, args, context, info) => {
        const sql = `
        SELECT  id, ty_contenuto
        FROM    ${context.tabelle.tipologia_contenuto}
        ORDER BY id ASC;
        `;
        context.logger.info(sql, args);
        return await context.db.any(sql, args);
      },

      tipologiaContenutoPK: async (parent, args, context, info) => {
        const sql = `
        SELECT  id, ty_contenuto
        FROM    ${context.tabelle.tipologia_contenuto}
        WHERE   id=$[id]
        `;
        context.logger.info(sql, args);
        return await context.db.oneOrNone(sql, args);
      },
                
    },

    Mutation: {
    }
};