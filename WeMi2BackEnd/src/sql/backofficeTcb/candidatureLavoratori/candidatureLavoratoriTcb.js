import { isNumber } from "util";
import { statiCandidatura } from 'constants/db/statiCandidatura';
import { FLAG_LAVORATORE } from 'constants/userroles';

export const countCandidatureLavoratoriTcbSql = (context, args) => {
  let sql = `
  SELECT COUNT(DISTINCT u.id_utente ) as "righeTotali"
  FROM ${context.tabelle.utente} as u
  LEFT JOIN ${context.tabelle.utente_offerta_lav} as uol on u.id_utente = uol.id_utente_lav
  LEFT JOIN ${context.tabelle.utente} as uOperatore on uol.id_ult_operatore = uOperatore.id_utente
  LEFT JOIN ${context.tabelle.val_attributo_ut} vauNome on u.id_utente = vauNome.id_utente AND vauNome.cd_attributo = 198
  LEFT JOIN ${context.tabelle.val_attributo_ut} vauCognome on u.id_utente = vauCognome.id_utente AND vauCognome.cd_attributo = 185
  LEFT JOIN ${context.tabelle.val_attributo_offerta_ut} as vaout on u.id_utente = vaout.id_utente_offerta_lav and vaout.cd_attributo = 109
  LEFT JOIN ${context.tabelle.dominio_tcb} as dtcbStatoOccupazionale on vaout.cd_val_attributo = dtcbStatoOccupazionale.cd_dominio_tcb and dtcbStatoOccupazionale.ty_dominio_tcb = 36
  LEFT JOIN ${context.tabelle.dominio_tcb} as dtcbStatoCanditatura on uol.cd_ultimo_stato_offerta = dtcbStatoCanditatura.cd_dominio_tcb and dtcbStatoCanditatura.ty_dominio_tcb = 52
  LEFT JOIN ${context.tabelle.utente_offerta_servizio} as uos on u.id_utente = uos.id_utente_lav
  LEFT JOIN ${context.tabelle.servizio} as s on uos.id_servizio_riferimento = s.id_servizio
  INNER JOIN wemi2.utente_offerta_lav_stt AS utOfLavStt ON utOfLavStt.id_utente_lav = u.id_utente
  INNER JOIN wemi2.utente as nomeUltMod ON nomeUltMod.id_utente = utOfLavStt.id_utente  
  `;
  
  sql = createWhereCount(sql, args);

  return sql;
}

export const candidatureLavoratoriTcbSql = (context, args) => {
  let sql = `
  SELECT u.id_utente as "idLavoratore",
  TO_CHAR(u.ts_creazione, 'DD/MM/YYYY') as "dataIscrizione",
  (
    SELECT  array_to_string(array_agg(tl_testo_2 ->> 'it'), ', ')
    FROM wemi2.servizio
    INNER JOIN wemi2.utente_offerta_servizio on utente_offerta_servizio.id_servizio_riferimento = servizio.id_servizio
	  INNER JOIN wemi2.contenuto ON contenuto.id_contenuto = servizio.id_servizio 
    WHERE utente_offerta_servizio.id_utente_lav = u.id_utente 
  ) as "tipologiaServizio",
  vauNome.tx_val as "nome",
  vauCognome.tx_val as "cognome",
  dtcbStatoOccupazionale.tl_valore_testuale #>> $[locale] as "statoOccupazionale",
  dtcbStatoCanditatura.tl_valore_testuale #>> $[locale] as "statoCandidatura",
  uOperatore.ptx_username as "nomeUltimaModifica",
  TO_CHAR(utOfLavStt.ts_variazione_stato, 'DD/MM/YYYY') as "dataCambioStato",
  uol.ts_ultima_modifica as "dataUltimoAggiornamento",
  nomeUltMod.ptx_username as "ultimoOperatore"
  FROM ${context.tabelle.utente} as u
  LEFT JOIN ${context.tabelle.utente_offerta_lav} as uol on u.id_utente = uol.id_utente_lav
  LEFT JOIN ${context.tabelle.utente} as uOperatore on uol.id_ult_operatore = uOperatore.id_utente
  LEFT JOIN wemi2.utente_offerta_lav_stt AS utOfLavStt ON utOfLavStt.id_utente_lav = u.id_utente
  LEFT JOIN wemi2.utente as nomeUltMod ON nomeUltMod.id_utente = utOfLavStt.id_utente
  LEFT JOIN ${context.tabelle.val_attributo_ut} vauNome on u.id_utente = vauNome.id_utente AND vauNome.cd_attributo = 198
  LEFT JOIN ${context.tabelle.val_attributo_ut} vauCognome on u.id_utente = vauCognome.id_utente AND vauCognome.cd_attributo = 185
  LEFT JOIN ${context.tabelle.utente_offerta_servizio} as uos on u.id_utente = uos.id_utente_lav
  LEFT JOIN ${context.tabelle.servizio} as s on uos.id_servizio_riferimento = s.id_servizio
  LEFT JOIN ${context.tabelle.val_attributo_offerta_ut} as vaout on u.id_utente = vaout.id_utente_offerta_lav and vaout.cd_attributo = 109
  LEFT JOIN ${context.tabelle.dominio_tcb} as dtcbStatoOccupazionale on vaout.cd_val_attributo = dtcbStatoOccupazionale.cd_dominio_tcb 
    AND dtcbStatoOccupazionale.ty_dominio_tcb = 36
  LEFT JOIN ${context.tabelle.dominio_tcb} as dtcbStatoCanditatura on uol.cd_ultimo_stato_offerta = dtcbStatoCanditatura.cd_dominio_tcb 
    AND dtcbStatoCanditatura.ty_dominio_tcb = 52
  `;

  sql = createWhere(sql, args);

  sql += `
  GROUP BY u.id_utente, vauNome.tx_val,  vauCognome.tx_val, vaout.cd_val_attributo,
  dtcbStatoOccupazionale.tl_valore_testuale #>> $[locale],
  dtcbStatoCanditatura.tl_valore_testuale #>> $[locale],
  uOperatore.ptx_username, uol.ts_ultima_modifica, utOfLavStt.ts_variazione_stato, nomeUltMod.ptx_username
  ORDER BY uol.ts_ultima_modifica DESC, vaout.cd_val_attributo ASC, "idLavoratore" ASC, dtcbStatoCanditatura.tl_valore_testuale #>> $[locale] ASC
  LIMIT 10 OFFSET $[numeroElementi]
  `;

  context.logger.info(args);
  context.logger.info(sql);
  return sql;
}

const createWhere = (sql, args) => {
  let sqlWhere = `WHERE uol.cd_ultimo_stato_offerta <> ${statiCandidatura.bozza} AND u.fg_lavoratore = '${FLAG_LAVORATORE}' AND utOfLavStt.ts_variazione_stato = (
    SELECT MAX(utenteOffLavStt.ts_variazione_stato)
    FROM wemi2.utente_offerta_lav_stt utenteOffLavStt
    WHERE utOfLavStt.id_utente_lav = utenteOffLavStt.id_utente_lav
  )`;

  if (args.searchFilter) {
    if (args.searchFilter.codiceFiscale) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `UPPER(u.ptx_codice_fiscale) LIKE $[searchFilter.codiceFiscale]`;
    }
    if (args.searchFilter.cognome) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `UPPER(vauCognome.tx_val) LIKE $[searchFilter.cognome]`;
    }
    if (args.searchFilter.dataCambioStatoDal && args.searchFilter.dataCambioStatoAl) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `cast(utOfLavStt.ts_variazione_stato as date) BETWEEN cast($[searchFilter.dataCambioStatoDal] as date) AND cast($[searchFilter.dataCambioStatoAl]  as date)`;
    } else {
      if (args.searchFilter.dataCambioStatoDal) {
        sqlWhere += sqlWhere ? ` AND ` : ``;
        sqlWhere += `cast(utOfLavStt.ts_variazione_stato as date) >=  cast( $[searchFilter.dataCambioStatoDal] as date)`;
      } else {
        if (args.searchFilter.dataCambioStatoAl) {
          sqlWhere += sqlWhere ? ` AND ` : ``;
          sqlWhere += `cast(utOfLavStt.ts_variazione_stato as date) <=  cast( $[searchFilter.dataCambioStatoAl] as date)`;
        }
      }
    }
    if (isNumber(args.searchFilter.statoCandidatura)) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `uol.cd_ultimo_stato_offerta = $[searchFilter.statoCandidatura]`;
    }

    if (isNumber(args.searchFilter.statoOccupazionale)) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `vaout.cd_val_attributo= $[searchFilter.statoOccupazionale]`;
    }
    if (args.searchFilter.dataAggiornamentoDal && args.searchFilter.dataAggiornamentoAl) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `cast(uol.ts_ultima_modifica as date) BETWEEN cast($[searchFilter.dataAggiornamentoDal] as date) AND cast($[searchFilter.dataAggiornamentoAl]  as date)`;
    } else {
      if (args.searchFilter.dataAggiornamentoDal) {
        sqlWhere += sqlWhere ? ` AND ` : ``;
        sqlWhere += `cast(uol.ts_ultima_modifica as date) >=  cast( $[searchFilter.dataAggiornamentoDal] as date)`;
      } else {
        if (args.searchFilter.dataAggiornamentoAl) {
          sqlWhere += sqlWhere ? ` AND ` : ``;
          sqlWhere += `cast(uol.ts_ultima_modifica as date) <=  cast( $[searchFilter.dataAggiornamentoAl] as date)`;
        }
      }
    }
    if (isNumber( args.searchFilter.tipologiaServizio)) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `uos.id_servizio_riferimento = $[searchFilter.tipologiaServizio] `;
    }
  }
  

  if (sqlWhere)
    sql += sqlWhere;

  return sql;
}


const createWhereCount = (sql, args) => {
  let sqlWhere = `WHERE uol.cd_ultimo_stato_offerta <> ${statiCandidatura.bozza} AND u.fg_lavoratore = '${FLAG_LAVORATORE}' AND utOfLavStt.ts_variazione_stato = (
    SELECT MAX(utenteOffLavStt.ts_variazione_stato)
    FROM wemi2.utente_offerta_lav_stt utenteOffLavStt
    WHERE utOfLavStt.id_utente_lav = utenteOffLavStt.id_utente_lav
  )`;

  if (args.searchFilter) {
    if (args.searchFilter.codiceFiscale) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `UPPER(u.ptx_codice_fiscale) LIKE $[searchFilter.codiceFiscale]`;
    }
    if (args.searchFilter.cognome) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `UPPER(vauCognome.tx_val) LIKE $[searchFilter.cognome]`;
    }
    if (args.searchFilter.dataCambioStatoDal && args.searchFilter.dataCambioStatoAl) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `cast(utOfLavStt.ts_variazione_stato as date) BETWEEN cast($[searchFilter.dataCambioStatoDal] as date) AND cast($[searchFilter.dataCambioStatoAl]  as date)`;
    } else {
      if (args.searchFilter.dataCambioStatoDal) {
        sqlWhere += sqlWhere ? ` AND ` : ``;
        sqlWhere += `cast(utOfLavStt.ts_variazione_stato as date) >=  cast( $[searchFilter.dataCambioStatoDal] as date)`;
      } else {
        if (args.searchFilter.dataCambioStatoAl) {
          sqlWhere += sqlWhere ? ` AND ` : ``;
          sqlWhere += `cast(utOfLavStt.ts_variazione_stato as date) <=  cast( $[searchFilter.dataCambioStatoAl] as date)`;
        }
      }
    }
    if (isNumber(args.searchFilter.statoCandidatura)) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `uol.cd_ultimo_stato_offerta = $[searchFilter.statoCandidatura]`;
    }
    if (isNumber(args.searchFilter.statoOccupazionale)) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `vaout.cd_val_attributo= $[searchFilter.statoOccupazionale]`;
    }
    if (args.searchFilter.dataAggiornamentoDal && args.searchFilter.dataAggiornamentoAl) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `cast(uol.ts_ultima_modifica as date) BETWEEN cast($[searchFilter.dataAggiornamentoDal] as date) AND cast($[searchFilter.dataAggiornamentoAl]  as date)`;
    } else {
      if (args.searchFilter.dataAggiornamentoDal) {
        sqlWhere += sqlWhere ? ` AND ` : ``;
        sqlWhere += `cast(uol.ts_ultima_modifica as date) >=  cast( $[searchFilter.dataAggiornamentoDal] as date)`;
      } else {
        if (args.searchFilter.dataAggiornamentoAl) {
          sqlWhere += sqlWhere ? ` AND ` : ``;
          sqlWhere += `cast(uol.ts_ultima_modifica as date) <=  cast( $[searchFilter.dataAggiornamentoAl] as date)`;
        }
      }
    }
    if ( isNumber( args.searchFilter.tipologiaServizio)) {
      sqlWhere += sqlWhere ? ` AND ` : ``;
      sqlWhere += `uos.id_servizio_riferimento = $[searchFilter.tipologiaServizio] `;
    }
  }

  if (sqlWhere)
    sql += sqlWhere;

  return sql;
}