export default {
    Query: {
        estraiConfigurazioniLivelliContrattuali: async (parent, args, context, info) => {
            let result;
            const sql = `
          SELECT
            nr_anno_rif,
            min.ty_dominio_tcb AS "dominioTcb",
            cd_tipo_orario_lavoro,
            min.cd_categoria_contrattuale,
            liv.cd_livello_contrattuale AS "cdLivelloContrattuale",
            liv.id_servizio_riferimento AS "idServizio",
            liv.pg_visualizzazione AS "livpg",
            liv.tl_valore_testuale_breve AS "txLivelloBreve",
            liv.tl_valore_testuale_lungo AS "txLivelloLungo",
            (im_importo_contributo + im_importo_indennita) AS "paga_minima_contrattuale",
            im_importo_contributo,
            im_importo_indennita,
            min.im_importo_indennita_tata,
            min.im_importo_indennita_badante
                FROM  ${context.tabelle.minimo_contrattuale_tcb} AS min
                LEFT JOIN ${context.tabelle.d_livello_contrattuale} AS liv ON min.cd_livello_contrattuale = liv.cd_livello_contrattuale
                WHERE liv.id_servizio_riferimento = $[idServizio] AND nr_anno_rif = (
                    SELECT
                    DISTINCT MAX(nr_anno_rif)
                    FROM wemi2.minimo_contrattuale_tcb AS min
                    LEFT JOIN wemi2.d_livello_contrattuale AS liv ON min.cd_livello_contrattuale = liv.cd_livello_contrattuale
                    WHERE liv.id_servizio_riferimento = $[idServizio] AND nr_anno_rif <= date_part('year', CURRENT_DATE)
                )
            ORDER BY "cdLivelloContrattuale" ASC `;
            context.logger.info(sql, args);
            await context.db.any(sql, args).then(risultato => result = risultato).catch(error => { throw new Error(error) });

            let minimoContrattuale = [];
            if (result.length > 0) {
                for (let i = 0; i < result.length; i += 1)
                    minimoContrattuale.push(
                        {
                            nr_anno_rif: result[i].nr_anno_rif,
                            dominioTcb: result[i].dominioTcb,
                            cd_tipo_orario_lavoro: result[i].cd_tipo_orario_lavoro,
                            cd_categoria_contrattuale: result[i].cd_categoria_contrattuale,
                            im_importo_contributo: result[i].im_importo_contributo,
                            im_importo_indennita: result[i].im_importo_indennita,
                            paga_minima_contrattuale: result[i].paga_minima_contrattuale,
                            im_importo_indennita_badante: result[i].im_importo_indennita_badante,
                            im_importo_indennita_tata: result[i].im_importo_indennita_tata,
                            LivelloContrattuale: {
                                idServizio: result[i].idServizio,
                                cdLivelloContrattuale: result[i].cdLivelloContrattuale,
                                livpg: result[i].livpg,
                                txLivelloBreve: result[i].txLivelloBreve,
                                txLivelloLungo: result[i].txLivelloLungo,
                            }
                        })
            }
            return minimoContrattuale;
        },
    }
}




