export const estraiDatiDisponibilitaOrariaSql = (context) => {
  const sql = `
  -- mezzaGiornataDiRiposo
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 159 and dtcb.ty_dominio_tcb = 15;

  -- nrOreSettimanaliDisponibilita
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 154 and dtcb.ty_dominio_tcb = 47;

  -- stipendioConvivente
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 167 and dtcb.ty_dominio_tcb = 3;

  -- spaziConvivente
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  vaos.tx_val,
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 163 and dtcb.ty_dominio_tcb = 30;

  -- stipendioConvivenzaRidotta
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 165 and dtcb.ty_dominio_tcb = 5;

  -- stipendioNonConvivente
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 168 and dtcb.ty_dominio_tcb = 4;
  
  -- spaziConvivenzaRidotta
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  vaos.tx_val,
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 164 and dtcb.ty_dominio_tcb = 30;

  -- stipendioPresenzaNotturna
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 169 and dtcb.ty_dominio_tcb = 12;

  --stipendioAssistenzaNotturna
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 166 and dtcb.ty_dominio_tcb = 11;

  --stipendioWeekend
  SELECT vaos.cd_val_attributo as "codiceAttributo",
  dtcb.tl_valore_testuale ->> 'it' as "value"
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.dominio_tcb} dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
  WHERE vaos.id_utente_lav = $[idUtente]
  AND vaos.id_servizio_riferimento = $[input.idServizioRiferimento]
  AND vaos.cd_attributo = 170 and dtcb.ty_dominio_tcb = 31;
  `;

  return sql;
}

export const estraiTipologieOrarioLavoratoreSql = (context) => {
  const sql = `
  SELECT cd_val_attributo as "codiceAttributo" FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente] AND cd_attributo = 161 
  AND id_servizio_riferimento = $[input.idServizioRiferimento];

  SELECT cd_val_attributo_orario_lav as "codiceAttributo",
  tx_lunedi as "lunedi",
  tx_martedi as "martedi",
  tx_mercoledi as "mercoledi",
  tx_giovedi as "giovedi",
  tx_venerdi as "venerdi",
  tx_sabato as "sabato",
  tx_domenica as "domenica"
  FROM ${context.tabelle.val_attributo_cal_off_serv_lav}
  WHERE id_utente_lav = $[idUtente] AND cd_attributo_orario_lav = 161
  AND id_servizio_riferimento = $[input.idServizioRiferimento];
  `;

  return sql;
}

export const verificaTipologieOrarioLavoratoreCheckedSql = (context, args) => {
  const sql =  `
  SELECT cd_val_attributo as "codiceAttributo" FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente] AND cd_attributo = 161
  AND cd_val_attributo IN ($[input.checkboxesTipologiaOrarioChecked:csv])
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  ORDER BY cd_val_attributo ASC;
  `;

  return sql;
}

export const verificaTipologieOrarioLavoratoreUncheckedSql = (context, args) => {
  const sql = `
  SELECT cd_val_attributo as "codiceAttributo" FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente] AND cd_attributo = 161
  AND cd_val_attributo IN ($[input.checkboxesTipologiaOrarioUnchecked:csv])
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  ORDER BY cd_val_attributo ASC;
  `;

  return sql;
}

export const checkConvivenzaMezzaGiornataDiRiposoSql = (context) => {
  const sql = `
  SELECT cd_val_attributo as "mezzaGiornataDiRiposo" FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente] AND cd_attributo = 159
  AND id_servizio_riferimento = $[input.idServizioRiferimento];
  `;

  return sql;
}

export const checkCalendarioSql = (context, tipologiaOrario) => {
  const sql = `
  SELECT cd_val_attributo_orario_lav as "codiceAttributo",
  tx_lunedi as "lunedi",
  tx_martedi as "martedi",
  tx_mercoledi as "mercoledi",
  tx_giovedi as "giovedi",
  tx_venerdi as "venerdi",
  tx_sabato as "sabato",
  tx_domenica as "domenica"
  FROM ${context.tabelle.val_attributo_cal_off_serv_lav}
  WHERE id_utente_lav = $[idUtente] AND cd_attributo_orario_lav = 161
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_val_attributo_orario_lav = ${tipologiaOrario};
  `;

  return sql;
}

export const verificaFasceOrarioCheckedSql = (context) => {
  const sql = `
  SELECT cd_val_attributo as "codiceAttributo" FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente] AND cd_attributo = 154
  AND cd_val_attributo IN ($[input.checkboxesNrOreSettimanaliDisponibilitaChecked:csv])
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  ORDER BY cd_val_attributo ASC;
  `;

  return sql;
}

export const verificaFasceOrarioUncheckedSql = (context) => {
  const sql = `
  SELECT cd_val_attributo as "codiceAttributo" FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente] AND cd_attributo = 154
  AND cd_val_attributo IN ($[input.checkboxesNrOreSettimanaliDisponibilitaUnchecked:csv])
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  ORDER BY cd_val_attributo ASC;
  `;

  return sql;
}

export const eliminaTipologiaOrarioSql = (context, tipologiaOrario) => {
  const sql = `
  DELETE FROM ${context.tabelle.val_attributo_cal_off_serv_lav}
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo_orario_lav = 161
  AND cd_val_attributo_orario_lav = ${tipologiaOrario};

  DELETE FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = 161
  AND cd_val_attributo = ${tipologiaOrario};
  `;

  return sql;
}

export const eliminaTipologiaOrarioConvivenzaSql = (context) => {
  const sql = `
  DELETE FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = 161
  AND cd_val_attributo = 1;

  DELETE FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = 159;
  `;

  return sql;
}

export const eliminaFasceOrarioSql = (context, fasceOrario) => {
  const sql = `
  DELETE FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = 154
  AND cd_val_attributo IN (${fasceOrario.join(",")})
  `;

  return sql;
}

export const eliminaTutteLeFasceOrarioSql = (context, fasceOrario) => {
  const sql = `
  DELETE FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = 154
  `;

  return sql;
}

export const eliminaAttributiSql = (context, codiceAttributo) => {
  const sql = `
  DELETE FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = ${codiceAttributo};
  `;

  return sql;
}

export const eliminaCalendario = (context, conditions={}) => {
  const sql = `
  DELETE FROM ${context.tabelle.val_attributo_cal_off_serv_lav}
  WHERE id_utente_lav = ${conditions.id_utente_lav}
  AND id_servizio_riferimento = ${conditions.id_servizio_riferimento}
  AND cd_attributo_orario_lav = ${conditions.cd_attributo_orario_lav}
  AND cd_val_attributo_orario_lav = ${conditions.cd_val_attributo_orario_lav};
  `;

  return sql;
}