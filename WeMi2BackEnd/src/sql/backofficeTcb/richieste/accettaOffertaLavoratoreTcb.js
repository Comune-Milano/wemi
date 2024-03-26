export const accettaOffertaLavoratoreSql = (context) => {
  const sql = `
  UPDATE ${context.tabelle.r_match_ric_lav} 
  SET 
    cd_stato_associazione = 6,
    id_ult_operatore = $[idUtente],
    tx_nota = null,
    ts_ultima_modifica = LOCALTIMESTAMP
  WHERE id_richiesta = $[input.codiceRichiesta] AND id_lavoratore = $[input.codiceLavoratore];
  `;
  
  return sql;
}