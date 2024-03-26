/** @format */

export default {
  Query: {
    DatiLavoratoreCandidatura: async (parent, args, context, info) => {
      const sql = `
      SELECT u.id_utente,
      vauNome.tx_val as "nome",
      vauCognome.tx_val as "cognome",
      uolstt1.cd_stato_dati_lav
      FROM ${context.tabelle.utente} as u
      LEFT JOIN ${context.tabelle.val_attributo_ut} vauNome on u.id_utente = vauNome.id_utente AND vauNome.cd_attributo = 198
      LEFT JOIN ${context.tabelle.val_attributo_ut} vauCognome on u.id_utente = vauCognome.id_utente AND vauCognome.cd_attributo = 185
      LEFT JOIN ${context.tabelle.utente_offerta_lav_stt} uolstt1 ON u.id_utente = uolstt1.id_utente_lav
      WHERE u.id_utente = $[id_utente] 
      AND uolstt1.ts_variazione_stato = 
      (
        SELECT MAX(ts_variazione_stato)
        FROM ${context.tabelle.utente_offerta_lav_stt} uolstt2
        WHERE u.id_utente = uolstt2.id_utente_lav
      )`;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args);
    },
    StoricoLavoratoreFiltro: async (parent, args, context, info) => {
      
      const sql = `
      SELECT 
      (
        SELECT  array_to_string(array_agg(tl_testo_2 ->> 'it'), ', ')
        FROM wemi2.servizio
        INNER JOIN wemi2.utente_offerta_servizio on utente_offerta_servizio.id_servizio_riferimento = servizio.id_servizio
        INNER JOIN wemi2.contenuto ON contenuto.id_contenuto = servizio.id_servizio 
        WHERE utente_offerta_servizio.id_utente_lav = $[id_utente] AND id_servizio_riferimento = serv.id_servizio 
      ) as "tipoServizio",
      rse.id_richiesta_servizio_base,
      rmrl.id_richiesta,
      rmrl.cd_stato_associazione,
      dtcbStAss.tl_valore_testuale ->> $[locale] AS "stato_associazione",
      rmrl.tx_nota as "nota_richiesta",
      dtcbStcand.tl_valore_testuale ->> $[locale] AS "stato_candidatura",
      serv.id_servizio,
      rmrl.ts_creazione,
      (SELECT json_agg(json_build_object(
        'statoRecensione', cd_stato_recensione, 
        'progressivoRichiesta', pg_rich_serv_rec
        )) as "recensioniEnte"
       FROM (
         SELECT cd_stato_recensione::int, pg_rich_serv_rec
         FROM ${context.tabelle.recensione_ente_stt}
         WHERE id_rich_serv_rec = rse.id_richiesta_servizio_ente
         ORDER BY ts_variazione_stato DESC
        ) as recensioniEnteTable
      ) as "recensioniEnte"
      FROM ${context.tabelle.r_match_ric_lav} AS rmrl
      LEFT JOIN ${context.tabelle.richiesta_servizio_ente} AS rse ON rmrl.id_richiesta = rse.id_richiesta_servizio_ente
      LEFT JOIN ${context.tabelle.servizio_erogato_ente} AS see ON rse.id_servizio_erogato_ente = see.id_servizio_ente
      LEFT JOIN ${context.tabelle.servizio} AS serv ON see.id_servizio_riferimento = serv.id_servizio
      LEFT JOIN ${context.tabelle.richiesta_servizio_ente_stt} AS rsestt ON rmrl.id_richiesta = rsestt.id_richiesta_servizio_ente
      LEFT JOIN ${context.tabelle.utente_offerta_lav} as uol on rmrl.id_lavoratore = uol.id_utente_lav
      INNER JOIN ${context.tabelle.dominio_tcb} AS dtcbStAss on dtcbStAss.cd_dominio_tcb = CAST(rmrl.cd_stato_associazione as numeric)
                 AND dtcbStAss.ty_dominio_tcb = 51
      INNER JOIN ${context.tabelle.dominio_tcb} AS dtcbStcand on dtcbStcand.cd_dominio_tcb = uol.cd_ultimo_stato_offerta
                 AND dtcbStcand.ty_dominio_tcb = 52
      WHERE rmrl.id_lavoratore = $[id_utente] 
      AND rsestt.cd_stato_ric_serv_ente = $[cd_stato_ric_serv_ente] 
      ${args.cd_stato_associazione ? 
        "AND rmrl.cd_stato_associazione = $[cd_stato_associazione]" :
        ""
      }
      ${args.dataOfferta ? 
        "AND TO_CHAR(rmrl.ts_creazione, 'DD/MM/YYYY') = $[dataOfferta]" : 
        ""
      }
      ORDER BY rmrl.cd_stato_associazione DESC`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    }
  }
};
