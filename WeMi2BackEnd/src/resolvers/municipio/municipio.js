/** @format */

export default {
    Query: {
        municipioAll: async (parent, args, context, info) => {
            const sql = `
            select  cd_municipio as "idMunicipio",
                    tl_valore_testuale as "nmMunicipio"
            from    ${context.tabelle.d_municipio}`;
            context.logger.info(sql);
            return await context.db.any(sql, args);
        },
    },
};
