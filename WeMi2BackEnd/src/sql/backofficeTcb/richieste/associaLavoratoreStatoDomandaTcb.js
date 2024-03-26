export const associaLavoratoreStatoDomandaSql = (context) => {
  const sql = `
  INSERT INTO ${context.tabelle.richiesta_servizio_ente_stt} (id_richiesta_servizio_ente, ts_variazione_stato, cd_stato_ric_serv_ente, id_utente, cd_stato_chat)
  VALUES ($[input.codiceRichiesta], LOCALTIMESTAMP, 11, $[idUtente], 0);

  INSERT INTO ${context.tabelle.richiesta_servizio_base_stt} (id_richiesta_servizio, ts_variazione_stato, cd_stato_richiesta_servizio, id_utente)
  VALUES ($[input.codiceRichiestaBase], LOCALTIMESTAMP, 6, $[idUtente]);
  `;

  return sql;
}
