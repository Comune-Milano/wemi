export default {
    Query:{
        EstraiIndennita: async (parent, args, context, info) =>{
            const sql = `
            select nr_anno_rif as "annoRiferimento",
            im_pranzo as "indennitaPranzo",
            im_cena as "indennitaCena", 
            im_alloggio as "indennitaAlloggio"
            from ${context.tabelle.indennita_tcb}
            where nr_anno_rif = (
                SELECT MAX(nr_anno_rif)
                FROM ${context.tabelle.indennita_tcb}
            )
            `;
            context.logger.info(sql);
            return await context.db.oneOrNone(sql, args);
        }
    }
}