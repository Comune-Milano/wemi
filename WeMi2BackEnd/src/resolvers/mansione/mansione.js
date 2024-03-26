/** @format */

export default {
    Query: {
        mansioneAll: async (parent, args, context, info) => {
            const sql = `
            select  id_contenuto as "idMansione",
            tl_testo_1 as "txTitoloMansione"
            from  ${context.tabelle.contenuto}
            where ty_contenuto=5
            order by nr_ordine_visualizzazione ASC
            `;
            context.logger.info(sql);
            return await context.db.any(sql, args);
        },
        mansioniPubblicateAll: async (parent, args, context, info) => {
            const sql = `
            SELECT  contenuto.id_contenuto as "idMansione",
            tl_testo_1 as "txTitoloMansione"
            FROM  ${context.tabelle.contenuto} AS contenuto
            LEFT JOIN  ${context.tabelle.contenuto_stt}  on 
            wemi2.contenuto_stt.id_contenuto =  contenuto.id_contenuto
                WHERE ty_contenuto = 5 AND contenuto_stt.cd_stato_contenuto = 2
                AND ts_variazione_stato = (
                    SELECT MAX(ts_variazione_stato)
                    FROM ${context.tabelle.contenuto_stt}
                    WHERE wemi2.contenuto_stt.id_contenuto = contenuto.id_contenuto
                )
            order by nr_ordine_visualizzazione ASC
            `;
            context.logger.info(sql);
            return await context.db.any(sql, args);
        },
        mansioneByService: async (parent, args, context, info) => {
            const sql = `
            select mansione.id_contenuto as "idMansione",
            mansione.tl_testo_1 as "txTitoloMansione"
            from ${context.tabelle.servizio_erogato_ente} 
            inner join wemi2.contenuto as servizio ON id_servizio_riferimento = servizio.id_contenuto
            left join wemi2.contenuto_associato ON id_contenuto_primario =servizio.id_contenuto
            left join wemi2.contenuto as mansione ON id_contenuto_associato = mansione.id_contenuto
            where id_servizio_ente = $[id_servizio_ente] and nm_relazione='MC'
            `;
            context.logger.info(sql);
            return await context.db.any(sql, args);
        },
        //query per estrazione delle mansioni pubblicate dall'admin, da fare vedere nella scheda servizi
        mansioniPubblicate: async (parent, args, context, info) => {
            
            const sql = `
            select mansione.id_contenuto as "idMansione",
            mansione.tl_testo_1 as "txTitoloMansione",
            mansione.nr_ordine_visualizzazione as "nrOrdineVisualizzazione"
            from ${context.tabelle.servizio_erogato_ente} 
            inner join wemi2.contenuto as servizio ON id_servizio_riferimento = servizio.id_contenuto
            left join wemi2.contenuto_associato ON id_contenuto_primario =servizio.id_contenuto
            left join wemi2.contenuto as mansione ON id_contenuto_associato = mansione.id_contenuto
            left join wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= mansione.id_contenuto
            where id_servizio_ente = $[id_servizio_ente] and nm_relazione='MC' and contenuto_stt.cd_stato_contenuto = 2 and    ts_variazione_stato = (
                select MAX(ts_variazione_stato)
                from wemi2.contenuto_stt
                  where wemi2.contenuto_stt.id_contenuto = mansione.id_contenuto 
              )
            ORDER BY mansione.nr_ordine_visualizzazione ASC

            `;
            context.logger.info(sql);
            return await context.db.any(sql, args);
        }
    },
};
