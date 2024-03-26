export const inserisciAggiornaRecensioneEnteLavoratoreSql = (context, pg_rich_serv_rec) => {
  const sql = `
  ${pg_rich_serv_rec ? `
  INSERT INTO ${context.tabelle.recensione_ente} (id_rich_serv_rec, ts_creazione, cd_stato_rec, pg_rich_serv_rec)
  VALUES ($[codiceRichiesta], LOCALTIMESTAMP, '1', ${pg_rich_serv_rec});
  ` : `
  UPDATE ${context.tabelle.recensione_ente} 
  SET cd_stato_rec = '1'
  WHERE id_rich_serv_rec = $[codiceRichiesta]
  AND pg_rich_serv_rec = 1;
  `}

  INSERT INTO ${context.tabelle.recensione_ente_stt} (id_rich_serv_rec, ts_variazione_stato, cd_stato_recensione, id_utente, pg_rich_serv_rec)
  VALUES ($[codiceRichiesta], LOCALTIMESTAMP, '1', $[idUtente], 1);
  `;

  return sql;
}

export const inserisciAggiornaRecensioneEnteWemiSql = (context) => {
  const sql = `
  UPDATE ${context.tabelle.recensione_ente} 
  SET cd_stato_rec_wemi = '1'
  WHERE id_rich_serv_rec = $[codiceRichiesta]
  AND pg_rich_serv_rec = 1;
  `;

  return sql;
}

export const selezionaRecensioneServizioEnteSql = (context) => {
  const sql = `
  SELECT * FROM ${context.tabelle.recensione_ente}
  WHERE id_rich_serv_rec = $[codiceRichiesta]
  ORDER BY pg_rich_serv_rec DESC;
  `;

  return sql;
}
