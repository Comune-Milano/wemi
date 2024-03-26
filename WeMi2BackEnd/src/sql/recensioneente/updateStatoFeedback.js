export const updateStatoFeedback = `
UPDATE wemi2.recensione_servizio_ente
SET cd_stato_rec = $[cd_stato_rec]
WHERE id_rich_serv_rec = $[id_rich_serv_rec] and pg_rich_serv_rec = (SELECT MAX(pg_rich_serv_rec)
FROM wemi2.recensione_servizio_ente
WHERE id_rich_serv_rec = $[id_rich_serv_rec]);

INSERT INTO wemi2.recensione_servizio_ente_stt (
  id_rich_serv_rec,
  ts_variazione_stato,
  cd_stato_recensione,
  id_utente
)
VALUES (
 $[id_rich_serv_rec],
 localtimestamp,
 $[cd_stato_rec],
 $[idUtente]
)
`;