/** @format */

export default {
    Query: {
        destinatari: async (parent, args, context, info) => {
        const sql = `
            select    id_contenuto as "idDestinatario",
            tl_testo_1 as "txDestinatario"
            from    ${context.tabelle.contenuto}
            where    ty_contenuto=15
            ORDER BY nr_ordine_visualizzazione ASC`;
        context.logger.info(sql, args);
        return await context.db.any(sql, args);
      },

      destinatariServizio: async(parent, args, context, info) =>{
        const sql = `
        select  contenuto.id_contenuto as "idDestinatario",
        contenuto.tl_testo_1 as "txDestinatario"
        from    
          ${context.tabelle.servizio_erogato_ente} as se
          inner join ${context.tabelle.contenuto_associato} as ca 
            on ca.id_contenuto_primario = se.id_servizio_riferimento
          inner join ${context.tabelle.contenuto} as contenuto 
            on ca.id_contenuto_associato = contenuto.id_contenuto
          inner join ${context.tabelle.contenuto_stt} st on contenuto.id_contenuto = st.id_contenuto
          where
            contenuto.ty_contenuto = 15
            and st.ts_variazione_stato = (select max(st2.ts_variazione_stato)
                            from ${context.tabelle.contenuto_stt} as st2
                            where st2.id_contenuto = contenuto.id_contenuto)
            and ca.nm_relazione='TL1'
            and se.id_servizio_ente = $[id_servizio]
            and st.cd_stato_contenuto=2;`;
        context.logger.info(sql, args);
        return await context.db.any(sql, args);
      },

      destinatariPubblicati: async(parent, args, context, info) =>{
        const sql = `
        select  contenuto.id_contenuto as "idDestinatario",
        contenuto.tl_testo_1 as "txDestinatario"
        FROM  ${context.tabelle.contenuto} AS contenuto
        LEFT JOIN  ${context.tabelle.contenuto_stt} on 
        wemi2.contenuto_stt.id_contenuto =  contenuto.id_contenuto
            WHERE ty_contenuto = 15 AND contenuto_stt.cd_stato_contenuto = 2
            AND ts_variazione_stato = (
                SELECT MAX(ts_variazione_stato)
                FROM ${context.tabelle.contenuto_stt}
                WHERE wemi2.contenuto_stt.id_contenuto = contenuto.id_contenuto
            )
        ORDER BY nr_ordine_visualizzazione ASC`;
        context.logger.info(sql, args);
        return await context.db.any(sql, args);
      }
      
    },
    Destinatario:{
      destinatariSecondoLivello: async (parent, args, context, info) => {
        const sql = `
            select    id_contenuto_primario as "idDestinatario",
            tl_testo_1 as "txDestinatario",
            id_contenuto_associato as "idDestinatarioPrimoLivello"
            FROM ${context.tabelle.contenuto_associato}
            INNER JOIN ${context.tabelle.contenuto} ON id_contenuto= id_contenuto_primario
            where id_contenuto_associato=$[idDestinatario] and ty_contenuto=16
            ORDER BY nr_ordine_visualizzazione ASC
            `;
        context.logger.info(sql, args);
        return await context.db.any(sql, parent);
      },
    }
  };
  