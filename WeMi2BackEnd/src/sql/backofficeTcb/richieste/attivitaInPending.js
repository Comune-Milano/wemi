export const attivitaInPendingSql = (context) => {
  return `
  SELECT
  (
    --feedback da richiedere
    SELECT json_agg(json_build_object('idRichiesta', recse.id_rich_serv_rec))
    FROM ${context.tabelle.recensione_ente} recse
    INNER JOIN ${context.tabelle.recensione_ente_stt} recsestt on recse.id_rich_serv_rec = recsestt.id_rich_serv_rec
    INNER JOIN ${context.tabelle.richiesta_servizio_ente_stt} ricsestt on recsestt.id_rich_serv_rec = ricsestt.id_richiesta_servizio_ente
    WHERE (recsestt.cd_stato_recensione IS NULL
           AND ricsestt.cd_stato_ric_serv_ente::int = 12)
    OR (recse.cd_stato_rec_wemi IS NULL
        AND ricsestt.cd_stato_ric_serv_ente::int in (12, 13))
    AND recse.pg_rich_serv_rec = (SELECT MAX(pg_rich_serv_rec) 
                                  FROM ${context.tabelle.recensione_ente}
                                  WHERE id_rich_serv_rec = recse.id_rich_serv_rec)
    AND recsestt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                        FROM ${context.tabelle.recensione_ente_stt}
                                        WHERE id_rich_serv_rec = recsestt.id_rich_serv_rec)
    AND ricsestt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                        FROM ${context.tabelle.richiesta_servizio_ente_stt}
                                        WHERE id_richiesta_servizio_ente = ricsestt.id_richiesta_servizio_ente)
  ) AS "feedbackDaRichiedere",
  (
    --feedback da confermare
    SELECT json_agg(json_build_object('idRichiesta', recsestt.id_rich_serv_rec))
    FROM wemi2.recensione_servizio_ente_stt recsestt
    INNER JOIN wemi2.recensione_servizio_ente ON recensione_servizio_ente.id_rich_serv_rec = recsestt.id_rich_serv_rec
	  INNER JOIN wemi2.richiesta_servizio_ente ON richiesta_servizio_ente.id_richiesta_servizio_ente = recensione_servizio_ente.id_rich_serv_rec
	  INNER JOIN wemi2.richiesta_servizio_tcb ON richiesta_servizio_tcb.id_richiesta_servizio_tcb = richiesta_servizio_ente.id_richiesta_servizio_ente
    WHERE recsestt.cd_stato_recensione::int = 2
    AND recsestt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                        FROM wemi2.recensione_servizio_ente_stt
                                        WHERE id_rich_serv_rec = recsestt.id_rich_serv_rec)
  ) AS "feedbackDaConfermare",
  (
    --richieste da annullare
    SELECT json_agg(json_build_object('idRichiesta', ricsestt.id_richiesta_servizio_ente))
    FROM ${context.tabelle.richiesta_servizio_ente_stt} ricsestt
    WHERE ricsestt.cd_stato_ric_serv_ente::int = 14
    AND ricsestt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                        FROM ${context.tabelle.richiesta_servizio_ente_stt}
                                        WHERE id_richiesta_servizio_ente = ricsestt.id_richiesta_servizio_ente)
  ) AS "richiesteDaAnnullare",
  (
    --richieste in gestione
    SELECT json_agg(json_build_object('idRichiesta', ricsestt.id_richiesta_servizio_ente))
    FROM ${context.tabelle.richiesta_servizio_ente_stt} ricsestt
    WHERE ricsestt.cd_stato_ric_serv_ente::int = 11
    AND ricsestt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                        FROM ${context.tabelle.richiesta_servizio_ente_stt}
                                        WHERE id_richiesta_servizio_ente = ricsestt.id_richiesta_servizio_ente)
  ) AS "richiesteInGestione",
  (
    --richieste da chiudere positivamente
    SELECT json_agg(json_build_object('idRichiesta', ricsestt.id_richiesta_servizio_ente))
    FROM ${context.tabelle.richiesta_servizio_ente_stt} ricsestt
    WHERE ricsestt.cd_stato_ric_serv_ente::int = 12
    AND NOT EXISTS (SELECT 1 FROM ${context.tabelle.val_attributo_domanda} vad
                    WHERE vad.id_richiesta_servizio_tcb = ricsestt.id_richiesta_servizio_ente
                    AND vad.cd_attributo = 97)
    AND ricsestt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                        FROM ${context.tabelle.richiesta_servizio_ente_stt}
                                        WHERE id_richiesta_servizio_ente = ricsestt.id_richiesta_servizio_ente)
  ) AS "richiestedaChiuderePositivamente"
`;
}