export const disassociaLavoratoreSql = (context, args) => {
  const sql = `
  DELETE FROM ${context.tabelle.val_attributo_domanda}
  WHERE id_richiesta_servizio_tcb = $[input.codiceRichiesta]
  AND cd_attributo = 56
  AND cd_val_attributo = $[input.codiceMotivoDisassociazione];
  
  INSERT INTO ${context.tabelle.val_attributo_domanda} (id_richiesta_servizio_tcb, cd_attributo, cd_val_attributo, tx_nota, ts_modifica, ts_creazione)
  VALUES ($[input.codiceRichiesta], 56, $[input.codiceMotivoDisassociazione], $[input.descrizioneMotivoDisassociazione], LOCALTIMESTAMP, LOCALTIMESTAMP);
  
  UPDATE ${context.tabelle.r_match_ric_lav} 
  SET 
    cd_stato_associazione = ${args.input.codiceMotivoDisassociazione === 4 ? '3' : '2'},
    id_ult_operatore = $[idUtente],
    tx_nota = (SELECT tl_valore_testuale ->> 'it' as tx_nota
               FROM ${context.tabelle.dominio_tcb}
               WHERE ty_dominio_tcb = 56
               AND cd_dominio_tcb = $[input.codiceMotivoDisassociazione]),
    ts_ultima_modifica = LOCALTIMESTAMP
  WHERE id_richiesta = $[input.codiceRichiesta] 
  AND id_lavoratore = $[input.codiceLavoratore];
  `;
  
  return sql;
}