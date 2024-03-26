import { statiDomandaTCB } from 'constants/db/statiDomandaTCB';
import { cdStatoDomandaTCB } from 'constants/db/cdStatoDomandaTCB';

export const getQueryRichiesteTcb = (context) => {
  const sql = `
  WITH resultTable as (
    SELECT
    rsb.id_richiesta_servizio_base as "codiceRichiestaBase",
    rstcb.id_richiesta_servizio_tcb as "codiceRichiesta",
    serv.id_servizio as "idServizio",
    (
      SELECT MAX(ts_variazione_stato)
      FROM ${context.tabelle.richiesta_servizio_ente_stt}
      WHERE cd_stato_ric_serv_ente::int in (0,${cdStatoDomandaTCB}) and id_richiesta_servizio_ente = rse.id_richiesta_servizio_ente
    ) as "dataRichiesta",
    rse_stt.ts_variazione_stato as "tsVariazioneStato",
    CASE
    WHEN (vadNome.tx_val is not null and vadCognome.tx_val is not null)
     THEN concat(vadNome.tx_val, ' ', vadCognome.tx_val)
    WHEN (uRichiedente.tx_nome_utente is not null and uRichiedente.tx_cognome_utente is not null)
     THEN concat(uRichiedente.tx_nome_utente, ' ', uRichiedente.tx_cognome_utente)
    END as "nomeFamiglia",
    dtcb.tl_valore_testuale #>> $[locale] as "statoRichiestaFamiglia",
    (
     SELECT array_agg(json_build_object(
       'statoAssociazione', rmrl.cd_stato_associazione::int, 
       'value', concat(vauNome.tx_val, ' ', vauCognome.tx_val),
       'idLavoratore', rmrl.id_lavoratore
     ))
     FROM ${context.tabelle.r_match_ric_lav} as rmrl
     INNER JOIN ${context.tabelle.val_attributo_ut} vauNome on rmrl.id_lavoratore = vauNome.id_utente AND vauNome.cd_attributo = 198
     INNER JOIN ${context.tabelle.val_attributo_ut} vauCognome on rmrl.id_lavoratore = vauCognome.id_utente AND vauCognome.cd_attributo = 185
     WHERE rmrl.id_richiesta = rse.id_richiesta_servizio_ente
    ) as "lavoratoriAssociati",
    (
      SELECT json_agg(concat(vauNome.tx_val, ' ', vauCognome.tx_val))
      FROM ${context.tabelle.r_match_ric_lav} as rmrl
      INNER JOIN ${context.tabelle.val_attributo_ut} vauNome on rmrl.id_lavoratore = vauNome.id_utente AND vauNome.cd_attributo = 198
      INNER JOIN ${context.tabelle.val_attributo_ut} vauCognome on rmrl.id_lavoratore = vauCognome.id_utente AND vauCognome.cd_attributo = 185
      WHERE rmrl.id_richiesta = rse.id_richiesta_servizio_ente
      and rmrl.cd_stato_associazione::int in (1, 5, 6)
    ) as "lavoratoriAssociatiSearch",
    (
      SELECT 
        CASE 
          WHEN COUNT(COALESCE(rmrl.id_richiesta, 0)) = 0 THEN false::bool
          WHEN COUNT(COALESCE(rmrl.id_richiesta, 0)) > 0 THEN true::bool
        END as "isLavoratoreAssociato"
      FROM ${context.tabelle.r_match_ric_lav} as rmrl
      INNER JOIN ${context.tabelle.val_attributo_ut} vauNome on rmrl.id_lavoratore = vauNome.id_utente AND vauNome.cd_attributo = 198
      INNER JOIN ${context.tabelle.val_attributo_ut} vauCognome on rmrl.id_lavoratore = vauCognome.id_utente AND vauCognome.cd_attributo = 185
      WHERE rmrl.id_richiesta = rse.id_richiesta_servizio_ente
      and rmrl.cd_stato_associazione::int in (1)
    ) as "isLavoratoreAssociato",
    uOperatore.ptx_username as "ultimoOperatore",
    rstcb.ts_ult_modifica as "ultimoAggiornamento",
    dtcb.cd_dominio_tcb as "codiceDominioTcb",
    CASE 
      WHEN dtcbChiusuraRichiesta.cd_dominio_tcb IS NOT NULL
        THEN json_build_object('id', dtcbChiusuraRichiesta.cd_dominio_tcb, 'value', dtcbChiusuraRichiesta.tl_valore_testuale #>> $[locale])
      ELSE NULL
    END as "statoChiusuraRichiesta",
    vadChiusuraRichiesta.tx_nota as "notaChiusuraRichiesta",
    (SELECT json_agg(json_build_object(
      'statoRecensioneLavoratore', cd_stato_rec, 
      'statoRecensioneWemi', cd_stato_rec_wemi,
      'progressivoRichiesta', pg_rich_serv_rec
      )) as "recensioniEnte"
     FROM (
       SELECT cd_stato_rec::int, cd_stato_rec_wemi::int, pg_rich_serv_rec
       FROM ${context.tabelle.recensione_ente}
       WHERE id_rich_serv_rec = rstcb.id_richiesta_servizio_tcb
       ORDER BY pg_rich_serv_rec DESC
      ) as recensioniEnteTable
    ) as "recensioniEnte",
    CASE 
      WHEN dtcbStatoDisassociazione.cd_dominio_tcb IS NOT NULL
        THEN json_build_object('id', dtcbStatoDisassociazione.cd_dominio_tcb, 'value', dtcbStatoDisassociazione.tl_valore_testuale #>> $[locale])
      ELSE NULL
    END as "statoDisassociazione",
    rstcb.js_impersonificazione as "jsImpersonificazione"
    FROM ${context.tabelle.richiesta_servizio_tcb} as rstcb
    INNER JOIN ${context.tabelle.richiesta_servizio_ente} as rse on rstcb.id_richiesta_servizio_tcb = rse.id_richiesta_servizio_ente
    INNER JOIN ${context.tabelle.richiesta_servizio_ente_stt} as rse_stt on rse.id_richiesta_servizio_ente = rse_stt.id_richiesta_servizio_ente 
    INNER JOIN ${context.tabelle.richiesta_servizio_base} rsb on rse.id_richiesta_servizio_base =  rsb.id_richiesta_servizio_base
    LEFT JOIN ${context.tabelle.utente} as uOperatore on rstcb.id_utente_ult_var = uOperatore.id_utente
    INNER JOIN ${context.tabelle.utente} as uRichiedente on rsb.id_utente_richiedente = uRichiedente.id_utente
    INNER JOIN ${context.tabelle.dominio_tcb} as dtcb on cast(rse_stt.cd_stato_ric_serv_ente as numeric) = dtcb.cd_dominio_tcb and dtcb.ty_dominio_tcb = 50
    INNER JOIN ${context.tabelle.servizio_erogato_ente} as see on rse.id_servizio_erogato_ente = see.id_servizio_ente
    INNER JOIN ${context.tabelle.servizio} as serv on see.id_servizio_riferimento = serv.id_servizio
    LEFT JOIN ${context.tabelle.val_attributo_domanda} as vadNome on rstcb.id_richiesta_servizio_tcb = vadNome.id_richiesta_servizio_tcb and vadNome.cd_attributo = 90
    LEFT JOIN ${context.tabelle.val_attributo_domanda} as vadCognome on rstcb.id_richiesta_servizio_tcb = vadCognome.id_richiesta_servizio_tcb and vadCognome.cd_attributo = 81
    LEFT JOIN ${context.tabelle.val_attributo_domanda} as vadChiusuraRichiesta on rstcb.id_richiesta_servizio_tcb = vadChiusuraRichiesta.id_richiesta_servizio_tcb and vadChiusuraRichiesta.cd_attributo = 97
    LEFT JOIN ${context.tabelle.dominio_tcb} as dtcbChiusuraRichiesta on vadChiusuraRichiesta.cd_val_attributo = dtcbChiusuraRichiesta.cd_dominio_tcb and dtcbChiusuraRichiesta.ty_dominio_tcb = 1
    LEFT JOIN ${context.tabelle.val_attributo_domanda} as vadStatoDisassociazione on rstcb.id_richiesta_servizio_tcb = vadStatoDisassociazione.id_richiesta_servizio_tcb and vadStatoDisassociazione.cd_attributo = 56
    LEFT JOIN ${context.tabelle.dominio_tcb} as dtcbStatoDisassociazione on vadStatoDisassociazione.cd_val_attributo = dtcbStatoDisassociazione.cd_dominio_tcb and dtcbStatoDisassociazione.ty_dominio_tcb = 56
    WHERE (vadChiusuraRichiesta.ts_modifica = (SELECT MAX(ts_modifica)
                                               FROM ${context.tabelle.val_attributo_domanda}
                                               WHERE id_richiesta_servizio_tcb = rstcb.id_richiesta_servizio_tcb and cd_attributo = 97)
           OR vadChiusuraRichiesta.ts_modifica is null)
    AND (rse_stt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                        FROM ${context.tabelle.richiesta_servizio_ente_stt}
                                        WHERE id_richiesta_servizio_ente = rse.id_richiesta_servizio_ente))
    AND (vadStatoDisassociazione.ts_modifica = (SELECT MAX(ts_modifica)
                                                FROM ${context.tabelle.val_attributo_domanda}
                                                WHERE id_richiesta_servizio_tcb = rstcb.id_richiesta_servizio_tcb and cd_attributo = 56)
         OR vadStatoDisassociazione.ts_modifica is null)                       
    AND rse_stt.cd_stato_ric_serv_ente::int <> 9
    AND CAST(cd_stato_ric_serv_ente AS int) <> ${statiDomandaTCB.bozza}
   )
   `;
   
   return sql;
}

export const countRichiesteTcbSql = (context, args) => {
  let sql = getQueryRichiesteTcb(context);
  sql += `
  SELECT COUNT("codiceRichiesta") as "righeTotali"
  FROM resultTable
  `;
  return createWhere(sql, args);
}

export const richiesteTcbSql = (context, args) =>  {
  let sql = getQueryRichiesteTcb(context);
  sql += `
  SELECT
  "codiceRichiestaBase",
  "codiceRichiesta", 
  "idServizio",
  "dataRichiesta",
  "jsImpersonificazione",
  "nomeFamiglia",
  "statoRichiestaFamiglia", 
  "lavoratoriAssociati",
  "ultimoOperatore", 
  "ultimoAggiornamento",
  "codiceDominioTcb",
  "statoChiusuraRichiesta",
  "notaChiusuraRichiesta",
  "recensioniEnte",
  "lavoratoriAssociatiSearch",
  "statoDisassociazione",
  "tsVariazioneStato"
  FROM resultTable
  `;
  sql = createWhere(sql, args);
  sql += `
  ORDER BY "ultimoAggiornamento" DESC, "dataRichiesta" DESC, "statoRichiestaFamiglia" ASC
  LIMIT 10 OFFSET $[numeroElementi]
  `;
  
  context.logger.info(sql);
  return sql;
};

const createWhere = (sql, args) => {
  let sqlWhere= "";
 
  if(args.searchFilter) {
   sql += "WHERE";
    if (args.searchFilter.richiedente) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` UPPER("nomeFamiglia") LIKE UPPER('%$[searchFilter.richiedente:value]%')`;
    }

    if (args.searchFilter.dataRichiestaDal && args.searchFilter.dataRichiestaAl) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` CAST("dataRichiesta" AS DATE) BETWEEN CAST($[searchFilter.dataRichiestaDal] AS DATE)
                                       and CAST($[searchFilter.dataRichiestaAl] AS DATE)`;
    }
    else if (args.searchFilter.dataRichiestaDal) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` CAST("dataRichiesta" AS DATE) >= CAST($[searchFilter.dataRichiestaDal] AS DATE)`;
    }else if (args.searchFilter.dataRichiestaAl){
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` CAST("dataRichiesta" AS DATE) <= CAST($[searchFilter.dataRichiestaAl] AS DATE)`;
    }

    if (args.searchFilter.statoRichiesta) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` "statoRichiestaFamiglia" = $[searchFilter.statoRichiesta] `;
    }
    if (args.searchFilter.idServizio) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` "idServizio" = $[searchFilter.idServizio] `;
    }
    if (args.searchFilter.idDomandaBase) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` "codiceRichiestaBase"::text LIKE UPPER('%$[searchFilter.idDomandaBase:value]%')`;
    }
    if(args.searchFilter.lavoratoreAssociato) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` UPPER("lavoratoriAssociatiSearch"::text) LIKE UPPER('%$[searchFilter.lavoratoreAssociato:value]%')`;
    }
    if(args.searchFilter.idRichiesteAttivitaPending) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += ` "codiceRichiesta" IN ($[searchFilter.idRichiesteAttivitaPending:csv])`;
    }
  }

  if (sqlWhere)
    sql += sqlWhere;
  
  return sql;
}