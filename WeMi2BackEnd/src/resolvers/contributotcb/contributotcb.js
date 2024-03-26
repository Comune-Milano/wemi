/** @format */
export default {
    Query: {
        EstraiContributi: async (parent, args, context, info) => {
            const sql = `
            SELECT
                im_contributo_orario_si_cuaf AS "contributoSicuaf",
                im_contributo_orario_dip AS "contributoOrarioDipendente",
                ty_contributo_tcb AS "tyContributoTcb"
            FROM 
                ${context.tabelle.contributo_tcb}
            WHERE
                $[oreSettimanali]  between nr_ore_da and nr_ore_a
                and $[retribuzioneOrariaEffettiva] between im_retr_effettiva_oraria_da and im_retr_effettiva_oraria_a
                AND ty_contributo_tcb IN  ($[tyContributo:csv]) `;
            context.logger.info(sql, args.input);
            return await context.db.any(sql, args.input);
          },
    }
}
