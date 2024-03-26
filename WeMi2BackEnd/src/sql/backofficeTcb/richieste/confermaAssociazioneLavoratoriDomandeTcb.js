export const confermaAssociazioneLavoratoriDomandeSql = (context) => {
  const sql = `
  UPDATE ${context.tabelle.r_match_ric_lav} 
  SET cd_stato_associazione = 6, id_ult_operatore = $[idUtente], ts_ultima_modifica = LOCALTIMESTAMP
  WHERE id_richiesta = $[codiceRichiesta] AND cd_stato_associazione = '5';
  `;

  return sql;
}