
export const selectStatoRichiestaEnte = `
  SELECT
    richiestaEnteStt.cd_stato_ric_serv_ente AS "cdStato",
    richiestaEnte.ts_scadenza_acquisto AS "scadenzaAcquisto"
  FROM wemi2.richiesta_servizio_ente_stt richiestaEnteStt
  INNER JOIN wemi2.richiesta_servizio_ente richiestaEnte ON
    richiestaEnte.id_richiesta_servizio_ente = richiestaEnteStt.id_richiesta_servizio_ente
  WHERE 
    richiestaEnteStt.id_richiesta_servizio_ente = $[idRichiestaServizioEnte] AND
    richiestaEnteStt.ts_variazione_stato = (
      SELECT max(innerRichiestaEnteStt.ts_variazione_stato) FROM wemi2.richiesta_servizio_ente_stt innerRichiestaEnteStt
      WHERE innerRichiestaEnteStt.id_richiesta_servizio_ente = richiestaEnteStt.id_richiesta_servizio_ente
    );
`;

export const selectStatiRichiesteEnteByRichiestaBase =
` 
  SELECT 
    stt.id_richiesta_servizio_ente AS "idRichiestaEnte",
    stt.cd_stato_ric_serv_ente AS "statoRichiestaEnte",
    stt.cd_stato_chat AS "statoChat",
    stt.id_utente AS "idUtente"
  FROM wemi2.richiesta_servizio_ente_stt stt
  INNER JOIN wemi2.richiesta_servizio_ente rs 
    ON stt.id_richiesta_servizio_ente = rs.id_richiesta_servizio_ente
  WHERE
    rs.id_richiesta_servizio_base = $[idRichiestaBase] AND
    stt.ts_variazione_stato = (
        SELECT MAX(max_stt.ts_variazione_stato)
        FROM wemi2.richiesta_servizio_ente_stt max_stt
        WHERE max_stt.id_richiesta_servizio_ente = stt.id_richiesta_servizio_ente
    )
`;

export const insertStatiRichiestaServizioEnte = (valueInsert) =>
 `
  INSERT INTO wemi2.richiesta_servizio_ente_stt(
    id_richiesta_servizio_ente,
    ts_variazione_stato,
    cd_stato_ric_serv_ente,
    cd_stato_chat,
    id_utente
  )
  VALUES ${valueInsert}
`;

export const updateIdTransazionePagamentoRichiestaEnte = `
  UPDATE wemi2.richiesta_servizio_ente
  SET id_interno_trans_pag = $[idInternoTransPag]
  WHERE id_richiesta_servizio_ente = $[idRichiestaEnte];
`;