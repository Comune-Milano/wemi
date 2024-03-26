export default {
    Query:{
        EstraiSostegniEconomici:  async (parent, args, context, info) => {
            const sql = `SELECT id_contenuto as "idSostegno", tl_testo_1 as "txSostegno"
            FROM ${context.tabelle.contenuto}
            WHERE ty_contenuto = 17`;
            context.logger.info(sql,args);
            return await context.db.any(sql,args);
          },
          //query per estrazione dei sostegni economici pubblicati dall'admin, da fare vedere nella scheda servizi
          EstraiSostegniEconomiciPubblicati:  async (parent, args, context, info) => {
            const sql = `SELECT contenuto.id_contenuto as "idSostegno", tl_testo_1 as "txSostegno"
            FROM ${context.tabelle.contenuto}
            LEFT JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
            WHERE ty_contenuto = 17 and contenuto_stt.cd_stato_contenuto = 2 and    ts_variazione_stato = (
                select MAX(ts_variazione_stato)
                from wemi2.contenuto_stt
                  where wemi2.contenuto_stt.id_contenuto =   wemi2.contenuto.id_contenuto 
              )
              ORDER BY nr_ordine_visualizzazione ASC`;
            context.logger.info(sql,args);
            return await context.db.any(sql,args);
          },
    }
}