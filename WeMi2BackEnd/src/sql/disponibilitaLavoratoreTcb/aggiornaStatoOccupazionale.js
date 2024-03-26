export const getDatiStatoOccupazionaleSql = (context) => {
  const sql = `
  SELECT dt_disponibile_dal as "dataDisponibileDa" 
  FROM ${context.tabelle.utente_offerta_lav}
  WHERE id_utente_lav = $[idUtente];
  
  SELECT vaou.cd_val_attributo as "id",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_ut} vaou
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaou.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaou.id_utente_offerta_lav = $[idUtente]
  AND vaou.cd_attributo = 109 and dtcb.ty_dominio_tcb = 36;

  SELECT DISTINCT id_servizio_riferimento as "idServizioRiferimento"
  FROM ${context.tabelle.utente_offerta_servizio}
  WHERE id_utente_lav = $[idUtente];
  `;

  return sql;
}

export const aggiornaStatoOccupazionaleSql = (context) => {
  const sql = `
  UPDATE ${context.tabelle.val_attributo_offerta_ut} 
  SET cd_val_attributo = $[input.codiceStatoOccupazionale], ts_modifica = LOCALTIMESTAMP
  WHERE id_utente_offerta_lav = $[idUtente] AND cd_attributo = 109;
  `;

  return sql;
}

export const aggiornaDataStatoOccupazionaleSql = (context) => {
  const sql = `
  UPDATE ${context.tabelle.utente_offerta_lav} 
  SET dt_disponibile_dal = $[input.dataDisponibileDa], ts_ultima_modifica = LOCALTIMESTAMP, id_ult_operatore = $[idUtente]
  WHERE id_utente_lav = $[idUtente];
  `;

  return sql;
}

export const aggiornaUtenteOffertaLavSql = (context) => {
  const sql = `
  UPDATE ${context.tabelle.utente_offerta_lav}
  SET ts_ultima_modifica = LOCALTIMESTAMP, id_ult_operatore = $[idUtente]
  WHERE id_utente_lav = $[idUtente];
  `;

  return sql;
}

export const inserisciStatoOccupazionaleSql = (context) => {
  const sql = `
  INSERT INTO ${context.tabelle.val_attributo_offerta_ut} (id_utente_offerta_lav, cd_attributo, cd_val_attributo, ts_modifica, ts_creazione)
  VALUES ($[idUtente], 109, $[input.codiceStatoOccupazionale], LOCALTIMESTAMP, LOCALTIMESTAMP);
  `;

  return sql;
}

export const inserisciDataStatoOccupazionaleSql = (context) => {
  const sql = `
  INSERT INTO ${context.tabelle.val_attributo_offerta_ut} (id_utente_offerta_lav, cd_attributo, cd_val_attributo, dt_val, ts_modifica, ts_creazione)
  VALUES ($[idUtente], 114, 0, $[input.dataDisponibileDa], LOCALTIMESTAMP, LOCALTIMESTAMP);
  `;

  return sql;
}
