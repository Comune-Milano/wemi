export const associaLavoratoreDomandaSql = (context) => {
  const sql = `
  UPDATE ${context.tabelle.r_match_ric_lav} 
  SET cd_stato_associazione = '1', tx_nota=null, id_ult_operatore = $[idUtente], ts_ultima_modifica = LOCALTIMESTAMP
  WHERE id_richiesta = $[input.codiceRichiesta] AND id_lavoratore = $[input.codiceLavoratore];

  UPDATE ${context.tabelle.r_match_ric_lav} 
  SET cd_stato_associazione = '4', id_ult_operatore = $[idUtente], ts_ultima_modifica = LOCALTIMESTAMP
  WHERE id_richiesta = $[input.codiceRichiesta] 
  AND cd_stato_associazione in ('5', '6');

  INSERT INTO ${context.tabelle.richiesta_servizio_ente_stt} (id_richiesta_servizio_ente, ts_variazione_stato, cd_stato_ric_serv_ente, id_utente, cd_stato_chat)
  VALUES ($[input.codiceRichiesta], LOCALTIMESTAMP, 12, $[idUtente], 0);

  INSERT INTO ${context.tabelle.richiesta_servizio_base_stt} (id_richiesta_servizio, ts_variazione_stato, cd_stato_richiesta_servizio, id_utente)
  VALUES ($[input.codiceRichiestaBase], LOCALTIMESTAMP, 8, $[idUtente]);

  INSERT INTO ${context.tabelle.allegato_richiesta} (id_allegato, id_richiesta, id_lavoratore, nm_nome_allegato_ric, oj_allegato_ric, ts_creazione)
  VALUES (nextval('${context.sequence.seq_allegato_richiesta}'), $[input.codiceRichiesta], $[input.codiceLavoratore], 'CV_OFFERTA_$[input.codiceLavoratore]', $[cvPdf], LOCALTIMESTAMP);
  `;

  return sql;
}
