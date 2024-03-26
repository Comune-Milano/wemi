export default {
    Query: {
        ContenutoJOINContenutoAssociatoByPK: async (parent, args, context, info) => {
            const sql = `
                SELECT id_contenuto,tl_testo_1,tl_testo_2
                FROM ${context.tabelle.contenuto} 
                INNER JOIN ${context.tabelle.contenuto_associato} 
                ON (${context.tabelle.contenuto}.id_contenuto = ${context.tabelle.contenuto_associato}.id_contenuto_associato) 
                WHERE id_contenuto_primario=$[id_contenuto_primario]
                ORDER BY nr_ordine_visualizzazione ASC`;
            context.logger.info(sql, args);
            return await context.db.any(sql, args);
        },
    },

    Mutation: {
    }
};
